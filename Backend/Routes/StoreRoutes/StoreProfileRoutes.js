const express = require("express");
const router = express.Router();
const StoreRegistrationSchema = require("../../Schema/StoreSchema/StoreRegistrationSchema");
const {
  AuthenticateUser,
  restrictToOwnProfile,
} = require("../../CustomFunction/middleware/Authenticate");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

const serverErrorMsg = {
  error: "Something went wrong",
};

//api for get store owner data for profile
router.get(
  "/getStoreOwnerData",
  AuthenticateUser(StoreRegistrationSchema),
  restrictToOwnProfile(StoreRegistrationSchema),
  async (req, res) => {
    const profile = req.profile;
    return res.status(200).json({ profile });
  }
);

router.patch(
  "/updateStoreProfile",
  AuthenticateUser(StoreRegistrationSchema),
  async (req, res) => {
    const {
      storename,
      phone,
      storeAddress,
      area,
      storeStartTime,
      storeCloseTime,
      storeImage,
    } = req.body;
    const userId = req.user._id;

    try {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: "Invalid ObjectId" });
      }

      const query = { _id: new ObjectId(userId) };
      const update = {
        $set: {
          storename,
          phone,
          storeAddress,
          area,
          storeStartTime,
          storeCloseTime,
        },
      };

      if (storeImage) {
        update.$set.storeImage = storeImage;
      }

      const collection = await mongoose.connection.db.collection(
        "store_registration_datas"
      );
      const result = await collection.updateOne(query, update);
      return res.status(200).json({ message: "Profile Updated." });
    } catch (error) {
      return res.status(500).json(serverErrorMsg);
    }
  }
);

router.patch("/changepassword", async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    console.log(email);
    const user = await StoreRegistrationSchema.findOne({ email });
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
        "store_registration_datas"
      );
      const result = await collection.updateOne(query, update);
      return res.status(200).json({ message: "Password Updated." });
    }
  } catch (error) {
    return res.status(500).json(serverErrorMsg);
  }
});

module.exports = router;
