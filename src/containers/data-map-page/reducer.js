import * as actions from './constants';

const initialState = {
    isLoading: false,
    progressBarStatus: false,
    paneInfo: {
        heading: 'select a marker',
        subheading: 'for more information',
        paragraph: 'about a gig...',
        nights: [],
        imgs: [],
        img: '',
        lng: -0.0826,
        lat: 51.5160,
    },
    error: null,
}

/* eslint-disable */
const dataMapPageReducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.DATAMAP_PAGE_LOADING:
        return {
            ...state,
            isLoading: true,
        }
        break;

        case actions.DATAMAP_PAGE_LOADED:
        return {
            ...state,
            isLoading: false,
        }
        break;

        case actions.DATAMAP_PAGE_FAILED:
        return {
            ...state,
            isLoading: false,
            error: action.error,
        }
        break;

        case actions.USER_CLICKED_MARKER:
        return {
            ...state,
            paneInfo: action.paneInfo,
        }
        break;

        default:
        return state;
    }
}

export default dataMapPageReducer;