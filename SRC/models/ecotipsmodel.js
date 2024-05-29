import mongoose from 'mongoose'

const ecotipsSchema = mongoose.Schema({

    image : {
        type : String,
        required : true,
        default: ''
    },
    header : {
        type : String,
        required : true
    },
    text : {
        type : String,
        required : true
    },
    date : {
        type : String,
        required : true
    },
    category: {
        type : String,
        enum : ['Enviromental Tips','Local Recylce','Global Enviroment','Global Enviromental News'],
        required : 'This field is required.'
    }

},
{timestamps : true}
);

const Ecotips = mongoose.model('Ecotips', ecotipsSchema)
export default Ecotips