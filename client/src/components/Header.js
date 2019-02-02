import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { AuthAPI } from "../lib/auth";
import { logout } from "../lib/redux/actions";

const Head = styled.div`
  position: static;
  background-color: blue;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height:15vh;
`;

const Logo = styled.img`
 height:10vh;
`;

  const StyledLink = styled(Link)`
  text-decoration: none;
  margin-right: 10px;
    color:white;
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
          <div >
            <Logo
              src="https://res.cloudinary.com/aaronreina/image/upload/v1548872586/ToTheTop/tothetopwhite.png"
              alt="logo"
            />
          </div>
        </Link>

        {this.props.user ? (
          <div>
            <button onClick={() => this.handleLogout()}>Logout</button>
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
export const Header = connect(store => store)(_Header);

