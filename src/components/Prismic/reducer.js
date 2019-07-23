import * as actions from './constants';

const initialState = {
    isLoading: false,
    error: null,
    pages: [],
}

/* eslint-disable */
const prismicReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'STORE_PAGES_IN_REDUX':
        return {
            ...state,
            pages: action.pages,
        }
        break;

        default:
        return state;
    }
}

export default prismicReducer;