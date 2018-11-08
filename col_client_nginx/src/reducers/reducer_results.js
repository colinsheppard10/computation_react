import { SUBMIT_RESULTS } from '../actions';

export default function (state = {}, action) {
    switch (action.type) {
        case SUBMIT_RESULTS:
            return action.payload
        default:
            return state;
    }
}
