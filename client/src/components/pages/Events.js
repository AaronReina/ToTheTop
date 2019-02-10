import React, { Component } from "react";
import { connect } from 'react-redux';
import { Header } from "../Header";
import axios from 'axios';
import EventInfo from "../EventInfo";


export class _Events extends Component {

    constructor(){
        super();
        this.state = {
        type: "",
        event: {}
        }
    }
eventHandler() {
    const {user}= this.props
    console.log(this.props)
    console.log(this.props.match.params.id)
    return axios.post(`http://localhost:3000/events/event/${this.props.match.params.id}`,{user},).then(
        res => {this.setState({type:res.data.type,event:res.data.event})
        console.log( this.state.event)}
       
   ).catch(err=>console.log(err));    
}
    componentDidMount() {
        this.props.user &&
        this.eventHandler()
        
      }
  render() {
    return (
        <div>
        <Header event={this.state.type}/>
           <div>
           {!this.props.user ? (
          <div>
           <p>please log in</p>
          </div>
        ) : this.state.type !== "challenged" && this.state.type !== "private" && this.state.type !== "inspector"?
        <p>you have no access to this challenge</p>
        :
        (
          <div>
              {console.log(this.state.event)}
          <EventInfo event={this.state.event}/>
          </div>
        )}
             
      </div>
      </div>
    );
  }
}
export const Events = connect(store => ({user:store.user}))(_Events);