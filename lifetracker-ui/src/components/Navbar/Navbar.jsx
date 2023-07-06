import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import codepath from "../../assets/codepath.svg";

export default function Navbar({ isAuthenticated, handleLogout }) {
  const navigate = useNavigate();

  const handleOnLogout = () => {
    handleLogout();
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navbar__links">
        <Link className="navbar_logo" to="/">
          <img src={codepath} alt="logo" />
        </Link>
        <Link className="navbar__link" to="/activity">
          Activity
        </Link>
        <Link className="navbar__link" to="/exercise">
          Exercise
        </Link>
        <Link className="navbar__link" to="/nutrition">
          Nutrition
        </Link>
        <Link className="navbar__link" to="/sleep">
          Sleep
        </Link>
      </div>
      <div className="navbar__auth">
        {isAuthenticated ? (
          <button className="navbar__button" onClick={handleOnLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/login">
              <button className="navbar__button">Sign In</button>
            </Link>
            <Link to="/register">
              <button className="navbar__button">Register</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
