const mongoose = require("mongoose");
const env = require("../config/environment");

mongoose.connect(`mongodb://127.0.0.1:27017/${env.db}`);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error in connecting to Database"));
db.once("open", () => {
  console.log("Connected to database :: MongoDB");
});

module.exports = db;
