import dotenv from "dotenv";
import express from "express";
import workoutRoutes from "./routes/workouts.js";
import userRoutes from "./routes/user.js";
import mongoose from "mongoose";

// Load environment variables from .env file
dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log(
        `Connected to DB and listening on port ${process.env.PORT}!!`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
