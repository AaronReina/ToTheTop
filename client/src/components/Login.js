import React, { Component } from "react";
import Input from './Input';
import {  login  } from '../lib/redux/actions';
import { AuthAPI } from "../lib/auth";
import { connect } from 'react-redux';
import { Header } from "./Header";
import  ButtonRedirect  from "./ButtonRedirect";

export class _Login extends Component {
  constructor(){
    super();
    this.state = {
        email:"",
        password:""
    }
}
handleLogin(){
    const {email, password} = this.state;
    const {dispatch} = this.props;
    AuthAPI.login(email, password)
    .then( user =>{
        dispatch(login(user))
        
    })
    .catch( e =>  e);
}
  render() {
    return (
        
      <div>
          <Header/>
           <div>
        <Input text="Email" onChange={e => this.setState({password:e.target.value})} />
        <Input text="Password" onChange={e => this.setState({email:e.target.value})}/>
        <ButtonRedirect onClick={() => this.handleLogin()} redirect={'/'} info="Login"/>
      </div>
      </div>
    );
  }
}
export const Login = connect(store => store)(_Login);