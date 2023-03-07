import express from "express";
import {
  postQuiz,
  getSolveQuiz,
  postDelete,
  getUserRequestQuizzes,
  getQuizForId,
  postEdit,
  addComment,
  getComment,
} from "../controller/quizController";
import multer from "multer";
import aws from "aws-sdk";
import multerS3 from "multer-s3";
require("dotenv").config();
aws.config.update({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const s3 = new aws.S3();
const quizFileUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "aquizbuket",
    acl: "public-read-write",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      const folderName =
        file.fieldname === "thumbnailFile" ? "thumbnail" : "quizzes";
      cb(null, `${folderName}/${Date.now()}_${file.originalname}`);
    },
  }),
  limit: {
    fileSize: 3000000,
  },
});

const quizRouter = express.Router();

quizRouter.route("/create-quiz").post(
  quizFileUpload.fields([
    { name: "thumbnailFile", maxCount: 1, dest: "uploads/thumbnai" },
    { name: "imageFiles", maxCount: 10, dest: "uploads/quizzes" },
  ]),
  postQuiz
);
quizRouter.route("/edit/:id([0-9a-f]{24})").post(
  quizFileUpload.fields([
    { name: "thumbnailFile", maxCount: 1, dest: "uploads/thumbnai" },
    { name: "imageFiles", maxCount: 10, dest: "uploads/quizzes" },
  ]),
  postEdit
);
quizRouter.route("/solve/:id([0-9a-f]{24})").get(getSolveQuiz);
quizRouter.route("/maked/:id([0-9a-f]{24})").get(getUserRequestQuizzes);
quizRouter.route("/delete/:id([0-9a-f]{24})").post(postDelete);
quizRouter.route("/edit/:id([0-9a-f]{24})").get(getQuizForId);
quizRouter.route("/add-comment/:id([0-9a-f]{24})").post(addComment);
quizRouter.route("/getComment/:id([0-9a-f]{24})").get(getComment);
export default quizRouter;
