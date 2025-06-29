import React, { useState, useEffect } from "react";
import axios from 'axios';
import FlightCard from "./FlightCard";
import "./FlightCard.css"; // Import your CSS file
import data from "./flight_data.json";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FlightAvail = ({ from, to, date, adult }) => {
  const [flightData, setFlightData] = useState([]);
  const [error, setError] = useState("");
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    if (!isDataFetched) {
      fetchData();
    }
  }, [isDataFetched]);

  const fetchData = async () => {
    const options = {
      method: "GET",
      url: "https://flight-fare-search.p.rapidapi.com/v2/flights/",
      params: {
        from: from,
        to: to,
        date: date, //to be changed
        adult: adult,
      },
      //changed
      // headers: {
      //   'X-RapidAPI-Key': '0de1d34144msh366877eafa75f46p11aab6jsnb3ecb2fc6bad',
      //   'X-RapidAPI-Host': 'flight-fare-search.p.rapidapi.com'
      // }
      headers: {
        "X-RapidAPI-Key": "321ffbb102mshfd02d9af6304cb7p168bd3jsn1fe85c62ceae",
        "X-RapidAPI-Host": "flight-fare-search.p.rapidapi.com",
      },
    };

    try {
      // const response = await axios.request(options);
      // console.log(data);
      // setFlightData(response.data.results);
      setFlightData(data.results);
      // console.log("flight" + response.data.results)
      setError("");
      setIsDataFetched(true);
    } catch (error) {
      setFlightData([]);
      setError("Error fetching flight data. Please try again.");
      console.error(error);
    }
  };
  const sliderSettings = {
    className: "center",
    centerMode: true,
    // dots: true,
    infinite: true,
    centerPadding: "60px",
    speed: 500,
    slidesToShow: 1,
    // slidesToScroll: 2,
  };

  return (
    <div>
      {error && <p>{error}</p>}

      {flightData.length > 0 && (
        <div>
          <h2>Flight Transport Schedules:</h2>
          <div className="flight-cards-container ">
            <Slider {...sliderSettings}>
              {flightData.map((flight) => (
                <div>
                  <FlightCard
                    key={flight.id}
                    flightCode={flight.flight_code}
                    flightName={flight.flight_name}
                    cabinType={flight.cabinType}
                    stops={flight.stops}
                    departureAirport={flight.departureAirport.city}
                    departureCode={flight.departureAirport.code}
                    departureTime={flight.departureAirport.time}
                    departureTimezone={flight.departureAirport.timeZone}
                    arrivalAirport={flight.arrivalAirport.city}
                    arrivalCode={flight.arrivalAirport.code}
                    arrivalTime={flight.arrivalAirport.time}
                    arrivalTimezone={flight.arrivalAirport.timeZone}
                    flightDuration={flight.duration.text}
                    totalCost={`${flight.totals.total} ${flight.currency}`}
                    // cabinBaggageAllowance={flight.baggage.cabin.allowance}
                    // checkInBaggageAllowance={flight.baggage.checkIn.allowance}
                    // bookingLink={flight.bookingLink}
                    cabinBaggageAllowance={
                      flight.baggage &&
                      flight.baggage.cabin &&
                      flight.baggage.cabin.allowance
                        ? flight.baggage.cabin.allowance
                        : "N/A"
                    }
                    checkInBaggageAllowance={
                      flight.baggage &&
                      flight.baggage.checkIn &&
                      flight.baggage.checkIn.allowance
                        ? flight.baggage.checkIn.allowance
                        : "N/A"
                    }
                    bookingLink={flight.bookingLink}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightAvail;
