import { useState, useEffect } from "react";
import "./SleepPage.css";

export default function Sleep({ isLoggedIn }) {
  // State variables
  const [message, setMessage] = useState("");
  const [sleepData, setSleepData] = useState([]);

  // Side effect to update the message based on the login status
  useEffect(() => {
    if (isLoggedIn) {
      setMessage("You are logged in. Here is your sleep data.");
    } else {
      setMessage("Login to see your sleep data.");
    }
  }, [isLoggedIn]);

  // Event handler for adding sleep data
  const handleAddSleep = (event) => {
    event.preventDefault(); // Prevents the form from submitting and refreshing the page

    const startDateTime = event.target.elements.startTime.value;
    const endDateTime = event.target.elements.endTime.value;

    // Validate input and calculate sleep duration
    if (startDateTime && endDateTime) {
      const startTime = new Date(startDateTime);
      const endTime = new Date(endDateTime);

      if (!isNaN(startTime) && !isNaN(endTime) && startTime < endTime) {
        const sleepDuration = Math.abs(endTime - startTime);
        const sleepEntry = {
          startTime: startTime.toLocaleString(),
          endTime: endTime.toLocaleString(),
          sleepDuration: `${(sleepDuration / (1000 * 60)).toFixed(2)} minutes`,
        };

        setSleepData((prevSleepData) => [...prevSleepData, sleepEntry]);
      } else {
        window.alert("Invalid input. Please enter valid date and time.");
      }
    } else {
      window.alert("Invalid input. Please enter date and time.");
    }

    // Reset the form fields
    event.target.reset();
  };

  // Render the component
  return (
    <div className="SleepPage">
      <div className="header">
        <h1>{message}</h1>
      </div>

      {isLoggedIn && (
        <div className="content">
          <div className="formContainer">
            <h2>Add Sleep</h2>
            <form onSubmit={handleAddSleep}>
              <label htmlFor="startTime">Start Time:</label>
              <input type="datetime-local" name="startTime" id="startTime" required />

              <label htmlFor="endTime">End Time:</label>
              <input type="datetime-local" name="endTime" id="endTime" required />

              <button type="submit">Add Sleep</button>
            </form>
          </div>

          <div className="sleepData">
            <h2>Your Sleep Data</h2>
            {sleepData.map((sleep, index) => (
              <div key={index}>
                <p>Start Time: {sleep.startTime}</p>
                <p>End Time: {sleep.endTime}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
