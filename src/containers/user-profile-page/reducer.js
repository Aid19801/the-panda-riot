import * as actions from './constants';

const initialState = {
    isLoading: false,
    user: {},
    error: null,
}

/* eslint-disable */
const userProfileReducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.USER_PROFILE_LOADING:
        return {
            ...state,
            isLoading: true,
        }
        break;

        case actions.USER_PROFILE_LOADED:
        return {
            ...state,
            isLoading: false,
        }
        break;

        case actions.FETCH_USER:
        return {
            ...state,
            isLoading: true,
        }
        break;

        case actions.FETCH_USER_SUCCESS:
        return {
            ...state,
            user: action.user,
            isLoading: false,
        }
        break;

        case actions.FETCH_USER_FAIL:
        return {
            ...state,
            error: action.error,
            isLoading: false,
        }
        break;

        default:
        return state;
    }
}

export default userProfileReducer;