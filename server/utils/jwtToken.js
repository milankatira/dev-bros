const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

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
