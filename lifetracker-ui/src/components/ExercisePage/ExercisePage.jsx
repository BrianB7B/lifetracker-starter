import { useEffect, useState } from "react";
import "./ExercisePage.css";
import axios from 'axios';

export default function ExercisePage({ isLoggedIn, appState }) {
  const [message, setMessage] = useState("");
  const [exerciseName, setExerciseName] = useState(appState?.user?.exerciseName || "");
  const [exerciseType, setExerciseType] = useState(appState?.user?.exerciseType || "run");
  const [duration, setDuration] = useState("");
  const [intensity, setIntensity] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [exerciseLog, setExerciseLog] = useState([]);

  useEffect(() => {
    console.log("appState:", appState);
    if (isLoggedIn) {
      setMessage("You are logged in. Here is your exercise data.");
      fetchExerciseLog();
    } else {
      setMessage("Login to see your exercise data.");
    }
  }, [isLoggedIn]);

  const fetchExerciseLog = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/auth/exercises?userId=${appState?.user.id}`);
      const exerciseData = response.data.exercises;
      console.log('Exercise Data:', exerciseData); // Check the structure of exerciseData
      setExerciseLog(exerciseData);
    } catch (error) {
      console.error('Error fetching exercise log: ', error);
      // Handle error here, show an error message, etc.
    }
  };

  const handleAddExercise = async (event) => {
    event.preventDefault();
    
    const exerciseData = {
      exerciseName,
      exerciseType,
      duration,
      intensity,
      userId: appState.user.id,
    };
  
    try {
      const response = await axios.post('http://localhost:3001/auth/exercises', exerciseData);
      const newExercise = response.data.exercise;
  
      setExerciseLog((prevLogs) => [...prevLogs, newExercise]);
  
      setExerciseName('');
      setExerciseType('run');
      setDuration('');
      setIntensity('');
  
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error adding exercise: ', error);
      // Handle error here, show an error message, etc.
    }
  };

  return (
    <div className="ExercisePage">
      <h1>{message}</h1>
      {isLoggedIn && (
        <div>
          <form onSubmit={handleAddExercise}>
            <label htmlFor="exerciseName">Exercise Name:</label>
            <input
              type="text"
              name="exerciseName"
              id="exerciseName"
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
              required
            />

            <label htmlFor="exerciseType">Exercise Type:</label>
            <select
              name="exerciseType"
              id="exerciseType"
              value={exerciseType}
              onChange={(e) => setExerciseType(e.target.value)}
            >
              <option value="run">Run</option>
              <option value="bike">Bike</option>
              <option value="lift">Lift</option>
              <option value="swim">Swim</option>
              <option value="sports">Sports</option>
            </select>

            <label htmlFor="duration">Duration (min):</label>
            <input
              type="number"
              name="duration"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
            />

            <label htmlFor="intensity">Intensity:</label>
            <input
              type="number"
              name="intensity"
              id="intensity"
              value={intensity}
              onChange={(e) => setIntensity(parseInt(e.target.value))}
              max={10}
            />

            <button type="submit">Add Exercise</button>
          </form>

          {exerciseLog.length > 0 && (
            <div className="previousLogs">
              <h2>Exercise Data</h2>
              {exerciseLog.map((log, index) => {
                const time = new Date(log.created_at);
                const formattedTime = `${time.toLocaleDateString()} ${time.toLocaleTimeString()}`;
                return (
                  <div key={index}>
                    <p>Exercise Name: {log.exerciseName}</p>
                    <p>Exercise Type: {log.exerciseType}</p>
                    <p>Duration: {log.duration}</p>
                    <p>Intensity: {log.intensity}</p>
                    <p>Time: {formattedTime}</p>
                    <hr />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
