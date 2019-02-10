import React, { Component } from "react";
import styled from "@emotion/styled";

// const divStyle = styled.div`
//   margin-top: 20px;
//   margin-left: 30%;
//   padding: 16px 0;
//   width: 40%;
//   color: white;
//   font-size: 14px;
//   border-radius: 4px;
//   background-color: rgb(231, 218, 215);
//   letter-spacing: 1px;
//   text-align: center;
//   text-decoration: none;
//   display: inline-block;
// `;

class EventInfo extends Component {
  render() {
    return (
      <div>
           <div>
          <div>
<h1>Final objective</h1>
<h3>{this.props.event.objective}</h3>
          </div>
          <div>
<h1>Actual Progress</h1>
<h3>{this.props.event.actualValue}</h3>
          </div>
          </div>
          <div>
          <div>
<h2>Challenged </h2>
<h3>{this.props.event.challenged}</h3>
</div>
          <div>
<h2>Inspectors </h2>
<h3>persona</h3>
          </div>
          </div>

      </div>
    );
  }
}
export default EventInfo;

