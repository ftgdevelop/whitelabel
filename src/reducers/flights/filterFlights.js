import {
    SET_FILTER_FLIGHT,
    CLEAR_FILTER_FLIGHT
} from '../../actions/types'
const initialState = {
    filterStops: [],
    filterAirlines: [],
    filterTime: [],
    filterPriceValue: [],
    filterFlightType: [],
    filterFlightCabin:[]
}
const filterHandler = (state, parameters)=>{
    state[parameters.type] = parameters.value;
    return state
}


const filterFlights = (state = {...initialState}, action) => {
    switch (action.type) {
        case SET_FILTER_FLIGHT:
            return filterHandler(state, action.payload)
        case CLEAR_FILTER_FLIGHT: 
            return {
                filterStops: [],
                filterAirlines: [],
                filterTime: [],
                filterPriceValue: [],
                filterFlightType: [],
                filterFlightCabin:[]
            }
        default:
            return state;
    }
}

export default filterFlights;