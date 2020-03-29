import axios from 'axios';

export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_DATA_JESS = 'FETCH_DATA_JESS';

export const SUBMIT_STUDY_SESSION = 'SUBMIT_STUDY_SESSION';
export const SUBMIT_STUDY_SESSION_JESS = 'SUBMIT_STUDY_SESSION_JESS';

export const SUBMIT_RESULTS = 'SUBMIT_RESULTS';

export function fetchData() {
    const data = async () => {
        try {
            return await axios.get('api/data');
        } catch (err) {
            console.log('ERROR From Actions Get Data');
        }
    }
    return {
        type: FETCH_DATA,
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
        }
    }

    return {
        type: SUBMIT_STUDY_SESSION_JESS,
        payload: data()
    }
}

export function submitResults(computationResults, randomResults) {
    const data = async () => {
        try {
            if (computationResults != null && randomResults != null) {
                return await axios.post('/api/insert', { "computationResults": computationResults, "randomResults": randomResults })
            } else {
                return { "computationResults": computationResults, "randomResults": randomResults }
            }
        } catch (err) {
            console.log('ERROR From Actions Submit Results');
        }
    }

    return {
        type: SUBMIT_RESULTS,
        payload: data()
    }
}