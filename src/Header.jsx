import React from "react";
import "./Header.css";
function Header({currentUser}) {

  return (
        <header className="header">
          <h1 className="header-title">Take a note! &#128218;</h1>
          <p className="header-subtitle">Welcome, {currentUser.name} ! To begin, write a note below</p>
        </header>
  );


}
export default Header