const User = require('../models/Users');
const bcryptjs = require('bcryptjs');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return done(null, false, { message: 'Invalid Credentials' })
        }

        const validPass = await bcryptjs.compare(password, user.password)
        if (!validPass) {
            return done(null, false, { message: 'Invalid Credentials' })
        }

        return done(null, user)
    } catch (err) {
        console.error(err);
        return done(err)
    }
}));


passport.serializeUser(function (user, done) {
    done(null, user.id)
})

passport.deserializeUser(async function (id, done) {
    try {
        const user = await User.findById(id);
        if (!user) {
            return done(null,false)
        }
        return done(null,user)
    } catch {
        return done(err)
    }
})

passport.checkAuthentication = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    return res.redirect('/users/login')
}

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user
    }
    next()
}

module.exports = passport;