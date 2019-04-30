import { all, takeLatest, call, put } from 'redux-saga/effects';
import * as actions from './constants';
import { allFilterButtonObjects } from '../../lib/utils';


export function* watcherFetchGigs() {
    yield takeLatest(actions.DATAMAP_PAGE_LOADING, workerFetchGigs);
}

function* workerFetchGigs() {
    yield put({ type: actions.DATAMAP_FETCHING_GIGS });

    let gigs = [];
    let error = null;

    yield fetch('http://localhost:3001/gigs')
        .then(res => res.json())
        .then(json => {
            return gigs = json;
        })
        .catch(err => error = err);

        gigs.length > 0 ?
        yield put({ type: actions.DATAMAP_GIGS_SUCCESS, gigs: gigs })
        :
        yield put({ type: actions.DATAMAP_GIGS_FAILED, error: error })
}

export function* watcherFetchFilters() {
    yield takeLatest(actions.DATAMAP_PAGE_LOADING, workerFetchFilters);
}

// titlesOfFilterButtons
function* workerFetchFilters() {
    yield put({ type: actions.DATAMAP_FETCHING_FILTERS });

    let sortedFilters = allFilterButtonObjects.sort((a, b) => {
        var textA = a.id;
        var textB = b.id;
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

    // console.log('sortedFilters: ', sortedFilters);

    sortedFilters ? yield put({ type: actions.DATAMAP_FILTERS_SUCCESS, filters: sortedFilters })
    :
    yield put({ type: actions.DATAMAP_FILTERS_FAILED, error: 'saga couldnt load filters' });

}

// clicking on a filter changes the status of the filterName / active bool
export function* watcherUserFilteringGigs() {
    yield takeLatest(actions.USER_CLICKED_FILTER, workerUserFilteringGigs);
}

function* workerUserFilteringGigs(actionObj) {
    // take the deets out of the action object
    const { id, filterName, active } = actionObj.filter;
    const updatedFilter = {
        id,
        filterName,
        active: !active,
    }

    // filter existing filters down to ev thing *but* this one
    let otherFilters = allFilterButtonObjects.filter((each) => each.id !== id);

    // push the new updated bool back into the array
    otherFilters.push(updatedFilter);

    // re-sort them to correct order
    let updatedFilters = otherFilters.sort((a, b) => {
        var textA = a.id;
        var textB = b.id;
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

    // put them back in state so gigs can render accordingly.
    yield put({ type: actions.FILTER_BOOL_UPDATED, filters: updatedFilters });
}

// listens for when filters have happened
export function* watcherFiltersUpdateGigsResults() {
    yield takeLatest(actions.FILTER_BOOL_UPDATED, workerFiltersUpdateGigsResults);
}

// updates props.gigs accordingly
function* workerFiltersUpdateGigsResults({ filters }) {
    
    yield put({ type: actions.GIGS_BEING_FILTERED });

    let gigs = [];
    let error = null;

    yield fetch('http://localhost:3001/gigs')
    .then(res => res.json())
    .then(json => {
        gigs = json;
    })
    .catch(err => error = err);

    let activeFilter = filters.filter(each => each.active === true)[0].filterName;
    
    let updatedGigs = [];

    if (activeFilter === 'Bringers') {
        updatedGigs = gigs.filter(each => each.bringer === true);
    }

    if (activeFilter === 'Non-bringers') {
        updatedGigs = gigs.filter(each => each.bringer !== true);
    }

    if (activeFilter === 'Mon' || activeFilter === 'Tue') {
        console.log('filtering Monday or Tues gigs')
        updatedGigs = gigs.filter(each => each.nights.includes(activeFilter));
    } 

    if (activeFilter === 'Wed' || activeFilter === 'Thu') {
        console.log('filtering Wed or Thu gigs')
        updatedGigs = gigs.filter(each => each.nights.includes(activeFilter));
        console.log('Wed updated ', updatedGigs);
    }

    if (activeFilter === 'Fri' || activeFilter === 'Sat') {
        console.log('filtering Fri or Sat gigs')
        updatedGigs = gigs.filter(each => each.nights.includes(activeFilter));
    }

    if (activeFilter === 'Sun') {
        console.log('filtering Sunday gigs')
        updatedGigs = gigs.filter(each => each.nights.includes(activeFilter));
    }
    
    if (activeFilter === 'All') {
        console.log('re-setting to show ALL gigs')
        updatedGigs = gigs;
    }

    yield put({ type: actions.GIGS_FILTERED_DONE, gigs: updatedGigs });
}