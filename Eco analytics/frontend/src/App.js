import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import MainDash from './components/MainDash/MainDash';
import RightSide from './components/RigtSide/RightSide';
import Sidebar from './components/SideBar/Sidebar';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';

function App() {
  const isAuthenticated = true; 

  return (
    <Router>
      <div className="App">
        <div className="AppGlass">
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route path="/dashboard">
              {isAuthenticated ? (
                <>
                  <Sidebar />
                  <MainDash />
                  <RightSide />
                </>
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Redirect to="/login" />
          </Switch>
        </div>
      </div>
    </Router>
  );

}

export default App;