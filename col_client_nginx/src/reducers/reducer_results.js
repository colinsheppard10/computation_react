import { SUBMIT_RESULTS } from '../actions';

export default function (state = {rounds:0, minutes:0}, action) {
    switch (action.type) {
        case SUBMIT_RESULTS:
            return action.payload
        default:
            return state;
    }
}
