import { Schema, model } from "mongoose";

const ObjectId = Schema.ObjectId;

const ViajeSchema = new Schema(
  {
    id: { type: ObjectId },
    datos_tafico: {
      origen: { type: String, required: true },
      destino: { type: String, required: true },
      mercaderia: { type: String, required: true },
    },
    datos_mic: {
      mic: String,
      crt: String,
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
