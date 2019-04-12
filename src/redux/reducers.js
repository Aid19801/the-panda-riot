import { combineReducers } from 'redux';
import appStateReducer from './app-state-reducer';

const RootReducer = combineReducers({
    appState: appStateReducer,
})

export default RootReducer;