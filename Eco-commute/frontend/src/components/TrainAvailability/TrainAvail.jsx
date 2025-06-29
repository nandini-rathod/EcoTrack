import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TrainCard from "./TrainCard";
import data from "./train_data.json";

const TrainBetweenStations = ({
  fromStationCode,
  toStationCode,
  dateOfJourney,
}) => {
  const [trainData, setTrainData] = useState([]);
  const [error, setError] = useState("");
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    if (fromStationCode && toStationCode && dateOfJourney && !isDataFetched) {
      fetchData();
    }
  }, [fromStationCode, toStationCode, dateOfJourney, isDataFetched]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations",
        {
          params: {
            fromStationCode: fromStationCode,
            toStationCode: toStationCode,
            dateOfJourney: dateOfJourney,
          },
          headers: {
            'X-RapidAPI-Key': '321ffbb102mshfd02d9af6304cb7p168bd3jsn1fe85c62ceae',
            'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
          },
        }
      );

      setTrainData(response.data.data);
      // console.log("train"+response.data.data)
      setError("");
      setIsDataFetched(true);
    } catch (error) {
      setTrainData([]);
      setError("Error fetching train data. Please try again.");
      console.error(error);
    }
  };

  // Configure the settings for the react-slick slider
  const sliderSettings = {
    className: "center",
    centerMode: true,
    // dots: true,
    infinite: true,
    centerPadding: "30px",
    speed: 500,
    slidesToShow: 3,
    // slidesToScroll: 2,
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {trainData.length > 0 && (
        <div>
          <h2>Rail Transport Schedules</h2>
              <br/>
              <br/>
          <div className="slider-container">
            <Slider {...sliderSettings}>
              {trainData.map((train) => (
                <div key={train.train_number}>
                  <TrainCard train={train} />
                </div>
              ))}
            </Slider>
          <br/>
          <br/>
          <br/>
          <br/>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainBetweenStations;
