import { Schema, model } from "mongoose";

const EmpresaSchema = new Schema({
  empresa: { type: String, required: true },
  id_tributaria: { type: String, required: true },
  patente_semi: [{ type: String }],
  patente_tractor: [{ type: String }],
  choferes: [
    {
      chofer: { type: String },
      dni: { type: Number },
    },
  ],
});

export default model("Empresa", EmpresaSchema);
