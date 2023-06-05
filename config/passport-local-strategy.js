const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passReqToCallback : 'true'
        },
        async (req,email, password, done) => {
            try {
                const user = await User.findOne({ email: email });
                if (!user) {
                    req.flash('error','Invalid Credentials')
                    return done(null, false)
                }

                const validPass = await bcryptjs.compare(password, user.password);
                if (!validPass) {
                    req.flash('error','Invalid Credentials')
                    return done(null, false)
                }

                return done(null, user);
            } catch (err) {
                req.flash('error',err)
                return done(err);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            return done(new Error('User not found'));
        }
        return done(null, user);
    } catch (err) {
        console.error(err);
        return done(err);
    }
});

passport.checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    return res.redirect('/users/login');
};

passport.setAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
};

module.exports = passport;
