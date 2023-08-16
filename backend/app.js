const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const { MONGODB_ID, MONGODB_PASSWORD, MONGODB_COLLECTION } = process.env;

app.use(cookieParser());
app.use(bodyParser.json());

app.use(
  cors({
    origin: ["https://www.memorystrike.com", "http://localhost:5173"], // 접근 권한을 부여하는 도메인
    credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
    optionsSuccessStatus: 200, // 응답 상태 200으로 설정
  })
);

const contentsRoutes = require("./routes/contents-routes");
const userRoutes = require("./routes/user-routes");
const topicsRoutes = require("./routes/topics-routes");
const statisticRoutes = require("./routes/statistics-routes");

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  ); // 모든 HTTP 메서드 허용
  res.setHeader("Access-Control-Allow-Credentials", "true"); // 클라이언트와 서버 간에 쿠키 주고받기 허용
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Max-Age", "60");
  next();
});

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
    `mongodb+srv://${MONGODB_ID}:${MONGODB_PASSWORD}@cluster0.wh8iel1.mongodb.net/${MONGODB_COLLECTION}?retryWrites=true&w=majority`,
    { autoIndex: false }
  )
  .then(() => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
