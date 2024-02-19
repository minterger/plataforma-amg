import { Router } from "express";
import { getContratoFlete } from "../controllers/index.controllers.js";

const route = Router();

route.get("/", getContratoFlete);

route.post("/empresa");

export default route;
