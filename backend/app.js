const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const contentsRoutes = require("./routes/contents-routes");

app.use(bodyParser.json());

app.use("/api/contents/", contentsRoutes);

mongoose
  .connect(
    "mongodb+srv://den4592:4592@cluster0.wh8iel1.mongodb.net/memorystrike?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
