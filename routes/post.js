// Import the required module
const express = require('express');

// Create an instance of Express router
const router = express.Router();
const postController = require('../controllers/post_controller');

router.post('/create',postController.create);

// Export the router to be used in other parts of the application
module.exports = router;