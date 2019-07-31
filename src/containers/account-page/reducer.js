import * as actions from './constants';

const initialState = {
    isLoading: false,
    progressBarStatus: false,
    error: null,
    uid: '',
    email: '',
    gigs: [],
}

/* eslint-disable */
const accountPageReducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.ACCOUNT_PAGE_LOADING:
        return {
            ...state,
            isLoading: true,
        }
        break;

        case actions.STORE_USER_PROFILE:
        return {
            uid: action.uid,
            email: action.email,
        }
        break;

        case actions.ACCOUNT_PAGE_LOADED:
        return {
            ...state,
            isLoading: false,
        }
        break;

        case actions.ACCOUNT_PAGE_FAILED:
        return {
            ...state,
            isLoading: false,
            error: action.error,
        }
        break;

        case actions.ACCOUNT_PAGE_FETCH_GIGS:
            return {
                ...state,
                isLoading: true,
            }
            break;

        case actions.ACCOUNT_PAGE_GOT_GIGS:
                return {
                    ...state,
                    isLoading: false,
                    gigs: action.gigs,
                }
            break;


        case actions.ACCOUNT_PAGE_FAIL_GIGS:
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

export default accountPageReducer;