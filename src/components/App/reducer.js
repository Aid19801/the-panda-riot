import * as actions from './constants';

const initialState = {
    isLoading: false,
    progressBarStatus: false,
    error: null,
}

const appStateReducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.APP_LOADING:
        return {
            ...state,
            isLoading: true,
        }
        break;

        case actions.APP_LOADED:
        return {
            ...state,
            isLoading: false,
        }
        break;

        case actions.APP_FAILED:
        return {
            ...state,
            isLoading: false,
            error: action.error,
        }
        break;

        case actions.SET_PROGRESS_BAR:
        return {
            ...state,
            progressBarStatus: action.isOpen,
        }
        break;

        default:
        return state;
    }
}

export default appStateReducer;