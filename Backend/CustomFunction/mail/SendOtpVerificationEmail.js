const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const OTPVerificationSchema = require("../../Schema/OtpSchema/OtpSchema");

let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.AUTH_USER,
    pass: process.env.AUTH_PASSWORD,
  },
});

const SendOtpVerificationEmail = async (id, email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
      const hashedOTP = await bcrypt.hash(otp, 12);

      const newOTP = new OTPVerificationSchema({
        userId: id,
        otp: hashedOTP,
        createdAt: Date.now(),
        expiresAT: new Date(Date.now() + 10 * 60 * 1000),
      });

      await newOTP.save();

      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Verify Your Email",
        html: `<h1>Your OTP is ${otp}</h1>`,
      };

      await transporter.sendMail(mailOptions);
      console.log("Verification otp email sent");
      resolve("Success");
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

module.exports = SendOtpVerificationEmail;
