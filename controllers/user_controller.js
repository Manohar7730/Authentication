const User = require("../models/user");
const { registerValidation, loginValidation } = require("../validation");
const bcryptjs = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const reset_password_mailer = require("../mailers/reset_password_mailer");
const resetToken_email_worker = require("../workers/resetToken_email_worker");
const ResetToken = require("../models/resetToken");

module.exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.sendStatus(404);
    }

    // Render the user profile view with the user data
    return res.render("profile", {
      title: `${user.name} Profile`,
      profile_user: user,
    });
  } catch (err) {
    console.error(err);
    return res.render("error", { title: "Error", error: err });
  }
};

module.exports.update = async (req, res) => {
  // try {
  //     if(req.user.id == req.params.id){
  //         const user = await User.findByIdAndUpdate(req.params.id,req.body);
  //         return res.redirect('back');
  //     }else{
  //         return res.status(404).json({ error: 'Unauthorized' });
  //     }
  // } catch (err) {
  //     console.error(err);
  //     return res.render('error', { title: 'Error', error: err });
  // }

  try {
    if (req.user.id == req.params.id) {
      const user = await User.findByIdAndUpdate(req.params.id);
      User.uploadedAvatar(req, res, async function (err) {
        if (err) {
          console.log("*****multer error", err);
        }
        user.name = req.body.name;
        user.email = req.body.email;
        if (req.file) {
          const filePath = path.join(__dirname, "..", user.avatar);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        await user.save();
        return res.redirect("back");
      });
    } else {
      return res.status(401).send("Unauthorized");
    }
  } catch (err) {
    req.flash("error", err);
    return res.render("error", { title: "Error", error: err });
  }
};

// Render user registration page
module.exports.Sign_Up = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile/" + req.user._id);
  }
  return res.render("user_sign_up", {
    title: "Register",
  });
};

// Render user login page
module.exports.Sign_In = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile/" + req.user._id);
  }
  return res.render("user_sign_in", {
    title: "Login",
  });
};

// Handle user registration
module.exports.register = async (req, res) => {
  try {
    const { error } = registerValidation(req.body);
    if (error) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).redirect("/users/login");
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
};

module.exports.login = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(401).json({ error: "Invalid Credentials" });
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).json({ error: "User not found" });
  }

  const validPass = await bcryptjs.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(401).json({ error: "Invalid Password / Username" });
  }

  try {
    req.login(user, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      req.flash("success", "Logged In Successfully");
      return res.redirect("/");
    });
  } catch (err) {
    console.error(err);
    return res.status(400).send(err.message);
  }
};

module.exports.googleLogin = async (req, res) => {
  try {
    req.login(req.user, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      req.flash("success", "Logged In Successfully");
      return res.redirect("/");
    });
  } catch (err) {
    console.error(err);
    return res.status(400).send(err.message);
  }
};

module.exports.logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    req.flash("success", "Logged out successfully");
    return res.redirect("/");
  });
};

module.exports.forgotPassword = (req, res) => {
  try {
    return res.render("forgot_password", {
      title: "forgot Password",
    });
  } catch (err) {
    req.flash("error", err);
    return res.redirect("back");
  }
};

module.exports.sendPasswordResetLink = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!User) {
      req.flash("error", "Email Not Found");
      return res.redirect("back");
    }
    const token = await resetToken_email_worker.generateAndSaveToken(user);
    const resetLink = `http://${req.headers.host}/users/reset_Password?accesstoken=${token}`;
    await reset_password_mailer.sendPasswordResetLink(user, resetLink);

    return res.redirect("/");
  } catch (err) {
    req.flash("error", err);
    return res.redirect("back");
  }
};
