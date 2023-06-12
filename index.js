const express = require('express');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const env = require('dotenv').config();
const db = require('./config/mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');

const app = express();
const port = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(expressLayouts);
app.use(express.static('./assets'));

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.set('view engine', 'ejs');
app.set('views', 'views');

// Session Configuration
app.use(
  session({
    name: 'Cookie',
    secret: 'something',
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      autoRemove: 'interval',
      autoRemoveInterval: 10
    }, function(err){
      console.log(err || 'connect-mongodb setup ok');
    }),
    cookie:{
      maxAge: 1000 * 60 * 10,
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMiddleware.setFlash);

const router = require('./routes/home');
app.use('/', router);

app.listen(port, (err) => {
  if (err) {
    console.log(`Error in Connecting to Server ${err}`);
  }
  console.log(`Server is up and running on port: ${port}`);
});
