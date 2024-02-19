import { Schema, model } from "mongoose";
import uniqid from "uniqid";

const ObjectId = Schema.ObjectId;

const ViajeSchema = new Schema(
  {
    id: { type: ObjectId, default: uniqid.time("AMG-").toUpperCase() },
    mic: { type: String },
    crt: { type: String },
    datos_tafico: {
      origen: { type: String, required: true },
      destino: { type: String, required: true },
      mercaderia: { type: String, required: true },
    },
    emp_contratada: {
      empresa: { type: String, required: true },
      id_tributaria: { type: String, required: true },
    },
    datos_unidad: {
      placa_tractor: { type: String, required: true },
      placa_semi: { type: String, required: true },
      chofer: { type: String, required: true },
      dni: { type: String, required: true },
    },
    contratacion: {
      valor: { type: Number, required: true },
      moneda: { type: String, required: true },
      condicion_pago: { type: String, required: true },
    },
    recordatorios: String,
    status: { type: String, default: "started" },
  },
  {
    timestamps: true,
  }
);

export default model("Viaje", ViajeSchema);
