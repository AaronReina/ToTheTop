import React, { Component } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const LinkButton = styled(Link)`
  margin-top: 20px;
  margin-left: 30%;
  padding: 16px 0;
  width:40%;
  color: white;
  font-size: 14px;
  border-radius:4px;
  background-color: rgb(231, 218, 215);
  letter-spacing: 1px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
`;

class ButtonRedirect extends Component {
  render() {
    return (
      <LinkButton
        onClick={this.props.onClick}
        to={this.props.redirect}
        type="button"
      >
        {this.props.info}
      </LinkButton>
    );
  }
}
export default ButtonRedirect;
