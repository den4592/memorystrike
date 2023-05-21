const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());

const contentsRoutes = require("./routes/contents-routes");
const userRoutes = require("./routes/user-routes");
const topicsRoutes = require("./routes/topics-routes");
const statisticRoutes = require("./routes/statistics-routes");

app.use(bodyParser.json());

app.use("/api/contents", contentsRoutes);
app.use("/api/topics", topicsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/statistics", statisticRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

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
