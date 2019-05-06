import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import { all } from 'redux-saga/effects';

import RootReducer from './redux/reducers';
import * as sagas from './redux/sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(RootReducer, 
    composeWithDevTools(
    applyMiddleware(sagaMiddleware)
        ),
    );

function* rootSaga() {
    yield all([
        sagas.watcherFetchGigs(),
        sagas.watcherFetchFilters(),
        sagas.watcherUserFilteringGigs(),
        sagas.watcherFiltersUpdateGigsResults(),
    ])
}

sagaMiddleware.run(rootSaga);

export default store;