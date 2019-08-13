// import { watcherFetchGigsTonight } from '../components/GigsTonightContainer/sagas';
import { watcherFetchArticle } from '../containers/article-page/sagas';
import { watcherAccountPageLoadGigs } from '../containers/account-page/sagas';
// import { watcherFetchGigs } from '../containers/data-map-page/sagas';
// import { watcherFetchFilters } from '../containers/data-map-page/sagas';

// import { watcherSelectGig } from '../containers/data-map-page/sagas';
// import { watcherUserFilteringGigs } from '../containers/data-map-page/sagas';
// import { watcherFiltersUpdateGigsResults } from '../containers/data-map-page/sagas';
import { watcherFetchNews } from '../containers/homepage/sagas';

export {
    watcherAccountPageLoadGigs,
    watcherFetchArticle,
    // watcherFetchGigs,
    // watcherFetchGigsTonight,
    // watcherFetchFilters,
    watcherFetchNews,
    
    // watcherSelectGig,
    // watcherUserFilteringGigs,
    // watcherFiltersUpdateGigsResults,
}