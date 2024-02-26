import { Schema, model } from "mongoose";

const ObjectId = Schema.ObjectId;

const EmpresaSchema = new Schema({
  empresa: { type: String, required: true },
  id_tributaria: { type: String, required: true },
  vehiculo: [
    {
      type: ObjectId,
      ref: "Vehiculo",
    },
  ],
  choferes: [
    {
      type: ObjectId,
      ref: "Chofer",
    },
  ],
});

export default model("Empresa", EmpresaSchema);
