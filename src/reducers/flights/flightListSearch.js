import moment from 'moment-jalaali';
import {
    FLIGHT_LIST_SEARCH,
    FLIGHT_FILTER
} from '../../actions/types'

const filterFlights = (params) =>{
    let filteredResults = [];
    if(params.data && params.data.length){
        filteredResults = [...params.data].filter((flightItem, index)=>{   
            const cobinFilter = params.filterItems.filterFlightCabin.length ? params.filterItems.filterFlightCabin.indexOf(flightItem.cabinClass.name): 1;
            if(
                (params.filterItems.filterAirlines.length === 0 || params.filterItems.filterAirlines.includes(flightItem.airline.code))
                && 
                (params.filterItems.filterTime.length === 0 || params.filterItems.filterTime.some(time => Number(time.split('-')[0]) <= moment(flightItem.departureTime).format('H') & Number(time.split('-')[1]) > moment(flightItem.departureTime).format('H')))
                &&
                (params.filterItems.filterPriceValue.length === 0 || ((flightItem.adultPrice) ? (flightItem.adultPrice >= params.filterItems.filterPriceValue[0]) : true))
                &&
                (params.filterItems.filterPriceValue.length === 0 || ((flightItem.adultPrice) ? (flightItem.adultPrice <= params.filterItems.filterPriceValue[1]) : true))
                &&
                (params.filterItems.filterFlightType.length === 0 || params.filterItems.filterFlightType.includes(flightItem.flightType))
                &&
                (params.filterItems.filterFlightCabin.length === 0 || cobinFilter > 0 || cobinFilter === 0 )

                ){
                return true;
            }
            else
            {
                return false;
            }
        });
    }
    // return filteredResults
    return sortHandler(params.sortFactor, filteredResults);
}

const sortHandler =(sortFactor, flights)=>{
    let sortedList;
    switch (sortFactor){
        case "LowPrice":
            sortedList = [...flights].sort((a, b)=>{
                if(!b.isAvailability){
                    return -1
                }
                else if(a.adultPrice && b.adultPrice){
                    return a.adultPrice - b.adultPrice
                }else if(a.adultPrice){
                    return -1
                }else{
                    return 1
                }                   
            });
            break;
        case "HighPrice":
            sortedList = [...flights].sort((a, b)=>{
                if(!a.isAvailability){
                    return 1
                }
                else if(a.adultPrice && b.adultPrice){
                    return b.adultPrice - a.adultPrice
                }else if(b.adultPrice){
                    return -1
                }else{
                    return 1
                }                   
            });
            break;
        case "departureTime":
            sortedList = [...flights].sort((a, b)=>{
                if(a.departureTime && b.departureTime){
                    return new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime()
                }else if(b.adultPrice){
                    return 1
                }else{
                    return -1
                }                   
            });
            break;
        default:
            sortedList = [...flights]
    }
    return sortedList
    // setFilteredFlightList(sortedList);
    // setSortFactor(sortFactor)
}

const flightListSearch = (state = {}, action) => {
    switch (action.type) {
        case FLIGHT_LIST_SEARCH:
            return sortHandler(action.payload.sortFactor, action.payload.data)
        case FLIGHT_FILTER:
            return filterFlights(action.payload)
        default:
            return state;
    }
}

export default flightListSearch;