import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import {Main} from "./components/pages/Main.js";
import "./App.css";
import { Login } from "./components/pages/Login.js";
import { Signup } from "./components/pages/Signup.js";
import { Events } from "./components/pages/Events.js";
import { Create } from "./components/pages/Create.js";
import { connect} from "react-redux";
import {withRouter} from 'react-router'
import {loggedIn} from "./lib/redux/actions.js"
import { AuthAPI } from "./lib/auth";

class _App extends Component {
  constructor(){
    super()
    AuthAPI.loggedIn().then((user)=>{ this.props.loggedIn(user)} ).catch((err)=>console.log(err))
  }
  render() {
    return  <div>
    <Switch>
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/signup" component={Signup} />
      <Route exact path="/" component={Main} />
      <Route path="/create" component={Create} />
      <Route path="/event/:id" component={Events} />
    </Switch>
  </div>
  }
}
export const App = withRouter(connect(store => ({ user: store.user }),{loggedIn})(_App));

