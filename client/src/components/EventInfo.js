import React, { Component } from "react";
import Input from "./Input";
import { loggedIn } from "../lib/redux/actions";
import { withRouter } from "react-router";
import { connect } from "react-redux";

class _EventInfo extends Component {
  constructor() {
    super();
    this.state = {
      progress: "",
      animation: ""
    };
  }

  handleProgress = e => {
    let statenow = this.state;
    statenow.progress = e.target.value;
    this.setState({ state: statenow });
  };
  animation = e => {
    this.setState({ animation: "spin" });
    setTimeout(()=>this.props.complete(e), 4000);
    
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
          {event.rewards.map((e, index) => (
            <div key={index}>
                  {e.surprise ? (
                    <div>
                    <div>{`Goal:   ${e.goal}`}</div>
                <div id="all">
                  <div className="view view-second">
                    <div className={`respBox ${this.state.animation}`}>
                      <img
                        className="imgFit" 
                        alt="img"
                        src="https://res.cloudinary.com/aaronreina/image/upload/v1549059861/ToTheTop/locked.png"
                      />
             
                    </div>

                    <div className="mask" />
                    <div className="content">
                      <h2>{e.text}</h2>
                    </div>
                  </div>
                  </div>
                </div>
              ) : (
                <div>
                <div>{e.name}</div>
                <div className="respBox">
                      <img
                        className="imgFit"
                        alt="img"
                        src={e.imgPath} 
                      />
                    </div>
                    </div>
              )}{e.done ? (
                <button>COMPLETE</button>
              ) : e.locked ? (
                event.type === "private" ? (
                  <button onClick={_=>this.animation(e._id)} >Take It!!!</button>
                ) : event.type === "challenged" ? (
                  <button>Blocked!!</button>
                ) : (
                  event.type === "inspector" && (
                    <button onClick={_ => unLock(e._id)}>
                      Click to Unlock
                    </button>
                  )
                )
              ) : event.type === "challenged" ? (
                <button onClick={_=>this.animation(e._id)}>Take It!!!</button>
              ) : (
                event.type === "inspector" && <button>Unlocked!!</button>
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
