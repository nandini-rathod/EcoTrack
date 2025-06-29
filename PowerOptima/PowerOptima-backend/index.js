const express = require("express")
const app = express()
require("dotenv").config()
const cors = require("cors")

app.get("/",(req,res)=>{
    res.send("hello world")
})

// middlewares
app.use(express.json());
app.use(cors());

//imports
const connection = require("./DB")
const authRoute = require("./routes/auth")
const powerConsumptionRoute = require("./routes/powerconsumption")
const ElectricityGenerationStatsRoute = require("./routes/electricitygenStats")
const educativeContentRoute = require("./routes/educativeContents") 

// DB connection 
connection()

//routes
app.use("/api/auth",authRoute)
app.use("/api/power-consumption",powerConsumptionRoute)
app.use("/api/electricity-generation",ElectricityGenerationStatsRoute)
app.use("/api/educativecontent",educativeContentRoute)

const PORT = process.env.PORT || 5005

app.listen(PORT,()=>{
    console.log(`you are listening on PORT ${PORT}`)
})