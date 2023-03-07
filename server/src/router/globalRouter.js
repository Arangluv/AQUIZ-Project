import express from "express";
import {
  getJoin,
  postJoin,
  postLogin,
  getLogout,
} from "../controller/userController";
import { getQuiz } from "../controller/quizController";
const globalRouter = express.Router();
globalRouter.route("/").get(getQuiz);
globalRouter.route("/join").get(getJoin).post(postJoin);
globalRouter.route("/login").post(postLogin);
globalRouter.route("/loggout").get(getLogout);
export default globalRouter;
