const jwt = require("jsonwebtoken");

const AuthenticateUser = (userSchema) => async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      throw new Error();
    }
    const token = authorizationHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.SECRETE_KEY);
    const user = await userSchema.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ success: false, message: "Authentication failed" });
  }
};

const restrictToOwnProfile = (userSchema) => async (req, res, next) => {
  try {
    const userId = req.user._id;
    if (userSchema.modelName === "STORE_REGISTRATION_DATA") {
      const profile = await userSchema.findOne({ _id: userId });
      req.profile = profile;
      if (!profile) {
        throw new Error();
      }
    } else if (userSchema.modelName === "PRODUCT") {
      const medicineData = await userSchema.find({ user: userId });
      req.medicineData = medicineData;
      if (!medicineData) {
        throw new Error();
      }
    }
    next();
  } catch (err) {
    res.status(403).json({ success: false, message: "Access denied" });
  }
};

module.exports = { AuthenticateUser, restrictToOwnProfile };
