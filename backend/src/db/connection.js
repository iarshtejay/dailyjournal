const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("MongoDB - Connection successful!");
  })
  .catch((err) => {
    console.log("Unable to connect to database");
  });

const dbConnnection = mongoose.connection;

dbConnnection.on("error", (err) => {
  console.log("Unable to connect to database");
});

module.exports = dbConnnection;
