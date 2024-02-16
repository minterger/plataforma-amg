import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    const user = await User.findOne({ email });

    if (user) return res.status(404).json({ message: "user is already exist" });

    if (password !== confirmPassword)
      return res.status(404).json({ message: "password does not match" });

    const newUser = new User({
      name,
      email,
      password,
    });

    const newUserSaved = await newUser.save();

    res.json({
      message: "user is created",
      newUserSaved,
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.error(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.find({ email });

    if (!user) return res.status(404).json({ message: "Usuario no existe" });

    const passwordMatch = await user.comparePassword(password);

    if (passwordMatch)
      return res.status(404).json({ message: "Contraseña incorrecta" });

    res.json({ passwordMatch });
  } catch (error) {}
};
