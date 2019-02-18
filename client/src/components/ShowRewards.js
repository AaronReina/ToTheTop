import React, { Component } from "react";

class ShowRewards extends Component {
  render() {
    return (
      <div>
        <h3>Inspectors</h3>
          {this.props.userdata.map((e, index) => (
            <div key={index}>
              <p>
                {e.name} 
              </p>
            </div>
          ))}
          <button onClick={this.props.onClick}>Delete Rewards</button>
        </div>
     
    );
  }
}
export default ShowRewards;