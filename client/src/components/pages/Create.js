import React, { Component } from "react";
import Input from "../Input";
import { connect } from "react-redux";
import { Header } from "../Header";
import Buttonn from "../Buttonn";
import axios from "axios";
import ShowUsers from "../ShowUsers";
import ShowRewards from "../ShowRewards";
import { AuthAPI } from "../../lib/auth.js";
import { loggedIn } from "../../lib/redux/actions";
import { withRouter } from "react-router";
import InputCheck from "../InputCheck";
import ListAccept from "../ListAccept";

class _Create extends Component {
  constructor() {
    super();
    this.state = {
      event: {
        name: "",
        type: "Basic",
        privated: "",
        challenged: "",
        inspectors: [],
        objective: ""
      },
      reward: {
        name: "",
        goal: "",
        text: "",
        imgPath:
          "https://res.cloudinary.com/aaronreina/image/upload/v1549059861/ToTheTop/fireworks.jpg",
        surprise: false
      },
      rewards: [],
      search: "",
      userList: [],
      private: false,
      temporal: {
        challenged: "",
        inspectors: []
      }
    };
  }
  handleImgChange = e => {
    const name = this.username;
    let file = new FormData();
    file.set("name", name);
    file.append("photo", e.target.files[0], name);
    AuthAPI.upload(file).then(({ data }) => {
      let statenow = this.state.reward;
      statenow.imgPath = data.url;
      this.setState({ reward: statenow });
    });
  };

  createEventHandler() {
    const state = this.state;

    return axios

      .post(
        process.env.NODE_ENV === "production"
          ? "/events/create"
          : `http://localhost:3000/events/create`,
        { state }
      )
      .then(res => {
        AuthAPI.loggedIn()
          .then(user => {
            this.props.loggedIn(user);
          })
          .catch(err => console.log(err));
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  }

  filterUsers = e => {
    this.setState({
      search: e.target.value
    });
    e.target.value &&
      axios
        .post(
          process.env.NODE_ENV === "production"
            ? `/events/searchUser/${e.target.value}`
            : `http://localhost:3000/events/searchUser/${e.target.value}`
        )
        .then(element => {
          this.setState({
            userList: element.data
          });
          console.log(this.state.userList);
        })
        .catch(err => console.log(err));
  };
  privateEvent() {
    let stateCopy = this.state;
    let userId = this.props.user._id;
    let privateSwitch = !this.state.private;
    if (privateSwitch === true) {
      stateCopy.event.privated = userId;
      stateCopy.event.challenged = "";
      stateCopy.event.inspectors = [];
      stateCopy.private = privateSwitch;
      this.setState({ state: stateCopy });
      console.log(this.state);
    } else {
      stateCopy.event.privated = "";
      stateCopy.private = privateSwitch;
      this.setState({ state: stateCopy });
      console.log(this.state);
    }
  }

  addToInspector(e) {
    let statenow = this.state;
    if (
      statenow.event.inspectors.includes(e.target.value) ||
      statenow.event.challenged === e.target.value
    ) {
      return "";
    }
    console.log(e.target.value)
    statenow.event.inspectors.push(e.target.value);
    statenow.temporal.inspectors.push(e.target.name);
    this.setState({ state: statenow });
    console.log(this.state);
  }

  addToChallenged(e) {
    let statenow = this.state;
    console.log(e.target.value)
    if (
      statenow.event.inspectors.includes(e.target.value) ||
      statenow.event.challenged === e.target.value
    ) {
      return "";
    }

    statenow.event.challenged = e.target.value;
    statenow.temporal.challenged = e.target.name;
    this.setState({ state: statenow });
    console.log(this.state);
  }
  clearUsers() {
    let stateCopy = this.state;
    stateCopy.event.challenged = "";
    stateCopy.event.inspectors = [];
    stateCopy.temporal.challenged = "";
    stateCopy.temporal.inspectors = [];
    this.setState({ state: stateCopy });
    console.log(this.state);
  }
  clearRewards() {
    this.setState({
      rewards: []
    });
  }

  resetRewards() {
    this.setState({
      reward: {
        name: "",
        goal: "",
        text: "",
        imgPath:
          "https://res.cloudinary.com/aaronreina/image/upload/v1549059861/ToTheTop/fireworks.jpg",
        surprise: this.state.reward.surprise
      }
    });
  }
  handleRewardPush(e) {
    let actualReward = this.state.rewards;
    const reward = this.state.reward;
    actualReward.push({ ...reward });
    this.setState({ rewards: actualReward }, () => this.resetRewards());
    this.resetRewards();
  }
  handleEventname(e) {
    let statenow = this.state.event;
    statenow.name = e.target.value;
    this.setState({ event: statenow });
  }
  handleEventype(e) {
    let statenow = this.state.event;
    statenow.type = e.target.value;
    this.setState({ event: statenow });
  }
  handleEventobjective(e) {
    let statenow = this.state.event;
    statenow.objective = e.target.value;
    this.setState({ event: statenow });
  }
  handleRewardname(e) {
    let statenow = this.state.reward;
    statenow.name = e.target.value;
    this.setState({ reward: statenow });
  }
  handleRewardgoal(e) {
    let statenow = this.state.reward;
    statenow.goal = e.target.value;
    this.setState({ reward: statenow });
  }
  handleRewardtext(e) {
    let statenow = this.state.reward;
    statenow.text = e.target.value;
    this.setState({ reward: statenow });
  }
  handleRewarsuprise() {
    let statenow = this.state.reward;
    statenow.surprise = !statenow.surprise;
    this.setState({ reward: statenow });
  }

  render() {
    return (
      <div>
        <Header />
        <div className="info">
          {!this.props.user ? (
            <div>
              <p>please log in</p>
            </div>
          ) : (
            <div>
              <InputCheck
              id="private"
                text="Click to make this event private"
                type="checkbox"
                onChange={() => this.privateEvent()}
              />
              {this.state.private || (
                <div>
                  <Input
                    text="or type an email to looking for friends"
                    onChange={e => this.filterUsers(e)}
                  />
                  <ListAccept
                     color1="purple"
                     color2="orange"
                  option1="Challenged"
                  option2="Inspector"
                    onClick={e => this.addToChallenged(e)}
                    onClick2={e => this.addToInspector(e)}
                    userdata={this.state.userList}
                  />
                  <ShowUsers
                    onClick={e => this.clearUsers(e)}
                    userdata={this.state.temporal}
                  />
                </div>
              )}
              <Input
                text="Name of the event"
                onChange={e => this.handleEventname(e)}
              />

              <label>"Type of the event"</label>
              <select id="types" onChange={e => this.handleEventype(e)}>
                <option>Basic</option>
                <option>Smoke</option>
                <option>Weigth</option>
                <option>fit</option>
              </select>
              <Input
                text="Final Objective"
                onChange={e => this.handleEventobjective(e)}
              />
              <Input
                text="Name of the reward"
                value={this.state.reward.name}
                onChange={e => this.handleRewardname(e)}
              />
              <Input
                text="Goal for this reward"
                value={this.state.reward.goal}
                onChange={e => this.handleRewardgoal(e)}
              />
              <Input
                text="some info about the reward"
                value={this.state.reward.text}
                onChange={e => this.handleRewardtext(e)}
              />
              <InputCheck
              id="surprise"
                text="Is a surprise?"
                type="checkbox"
                onChange={() => this.handleRewarsuprise()}
              />
              <Input
                type="file"
                onChange={e => this.handleImgChange(e)}
                name="name"
              />
              <Buttonn
              className="btnbig blue" 
                onClick={e => this.handleRewardPush(e)}
                info={"Add this Reward"}
              />
              <ShowRewards
                onClick={() => this.clearRewards()}
                userdata={this.state.rewards}
              />
              {this.state.rewards.length>0 &&
              <Buttonn
              className="btnbig green" 
                onClick={() => this.createEventHandler()}
                info={"Create Event"}
              />}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export const Create = withRouter(
  connect(
    store => ({ user: store.user }),
    { loggedIn }
  )(_Create)
);
