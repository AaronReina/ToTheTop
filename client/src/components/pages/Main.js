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
  @media only screen and (min-width: 601px) {
    height: 50vh;
  }

  @media only screen and (max-width: 600px) {
    height: 30vh;
  }
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
  color: grey;
  @media only screen and (min-width: 601px) {
    padding: 5% 10%;
  }

  @media only screen and (max-width: 600px) {
   
    padding: 20% 10%;
  }
`;

const NewChaBox = styled.div`
  margin:10% 5%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;
const ListEvents = styled.div`
  margin-top: 5%;
  @media only screen and (min-width: 601px) {
    width: 33%;
  }

  @media only screen and (max-width: 600px) {
    width: 80%;
  }
`;



class _Main extends Component {
  acceptEvent(e) {
    const { user, dispatch } = this.props;
    axios
    .post(
      process.env.NODE_ENV === "production"
        ? `/events/accept/${e.target.value}`
        : `http://localhost:3000/events/accept/${e.target.value}`
    , { user })
      .then(res => dispatch({ type: "LOGIN", user: res.data }))
      .catch(err => console.log(err));
  }
  rejectEvent(e) {
    const { user, dispatch } = this.props;
    axios
    .post(
      process.env.NODE_ENV === "production"
        ? `/events/accept/${e.target.value}`
        : `http://localhost:3000/events/reject/${e.target.value}`
    , { user })
      .then(res => dispatch({ type: "LOGIN", user: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <Header />
        {user ? (
          <div >
            <div className="respBox">
              <img className="imgFit" src={user.imgPath} alt="User " />
            </div>
            <div className="respBox">
              <div className="info">
                <div>
                  <h1>{user.name} Events Panel</h1>
                </div>
                <div>
                  <Link className="btn blue" to="/Create">
                    Create new event
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <NewChaBox>
               {user.privated.length >0  && <ListEvents>
                  <ListUser
                    type="Your Private events"
                    userdata={user.privated}
                  />
                </ListEvents>}
                {user.challenged.length >0 &&<ListEvents>
                  <ListUser type="Your Challenges" userdata={user.challenged} />
                </ListEvents>}
                {user.inspectors.length >0 &&
                <ListEvents>
                  <ListUser
                    type="Your Controlled events"
                    userdata={user.inspectors}
                  />
                </ListEvents>}
                {user.invitationCha.length >0 &&
                <ListEvents>
                  <ListAccept
                    type="You have been challenged"
                    userdata={user.invitationCha}
                    onClick={e => this.acceptEvent(e)}
                    onClick2={e => this.rejectEvent(e)}
                  />
                </ListEvents>}
              {user.invitationIns.length >0 &&
                <ListEvents>
                  <ListAccept
                    type="Want yo inspect this?"
                    userdata={user.invitationIns}
                    onClick={e => this.acceptEvent(e)}
                    onClick2={e => this.rejectEvent(e)}
                  />
                </ListEvents>}
              </NewChaBox>
            </div>
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

