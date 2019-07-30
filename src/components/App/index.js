import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import ReactGA from 'react-ga';

import Navigation from '../Navigation';

import { ArticlePage, ActsPage, AccountPage, ChatPage, DataMapPage,
  HomePage, LandingPage, SignInPage, SignUpPage,
  PasswordForgetPage, 
  UserProfilePage} from '../../containers';
import * as ROUTES from '../../constants/routes';

import { withAuthentication } from '../Session';
import withPrismicPages from '../Prismic/with-prismic-pages';

import * as actions from './constants';
import './styles.scss';


function initializeReactGA() {
  ReactGA.initialize('UA-143364010-1');
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isAdmin: false,
    }
  }

  
  componentWillMount() {

    if (process.env.NODE_ENV === 'production') {
      console.log('in prod so firing analytics');
      initializeReactGA();
    }
    // console.log('1) IS THE TOKEN HERE ==> ', process.env.REACT_APP_TPR_GIST_TOKEN);

    this.props.appLoading();
    this.props.firebase.auth.onAuthStateChanged((user) => {
      if (user && user.uid === process.env.REACT_APP_PANDA_RIOT_ADMINI) {
        console.log('user id is an admin: ', user.uid);
        this.props.isAdmin();
      } else {
        console.log('ixnay on the adminay');
      }
    })
  }
  
  
  componentDidMount() {
   this.props.appLoaded(); 
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.prismicPage !== this.props.prismicPage) {
      this.props.updateStatePrismicPages(nextProps.prismicPage);
    }
  }

  render() {

    const { privs } = this.props;
    console.log('this props at app index js : ', this.props)
    return (
      <Router>
  
        <div className="app-div">
          <Navigation isAdmin={privs} />
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          
          <Route path={ROUTES.USER_PROFILE} component={UserProfilePage} />
          <Route path={ROUTES.ARTICLE} component={ArticlePage} />

          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
          <Route path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.DATAMAP} component={DataMapPage} />  
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.ACTS} component={ActsPage} />
          <Route path={ROUTES.CHAT} component={ChatPage} />
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
  updateStatePrismicPages: (pages) => dispatch({ type: 'STORE_PAGES_IN_REDUX', pages: pages })
})


export default compose(
  withAuthentication,
  withPrismicPages,
  connect(mapStateToProps, mapDispatchToProps)
)(App);