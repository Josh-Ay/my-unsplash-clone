import React from 'react';
import Home from "./Home";
import ShowImage from "./ShowImage";
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";


const App = () => {
  return(
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/images/image/:id" component={ShowImage} />
      </Switch>
    </Router>
  );
}

export default App;