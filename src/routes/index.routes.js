import { Router } from "express";
import { getContratoFlete } from "../controllers/index.controllers.js";
import { decodeToken } from "../helpers/jsonwebtoken.js";

const route = Router();

route.get("/viaje/:contrato", decodeToken, getContratoFlete);

export default route;
