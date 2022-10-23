const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect("mongodb+srv://milankics:Milan%40110@cluster0.rltgjre.mongodb.net/devbros", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`connected to ${data.connection.host}`);
    });
};

module.exports = connectDatabase;
