const express = require("express");

const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUsserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  deleteUser,
  getUserByid,
  updateUserRole,
  verifyUser,
  addProfile,
} = require("../controller/userController");
const { isAuthenticUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/verify/email/:token").post(verifyUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logout);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/password/update").put(isAuthenticUser, updatePassword);

router.route("/me").get(isAuthenticUser, getUsserDetails);

router.route("/add-profile").post(isAuthenticUser, addProfile);

router.route("/me/update").put(isAuthenticUser, updateProfile);

router.route("/me/add-profile");
router
  .route("/admin/users")
  .get(isAuthenticUser, authorizeRoles("admin"), getAllUser);

router
  .route("/admin/user/:id")
  .get(isAuthenticUser, authorizeRoles("admin"), getUserByid)
  .put(isAuthenticUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
