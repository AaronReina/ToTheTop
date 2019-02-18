import React, { Component } from "react"

class ListAccept extends Component {
  render() {
    return (
              <div>
                <h3>{this.props.type}</h3>
                <div>
                  {this.props.userdata.map((e, index) => (
                    <div key={index}>
                      <p>
                        Name {e.name} 
                        <button value={e.id}  onClick={this.props.onClick}>
                          Accept
                        </button>
                        <button value={e.id}  onClick={this.props.onClick2}>
                          Reject
                        </button>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
  }

export default ListAccept;
