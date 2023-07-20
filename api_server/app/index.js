import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./services/mysql.js";
import fileUpload from "express-fileupload";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import allShoesRouter from "./routes/allShoes_router.js";
import photosRouter from "./routes/photos_router.js";

dotenv.config();
export function currentDir() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  return { __dirname, __filename };
}
const { __dirname } = currentDir();

const app = express();

app.use(express.json());
app.use(express.text());
app.use(cors());
app.use(
  fileUpload({
    createParentPath: true,
    limits: { fileSize: 20 * 1024 * 1024 },
    abortOnLimit: true,
    responseOnLimit: "Imagen demasiado grande",
    uploadTimeout: 0,
  })
);

app.use(express.static(join(__dirname, "public")));

app.use("/shoes", allShoesRouter);
app.use("/photos", photosRouter);

await db.createConnection();

export default app;
