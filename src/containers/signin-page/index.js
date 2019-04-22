import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../signup-page';
import { withFirebase } from '../../components/Firebase';
import withProgressBar from '../../components/ProgressBar/with-progressBar';
import * as ROUTES from '../../constants/routes';
import * as actions from './constants';
import { PasswordForgetLink } from '../password-forget-page';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

// console.log('withFirebase is ', withFirebase);

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  

  componentWillMount() {
    this.props.showProgressBar(true);
    this.props.pageLoading();
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.showProgressBar(false);
    }, 100) 
    this.props.pageLoaded();
  }
  
  
  onSubmit = event => {
    // console.log('this props. ', this.props);
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then((res) => {
        // console.log('res is ', res);
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;
    // console.log('this props ', this.props);

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.signinPage.isLoading,
})
const mapDispatchToProps = dispatch => ({
  pageLoading: () => dispatch({ type: actions.SIGNIN_PAGE_LOADING }),
  pageLoaded: () => dispatch({ type: actions.SIGNIN_PAGE_LOADED }),
})


const SignInForm = compose(
  withRouter,
  withFirebase,
  withProgressBar,
  connect(mapStateToProps, mapDispatchToProps),
)(SignInFormBase);

const SignInPage = () => (
    <div>
      <h1>SignIn</h1>
      <SignInForm />
      <PasswordForgetLink />
      <SignUpLink />
    </div>
);

export default SignInPage;

export { SignInForm };