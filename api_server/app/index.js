import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import allShoesRouter from "./routes/allShoes_router.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.text());
app.use(cors());

app.use("/shoes", allShoesRouter);

await db.createConnection();

export default app;
