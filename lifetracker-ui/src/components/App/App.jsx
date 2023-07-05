import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Home from '../Home/Home'
import Navbar from '../Navbar/Navbar'
import Register from '../Register/Register'
import Login from '../Login/Login'
import Portal from '../Portal/Portal'
import Activity from '../ActivityPage/ActivityPage'
import Exercise from '../ExercisePage/ExercisePage'


export default function App() {

  const [appState,setAppState]=useState({})

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar user={appState.user}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register setAppState={setAppState} />} />
          <Route path="/login" element={<Login setAppState={setAppState} />} />
          <Route
            path="/portal"
            element={<Portal setAppState={setAppState} appState={appState} user={appState?.user} />}
          />
          <Route path='/activity'element={<Activity/>}/>
          <Route path='/exercise'element={<Exercise/>}/>
        </Routes>
      </BrowserRouter>  

    </div>
  )
}
