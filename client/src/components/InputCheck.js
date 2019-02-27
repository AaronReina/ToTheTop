import React, { Component } from "react";
import styled from "@emotion/styled";

const Inputs = styled.input`

`;

const Block = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 5%;
`;

class InputCheck extends Component {
  render() {
    return (
      <Block>
        <label htmlFor={this.props.id}>{this.props.text}</label>
        <Inputs
        id={this.props.id}
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
export default InputCheck;
