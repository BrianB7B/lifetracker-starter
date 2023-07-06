import "./NutritionPage.css"
import { useEffect, useState } from "react";



export default function Nutrition({ isLoggedIn }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      setMessage("You are logged in. Here is your nutrition data.");
    } else {
      setMessage("Login to see your nutrition data.");
    }
  }, [isLoggedIn]);

  return (
    <div className="NutritionPage">
      <h1>{message}</h1>
    </div>
  );
}