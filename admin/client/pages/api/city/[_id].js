/** @format */

import City from "../../../model/city";
import connectDb from "../../../middleware/mongoose";
export default connectDb(async (req, res) => {
  const { method } = req;

  switch (method) {
    case "PUT":
      await updateCity(req, res);
      break;
    case "GET":
      await GetCity(req, res);
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
});

const updateCity = async (req, res) => {
  try {
    let city;
    city = await City.findByIdAndUpdate(req.query._id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(201).json({
      success: true,
      city,
    });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, message: error.message });
  }
};

const GetCity = async (req, res) => {
  try {
    let city = await City.findById(req.query._id);

    if (!city) {
      return next(new ErrorHandler("city not found", 404));
    }

    // res.set('Cache-Control', 'public, max-age=31557600');

    res.status(200).json({
      success: true,
      city,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
