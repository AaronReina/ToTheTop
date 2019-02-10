import React, { Component } from "react";
import Input from "../Input";
import { connect } from "react-redux";
import { Header } from "../Header";
import Buttonn from "../Buttonn";
import axios from "axios";

export class _Create extends Component {
  constructor() {
    super();
    this.state = {
      event: {
        name: "",
        type: "",
        challenged: "",
        inspectors: [],
        objective: ""
      },
      reward: {
        name: "",
        goal: "",
        text: "",
        imgPath: "",
        surprise: false
      },
      rewards: []
    };
  }
  createEventHandler() {
    const state = this.state;
    console.log(state);
    return axios
      .post(`http://localhost:3000/events/create`, { state })
      .then(res => {
        console.log({ state });
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  handleRewardPush() {
    let actualReward = this.state.rewards;
    let reward = this.state.reward;
    console.log(this.state.rewards);
    console.log(this.state.reward);
    actualReward.push(reward);
    this.setState({ rewards: actualReward });

  }

  handleEventname(e) {
    let statenow = this.state.event;
    statenow.name = e.target.value;
    this.setState({ event: statenow });
    console.log(this.state.event.name);
    console.log(this.state.rewards);
  }
  handleEventype(e) {
    let statenow = this.state.event;
    statenow.type = e.target.value;
    this.setState({ event: statenow });
    console.log(this.state.event.type);
  }
  handleEventobjective(e) {
    let statenow = this.state.event;
    statenow.objective = e.target.value;
    this.setState({ event: statenow });
    console.log(this.state.event.objective);
  }
  handleRewardname(e) {
    let statenow = this.state.reward;
    statenow.name = e.target.value;
    this.setState({ reward: statenow });
    console.log(this.state.reward.name);
  }
  handleRewardgoal(e) {
    let statenow = this.state.reward;
    statenow.goal = e.target.value;
    this.setState({ reward: statenow });
    console.log(this.state.reward.goal);
  }
  handleRewardtext(e) {
    let statenow = this.state.reward;
    statenow.text = e.target.value;
    this.setState({ reward: statenow });
    console.log(this.state.reward.text);
  }
  handleRewarsuprise() {
    let statenow = this.state.reward;
    statenow.surprise = !statenow.surprise;
    this.setState({ reward: statenow });
    console.log(this.state.reward.surprise);
    console.log(this.state.reward.text);
  }

  render() {
    return (
      <div>
        <Header />
        <div>
          {!this.props.user ? (
            <div>
              <p>please log in</p>
            </div>
          ) : (
            <div>
              <Input
                text="Name of the event"
                onChange={e => this.handleEventname(e)}
              />
              <Input
                text="Type of the event"
                onChange={e => this.handleEventype(e)}
              />
              <Input
                text="Final Objective"
                onChange={e => this.handleEventobjective(e)}
              />
              <Input
                text="Name of the reward"
                onChange={e => this.handleRewardname(e)}
              />
              <Input
                text="Goal for this reward"
                onChange={e => this.handleRewardgoal(e)}
              />
              <Input
                text="some info about the reward"
                onChange={e => this.handleRewardtext(e)}
              />
              <Input
                text="Is a surprise?"
                type="checkbox"
                onChange={() => this.handleRewarsuprise()}
              />
              <Buttonn
                onClick={() => this.handleRewardPush()}
                info={"Add this Reward"}
              />
              {/* <form>
                    <input
                      type="file"
                      onChange={e => this.handleImgChange(e)}
                      name="name"
                    />
                    <button onClick={e => this.handleUpload(e)}>SUBIR</button>
                  </form> */}
              <Buttonn
                onClick={() => this.createEventHandler()}
                info={"Create Event"}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export const Create = connect(store => ({ user: store.user }))(_Create);
//   handleImgChange = e => {
//     const name = this.username;
//     let file = new FormData();
//     file.set("name", name);
//     file.append("photo", e.target.files[0], name);
//     let { dispatch } = this.props;
//     dispatch({ type: "IMG_UPLOAD", image: file });
//   };

//   handleUpload = e => {
//     e.preventDefault();
//     AuthAPI.upload(this.props.image).then(e => console.log(this.props.image));
//   };
