// importing the libraries
const express = require("express");
const bcrypt = require("bcrypt");
const UserRegistrationSchema = require("../../Schema/UserSchema/UserRegistrationSchema");
const UserOTPVerification = require("../../Schema/OtpSchema/OtpSchema");
const SendOtpVerificationEmail = require("../../CustomFunction/mail/SendOtpVerificationEmail");
const ProductSchema = require("../../Schema/StoreSchema/ProductSchema");
const StoreRegistrationSchema = require("../../Schema/StoreSchema/StoreRegistrationSchema");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

// initializing express.Router in router for backend routing
const router = express.Router();

const serverErrorMsg = {
  error: "Something went wrong",
};

// api for register
router.post("/register", async (req, res) => {
  // whatever data we pass from the frontend (body) will be stored in req.body
  // below first we destructure (object de-structuring) the req.body
  const { name, email, phone, password } = req.body;
  try {
    // here we hash (encrypt) the password using bcrypt.hash(password, salt)
    // salt means number of rounds to be used to encrypt the password
    const securedPassword = await bcrypt.hash(password, 12);

    // first we are checking if the user already exists or not
    const checkExistingUser = await UserRegistrationSchema.findOne({ email });

    //if user already exists
    if (checkExistingUser) {
      // then we check if the user is already verified or not (verified means email is verified or not)
      if (checkExistingUser.verified) {
        // if verified then we return user already exists message to frontend with status code of 400
        return res.status(400).json({ error: "User already exists" });
      } else {
        // if not verified then we update the user details in the database
        await UserRegistrationSchema.updateOne({
          $set: {
            name,
            email,
            phone,
            password: securedPassword,
            verified: false,
          },
        });

        // then we send otp to the user email address
        SendOtpVerificationEmail(
          checkExistingUser._id,
          checkExistingUser.email
        );

        // then we return success message to frontend with status code 200 (200 for success response, means ok no error)
        return res.status(200).json({
          message: "OTP sent to your email address",
          userId: checkExistingUser._id,
          email: checkExistingUser.email,
        });
      }
    } else {
      // if user is not present then we create a new user
      const newUser = new UserRegistrationSchema({
        name,
        email,
        phone,
        password: securedPassword,
        verified: false,
      });

      // then we save the new user
      const saveNewUser = await newUser.save();

      // then we send otp to the user email address
      SendOtpVerificationEmail(saveNewUser._id, saveNewUser.email);
      return res
        .status(200)
        .json({ message: "OTP sent to your email", userId: saveNewUser._id });
    }
  } catch (err) {
    return res.status(500).json(serverErrorMsg);
  }
});

// api for verification of otp
router.post("/verifyotp", async (req, res) => {
  // same de-structuring of req.body
  const { userId, otp, password } = req.body;
  try {
    // first we check if the user otp is present or not and if we found any user otp then we are storing all the data in UserOTPVerificationRecord
    const UserOTPVerificationRecord = await UserOTPVerification.findOne({
      userId,
    });

    // if not present then we return error message to frontend
    if (!UserOTPVerificationRecord) {
      return res.status(400).json({ error: "Please Resend Again" });
    } else {
      //
      const { expiresAt, otp: hashedOtp } = UserOTPVerificationRecord;

      // we check if the otp is expired or not
      if (expiresAt < Date.now()) {
        await UserOTPVerification.deleteOne({
          _id: UserOTPVerificationRecord._id,
        });
        return res
          .status(400)
          .json({ message: "OTP Expired. Please Resend Again" });
      } else {
        const validOtp = await bcrypt.compare(otp, hashedOtp);
        if (!validOtp) {
          return res.status(400).json({ error: "Invalid OTP" });
        } else {
          if (password) {
            await UserRegistrationSchema.updateOne(
              { _id: userId },
              { $set: { password: await bcrypt.hash(password, 12) } }
            );
            await UserOTPVerification.deleteOne({
              _id: UserOTPVerificationRecord._id,
            });
            return res
              .status(200)
              .json({ message: "Password Changed Successfully" });
          } else {
            await UserRegistrationSchema.updateOne(
              { _id: userId },
              { $set: { verified: true } }
            );
            await UserOTPVerification.deleteOne({
              _id: UserOTPVerificationRecord._id,
            });
            return res.status(200).json({ message: "OTP Verified" });
          }
        }
      }
    }
  } catch (err) {
    return res.status(500).json(serverErrorMsg);
  }
});

// api for resend otp
router.post("/resentOtp", async (req, res) => {
  const { email, userId } = req.body;
  try {
    const UserOTPVerificationRecord = await UserOTPVerification.findOne({
      userId,
    });
    if (UserOTPVerificationRecord) {
      await UserOTPVerification.deleteOne({
        _id: UserOTPVerificationRecord._id,
      });
    }
    SendOtpVerificationEmail(userId, email);
    return res.status(200).json({ message: "OTP sent to your email" });
  } catch (err) {
    return res.status(500).json(serverErrorMsg);
  }
});

// api for login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkExistingUser = await UserRegistrationSchema.findOne({ email });

    if (!checkExistingUser) {
      //means if existinguser is not present
      return res.status(404).json({ error: "User does not exist" });
    }
    // check entered password is correct or not
    const isPasswordMatched = await bcrypt.compare(
      password,
      checkExistingUser.password
    );

    if (!isPasswordMatched) {
      //means if password is not matched
      return res.status(400).json({ error: "Invalid Credentials" });
    } else {
      const token = await checkExistingUser.generateAuthToken(); //generating jwt token which will be store in browser localstorage and will be used for authorization purpose and storing in browser localstorage will by done by frontend and below we passing that token to frontend
      return res
        .status(200)
        .json({ message: "Logged in successful", token: token });
    }
  } catch (err) {
    return res.status(500).json(serverErrorMsg);
  }
});

// api forgot password
router.post("/forgotpassword", async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = await UserRegistrationSchema.findOne({ email });
    if (!existingUser) {
      return res
        .status(404)
        .json({ error: "User does not exist with the provided email." });
    } else {
      await UserOTPVerification.deleteMany({
        userId: existingUser._id,
      });
      SendOtpVerificationEmail(existingUser._id, email);
      return res
        .status(200)
        .json({ message: "OTP sent to your email.", userId: existingUser._id });
    }
  } catch (err) {
    return res.status(500).json(serverErrorMsg);
  }
});

router.patch("/changepassword", async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  try {
    const user = await UserRegistrationSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isPasswordMatched = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatched) {
      return res.status(400).json({ error: "Invalid credentials" });
    } else {
      const query = { email: email };
      const hashNewPassword = await bcrypt.hash(newPassword, 10);
      const update = {
        $set: {
          password: hashNewPassword,
        },
      };
      const collection = await mongoose.connection.db.collection(
        "user_registration_datas"
      );
      await collection.updateOne(query, update);
      return res.status(200).json({ message: "Password Updated." });
    }
  } catch (error) {
    return res.status(500).json(serverErrorMsg);
  }
});

router.get("/search", async (req, res) => {
  try {
    const medicine = await ProductSchema.find({});
    const store = await StoreRegistrationSchema.find({});
    return res.status(200).json({ medicine, store });
  } catch (err) {
    return res.status(500).json(serverErrorMsg);
  }
});

// we export the router because we are using it in index.js file
module.exports = router;
