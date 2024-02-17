import jwt from "jsonwebtoken";
import User from "../models/User";

export const gentToken = (data) => {
  const token = jwt.sign(data, process.env.PRIVATE_KEY);
  return token;
};

export const decodeToken = async (req, res, next) => {
  const id = jwt.verify(req.body.token, process.env.PRIVATE_KEY);

  const user = await User.findById(id);

  if (user) {
    req.user = user;
    next();
  } else {
    return res.status(400).json({ message: "usuario inexistente" });
  }
};
