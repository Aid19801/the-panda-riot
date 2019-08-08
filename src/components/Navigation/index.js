import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { withFirebase } from '../Firebase/index'

import ProfilePic from '../ProfilePic';

import './styles.scss';

const Navigation = ({ isAdmin, privs, uid }) => (
  <div className="nav-container">
    <AuthUserContext.Consumer>
      {authUser => {
        // console.log('auuuth user: ', authUser.uid)
        return authUser ? <NavigationAuth isAdmin={isAdmin} privs={privs} uid={authUser.uid} /> : <NavigationNonAuth />
      }
      }
    </AuthUserContext.Consumer>
  </div>
);

class NavigationAuth extends Component {

  constructor() {
    super();
    this.state = {
      profilePic: null,
      popOut: false,
    }
  }

  componentWillMount = () => {
    let profilePic = sessionStorage.getItem('cached-profilePicture');
    if (profilePic) {
      this.setState({ profilePic });
    }
    
  }

  handleClick = () => {
    this.setState({ popOut: !this.state.popOut });
  }

  render() {
    
    const { uid } = this.props;
    const { popOut, profilePic } = this.state;
    
    return (
        <Navbar bg="dark" expand="lg">
        
          <Navbar.Brand><Link to={ROUTES.LANDING}>The Panda Riot</Link></Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <div className="div__flex-row">
                <div className="nav-option-wrapper">
                  <Link to={ROUTES.HOME}>Home</Link>
                </div>

                <div className="nav-option-wrapper">
                  <Link to={ROUTES.DATAMAP}>Gigs</Link>
                </div>


                <div className="nav-option-wrapper">
                  <Link to={ROUTES.ACTS}>Acts</Link>
                </div>

                <div className="nav-option-wrapper">
                  <Link to={ROUTES.CHAT}>Chat</Link>
                </div>
              </div>

              <div className="nav-option-wrapper nav__prof-pic-container">

                <div className="nav__prof-pic" onClick={this.handleClick}>  
                  <ProfilePic srcProp={profilePic ? profilePic : require('../../containers/account-page/user.svg')} />
                </div>
                { popOut && (
                  <div className="nav__my-acc__popout" onClick={this.handleClick}>
                    <Link to={ROUTES.ACCOUNT}>My Account</Link>
                    <Link to={`/user?id=${uid}`}>My Profile</Link>

                      <SignOutButton />

                  </div>
                ) }
              </div>
              
              { this.props.privs && (
                  <div onClick={() => window.open('https://des-lynham.prismic.io/documents/working~l=en-gb/')}className="nav-option-wrapper orange">
                    <p>Write Blog</p>
                  </div>
                )
              }

            </Nav>
          </Navbar.Collapse>

      </Navbar>
    );
  }
}

class NavigationNonAuth extends Component {
  render() {
    return (
        <Navbar bg="dark" expand="lg">
        <Navbar.Brand href="#home">The Panda Riot</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <div className="nav-option-wrapper">
              <Link to={ROUTES.LANDING}>Landing</Link>
            </div>
            <div className="nav-option-wrapper">
              <Link to={ROUTES.SIGN_IN}>Sign In</Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  privs: state.appState.privs,
  uid: state.accountPage.uid,
})

export default compose(
  withFirebase,
  connect(mapStateToProps, null),
)(Navigation)
