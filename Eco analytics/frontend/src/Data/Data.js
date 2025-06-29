import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
  UilSignOutAlt,
} from "@iconscout/react-unicons";

import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
import axios from "axios"; 

import img1 from "../imgs/img1.png";
import img2 from "../imgs/img2.png";
import img3 from "../imgs/img3.png";

export const SidebarData = [
  {
    icon: UilEstate,
    heading: "Eco Analytics",
  },
  {
    icon: UilClipboardAlt,
    heading: "Eco Cart",
  },
  {
    icon: UilUsersAlt,
    heading: "Eco-Commute",
  },
  {
    icon: UilPackage,
    heading: 'Eco-Efficiency'
  },
  {
    icon: UilChart,
    heading: 'Power Optima'
  },
];

export let cardsData = [];

export let Bigcard = [];

export const UpdatesData = [
  {
    img: img1,
    name: "Shalik Ahmed",
    noti: "has sent you a message: 'Hey, could you please check your email?'",
    time: "25 seconds ago",
  },
  {
    img: img2,
    name: "Vigneshwaran",
    noti: "has sent you a message: 'Meeting at 3 PM. Don't be late.'",
    time: "30 minutes ago",
  },
  {
    img: img3,
    name: "Sowmeya",
    noti: "has sent you a message: 'Can we catch up for coffee tomorrow?'",
    time: "2 hours ago",
  },
];

const userId = "64e5a053bec35290f3de40bc";

axios.get(`http://localhost:4005/api/cc/${userId}`)
.then(response => {
  const updatedCarbonCard = response.data.carbonCard;
  
    cardsData = [
      {
        title: "Power Optima",
        color: {
          backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
          boxShadow: "0px 10px 20px 0px #c484f3",
        },
        barValue: 80,
        value: updatedCarbonCard.electricityConsumptionCO2e.toString(),
        png: UilMoneyWithdrawal,
        series: [
          {
            name: "CO2e",
            data: [10, 100, 50, 70, 80, 30, 40],
          },
        ],
      },
      {
        title: "Green Credits",
        color: {
          // backGround:
          //   "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
          // boxShadow: "0px 10px 20px 0px #F9D59B",
          backGround:"linear-gradient(180deg, #63f542 0%, #90e07e 100%)",
          boxShadow: "0px 10px 20px 0px #90e07e" 
        },
        barValue: 60,
        value: updatedCarbonCard.greenCredits.toString(),
        png: UilClipboardAlt,
        series: [
          {
            name: "Credits",
            data: [10, 25, 15, 30, 12, 15, 20],
          },
        ],
      },
      {
        title: "Monthly tCO2e",
        color: {
          backGround: "linear-gradient(180deg, #63f542 0%, #90e07e 100%)",
          boxShadow: "0px 10px 20px 0px #90e07e",
        },
        barValue: 70,
        value: updatedCarbonCard.monthlyCarbonEmission.reduce((total, entry) => total + entry.carbonEmission, 0).toString(),
        png: UilUsdSquare,
        series: [
          {
            name: "Carbon Emission",
            data: updatedCarbonCard.monthlyCarbonEmission.map(entry => entry.carbonEmission),
          },
        ],
      },
    ];

    Bigcard = [
      {
        title: "Eco-Efficiency",
        color: {
          backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
          boxShadow: "0px 10px 20px 0px #c484f3",
        },
        barValue: 70,
        value: updatedCarbonCard.wasteco2e.toString(),
        png: UilUsdSquare,
        series: [
          {
            name: "Carbon Emission",
            data: updatedCarbonCard.monthlyCarbonEmission.map(entry => entry.carbonEmission),
          },
        ],
      },
    ];

    console.log("Updated cardsData:", cardsData);
    console.log("Updated Bigcard:", Bigcard);
  })
  .catch(error => {
    console.error("Error fetching CarbonCard:", error);
  });



// // Sidebar imports
// import {
//   UilEstate,
//   UilClipboardAlt,
//   UilUsersAlt,
//   UilPackage,
//   UilChart,
//   UilSignOutAlt,
// } from "@iconscout/react-unicons";

// // Analytics Cards imports
// import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
// import { keyboard } from "@testing-library/user-event/dist/keyboard";

// // Recent Card Imports
// import img1 from "../imgs/img1.png";
// import img2 from "../imgs/img2.png";
// import img3 from "../imgs/img3.png";

// // Sidebar Data
// export const SidebarData = [
//   {
//     icon: UilEstate,
//     heading: "Dashboard",
//   },
//   {
//     icon: UilClipboardAlt,
//     heading: "Orders",
//   },
//   {
//     icon: UilUsersAlt,
//     heading: "Customers",
//   },
//   {
//     icon: UilPackage,
//     heading: 'Products'
//   },
//   {
//     icon: UilChart,
//     heading: 'Analytics'
//   },
// ];

// export const cardsData = [
//   {
//     title: "Monthly tCO2e",
//     color: {
//       backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
//       boxShadow: "0px 10px 20px 0px #e0c6f5",
//     },
//     barValue: 70,
//     value: "25,970",
//     png: UilUsdSquare,
//     series: [
//       {
//         name: "Carbon Emission",
//         data: [31, 40, 28, 51, 42, 109, 100],
//       },
//     ],
//   },
//   {
//     title: "Power Optima",
//     color: {
//       backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
//       boxShadow: "0px 10px 20px 0px #FDC0C7",
//     },
//     barValue: 80,
//     value: "14,270",
//     png: UilMoneyWithdrawal,
//     series: [
//       {
//         name: "CO2e",
//         data: [10, 100, 50, 70, 80, 30, 40],
//       },
//     ],
//   },
//   {
//     title: "Green Credits",
//     color: {
//       backGround:
//         "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
//       boxShadow: "0px 10px 20px 0px #F9D59B",
//     },
//     barValue: 60,
//     value: "4,270",
//     png: UilClipboardAlt,
//     series: [
//       {
//         name: "Credits",
//         data: [10, 25, 15, 30, 12, 15, 20],
//       },
//     ],
//   },
// ];

// export const Bigcard = [
//   {
//     title: "Eco-Efficiency",
//     color: {
//       backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
//       boxShadow: "0px 10px 20px 0px #e0c6f5",
//     },
//     barValue: 70,
//     value: "25,970",
//     png: UilUsdSquare,
//     series: [
//       {
//         name: "Carbon Emission",
//         data: [31, 40, 28, 51, 42, 109, 100],
//       },
//     ]
//   },
// ];

// export const UpdatesData = [
//   {
//     img: img1,
//     name: "Andrew Thomas",
//     noti: "has ordered Apple smart watch 2500mh battery.",
//     time: "25 seconds ago",
//   },
//   {
//     img: img2,
//     name: "James Bond",
//     noti: "has received Samsung gadget for charging battery.",
//     time: "30 minutes ago",
//   },
//   {
//     img: img3,
//     name: "Iron Man",
//     noti: "has ordered Apple smart watch, samsung Gear 2500mh battery.",
//     time: "2 hours ago",
//   },
// ];