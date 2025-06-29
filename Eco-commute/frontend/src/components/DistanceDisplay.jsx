import React from 'react';
import "../components/Footer/Footer.css"
// import Footer from "../components/Footer/Footer"

const DistanceDisplay = (props) => {
  return (
    <div className="distance">
  {props.prop1 && (
         <h5> Distanchbhj he: {props.prop1} Kilometers</h5>
         )}
         {/* <Footer/> */}
    </div>
  );
};

export default DistanceDisplay;
