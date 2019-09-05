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
        twitterHandle: '',
    },
    gigs: [],
    error: null,
    showPanels: false,
}

/* eslint-disable */
const dataMapPageReducer = (state = initialState, action) => {
    switch(action.type) {

        // App State | basic page loading
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


        case actions.SELECTED_GIG:
        return {
            ...state,
            
        }
        break;


        default:
        return state;
    }
}

export default dataMapPageReducer;