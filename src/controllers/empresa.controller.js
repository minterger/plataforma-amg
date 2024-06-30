import Empresa from "../models/Empresa.js";

/**
 * controlador que retorna array paginada con empresas
 * @param {Object} req proviene de Express
 * @param {Object} res proviene de Express
 * @returns retorna todas las empresas
 */
export const getEmpresas = async (req, res) => {
  const { page, limit, filter, search, type } = req.query;
  try {
    const options = {
      page: page || 1,
      limit: limit || 10,
    };

    let empresas;

    if (filter && search) {
      empresas = await Empresa.paginate({
        type,
        // buscar por empresa usando un regex que busca en cualquier parte de la cadena dentro de filter sin importar mayusculas o minusculas
        [filter]: { $regex: `.*${search}.*`, $options: "i" },
      });
    } else {
      empresas = await Empresa.paginate({ type }, options);
    }
    return res.json(empresas);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.error(error);
  }
};

/**
 * controlador que retorna una empresa por id_tributaria
 * @param {Object} req proviene de Express
 * @param {Object} res proviene de Express
 * @returns retorna una empresa
 */

export const getEmpresa = async (req, res) => {
  try {
    const { id, type } = req.params;

    const empresa = await Empresa.findOne({ _id: id, type });

    if (empresa) {
      res.json(empresa);
    } else {
      res.status(404).json({
        message: "No existe esta empresa",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

/**
 * controlador para crear una Empresa requiere dato "empresa" y "id_tributaria" en el body
 * @param {Object} req proviene de Express
 * @param {Object} res proviene de Express
 * @returns retorna si la empresa fue creada con exito
 */
export const createEmpresa = async (req, res) => {
  try {
    const { empresa, id_tributaria, type } = req.body;

    if (!/[0-9]{2}-[0-9]{8}-[0-9]/g.test(id_tributaria)) {
      return res.json(404, {
        message: "Id tributaria incorrecta",
      });
    }

    if (!["transporte", "cliente"].includes(type)) {
      return res.json({ message: "Tipo de empresa incorrecto" });
    }

    const ifEmpresa = await Empresa.findOne({ id_tributaria });

    if (ifEmpresa) {
      if (!ifEmpresa.type.includes(type)) {
        ifEmpresa.type.push(type);

        await ifEmpresa.save();
        res.status(200).json({
          message: "La empresa se actualizo y se añadio como " + type,
        });
        return;
      }

      res.status(404).json({
        message: "La empresa ya existe: " + ifEmpresa.type,
      });
      return;
    }

    const newEmpresa = new Empresa({
      empresa,
      id_tributaria,
      type: [type],
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

/**
 * Elimina una empresa por id que viene como un parametro id_tributaria
 * @param {Object} req proviene de Express
 * @param {Object} res proviene de Express
 * @returns retorna si la empresa fue eliminada o no
 */
export const deleteEmpresa = async (req, res) => {
  try {
    const { id } = req.params;

    const ifEmpresa = await Empresa.findById(id);

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

/**
 * controlador para actualizar datos de empresa
 * @param {Object} req proviene de Express
 * @param {Object} res proviene de Express
 * @returns retorna respuesta a update Empresa
 */
export const updateEmpresa = async (req, res) => {
  try {
    const { id } = req.params;
    const { empresa, id_tributaria } = req.body;

    const searchEmpresa = await Empresa.findById({ id });

    if (!searchEmpresa)
      return res.status(404).json({
        message: "No se encontro ninguna empresa",
      });

    searchEmpresa.empresa = empresa || searchEmpresa.empresa;
    searchEmpresa.id_tributaria = id_tributaria || searchEmpresa.id_tributaria;

    await searchEmpresa.save();

    res.json({
      message: "La empresa fue actualizada",
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.error(error);
  }
};

/**
 * Busca con una expresion regular dentro del modelo Empresas
 * @param {Object} req proviene de Express
 * @param {Object} res proviene de Express
 * @returns retorna busqueda de empresas
 */
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

/**
 * Obtiene una empressa y puebla los choferes
 * @param {Object} req proviene de Express
 * @param {Object} res proviene de Express
 * @returns
 */
export const getOneEmpresa = async (req, res) => {
  try {
    const { id_tributaria } = req.body;

    if (!id_tributaria)
      return res.status(404).json({ message: "Id Tributaria bacia" });

    const empresa = await Empresa.findOne({ id_tributaria }).populate(
      "choferes"
    );

    if (empresa) {
      res.json(empresa);
    } else {
      res.status(404).json({
        message: "No existe esta empresa",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};
