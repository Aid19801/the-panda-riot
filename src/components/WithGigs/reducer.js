import * as actions from './constants';

const initialState = {
    isLoading: false,
    gigs: [],
    filteredDownGigs: [],
    error: null,
}

/* eslint-disable */
const gigsReducer = (state = initialState, action) => {
    switch(action.type) {

        // App State | basic page loading
        case actions.GET_GIGS:
        return {
            ...state,
            isLoading: true,
        }
        break;

        case actions.GOT_GIGS:
        return {
            ...state,
            isLoading: false,
            gigs: action.gigs,
        }
        break;

        case actions.GIGS_API_FAIL:
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

export default gigsReducer;