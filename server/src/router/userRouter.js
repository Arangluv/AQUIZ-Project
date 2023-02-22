import express from "express";
import {
  getJoin,
  postJoin,
  addQuiz,
  postEdit,
} from "../controller/userController";
const userRouter = express.Router();

userRouter.route("/join").get(getJoin).post(postJoin);
userRouter.route("/add-quiz").post(addQuiz);
userRouter.route("/edit").post(postEdit);
export default userRouter;
