import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import Navigation from '../Navigation';

import { AdminPage, ArticlePage, AddBlogPage, ArticleDraftPage, ActsPage, AccountPage, ChatPage, DataMapPage,
  HomePage, LandingPage, SignInPage, SignUpPage,
  PasswordForgetPage } from '../../containers';
import * as ROUTES from '../../constants/routes';

import { withAuthentication } from '../Session';
import * as actions from './constants';
import './styles.scss';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isAdmin: false,
    }
  }

  
  componentWillMount() {
    this.props.appLoading();
    this.props.firebase.auth.onAuthStateChanged((user) => {
      if (user && user.uid === process.env.REACT_APP_PANDA_RIOT_ADMINI) {
        // console.log('user id is ', user.uid);
        this.props.isAdmin();
      } else {
        console.log('ixnay');
      }
    })
  }
  
  
  componentDidMount() {
   this.props.appLoaded(); 
  }

  render() {

    const { privs } = this.props;
    return (
      <Router>
  
        <div className="app-div">
          <Navigation isAdmin={privs} />
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          
          <Route path={ROUTES.ARTICLE} component={ArticlePage} />
          <Route path={ROUTES.ADD_BLOG} component={AddBlogPage} />
          <Route path={ROUTES.DRAFT_BLOG} component={ArticleDraftPage} />

          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
          <Route path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.DATAMAP} component={DataMapPage} />  
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.ACTS} component={ActsPage} />
          <Route path={ROUTES.CHAT} component={ChatPage} />
          <Route path={ROUTES.ADMIN} component={AdminPage} />
        </div>
      </Router>
        );
  }

}

const mapStateToProps = state => ({
  isLoading: state.appState.isLoading,
  privs: state.appState.privs,
  error: state.appState.error,
})

const mapDispatchToProps = dispatch => ({
  appLoading: () => dispatch({ type: actions.APP_LOADING }),
  appLoaded: () => dispatch({ type: actions.APP_LOADED }),
  appFailed: () => dispatch({ type: actions.APP_FAILED }),
  isAdmin: () => dispatch({ type: actions.IS_ADMIN, privs: true }),
})


export default compose(
  withAuthentication,
  connect(mapStateToProps, mapDispatchToProps)
)(App);