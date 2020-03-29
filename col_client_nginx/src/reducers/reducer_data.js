import { FETCH_DATA, SUBMIT_STUDY_SESSION } from '../actions';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_DATA:
            return action.payload.data
            // return [{"time":"2019-10-05T04:00:00.000Z","computation_correct":2,"random_correct":1,"study_session_results":1},{"time":"2020-03-28T04:00:00.000Z","computation_correct":null,"random_correct":null,"study_session_results":5}]
        case SUBMIT_STUDY_SESSION:
            return action.payload.data
            // return [{"time":"2019-10-05T04:00:00.000Z","computation_correct":2,"random_correct":1,"study_session_results":1},{"time":"2020-03-28T04:00:00.000Z","computation_correct":null,"random_correct":null,"study_session_results":5}]
        default:
            return state;
    }
}
