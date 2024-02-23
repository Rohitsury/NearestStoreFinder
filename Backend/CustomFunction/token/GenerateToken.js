const jwttoken = require("jsonwebtoken");

const GenerateToken = (user) => {
  try {
    const token = jwttoken.sign({ _id: user._id }, process.env.SECRETE_KEY);
    user.tokens = user.tokens.concat({ token: token });
    return token;
  } catch (err) {
    console.log("Token Generation Failed", err);
  }
};

module.exports = GenerateToken