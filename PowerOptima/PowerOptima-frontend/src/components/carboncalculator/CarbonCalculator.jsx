import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CarbonCalculator from './CarbonCalculator.css'


const EmissionCalculatorForm = () => {
  
  const [power, setPower] = useState(null);
  const [country, setCountry] = useState(null);
  const [calculationResult, setCalculationResult] = useState(null);
  const [error, setError] = useState(null);
  const [emissionStats, setEmissionStats] = useState(null);
  const [educativeContent, setEducativeContent] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5005/api/power-consumption/aadhar/123456789012')
      .then((response) => {
        const data = response.data;
        setPower(data.powerConsumed);
        setCountry(data.Country);
      })
      .catch((error) => {

        setError(`Error fetching power and country information: ${error.message}`);
      });
  }, []);

  const performCalculation = (power, percentages) => {
        const {
          coalPercentage,
          gasPercentage,
          oilPercentage,
          hydroPercentage,
          renewablePercentage,
          nuclearPercentage
        } = percentages;
    
        const totalPercentage = coalPercentage + gasPercentage + oilPercentage + hydroPercentage + renewablePercentage + nuclearPercentage;
    
        const coalCO = 820; // gCO2/kWh (constant)
        const gasCO = 490; // gCO2/kWh (constant)
        const oilCO = 778; // gCO2/kWh (constant)
        const hydroCO = 24; // gCO2/kWh (constant)
        const renewCO = 41; // gCO2/kWh (constant)
        const nuclearCO = 12; // gCO2/kWh (constant)
    
        const kgCO2result = ((coalPercentage * coalCO + gasPercentage * gasCO + oilPercentage * oilCO +
          hydroPercentage * hydroCO + renewablePercentage * renewCO + nuclearPercentage * nuclearCO) / 100000) * 24 * 365.2422 * power;
        const treesRequired = kgCO2result / 15.7;
    
        return {
          totalPercentage: Math.round(totalPercentage * 10) / 10 + "%",
          kgCO2result: Math.ceil(kgCO2result).toLocaleString('en').replace(/,/g, " "),
          treesRequired: Math.ceil(treesRequired).toLocaleString('en').replace(/,/g, " "),
          priceRequired: Math.round(treesRequired / 10).toLocaleString('en').replace(/,/g, " ")
        };
      };

  useEffect(() => {
    if (country) {
      axios
        .get(`http://localhost:5005/api/electricity-generation/${country}`)
        .then((response) => {
          const data = response.data;
          const percentages = {
            coalPercentage: data.Coal,
            gasPercentage: data.Gas,
            oilPercentage: data.Oil,
            hydroPercentage: data.Hydro,
            renewablePercentage: data.Renewable,
            nuclearPercentage: data.Nuclear
          };
          const result = performCalculation(power, percentages);
          setCalculationResult(result);
          setEmissionStats(percentages);
        })
        .catch((error) => {
          setError(`Error fetching emission statistics: ${error.message}`);
        });
    }
  }, [country, power]);

  useEffect(() => {
    axios
      .get('http://localhost:5005/api/educativecontent/electricity')
      .then((response) => {
        setEducativeContent(response.data);
      })
      .catch((error) => {
        setError(`Error fetching educative content: ${error.message}`);
      });
  }, []);


  return (
    <div>

      {/* <h2>Emission Calculator</h2> */}
      <h2 className="section-title">Emission Calculator</h2>

      {error && <p>{error}</p>}
      
      {emissionStats && (
        <div className="emission-stats">
          <h3>Emission Statistics for {country}</h3>
          <table>
            <thead>
              <tr>
                <th>Energy Source</th>
                <th>Percentage</th>
                <th>gCO2/kWh</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Coal</td>
                <td>{emissionStats.coalPercentage} %</td>
                <td>820 gCO2/kWh</td>
              </tr>
              <tr>
                <td>Natural Gas</td>
                <td>{emissionStats.gasPercentage} %</td>
                <td>490 gCO2/kWh</td>
              </tr>
              <tr>
                <td>Oil</td>
                <td>{emissionStats.oilPercentage} %</td>
                <td>778 gCO2/kWh</td>
              </tr>
              <tr>
                <td>Hydropower*</td>
                <td>{emissionStats.hydroPercentage} %</td>
                <td>24 gCO2/kWh</td>
              </tr>
              <tr>
                <td>Renewable**</td>
                <td>{emissionStats.renewablePercentage} %</td>
                <td>41 gCO2/kWh</td>
              </tr>
              <tr>
                <td>Nuclear</td>
                <td>{emissionStats.nuclearPercentage} %</td>
                <td>12 gCO2/kWh</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {educativeContent && (
          <div className='edu'>
            <h3>Educative Content</h3>
            <ul>
              {educativeContent.map((content) => (
                <li key={content._id}>{content.content}</li>
              ))}
            </ul>
          </div>
      )}

      {calculationResult && (
        <div className="result">
          <h3>Calculation Result</h3>
          <p>Total Percentage: {calculationResult.totalPercentage}</p>
          <p>
            kg CO2 Result:
            <span className="donation">
              You produce {calculationResult.kgCO2result} kg of CO2 emissions per year.
            </span>
          </p>
          <p>
            Trees Required:
            <span className="donation">
              You would need to plant {calculationResult.treesRequired} to eliminate your carbon footprint on our planet.
            </span>
          </p>
          <p>
            You can donate $
            <span className="donation">
              {calculationResult.priceRequired}
            </span>{" "}
            to trees.org to eliminate your carbon footprint.
          </p>
        </div>
      )}


      
    


    </div>
  );
};

export default EmissionCalculatorForm;
