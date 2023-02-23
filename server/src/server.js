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
    origin: ["http://localhost:3000", "http://3.37.82.88:80"],
    credentials: true,
  })
);
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
