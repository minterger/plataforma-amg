import uniqid from "uniqid";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs/promises";
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
  // const { id } = req.params;

  const id = uniqid.time("AMG-").toUpperCase();
  // const id = "AMG-LWZ3OUOB";

  // const viaje = await Viaje.findById(id);

  generatePDF({
    id,
    // id: "AMG-LWUZI4VX",
    // date: "31 de Mayo de 2024",
    datos_tafico: {
      origen: "San Antonio, Chile",
      destino: "Buenos Aires, Argentina",
      mercaderia: "Bananas",
      crt: "053/24LV",
    },
    emp_contratada: {
      // empresa: "CCOTRANS SRL",
      // id_tributaria: "30-71007609-6",
      // empresa: "GARCIA, JORGE MARCELO",
      // id_tributaria: "20-26919825-8",
      empresa: "GONZALEZ LUCIO",
      id_tributaria: "20-18521256-5",
      // empresa: "GUERRERO ROBERTO OSVALDO...",
      // id_tributaria: "30-63483048-7",
      // empresa: "GABRIEL FERRER S.A.",
      // id_tributaria: "30-71279930-3",
      // empresa: "TRANSPORTES ZAMARIAN S.R.L.",
      // id_tributaria: "30-70799197-2",
      // empresa: "APPUGLIESE PATRICIA FANNY",
      // id_tributaria: "27-17553716-9",
    },
    datos_unidad: {
      placa_tractor: "GIV 019",
      placa_semi: "KGH 239",
      chofer: "MODICA ANDRES",
      dni: "38474888",
    },
    contratacion: {
      valor: "1,800.00",
      moneda: "USD DOLAR OFICIAL",
      condicion_pago: "VTO DE PAGO A 45 DIAS UNA VEZ LLEGUEN LOS ORIGINALES",
    },
    datos_facturacion: {
      // razon_facturacion: "M.I.L.M.A.R. S.A.",
      // cuit_rut_facturacion: "30-71118581-6",
      // razon_facturacion: "AMG LIMITADA",
      // cuit_rut_facturacion: "77-698245-8",
      razon_facturacion: "PANTONE BLANCA NIEVES",
      cuit_rut_facturacion: "27-16330921-7",
    },

    recordatorios:
      "A LA HORA DE ENTREGA DE DOCUMENTACION, ADJUNTAR CONTRATO DE FLETE Y FACTURA",
  });

  res.sendFile(path.join(__dirname, `../public/${id}.pdf`));
  setTimeout(async () => {
    await fs.unlink(path.join(__dirname, `../public/${id}.pdf`));
  }, 2);
};
