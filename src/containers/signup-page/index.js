import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../../components/Firebase';
import { PageTitle } from '../../components/';
import withProgressBar from '../../components/ProgressBar/with-progressBar';
import * as ROUTES from '../../constants/routes';
import * as actions from './constants';

import './styles.scss';
import { analyticsPage, analyticsEvent } from '../../lib/utils';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
}


class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
    }
  }

  componentWillMount() {
    analyticsPage('signup-page');
    this.props.showProgressBar(true);
    this.props.pageLoading();
  }

  componentDidMount() {
    analyticsEvent('signup page loaded');
    setTimeout(() => {
      this.props.showProgressBar(false);
    }, 100) 
    this.props.pageLoaded();
  }


  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
    analyticsEvent(`user is registering: ${email}`);

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
          })
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        analyticsEvent(`user regd success: ${email}`);
        this.props.history.push(ROUTES.ACCOUNT);
      })
      .catch(error => {
        analyticsEvent(`user regd FAIL: ${email}`);
        this.setState({ error });
      });

    
    event.preventDefault();
  }

  onChange = event => {
    analyticsEvent(`user is entering ${event.target.name}`);
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {

    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form className="form__stackable-form" onSubmit={this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />

        <button className="btn__orange" disabled={isInvalid} type="submit">
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.signupPage.isLoading,
})
const mapDispatchToProps = dispatch => ({
  pageLoading: () => dispatch({ type: actions.SIGNUP_PAGE_LOADING }),
  pageLoaded: () => dispatch({ type: actions.SIGNUP_PAGE_LOADED }),
})


const SignUpForm = compose(
  withRouter,
  withFirebase,
  withProgressBar,
  connect(mapStateToProps, mapDispatchToProps),
)(SignUpFormBase);

const SignUpPage = () => (
  <div className="div__page-container">
    <PageTitle text="Sign Up" />
    <SignUpForm />
  </div>
);

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

export default SignUpPage;

export { SignUpForm, SignUpLink };