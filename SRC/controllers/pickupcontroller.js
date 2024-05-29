import Pickup from "../models/pickupmodel.js";
import dotenv from 'dotenv';
dotenv.config();

export const requestPickup = async (req, res) => {
    try {
        
        const {
            requestedBy,
            location,
            description,
            quantity,
            pickupTime
        } = req.body

        const newRequest = new Pickup({
            requestedBy,
            location,
            description,
            quantity,
            pickupTime
  });

  await newRequest.save();
  res.status(201).json({ message: 'request successful',newRequest});
  console.log('request successfull',newRequest)
        
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.error('Internal server error:', error);
    }
}
export const getAllrequest = async (req, res) => {
    try {
        const request = await Pickup.find().sort({_id: -1})
        if (!request) {
          console.log('NO requests in database')
          return res.status(404).json({message: 'NO requests in database'})
        }
          res.status(200).json({message: 'requests found successfully', request})
      } catch (error) {
  
        res.status(500).json({ error: 'Internal server error' });
        console.log(error);
       
      }
}
