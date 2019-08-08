import { takeLatest, put } from 'redux-saga/effects';
import { whatDayIsIt } from '../../lib/utils';
import * as actions from './constants';
import mockGigs from '../../mocks/gigs.json';

export function* watcherFetchGigsTonight() {
    yield takeLatest(actions.FETCH_GIGS_TONIGHT, workerFetchGigsTonight);
}

function* workerFetchGigsTonight() {
    // console.log('heard fetch gigs tonight');

    let rawURL;
    let error;
    let retrievedGigs;
    let today = whatDayIsIt();



    if (process.env.NODE_ENV === 'development') {
        retrievedGigs = mockGigs.gigs.filter(each => each.nights.includes(today) === true);
        yield put({ type: actions.FETCH_GIGS_SUCCESS, gigs: retrievedGigs });
        return;
    
    } else {
        
        // go to gist
        yield fetch(`https://api.github.com/gists/${process.env.REACT_APP_GIG_GIST}`, {
            method: "GET",
            cache: "force-cache",
        })
            .then(res => res.json())
            .then(json => {
                return rawURL = json.files.gigs.raw_url;
            })
            .catch(err => {
                return error = err;
            })
        
        // get dirty raw url for all the gigs
        yield fetch(rawURL)
            .then(res => res.json())
            .then(json => {
                retrievedGigs = json.gigs.filter(each => each.nights.includes(today) === true);
                return retrievedGigs;
            })
            .catch(err => console.log('saga | Fetch gigs tonight error: ', err))

            retrievedGigs.length > 0 ?
            yield put({ type: actions.FETCH_GIGS_SUCCESS, gigs: retrievedGigs })
            :
            yield put({ type: actions.FETCH_GIGS_FAILED, error: error })
    }
}
