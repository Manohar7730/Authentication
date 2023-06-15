const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');

// User profile route
router.get('/profile', userController.profile);

// User login and registration routes
router.get('/login', userController.renderSignIn);
router.get('/register', userController.renderSignUp);

router.post('/login', userController.login);
router.post('/register', userController.register);

// User logout route
router.get('/logout', userController.logout);

module.exports = router;