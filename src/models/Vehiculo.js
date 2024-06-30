import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const ObjectId = Schema.ObjectId;

const VehiculoSchema = new Schema({
  patente: { type: String, required: true, unique: true },
  modelo: { type: String },
  chasis: { type: String },
  tipo: { type: String },
  año: { type: Number },
  ejes: { type: Number },
  empresa: [{ type: ObjectId, ref: "Empresa" }],
});

VehiculoSchema.plugin(mongoosePaginate);

export default model("Vehiculo", VehiculoSchema);
