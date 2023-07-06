import { useState, useEffect } from "react";
import "./NutritionPage.css";

export default function Nutrition({ isLoggedIn }) {
  const [message, setMessage] = useState("");
  const [foodName, setFoodName] = useState("");
  const [foodType, setFoodType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [calories, setCalories] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [nutritionLogs, setNutritionLogs] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      setMessage("You are logged in. Add your nutrition data.");
    } else {
      setMessage("Login to add your nutrition data.");
    }
  }, [isLoggedIn]);

  const handleAddNutrition = (event) => {
    event.preventDefault();

    const nutritionData = {
      foodName,
      foodType,
      quantity,
      calories,
      imageUrl,
    };

    setNutritionLogs((prevLogs) => [...prevLogs, nutritionData]);

    setFoodName("");
    setFoodType("");
    setQuantity("");
    setCalories("");
    setImageUrl("");

    setIsSubmitted(true);
  };

  return (
    <div className="NutritionPage">
      <h2>{message}</h2>

      {isLoggedIn && (
        <div>
          <form onSubmit={handleAddNutrition}>
          <label htmlFor="foodName">Food Name:</label>
            <input type="text" name="foodName" id="foodName" value={foodName} onChange={(e) => setFoodName(e.target.value)} required />

            <label htmlFor="foodType">Food Type:</label>
            <select name="foodType" id="foodType" value={foodType} onChange={(e) => setFoodType(e.target.value)}>
              <option value="snack">Snack</option>
              <option value="food">Food</option>
              <option value="beverage">Beverage</option>
            </select>

            <label htmlFor="quantity">Quantity:</label>
            <input type="number" name="quantity" id="quantity" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />

            <label htmlFor="calories">Calories:</label>
            <input type="number" name="calories" id="calories" value={calories} onChange={(e) => setCalories(parseInt(e.target.value))} />

            <label htmlFor="imageUrl">Image URL:</label>
            <input type="text" name="imageUrl" id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />

            <button type="submit">Add Nutrition</button>
          </form>

        

          <div className="previousLogs">
            <h2>Nutrition Data</h2>
            {nutritionLogs.map((log, index) => (
              <div key={index}>
                {/* Display previous nutrition logs */}
                <p>Food Name: {log.foodName}</p>
                <p>Food Type: {log.foodType}</p>
                <p>Quantity: {log.quantity}</p>
                <p>Calories: {log.calories}</p>
                <div className="imageContainer">
                  <div className="imageCircle" style={{ backgroundImage: `url(${log.imageUrl})` }}></div>
                </div>
                <hr />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
