// Import the Mongoose module
const mongoose = require("mongoose");
// Connect to the MongoDB database
mongoose.connect(process.env.MONGODB_ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the default connection
const db = mongoose.connection;
// Handle connection error
db.on("error", console.error.bind(console, "Error in connecting to MongoDB"));
// Once the connection is open, log a success message
db.once("open", () => {
  console.log("MongoDB is connected");
});
// Enable debug logging in Mongoose
mongoose.set("debug", true);
// Export the database connection
module.exports = db;
