import express from "express";
import cors from "cors";
import { createAuthRouter } from "./authRoute";
import { createUserRouter } from "./userRoute";
import authenticate from "../middleware/authenticate";
import adminAuthorization from "../middleware/adminAuthorization";
import AuthController from "../api/auth/auth.controller";
import UserController from "../api/account/account.controller";
import editorAuthorization from "../middleware/editorAuthorization";
import { DependencyManager } from "../classes/dep_manager";

export function registerAllApplicationRoutes(
  app: express.Application,
  dm: DependencyManager
) {
  app.use(cors());

  const authController = dm.getController<AuthController>("auth");
  const userController = dm.getController<UserController>("user");

  const authRouter = createAuthRouter(authController);
  const userRouter = createUserRouter(userController);

  app.use("/auth", authRouter);

  //   app.use(authenticate);
  //   app.use(editorAuthorization);

  app.use("/user", userRouter);

  app.use((req, res, next) => {
    res.status(404);
    next();
  });
}
