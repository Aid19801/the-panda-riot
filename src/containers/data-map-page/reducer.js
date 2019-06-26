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
    filters: [],
    filter: {},
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

        // API Gigs | we are funny, feckers etc
        case actions.DATAMAP_FETCHING_GIGS:
        return {
            ...state,
            isLoading: true,
        }
        break;

        case actions.DATAMAP_GIGS_SUCCESS:
        return {
            ...state,
            isLoading: false,
            gigs: action.gigs,
        }
        break;

        case actions.DATAMAP_GIGS_FAILED:
        return {
            ...state,
            isLoading: false,
            error: action.error,
        }
        break;

        // FILTERS | mnging state of filters
        case actions.DATAMAP_FETCHING_FILTERS:
        return {
            ...state,
            isLoading: true,
        }
        break;

        case actions.DATAMAP_FILTERS_SUCCESS:
        return {
            ...state,
            isLoading: false,
            filters: action.filters,
        }
        break;

        case actions.DATAMAP_FILTERS_FAILED:
        return {
            ...state,
            isLoading: false,
            error: action.error,
        }
        break;

        case actions.USER_CLICKED_FILTER:
        return {
            ...state,
            filter: action.filter,
        }


        case actions.FILTER_BOOL_UPDATED:
        return {
            ...state,
            filters: action.filters,
        }

        case actions.GIGS_BEING_FILTERED:
        return {
            ...state,
            isLoading: true,
        }

        case actions.GIGS_FILTERED_DONE:
        return {
            ...state,
            gigs: action.gigs,
            isLoading: false,
        }


        // GIG SELECT | popping out info re gig
        case actions.USER_CLICKED_MARKER:
        return {
            ...state,
            paneInfo: action.paneInfo,
            showPanels: true,
        }
        break;
        // GIG SELECT | popping out info re gig
        case actions.SELECTED_GIG:
        return {
            ...state,
            selectedGigId: action.id,
            gigs: action.gigs,
        }
        break;

        default:
        return state;
    }
}

export default dataMapPageReducer;