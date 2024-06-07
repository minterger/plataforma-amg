import { Router } from "express";
import { getContratoFlete } from "../controllers/index.controllers.js";
import { decodeToken } from "../helpers/jsonwebtoken.js";

const route = Router();

// route.get("/viaje/:contrato", decodeToken, getContratoFlete);
route.get("/viaje/:contrato", getContratoFlete);
route.get("/viaje", getContratoFlete);

export default route;
