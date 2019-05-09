import { watcherFetchGigs } from '../containers/data-map-page/sagas';
import { watcherFetchFilters } from '../containers/data-map-page/sagas';
import { watcherUserFilteringGigs } from '../containers/data-map-page/sagas';
import { watcherFiltersUpdateGigsResults } from '../containers/data-map-page/sagas';
import { watcherFetchNews } from '../containers/homepage/sagas';

export {
    watcherFetchGigs,
    watcherFetchFilters,
    watcherFetchNews,
    watcherUserFilteringGigs,
    watcherFiltersUpdateGigsResults,
}