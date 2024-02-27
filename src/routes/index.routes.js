import { Router } from "express";
import { getContratoFlete } from "../controllers/index.controllers.js";

const route = Router();

route.get("/:contrato", getContratoFlete);

export default route;
