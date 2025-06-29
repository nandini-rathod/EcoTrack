import React from "react";
import "./Navbar.css"; // Import the CSS file
import logo from "./logo.png";


const Navbar = () => {

  return (
    <div className="navbar-container">
      <div className="logo-wrapper">
      <img src={logo} alt="EcoShop Logo" className="nav-logo-image" />

        <div className="header-text-wrapper">
          <h1 className="header-text">PowerOptima</h1>
          <p className="sub-header-text">by carbonsense</p>
        </div>
      </div>
      <div className="nav-links">
        <div className="nav-link">Home</div>
        <div className="nav-link">Electricity Consumption</div>
        <div className="nav-link">Emissions</div>
        <div className="nav-link">Corporate Gifting</div>
        <div className="nav-link">Learn</div>
        <div className="nav-link">Who We Are</div>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search.." className="search-input" />
      </div>
    </div>
  );
};

export default Navbar;