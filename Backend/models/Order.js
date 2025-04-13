const mongoose = require('mongoose');
require('./Foods') ;
require('./User') ;
require('./Restaurant') ;


const orderSchema = new mongoose.Schema({
    foods: [
        {    
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Food',
            required: true
        }
    ],
    payment:{
        type: Number,
        required: true
    },
    buyer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    restaurantId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true,
    },
    status:{
        type: String,
        enum: ['preparing', 'preapare', 'on the way', 'delivered', 'cancelled'],
        default: 'preparing'
    }
},{timestamps: true});


module.exports = mongoose.model('Order', orderSchema);