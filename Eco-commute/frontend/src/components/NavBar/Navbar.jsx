import "./Navbar.css";
import React from "react";
import logo from "../../components/logo.png";
// import { useSelector } from "react-redux";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="logo-wrapper">
        <img src={logo} alt="EcoShop Logo" className="nav-logo-image" />

        <div className="header-text-wrapper">
          <h1 className="header-text">GoGREEN</h1>
          <p className="sub-header-text">by carbonsense</p>
        </div>
      </div>
      <link
        href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css"
        rel="stylesheet"
      />
      <div className="nav-links">
        <nav>
          <ul>
            <li>
              <a href="#">Plan a Trip</a>
            </li>
            <li>
              <a href="#">Vehicles</a>
            </li>
            <li>
              <a href="#">Book</a>
            </li>
            <li>
              <a href="#">Rewards</a>
            </li>
            <li>
              <a href="#">How does it Work</a>
            </li>
            <li>
              <a href="#">Who We Are</a>
            </li>
          </ul>
        </nav>
        {/* <div className="nav-link">Plan a Trip</div>
        <div className="nav-link">Vehicles</div>
        <div className="nav-link">Book</div>
        <div className="nav-link">Rewards</div>
        <div className="nav-link">How does it Work</div>
        <div className="nav-link">Who We Are</div> */}
      </div>
      <form className="search">
        <input type="text" placeholder="Search" className="search__input" />
        <button type="button" className="search__button">
          <i className="ri-search-2-line"></i>
        </button>
      </form>
      {/* <div className="search-bar">
        <input type="text" placeholder="Search.." className="search-input" />
      </div> */}
    </div>
  );
};

export default Navbar;
