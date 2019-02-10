import React, { Component } from "react";
import Input from "../Input";
import { AuthAPI } from "../../lib/auth";
import { connect } from "react-redux";
import { login } from "../../lib/redux/actions";
import { Header } from "../Header";
import  Buttonn  from "../Buttonn";

export class _Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      name: ""
    };
  }
//   handleImgChange = e => {
//     const name = this.username;
//     let file = new FormData();
//     file.set("name", name);
//     file.append("photo", e.target.files[0], name);
//     let { dispatch } = this.props;
//     dispatch({ type: "IMG_UPLOAD", image: file });
//   };

//   handleUpload = e => {
//     e.preventDefault();
//     AuthAPI.upload(this.props.image).then(e => console.log(this.props.image));
//   };

  handleSubmit() {
    const { email, password, name } = this.state;
    const { dispatch } = this.props;
    AuthAPI.signup(email, password, name)
      .then(user => {
        dispatch(login(user));
        this.props.history.push("/")
      })
      .catch(e => console.log("catch de handlesubmit" + e));
  }

  handleEmail(e) {
    this.setState({ email: e.target.value });
  }
  handlePass(e) {
    this.setState({ password: e.target.value });
  }
  handleName(e) {
    this.setState({ name: e.target.value });
  }

  render() {
    return (
      <div>
        <Header />
        <div>
          <Input text="Email" onChange={e => this.handleEmail(e)} />
          <Input text="Password" onChange={e => this.handlePass(e)} />
          <Input text="Name" onChange={e => this.handleName(e)} />
          {/* <form>
            <input
              type="file"
              onChange={e => this.handleImgChange(e)}
              name="name"
            />
            <button onClick={e => this.handleUpload(e)}>SUBIR</button>
          </form> */}
          <Buttonn onClick={() => this.handleSubmit()} info={"Lets Go!"}/>
        </div>
      </div>
    );
  }
}

export const Signup = connect(store => ({user:store.user}))(_Signup);
