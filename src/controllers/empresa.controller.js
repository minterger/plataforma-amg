import Empresa from "../models/Empresa.js";

export const getEmpresas = async (req, res) => {
  try {
    const { page, limit, search } = req.query;

    const options = {
      page: page || 1,
      limit: limit || 10,
    };

    const empresas = await Empresa.paginate({}, options);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.error(error);
  }
};
