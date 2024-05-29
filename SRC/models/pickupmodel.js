import mongoose from 'mongoose'

const pickupSchema = mongoose.Schema({

    requestedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    location : {
        type: String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    quantity: {
        type: String,
        required : true
    },
    pickupTime: {
        type: String
    }

})


const Pickup = mongoose.model('Pickup',pickupSchema)
export default Pickup
