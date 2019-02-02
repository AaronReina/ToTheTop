import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthAPI } from "../lib/auth";
import { logout } from "../lib/redux/actions";
import {Header} from "./Header";

class _Main extends Component {
  handleLogout() {
    const { dispatch } = this.props;
    AuthAPI.logout()
      .then(user => {
        dispatch(logout(user));
      })
      .catch(e => e);
  }

  handleImgChange = e => {
    const name = this.props.user.username;
    let file = new FormData();
    file.set("name", name);
    file.append("photo", e.target.files[0], name);
    let { dispatch } = this.props;
    dispatch({ type: "IMG_UPLOAD", image: file });
  };

  handleUpload = e => {
    e.preventDefault();
    AuthAPI.upload(this.props.image).then(e => console.log( "algo"));
  };

  render() {
    const { user } = this.props;
    return (
      <div>
       
<Header></Header>

{user?  <p>con user</p>:<p>sin user</p>}
</div>
    );
  }
}

export  const Main = connect(store => store)(_Main );
