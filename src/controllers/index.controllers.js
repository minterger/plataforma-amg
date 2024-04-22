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
    datos_tafico: {
      origen: "Rosario, Argentina",
      destino: "Chillan, Chile",
      mercaderia: "Aceite",
      crt: "",
    },
    emp_contratada: {
      empresa: "GERARDO HORACIO LOPEZ",
      id_tributaria: "20-17528029-5",
    },
    datos_unidad: {
      placa_tractor: "AA754FS",
      placa_semi: "MDT 334",
      chofer: "PABLO ARMANDO ZALAZAR",
      dni: "23949375",
    },
    contratacion: {
      valor: "2,150.00",
      moneda: "USD",
      condicion_pago: "VTO DE PAGO A 45 DIAS UNA VEZ LLEGUEN LOS ORIGINALES",
    },
    datos_facturacion: {
      // razon_facturacion: "M.I.L.M.A.R. S.A.",
      // cuit_rut_facturacion: "30-71118581-6",
      razon_facturacion: "AMG LIMITADA",
      cuit_rut_facturacion: "77-698245-8",
      // razon_facturacion: "PANTONE BLANCA NIEVES",
      // cuit_rut_facturacion: "27-16330921-7",
    },

    recordatorios: "",
  });
  res.sendFile(path.join(__dirname, "../public/contrato.pdf"));
};
