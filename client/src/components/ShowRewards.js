import React, { Component } from "react";

class ShowRewards extends Component {
  render() {
    return (
      <div>
          {this.props.userdata.map((e, index) => (
            <div key={index}>
              <p>
                {e.name} 
              </p>
            </div>
          ))}
          <button className={this.props.className} onClick={this.props.onClick}>Delete Rewards</button>
        </div>
     
    );
  }
}
export default ShowRewards;