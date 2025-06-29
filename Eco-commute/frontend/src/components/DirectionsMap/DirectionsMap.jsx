import React, { useEffect, useState } from "react";
import BusAvailability from "../BusAvailability/BusAvailability";
import Slider from "react-slick";
import "font-awesome/css/font-awesome.min.css";
import "slick-carousel/slick/slick.css";
import "react-calendar/dist/Calendar.css"; // Import Calendar CSS
import ReactCalendar from "react-calendar"; // Import Calendar component
import "slick-carousel/slick/slick-theme.css";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import "../BusAvailability/BusCard.css"; // Import CSS file here
import "./DirectionsMap.css";
import TrainBetweenStations from "../TrainAvailability/TrainAvail";
import FlightAvail from "../FlightAvailability/FlightAvail";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import Card from "./card/card";
import train from "./train.jpg";
import flight from "./flight.jpg"
import bus from "./bus.jpg"

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2hhbGlrYWhtZWQiLCJhIjoiY2xsaGkxOGhvMWdxMDNmbWd2eGxsNzd4ZSJ9.GYMldYREEIBZv3YCsDPBag";

const locationToAirportCodeMap = {
  chennai: "MAA",
  coimbatore: "CJB",
  madurai: "IXM",
  neyveli: "NVY",
  pondicherry: "PNY",
  salem: "SXV",
  tanjore: "TJV",
  tiruchirappalli: "TRZ",
  delhi: "DEL",
};

const DirectionsMap = () => {
  const [selectedDistance, setSelectedDistance] = useState(null);
  const [selectedStartCity, setSelectedStartCity] = useState(null);
  const [selectedEndCity, setSelectedEndCity] = useState(null);
  const [endStationCode, setEndStationCode] = useState("");
  const [endStationName, setEndStationName] = useState("");
  const [startStationCode, setStartStationCode] = useState("");
  const [startStationName, setStartStationName] = useState("");
  const [showTrainDetails, setShowTrainDetails] = useState(false);
  const [showFlightDetails, setShowFlightDetails] = useState(false);
  const [startAirportCode, setStartAirportCode] = useState("");
  const [endAirportCode, setEndAirportCode] = useState("");
  const [busRoutes, setBusRoutes] = useState([]);
  const [showBusDetails, setShowBusDetails] = useState(false);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-79.4512, 43.6568],
      zoom: 13,
    });
    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
    });

    directions.on("route", async (event) => {
      if (
        event.route &&
        event.route[0].legs &&
        event.route[0].legs.length > 0
      ) {
        const startCoordinate =
          event.route[0].legs[0].steps[0].maneuver.location;
        const endCoordinate =
          event.route[0].legs[0].steps[event.route[0].legs[0].steps.length - 1]
            .maneuver.location;

        try {
          const startResponse = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${startCoordinate[0]},${startCoordinate[1]}.json?access_token=${mapboxgl.accessToken}`
          );
          const endResponse = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${endCoordinate[0]},${endCoordinate[1]}.json?access_token=${mapboxgl.accessToken}`
          );

          if (startResponse.ok && endResponse.ok) {
            const startData = await startResponse.json();
            const endData = await endResponse.json();

            if (
              startData.features &&
              startData.features.length > 0 &&
              endData.features &&
              endData.features.length > 0
            ) {
              const startCity = startData.features[0].context.find((context) =>
                context.id.startsWith("place.")
              ).text;
              const endCity = endData.features[0].context.find((context) =>
                context.id.startsWith("place.")
              ).text;

              setSelectedDistance(event.route[0].distance);
              setSelectedStartCity(startCity);
              setSelectedEndCity(endCity);
            } else {
              console.error("No geocoding results found");
            }
          } else {
            console.error("Failed to fetch geocoding data");
          }
        } catch (error) {
          console.error("Error fetching geocoding data:", error);
        }
      } else {
        setSelectedDistance(null);
        setSelectedStartCity(null);
        setSelectedEndCity(null);
      }
    });

    map.addControl(
      new MapboxDirections({
        accessToken: mapboxgl.accessToken,
      }),
      "top-left"
    );
  }, []);

  useEffect(() => {
    const fetchStationInformation = async () => {
      if (selectedStartCity && selectedEndCity) {
        try {
          const startCityLower = selectedStartCity.toLowerCase();
          const endCityLower = selectedEndCity.toLowerCase();
          // Check if start city is a substring of any key in the locationToAirportCodeMap
          const matchedStartCity = Object.keys(locationToAirportCodeMap).find(
            (city) => startCityLower.includes(city)
          );
          console.log("Matched start city:", matchedStartCity);
          // Check if end city is a substring of any key in the locationToAirportCodeMap
          const matchedEndCity = Object.keys(locationToAirportCodeMap).find(
            (city) => endCityLower.includes(city)
          );
          console.log("Matched end city:", matchedEndCity);

          if (matchedStartCity) {
            setStartAirportCode(locationToAirportCodeMap[matchedStartCity]);
            console.log("setStartAirportCode " + startAirportCode);
          }

          if (matchedEndCity) {
            setEndAirportCode(locationToAirportCodeMap[matchedEndCity]);
            console.log("setEndAirportCode " + endAirportCode);
          }
          const [endStationResponse, startStationResponse] = await Promise.all([
            fetch(`http://localhost:4000/api/stations/${selectedEndCity}`),
            fetch(`http://localhost:4000/api/stations/${selectedStartCity}`),
          ]);

          const [endStationData, startStationData] = await Promise.all([
            endStationResponse.json(),
            startStationResponse.json(),
          ]);

          if (
            endStationData &&
            endStationData.length > 0 &&
            startStationData &&
            startStationData.length > 0
          ) {
            setEndStationCode(endStationData[0].StationCode);
            setEndStationName(endStationData[0].StationName);
            setStartStationCode(startStationData[0].StationCode);
            setStartStationName(startStationData[0].StationName);

            console.log("distance " + selectedDistance);
            console.log("start city " + selectedStartCity);
            console.log("end city " + selectedEndCity);
          } else {
            console.error("No station data found in the response");
          }
        } catch (error) {
          console.error("Error fetching station information:", error);
        }
      }
    };

    fetchStationInformation();
    fetchBusRoutes();
  }, [selectedStartCity, selectedEndCity, startStationName, endStationName]);

  const fetchBusRoutes = async () => {
    if (selectedStartCity && selectedEndCity) {
      try {
        const response = await fetch(
          `http://localhost:4000/api/bus-routes/${selectedStartCity}/${selectedEndCity}`
        );
        const data = await response.json();
        console.log(data);
        if (data.length > 0) {
          setBusRoutes(data);
        }
      } catch (error) {
        console.error("Error fetching bus routes:", error);
      }
    }
  };

  return (
    <>
    <div className="map-container">
      <div id="map" />
      <div className="display-distance">
        {selectedStartCity && selectedEndCity && (
          <h5>
            Distance: {selectedDistance / 1000} Kilometer | Start City:{" "}
            {selectedStartCity} | End City: {selectedEndCity}
          </h5>
        )}
      </div>
      <br></br>
      {/* <div className="calendar-container">
        <ReactCalendar />
      </div> */}
      <br></br>

      <div className="card-container">
      <Card
  title="EcoVoyage: Rail  🚆"
  content="Train Tracks to Sustainability. Reducing train emissions through clean energy and eco-efficiency."
  icon="Train"
  showDetails={showTrainDetails}
  value="103 CO2e/KG"
  toggleDetails={() => setShowTrainDetails(!showTrainDetails)}
/>

<Card
  title="Green Skyward  ✈️"
  content="Aerodynamics for a Greener Tomorrow. Advancing green aviation with tech and renewables."
  icon="Flight"
  showDetails={showFlightDetails}
  value="41 CO2e/KM"
  toggleDetails={() => setShowFlightDetails(!showFlightDetails)}
/>

<Card
  title="Urban Transit🚌"
  content="Riding the Green Wave. Eco-transit with electric and hybrid buses in urban hubs."
  icon="Bus"
  value="255 CO2e/KM"
  showDetails={showBusDetails}
  toggleDetails={() => setShowBusDetails(!showBusDetails)}
/>
      </div>
      {showTrainDetails && (
        <>
          <div className="banner-img ">
            <img className="shade"
              src={train}
              alt="train"
              style={{ width: "700px", height: "500px",borderRadius:"25px" }}
            />
          </div>
            <TrainBetweenStations
            fromStationCode={startStationCode}
            toStationCode={endStationCode}
            dateOfJourney={new Date().toISOString().split("T")[0]}
          />
        </>
      )}
      {showFlightDetails && (
        <>
          <div className="banner-img ">
            <img
              src={flight}
              alt="flight"
              style={{ width: "600px", height: "600px" }}
            />
          </div>
          <FlightAvail
            from={startAirportCode}
            to={endAirportCode}
            date={new Date().toISOString().split("T")[0]}
            adult={1}
            />
        </>
      )}
      {showBusDetails && (
        <>
        <div className="banner-img">
          <img
            src={bus}
            alt="bus"
            style={{ width: "600px", height: "400px" }}
          />
        </div>
        <BusAvailability
          selectedStartCity={selectedStartCity}
          selectedEndCity={selectedEndCity}
        />
        </>
      )}
    </div>
    </>
  );
};

export default DirectionsMap;