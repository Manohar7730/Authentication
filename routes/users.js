const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const passport = require('../config/passport-local-strategy');

router.get('/profile',passport.checkAuthentication,userController.profile);

router.get('/login',userController.Sign_In);
router.get('/register',userController.Sign_Up);

router.post('/login',passport.authenticate('local',{failureRedirect : '/users/login'}),userController.login);
router.post('/register',userController.register);

router.get('/logout',userController.logout);

module.exports = router;