import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import {Main} from "./components/Main.js";
import "./App.css";
import { Login } from "./components/Login.js";
import { Signup } from "./components/Signup.js";



class App extends Component {
  render() {
    return  <div>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/auth/login" component={Login} />
      <Route path="/auth/signup" component={Signup} />
    </Switch>
  </div>
  }
}
export default App;
