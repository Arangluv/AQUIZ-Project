import express from "express";
import {
  userLoginValid,
  getUserInfo,
  getRefresh,
} from "../controller/userController";
import { getContacts } from "../controller/adminController";
const apiRouter = express.Router();

apiRouter.route("/login").get(userLoginValid);
apiRouter.route("/userInfo").get(getUserInfo);
apiRouter.route("/user-contacts").get(getContacts);
apiRouter.route("/refresh-token/:id").get(getRefresh);
export default apiRouter;
