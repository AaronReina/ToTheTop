import React, { Component } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import Input from "./Input";
import { AuthAPI } from "../lib/auth";

class EventInfo extends Component {
  constructor(){
super()
    this.state={

      progress:"",
      photo:""

    }
  }
  handleProgress(e) {
    let statenow = this.state;
    statenow.progress = e.target.value;
    this.setState({ state: statenow });
  }
  unLock(e) {
    console.log(e);
    return axios
      .post(`http://localhost:3000/events/unLock/${e}`)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  }
  actualValue() {
   
    const state = this.state;
    return axios
      .post(`http://localhost:3000/events/actualValue/${this.props.event.id}`,{state})
      .then(res => {
        console.log("hola");
      })
      .catch(err => console.log(err));
  }
  complete(e) {
    console.log(e);
    return axios
      .post(`http://localhost:3000/events/complete/${e}`)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  }
  handleImgChange = e => {
    const name = this.username;
    let file = new FormData();
    file.set("name", name);
    file.append("photo", e.target.files[0], name);
    AuthAPI.upload(file).then(({data})=> {  let statenow = this.state;
    statenow.photo = data.url;
    console.log(data.url)
    this.setState({ state: statenow })})
  };

  render() {
    return (
      <div>
        <div>
          <div>
            <h1>Name</h1>
            <h3>{this.props.event.name}</h3>
          </div>
          <div>
            <h1>Final objective</h1>
            <h3>{this.props.event.objective}</h3>
          </div>
          <div>
            <h1>Actual Progress</h1>
            <Input
                  type="file"
                  onChange={e => this.handleImgChange(e)}
                  name="name"
                />
                 <h3>{this.props.event.actualValue}</h3>
            <Input
                text="write something to get your rewards"
                value={this.state.progress}
                onChange={e => this.handleProgress(e)}
              />
               <button onClick={_ => this.actualValue(this.state.progress)}>save Value</button>
          </div>
        </div>

        {this.props.event.type !== "private" && (
          <div>
            <div>
              <h2>Challenged </h2>
              <h3>{this.props.event.challenged.name}</h3>
            </div>
            <div>
              <h2>Inspectors </h2>
              <div>
                {this.props.event.inspectors.map((e, index) => (
                  <div key={index}>
                    <p>Name {e.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div>
          <h2>Rewards </h2>
          {this.props.event.rewards.map((e, index) => (
            <div key={index}>
              Name {e.name}
              Goal {e.goal}
              Text {e.text}
              {e.done ? (
                <button>COMPLETE</button>
              ) : e.locked ? (
                this.props.event.type === "private" ? (
                  <button onClick={_ => this.complete(e._id)}>
                    Take It!!!
                  </button>
                ) : this.props.event.type === "challenged" ? (
                  <button>Blocked!!</button>
                ) : (
                  this.props.event.type === "inspector" && (
                    <button onClick={_ => this.unLock(e._id)}>
                      Click to Unlock
                    </button>
                  )
                )
              ) : this.props.event.type === "challenged" ? (
                <button onClick={_ => this.complete(e._id)}>Take It!!!</button>
              ) : (
                this.props.event.type === "inspector" && (
                  <button>Unlocked!!</button>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default EventInfo;
