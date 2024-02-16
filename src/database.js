import mongoose from "mongoose";

(async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("database conected");
  } catch (error) {
    console.error(error);
  }
})();
