const Skill = require("../database/skills");

const catchAsyncError = require("../middleware/catchAsyncError");

exports.GetSkill = catchAsyncError(async (req, res) => {
  const skill = await Skill.find();

  res.status(200).json({
    success: true,
    skill,
  });
});
