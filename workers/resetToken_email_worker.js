const ResetToken = require("../models/resetToken");
const crypto = require("crypto");

exports.generateAndSaveToken = async (user) => {
  try {
    const token = crypto.randomBytes(20).toString("hex");
    const resetToken = new ResetToken({
      user: user.id,
      accessToken: token,
    });
    await resetToken.save();
  } catch (err) {
    req.flash("error", err);
  }
};
