const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  console.log(token, "token");
  const options = {
    expires: new Date(Date.now() + 70000000),
    // httpOnly: true,
  };

  res
    .status(statusCode)
    // .cookie("token", token, {
    //   expires: new Date(Date.now() + 70000000),
    // })
    .json({
      success: true,
      user,
      token,
    });
};

module.exports = sendToken;
