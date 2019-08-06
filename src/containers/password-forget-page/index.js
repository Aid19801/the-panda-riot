import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import withProgressBar from '../../components/ProgressBar/with-progressBar';
import { withFirebase } from '../../components/Firebase';
import * as ROUTES from '../../constants/routes';
import * as actions from './constants';

import './styles.scss';
import { analyticsPage, analyticsEvent } from '../../lib/utils';
import InputWithTag from '../../components/InputWithTag';
const PasswordForgetPage = () => (
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentWillMount() {
    analyticsPage('pw-forget');
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
    const { email } = this.state;
    analyticsEvent(`pw-forget-${email}`);
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentWillReceiveProps = nextProps => {
    this.setState({ email: nextProps.email });
  }

  render() {
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <form className="email-me-form" onSubmit={this.onSubmit}>

        <InputWithTag
          tagline="email"
          name="email"
          onChange={this.onChange}
          disabled={true}
          placeholder={this.state.email}
        />

        <button disabled={isInvalid} type="submit">
          Email Me A Password Re-set
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

const mapStateToProps = state => ({
  isLoading: state.passwordForgetPage.isLoading,
  email: state.accountPage.email,
})

const mapDispatchToProps = dispatch => ({
  pageLoading: () => dispatch({ type: actions.PW_FORGET_PAGE_LOADING }),
  pageLoaded: () => dispatch({ type: actions.PW_FORGET_PAGE_LOADED }),
})


const PasswordForgetForm = compose(
  withFirebase,
  withProgressBar,
  connect(mapStateToProps, mapDispatchToProps),
)(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };