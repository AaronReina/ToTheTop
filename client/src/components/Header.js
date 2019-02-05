import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { AuthAPI } from "../lib/auth";
import { logout } from "../lib/redux/actions";
const Head = styled.div`
  position: static;
  background-color: rgb(231, 218, 215);
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
    return (
      <Head>
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
              <StyledLink onClick={() => this.handleLogout()} to="/">Logout</StyledLink>
          </div>
        ) : (
          <div>
            <StyledLink  to="/auth/login">Loggin</StyledLink>
            <StyledLink to="/auth/signup">Signup </StyledLink>
          </div>
        )}
      </Head>
    );
  }
}
export const Header = connect(store => store)(_Header);
