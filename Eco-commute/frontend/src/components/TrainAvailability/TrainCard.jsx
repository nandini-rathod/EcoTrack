// TrainCard.jsx

import React, { useState, useEffect } from "react";
import "./TrainCard.css";
import axios from "axios";


const TrainCard = ({ train }) => {
  const [co2Emissions, setCo2Emissions] = useState(null);

  const calculateDistance = () => {
    const departureTimeParts = train.from_std.split(":");
    const departureHour = parseInt(departureTimeParts[0]);
    const departureMinute = parseInt(departureTimeParts[1]);

    const arrivalTimeParts = train.to_std.split(":");
    const arrivalHour = parseInt(arrivalTimeParts[0]);
    const arrivalMinute = parseInt(arrivalTimeParts[1]);

    let timeDiffInHours = arrivalHour - departureHour;
    if (arrivalHour < departureHour) {
      timeDiffInHours += 24;
    }

    const timeDiffInMinutes =
      timeDiffInHours * 60 + arrivalMinute - departureMinute;
    const averageSpeed = 75;
    const distance = (timeDiffInMinutes / 60) * averageSpeed;
    return distance;
  };

  useEffect(() => {
    const fetchCo2Emissions = async () => {
      try {
        const distance = calculateDistance();

        const encodedParams = new URLSearchParams();
        encodedParams.set("vehicle_type", "Train-National");
        encodedParams.set("distance_value", distance.toString());
        encodedParams.set("distance_unit", "km");
        encodedParams.set("include_wtt", "Y");

        const options = {
          method: "POST",
          url: "https://carbonsutra1.p.rapidapi.com/vehicle_estimate_by_type",
          // headers: {
          //   "content-type": "application/x-www-form-urlencoded",
          //   Authorization:
          //     "Bearer fQ98oU704xFvsnXcQLVDbpeCJHPglG1DcxiMLKfpeNEMGumlbzVf1lCI6ZBx",
          //   "X-RapidAPI-Key":
          //     "cd1cb2b14cmshb72ec2f45c1d333p19f798jsn51eee427a17b",
          //   "X-RapidAPI-Host": "carbonsutra1.p.rapidapi.com",
          // },
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: 'Bearer fQ98oU704xFvsnXcQLVDbpeCJHPglG1DcxiMLKfpeNEMGumlbzVf1lCI6ZBx',
            'X-RapidAPI-Key': '0de1d34144msh366877eafa75f46p11aab6jsnb3ecb2fc6bad',
            'X-RapidAPI-Host': 'carbonsutra1.p.rapidapi.com'
          },
          data: encodedParams,
        };

        const response = await axios.request(options);
        const co2EmissionsData = response.data.data.co2e_kg;
        setCo2Emissions(co2EmissionsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCo2Emissions();
  }, [train.from_std, train.to_std]);

  return (
    <div className="columns-container">
      <div className="columns">
        <div className="content">
        <p className="secondary-heading">Train Number: {train.train_number}</p>
        <p className="secondary-heading">Train Name: {train.train_name}</p>
        <p className="card-description">
          <b>Train Type:</b> {train.train_type}
        </p>
        <p className="card-description">
          <b>Departure Station:</b> {train.from_station_name}
        </p>
        <p className="card-description">
          <b>Arrival Station:</b> {train.to_station_name}
        </p>
        <p className="card-description">
          <b>Departure Time:</b> {train.from_std}
        </p>
        <p className="card-description">
          <b>Arrival Time:</b> {train.to_std}
        </p>
        <p className="card-description">
          <b>Duration:</b> {train.duration}
        </p>
        <p className="card-description">
          <b>Days of Operation:</b> <br />
          {train.run_days.join(", ")}
        </p>
        </div>

        <div className="button-container">
          <button className="btn red-flag">Book<br></br>Now</button>
          {co2Emissions !== null && (
            <p className="offer">
              CO2 Emissions: {co2Emissions + Math.floor(Math.random() * 100) + 1}{" "}
              kg
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainCard;