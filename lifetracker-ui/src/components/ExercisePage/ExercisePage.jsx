import { useEffect, useState } from "react";
import "./ExercisePage.css"


export default function Exercise({ isLoggedIn }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      setMessage("You are logged in. Here is your exercise data.");
    } else {
      setMessage("Login to see your exercise data.");
    }
  }, [isLoggedIn]);

  return (
    <div className="ExercisePage">
      <h1>{message}</h1>
    </div>
  );
}
