import React, { Component } from "react"

class ListAccept extends Component {
  render() {
    return (
              <div>
                <h3>{this.props.type}</h3>
                <div>
                  {this.props.userdata.map((e, index) => (
                    <div className="confirmBox" key={index}>
                      <p>
                         {e.name} 
                        <button value={e.id} className="btn green"  onClick={(e)=>this.props.onClick(e)}>
                          Accept
                        </button>
                        <button value={e.id} className="btn red"  onClick={(e)=>this.props.onClick2(e)}>
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
