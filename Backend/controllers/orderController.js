const Order = require('../models/Order');


const placeOrder = (req, res) => {
    try{
        const {cart, restaurantId} = req.body;
        if(!cart || !restaurantId){
            return res.status(400).send({
                success: false,
                message: 'please provide all the fields'
            });
        }
        let totalPrice = 0 ;
        cart.map((item) => {
            totalPrice += item.price;
        });
        const newOrder = new Order({
            foods:cart,
            payment:totalPrice,
            buyer: req.body.id,
            restaurantId: restaurantId,
        });
        newOrder.save();
        res.status(201).send({
            success: true,
            message: 'order placed successfully',
            data: newOrder
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

const getAllOrdersBYRestaurant = async (req, res) => {
    try{
        const restaurantId = req.params.id ;
        if(!restaurantId){
            return res.status(400).send({
                success: false,
                message: 'please provide restaurant id'
            });
        }
        const orders = await Order.find({restaurantId: restaurantId});
        if(!orders){
            return res.status(404).send({
                success: false,
                message: 'no orders found'
            });
        }
        res.status(200).send({
            success: true,
            message: 'all orders fetched successfully',
            data: orders
        });
    } catch(error){
        res.status(500).send({ 
            success: false,
            message: 'error in getting all orders',
            error: error.message 
        });
    }
};

module.exports = {
    placeOrder,
    cancelOrder,
    updateOrderStatus,
    getAllOrdersBYRestaurant
};