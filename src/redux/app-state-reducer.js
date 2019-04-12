export const APP_LOADING = 'APP_LOADING';
export const APP_LOADED = 'APP_LOADED';
export const APP_FAILED = 'APP_FAILED';

const initialState = {
    isLoading: false,
}

const appStateReducer = (state = initialState, action) => {
    switch(action.type) {
        case APP_LOADING:
        return {
            ...state,
            isLoading: true,
        }
        break;

        case APP_LOADED:
        return {
            ...state,
            isLoading: false,
        }
        break;

        case APP_FAILED:
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

export default appStateReducer;