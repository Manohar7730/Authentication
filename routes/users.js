const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const passport = require("../config/passport-local-strategy");

router.get(
  "/profile/:id",
  passport.checkAuthentication,
  userController.profile
);
router.post("/update/:id", passport.checkAuthentication, userController.update);

router.get("/login", userController.Sign_In);
router.get("/register", userController.Sign_Up);

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/users/login" }),
  userController.login
);
router.post("/register", userController.register);

router.get("/logout", userController.logout);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "users/login" }),
  userController.googleLogin
);

router.get("/forgot-password", userController.forgotPassword);

router.post("/forgot-password", userController.sendPasswordResetLink);

router.get("/reset_password", userController.resetPasswordPage);

router.post("/reset_password", userController.resetPassword);

module.exports = router;
