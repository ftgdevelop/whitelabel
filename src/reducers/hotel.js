import actions from "../actions";
import { 
    HOTEL_LIST,
    HOTEL_INTERIOR_LIST,
    HOTEL_FOREIGN_LIST,
    HOTEL_INTERIOR_DETAILS,
    HOTEL_FOREIGN_DETAILS
} from '../actions/types'


const hotelReducer = (state = {}, action) => {
    switch (action.type) {
        case HOTEL_LIST:
            // console.log("resucer hotels : ", action.payload);
            return { ...state, [action.payload.id]: action.payload }
        case HOTEL_INTERIOR_LIST:
            return {...state, interiorHotels: action.payload}
        case HOTEL_FOREIGN_LIST:
            return {...state, foreignHotels: action.payload}
        case HOTEL_INTERIOR_DETAILS:
            return {...state, interiorHotelDetail: action.payload}
        case HOTEL_FOREIGN_DETAILS:
            return {...state, foreignHotelDetail: action.payload}                
        default:
            return state;
    }
}

export default hotelReducer;