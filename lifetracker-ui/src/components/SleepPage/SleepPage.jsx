import "./SleepPage.css"
import { useEffect, useState } from "react";

export default function Sleep({ isLoggedIn }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      setMessage("You are logged in. Here is your sleep data.");
    } else {
      setMessage("Login to see your sleep data.");
    }
  }, [isLoggedIn]);

  return (
    <div className="SleepPage">
      <h1>{message}</h1>
    </div>
  );
}
