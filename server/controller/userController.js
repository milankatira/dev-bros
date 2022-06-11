const User = require("../database/userModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const UserSkillModel = require("../database/user_skill");
const EducationModel = require("../database/education_details");
const ExperienceModel = require("../database/professional_expericance");
const UserPreferenceModal = require("../database/user_preferance");
const userDataModel = require("../database/profileModel");
const cloudinary = require("cloudinary");
const { getTokenForEmailVarification } = require("../helpers/auth");

const { checkTokenForEmailVerification } = require("../helpers/checkauth");

const dotenv = require("dotenv");
const Jimp = require("jimp");
const path = require("path");
dotenv.config({ path: "../config/config.env" });

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { firstName, lastName, email, password, phoneNo } = req.body;
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    phoneNo,
  });

  const tokenForEmailVarification = await getTokenForEmailVarification({
    createdUser: user._id,
    roleId: user.email,
  });
  const link = `${process.env.CORS_URL}/verify/${tokenForEmailVarification}`;

  await sendEmail({
    email: user.email,
    subject: "email verification Link",
    message: link,
  });

  sendToken(user, 201, res);
});

exports.verifyUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.params;

  try {
    const decodedToken = await checkTokenForEmailVerification(token);
    console.log(decodedToken);
    if (!decodedToken) {
      return {
        status: false,
        message: "Invalid token",
      };
    }

    if (decodedToken && decodedToken.createdUser) {
      const userDetails = await User.findOne({
        _id: decodedToken.createdUser,
      });

      if (userDetails.isVerified) {
        return res.status(202).json({
          status: false,
          message: "User is already verified",
        });
      }
      userDetails.isVerified = true;

      await userDetails.save();

      return res.status(200).json({
        status: true,
        message: "Valid token",
      });
    }
  } catch (err) {
    return res.status(500).json({
      err,
    });
  }
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("please provide email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("email or password is incorrect", 400));
  }
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("email or password is incorrect", 400));
  }
  sendToken(user, 200, res);
});

exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "logged out successfully",
  });
});

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("email not found", 404));
  }
  const resetToken = await user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://localhost:3000/password/reset/${resetToken}`;

  const message = `Your password reset token is - \n\n  ${resetPasswordUrl} \n\n if you are not requested ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password reset token",
      message,
    });

    res.status(200).json({
      success: true,
      message: `email sent ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = await crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler("password reset token is invalid or has expired", 400)
    );
  }

  if (!req.body.password) {
    return next(new ErrorHandler("please provide password", 400));
  }
  if (!req.body.confirmPassword) {
    return next(new ErrorHandler("please provide confirm password", 400));
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("password and confirm password does not match", 400)
    );
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendToken(user, 200, res);
});

exports.getUsserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    status: true,
    user,
  });
});

exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatch = await user.comparePassword(req.body.oldpassword);

  if (!isPasswordMatch) {
    return next(new ErrorHandler("old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();
  sendToken(user, 200, res);
});

exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

exports.addProfile = catchAsyncError(async (req, res, next) => {
  const {
    employment_type,
    expected_salary,
    salary_preference,
    willing_to_relocate,
    prefered_location,
    skills,
    fresher,
    profile_img,
    experience_details,
    education_details,
    location,

  } = req.body;

  if (location) {
    const user_location = await User.findById(req.user.id);
    user_location.location = location;
    await user_location.save();
  }

  if (profile_img) {
    // Image Base64
    const buffer = Buffer.from(
      profile_img.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
      "base64"
    );
    const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;
    // 32478362874-3242342342343432.png

    const jimResp = await Jimp.read(buffer);
    jimResp
      .resize(150, Jimp.AUTO)
      .write(path.resolve(__dirname, `../static/${imagePath}`));

    const authData = await userDataModel.findOne({ user_id: req.user.id });
    authData.profile_pic = imagePath;
    await authData.save();
  }

  // store skills data into user_skills table
  await Promise.all(
    JSON.parse(skills).map(async (singleSkills) => {
      const skill = new UserSkillModel({
        skill: singleSkills.skill,
        year_of_experience: singleSkills.yearExp,
        last_used: singleSkills.lastUsed,
        user_id: req.user.id,
      });
      await skill.save();
    })
  );

  // store education data into education_details table
  await Promise.all(
    JSON.parse(education_details).map(async (singleValue) => {
      const educationData = new EducationModel({
        degree: singleValue.degree,
        institution: singleValue.institute,
        description: singleValue.educationDescription,
        started_year: singleValue.startedYear,
        passing_year: singleValue.passingYear,
        marks: singleValue.marks,
        user_id: req.user.id,
      });
      await educationData.save();
    })
  );

  if (!fresher) {
    // store experience data into professional_experience table
    await Promise.all(
      JSON.parse(experience_details).map(async (singleValue) => {
        const experienceData = new ExperienceModel({
          company: singleValue.company,
          designation: singleValue.designation,
          description: singleValue.experienceDescription,
          start_at: singleValue.startDate,
          end_at: singleValue.endDate,
          is_current_employement: singleValue.currentlyWorking,
          user_id: req.user.id,
        });
        await experienceData.save();
      })
    );
  }

  //  store value in user_preference
  const UserPrederance = new UserPreferenceModal({
    user_id: req.user.id,
    employment_type,
    expected_salary,
    salary_preference,
    willing_to_relocate,
    prefered_location,
  });

  await UserPrederance.save();

  res.status(200).json({
    success: true,
    message: "user profile added successfully",
  });
});

exports.getAllUser = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

exports.getUserByid = catchAsyncError(async (req, res, next) => {
  const users = await User.findById(req.params.id);

  if (!users) {
    return next(
      new ErrorHandler(`user not found with this id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    users,
  });
});

exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`user not found with this id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    message: "user deleted successfully",
  });
});
