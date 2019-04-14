import * as actions from './constants';

const initialState = {
    isLoading: false,
    progressBarStatus: false,
    error: null,
}
/* eslint-disable*/
const passwordChangeFormReducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.PW_CHANGE_FORM_LOADING:
        return {
            ...state,
            isLoading: true,
        }
        break;

        case actions.PW_CHANGE_FORM_LOADED:
        return {
            ...state,
            isLoading: false,
        }
        break;

        case actions.PW_CHANGE_FORM_FAILED:
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

export default passwordChangeFormReducer;