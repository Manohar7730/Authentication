const express = require('express');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

const app = express();
const port = 8000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Set up EJS and layouts
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.set('view engine', 'ejs');
app.set('views', 'views');

// Static assets
app.use(express.static('./assets'));

// Routes
const router = require('./routes/home');
app.use('/', router);

// Start the server
app.listen(port, (err) => {
    if (err) {
        console.log(`Error in connecting to server: ${err}`);
    }
    console.log(`Server is up and running on port: ${port}`);
});