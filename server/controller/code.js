const jdoodle = require("jdoodle-api");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");

exports.compileCode = catchAsyncError(async (req, res, next) => {
  try {
    const { code, languag } = req.body;
    const language = {
      languageCode: languag,
      versionIndex: 2,
    };

    const script = code;

    jdoodle(language, script)
      .then((result) => {
        console.log(result);
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
