import { FETCH_DATA_JESS, SUBMIT_STUDY_SESSION_JESS } from '../actions';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_DATA_JESS:
            return action.payload.data
        case SUBMIT_STUDY_SESSION_JESS:
            return action.payload.data
        default:
            return state;
    }
}
