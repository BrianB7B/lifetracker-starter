import { useEffect, useState } from "react";
import "./ExercisePage.css";
import axios from 'axios';


export default function Exercise({ isLoggedIn }) {
  const [message, setMessage] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseType, setExerciseType] = useState("run");
  const [duration, setDuration] = useState("");
  const [intensity, setIntensity] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [exerciseLog, setExerciseLog] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      setMessage("You are logged in. Here is your exercise data.");
    } else {
      setMessage("Login to see your exercise data.");
    }
  }, [isLoggedIn]);

  const handleAddExercise = (event) => {
    event.preventDefault();

    const exerciseData = {
      exerciseName,
      exerciseType,
      duration,
      intensity,
    };

    setExerciseLog((prevLogs) => [...prevLogs, exerciseData]);

    setExerciseName("");
    setExerciseType("run");
    setDuration("");
    setIntensity("");

    setIsSubmitted(true);
  };
  // const handleAddExercise = async (event) => {
  //   event.preventDefault();
  
  //   const exerciseData = {
  //     exerciseName,
  //     exerciseType,
  //     duration,
  //     intensity,
  //   };
  
  //   try {
  //     const response = await axios.post('/exercises', exerciseData);
  //     const newExercise = response.data.exercise;
  
  //     setExerciseLog((prevLogs) => [...prevLogs, newExercise]);
  
  //     setExerciseName('');
  //     setExerciseType('run');
  //     setDuration('');
  //     setIntensity('');
  
  //     setIsSubmitted(true);
  //   } catch (error) {
  //     console.error('Error adding exercise: ', error);
  //     // Handle error here, show an error message, etc.
  //   }
  // };
  

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

          <div className="previousLogs">
            <h2>Exercise Data</h2>
            {exerciseLog.map((log, index) => (
              <div key={index}>
                {/* Display previous exercise logs */}
                <p>Exercise Name: {log.exerciseName}</p>
                <p>Exercise Type: {log.exerciseType}</p>
                <p>Duration: {log.duration}</p>
                <p>Intensity: {log.intensity}</p>
                <hr />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// import { useEffect, useState } from "react";
// import Cookies from "js-cookie";
// import "./ExercisePage.css";


// export default function Exercise({ isLoggedIn }) {
//   const [message, setMessage] = useState("");
//   const [exerciseName, setExerciseName] = useState("");
//   const [exerciseType, setExerciseType] = useState("run");
//   const [duration, setDuration] = useState("");
//   const [intensity, setIntensity] = useState("");
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [exerciseLog, setExerciseLog] = useState([]);

//   useEffect(() => {
//     if (isLoggedIn) {
//       setMessage("You are logged in. Here is your exercise data.");
//     } else {
//       setMessage("Login to see your exercise data.");
//     }
//   }, [isLoggedIn]);

//   useEffect(() => {
//     const savedExerciseLog = Cookies.get("exerciseLog");
  
//     if (savedExerciseLog) {
//       setExerciseLog(JSON.parse(savedExerciseLog));
//     }
//   }, []);
  
//   useEffect(() => {
//     Cookies.set("exerciseLog", JSON.stringify(exerciseLog));
//   }, [exerciseLog]);

//   const handleAddExercise = (event) => {
//     event.preventDefault();

//     const exerciseData = {
//       exerciseName,
//       exerciseType,
//       duration,
//       intensity,
//     };

//     setExerciseLog((prevLogs) => [...prevLogs, exerciseData]);

//     setExerciseName("");
//     setExerciseType("run");
//     setDuration("");
//     setIntensity("");

//     setIsSubmitted(true);
//   };

//   return (
//     <div className="ExercisePage">
//       <h1>{message}</h1>
//       {isLoggedIn && (
//         <div>
//           <form onSubmit={handleAddExercise}>
//             <label htmlFor="exerciseName">Exercise Name:</label>
//             <input
//               type="text"
//               name="exerciseName"
//               id="exerciseName"
//               value={exerciseName}
//               onChange={(e) => setExerciseName(e.target.value)}
//               required
//             />

//             <label htmlFor="exerciseType">Exercise Type:</label>
//             <select
//               name="exerciseType"
//               id="exerciseType"
//               value={exerciseType}
//               onChange={(e) => setExerciseType(e.target.value)}
//             >
//               <option value="run">Run</option>
//               <option value="bike">Bike</option>
//               <option value="lift">Lift</option>
//               <option value="swim">Swim</option>
//               <option value="sports">Sports</option>
//             </select>

//             <label htmlFor="duration">Duration (min):</label>
//             <input
//               type="number"
//               name="duration"
//               id="duration"
//               value={duration}
//               onChange={(e) => setDuration(parseInt(e.target.value))}
//             />

//             <label htmlFor="intensity">Intensity:</label>
//             <input
//               type="number"
//               name="intensity"
//               id="intensity"
//               value={intensity}
//               onChange={(e) => setIntensity(parseInt(e.target.value))}
//               max={10}
//             />

//             <button type="submit">Add Exercise</button>
//           </form>

//           <div className="previousLogs">
//             <h2>Exercise Data</h2>
//             {exerciseLog.map((log, index) => (
//               <div key={index}>
//                 <p>Exercise Name: {log.exerciseName}</p>
//                 <p>Exercise Type: {log.exerciseType}</p>
//                 <p>Duration: {log.duration}</p>
//                 <p>Intensity: {log.intensity}</p>
//                 <hr />
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
