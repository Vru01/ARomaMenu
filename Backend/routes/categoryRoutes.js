const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const { 
    createCategory , getAllCategories , updateCategory , deleteCategory
} = require('../controllers/categoryController');

const router = express.Router();

router.post('/create', authMiddleware , createCategory);
router.get('/getallcategories' , getAllCategories);
router.put('/updatecategory/:id' , authMiddleware , updateCategory);
router.delete('/deletecategory/:id' , authMiddleware , deleteCategory);

module.exports = router;