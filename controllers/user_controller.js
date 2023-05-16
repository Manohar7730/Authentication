const User = require('../models/Users');
const { registerValidation, loginValidation } = require('../validation');
const bcryptjs = require('bcryptjs');

module.exports.profile = (req, res) => {
    return res.render('profile', {
        title: "Profile page"
    });
};

module.exports.Sign_Up = (req, res) => {
    return res.render('user_sign_up', {
        title: "Register"
    });
};

module.exports.Sign_In = (req, res) => {
    return res.render('user_sign_in', {
        title: "Login"
    });
};

module.exports.register = async (req, res) => {
    
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
    try {
        await newUser.save();
        res.status(201).redirect('/users/user_sign_in');
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.login = async (req,res)=>{
    const{error} = loginValidation(req.body);
    if(error){
        return res.status(401).send("Invalid Credentials");
    }
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return res.status(401).send('User not found');
    }
    const validPass = await bcryptjs.compare(req.body.password ,user.password);
    if(!validPass){
        return res.status(401).send('Password wrong');
    }
    res.cookie('user_id',user.id);
    return res.status(201).redirect('/users/profile');
}