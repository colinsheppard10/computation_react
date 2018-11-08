import axios from 'axios';

export const FETCH_DATA = 'FETCH_DATA';
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

export function submitResults(computationResults, randomResults) {
    const data = async () => {
        try {
            debugger
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