import express from "express";
import {
  getWorkouts,
  getSingleWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} from "../controllers/workoutController.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

// require Auth for all workout routes
router.use(requireAuth);

// GET all workouts
router.get("/", getWorkouts);

// GET single workout
router.get("/:id", getSingleWorkout);

// POST single workout
router.post("/", createWorkout);

// DELETE single workout
router.delete("/:id", deleteWorkout);
// UPDATE single workout

router.patch("/:id", updateWorkout);

export default router;
