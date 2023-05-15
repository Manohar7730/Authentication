// Import the required module
const express = require('express');

// Set the port number
const port = 8000;

// Create an Express application
const app = express();

// Serve static files from the 'assets' directory
app.use(express.static('./assets'));

// Set the view engine to 'ejs' and specify the 'views' directory
app.set('view engine', 'ejs');
app.set('views', 'views');

// Require the 'home' route file
const router = require('./routes/home');

// Mount the 'router' middleware at the root path
app.use('/', router);

// Start the server and listen on the specified port
app.listen(port, (err) => {
    if (err) {
        console.log(`Error in Connecting to Server ${err}`);
    }
    console.log(`Server is up and running on port: ${port}`);
});
