/**
 * @author Maksim Sandybekov
 * @date 4.2.2020
 * 
 */

// import axios from 'axios';
import axios from 'axios';

import {
    ADD_DISTRICT,
    REMOVE_DISTRICT,

    LOAD_BINS_SUCCESS,
    LOAD_BINS_ERROR,
    REMOVE_BIN,

    START_ROUTING,
    END_ROUTING
} from '../types/collect';


// Add district for selection its bins 
const addDistrict = (districtID) => {
    return {
        type: ADD_DISTRICT,
        payload: districtID
    }
}


const removeDistrict = (districtID) => {
    return {
        type: REMOVE_DISTRICT,
        payload: districtID
    }
}


const loadBins = (districtID) => {

    let apiUrl = process.env.REACT_APP_GARNET_BACKEND;
    
    return dispatch => {

        axios.get(apiUrl, {
            headers: {"Content-Type": "application/json"},
            completed: false
        }).then(res => {
            // success
            dispatch(loadBinsSuccess(res));
        }).catch(err => {
            // error
            dispatch(loadBinsError(err));
        });
    }
}

const loadBinsSuccess = (bins) => ({
    type: LOAD_BINS_SUCCESS,
    payload: {
        ...bins
    }
});

const loadBinsError = error => ({
    type: LOAD_BINS_ERROR,
    payload: {
        ...error
    }
});

const removeBin = (binID) => {
    return {
        type: REMOVE_BIN,
        payload: binID
    }
}

const startRouting = () => {
    return {
        type: START_ROUTING,
        payload: null
    };
}

const endRouting = () => {
    return {
        type: END_ROUTING,
        payload: null
    };
}

export {
    addDistrict,
    removeDistrict,
    loadBins,
    removeBin,
    startRouting,
    endRouting
}