const expreess = require("express");
const router = expreess.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { 
    createRestaurant ,
    getAllRestaurants,
    getRestaurantById,
    deleteRestaurant
} = require("../controllers/restaurantController");



router.post('/create', authMiddleware, createRestaurant);
router.get('/getallrestaurants', getAllRestaurants);
router.get('/getrestaurant/:id', getRestaurantById);
router.delete('/delete/:id', authMiddleware , deleteRestaurant );

module.exports = router;