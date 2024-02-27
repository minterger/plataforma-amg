import { Router } from "express";
import {
  createEmpresa,
  deleteEmpresa,
  getEmpresas,
  updateEmpresa,
} from "../controllers/empresa.controller.js";

const router = Router();

router.get("/empresas", getEmpresas);

router.post("/empresas", createEmpresa);

router.pull("/empresas/:id_tributaria", updateEmpresa);

router.delete("/empresas/:id_tributaria", deleteEmpresa);

export default router;
