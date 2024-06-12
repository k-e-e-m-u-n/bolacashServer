import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    email: {
        type : String,
        required : true,
        unique : true
    },
    userName: {
        type : String,
        required : true,
        unique : true
    },
    password: {
        type : String,
        required : true
    },
    confirmPassword: {
        type : String,
        // required : true
    },
    phoneNumber: {
        type : String,
        required : true,
        unique : true
    },
    location: {
        type : String,
        default : ''
    },
    profilePic: {
        type : String,
        default : ''
    }
});

const User = mongoose.model('User',userSchema)
export default User