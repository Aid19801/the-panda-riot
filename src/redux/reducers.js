import { combineReducers } from 'redux';
import appStateReducer from '../components/App/reducer';

import addBlogPageReducer from '../containers/add-blog-page/reducer';
import fetchGigsTonightReducer from '../components/GigsTonightContainer/reducer';
import accountPageReducer from '../containers/account-page/reducer';
import adminPageReducer from '../containers/admin-page/reducer';
import articlePageReducer from '../containers/article-page/reducer';
import chatPageReducer from '../containers/chat-page/reducer';
import dataMapPageReducer from '../containers/data-map-page/reducer';

import homePageReducer from '../containers/homepage/reducer';
import landingPageReducer from '../containers/landing-page/reducer';
import passwordChangeFormReducer from '../containers/account-page/pw-change-reducer';
import passwordForgetPageReducer from '../containers/password-forget-page/reducer';
import signinPageReducer from '../containers/signin-page/reducer';
import signupPageReducer from '../containers/signup-page/reducer';


const RootReducer = combineReducers({
    
    appState: appStateReducer,

    addBlog: addBlogPageReducer,
    accountPage: accountPageReducer,
    articlePage: articlePageReducer,
    adminPage: adminPageReducer,
    fetchGigsTonight: fetchGigsTonightReducer,
    chatPage: chatPageReducer,
    dataMapPage: dataMapPageReducer,
    homePage: homePageReducer,
    landingPage: landingPageReducer,
    passwordForgetPage: passwordForgetPageReducer,
    passwordChangeForm: passwordChangeFormReducer,
    signinPage: signinPageReducer,
    signupPage: signupPageReducer,
})

export default RootReducer;