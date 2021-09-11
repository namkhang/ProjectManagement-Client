import React from 'react'
import { Switch , Route } from 'react-router-dom';

import BaiDang from './Component/Home/BaiDang';

function App() {
  return (
    <div className="App">
      <Switch >
        <Route exact path="/" component={BaiDang} />
      </Switch>
    </div>
  );
}

export default App;
