import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import Navigation from '../Navigation';

import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import AccountPage from '../Account';
import AdminPage from '../Admin';

import { AboutPage, HomePage, LandingPage } from '../../containers';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import * as actions from './constants';
import withProgressBar from '../ProgressBar/with-progressBar';

const App = ({ appLoading, appLoaded, appFailed, error, isLoading }) => {

  
  useEffect(() => {
    appLoading();
  })

  useEffect(() => {
    appLoaded();
  })

  return (
    <Router>

      <div>
        <Navigation />
  
        <hr />
  
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ABOUT} component={AboutPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
      </div>
    </Router>
      );
}

const mapStateToProps = state => ({
  isLoading: state.appState.isLoading,
  error: state.appState.error,
})

const mapDispatchToProps = dispatch => ({
  appLoading: (bool) => dispatch({ type: actions.SET_PROGRESS_BAR, isOpen: bool }),
  appLoading: () => dispatch({ type: actions.APP_LOADING }),
  appLoaded: () => dispatch({ type: actions.APP_LOADED }),
  appFailed: () => dispatch({ type: actions.APP_FAILED }),
})


export default compose(
  withAuthentication,
  connect(mapStateToProps, mapDispatchToProps)
)(App);