import React, { Component } from "react";
import Input from '../Input';
import {  login  } from '../../lib/redux/actions';
import { AuthAPI } from "../../lib/auth";
import { connect } from 'react-redux';
import { Header } from "../Header";
import  Buttonn  from "../Buttonn";

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
        this.props.history.push("/")
    })
    .catch( e =>  e);
}
  render() {
    return (
        
      <div>
          <Header/>
           <div className="marginTop">
        <Input text="Email" onChange={e => this.setState({email:e.target.value})} />
        <Input text="Password" onChange={e => this.setState({password:e.target.value})}/>
        <div className="info">
        <Buttonn  onClick={() => this.handleLogin()}  info="Login"/>
      </div>
      </div>
      </div>
    );
  }
}
export const Login = connect(store => ({user:store.user}))(_Login);