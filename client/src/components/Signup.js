import React, { Component } from "react";
import Input from "./Input";
import { AuthAPI } from "../lib/auth";
import { connect } from "react-redux";
import { login } from "../lib/redux/actions";
import { Header } from "./Header";

export class _Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      nik: ""
    };
  }
  handleImgChange = e => {
    const name = this.username;
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

  handleSubmit() {
    const { username, password, nik } = this.state;
    const { dispatch } = this.props;
    AuthAPI.signup(username, password, nik)
      .then(user => {
        dispatch(login(user));
      })
      .catch(e => console.log("catch de handlesubmit" + e));
  }

  handleName(e) {
    this.setState({ username: e.target.value });
  }
  handlePass(e) {
    this.setState({ password: e.target.value });
  }
  handlenik(e) {
    this.setState({ nik: e.target.value });
  }

  render() {
    return (
        <div>
            <Header/>
      <div>
        <Input text="Nombre" onChange={e => this.handleName(e)} />
        <Input text="Password" onChange={e => this.handlePass(e)} />
        <Input text="nik" onChange={e => this.handlenik(e)} />
        <form>
              <input
                type="file"
                onChange={e => this.handleImgChange(e)}
                name="name"
              />
              <button onClick={e => this.handleUpload(e)}>SUBIR</button>
            </form>
        <button onClick={() => this.handleSubmit()}>Registrate</button>
      </div>
      </div>
    );
  }
}

export const Signup = connect(store => store)(_Signup);
