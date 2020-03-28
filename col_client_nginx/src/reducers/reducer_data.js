import { FETCH_DATA, SUBMIT_STUDY_SESSION } from '../actions';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_DATA:
            return action.payload
        case SUBMIT_STUDY_SESSION:
            return action.payload
        default:
            return state;
    }
}
