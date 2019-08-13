import { allFilterButtonObjects } from '../../lib/utils';
import * as actions from './constants';

const initialState = {
    loading: false,
    filters: allFilterButtonObjects,
}

// /* eslint-disable */
const filtersReducer = (state = initialState, action) => {
    switch(action.type) {

        case actions.GET_FILTERS:
        return {
            ...state,
        }
        break;


        case actions.FILTERS_CHANGED:
        return {
            ...state,
            filters: action.filters,
        }
        break;

        default:
        return state;
    }
}

export default filtersReducer;