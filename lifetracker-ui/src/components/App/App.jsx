import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from '../Home/Home';
import Navbar from '../Navbar/Navbar';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Portal from '../Portal/Portal';
import Activity from '../ActivityPage/ActivityPage';
import ExercisePage from '../ExercisePage/ExercisePage';
import Nutrition from '../NutritionPage/NutritionPage';
import Sleep from '../SleepPage/SleepPage';

function App() 
{

  const [appState, setAppState] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  

  const isAuthenticated = Boolean(appState?.user?.email);
  const userId = appState?.user?.Id || '';

  const handleLogout = () => {
    localStorage.removeItem('user');
    setAppState({});
  };

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('user', JSON.stringify(appState));
      console.log(appState);
    } else {
      localStorage.removeItem('user');
    }
  }, [isAuthenticated, appState]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register setAppState={setAppState} />} />
          <Route path="/login" element={<Login setAppState={setAppState} />} />
          <Route
            path="/portal"
            element={<Portal user={appState?.user} setAppState={setAppState} />}
          />
          <Route
            path="/exercise"
            element={<ExercisePage isLoggedIn={isAuthenticated} appState={appState} />}
          />
          <Route path="/activity" element={<Activity isLoggedIn={isAuthenticated} />} />
          <Route path="/nutrition" element={<Nutrition isLoggedIn={isAuthenticated} />} />
          <Route path="/sleep" element={<Sleep isLoggedIn={isAuthenticated} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
