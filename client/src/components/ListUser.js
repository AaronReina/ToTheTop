import React, { Component } from "react";
import { Link } from "react-router-dom";

class ListUser extends Component {
  render() {
    return (
      <div>
        <h3>{this.props.type}</h3>
        <div>
          {this.props.userdata.map((e, index) => (
              <Link key={index} to={`/event/${e.id}`}>{e.name}</Link>
          ))}
        </div>
      </div>
    );
  }
}
export default ListUser;
