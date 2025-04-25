import { useState } from 'react'
import Navbar from './Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

function App() {


  return (
      <Router>
        <div className="app-container">
          <Navbar />
          <div className="task-wrapper">
          </div>
        </div>
      </Router>
    );
  

}

export default App
