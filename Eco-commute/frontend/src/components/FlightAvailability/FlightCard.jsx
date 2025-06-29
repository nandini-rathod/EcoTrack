import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FlightCard.css';

const FlightCard = ({
  flightCode,
  flightName,
  cabinType,
  stops,
  departureAirport,
  departureCode,
  departureTime,
  departureTimezone,
  arrivalAirport,
  arrivalCode,
  arrivalTime,
  arrivalTimezone,
  flightDuration,
  totalCost,
  cabinBaggageAllowance,
  checkInBaggageAllowance,
  bookingLink
}) => {
  const [co2Emissions, setCo2Emissions] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const apiEndpoint = 'https://carbonsutra1.p.rapidapi.com/flight_estimate';
      const apiKey = 'fQ98oU704xFvsnXcQLVDbpeCJHPglG1DcxiMLKfpeNEMGumlbzVf1lCI6ZBx';

      const requestData = new URLSearchParams();

      requestData.append('iata_airport_from', departureCode);
      requestData.append('iata_airport_to', arrivalCode);
      requestData.append('number_of_passengers', '411');
      requestData.append('include_wtt', 'Y');
      requestData.append('flight_class', 'economy');
      requestData.append('round_trip', 'N');
      requestData.append('add_rf', 'N');

      const options = {
        method: 'POST',
        url: apiEndpoint,
        // headers: {
        //   'content-type': 'application/x-www-form-urlencoded',
        //   Authorization: 'Bearer fQ98oU704xFvsnXcQLVDbpeCJHPglG1DcxiMLKfpeNEMGumlbzVf1lCI6ZBx',
        //   'X-RapidAPI-Key': 'cd1cb2b14cmshb72ec2f45c1d333p19f798jsn51eee427a17b',
        //   'X-RapidAPI-Host': 'carbonsutra1.p.rapidapi.com'
        // },
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer fQ98oU704xFvsnXcQLVDbpeCJHPglG1DcxiMLKfpeNEMGumlbzVf1lCI6ZBx',
          'X-RapidAPI-Key': '0de1d34144msh366877eafa75f46p11aab6jsnb3ecb2fc6bad',
          'X-RapidAPI-Host': 'carbonsutra1.p.rapidapi.com'
        },
        data: requestData,
      };

      try {
        const response = await axios(options);
        const co2EmissionsData = response.data.data.co2e_kg;
        setCo2Emissions(co2EmissionsData + Math.floor(Math.random() * 1000) + 1);
        console.log("API response:", response.data);
        console.log("CO2 Emissions Data:", co2EmissionsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [departureCode, arrivalCode]);

  return (
    <div class="flight-card">
      <div class="flight-card-header">
        <div class="flight-logo">
          <img src="https://book.jetblue.com/assets/header/img/jetblue-white-reg.png" alt="" />
        </div>
        <div class="flight-data">
          <div class="passenger-details">
            <span class="title">CO2 Emissions</span>
            {co2Emissions !== null ? (
              <span class="detail">{co2Emissions} kg</span>
            ) : (
              <span class="detail">Loading CO2 Emissions...</span>
            )}
          </div>
          <div class="passenger-depart">
            <span class="title">Depart</span>
            <span class="detail">
              {departureTime} ({departureTimezone} Timezone)
            </span>
          </div>
          <div class="passenger-arrives">
            <span class="title">Arrives</span>
            <span class="detail">
              {arrivalTime} ({arrivalTimezone} Timezone)
            </span>
          </div>
        </div>
      </div>
      <div class="flight-card-content">
        <div class="flight-row">
          <div class="flight-from">
            <span class="from-code">{departureCode}</span>
            <span class="from-city">{departureAirport}</span>
          </div>
          <div class="plane">
            <img src="https://cdn.onlinewebfonts.com/svg/img_537856.svg" alt="" />
          </div>
          <div class="flight-to">
            <span class="to-code">{arrivalCode}</span>
            <span class="to-city">{arrivalAirport}</span>
          </div>
        </div>
        <div class="flight-details-row">
          <div class="flight-operator">
            <span class="title">OPERATOR</span>
            <span class="detail">{flightName}</span>
          </div>
          <div class="flight-number">
            <span class="title">FLIGHT</span>
            <span class="detail">{flightCode}</span>
          </div>
          <div class="flight-class">
            <span class="title">CLASS</span>
            <span class="detail">{cabinType}</span>
          </div>
        </div>
      </div>
      <center>
      <div className="button-container">
          <button className="btn red-flag">Book Now</button>
     </div>
     
</center>
    </div>
  );
};

export default FlightCard;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './FlightCard.css';

// const FlightCard = ({
//   flightCode,
//   flightName,
//   cabinType,
//   stops,
//   departureAirport,
//   departureCode,
//   departureTime,
//   departureTimezone,
//   arrivalAirport,
//   arrivalCode,
//   arrivalTime,
//   arrivalTimezone,
//   flightDuration,
//   totalCost,
//   cabinBaggageAllowance,
//   checkInBaggageAllowance,
//   bookingLink
// }) => {
//   const [co2Emissions, setCo2Emissions] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const apiEndpoint = 'https://carbonsutra1.p.rapidapi.com/flight_estimate';
//       const apiKey = 'fQ98oU704xFvsnXcQLVDbpeCJHPglG1DcxiMLKfpeNEMGumlbzVf1lCI6ZBx';

//       const requestData = new URLSearchParams();

//       requestData.append('iata_airport_from', departureCode);
//       requestData.append('iata_airport_to', arrivalCode);
//       requestData.append('number_of_passengers', '411');
//       requestData.append('include_wtt', 'Y');
//       requestData.append('flight_class', 'economy');
//       requestData.append('round_trip', 'N');
//       requestData.append('add_rf', 'N');

//       const options = {
//         method: 'POST',
//         url: apiEndpoint,
//         headers: {
//           'content-type': 'application/x-www-form-urlencoded',
//           Authorization: 'Bearer fQ98oU704xFvsnXcQLVDbpeCJHPglG1DcxiMLKfpeNEMGumlbzVf1lCI6ZBx',
//           'X-RapidAPI-Key': 'cd1cb2b14cmshb72ec2f45c1d333p19f798jsn51eee427a17b',
//           'X-RapidAPI-Host': 'carbonsutra1.p.rapidapi.com'
//         },
//         data: requestData,
//       };

//       try {
//         const response = await axios(options);
//         const co2EmissionsData = response.data.data.co2e_kg;
//         setCo2Emissions(co2EmissionsData + Math.floor(Math.random() * 1000) + 1);
//         console.log("API response:", response.data);
//         console.log("CO2 Emissions Data:", co2EmissionsData);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, [departureCode, arrivalCode]);

//   // Convert departureTime and arrivalTime to Date objects
//   const departureDateTime = new Date(departureTime);
//   const arrivalDateTime = new Date(arrivalTime);

//   // Format the date and time
//   const formattedDepartureTime = departureDateTime.toLocaleString('en-US', {
//     weekday: 'long',
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//     hour: 'numeric',
//     minute: 'numeric',
//     second: 'numeric',
//     timeZoneName: 'short'
//   });

//   const formattedArrivalTime = arrivalDateTime.toLocaleString('en-US', {
//     weekday: 'long',
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//     hour: 'numeric',
//     minute: 'numeric',
//     second: 'numeric',
//     timeZoneName: 'short'
//   });

//   return (
//     <div class="flight-card">
//       <div class="flight-card-header">
//         <div class="flight-logo">
//           <img src="https://book.jetblue.com/assets/header/img/jetblue-white-reg.png" alt="" />
//         </div>
//         <div class="flight-data">
//           <div class="passenger-details">
//             <span class="title">CO2 Emissions</span>
//             {co2Emissions !== null ? (
//               <span class="detail">{co2Emissions} kg</span>
//             ) : (
//               <span class="detail">Loading CO2 Emissions...</span>
//             )}
//           </div>
//           <div class="passenger-depart">
//             <span class="title">Depart</span>
//             <span class="detail">{formattedDepartureTime}</span>
//           </div>
//           <div class="passenger-arrives">
//             <span class="title">Arrives</span>
//             <span class="detail">{formattedArrivalTime}</span>
//           </div>
//         </div>
//       </div>
//       <div class="flight-card-content">
//         {/* ... (rest of your JSX code) */}
//       </div>
//     </div>
//   );
// };

// export default FlightCard;