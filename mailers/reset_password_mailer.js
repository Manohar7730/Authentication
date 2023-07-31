const nodemailer = require("../config/nodemailer");

exports.sendPasswordResetLink = async (user, resetLink) => {
  try {
    await nodemailer.transporter.sendMail({
      from: "123alonemanu@gmail.com",
      to: user.email,
      subject: `Password Reset Link`,
      html: `Click <a href="${resetLink}">here</a> to reset your password`,
    });
  } catch (err) {
    throw err;
  }
};
