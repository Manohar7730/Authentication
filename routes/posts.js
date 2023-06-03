// Import the required module
const express = require('express');

// Create an instance of Express router
const router = express.Router();
const postController = require('../controllers/post_controller');
const passport = require('passport')

router.post('/create',passport.checkAuthentication,postController.create);
router.get('/delete/:id',passport.checkAuthentication,postController.destroy);

// Export the router to be used in other parts of the application
module.exports = router;