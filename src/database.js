import mongoose from "mongoose";

(async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:Lalocota1@cluster0.yrceh.mongodb.net/transporteamg"
    );
    console.log("database conected");
  } catch (error) {
    console.error(error);
  }
})();
