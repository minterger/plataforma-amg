import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import uniqid from "uniqid";
import generatePDF from "./helpers/generatepdf";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  generatePDF({
    id: uniqid.time("AMG-").toUpperCase(),
    date: "9 de Febrero de 2024",
    datos_tafico: {
      origen: "Buenos Aires, Argentina",
      destino: "chile",
      mercaderia: "ejemplo",
    },
    emp_contratada: {
      empresa: "Pantone Blanca Nieves",
      id_tributaria: "27163309217",
    },
    datos_unidad: {
      placa_tractor: "EJE 123",
      placa_semi: "EJE 321",
      chofer: "Mariano Alejandro Romero",
      dni: "32736876",
    },
    contratacion: {
      valor: "2,700.00",
      moneda: "USD",
      condicion_pago: "VTO DE PAGO A 30 DIAS",
    },
    recordatorios:
      "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  });
  res.sendFile(path.join(__dirname, "test.pdf"));
});

export default app;
