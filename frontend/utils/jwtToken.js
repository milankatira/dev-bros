import cookie from "cookie";
const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
  const serialized = cookie.serialize("token", token, {
    httpOnly: false,
    secure: process.env.MODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 1, // 1 day
    path: "/",
  });
  res.setHeader("Set-Cookie", serialized);

  res.status(statusCode).json({
    success: true,
    user,
    token,
  });
};

export default sendToken;
