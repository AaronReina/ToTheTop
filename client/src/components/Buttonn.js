import React, { Component } from "react";
import styled from "@emotion/styled";

const Button = styled.button`
  margin-top: 20px;
  margin-left: 30%;
  padding: 16px 0;
  width: 40%;
  color: white;
  font-size: 14px;
  border-radius: 4px;
  background-color: rgb(231, 218, 215);
  letter-spacing: 1px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
`;

class Buttonn extends Component {
  render() {
    return (
        <Button
          onClick={this.props.onClick}
          type="button"
        >
          {this.props.info}
        </Button>
    );
  }
}
export default Buttonn;

