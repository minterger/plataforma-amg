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
  // const id = "AMG-LXDB1LE2";

  // const viaje = await Viaje.findById(id);

  generatePDF({
    id,
    // id: "AMG-LWUZI4VX",
    // date: "31 de Mayo de 2024",
    datos_tafico: {
      origen: "Casablanca, Chile",
      destino: "Buenos Aires, Argentina",
      mercaderia: "PVC TEXTIL",
      crt: "CL.318.001184",
      // remito: "R-0067-00004313",
    },
    emp_contratada: {
      // empresa: "CCOTRANS SRL",
      // id_tributaria: "30-71007609-6",
      // empresa: "PONCE FRANCO HUMBERTO",
      // id_tributaria: "20-32728521-2",
      // empresa: "MARENGO HERMANOS S.A.",
      // id_tributaria: "30-71039140-4",
      // empresa: "GARCIA, JORGE MARCELO",
      // id_tributaria: "20-26919825-8",
      // empresa: "GONZALEZ LUCIO",
      // id_tributaria: "20-18521256-5",
      // empresa: "MANSUR ELIAS",
      // id_tributaria: "20-32651967-8",
      // empresa: "LEMOS MATIAS EDUARDO",
      // id_tributaria: "23-33966927-9",
      // empresa: "DON GIL S.A.",
      // id_tributaria: "30-70968347-7",
      // empresa: "MANOJO S.A.",
      // id_tributaria: "30-70848357-1",
      // empresa: "GUERRERO ROBERTO OSVALDO...",
      // id_tributaria: "30-63483048-7",
      // empresa: "GABRIEL FERRER S.A.",
      // id_tributaria: "30-71279930-3",
      // empresa: "TRANSPORTES ZAMARIAN S.R.L.",
      // id_tributaria: "30-70799197-2",
      // empresa: "APPUGLIESE PATRICIA FANNY",
      // id_tributaria: "27-17553716-9",
      empresa: "SANCHEZ CRISTIAN",
      id_tributaria: "20-32133475-0",
    },
    datos_unidad: {
      placa_tractor: "LPE 136",
      placa_semi: "KCK 880",
      chofer: "FACUNDO RUMI",
      dni: "33930100",
    },
    contratacion: {
      valor: "1,700.00",
      moneda: "USD",
      condicion_pago: "VTO DE PAGO A 45 DIAS UNA VEZ LLEGUEN LOS ORIGINALES",
    },
    datos_facturacion: {
      // razon_facturacion: "M.I.L.M.A.R. S.A.",
      // cuit_rut_facturacion: "30-71118581-6",
      razon_facturacion: "TRANSPORTES AMG LIMITADA",
      cuit_rut_facturacion: "77-698245-8",
      // razon_facturacion: "PANTONE BLANCA NIEVES",
      // cuit_rut_facturacion: "27-16330921-7",
    },

    recordatorios:
      "A LA HORA DE ENTREGA DE DOCUMENTACION, ADJUNTAR CONTRATO DE FLETE Y FACTURA",
  });

  res.sendFile(path.join(__dirname, `../public/${id}.pdf`));

  setTimeout(async () => {
    await fs.unlink(path.join(__dirname, `../public/${id}.pdf`));
  }, 2);
};
