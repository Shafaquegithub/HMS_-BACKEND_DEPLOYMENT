import mongoose from "mongoose";

export const dbConnection = () =>
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "HOSPITAL_MANAGEMENT_SYSTEM_FINAL",
    })
    .then((res) => {
      console.log("Connected with db");
    })
    .catch((err) => {
      console.log(err);
    });
