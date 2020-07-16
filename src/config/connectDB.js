const mongoose = require('mongoose');
let connectDB = () => {
  try {
    mongoose.connect(
      `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );
  } catch (error) {
    console.log(`Error connect DB: ${error.message}`);
  }
};
module.exports = connectDB;
