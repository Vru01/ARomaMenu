const Category = require('../models/Category') ;
const User = require('../models/User');

const createCategory = async (req, res) => {
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
                message: "You are not authorized to create a category",
                success: false
            })
        }
        const { title, imageurl } = req.body;
        if (!title) {
            return res.status(400).send({
                message: "Title is required",
                success: false
            });
        }
        const newCategory = new Category({ title, imageurl, createdBy: user._id });
        await newCategory.save();
        res.status(201).send({
            message: "Category created successfully",
            success: true,
            data: newCategory
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error in creating category",
            success: false,
            error
        })
    }
};


const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).send({
            message: "Categories fetched successfully",
            success: true,
            data: categories
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error in fetching categories",
            success: false,
            error
        });
    }
};


const updateCategory = async (req, res) => {
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
                message: "You are not authorized to update a category",
                success: false
            })
        }
        const category = await Category.findById(req.params.id);
        if( !category) {
            return res.status(404).send({
                message: "Category not found",
                success: false
            });
        }
        if( category.createdBy.toString() !== user._id.toString()) {
            return res.status(403).send({
                message: "You are not authorized to update this category or you are not owner of this category",
                success: false
            });
        }
        const { title } = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { title },
            { new: true }
        );
        res.status(200).send({
            message: "Category updated successfully",
            success: true,
            data: updatedCategory
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error in updating category",
            success: false,
            error
        });
    }
};


const deleteCategory = async (req, res) => {
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
                message: "You are not authorized to delete a category",
                success: false
            })
        }
        const category = await Category.findById(req.params.id);
        if( !category) {
            return res.status(404).send({
                message: "Category not found",
                success: false
            });
        }
        if( category.createdBy.toString() !== user._id.toString()) {
            return res.status(403).send({
                message: "You are not authorized to delete this category or you are not owner of this category",
                success: false
            });
        }
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).send({
            message: "Category deleted successfully",
            success: true
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error in deleting category",
            success: false,
            error
        });
    }
};


module.exports = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
} ;