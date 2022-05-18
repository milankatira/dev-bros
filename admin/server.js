const app = require("./app");

const dotenv = require("dotenv");

const cloudinary = require("cloudinary");

const connectDatabase = require("./config/databse");

dotenv.config({ path: "./config/config.env" });

process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`shutting down server due to caught exception rejection`);
  server.close(() => {
    process.exit(1);
  });
});


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`);
});

//unhandled promise rejection

process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`shutting down server due to unhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
