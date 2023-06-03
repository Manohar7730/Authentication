const User = require('../models/user');
const { registerValidation, loginValidation } = require('../validation');
const bcryptjs = require('bcryptjs');

module.exports.profile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.render('404', { title: 'User not found' });
        }

        // Render the user profile view with the user data
        return res.render('profile', {  title: `${user.name} Profile`, user: user });
    } catch (err) {
        console.error(err);
        return res.render('error', { title: 'Error', error: err });
    }
};

// Render user registration page
module.exports.Sign_Up = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile/' + req.user._id);
    }
    return res.render('user_sign_up', {
        title: 'Register'
    });
};

// Render user login page
module.exports.Sign_In = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile/' + req.user._id);
    }
    return res.render('user_sign_in', {
        title: 'Login'
    });
};

// Handle user registration
module.exports.register = async (req, res) => {
    try {
        const { error } = registerValidation(req.body);
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
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).redirect('/users/login');
    } catch (err) {
        console.error(err);
        return res.status(400).send(err.message);
    }
};

module.exports.login = async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(401).send('Invalid Credentials');
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(401).send('User not found');
    }

    const validPass = await bcryptjs.compare(req.body.password, user.password);
    if (!validPass) {
        return res.status(401).send('Invalid Password / Username');
    }

    try {
        req.login(user, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            return res.redirect('/');
        });
    } catch (err) {
        console.error(err);
        return res.status(400).send(err.message);
    }
};

module.exports.logout = (req, res) => {
    req.logout(function (err) {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        return res.redirect('/');
    });
};
