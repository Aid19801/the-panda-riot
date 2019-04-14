import * as actions from './constants';

const initialState = {
    isLoading: false,
    progressBarStatus: false,
    error: null,
}

/* eslint-disable */
const adminPageReducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.ADMIN_PAGE_LOADING:
        return {
            ...state,
            isLoading: true,
        }
        break;

        case actions.ADMIN_PAGE_LOADED:
        return {
            ...state,
            isLoading: false,
        }
        break;

        case actions.ADMIN_PAGE_FAILED:
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

export default adminPageReducer;