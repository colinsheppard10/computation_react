import { FETCH_RANDOM } from '../actions';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_RANDOM:
            return action.payload.data
            // return ["wordlessness","supertankers"]
        default:
            return state;
    }
}
