import express from "express";
import morgan from "morgan";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import indexRouter from "./routes/index.routes.js";

import "./database.js";

// variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// init express
const app = express();

// settings
app.set(express.json());
app.set(express.urlencoded({ extended: true }));

// middlewares
app.use(morgan("dev"));
app.use(cors());

// routes
app.use(indexRouter);

// path publico
app.use(express.static(path.join(__dirname, "public")));

export default app;
