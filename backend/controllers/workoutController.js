import mongoose from "mongoose";
import Workout from "../models/WorkoutModel.js";

// get all workout

const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.json({ error: error.message });
  }
};

// get single workout
const getSingleWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such workout " });
    }
    const workout = await Workout.findById(id);

    if (!workout) {
      return res.status(404).json({ error: "No such workout " });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.json({ error: error.message });
  }
};

// create new workout
const createWorkout = async (req, res) => {
  // ad doc to DB
  try {
    const { title, load, reps } = req.body;

    let emptyFields = [];

    if (!title) {
      emptyFields.push("title");
    }
    if (!load) {
      emptyFields.push("load");
    }
    if (!reps) {
      emptyFields.push("reps");
    }
    if (emptyFields.length > 0) {
      return res
        .status(400)
        .json({ error: "Please fill out all the fields", emptyFields });
    }

    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete workout

const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such workout " });
    }
    const workout = await Workout.findByIdAndDelete(id);

    if (!workout) {
      return res.status(404).json({ error: "No such workout " });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.json({ error: error.message });
  }
};

// update all workout

const updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such workout " });
    }
    const workout = await Workout.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    if (!workout) {
      return res.status(404).json({ error: "No such workout " });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.json({ error: error.message });
  }
};

export {
  getWorkouts,
  getSingleWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
