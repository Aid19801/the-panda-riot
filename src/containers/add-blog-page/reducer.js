import * as actions from './constants';

const initialState = {
    isLoading: false,
    progressBarStatus: false,
    error: null,
    isDraft: false,
    article: '',
}

/* eslint-disable */
const addBlogPageReducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.ADD_BLOG_PAGE_LOADING:
        return {
            ...state,
            isLoading: true,
        }
        break;

        case actions.ADD_BLOG_PAGE_LOADED:
        return {
            ...state,
            isLoading: false,
        }
        break;

        case actions.ADD_BLOG_PAGE_FAILED:
        return {
            ...state,
            isLoading: false,
            error: action.error,
        }
        break;

        case actions.BLOG_SUBMITTED:
        return {
            ...state,
            article: action.article,
            isDraft: true,
        }
        break;

        default:
        return state;
    }
}

export default addBlogPageReducer;