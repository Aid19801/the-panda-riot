import { combineReducers } from 'redux';
import appStateReducer from '../components/App/reducer';
import aboutPageReducer from '../containers/about-page/reducer';

const RootReducer = combineReducers({
    appState: appStateReducer,
    aboutPage: aboutPageReducer,
})

export default RootReducer;