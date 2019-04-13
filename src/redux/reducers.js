import { combineReducers } from 'redux';
import appStateReducer from '../components/App/reducer';
import aboutPageReducer from '../containers/about-page/reducer';
import passwordChangeFormReducer from '../containers/account-page/pw-change-reducer';
import passwordForgetPageReducer from '../containers/password-forget-page/reducer';
import signinPageReducer from '../containers/signin-page/reducer';
import signupPageReducer from '../containers/signup-page/reducer';

const RootReducer = combineReducers({
    appState: appStateReducer,
    aboutPage: aboutPageReducer,
    passwordForgetPage: passwordForgetPageReducer,
    passwordChangeForm: passwordChangeFormReducer,
    signinPage: signinPageReducer,
    signupPage: signupPageReducer,
})

export default RootReducer;