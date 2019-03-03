import React, { Component } from "react";

class Rewards extends Component {
  animation = (e, surprise) => {
    
   if(surprise=== true) {document.getElementById(this.props.cont).className="respBox spin"
   setTimeout(()=>this.props.complete(e), 2000);
  }
  else{
    this.props.complete(e)
  }

  };

  render() {
    const { e, event, unLock, cont } = this.props;
    return (
      <React.Fragment>
        <div className="block">
          {e.surprise ? (
            <div>
              <h4>{`Goal:   ${e.goal}`}</h4>
              <div >
                <div className="view view-second">
                  <div id={cont} className={`respBox `}>
                    <img
                      className="imgFit"
                      alt="img"
                      src="https://res.cloudinary.com/aaronreina/image/upload/v1551380547/ToTheTop/locked.png"
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
            <button className="btn complete" disabled>COMPLETE!!</button>
          ) : e.locked ? (
            event.type === "private" ? (
              <button className="btn green" onClick={_ => this.animation(e._id, e.surprise)}>Take It!!!</button>
            ) : event.type === "challenged" ? (
              <button className="btn locked" disabled>Locked!!</button>
            ) : (
              event.type === "inspector" && (
                <button className="btn orange" onClick={_ => unLock(e._id)}>Click to Unlock</button>
              )
            )
          ) : event.type === "challenged" ? (
            <button className="btn green" onClick={_ => this.animation(e._id, e.surprise)}>Take It!!!</button>
          ) : (
            event.type === "inspector" && <button className="btn unlocked" disabled>Unlocked!!</button>
          )}
        </div>
      </React.Fragment>
    );
  }
}
export default Rewards;
