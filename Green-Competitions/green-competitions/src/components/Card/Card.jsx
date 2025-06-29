// import React, { useState } from "react";
// import "./Card.css";

// const Card = ({emoji, heading, detail, color}) => {
//   const [popupVisible, setPopupVisible] = useState(false);
//   const [agreedToTerms, setAgreedToTerms] = useState(false);

//   const togglePopup = () => {
//     setPopupVisible(!popupVisible);
//   };

//   const handleAllowClick = () => {
//     if (agreedToTerms) {
//       // You can add your logic here to handle allowing the account to participate
//       // For example, make an API call to update the account's participation status
//       // and then close the pop-up.
//       // For now, let's just close the pop-up.
//       togglePopup();
//     }
//   };

//   return (
//     <div className="card" style={{ borderColor: color }}>
//       <img src={emoji} alt="" />
//       <span>{heading}</span>
//       <span>{detail}</span>
//       <button className="c-button" onClick={togglePopup}>LEARN MORE</button>
      
//       {popupVisible && (
//         <div className="popup">
          
//           <div className="popup-content">
//           <h2>Allow Participation</h2>
//             <span>Welcome to Watt Charges! Our innovative event is designed to reward users for their conscious effort in reducing electricity consumption. By participating in Watt Charges, users have the opportunity to earn exciting rewards as they contribute to a greener environment.

// Here's how it works:<br></br>
// 1. Reward Generation: Your rewards are directly tied to your electricity consumption. The less electricity you use, the more rewards you earn. Our system calculates your reward based on the units of electricity consumed relative to a predetermined threshold limit.
// <br></br>
// 2. Threshold Limit: When your electricity consumption falls below the threshold limit, you qualify for reward generation. This threshold is carefully determined to reflect sustainable energy usage without compromising your comfort.
// <br></br>
// 3. Reward Calculation: The reward generated is a result of your exceptional efforts to save energy. It's calculated by multiplying your electricity units saved below the threshold by the reward rate set for the event.
// <br></br>
// Participating in Watt Charges is a win-win situation – not only do you enjoy lower utility bills by using less electricity, but you also earn tangible rewards for your commitment to a greener planet.

// Join us in this eco-conscious initiative and be a part of the change. By agreeing to these terms, you acknowledge and accept the mechanisms through which rewards are generated based on your electricity consumption during the Watt Charges event. Let's work together towards a brighter and more sustainable future!</span>
//             <div className="cont">
//             <p>Please check the box below to confirm that you agree to the terms and conditions:</p>
//             <label>
//               <input
//                 type="checkbox"
//                 checked={agreedToTerms}
//                 onChange={() => setAgreedToTerms(!agreedToTerms)}
//               />
//               Agree to terms and conditions
//             </label><br></br>
//             <button
//               className="allow-button"
//               onClick={handleAllowClick}
//               disabled={!agreedToTerms}
//             >
//               Allow
//             </button>
            
//             <button className="close-button" onClick={togglePopup}>Close</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Card;
import React, { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Card.css";

const Card = ({ emoji, heading, detail, color }) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };

  const handleAllowClick = () => {
    if (agreedToTerms) {
      // Show toast message when user agrees
      toast.success('You have agreed to the terms!', {
        position: toast.POSITION.TOP_CENTER
      });
      togglePopup();
    }
  };

  return (
    <div className="card" style={{ borderColor: color }}>
      <img src={emoji} alt="" />
      <span>{heading}</span>
      <span>{detail}</span>
      <button className="c-button" onClick={togglePopup}>
        LEARN MORE
      </button>

      {popupVisible && (
        <div className="popup">
          <div className="popup-content">
                     <h2>Allow Participation</h2>
             <span>Welcome to Watt Charges! Our innovative event is designed to reward users for their conscious effort in reducing electricity consumption. By participating in Watt Charges, users have the opportunity to earn exciting rewards as they contribute to a greener environment.

 Here's how it works:<br></br>
 1. Reward Generation: Your rewards are directly tied to your electricity consumption. The less electricity you use, the more rewards you earn. Our system calculates your reward based on the units of electricity consumed relative to a predetermined threshold limit.
 <br></br>
 2. Threshold Limit: When your electricity consumption falls below the threshold limit, you qualify for reward generation. This threshold is carefully determined to reflect sustainable energy usage without compromising your comfort.
 <br></br>
 3. Reward Calculation: The reward generated is a result of your exceptional efforts to save energy. It's calculated by multiplying your electricity units saved below the threshold by the reward rate set for the event.
 <br></br>
 Participating in Watt Charges is a win-win situation – not only do you enjoy lower utility bills by using less electricity, but you also earn tangible rewards for your commitment to a greener planet.

 Join us in this eco-conscious initiative and be a part of the change. By agreeing to these terms, you acknowledge and accept the mechanisms through which rewards are generated based on your electricity consumption during the Watt Charges event. Let's work together towards a brighter and more sustainable future!</span>

            <div className="cont">
              <p>Please check the box below to confirm that you agree to the terms and conditions:</p>
              <label>
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={() => setAgreedToTerms(!agreedToTerms)}
                />
                Agree to terms and conditions
              </label>
              <br />
              <button
                className="allow-button"
                onClick={handleAllowClick}
                disabled={!agreedToTerms}
              >
                Agree and Continue
              </button>

              <button className="close-button" onClick={togglePopup}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
