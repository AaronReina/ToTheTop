import React, { Component } from "react";
import styled from "@emotion/styled";

const Button = styled.button`
  margin-top: 20px;
  padding: 16px 0;
  width: 40%;
  color: white;
  font-size: 14px;
  border-radius: 4px;
  background-color: #553D67;
  letter-spacing: 1px;
  text-align: center;
  text-decoration: none;
`;

class Buttonn extends Component {
  render() {
    return (
      <Button onClick={this.props.onClick} type="button">
        {this.props.info}
      </Button>
    );
  }
}
export default Buttonn;
