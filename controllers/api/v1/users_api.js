const { json } = require('express');
const User = require('../../../models/user');
const { loginValidation } = require('../../../validation');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.login = async (req, res) => {
    try{
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(401).json({ message: 'Invalid Credentials' });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(401).json({ message: 'User not found' });
    }

    const validPass = await bcryptjs.compare(req.body.password, user.password);
    if (!validPass) {
        return res.status(401).json({ message: 'Invalid Password / Username' });
    }
    return res.status(200).json({
        message : "Sign in successful and here is your token , keep it safe",
        data : {
            token : jwt.sign(user.toJSON(),'authentication',{expiresIn : "10000"})
        }
    })

    } catch (err) {
        console.error(err);
        return res.status(400).json({
            message : "Internal server error"
        });
    }
};
