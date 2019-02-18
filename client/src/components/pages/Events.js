import React, { Component } from "react";
import { connect } from "react-redux";
import { Header } from "../Header";
import axios from "axios";
import EventInfo from "../EventInfo";

export class _Events extends Component {
  constructor() {
    super();
    this.state = {
      id:"",
      type: "",
      name: "",
      objective: "",
      actualValue: "",
      challenged: "",
      inspectors: [],
      rewards: []
    };
  }
  eventHandler() {
    const { user } = this.props;
    return axios
      .post(`http://localhost:3000/events/type/${this.props.match.params.id}`, {
        user
      })
      .then(res => {
        this.setState({ type: res.data.type });
      })
      .catch(err => console.log(err));
  }

  eventHandler2() {
    return axios
      .post(
        `http://localhost:3000/events/populate/${this.props.match.params.id}`
      )
      .then(res => {
        this.setState({
          id:this.props.match.params.id,
          name: res.data.name,
          objective: res.data.objective,
          challenged: res.data.challenged,
          inspectors: res.data.inspectors,
          rewards: res.data.rewards,
          actualValue: res.data.actualValue
        });
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }
  componentDidMount() {
    this.props.user && this.eventHandler() && this.eventHandler2();
  }
  componentDidUpdate(prop) {
    prop.user !== this.props.user && this.eventHandler()&& this.eventHandler2();
  }
  render() {
    return (
      <div>
        <Header event={this.state.type} />
        <div>
          {!this.props.user ? (
            <div>
              <p>please log in</p>
            </div>
          ) : this.state.type !== "challenged" &&
            this.state.type !== "private" &&
            this.state.type !== "inspector" ? (
            <p>you have no access to this challenge</p>
          ) : (
            <div>
              <EventInfo event={this.state} />
            </div>
          )}
        </div>
      </div>
    );
  }
}
export const Events = connect(store => ({ user: store.user }))(_Events);
