import express from "express";
import { postContact } from "../controller/adminController";
const adminRouter = express.Router();

adminRouter.route("/contacts").post(postContact);

export default adminRouter;
