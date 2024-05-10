import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ title, load, reps, createdAt, _id }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const deleteWorkout = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(`/api/workouts/${_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      console.log("workout deleted", json);
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }

    if (!response.ok) {
      console.log(json.error);
    }
  };

  return (
    <div className="workout-details">
      <h4>{title}</h4>
      <p>
        <strong>Load(kg):</strong> {load}
      </p>
      <p>
        <strong>Reps:</strong> {reps}
      </p>
      <p>Added {formatDistanceToNow(createdAt, { addSuffix: true })}</p>
      <span
        className="material-symbols-outlined"
        onClick={() => deleteWorkout()}
      >
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
