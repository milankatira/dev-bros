import mongoose from 'mongoose';

export const db = async () => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('Mongodb connected successfully.', process.env.MONGODB_URI);
  } catch (error) {
    console.log(process.env.MONGODB_URI);
    console.log('Database connection error: ', error);
  }
};
