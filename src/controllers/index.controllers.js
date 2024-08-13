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
  // const id = "AMG-LZ9WY0G2";

  // const viaje = await Viaje.findById(id);

  generatePDF({
    id,
    // date: "19 de Julio de 2024",
    datos_tafico: {
      origen: "Rosario, Argentina",
      destino: "Santiago, Chile",
      mercaderia: "Bobinas",
      crt: "0570358/24AR",
      remito: "",
    },
    emp_contratada: {
      // empresa: "",
      // id_tributaria: "",
      // empresa: "GABRIEL ROLANDO VERCESI",
      // id_tributaria: "20-23141665-0",
      // empresa: "RAMOS RAMON RICARDO",
      // id_tributaria: "20-10038819-8",
      // empresa: "CCOTRANS SRL",
      // id_tributaria: "30-71007609-6",
      // empresa: "PONCE FRANCO HUMBERTO",
      // id_tributaria: "20-32728521-2",
      // empresa: "MARENGO HERMANOS S.A.",
      // id_tributaria: "30-71039140-4",
      // empresa: "GARCIA, JORGE MARCELO",
      // id_tributaria: "20-26919825-8",
      empresa: "GONZALEZ LUCIO",
      id_tributaria: "20-18521256-5",
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
      // empresa: "SANCHEZ CRISTIAN",
      // id_tributaria: "20-32133475-0",
      // empresa: "EDUARDO ALBERTO BIZZOTTO",
      // id_tributaria: "20-13085704-4",
      // empresa: "LOGISTICA INTERNACIONAL FB SPA",
      // id_tributaria: "76.560.088-K",
    },
    datos_unidad: {
      placa_tractor: "ETK 665",
      placa_semi: "MQU 206",
      chofer: "ANDRES MODICA",
      dni: "41705446",
    },
    contratacion: {
      valor: "1,900.00",
      moneda: "USD",
      condicion_pago: "VTO DE PAGO A 45 DIAS UNA VEZ LLEGUEN LOS ORIGINALES",
      // condicion_pago: "VTO DE PAGO A 30 DIAS UNA VEZ LLEGUEN LOS ORIGINALES",
    },
    datos_facturacion: {
      // razon_facturacion: "-",
      // cuit_rut_facturacion: "-",
      // razon_facturacion: "AMG SIN FRONTERAS S.A.S.",
      // cuit_rut_facturacion: "30-71846247-5",
      razon_facturacion: "M.I.L.M.A.R. S.A.",
      cuit_rut_facturacion: "30-71118581-6",
      // razon_facturacion: "TRANSPORTES AMG LIMITADA",
      // cuit_rut_facturacion: "77-698245-8",
      // razon_facturacion: "PANTONE BLANCA NIEVES",
      // cuit_rut_facturacion: "27-16330921-7",
    },

    recordatorios:
      "A LA HORA DE ENTREGA DE DOCUMENTACION, ADJUNTAR CONTRATO DE FLETE Y FACTURA",
    // "A LA HORA DE ENTREGA DE DOCUMENTACION, ADJUNTAR CONTRATO DE FLETE Y FACTURA,  TENER EN CUENTA QUE AL MOMENTO DEL PAGO SE RESTA EL 7% DE RETENCION POR FACTURACION EN TUCUMAN",
    // "A LA HORA DE ENTREGA DE DOCUMENTACION, ADJUNTAR CONTRATO DE FLETE Y FACTURA, TOMAR EN CUENTA QUE LOS 40 USD POR CLIENTE ES APARTIR DEL SEGUNDO CLIENTE, NO TOMAR EL PRIMER CLIENTE",
    // "A LA HORA DE ENTREGA DE DOCUMENTACION, ADJUNTAR CONTRATO DE FLETE",
  });

  res.sendFile(path.join(__dirname, `../public/${id}.pdf`));

  setTimeout(async () => {
    await fs.unlink(path.join(__dirname, `../public/${id}.pdf`));
  }, 2);
};
