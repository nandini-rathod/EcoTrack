import React from 'react';
import DirectionsMap from '../src/components/DirectionsMap/DirectionsMap';
import Navbar from "../src/components/NavBar/Navbar";
import DistanceDisplay from "../src/components/DistanceDisplay"
// import Footer from "../src/components/Footer/Footer"

function App() {
  return (
    <div className="App">
      <Navbar />
      <DirectionsMap />
      <DistanceDisplay/>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
