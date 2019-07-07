import { takeLatest, put } from 'redux-saga/effects';
import * as actions from './constants';

const Gists = require('gists');

// change to token when ready
const my_gists = new Gists({ token: process.env.REACT_APP_GIG_GIST });

export function* watcherPostingArticle() {
    yield takeLatest(actions.ARTICLE_DRAFT_POSTING, workerPostingArticle);
}

function* workerPostingArticle({ content }) {

    let existingArticles = [];
    let rawUrl;
    let error;

    // go to gist
    yield fetch('https://api.github.com/gists/424b043765bf5ad54cb686032f141b34')
        .then(res => res.json())
        .then(json => {
            return rawUrl = json.files.articles.raw_url;
        })
        .catch(err => {
            console.log('saga 1: ', err);
            return error = err;
        });
    
    // get dirty raw url for all the articlesx
    yield fetch(rawUrl)
        .then(res => res.json())
        .then(json => {
            existingArticles = json.articles;
            let newArticle = {
                _id: `TPR_${Date.now()}`,
                headline: "Weekly Blog",
                blurb: "The Panda Riot blog on all things Open Mic",
                src: "TPR",
                img: "https://static1.squarespace.com/static/5a52e80549fc2bb7a59fd405/5a7b6cf39140b79bd6998090/5a9716b5e4966bfb36b23941/1519852545123/openmix.jpg?format=750w",
                content,
            }
            existingArticles.unshift(newArticle);
            console.log('existing articles: ', existingArticles);
        })
        .catch(err => {
            console.log('saga 2: ', err);
            return error = err;
        });

        my_gists.edit('424b043765bf5ad54cb686032f141b34', {
            files: { 'articles': { content: JSON.stringify({ articles: existingArticles })}}
        })

        console.log('gist updated');
        yield put({ type: actions.NEW_ARTICLE_POSTED })
}
