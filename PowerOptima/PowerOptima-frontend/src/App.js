import './App.css';
import Chart from "./components/chart/chart"
import CarbonCalculator from './components/carboncalculator/CarbonCalculator';
import Navbar from './components/navbar/Navbar'
import Bgimage from './components/bgimage/Bgimage';
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Bgimage>
      </Bgimage>
      <Chart title="Monthly Power Consumption" aspect={2 / 1} />
      <CarbonCalculator/>
    </div>
  );
}

export default App;
