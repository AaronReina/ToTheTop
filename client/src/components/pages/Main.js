import React, { Component } from "react";
import { connect } from "react-redux";
import { Header } from "../Header";
import styled from "@emotion/styled";
import ListUser from "../ListUser";
import { Link } from "react-router-dom";
import ListAccept from "../ListAccept";
import axios from "axios";

const Backgroundphoto = styled.div`
  width: 100%;
  background-image: url("https://res.cloudinary.com/aaronreina/image/upload/v1549308112/ToTheTop/ToTheTop_never_give_up-c_scale_e_art_incognito_h_425_w_1080.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
  text-align: center;
  color: white;
  width: 100%;
  height: 30vh;
`;
const Title = styled.h1`
  display: inline-block;
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Text = styled.div`
  text-align: center;
  color: rgb(231, 218, 215);
  padding: 0 10%;
`;

class _Main extends Component {

  acceptEvent(e) {
    const { user, dispatch } = this.props;
    axios
      .post(`http://localhost:3000/events/accept/${e.target.value}`, { user })
      .then(res => dispatch({ type: "LOGIN", user: res.data }))
      .catch(err => console.log(err));
  }
  rejectEvent(e) {
    const { user, dispatch } = this.props;
    axios
      .post(`http://localhost:3000/events/reject/${e.target.value}`, { user })
      .then(res => dispatch({ type: "LOGIN", user: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <Header />
        {user ? (
          <div>
            <Link to="/Create">Create</Link>
            <ListUser type="Privates" userdata={user.privated} />
            <ListUser type="Challenges" userdata={user.challenged} />
            <ListUser type="To Control" userdata={user.inspectors} />
            <ListAccept
              type="Accept challenges"
              userdata={user.invitationCha}
              onClick={e => this.acceptEvent(e)}
              onClick2={e => this.rejectEvent(e)}
            />
            <ListAccept
              type="Accept inspectors"
              userdata={user.invitationIns}
              onClick={e => this.acceptEvent(e)}
              onClick2={e => this.rejectEvent(e)}
            />
          </div>
        ) : (
          <div>
            <Backgroundphoto>
              <Title>Never Give Up</Title>
            </Backgroundphoto>

            <Text>
              <h3>
                All the people have objectives, but being motivated for so long
                is so dificult
              </h3>
              <h3>
                With To The Top you can help yourself and other people to reach
                their objectives, with our step by step rewards sistem.
              </h3>
              <h3>Join Us!!</h3>
            </Text>
          </div>
        )}
      </div>
    );
  }
}

export const Main = connect(store => ({ user: store.user }))(_Main);
