const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Authentication_Project', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error in connecting to Database'));

db.once('open', () => {
    console.log('Connected to database :: MongoDB');
});

module.exports = db;