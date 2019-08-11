import { put, takeLatest } from 'redux-saga/effects';
import * as actions from './constants';
import mockGigs from '../../mocks/gigs.json';

export function* watcherAccountPageLoadGigs() {
    yield takeLatest(actions.ACCOUNT_PAGE_FETCH_GIGS, workerAccountPageFetchGigs);
}

function* workerAccountPageFetchGigs() {
    // console.log('action obj is ', actionObj);

    let rawUrl = '';
    let retrievedGigs;
    let error = null;

    if (process.env.NODE_ENV === 'production') {
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
    
                return retrievedGigs = json.gigs.sort((a, b) => {
                    var textA = a.name;
                    var textB = b.name;
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                });
            })
            .catch(err => console.log('err ', err))
    
            retrievedGigs && retrievedGigs.length !== 0 ? yield put({ type: actions.ACCOUNT_PAGE_GOT_GIGS, gigs: retrievedGigs }) : yield put({ type: actions.ACCOUNT_PAGE_FAIL_GIGS, error: error });

    }

    if (process.env.NODE_ENV === 'development') {
        console.log('AT | dev - got gigs: ', mockGigs.gigs)
        yield put({ type: actions.ACCOUNT_PAGE_GOT_GIGS, gigs: mockGigs.gigs })
    }
}