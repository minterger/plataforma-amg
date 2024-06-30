import { Router } from "express";
import {
  createEmpresa,
  deleteEmpresa,
  getEmpresas,
  getEmpresa,
  updateEmpresa,
} from "../controllers/empresa.controller.js";
import { decodeToken } from "../helpers/jsonwebtoken.js";

const router = Router();

router.get("/empresas", decodeToken, getEmpresas);

router.post("/empresas", decodeToken, createEmpresa);

router.get("/empresas/:id/:type", decodeToken, getEmpresa);

router.put("/empresas/:id", decodeToken, updateEmpresa);

router.delete("/empresas/:id", decodeToken, deleteEmpresa);

export default router;
