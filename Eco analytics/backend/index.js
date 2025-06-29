const express = require("express")
const app = express()
require("dotenv").config()
const cors = require("cors")
const CarbonCard = require("./models/CarbonCard");

app.get("/",(req,res)=>{
    res.send("hello world")
})

// middlewares
app.use(express.json());
app.use(cors());

//import routes
const connection = require("./DB")
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const carbonCardRoute = require("./routes/carbonCard")
const greenCredits = require("./routes/greenCredits")

// DB connection 
connection()

//routes
app.use("/api/users",userRoute)
app.use("/api/auth",authRoute)
app.use("/api/cc",carbonCardRoute)
app.use("/api/greencredits",greenCredits)

// Function to update points
const updatePoints = async () => {
    try {
      const userId = "64e5a053bec35290f3de40bc"; // User ID
      const carbonCard = await CarbonCard.findOne({ user: userId });
  
      if (carbonCard) {
        // Update points
        carbonCard.greenCredits += 1;
        await carbonCard.save();
  
        console.log("green credits updated:", carbonCard.greenCredits);
      }
    } catch (error) {
      console.error("Error updating points:", error);
    }
  };
  
  // Update points every 30 seconds
  setInterval(updatePoints, 30000); // 30 seconds in milliseconds


const PORT = process.env.PORT || 4005

app.listen(PORT,()=>{
    console.log(`you are listening on PORT ${PORT}`)
})