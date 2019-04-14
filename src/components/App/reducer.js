import * as actions from './constants';

const initialState = {
    isLoading: false,
    error: null,
}

/* eslint-disable */
const appStateReducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.APP_LOADING:
        return {
            ...state,
            isLoading: true,
        }
        break;

        case actions.APP_LOADED:
        return {
            ...state,
            isLoading: false,
        }
        break;

        case actions.APP_FAILED:
        return {
            ...state,
            isLoading: false,
            error: action.error,
        }
        break;

        default:
        return state;
    }
}

export default appStateReducer;