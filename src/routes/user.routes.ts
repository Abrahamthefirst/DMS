import express from "express";
import UserController from "../api/account/account.controller";
import upload from "../config/multer";

export function createUserRouter(userController: UserController) {
  const router = express.Router();

  router.get("/", userController.getAllUsers);
  router.get("/:id", userController.getUserById);
  router.post("/upload", upload.array("files"), userController.uploadDocuments);
  router.post("/documents", userController.getUserDocuments);

  return router;
}
