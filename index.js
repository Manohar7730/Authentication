const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const port = 8000;

app.use(expressLayouts);
app.use(express.static('./assets'));

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.set('view engine', 'ejs');
app.set('views', 'views');

const router = require('./routes/home');
app.use('/', router);

app.listen(port, (err) => {
    if (err) {
        console.log(`Error in Connecting to Server ${err}`);
    }
    console.log(`Server is up and running on port: ${port}`);
});