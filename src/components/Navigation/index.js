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
// import userIcon from '../../icons/user.svg';
import ProfilePic from '../ProfilePic';

import './styles.scss';

const Navigation = ({ isAdmin, privs, firebase }) => (
  <div className="nav-container">
    <AuthUserContext.Consumer>
      {authUser => {
        return authUser ? <NavigationAuth isAdmin={isAdmin} privs={privs} uid={authUser.uid} firebase={firebase} /> : <NavigationNonAuth />
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
    const cachePic = sessionStorage.getItem('cached-profilePicture');
    if (cachePic) {
      this.setState({ profilePic: cachePic });
    }
    if (!cachePic) {
      const newPic = this.fetchProfilePicFromFirebase();
      this.setState({ profilePic: newPic });
    }
  }

  fetchProfilePicFromFirebase = () => {
    const { uid } = this.props;
    this.props.firebase.user(uid)
      .on('value', snapshot => {
          
          let profilePic = '';

          const me = snapshot.val();
          
          me && !me.profilePicture ? profilePic = '' : profilePic = me.profilePicture;
          me && me.profilePicture && sessionStorage.setItem('cached-profilePicture', me.profilePicture);
          
          this.setState({
            profilePic: profilePic,
          })
      }) 
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
                  <ProfilePic srcProp={profilePic && profilePic !== '' ? profilePic : require('../../icons/user.svg')} />
                </div>
                { popOut && (
                  <div className="nav__my-acc__popout" onClick={this.handleClick}>
                    <Link to={ROUTES.ACCOUNT}>My Account</Link>
                    <Link to={`/user?id=${uid}`}>My Profile</Link>
                { this.props.privs && 
                  (
                    <div 
                      onClick={() => window.open('https://des-lynham.prismic.io/documents/working~l=en-gb/')}
                      className="nav__admin-option"
                    >Write Blog</div>

                    )}
                      <SignOutButton />

                  </div>
                ) }
              </div>
            
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
