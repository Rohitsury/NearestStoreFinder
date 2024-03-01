const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const StoreRegistrationSchema = new mongoose.Schema({
  storename: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  storeAddress: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  storeStartTime: {
    type: String,
    required: true,
  },
  storeCloseTime: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
  },
  storeImage: {
    type: String,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
});

StoreRegistrationSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRETE_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

module.exports = mongoose.model(
  "STORE_REGISTRATION_DATA",
  StoreRegistrationSchema
);
