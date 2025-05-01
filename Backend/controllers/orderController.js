const Order = require('../models/Order');
const User = require('../models/User');


const placeOrder = async (req, res) => {
    try{
        const user = await User.findById({ _id: req.body.id });
        if (!user) {
            return res.status(404).send({
                message: "User not found",
                success: false
            })
        }
        const { items, totalAmount } = req.body;
        const order = new Order({
            items,
            totalAmount,
            user: user._id,
        });
        await order.save();
        res.status(201).send({  
            success: true,
            message: 'order placed successfully',
            data: order
        });
    } catch(error){
        console.log(error);
        res.status(500).send({ 
            success: false,
            message: 'error in placing your order',
            error: error.message 
        });
    }
};

const cancelOrder = (req, res) => {
    try{
        const {id} = req.params;
        const order = Order.findById(id);
        if(!order){
            return res.status(404).send({
                success: false,
                message: 'order not found'
            });
        }
        if(order.status === 'cancelled'){
            return res.status(400).send({
                success: false,
                message: 'order already cancelled'
            });
        }
        order.status = 'cancelled';
        order.save();
        res.status(200).send({
            success: true,
            message: 'order cancelled successfully',
            data: order
        });
    } catch(error){ 
        console.log(error);
        res.status(500).send({ 
            success: false,
            message: 'error in canceling order',
            error: error.message 
        });
    }
};

const updateOrderStatus = (req, res) => {
    try{
        const {id} = req.params;
        const {status} = req.body;
        const order = Order.findById(id);
        if(!order){
            return res.status(404).send({
                success: false,
                message: 'order not found'
            });
        }
        order.status = status;
        order.save();
        res.status(200).send({
            success: true,
            message: 'order status updated successfully',
            data: order
        });
    } catch(error){
        console.log(error);
        res.status(500).send({ 
            success: false,
            message: 'error in updating order status',
            error: error.message 
        });
    }
};



module.exports = {
    placeOrder,
    cancelOrder,
    updateOrderStatus,
    
};