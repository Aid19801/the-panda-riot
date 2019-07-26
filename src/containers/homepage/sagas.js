import { takeLatest, put } from 'redux-saga/effects';
import * as actions from './constants';

export function* watcherFetchNews() {
    yield takeLatest(actions.FETCH_NEWS, workerFetchNews);
}

function* workerFetchNews() {
    console.log('old saga fetch news');
    yield put({ type: actions.FETCHING_NEWS });

    let retrievedArticles = [];
    let rawUrl = '';
    let error = null;

    // go to gist
    yield fetch('https://api.github.com/gists/424b043765bf5ad54cb686032f141b34')
        .then(res => res.json())
        .then(json => {
            return rawUrl = json.files.articles.raw_url;
        })
        .catch(err => error = err);
    
    // get dirty raw url for all the articles
    yield fetch(rawUrl)
        .then(res => res.json())
        .then(json => {
            retrievedArticles = json.articles.slice(0, 12);
            // console.log('retrieved articals are ', retrievedArticles.length);
            return retrievedArticles;
        })
        .catch(err => console.log('saga | news stories error ', err))

        retrievedArticles.length > 0 ?
        yield put({ type: actions.FETCH_NEWS_SUCCESS, articles: retrievedArticles })
        :
        yield put({ type: actions.FETCH_NEWS_FAIL, error: error })
}
