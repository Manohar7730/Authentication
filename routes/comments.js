// Import the required module
const express = require('express');

// Create an instance of Express router
const router = express.Router();
const commentController = require('../controllers/comment_controller');
router.post('/create',commentController.create);

// Export the router to be used in other parts of the application
module.exports = router;