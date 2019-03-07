import React, { Component } from "react";
import Input from "../Input";
import { AuthAPI } from "../../lib/auth";
import { connect } from "react-redux";
import { login } from "../../lib/redux/actions";
import { Header } from "../Header";
import Buttonn from "../Buttonn";

export class _Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      imgPath:
        "https://res.cloudinary.com/aaronreina/image/upload/v1549059861/ToTheTop/userDefault.png",
      name: "",
      error:""
    };
  }
  handleImgChange = e => {
    const name = this.state.name;
    let file = new FormData();
    file.set("name", name);
    file.append("photo", e.target.files[0], name);
    AuthAPI.upload(file).then(({ data }) => {
      this.setState({ imgPath: data.url });
    });
  };
  handleImgChange = e => {
    const name = this.username;
    let file = new FormData();
    file.set("name", name);
    file.append("photo", e.target.files[0], name);
    AuthAPI.upload(file).then(({ data }) => {
      let statenow = this.state;
      statenow.imgPath = data.url;
      console.log(data.url);
      this.setState({ state: statenow });
    });
  };

  handleSubmit() {
    console.log("ha entrado")
    const { email, password, name, imgPath } = this.state;
    const { dispatch } = this.props;

    if(email=== ""|| password=== ""|| name===""){
      this.setState({ error: "Please complete all the fields" });
    }

    else(
    AuthAPI.signup(email, password, name, imgPath)
      .then(user => {
        console.log("ha salido")
        dispatch(login(user));
        this.props.history.push("/");
      }))
      .catch(e => console.log("catch de handlesubmit" + e));
  }

  handleEmail(e) {
    this.setState({ email: e.target.value ,error:"" });
  }
  handlePass(e) {
    this.setState({ password: e.target.value ,error:"" });
  }
  handleName(e) {
    this.setState({ name: e.target.value ,error:"" });
  }
  render() {
    return (
      <div>
        <Header />
        <div className="marginTop">
          <div className="respBox">
          <div className="imgBox">
            <img className="imgFit" alt="img" src={this.state.imgPath} />
            </div>
          </div>
          <Input
            type="file"
            onChange={e => this.handleImgChange(e)}
            name="name"
          />
          <Input text="Email" onChange={e => this.handleEmail(e)} />
          <Input text="Name" onChange={e => this.handleName(e)} />
          <Input type="Password" text="Password" onChange={e => this.handlePass(e)} />
          <div className="main"> <p className="error">{this.state.error}</p></div>
          <div className="info">
          <Buttonn className="btnbig mainColor" onClick={() => this.handleSubmit()} info={"Lets Go!"} />
        </div>
        </div>
      </div>
    );
  }
}

export const Signup = connect(store => ({ user: store.user }))(_Signup);
