import * as actions from './constants';

const initialState = {
    isLoading: false,
    progressBarStatus: false,
    error: null,
    content: '',
}

/* eslint-disable */
const articleDraftReducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.ARTICLE_DRAFT_LOADING:
        return {
            ...state,
            isLoading: true,
        }
        break;

        case actions.ARTICLE_DRAFT_LOADED:
        return {
            ...state,
            isLoading: false,
        }
        break;

        case actions.ARTICLE_DRAFT_FAILED:
        return {
            ...state,
            isLoading: false,
            error: action.error,
        }
        break;

        case actions.ARTICLE_DRAFT_POSTING:
        return {
            ...state,
        }
        break;

        case actions.NEW_ARTICLE_POSTED:
        return {
            ...state,
        }
        break;

        case actions.ARTICLE_DRAFT_POSTING:
        return {
            ...state,
            content: action.content,
        }
        break;

        default:
        return state;
    }
}

export default articleDraftReducer;