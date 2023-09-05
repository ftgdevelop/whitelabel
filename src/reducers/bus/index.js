import sortBy from 'lodash/sortBy'
import reverse from 'lodash/reverse'
import groupBy from 'lodash/groupBy'
import minBy from 'lodash/minBy'
import maxBy from 'lodash/maxBy'
import { Types } from '../../actions/bus/types'
import moment from 'moment-jalaali'

const initState = {
  loadingTerminals: false,
  terminals: [],
  buses: [],
  allBuses: [],
  keyAvailability: '',
  loadingPath: false,
  paths: [],
  isCompleted: true,
  reFetch: 0,
  sortby: 'LowPrice',
  offices: [],
  providers: [],
  filterOffices: [],
  filterProviders: [],
  filterTime: [],
  filterMinPrice: null,
  filterMaxPrice: null,
  seatInfo: [],

  loadingValidate: null,
  preReserveKey: null,
}

const sort = (busList, sortBase) => {
  switch (sortBase) {
    case 'LowPrice':
      return sortBy(busList, [
        function (bus) {
          return bus.salePrice
        },
      ])
    case 'HighPrice':
      return reverse(
        sortBy(busList, [
          function (bus) {
            return bus.salePrice
          },
        ]),
      )
    case 'departureTime':
      return sortBy(busList, [
        function (bus) {
          return bus.departureDateTime
        },
      ])

    default:
      return busList
  }
}

const getAffices = (buses) => {
  const list = groupBy(buses, (bus) => bus.office.id)
  return list
}

const getProviders = (buses) => {
  const list = groupBy(buses, (bus) => bus.source.providerId)
  return list
}

const getMinPrice = (buses) => {
  if (buses.length) {
    const bus = minBy(buses, (bus) => bus.salePrice)
    return bus.salePrice
  }
  return 0
}

const getMaxPrice = (buses) => {
  if (buses.length) {
    const bus = maxBy(buses, (bus) => bus.salePrice)
    return bus.salePrice
  }
  return 0
}

const getTimeFlight = (flights, filterTime) => {
  const departureTime = moment(flights.departureDateTime).format('H')
  return filterTime.some(
    (time) =>
      (Number(time.split('-')[0]) <= departureTime) &
      (Number(time.split('-')[1]) > departureTime),
  )
}

const filterFlights = (state) => {
  const {
    allBuses,
    filterProviders,
    filterOffices,
    filterTime,
    // filterAirports,
    // filtersNumberOfStop,
    filterMinPrice,
    filterMaxPrice,
    // filterTime,
    sortby,
  } = state
  let filteredResults = []

  if (allBuses && allBuses.length) {
    filteredResults = [...allBuses].filter((busItem, index) => {
      const price = busItem.salePrice
      const foundOffices = filterOffices.includes(busItem.office.id)
      const foundProviders = filterProviders.includes(busItem.source.id)
      const time = filterTime ? getTimeFlight(busItem, filterTime) : null

      if (
        (filterOffices.length === 0 || foundOffices) &&
        (filterTime.length === 0 || time) &&
        ((filterMinPrice == null && filterMaxPrice == null) ||
          (price >= filterMinPrice && filterMaxPrice >= price)) &&
        (filterProviders.length === 0 || foundProviders)
      ) {
        return true
      } else {
        return false
      }
    })
  }
  return sort(filteredResults, sortby)
}

function bus(state = initState, action) {
  switch (action.type) {
    case Types.FETCH_SEARCH_TERMINAL:
      return {
        ...state,
        loadingTerminals: true,
        terminals: [],
      }
    case Types.FETCH_SEARCH_TERMINAL_SUCCESS:
      return {
        ...state,
        loadingTerminals: false,
        terminals: action.response.data,
      }
    case Types.FETCH_SEARCH_TERMINAL_ERROR:
      return {
        ...state,
        loadingTerminals: false,
      }

    /****************************************** */
    case Types.FETCH_BUSES_KEY:
      return {
        ...state,
        keyAvailability: '',
        loadingFetchData: true,
        buses: [],
        allBuses: [],
        total: 0,
        reFetch: 0,
        offices: [],
        providers: [],
        minPrice: 0,
        maxPrice: 0,
        filterOffices: [],
        filterProviders: [],
        filterTime: [],
        filterMinPrice: null,
        filterMaxPrice: null,
        paths: [],
        preReserveKey: null,
        loadingValidate: null,
      }
    case Types.FETCH_BUSES_KEY_SUCCESS:
      return {
        ...state,
        keyAvailability: action.response.data,
      }
    case Types.FETCH_BUSES_KEY_ERROR:
      return {
        ...state,
        loadingFetchData: false,
      }
    /**************************************** */

    /******************************************* */
    case Types.FETCH_BUSES:
      return {
        ...state,
        loadingFetchData: true,
      }
    case Types.FETCH_BUSES_SUCCESS:
      const buses = [...state.buses, ...action.response.data.availabilities]
      return {
        ...state,
        loadingFetchData: !action.response.data.isCompleted,
        isCompleted: action.response.data.isCompleted,
        allBuses: buses,
        buses: sort(buses, state.sortby),
        reFetch: action.response.data.isCompleted ? 0 : state.reFetch + 1,
        total: buses.length,
        totalAll: buses.length,
        offices: getAffices(buses),
        providers: getProviders(buses),
        minPrice: getMinPrice(buses),
        maxPrice: getMaxPrice(buses),
      }
    case Types.FETCH_BUSES_ERROR:
      return {
        ...state,
        loadingFetchData: false,
      }
    /********************************************** */
    case Types.FETCH_BUSES_PATH:
      return {
        ...state,
        loadingPath: true,
        paths: [],
      }
    case Types.FETCH_BUSES_PATH_SUCCESS:
      return {
        ...state,
        loadingPath: false,
        paths: action.response.data.items,
      }
    case Types.FETCH_BUSES_PATH_ERROR:
      return {
        ...state,
        loadingPath: false,
      }

    /********************************************** */
    case Types.FETCH_BUSES_SEAT:
     
      const newItem = {
        loading: true,
        data: null,
        departureKey: action.values.departureKey,
      }

      return {
        ...state,
        seatInfo: [...state.seatInfo, newItem],
      }

    case Types.FETCH_BUSES_SEAT_SUCCESS:
      const items = [...state.seatInfo]
   
      const index = items.findIndex(
        (bus) => bus.departureKey === action.response.values.departureKey,
      )

      items[index].data = action.response.data
      items[index].loading = false

      return {
        ...state,
        seatInfo: items,
      }

    case Types.FETCH_BUSES_SEAT_ERROR:
      const items1 = [...state.seatInfo]
      const index1 = items1.findIndex(
        (bus) => bus.departureKey === action.values.departureKey,
      )
      items1[index1].loading = false

      return {
        ...state,
        seatInfo: items1,
      }

    /*********************************************** */
    case Types.FETCH_BUSES_VALIDATE:
      return {
        ...state,
        loadingValidate: action.values.departureKey,
      }

    case Types.FETCH_BUSES_VALIDATE_SUCCESS:
      return {
        ...state,

        preReserveKey: action.response.data.preReserveKey,
      }

    case Types.FETCH_BUSES_VALIDATE_ERROR:
      return {
        ...state,
        loadingValidate: null,
      }
    /*************************************************** */
    case Types.SORT:
      return {
        ...state,
        sortby: action.data.sortby,
        buses: sort(state.buses, action.data.sortby),
      }
    /************************************************ */
    case Types.DO_FILTER:
      return {
        ...state,
        buses: filterFlights(state),
      }

    case Types.FILTER:
      return {
        ...state,
        [action.data.field]: action.data.data,
      }
    /******************************** */
    case Types.RESET_BUS_LIST:
      return {
        ...state,
        preReserveKey: null,
        busList: [],
        keyAvailability: '',
      }

    default:
      return state
  }
}

export default bus
