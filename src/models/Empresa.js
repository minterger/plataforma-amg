import { Schema, model } from "mongoose";

const EmpresaSchema = new Schema({
  emp_contratada: {
    empresa: { type: String, required: true },
    id_tributaria: { type: String, required: true },
  },
  list_patentes: {
    placa_semi: [{ type: String }],
    placa_tractor: [{ type: String }],
  },
  choferes: [
    {
      chofer: { type: String },
      dni: { type: Number },
    },
  ],
});

export default model("Empresa", EmpresaSchema);
