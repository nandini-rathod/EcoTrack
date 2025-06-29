import React, { useState, useRef } from "react";
import "./datatable.scss";
import { pincodeData } from "./userdata";
import { wasteData } from "./waste-data";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const MapComponent = ({ location }) => (
  <div className="map-container">
    <iframe
      src={`https://maps.google.com/maps?q=${location}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
      width="100%"
      height="300"
      title="Google Maps"
      allowFullScreen
    ></iframe>
  </div>
);

const Datatable = () => {
  const [pincode, setPincode] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");
  const welcomeRef = useRef(null);
  const contentRef = useRef(null);
  const [wasteInfo, setWasteInfo] = useState(null);
  const user = pincodeData.find(
    (pincodeObj) => pincodeObj.pincode.toLowerCase() === pincode.toLowerCase()
  )?.user;

  const handlePincodeChange = (event) => {
    setPincode(event.target.value);
  };

  const handleEnterClick = () => {
    if (user) {
      setVerificationStatus("Yes");
      const waste = wasteData.find(
        (wasteObj) => wasteObj.municipality === user.municipality
      );
      setWasteInfo(waste);
      if (welcomeRef.current) {
        welcomeRef.current.scrollIntoView({ behavior: "smooth" });
      }
      
    } else {
      setVerificationStatus("No");
      setWasteInfo(null);
    }
  };

  const calculateUserContribution = () => {
    if (wasteInfo && user) {
      const wasteAmount = parseInt(wasteInfo.wasteAmount);
      const totalHouseholds = parseInt(wasteInfo.totalHouseholds);
      const members = parseInt(user.members);
      const userContribution = (wasteAmount / totalHouseholds) * members * 1000;
      const percentage = ((userContribution / wasteAmount) * 100).toFixed(2); 
      return { userContribution: userContribution.toFixed(2), percentage };
    }
  };

  const getSeverityLevel = (percentage) => {
    if (percentage < 10) {
      return "Low";
    } else if (percentage < 30) {
      return "Medium";
    } else {
      return "High";
    }
  };

  const getEducationalMessage = (severityLevel) => {
    if (severityLevel === "Low") {
      return (
        <>
          <p>Your waste contribution is relatively low. However, it's important to be mindful of proper waste management.</p>
          <div className="points">
          <ul>
            <div className="first-point">
            <li>Reduce waste and carbon emissions by opting for products with minimal packaging. Choose items with eco-friendly packaging or buy in bulk to reduce the overall waste generated.</li>
            </div>
            <div className="second-point">
            <li>Composting organic waste instead of sending it to landfills can significantly reduce methane emissions, a potent greenhouse gas.</li>
            </div>
            <div className="third-point">
            <li>Practice the "3 Rs": Reduce, Reuse, and Recycle. By reducing consumption, reusing items, and recycling materials, we can minimize waste generation and associated carbon emissions.</li>
            </div>
          </ul>
          </div>
        </>
      );
    } else if (severityLevel === "Medium") {
      return (
        <>
          <p>Your waste contribution is moderate. Consider adopting eco-friendly practices to reduce waste.</p>
          <div className="points">
          <ul>
          <div className="first-point">
            <li>Avoid single-use plastics, such as plastic bags and disposable utensils. These items contribute to carbon emissions during production and take a long time to decompose.</li>
            </div>
            <div className="second-point">
            <li>Choose products made from recycled materials whenever possible. By supporting the demand for recycled goods, we can promote a circular economy and reduce the carbon emissions associated with virgin material production.</li>
            </div>
            <div className="third-point">
            <li>Donate or sell unwanted items instead of throwing them away. This reduces waste and extends the life cycle of products, thereby reducing the need for new production and associated carbon emissions.</li>
            </div>
          </ul>
          </div>
        </>
      );
    } else if (severityLevel === "High") {
      return (
        <>
          <p>Your waste contribution is high. It's crucial to prioritize waste reduction and recycling efforts.</p>
          <div className="points">
          <ul>
          <div className="first-point">
            <li>Properly dispose of hazardous materials, such as batteries and electronic waste, at designated recycling centers to prevent their harmful impact on the environment and carbon emissions from improper handling.</li>
            </div>
            <div className="second-point">
            <li>Participate in community initiatives like neighborhood clean-ups and recycling drives to raise awareness about waste management and carbon reduction.</li>
            </div>
            <div className="third-point">
            <li>Educate yourself about local recycling programs and guidelines. Knowing what can and cannot be recycled helps ensure proper waste disposal and reduces carbon emissions from inefficient recycling processes.</li>
            </div>
          </ul>
          </div>
        </>
      );
    }
  };

  return (
    <div className="datatable">
      <MapComponent location={pincode} />
      <div className="pincode-input">
        <div className="pincode-text-container">
          <span className="pincode-text">To verify, please enter your pincode:</span>
        </div>
        <div className="pincode-input-container">
          <input
            type="text"
            placeholder="Enter pincode"
            value={pincode}
            onChange={handlePincodeChange}
            className="pincode-textbox"
          />
          <button onClick={handleEnterClick} className="search-button">
            Search
          </button>
        </div>
        {verificationStatus === "No" && <p className="invalid-text">Invalid pincode.</p>}
      </div>

      {verificationStatus === "Yes" && (
        <div ref={welcomeRef}>
          <div className="welcome-message">
            <h2>Welcome, {user.name}!</h2>
          </div>
          <div ref={contentRef}>
            <section className="waste-details">
            <div className="municipality-info">
  <div className="municipality-image">
    <img src={process.env.PUBLIC_URL + wasteInfo.imageUrl} alt={user.municipality} />
  </div>
  <div className="municipality-details">
      <h3 className="card-title">Waste Details for {user.municipality}</h3>
      <p className="small-desc">Waste Amount: {wasteInfo.wasteAmount}</p>
      <p className="small-desc">Severity: {wasteInfo.severity}</p>
      <p className="small-desc">{wasteInfo.description}</p>
      {/* Rest of your component */}
    </div>
</div>

    {wasteInfo && (
                <div className="waste-info">
                  <h3>User Contribution:</h3>
                  <div className="progress-bar-container">
                    <CircularProgressbar
                      value={parseFloat(calculateUserContribution().percentage)}
                      text={`${calculateUserContribution().percentage}%`}
                      styles={buildStyles({
                        pathColor: "#27ae60",
                        textColor: "#333",
                        trailColor: "#f5f5f5",
                      })}
                    />
                  </div>
                  <p>
                    Weight: {calculateUserContribution().userContribution} Kgs
                  </p>
                  <p>
                    {getEducationalMessage(
                      getSeverityLevel(calculateUserContribution().percentage)
                    )}
                  </p>
                </div>
              )}
                 <div className="images-waste">
                  
                 </div>
            </section>
          </div>
        </div>
     
      )}
    </div>
  );
};

export default Datatable;
