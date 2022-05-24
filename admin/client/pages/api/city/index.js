import City from '../../../model/city';
import connectDb from '../../../middleware/mongoose';
export default connectDb(async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      await GetCity(req, res);
      break;
    case 'POST':
      await AddCity(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
});

const AddCity = async (req, res) => {
  try {
    const city = await City.create(req.body);
    res.status(201).json({
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

const GetCity = async (req, res) => {
  try {
    const city = await City.find();
    console.log(city, 'city');

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
