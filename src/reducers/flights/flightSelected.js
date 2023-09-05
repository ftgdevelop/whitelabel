import {
    FLIGHT_SELECTED
} from '../../actions/types'



const flightSelected = (state = {}, action) => {
    switch (action.type) {
        case FLIGHT_SELECTED:
            return action.payload;
        default:
            return state;
    }
}

export default flightSelected;