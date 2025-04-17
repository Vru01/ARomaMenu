const Food = require("../models/Foods");
const Restaurant = require("../models/Restaurant");
const User = require("../models/User");


const createFood = async (req, res) => {
    try{
        const user = await User.findById({_id: req.body.id});
        if (!user) {
            return res.status(404).send({
                message: "User not found",
                success: false
            });
        }
        if(user.role !== "manager") {
            return res.status(403).send({
                message: "You are not authorized to create a food",
                success: false
            })
        }
        // const restaurantname = await Restaurant.findById(req.body.restaurant);
        // if (!restaurantname) {
        //     return res.status(404).send({
        //         message: "Restaurant not found",
        //         success: false
        //     });
        // }
        const { 
            title, description, imageurl, foodtags, creategory, 
        code, isAvailable, price, rating, reviews , isVeg, ARmodelUrl } = req.body;
        
        if(!title || !description || !foodtags || 
            !creategory || !code   || !price || !reviews ) {
            return res.status(400).json({
                success: false,
                message: "Please provide all fields"
            });
        };
        const food = new Food({
            title, description,
            imageurl, foodtags,
            creategory, code,
            isAvailable,
            price, rating, reviews, isVeg, ARmodelUrl,
            createdBy: user._id
        });
        await food.save();
        return res.status(201).json({
            success: true,
            message: "Food created successfully",
            food,
            // restaurantname,
            user
        }); 
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in creating food",
            error
        });
    }
};


const getAllFoods = async (req, res) => {
    try {
        const foods = await Food.find();
        if(!foods){  
            return res.status(404).json({
                success: false,
                message: "No foods found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Foods fetched successfully",
            foods
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in fetching foods",
            error
        });
    }
};


const getFoodById = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        if(!food){  
            return res.status(404).json({
                success: false,
                message: "Food not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Food fetched successfully",
            food
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in fetching food",
            error
        });
    }
};


const getFoodByRestaurantId = async (req, res) => {
    try{
        const restaurantId  = req.params.id;
        if(!restaurantId){
            return res.status(400).json({
                success: false,
                message: "Please provide restaurant id"
            });
        }
        const foods = await Food.find({ restaurant: restaurantId });
        if(!foods){  
            return res.status(404).json({
                success: false,
                message: "No foods found for this restaurant"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Foods fetched successfully",
            foods
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in fetching food",
            error
        });
    }
};


const updatefood = async (req, res) => {
    try{
        const user = await User.findById({_id: req.body.id});
        const food = await Food.findById(req.params.id);
        if( !food) {
            return res.status(404).json({
                success: false,
                message: "Food not found"
            }); 
        }
        if( food.createdBy.toString() !== user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this food"
            });
        }
        const {
            title, description, imageurl, foodtags, creategory,
            isAvailable, price, rating, reviews } = req.body;
        if(!title || !description || !foodtags ||
            !creategory  || !price || !reviews) {
            return res.status(400).json({
                success: false,
                message: "Please provide all fields"
            });
        }
        const updatedfood = await Food.findByIdAndUpdate(
            req.params.id,
            { title, description, imageurl, foodtags, creategory, 
                isAvailable, price, rating, reviews },
            { new: true }
        );
        return res.status(200).json({
            success: true,
            message: "Food updated successfully",
            updatedfood
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in updating food",
            error
        });
    }
};


const deleteFood = async (req, res) => {
    try{
        const food = await Food.findById(req.params.id);
        if(!food){  
            return res.status(404).json({
                success: false,
                message: "Food not found"
            });
        }
        const user = await User.findById({_id: req.body.id});
        if( food.createdBy.toString() !== user._id.toString() ) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this food"
            });
        }
        await Food.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Food deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in deleting food",
            error
        });
    }
};



module.exports = {
    createFood,
    getAllFoods,
    getFoodById,
    getFoodByRestaurantId,
    updatefood,
    deleteFood
};