import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import userRouter from "./router/userRouter";
import globalRouter from "./router/globalRouter";
import apiRouter from "./router/apiRouter";
import quizRouter from "./router/quizRouter";
import adminRouter from "./router/adminRouter";
const app = express();
app.use(morgan("tiny"));
app.use("/uploads", express.static("uploads"));
app.use("/assets", express.static("assets"));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://3.37.82.88",
      "https://www.aquiz.co.kr",
      "https://aquiz.co.kr",
    ],
    credentials: true,
  })
);
app.use(function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 개발모드
  res.header("Access-Control-Allow-Origin", "https://aquiz.co.kr");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  // res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  next();
});

app.use(cookieParser());
app.use(helmet());
app.use(express.json()); // if user post data, express json parsing
app.use(express.urlencoded({ extended: true })); // HTML Form parsing

app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/api", apiRouter);
app.use("/quizzes", quizRouter);
app.use("/admins", adminRouter);

// bad path
app.use((req, res, next) => {
  res.status(404).send("Not found");
});
// Error detected
app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).send("Sorry, try letter..");
});

export default app;
