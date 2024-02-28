import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const gentToken = (data) => {
  const token = jwt.sign({ id: data }, process.env.PRIVATE_KEY, {
    expiresIn: "6h",
  });
  return token;
};

export const decodeToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) return res.status(404).json("Error");

    const { id } = jwt.verify(authorization, process.env.PRIVATE_KEY);

    const user = await User.findById(id).select("-password");

    if (user) {
      req.user = user;
      console.log(user);
      next();
    } else {
      return res.status(400).json({ message: "Usuario inexistente" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "internal server error" });
  }
};
