import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer";

import FileController from "./app/controller/FileController";

const routes = new Router();

routes.get("/files", FileController.index);

routes.post(
  "/files",
  multer(multerConfig).single("file"),
  FileController.store
);

export default routes;
