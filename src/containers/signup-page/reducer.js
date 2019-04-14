import * as actions from './constants';

const initialState = {
    isLoading: false,
    progressBarStatus: false,
    error: null,
}

/* eslint-disable */
const signupPageReducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.SIGNUP_PAGE_LOADING:
        return {
            ...state,
            isLoading: true,
        }
        break;

        case actions.SIGNUP_PAGE_LOADED:
        return {
            ...state,
            isLoading: false,
        }
        break;

        case actions.SIGNUP_PAGE_FAILED:
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

export default signupPageReducer;