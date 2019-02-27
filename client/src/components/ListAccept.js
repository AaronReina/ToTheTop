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
                         {e.name} {e.email}
                        <button value={e.id?e.id:e._id} name={e.name} className={`btn ${this.props.color1}` } onClick={(e)=>this.props.onClick(e)}>
                          {this.props.option1}
                        </button>
                        <button value={e.id?e.id:e._id} name={e.name} className={`btn ${this.props.color2}`} onClick={(e)=>this.props.onClick2(e)}>
                          {this.props.option2}
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
