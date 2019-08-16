import { takeLatest, put } from 'redux-saga/effects';
import * as actions from './constants';
import { allFilterButtonObjects } from '../../lib/utils';
import mockGigs from '../../mocks/gigs.json';

export function* watcherSelectGig() {
    yield takeLatest(actions.SELECTED_GIG, workerSelectGig);
}

export function* workerSelectGig({ id, gigs }) {
    // console.log('BEFORE ', gigs);
    let everythingReSetToFalse = [];

    let unselectedGigs = gigs.filter(each => each.id !== id);

    unselectedGigs.map((each, i) => {
        let newObj = {
            ...each,
            isSelected: false,
        }
        everythingReSetToFalse.push(newObj);
    });

    const selectedGig = gigs.filter(each => each.id === id)[0];

    const updatedGig = {
        ...selectedGig,
        isSelected: !selectedGig.isSelected,
    }

    const allGigsBackTogetherInOneArray = [
        ...everythingReSetToFalse,
        updatedGig,
    ]

    // console.log('AFTER ', allGigsBackTogetherInOneArray);
    yield put({ type: 'DATAMAP_GIGS_SUCCESS', gigs: allGigsBackTogetherInOneArray });

}