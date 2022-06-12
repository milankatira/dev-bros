const cookie = require("cookie");

const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
  const serialized = cookie.serialize("token", token, {
    httpOnly: false,
    secure: process.env.MODE_ENV !== "development",
    // sameSite: "strict",
    maxAge: 60 * 60 * 24 * 1, // 1 day
    path: "/",
  });
  res.setHeader("Set-Cookie", serialized);

  const options = {
    expires: new Date(Date.now() + 70000000),
    httpOnly: true,
  };

  res.cookie("access", token, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    // httpOnly: true,
  });

  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(Date.now() + 70000000),
    })
    .json({
      success: true,
      user,
      token,
    });
};

module.exports = sendToken;
