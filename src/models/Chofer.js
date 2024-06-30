import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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
  empresa: [{ type: ObjectId, ref: "Empresa" }],
});

ChoferSchema.plugin(mongoosePaginate);

export default model("Chofer", ChoferSchema);
