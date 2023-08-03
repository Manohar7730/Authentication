// Import the required module
const express = require("express");

// Create an instance of Express router
const router = express.Router();

// Import the home controller module
const homeController = require("../controllers/home_controller");

// Define the route handler for the root path ("/")
router.get("/", homeController.home);
router.use("/users", require("./users"));
router.use("/post", require("./posts"));
router.use("/comment", require("./comments"));
router.use("/likes", require("./likes"));

router.use("/api", require("./api"));

// Export the router to be used in other parts of the application
module.exports = router;
