import * as actions from './constants';

const initialState = {
    isLoading: false,
    progressBarStatus: false,
    articles: [],
    error: null,
}

/* eslint-disable */
const homePageReducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.HOME_PAGE_LOADING:
        return {
            ...state,
            isLoading: true,
        }
        break;

        case actions.HOME_PAGE_LOADED:
        return {
            ...state,
            isLoading: false,
        }
        break;

        case actions.HOME_PAGE_FAILED:
        return {
            ...state,
            isLoading: false,
            error: action.error,
        }
        break;

        case actions.FETCH_NEWS:
        return {
            ...state,
        }
        break;

        case actions.FETCHING_NEWS:
        return {
            ...state,
            isLoading: true,
        }
        break;

        case actions.FETCH_NEWS_SUCCESS:
        return {
            ...state,
            isLoading: false,
            articles: action.articles,
        }
        break;

        case actions.FETCH_NEWS_FAIL:
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

export default homePageReducer;