import React, { Component } from "react";
import Input from "./Input";
import { loggedIn } from "../lib/redux/actions";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import Rewards from "./Rewards"

class _EventInfo extends Component {
  constructor() {
    super();
    this.state = {
      progress: "",
    };
  }

  handleProgress = e => {
    let statenow = this.state;
    statenow.progress = e.target.value;
    this.setState({ state: statenow });
  };
  complete = e => {
    this.props.complete(e)
  };

  render() {
    const {
      unLock,
      event,
      handleImgChange,
      actualValue,
      askInspect
    } = this.props;
    return (
      <div>
          <div>
            <div>
              <h1>{event.name}</h1>
            </div>
            <div className= {`block back${event.type}`}>
              <h2>Objective</h2>
              <h3>{event.objective}</h3>
            </div>
            {event.type !== "private" && (
          <div  className="zones block">
            <div>
              <h4>Challenged </h4>
              <p>{event.challenged.name}</p>
            </div>
            <div>
              <h4>Inspectors </h4>
              <div>
                {event.inspectors.map((e, index) => (
                  <div key={index}>
                    <p> {e.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
          </div>
          <div className= {`block back${event.type}`}>
            
            <h2>Actual Progress</h2>
            <div className="respBox">
            <h3>{event.actualValue}</h3>
              <img className="imgFit" alt="img" src={event.photo} />
            </div>
            {event.type !== "inspector" &&<div>
            <Input type="file" onChange={e => handleImgChange(e)} name="name" />
            <Input
              text="Type your progress and add a proof"
              value={this.state.progress}
              onChange={e => this.handleProgress(e)}
            />
          <button className="btnbig green" onClick={e => actualValue(this.state.progress)}>
              Save progress
            </button>
            </div>}
            {event.type == "challenged" &&
            <button id="ask" className="btnbig orange" onClick={_ => askInspect()}>
              Ask for inspection!!
            </button>}
        </div>
        <div className="block">
        <h2>List of Rewards </h2>
        {this.props.event.rewards.map((e, index) => (
     <Rewards key={index} cont={index} e={e}  event={event} unLock={e => unLock(e)} complete={e => this.complete(e)}   />
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
