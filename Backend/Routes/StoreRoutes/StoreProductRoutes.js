const express = require("express");
const router = express.Router();
const productSchema = require("../../Schema/StoreSchema/ProductSchema");
const StoreRegistrationSchema = require("../../Schema/StoreSchema/StoreRegistrationSchema");
const {
  AuthenticateUser,
  restrictToOwnProfile,
} = require("../../CustomFunction/middleware/Authenticate");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const serverErrorMsg = {
  error: "Something went wrong",
};

router.post(
  "/addmedicine",
  AuthenticateUser(StoreRegistrationSchema),
  async (req, res) => {
    const {
      medicineName,
      medicineDescription,
      content,
      stock,
      price,
      medicineImage,
    } = req.body;
    const userId = req.user._id;

    try {
      const newProduct = new productSchema({
        medicineName,
        medicineDescription,
        content,
        stock,
        price,
        medicineImage,
        user: userId,
      });
      await newProduct.save();

      const storeRegister = await StoreRegistrationSchema.findOne({
        _id: new mongoose.Types.ObjectId(userId),
      });
      if (storeRegister) {
        storeRegister.product.push(newProduct);
        await storeRegister.save();
      }
      return res.status(200).json({ message: "Product added successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json(serverErrorMsg);
    }
  }
);

router.get(
  "/getmedicine",
  AuthenticateUser(StoreRegistrationSchema),
  restrictToOwnProfile(productSchema),
  (req, res) => {
    const medicineData = req.medicineData;
    res.status(200).json({ medicineData });
  }
);

router.patch("/updatemedicine/:id", async (req, res) => {
  const id = req.params.id;
  const {
    medicineName,
    medicineDescription,
    content,
    stock,
    price,
    medicineImage,
  } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ObjectId" });
    }

    const query = { _id: new ObjectId(id) };
    const update = {
      $set: {
        medicineName,
        medicineDescription,
        content,
        stock,
        price,
      },
    };

    if (medicineImage) {
      update.$set.medicineImage = medicineImage;
    }

    const collection = await mongoose.connection.db.collection("products");
    const result = await collection.updateOne(query, update);
    return res.status(200).json({ message: "Medicine Updated." });
  } catch (err) {
    return res.status(500).json(serverErrorMsg);
  }
});

router.delete("/deletemedicine/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ObjectId" });
    }
    const query = { _id: new ObjectId(id) };
    const collection = await mongoose.connection.db.collection("products");
    let result = await collection.deleteOne(query);
    return res.status(200).json({ message: "Medicine Deleted." });
  } catch (err) {
    return res.status(500).json(serverErrorMsg);
  }
});

module.exports = router;
