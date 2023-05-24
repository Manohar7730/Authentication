const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

// Define the route handler for the root path ("/")
router.get('/', homeController.home);
router.use('/users', require('./users'));

module.exports = router;