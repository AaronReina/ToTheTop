import React, { Component } from "react";
import { Link } from "react-router-dom";

class ListUser extends Component {
  render() {
    return (
      <div className="main">
        <h3>{this.props.type}</h3>
        <ul>
          {this.props.userdata.map((e, index) => (
              <li key={index}><Link style={{ textDecoration: 'none' , color:"#242582"}} to={`/event/${e.id}`}>{e.name}</Link></li>
          ))}
        </ul>
      </div>
    );
  }
}
export default ListUser;
