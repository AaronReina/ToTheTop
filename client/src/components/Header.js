import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { AuthAPI } from "../lib/auth";
import { logout } from "../lib/redux/actions";
const Head = styled.div`
  position: static;
  background-color: ${props => props.color};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 12vh;
  padding: 0 5%;
`;

const Logo = styled.img`
  height: 10vh;
  margin-top: 30%;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  margin-right: 10px;
  color: white;
`;

class _Header extends Component {
  handleLogout() {
    const { dispatch } = this.props;
    AuthAPI.logout()
      .then(user => {
        dispatch(logout(user));
      })
      .catch(e => e);
  }

  render() {
    let color;
    this.props.event === "challenged"
      ? (color = "purple")
      : this.props.event === "inspector"
      ? (color = "red")
      : this.props.event === "private"
      ? (color = "black")
      : this.props.user
      ? (color = "blue")
      : (color = "rgb(231, 218, 215)");
    return (
      <Head color={color}>
        <Link to="/">
          <div>
            <Logo
              src="https://res.cloudinary.com/aaronreina/image/upload/v1548872586/ToTheTop/tothetopwhite.png"
              alt="logo"
            />
          </div>
        </Link>

        {this.props.user ? (
          <div>
            <StyledLink onClick={() => this.handleLogout()} to="/">
              Logout
            </StyledLink>
          </div>
        ) : (
          <div>
            <StyledLink to="/auth/login">Loggin</StyledLink>
            <StyledLink to="/auth/signup">Signup </StyledLink>
          </div>
        )}
      </Head>
    );
  }
}
export const Header = connect(store => ({ user: store.user }))(_Header);
