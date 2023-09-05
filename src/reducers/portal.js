import {PORTAL_DATA } from '../actions/types';

const portalReducer = (state = {}, action) => {
    switch (action.type) {
        case PORTAL_DATA:
            return {...state, portalData: action.payload}                
        default:
            return state;
    }
}

export default portalReducer;