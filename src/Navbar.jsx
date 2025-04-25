import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const getClassName = (isActive) => {
    if (isActive) {
      return "nav-item active";
    } else {
      return "nav-item";
    }
  };

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li>
          <NavLink to="/" className={({ isActive }) => getClassName(isActive)}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/completed" className={({ isActive }) => getClassName(isActive)}>
            Completed
          </NavLink>
        </li>
        <li>
          <NavLink to="/uncompleted" className={({ isActive }) => getClassName(isActive)}>
            Uncompleted
          </NavLink>
        </li>
        
        <li className="nav-item disabled">Coming Soon</li>
      </ul>
    </nav>
  );
};



export default Navbar;