import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import generateRoutes from "./routes/generateRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api", generateRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to Database");
    app.listen(PORT, () => {
      console.log(
        `Listening at port: ${PORT} and running in mode: ${process.env.NODE_ENV}`
      );
    });
  })
  .catch((err) => {
    console.error(err);
  });

export default app;
