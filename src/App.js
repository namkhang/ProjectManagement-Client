import React from 'react'
import { Switch , Route } from 'react-router-dom';

import BaiDang from './Component/Home/BaiDang';
import Login from './Component/LoginUser/Login'

function App() {
  return (
    <div className="App">
      <Switch >
        <Route exact path="/" component={BaiDang} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
