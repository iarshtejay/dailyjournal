require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const express = require("express");
const app = express();
const routes = require("./src/routes");
const bodyParser = require("body-parser");
const dbConnnection = require("./src/db/connection");
const cors = require('cors');
const port = process.env.PORT || 3002

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static('./images'))
// app.use(cors({
//   origin: 'http://localhost:3000'
// }));
app.use(cors())

app.use("/api", routes);
app.get("*", function (req, res) {
  res.status(404).send({
      message: "No such route found.",
  });
});


dbConnnection.on("connected", () => {
  console.log("Database connected");
  app.listen(port, () => {
    console.log(`Server listening on ${port}!`);
  });
});
