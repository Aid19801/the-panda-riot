import { takeLatest, put } from 'redux-saga/effects';
import * as actions from './constants';

export function* watcherAddBlog() {
    yield takeLatest(actions.ADD_BLOG_PAGE_LOADING, workerAddBlog);
}

function* workerAddBlog({ id }) {
    console.log('heard saga worker add blog')

    // let retrievedArticle = {};
    // let rawUrl;
    // let error;

    // // go to gist
    // yield fetch('https://api.github.com/gists/424b043765bf5ad54cb686032f141b34')
    //     .then(res => res.json())
    //     .then(json => {
    //         return rawUrl = json.files.articles.raw_url;
    //     })
    //     .catch(err => error = err);
    
    // // get dirty raw url for all the articles
    // yield fetch(rawUrl)
    //     .then(res => res.json())
    //     .then(json => {
    //         retrievedArticle = json.articles.filter(each => each._id === id)[0];
    //         // console.log('retrieved articals are ', retrievedArticles.length);
    //         return retrievedArticle;
    //     })
    //     .catch(err => error = err);

    //     retrievedArticle.src === 'TPR' ?
    //     yield put({ type: actions.GOT_ARTICLE, article: retrievedArticle })
    //     :
    //     yield put({ type: actions.ARTICLE_FAILED, error: error })


}
