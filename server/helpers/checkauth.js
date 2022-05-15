const jwt = require("jsonwebtoken");

module.exports = {
  checkTokenForEmailVerification: (payload) => {
    const token = jwt.verify(payload, process.env.TOKEN_SECRET);
    return token;
  },
};
