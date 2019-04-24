import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { withFirebase } from '../Firebase/index'
import './styles.scss';

const Navigation = (props) => (
  <div className="nav-container">
    <AuthUserContext.Consumer>
      {authUser => 
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

class NavigationAuth extends Component {
  render() {
    // console.log('this props NAV firebase: ', this.props.firebase);
    return (
        <Navbar bg="dark" expand="lg">
        
        <Navbar.Brand><Link to={ROUTES.LANDING}>The Panda Riot</Link></Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <div className="nav-option-wrapper">
              <Link to={ROUTES.HOME}>Home</Link>
            </div>

            <div className="nav-option-wrapper">
              <Link to={ROUTES.DATAMAP}>Gigs</Link>
            </div>

            <div className="nav-option-wrapper">
              <Link to={ROUTES.ACCOUNT}>Me</Link>
            </div>

            <div className="nav-option-wrapper">
              <Link to={ROUTES.ACTS}>Acts</Link>
            </div>

            { 
              <div className="nav-option-wrapper">
                <Link to={ROUTES.ADMIN}>Admin</Link>
              </div>

             }
            <div className="nav-option-wrapper">
              <SignOutButton />
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
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}


export default withFirebase(Navigation);