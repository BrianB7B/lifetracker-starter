import { Link } from "react-router-dom";
import "./Home.css";
import tracker from "../../assets/tracker.jpg";
import alarm from "../../assets/alarm.jpg";
import food from "../../assets/food.jpg";
import athlete from "../../assets/athlete.jpg";
import calendar from "../../assets/calendar.jpg";

export default function Home() {
  return (
    <div className="Home">
      <div className="jumbo">
        <div className="text">
          <h1 className="heading">LifeTracker</h1>
          <h3 className="subheading">Helping you take back control of your world.</h3>
        </div>
        <div className="image">
          <img src={tracker} alt="" />
        </div>
      </div>

      <div className="tiles">
        <div className="features">
          <div className="tile">
            <div>Fitness</div>
            <img src={athlete} alt="Fitness" />
          </div>
          <div className="tile">
            <div>Food</div>
            <img src={food} alt="Food" />
          </div>
          <div className="tile">
            <div>Rest</div>
            <img src={alarm} alt="Rest" />
          </div>
          <div className="tile">
            <div>Planner</div>
            <img src={calendar} alt="Planner" />
          </div>
        </div>
      </div>
    </div>
  );
}
