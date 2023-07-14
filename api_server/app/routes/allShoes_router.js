import express from "express";
import allShoesController from "../controller/allShoes_controller.js";

const allShoesRouter = express.Router();

allShoesRouter.get("/", allShoesController.getAllShoes);
allShoesRouter.get("/:id", allShoesController.getAllShoesById);

export default allShoesRouter;
