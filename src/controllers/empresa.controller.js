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

export const createEmpresa = async (req, res) => {
  try {
    const { empresa, id_tributaria } = req.body;

    const ifEmpresa = await Empresa.findOne({ id_tributaria });

    if (ifEmpresa)
      return res.status(404).json({
        message: "La empresa ya existe",
      });

    const newEmpresa = new Empresa({
      empresa,
      id_tributaria,
    });

    await newEmpresa.save();

    res.json({
      message: "La empresa se guardo correctamente",
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.error(error);
  }
};

export const deleteEmpresa = async (req, res) => {
  try {
    const { id_tributaria } = req.params;

    const ifEmpresa = await Empresa.findOne({ id_tributaria });

    if (!ifEmpresa)
      return res.status(404).json({
        message: "La empresa no existe",
      });

    await ifEmpresa.deleteOne();

    res.json({
      message: "La empresa se elimino correctamente",
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.error(error);
  }
};

export const updateEmpresa = async (req, res) => {
  try {
    const { id_tributaria } = req.params;
    const { empresa, new_id_tributaria } = req.body;

    const searchEmpresa = await Empresa.findOne({ id_tributaria });

    if (!searchEmpresa)
      return res.status(404).json({
        message: "No se encontro ninguna empresa",
      });

    searchEmpresa.empresa = empresa || searchEmpresa.empresa;
    searchEmpresa.id_tributaria = new_id_tributaria || id_tributaria;

    await searchEmpresa.save();

    res.json({
      message: "La empresa fue actualizada",
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.error(error);
  }
};

export const searchEmpresa = async (req, res) => {
  try {
    const { search } = req.query;

    const searchedEmpresas = await Empresa.find({
      empresa: { $regex: `.*${search}.*` },
    });

    if (!searchedEmpresa.length)
      return res.status(404).json({
        message: "No se encontro ningun resultado",
      });

    res.json({
      searchedEmpresas,
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.error(error);
  }
};
