import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import  Ecotips from '../models/ecotipsmodel.js';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });


  
export const createPost = async (req, res) => {
    try {
     
      let { image } = req.body;

      const {
        header,
        text,
        date,
        category
    } = req.body

  
      if (image) {
        const uploadedimg = await cloudinary.uploader.upload(image);
        image = uploadedimg.secure_url;
      }
  
      const newPost = new Ecotips({
                image,
                header,
                text,
                date,
                category 
      });
  
      await newPost.save();
      res.status(201).json({ message: 'Post created successfully: 🐸🐸🐸🐸🐸', newPost });
      console.log('Post created successfully', newPost);

    } catch (error) {

      res.status(500).json({ error: 'Internal server error' });
      console.error('Internal server error:', error);
    }
  };
  
  export const getAllPosts = async (req, res) => {
    try {
      const post = await Ecotips.find()
      const limitNumber = 6
      const ecotips = await Ecotips.find({}).sort({_id: - 1}).limit(limitNumber)


      const enviromentaltips = await Ecotips.find({'category': 'Enviromental Tips'}).sort({_id: -1}).limit(limitNumber)
      const localrecylce = await Ecotips.find({'category': 'Local Recylce'}).sort({_id: -1}).limit(limitNumber)
      const globalenviroment = await Ecotips.find({'category': 'Global Enviroment'}).sort({_id: -1}).limit(limitNumber)
      const globalenviromentalnews = await Ecotips.find({'category': 'Global Enviromental News'}).sort({_id: -1}).limit(limitNumber)

      const posts = {enviromentaltips,localrecylce,globalenviromentalnews,globalenviroment}

      if (!post) {
        console.log('NO posts in database')
        return res.status(404).json({message: 'NO posts in database'})
      }
        res.status(200).json({message: 'Posts found successfully', post})

        if (!ecotips) {
          console.log('NO ecotips in database')
          return res.status(404).json({message: 'NO ecotips in database'})
        }
          res.status(200).json({message: 'ecotips found successfully', ecotips})

         if (!posts) {
        console.log('NO posts in database')
        return res.status(404).json({message: 'NO posts in database'})
      }
        res.status(200).json({message: 'Posts found successfully', posts})

    } catch (error) {

      res.status(500).json({ error: 'Internal server error' });
      console.log(error);
     
    }
  }
  
  export const getSinglePost = async (req, res) => {
    try {
      const singlePost = await Ecotips.findById(req.params.id)
      if (!singlePost) {
        console.log('NO post in database')
        res.status(404).json({message: 'NO post in database'})
        // throw new error 
      } else {
        res.status(200).json({message: 'Posts found successfully', singlePost})
      }
    } catch (error) {

      res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  export const deletePost = async (req,res) => {
    try {
        const postId = req.params.id;

        await Ecotips.findByIdAndDelete(postId)
    } catch (error) {
        res.status(404).json({message: 'Error deleting post'})
    }
}





// export const ecoTipsPage = async (req,res) => {

//     try {
        
//         const limitNumber = 6
//         const ecotips = await Ecotips.find({}).sort({_id: - 1}).limit(limitNumber)

//         // 'Enviromental Tips','Local Recylce','Global Enviroment','Global Enviromental News'

//         const enviromentaltips = await Ecotips.find({'category': 'Enviromental Tips'}).sort({_id: -1}).limit(limitNumber)
//         const localrecylce = await Ecotips.find({'category': 'Local Recylce'}).sort({_id: -1}).limit(limitNumber)
//         const globalenviroment = await Ecotips.find({'category': 'Global Enviroment'}).sort({_id: -1}).limit(limitNumber)
//         const globalenviromentalnews = await Ecotips.find({'category': 'Global Enviromental News'}).sort({_id: -1}).limit(limitNumber)

//         const posts = {enviromentaltips,localrecylce,globalenviromentalnews,globalenviroment}

//         res.render()

//     } catch (error) {
//         res.status(500).send({message: error.message || 'Error occured'})
//     }

// }


// async function insertDb() {
//     try {
//         await Ecotips.insertMany(
//             [
//                {
//                 'image' : '',
//                 'header' : '',
//                 'text' : '',
//                 'date' : '',
//                 'category' : ''
//                }
//             ]
//         ) 
//     } catch (error) {
//         console.log('err',+ error)
//     }
// }

// insertDb()