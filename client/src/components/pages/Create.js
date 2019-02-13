import React, { Component } from "react";
import Input from "../Input";
import { connect } from "react-redux";
import { Header } from "../Header";
import Buttonn from "../Buttonn";
import axios from "axios";
import AddUsers from "../AddUsers";

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
      rewards: [],
      search: "",
      userList: [],
      private: false
    };
  }
  createEventHandler() {
    const state = this.state;
    return axios
      .post(`http://localhost:3000/events/create`, { state })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  filterUsers = e => {
    this.setState({
      search: e.target.value
    });
    e.target.value &&
      axios
        .post(`http://localhost:3000/events/searchUser/${e.target.value}`)
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
  let userId = this.props.user._id
  let privated= !this.state.private;
  if(privated===true)
    {
      stateCopy.event.challenged = userId;
      stateCopy.event.inspectors.push(userId);
      stateCopy.private = privated;  
    this.setState({ state:stateCopy})
    console.log(this.state)}
    
    else{
      stateCopy.event.challenged = "";
      stateCopy.event.inspectors= []
      stateCopy.private = privated;  
    this.setState({ state:stateCopy})
    console.log(this.state)}
    
    
  }

  addToInspector(e) {
    let statenow = this.state.event;
    statenow.inspectors.includes(e.target.value) ||
      statenow.inspectors.push(e.target.value);
    this.setState({ rewards: statenow });
    console.log(this.state);
  }
  addToChallenged(e) {
    let statenow = this.state.event;
    statenow.challenged = e.target.value;
    this.setState({ event: statenow });
    console.log(e.target.value);
  }
  clearUsers() {
    let stateCopy = this.state;
       stateCopy.event.challenged = "";
      stateCopy.event.inspectors= []
    this.setState({ state:stateCopy})
    console.log(this.state)}
  
  handleRewardPush(e) {
    let actualReward = this.state.rewards;
    const reward = this.state.reward;
    actualReward.push({ ...reward });
    this.setState({ rewards: actualReward });
    console.log(e.target.value);
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
        <div>
          {!this.props.user ? (
            <div>
              <p>please log in</p>
            </div>
          ) : (
            <div>
               <Input
                text="Click make it private"
                type="checkbox"
                onChange={() => this.privateEvent()}
              />
              {this.state.private ||
              <div>
                <Input
                  text="Looking for friends"
                  onChange={e => this.filterUsers(e)}
                />
                <AddUsers
                  onClick={e => this.addToChallenged(e)}
                  onClick2={e => this.addToInspector(e)}
                  userdata={this.state.userList}
                />
                {/* <showUsers
                  onClick={e => this.clearUsers(e)}
                  userdata={this.state.event}
                /> */}
              </div>
              }
              <Input
                text="Name of the event"
                onChange={e => this.handleEventname(e)}
              />
              <Input
                text="Type of the event"
                list="types"
                onChange={e => this.handleEventype(e)}
              />
              <datalist id="types">
                <option>Basic</option>
                <option>Smoke</option>
                <option>Weigth</option>
                <option>fit</option>
              </datalist>
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
