import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import indexRouter from "./routes/index.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(indexRouter);

app.use(express.static(path.join(__dirname, "public")));

export default app;
