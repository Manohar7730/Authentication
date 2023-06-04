// Import the required module
const express = require('express');

// Create an instance of Express router
const router = express.Router();
const commentController = require('../controllers/comment_controller');
const passport = require('passport');

router.post('/create',passport.checkAuthentication,commentController.create);
router.get('/delete/:postId/:commentId',passport.checkAuthentication,commentController.destroy);

// Export the router to be used in other parts of the application
module.exports = router;