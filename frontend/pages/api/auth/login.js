
import ErrorHandler from '../../../utils/errorhandler';
import User from '../../../models/userModel';
import sendToken from '../../../utils/jwtToken';
import connectDb from '../../../middleware/mongoose';

const login = async (req, res) => {
  try {
    if (req.method == 'POST') {
      if (!req.body.email || !req.body.password) {
        throw new ErrorHandler(
          'Please provide email and password',
          400
        );
      }
      let user = await User.findOne({
        email: req.body.email,
      }).select('+password');
      if (!user) {
        throw new ErrorHandler(
          'email or password is incorrect',
          400
        );
      }

      const isPasswordMatch = await user.comparePassword(
        req.body.password
      );
      if (!isPasswordMatch) {
        throw new ErrorHandler(
          'email or password is incorrect',
          400
        );
      }
      sendToken(user, 200, res);
    }
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message);
  }
};

export default connectDb(login);
