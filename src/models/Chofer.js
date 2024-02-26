import { Schema, model } from "mongoose";

const ObjectId = Schema.ObjectId;

const ChoferSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  dni: {
    type: Number,
    required: true,
  },
  empresa: {
    type: ObjectId,
    ref: "Empresa",
  },
});

export default model("Chofer", ChoferSchema);
