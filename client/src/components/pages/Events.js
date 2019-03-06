import React, { Component } from "react";
import { connect } from "react-redux";
import { Header } from "../Header";
import axios from "axios";
import { EventInfo } from "../EventInfo";
import { AuthAPI } from "../../lib/auth";

export class _Events extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      type: "",
      name: "",
      objective: "",
      actualValue: "",
      challenged: "",
      inspectors: [],
      rewards: [],
      lock: ""
    };
  }
  eventHandler() {
    const { user } = this.props;

    return axios
      .post(
        process.env.NODE_ENV === "production"
          ? `/events/type/${this.props.match.params.id}`
          : `http://localhost:3000/events/type/${this.props.match.params.id}`,
        {
          user
        }
      )
      .then(res => {
        this.setState({ type: res.data.type });
      })
      .catch(err => console.log(err));
  }

  eventHandler2() {
    return axios
      .post(
        process.env.NODE_ENV === "production"
          ? `/events/populate/${this.props.match.params.id}`
          : `http://localhost:3000/events/populate/${
              this.props.match.params.id
            }`
      )
      .then(res => {
        this.setState({
          id: this.props.match.params.id,
          name: res.data.name,
          objective: res.data.objective,
          challenged: res.data.challenged,
          inspectors: res.data.inspectors,
          rewards: res.data.rewards,
          actualValue: res.data.actualValue,
          lock: res.data.locked,
          progress: res.data.progress,
          photo: res.data.imgPath
        });
      })
      .catch(err => console.log(err));
  }

  unLock = e  => {
    const { challenged } = this.state;
    return axios
      .post(
        process.env.NODE_ENV === "production"
          ? `/events/unLock/${e}`
          : `http://localhost:3000/events/unLock/${e}`,
          {
            challenged
          }
      )
      .then(res => {
        let newState = [...this.state.rewards];
        newState = newState.map(reward =>
          reward._id === res.data._id ? res.data : reward
        );
        this.setState({ rewards: newState });
      })

      .catch(err => console.log(err));
  };

  actualValue = value => {
    const state = this.state;
    return axios

      .post(
        process.env.NODE_ENV === "production"
          ? `/events/actualValue/${state.id}`
          : `http://localhost:3000/events/actualValue/${state.id}`,
        {
          event: { ...state, progress: value }
        }
      )
      .then(res => {
        this.setState({ actualValue: res.data.actualValue });
      })
      .catch(err => console.log(err));
  };
  complete = e => {
    return axios
      .post(
        process.env.NODE_ENV === "production"
          ? `/events/complete/${e}`
          : `http://localhost:3000/events/complete/${e}`
      )
      .then(res => {
        let newState = [...this.state.rewards];
        newState = newState.map(reward =>
          reward._id === res.data._id ? res.data : reward
        );
        this.setState({ rewards: newState });
      })
      .catch(err => console.log(err));
  };
  handleImgChange = e => {
    const name = "pepe";
    let file = new FormData();
    file.set("name", name);
    file.append("photo", e.target.files[0], name);
    AuthAPI.upload(file).then(({ data }) => {
      let statenow = this.state;
      statenow.photo = data.url;
      this.setState({ state: statenow });
    });
  };
  
  askInspect=e=> {
    const { inspectors,challenged } = this.state;
    return axios
      .post(
        process.env.NODE_ENV === "production"
          ? `/events/ask`
          : `http://localhost:3000/events/ask`,
        {
          inspectors,
          challenged
        }
      )
      .then(res => {
        
        document.getElementById("ask").className="btnbig disable"
        setTimeout(()=>document.getElementById("ask").className="btnbig orange", 600000);
        
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.props.user && this.eventHandler() && this.eventHandler2();
  }
  componentDidUpdate(prop) {
    prop.user !== this.props.user &&
      this.eventHandler() &&
      this.eventHandler2();
  }
  render() {
    return (
      <div>
        <Header event={this.state.type} />
        <div className="inline marginTop">
          {!this.props.user ? (
            <div>
              <p>please log in</p>
            </div>
          ) : !this.props.user.active? (
            <div>
              <p>please verify your account</p>
            </div>
          ):this.state.type !== "challenged" &&
            this.state.type !== "private" &&
            this.state.type !== "inspector" ? (
            <p>you have no access to this challenge</p>
          ) : (
            <div className="inline info">
              <EventInfo
                event={this.state}
                unLock={this.unLock}
                complete={this.complete}
                handleImgChange={this.handleImgChange}
                actualValue={this.actualValue}
                askInspect={this.askInspect}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
export const Events = connect(store => ({ user: store.user }))(_Events);
