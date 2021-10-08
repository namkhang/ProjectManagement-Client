import React from 'react'
import { Switch , Route } from 'react-router-dom';

import Home from './Component/Home/Home';
import Login from './Component/LoginUser/Login'
import CreateReportTemplate from './Component/Report-Template/CreateReportTemplate';
import MyReport from "./Component/Reports/MyReport"
import CreateReport from './Component/Reports/CreateReport';
import './assets/css/styles.css';
import HomeForMentor from './Component/Home/HomeForMentor';
import ChatPage from './Component/Chat-page/ChatPage';
import ChatPageForMentor from './Component/Chat-page/ChatPageForMentor';
import ProfileUser from './Component/Profile/Profile';

function App() {
  return (
    <div className="App">
      <Switch >
        <Route exact path="/" component={Home} />
        <Route exact path="/mentor" component={HomeForMentor} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/mentor/create-report-template" component={CreateReportTemplate} />
        <Route exact path="/my-report" component={MyReport} />
        <Route exact path="/create-report" component={CreateReport} />
        <Route exact path="/chat" component={ChatPage} />
        <Route exact path="/mentor/chat" component={ChatPageForMentor} />
        <Route exact path="/profile/:id" component={ProfileUser} />
      </Switch>
    </div>
  );
}

export default App;
