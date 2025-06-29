import React from "react";
import PropTypes from "prop-types";
import "./BusCard.css"

const BusCard = ({ route }) => {
  if (!route) {
    console.log(route)
    return null;
  }

  console.log("Route received in BusCard:", route);


  return (
    <div className="bus-columns-container">
      <div className="bus-columns">
        <div className="bus-content">
          <p className="bus-secondary-heading">Operator: {route.operator}</p>
          <p className="bus-card-description">
            <b>Departure Time:</b> {route.departure_time}
          </p>
          <p className="bus-card-description">
            <b>Arrival Time:</b> {route.arrival_time}
          </p>
          <p className="bus-card-description">
            <b>Fare: </b> {route.fare}
          </p>
          <p className="bus-card-description">
            <b>Bus Type: </b> {route.bus_type}
          </p>
        </div>

        <div className="bus-button-container">
          <button className="bus-btn red-flag">Book Now</button>
          <p className="bus-offer">
            Carbon Emission: {route.carbon_emission} gCO2/km
          </p>
        </div>
      </div>
    </div>
  );
};

BusCard.propTypes = {
  route: PropTypes.shape({
    operator: PropTypes.string,
    departure_time: PropTypes.string,
    arrival_time: PropTypes.string,
    fare: PropTypes.string,
    bus_type: PropTypes.string,
    carbon_emission: PropTypes.number,
  }),
};

export default BusCard;
