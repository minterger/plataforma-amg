import uniqid from "uniqid";
import { fileURLToPath } from "url";
import path from "path";
import generatePDF from "../helpers/generatepdf.js";
import Empresa from "../models/Empresa.js";
import Viaje from "../models/Viaje.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * obtiene el contrate de flete segun el id del viaje
 * @param {Object} req proviene de Express
 * @param {Object} res proviene de Express
 */
export const getContratoFlete = async (req, res) => {
  const { id } = req.params;

  const viaje = await Viaje.findById(id);

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
    datos_facturacion: {
      razon_facturacion: "Pantone Blanca Nieves",
      cuit_rut_facturacion: "27163309217",
    },

    recordatorios:
      "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  });
  res.sendFile(path.join(__dirname, "../public/contrato.pdf"));
};
