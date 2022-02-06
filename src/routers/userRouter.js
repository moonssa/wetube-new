import express from "express";
import {
  getEdit,
  postEdit,
  remove,
  see,
  logout,
  startGithubLogin,
  finishGithubLogin,
  getChangePasswd,
  postChangePasswd,
} from "../controllers/userController";

import {
  avatarUpload,
  protectorMiddleware,
  publicOnlyMiddleware,
} from "../middlewares";

const userRouter = express.Router();
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter
.route("/edit")
.all(protectorMiddleware)
.get(getEdit)
.post(avatarUpload.single("avatar"), postEdit);
userRouter
.route("/change-passwd")
.all(protectorMiddleware)
.get(getChangePasswd)
.post(postChangePasswd);
userRouter.get("/remove", remove);
userRouter.get("/logout", protectorMiddleware, logout);
userRouter.get("/:id", see);

export default userRouter;
