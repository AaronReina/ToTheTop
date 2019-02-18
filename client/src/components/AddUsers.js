import React, { Component } from "react";

class AddUsers extends Component {
  render() {
    return (
      <div>
        <h3>{this.props.type}</h3>
        <div>
          {this.props.userdata.map((e, index) => (
            <div key={e.email}>
              <p>
                Name {e.name} Email {e.email}
                <button value={e._id} name={e.name} onClick={this.props.onClick}>
                  Challenged
                </button>
                <button value={e._id} name={e.name} onClick={this.props.onClick2}>
                  Inspector/s
                </button>
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default AddUsers;
