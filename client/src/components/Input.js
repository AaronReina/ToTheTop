import React, { Component } from "react";
import styled from "@emotion/styled";

const Inputs = styled.input`
  background: #f5f5f5;
  border-radius: 3px;
  border: none;
  padding: 13px 10px;
  width: 80%;
  margin-top: 20px;
  margin-bottom: 20px;
  box-shadow: inset 0px 2px 3px rgba(0, 0, 0, 0.1);
  clear: both;
  &:hover {
    background: #fff;
    box-shadow: 0px 0px 0px 3px #fff38e, inset 0px 2px 3px rgba(0, 0, 0, 0.2),
      0px 5px 5px rgba(0, 0, 0, 0.15);
    outline: none;
  }
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 5%;
`;

class Input extends Component {
  render() {
    return (
      <Block>
        
        <label >{this.props.text}</label>
        <Inputs
        value={this.props.value}
          onChange={this.props.onChange}
          placeholder={this.props.placeholder}
          type={this.props.type}
          list={this.props.list}
        />
      </Block>
    );
  }
}
export default Input;
