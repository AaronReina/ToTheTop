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
          "https://res.cloudinary.com/aaronreina/image/upload/v1551637407/ToTheTop/fireworks.jpg",
        surprise: false
      },
      rewards: [],
      search: "",
      userList: [],
      private: false,
      temporal: {
        challenged: "",
        inspectors: []
      },
      errorEvent:"",
      errorReward:""
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
    if(state.event.name=== ""|| state.event.objective=== ""){
      this.setState({ errorEvent: "Please complete all the event fields " })
      return
    }
   else if(state.private=== false && (state.temporal.challenged=== "" || state.temporal.inspectors.length === 0 ) ){
    this.setState({ errorEvent: "Please choose the participants " })
    return
  }

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
          })
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
    } else {
      stateCopy.event.privated = "";
      stateCopy.private = privateSwitch;
      this.setState({ state: stateCopy });
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
    statenow.event.inspectors.push(e.target.value);
    statenow.temporal.inspectors.push(e.target.name);
    this.setState({ state: statenow });
  }

  addToChallenged(e) {
    let statenow = this.state;
    if (
      statenow.event.inspectors.includes(e.target.value) ||
      statenow.event.challenged === e.target.value
    ) {
      return "";
    }

    statenow.event.challenged = e.target.value;
    statenow.temporal.challenged = e.target.name;
    this.setState({ state: statenow });
  }
  clearUsers() {
    let stateCopy = this.state;
    stateCopy.event.challenged = "";
    stateCopy.event.inspectors = [];
    stateCopy.temporal.challenged = "";
    stateCopy.temporal.inspectors = [];
    this.setState({ state: stateCopy });
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
          "https://res.cloudinary.com/aaronreina/image/upload/v1551637407/ToTheTop/fireworks.jpg",
        surprise: this.state.reward.surprise
      }
    });
  }
  handleRewardPush(e) {
    if(this.state.reward.name=== ""|| this.state.reward.goal=== ""){
      this.setState({ errorReward: "Please complete all the reward fields " })
      return
    }
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
    this.setState({ errorEvent: "" });
  }
  // handleEventype(e) {
  //   let statenow = this.state.event;
  //   statenow.type = e.target.value;
  //   this.setState({ event: statenow });
  // }
  handleEventobjective(e) {
    let statenow = this.state.event;
    statenow.objective = e.target.value;
    this.setState({ event: statenow });
    this.setState({ errorEvent: "" });
  }
  handleRewardname(e) {
    let statenow = this.state.reward;
    statenow.name = e.target.value;
    this.setState({ reward: statenow });
    this.setState({ errorReward: "" });
  }
  handleRewardgoal(e) {
    let statenow = this.state.reward;
    statenow.goal = e.target.value;
    this.setState({ reward: statenow });
    this.setState({ errorReward: "" });
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
        <div className="info marginTop">
          {!this.props.user ? (
            <div>
              <p>please log in</p>
            </div>
          ) : !this.props.user.active? (
            <div>
              <p>please verify your account</p>
            </div>
          ):(
            <div >
              <h1>NEW EVENT</h1>
            <div className="block backcreate">
            <h2>1. Participants</h2>
              <InputCheck
              id="private"
                text="click if this event is only for you"
                type="checkbox"
                onChange={() => this.privateEvent()}
              />
              {this.state.private || (
                <div>
                  <Input
                    text="or search people by email"
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
                  {(this.state.temporal.challenged || this.state.temporal.inspectors.length >0) &&
                  <ShowUsers
                   className="btn red"
                    onClick={e => this.clearUsers(e)}
                    userdata={this.state.temporal}
                  />
                 }
                </div>
              )}
              </div>
              <div className="block backcreate">
            <h2>2. Event info </h2>
              <Input
                text="Name of the event"
                onChange={e => this.handleEventname(e)}
              />

              {/* <label>"Type of the event"</label>
              <select id="types" onChange={e => this.handleEventype(e)}>
                <option>Basic</option>
                <option>Smoke</option>
                <option>Weigth</option>
                <option>fit</option>
              </select> */}
              <Input
                text="Final Objective"
                onChange={e => this.handleEventobjective(e)}
              />
              </div>
              <div className="block backcreate">
            <h2>3. Rewards</h2>
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
             
              <InputCheck
              id="surprise"
                text="Is a surprise?"
                type="checkbox"
                onChange={() => this.handleRewarsuprise()}
              />
            { this.state.reward.surprise &&  <Input
                text="Add a clue about the secret reward"
                value={this.state.reward.text}
                onChange={e => this.handleRewardtext(e)}
              />}
              <Input
              text="Add a photo of the reward"
                type="file"
                onChange={e => this.handleImgChange(e)}
                name="name"
              />
               <div className="main"> <p className="error">{this.state.errorReward}</p></div>
              <Buttonn
              className="btnbig blue" 
                onClick={e => this.handleRewardPush(e)}
                info={"Add this Reward"}
              />
              </div>
              {this.state.rewards.length>0 &&
              <React.Fragment>
                  <div className="block backcreate">
            <h3>Rewards list</h3>
              <ShowRewards
              className="btn red"
              onClick={() => this.clearRewards()}
              userdata={this.state.rewards}
            />
            </div>
            <div className="main"> <p className="error">{this.state.errorEvent}</p></div>
              <Buttonn
              className="btnbig green" 
                onClick={() => this.createEventHandler()}
                info={"Create Event"}
              />
               </React.Fragment>}
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
