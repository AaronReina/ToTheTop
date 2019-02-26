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
    setTimeout(()=>this.props.complete(e), 2000);
  };

  render() {
    const {
      unLock,
      event,
      handleImgChange,
      actualValue
    } = this.props;
    return (
      <div>
       
          <div>
            <div>
              <h1>{event.name}</h1>
            </div>
            <div>
              <h3>Objective</h3>
              <h4>{event.objective}</h4>
            </div>
            {event.type !== "private" && (
          <div  className="zones">
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
          <div>
            
            <h2>Actual Progress</h2>
            <h3>{event.actualValue}</h3>
            <div className="respBox">
              <img className="imgFit" alt="img" src={event.photo} />
            </div>
            {event.type !== "inspector" &&<div>
            <Input
              text="Change actual progress info"
              value={this.state.progress}
              onChange={e => this.handleProgress(e)}
            />
            <Input text="Change actual progress image" type="file" onChange={e => handleImgChange(e)} name="name" />
           
          
          <button onClick={e => actualValue(this.state.progress)}>
              Save your progress photo and text
            </button>
            </div>}
        </div>
        <div>
        <h2>Rewards </h2>
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
