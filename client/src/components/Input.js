import React, { Component } from "react";

class Input extends Component {
  render() {
    return (
      <div>
        <label className={this.props.className}>{this.props.text}</label>
        <input
          onChange={this.props.onChange}
          placeholder={this.props.placeholder}
          type={this.props.type}
        />
      </div>
    );
  }
}
export default Input;
