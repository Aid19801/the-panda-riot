import { takeLatest, put } from 'redux-saga/effects';
import * as actions from './constants';
import { allFilterButtonObjects } from '../../lib/utils';
import gigsDirectlyImportedStaticFile from '../../mocks/gigs.json';

// 1. currently setup for direclty pulling in static json file
// 2. at some point deploy json-server style thing to heroku
// 3. code for that is commented out lines 17-30 & 

export function* watcherFetchGigs() {
    yield takeLatest(actions.DATAMAP_PAGE_LOADING, workerFetchGigs);
}

function* workerFetchGigs() {
    yield put({ type: actions.DATAMAP_FETCHING_GIGS });

    let retrievedGigs = [];
    let rawUrl = '';
    let error = null;

    // go to gist
    yield fetch(`https://api.github.com/gists/${process.env.REACT_APP_GIG_GIST}`)
        .then(res => res.json())
        .then(json => {
            return rawUrl = json.files.gigs.raw_url;
        })
        .catch(err => error = err);
    
    // get dirty raw url for all the gigs
    yield fetch(rawUrl)
        .then(res => res.json())
        .then(json => {
            return retrievedGigs = json.gigs;
        })
        .catch(err => console.log('err ', err))

        retrievedGigs.length > 0 ?
        yield put({ type: actions.DATAMAP_GIGS_SUCCESS, gigs: retrievedGigs })
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
    
    // console.log('1 before: ', actionObj.filter);

    const updatedFilter = {
        id,
        filterName,
        active: !active,
    }

    // console.log('1 after: ', actionObj.filter);

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

    // console.log('2 updatedFilters: ', updatedFilters);
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
    let rawUrl = '';
    let error = null;

    // go to gist
    yield fetch(`https://api.github.com/gists/${process.env.REACT_APP_GIG_GIST}`)
        .then(res => res.json())
        .then(json => {
            return rawUrl = json.files.gigs.raw_url;
        })
        .catch(err => error = err);
    
    // get dirty raw url for all the gigs
    yield fetch(rawUrl)
        .then(res => res.json())
        .then(json => {
            return gigs = json.gigs;
        })
        .catch(err => console.log('err ', err))

    let activeFilter = filters.filter(each => each.active === true)[0].filterName;
    
    let updatedGigs = [];

    if (activeFilter === 'Bringers') {
        updatedGigs = gigs.filter(each => each.bringer === true);
    }

    if (activeFilter === 'Non-bringers') {
        updatedGigs = gigs.filter(each => each.bringer !== true);
    }

    if (activeFilter === 'Mon' || activeFilter === 'Tue') {
        // console.log('filtering Monday or Tues gigs')
        updatedGigs = gigs.filter(each => each.nights.includes(activeFilter));
    } 

    if (activeFilter === 'Wed' || activeFilter === 'Thu') {
        // console.log('filtering Wed or Thu gigs')
        updatedGigs = gigs.filter(each => each.nights.includes(activeFilter));
        // console.log('Wed updated ', updatedGigs);
    }

    if (activeFilter === 'Fri' || activeFilter === 'Sat') {
        // console.log('filtering Fri or Sat gigs')
        updatedGigs = gigs.filter(each => each.nights.includes(activeFilter));
    }

    if (activeFilter === 'Sun') {
        // console.log('filtering Sunday gigs')
        updatedGigs = gigs.filter(each => each.nights.includes(activeFilter));
    }
    
    if (activeFilter === 'All') {
        // console.log('re-setting to show ALL gigs')
        updatedGigs = gigs;
    }

    yield put({ type: actions.GIGS_FILTERED_DONE, gigs: updatedGigs });
}

export function* watcherSelectGig() {
    yield takeLatest(actions.SELECTED_GIG, workerSelectGig);
}

export function* workerSelectGig({ id, gigs }) {
    // console.log('BEFORE ', gigs);
    let everythingReSetToFalse = [];

    let unselectedGigs = gigs.filter(each => each.id !== id);

    unselectedGigs.map((each, i) => {
        let newObj = {
            ...each,
            isSelected: false,
        }
        everythingReSetToFalse.push(newObj);
    });

    const selectedGig = gigs.filter(each => each.id === id)[0];

    const updatedGig = {
        ...selectedGig,
        isSelected: !selectedGig.isSelected,
    }

    const allGigsBackTogetherInOneArray = [
        ...everythingReSetToFalse,
        updatedGig,
    ]

    // console.log('AFTER ', allGigsBackTogetherInOneArray);
    yield put({ type: 'DATAMAP_GIGS_SUCCESS', gigs: allGigsBackTogetherInOneArray });

}