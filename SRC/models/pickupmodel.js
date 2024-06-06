import mongoose from 'mongoose'
import { date } from 'zod'

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
    },
    status :{
        type: String,
        default: 'Pending',

    },
    cancelOrder: {
        type: String,
        default: ''
    },
    date: {
        type: String
    }

},
{timestamps : true}
)


const Pickup = mongoose.model('Pickup',pickupSchema)
export default Pickup
