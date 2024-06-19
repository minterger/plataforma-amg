import { Schema, model } from "mongoose";

const ObjectId = Schema.ObjectId;

const EmpresaSchema = new Schema({
  empresa: { type: String, required: true },
  //type puede ser transporte, cliente o ambos
  type: [{ type: String, required: true }],
  //id tributaria puede ser DNI o RUT o lo que se use en ese pais
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
  viajes: [
    {
      type: ObjectId,
      ref: "Viaje",
    },
  ],
});

export default model("Empresa", EmpresaSchema);
