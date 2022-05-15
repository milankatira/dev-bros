const jwt = require("jsonwebtoken");

module.exports = {
  getTokenForEmailVarification: (payload) => {
    const token = jwt.sign(payload, process.env.TOKEN_SECRET);
    return token;
  },
};

module.exports = {
  checkTokenForEmailVerification: (payload) => {
    console.log(payload)
    const token = jwt.verify(payload, process.env.TOKEN_SECRET);
    return token;
  },
};
