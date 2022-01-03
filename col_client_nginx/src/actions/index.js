import axios from 'axios';

export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_DATA_JESS = 'FETCH_DATA_JESS';
export const FETCH_RANDOM = 'FETCH_RANDOM';

export const SUBMIT_STUDY_SESSION = 'SUBMIT_STUDY_SESSION';
export const SUBMIT_STUDY_SESSION_JESS = 'SUBMIT_STUDY_SESSION_JESS';

export const SUBMIT_RESULTS = 'SUBMIT_RESULTS';

export function fetchData() {
    const data = async () => {
        try {
            return await axios.get('api/data');
        } catch (err) {
            console.log('ERROR From Actions Get Data');
            return [];
        }
    }
    return {
        type: FETCH_DATA,
        payload: data()
    };
}

export function fetchRandom() {
    const data = async () => {
        try {
            return await axios.get('api/random');
        } catch (err) {
            console.log('ERROR From Actions Get Data');
            return [];
        }
    }
    return {
        type: FETCH_RANDOM,
        payload: data()
    };
}

export function submitStudySession(studySessionResults) {
    const data = async () => {
        try {
            if (studySessionResults != null ) {
                return await axios.post('/api/studysession', { "studySessionResults": studySessionResults })
            } else {
                return { "studySessionResults": studySessionResults }
            }
        } catch (err) {
            console.log('ERROR From Actions Submit Study Session');
            return []
        }
    }

    return {
        type: SUBMIT_STUDY_SESSION,
        payload: data()
    }
}

export function fetchDataJess() {
    const data = async () => {
        try {
            return await axios.get('api/datajess');
        } catch (err) {
            console.log('ERROR From Actions Get Data');
            return [];
        }
    }
    return {
        type: FETCH_DATA_JESS,
        payload: data()
    };
}

export function submitStudySessionJess(studySessionResults) {
    const data = async () => {
        try {
            if (studySessionResults != null ) {
                return await axios.post('/api/studysessionjess', { "studySessionResults": studySessionResults })
            } else {
                return { "studySessionResults": studySessionResults }
            }
        } catch (err) {
            console.log('ERROR From Actions Submit Study Session');
            return [];
        }
    }

    return {
        type: SUBMIT_STUDY_SESSION_JESS,
        payload: data()
    }
}

export function submitResults(results) {
    const {rounds, minutes} = results;
    const data = async () => {
        try {
            if (rounds >= 4) {
                return await axios.post('/api/insert', { computationResults: rounds, randomResults:minutes })
            } else {
                return {rounds, minutes}
            }
        } catch (err) {
            console.log('ERROR From Actions Submit Results');
            return {rounds, minutes};
        }
    }

    return {
        type: SUBMIT_RESULTS,
        payload: data()
    }
}