import React from "react";
import logo from "../images/avengers.png";

function Header() {
  return (
    <div className="Header">
      <img src={logo} alt="avengers printed logo"/>
      <h1 >Avengers Employee Directory</h1>
    </div>
  );
}

export default Header;