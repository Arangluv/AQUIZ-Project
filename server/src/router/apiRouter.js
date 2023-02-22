import express from "express";
import { userLoginValid, getUserInfo } from "../controller/userController";
import { getContacts } from "../controller/adminController";
const apiRouter = express.Router();

apiRouter.route("/login").get(userLoginValid);
apiRouter.route("/userInfo").get(getUserInfo);
apiRouter.route("/user-contacts").get(getContacts);
export default apiRouter;
