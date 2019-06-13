// FETCH_GIGS_TONIGHT
import * as actions from './constants';

const initialState = {
    isLoading: false,
    gigs: [],
    error: null,
}

/* eslint-disable */
const fetchGigsTonightReducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.FETCH_GIGS_TONIGHT:
        return {
            ...state,
            isLoading: true,
        }
        break;

        case actions.FETCH_GIGS_SUCCESS:
        return {
            ...state,
            isLoading: false,
            gigs: action.gigs,
        }
        break;

        case actions.FETCH_GIGS_FAILED:
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

export default fetchGigsTonightReducer;