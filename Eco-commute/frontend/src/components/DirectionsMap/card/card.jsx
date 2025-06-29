import React from 'react';
import './card.css'; 

const Card = (props) => {
  const { title, content, icon, showDetails, toggleDetails,value } = props;

  const handleButtonClick = (event) => {
    event.preventDefault(); 
    toggleDetails(); 
  };

  return (
    <div className="card">
      <a href="#" onClick={handleButtonClick}>
        <div className="card--display">
          <i className="material-icons">{icon}</i>
          <h2>{title}</h2>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>

          <p className='emission'>Emission Rate : {value}</p>
        </div>
        <div className="card--hover">
          <div className='card-content'>
          <h2>{title}</h2>
          <p>{content}</p>
          
          </div>
          <div className="card-button-container">
          <button className="link" onClick={handleButtonClick}>
            {showDetails ? "Hide Details" : "Show Details"}
          </button>
          </div>
        </div>
      </a>
      <div className="card--border"></div>
    </div>
  );
};

export default Card;
