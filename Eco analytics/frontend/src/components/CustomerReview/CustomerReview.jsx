// import React from "react";
// import Chart from "react-apexcharts";
// import "./CustomerReview.css";
// import Bigcards from "../Bigcard/Bigcard"

// const CustomerReview = () => {
//   const data = {
//     series: [
//       {
//         name: "Review",
//         data: [10, 50, 30, 90, 40, 120, 100],
//       },
//     ],
//     options: {
//       chart: {
//         type: "area",
//         height: "50px",
//       },

//       fill: {
//         colors: ["#fff"],
//         type: "gradient",
//       },
//       dataLabels: {
//         enabled: false,
//       },
//       stroke: {
//         curve: "smooth",
//         colors: ["#ff929f"],
//       },
//       tooltip: {
//         x: {
//           format: "dd/MM/yy HH:mm",
//         },
//       },
//       grid: {
//         show: false,
//       },
//       xaxis: {
//         type: "datetime",
//         categories: [
//           "2018-09-19T00:00:00.000Z",
//           "2018-09-19T01:30:00.000Z",
//           "2018-09-19T02:30:00.000Z",
//           "2018-09-19T03:30:00.000Z",
//           "2018-09-19T04:30:00.000Z",
//           "2018-09-19T05:30:00.000Z",
//           "2018-09-19T06:30:00.000Z",
//         ],
//       },
//       yaxis: {
//         show: false
//       },
//       toolbar:{
//         show: false
//       }
//     },
//   };
//   return <div className="CustomerReview">
//         <Chart options={data.options} series={data.series} type="area" />
  
  
//   </div>;
  
// };


// export default CustomerReview;
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "./CustomerReview.css";
import axios from "axios";

const CustomerReview = () => {
  const [carbonCardData, setCarbonCardData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4005/api/cc/64e5a053bec35290f3de40bc")
      .then(response => {
        const monthlyCarbonEmission = response.data.carbonCard.monthlyCarbonEmission;
        setCarbonCardData(monthlyCarbonEmission);
      })
      .catch(error => {
        console.error("Error fetching monthly carbon emission:", error);
      });
  }, []);

  if (carbonCardData.length === 0) {
    return <div>Loading...</div>;
  }

  const seriesData = carbonCardData.map(entry => entry.carbonEmission);
  const xaxisCategories = carbonCardData.map(entry => entry.month);

  const data = {
    series: [
      {
        name: "Review",
        data: seriesData,
      },
    ],
    options: {
      chart: {
        type: "area",
        height: "50px",
      },
      fill: {
        colors: ["#fff"],
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["#ff929f"],
      },
      tooltip: {
        x: {
          format: "MMM",
        },
      },
      grid: {
        show: false,
      },
      xaxis: {
        type: "category",
        categories: xaxisCategories,
      },
      yaxis: {
        show: false,
      },
      toolbar: {
        show: false,
      },
    },
  };

  return (
    <div className="CustomerReview">
      <Chart options={data.options} series={data.series} type="area" />
    </div>
  );
};

export default CustomerReview;