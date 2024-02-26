import Viaje from "../models/Viaje.js";

export const getViajes = async (req, res) => {
  try {
    const { page, limit, search } = req.query;

    const options = {
      page: page || 1,
      limit: limit || 10,
    };

    const viajes = await Viaje.paginate({}, options);

    res.json(viajes);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });

    console.error(error);
  }
};
