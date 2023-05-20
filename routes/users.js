const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');

router.get('/profile',userController.profile);

router.get('/login',userController.Sign_In);
router.get('/register',userController.Sign_Up);

router.post('/login',userController.login);
router.post('/register',userController.register);

router.get('/destroy',userController.destroy);

module.exports = router;