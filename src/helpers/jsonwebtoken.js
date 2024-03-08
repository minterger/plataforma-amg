import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * funcion genera un token guardando el id del usuario
 * @param {Array} data id del usuario
 * @returns retorna el token de jsonwebtoken
 */
export const genToken = (data) => {
  const token = jwt.sign({ id: data }, process.env.PRIVATE_KEY, {
    expiresIn: "6h",
  });
  return token;
};

/**
 * verifica que el token sea correcto, que viene en el header como Authorization y guarda en req.user el usuario
 * @param {Object} req proviene de Express
 * @param {Object} res proviene de Express
 * @param {Object} next proviene de Express
 * @returns retorna respuesta de errores si el token es inco
 */
export const decodeToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) return res.status(404).json("Error");

    const { id } = jwt.verify(authorization, process.env.PRIVATE_KEY);

    const user = await User.findById(id).select("-password");

    if (user) {
      req.user = user;
      next();
    } else {
      return res.status(400).json({ message: "Usuario inexistente" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "internal server error" });
  }
};
