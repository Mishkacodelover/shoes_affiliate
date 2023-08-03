import express from "express";
import photosController from "../controller/photos_controller.js";

const photosRouter = express.Router();

photosRouter.post("/add", photosController.uploadImage);
photosRouter.get("/image", photosController.getImage);
photosRouter.get("/", photosController.getAllShoesPhotos);
photosRouter.get("/:id", photosController.getAllShoesSinglePhoto);

export default photosRouter;
