import React from "react";
import Cards from "../Cards/Cards";
import Bigcards from "../Bigcard/Bigcard"
import Table from "../Table/Table";
import "./MainDash.css";
import CustomerReview from "../CustomerReview/CustomerReview";
const MainDash = () => {
  return (
    <div className="MainDash">


        <Cards />
      <CustomerReview />
      <Bigcards />
      <Bigcards />
    </div>
  );
};

export default MainDash;
