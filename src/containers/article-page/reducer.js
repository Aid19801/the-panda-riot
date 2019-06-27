import * as actions from './constants';

const initialState = {
    isLoading: false,
    progressBarStatus: false,
    error: null,
    article: {},
}

/* eslint-disable */
const articlePageReducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.ARTICLE_PAGE_LOADING:
        return {
            ...state,
            isLoading: true,
        }
        break;

        case actions.ARTICLE_PAGE_LOADED:
        return {
            ...state,
            isLoading: false,
        }
        break;

        case actions.ARTICLE_PAGE_FAILED:
        return {
            ...state,
            isLoading: false,
            error: action.error,
        }
        break;

        case actions.FETCHING_ARTICLE:
        return {
            ...state,
            isLoading: true,
        }
        break;

        case actions.GOT_ARTICLE:
        return {
            ...state,
            isLoading: false,
            article: action.article,
        }
        break;

        case actions.ARTICLE_FAILED:
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

export default articlePageReducer;