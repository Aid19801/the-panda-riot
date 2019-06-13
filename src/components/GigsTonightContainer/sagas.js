import { takeLatest, put } from 'redux-saga/effects';
import { whatDayIsIt } from '../../lib/utils';
import * as actions from './constants';

export function* watcherFetchGigsTonight() {
    yield takeLatest(actions.FETCH_GIGS_TONIGHT, workerFetchGigsTonight);
}

function* workerFetchGigsTonight() {
    console.log('heard fetch gigs tonight');

    let rawURL;
    let error;
    let retrievedGigs;

    // go to gist
    yield fetch(`https://api.github.com/gists/${process.env.REACT_APP_GIG_GIST}`)
        .then(res => res.json())
        .then(json => {
            return rawURL = json.files.gigs.raw_url;
        })
        .catch(err => error = err);
    
    // get dirty raw url for all the gigs
    // yield fetch(rawURL)
    //     .then(res => res.json())
    //     .then(json => {
    //         let today = whatDayIsIt();
    //         retrievedGigs = json.gigs.filter(each => each.nights.includes(today) === true);
    //         return retrievedGigs;
    //     })
    //     .catch(err => console.log('saga | Fetch gigs 2nite error: ', err))

    //     retrievedGigs.length > 0 ?
    //     yield put({ type: actions.FETCH_GIGS_SUCCESS, gigs: retrievedGigs })
    //     :
    //     yield put({ type: actions.FETCH_GIGS_FAILED, error: error })

}
