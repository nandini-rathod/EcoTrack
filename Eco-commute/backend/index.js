const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

app.get("/", (req, res) => {
  res.send("hello world");
});

// Middlewares
app.use(express.json());
app.use(cors());

// Import routes
const connection = require("./DB");

// DB connection
connection();

// Import and use the routes
const airportRoute = require("./routes/airport"); 
const railwayRoute = require("./routes/railwayStation"); 
const tranportCO2e = require("./routes/tranportCO2e")
const busRoute = require("./routes/busRoute")

// routes
app.use("/api", busRoute); 
app.use("/api", airportRoute); 
app.use("/api", railwayRoute); 
app.use("/api", tranportCO2e); 

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`You are listening on PORT ${PORT}`);
});
