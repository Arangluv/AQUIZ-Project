import express from "express";
import {
  postJoin,
  postLogin,
  getLogout,
} from "../controller/userController";
import { getQuiz } from "../controller/quizController";
const globalRouter = express.Router();
globalRouter.route("/").get(getQuiz);
globalRouter.route("/join").post(postJoin);
globalRouter.route("/login").post(postLogin);
globalRouter.route("/logout").get(getLogout);
export default globalRouter;
