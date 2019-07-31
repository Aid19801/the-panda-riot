import { put, takeLatest } from 'redux-saga/effects';
import * as actions from './constants';

export function* watcherAccountPageLoadGigs() {
    yield takeLatest(actions.ACCOUNT_PAGE_FETCH_GIGS, workerAccountPageFetchGigs);
}

function* workerAccountPageFetchGigs(actionObj) {
    // console.log('action obj is ', actionObj);

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

            return gigs = json.gigs.sort((a, b) => {
                var textA = a.name;
                var textB = b.name;
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
        })
        .catch(err => console.log('err ', err))

    gigs && gigs.length !== 0 ? yield put({ type: actions.ACCOUNT_PAGE_GOT_GIGS, gigs: gigs }) : yield put({ type: actions.ACCOUNT_PAGE_FAIL_GIGS, error: error });

}