import React from "react";
import "./NavBar.css";
import logo from "./logo.png";

const Navbar = () => {

  return (
    <div className="navbar-container">
      <div className="logo-wrapper">
      <img src={logo} alt="EcoShop Logo" className="nav-logo-image" />

        <div className="header-text-wrapper">
          <h1 className="header-text">Eco Efficiency</h1>
          <p className="sub-header-text">by carbonsense</p>
        </div>
      </div>
      <div className="nav-links">
        <div className="nav-link">your locality</div>
        <div className="nav-link">Rewards</div>
        <div className="nav-link">Learn Who We Are</div>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search.." className="search-input" />
      </div>
    </div>
  );
};

export default Navbar;