import React, { Component } from "react";

class Buttonn extends Component {
  render() {
    return (
      <button className={this.props.className} onClick={this.props.onClick} type="button">
        {this.props.info}
      </button>
    );
  }
}
export default Buttonn;
