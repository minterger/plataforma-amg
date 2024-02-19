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
    const { id } = jwt.verify(req.body.token, process.env.PRIVATE_KEY);

    const user = await User.findById(id);

    if (user) {
      req.user = user;
      next();
    } else {
      return res.status(400).json({ message: "usuario inexistente" });
    }
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};
