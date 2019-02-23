import React, { Component } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import Input from "./Input";
import { loggedIn } from "../lib/redux/actions";
import { withRouter } from "react-router";
import { connect } from "react-redux";

class _EventInfo extends Component {
  constructor() {
    super();
    this.state = {
      progress: ""
    
    };
  }
  
  handleProgress = (e) => {
    let statenow = this.state;
    statenow.progress = e.target.value;
    this.setState({ state: statenow });
  }



  render() {
    const {unLock, event,handleImgChange, complete,actualValue} = this.props
    return (
      <div>
        <div>
          <div>
            <h1>Name</h1>
            <h3>{event.name}</h3>
          </div>
          <div>
            <h1>Final objective</h1>
            <h3>{event.objective}</h3>
          </div>
          <div>
          <img alt="img" src={event.photo} />
            <h1>Actual Progress</h1>
            <Input
              type="file"
              onChange={e => handleImgChange(e)}
              name="name"
            />
            <h3>{event.actualValue}</h3>
            <Input
              text="write something to get your rewards"
              value={this.state.progress}
              onChange={e => this.handleProgress(e)}
            />
            <button onClick={e => actualValue(this.state.progress)}>
              save Value
            </button>
          </div>
        </div>

        {event.type !== "private" && (
          <div>
            <div>
              <h2>Challenged </h2>
              <h3>{event.challenged.name}</h3>
            </div>
            <div>
              <h2>Inspectors </h2>
              <div>
                {event.inspectors.map((e, index) => (
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
          {event.rewards.map((e, index) => (
            <div key={index}>
              {e.surprise ? (
                <div id="all">
                  <div className="view view-second">
                    <img
                      alt="img"
                      src="https://res.cloudinary.com/aaronreina/image/upload/v1549059861/ToTheTop/locked.png"
                    />
                    <div className="mask" />
                    <div className="content">
                      <h2>{e.text}</h2>
                    </div>
                  </div>
                </div>
              ) : (
                <img alt="img" src={e.imgPath} />
              )}
              Name {e.name}
              Goal {e.goal}
              {e.done ? (
                <button>COMPLETE</button>
              ) : e.locked ? (
                event.type === "private" ? (
                  <button onClick={_ => complete(e._id)}>
                    Take It!!!
                  </button>
                ) : event.type === "challenged" ? (
                  <button>Blocked!!</button>
                ) : (
                  event.type === "inspector" && (
                    <button onClick={(_)=> unLock(e._id)} >
                      Click to Unlock
                    </button>
                  )
                )
              ) : event.type === "challenged" ? (
                <button onClick={_ => complete(e._id)}>Take It!!!</button>
              ) : (
                event.type === "inspector" && (
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
export const EventInfo = withRouter(
  connect(
    store => ({ events: store.events }),
    { loggedIn }
  )(_EventInfo)
);
