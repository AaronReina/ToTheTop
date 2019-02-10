import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import {Main} from "./components/pages/Main.js";
import "./App.css";
import { Login } from "./components/pages/Login.js";
import { Signup } from "./components/pages/Signup.js";
import { Events } from "./components/pages/Events.js";
import { Create } from "./components/pages/Create.js";



class App extends Component {
  render() {
    return  <div>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/signup" component={Signup} />
    
      <Route path="/create" component={Create} />
      <Route path="/event/:id" component={Events} />
    </Switch>
  </div>
  }
}
export default App;
