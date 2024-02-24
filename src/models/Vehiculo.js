import { Schema, model } from "mongoose";

const ObjectId = Schema.ObjectId;

const VehiculoSchema = new Schema({
  patente: { type: String, required: true, unique: true },
  modelo: { type: String },
  chasis: { type: String },
  tipo: { type: String },
  año: { type: Number },
  ejes: { type: Number },
  empresa: { type: ObjectId, ref: "Empresa" },
});

export default model("Vehiculo", VehiculoSchema);
