import React, { Component } from "react";

class ShowUsers extends Component {
  render() {
    return (
      <div>
        <h3>Challenged</h3>
        <p>{this.props.userdata.challenged}</p>
        <div>
        <h3>Inspectors</h3>
          {this.props.userdata.inspectors.map((e, index) => (
            <div key={index}>
              <p>
                {e} 
              </p>
            </div>
          ))}
          <button className={this.props.className} onClick={this.props.onClick}>Delete selection</button>
        </div>
      </div>
    );
  }
}
export default ShowUsers;
