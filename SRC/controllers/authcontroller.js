import cryptoHash from 'crypto';
import User from '../models/usermodel.js';
import { signUpValidator, signInValidator } from '../Validator/authvalidator.js';
import { formatZodError } from '../utils/errorMessage.js';
import generateTokenAndSetCookie from '../utils/generateTokenAndSetCookie.js';


function hashValue(value) {

    const hash = cryptoHash.createHash('sha256');
    hash.update(value);
    return hash.digest('hex');

}

function comparePasswords(inputPassword,hashedPassword){

    return hashValue(inputPassword) === hashedPassword

}

export const signUp = async (req, res, next) => {
    const registerResults = signUpValidator.safeParse(req.body)
    if(!registerResults) {
        return res.status(400).json(formatZodError
            (registerResults.error.issues))
    }
    try {
        const {userName, phoneNumber, email} = req.body
        const user = await User.findOne({$or:[{userName}, {email}, {phoneNumber}]})
        if (user) {
            res.status(409).json({message: 'user already exist`s'})
        } else{
            const {
                name,
                userName,
                password,
                confirmPassword,
                email,
                phoneNumber,
                location,
                profilePic
            } = req.body

             if(password !== confirmPassword) {
                return res.status(403).json({message: 'passwordmand confirmPassword do not match'});
            }


            const encrytion = hashValue (password, confirmPassword);
             const newUser = new User({
                name,
                userName,
                password: encrytion,
                email,
                phoneNumber,
                location,
                profilePic
            })

        
            await newUser.save()
            res.status(200).json({message:'User registered succesfully', newUser})
            console.log('User registered succesfully', newUser);
        }
    }
 catch (error) {
    res.status(500).json({message: error.message})
    console.log(error.message);}
}

export const signIn = async ( req, res, next) => {
    const loginResults = signInValidator.safeParse(req.body)
    if(!loginResults) {
        return res.status(400).json(formatZodError
            (loginResults.error.issues))
    }
    try {

        const {userName, phoneNumber, email,password} = req.body
        const user = await User.findOne({$or:[{userName}, {email}, {phoneNumber}]})

        if(!user){
            return res.status(400).json({message: "User with email not found!"});
        }
        const comparePass = comparePasswords(password, user.password);
        if (!comparePass){
            res.status(400).json({message: "Password is incorrect"})
        }

        // generate jwt token
        const accessToken =  generateTokenAndSetCookie(user._id,res);

        res.status(200).json({message: "Login Successful",accessToken});
        console.log('User Login successful', accessToken);
    } catch (error) {
        res.status(500).json({message: error.message});
        console.log('INTERNAL SERVER ERROR',error.message)
    }
}

export const logout = async (req, res, next) => {

}