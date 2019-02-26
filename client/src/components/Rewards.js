import React, { Component } from "react";

class Rewards extends Component {
  animation = e => {
    this.props.complete(e);
document.getElementById(this.props.cont).className="respBox spin"
  };

  render() {
    const { e, event, unLock, cont } = this.props;
    return (
      <React.Fragment>
        <div>
          {e.surprise ? (
            <div>
              <div>{`Goal:   ${e.goal}`}</div>
              <div >
                <div className="view view-second">
                  <div id={cont} className={`respBox `}>
                    <img
                      className="imgFit"
                      alt="img"
                      src="https://res.cloudinary.com/aaronreina/image/upload/v1549059861/ToTheTop/locked.png"
                    />
                  </div>

                  <div className="mask" />
                  <div className="content">
                    <h2>{e.text}</h2>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div>{e.name}</div>
              <div className="respBox">
                <img className="imgFit" alt="img" src={e.imgPath} />
              </div>
            </div>
          )}
          {e.done ? (
            <button>COMPLETE</button>
          ) : e.locked ? (
            event.type === "private" ? (
              <button onClick={_ => this.animation(e._id)}>Take It!!!</button>
            ) : event.type === "challenged" ? (
              <button>Blocked!!</button>
            ) : (
              event.type === "inspector" && (
                <button onClick={_ => unLock(e._id)}>Click to Unlock</button>
              )
            )
          ) : event.type === "challenged" ? (
            <button onClick={_ => this.animation(e._id)}>Take It!!!</button>
          ) : (
            event.type === "inspector" && <button>Unlocked!!</button>
          )}
        </div>
      </React.Fragment>
    );
  }
}
export default Rewards;
