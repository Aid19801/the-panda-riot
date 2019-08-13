import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import { all } from 'redux-saga/effects';

import RootReducer from './redux/reducers';
import * as sagas from './redux/sagas';

const sagaMiddleware = createSagaMiddleware();

// console.log('env ====>>  ', process.env.NODE_ENV);

const store = createStore(RootReducer, 
    composeWithDevTools(
    applyMiddleware(sagaMiddleware)
        ),
    );

function* rootSaga() {
    yield all([
        // sagas.watcherAddBlog(),
        // sagas.watcherAccountPageLoadGigs(),
        sagas.watcherFetchArticle(),
        // sagas.watcherFetchGigs(),
        // sagas.watcherFetchGigsTonight(),
        // sagas.watcherFetchFilters(),
        sagas.watcherFetchNews(),
        // sagas.watcherPostingArticle(),
        // sagas.watcherSelectGig(),
        // sagas.watcherUserFilteringGigs(),
        // sagas.watcherFiltersUpdateGigsResults(),
    ])
}

sagaMiddleware.run(rootSaga);

export default store;