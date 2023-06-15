const User = require('../models/User');
const { validateRegistration, validateLogin } = require('../validation');
const bcryptjs = require('bcryptjs');

// Render user profile page
module.exports.profile = async (req, res) => {
    try {
        const user_id = req.cookies.user_id;
        if (!user_id) {
            return res.redirect('/users/login');
        }

        const user = await User.findById(user_id);

        if (!user) {
            return res.redirect('/users/login');
        }

        return res.render('profile', {
            title: 'User Profile',
            user: user,
        });
    } catch (err) {
        console.error(err);
        return res.redirect('/users/login');
    }
};

// Render user registration page
module.exports.renderSignUp = (req, res) => {
    return res.render('user_sign_up', {
        title: 'Register',
    });
};

// Render user login page
module.exports.renderSignIn = (req, res) => {
    return res.render('user_sign_in', {
        title: 'Login',
    });
};

// Handle user registration
module.exports.register = async (req, res) => {
    try {
        const { error } = validateRegistration(req.body);
        if (error) {
            return res.status(400).send('Invalid Credentials');
        }

        const emailExists = await User.findOne({ email: req.body.email });
        if (emailExists) {
            return res.status(400).send('Email already exists');
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(req.body.password, salt);

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).redirect('/users/login');
    } catch (err) {
        console.error(err);
        return res.status(400).send(err.message);
    }
};

// Handle user login
module.exports.login = async (req, res) => {
    try {
        const { error } = validateLogin(req.body);
        if (error) {
            return res.status(401).send('Invalid Credentials');
        }

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).send('User not found');
        }

        const validPass = await bcryptjs.compare(req.body.password, user.password);
        if (!validPass) {
            return res.status(401).send('Password incorrect');
        }
        
        // Set user_id in cookies and redirect to profile page
        res.cookie('user_id', user._id);
        return res.redirect('/users/profile');
    } catch (err) {
        console.error(err);
        return res.redirect('/users/login');
    }
};

// Handle user logout
module.exports.logout = (req, res) => {
    res.clearCookie('user_id');
    return res.redirect('/');
};
