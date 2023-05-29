const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error in connecting to Database'));
db.once('open', () => {
  console.log('Connected to database :: MongoDB');
});

module.exports = db;
