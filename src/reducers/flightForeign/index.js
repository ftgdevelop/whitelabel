import sortBy from "lodash/sortBy";
import reverse from "lodash/reverse";
import groupBy from "lodash/groupBy";
import minBy from "lodash/minBy";
import maxBy from "lodash/maxBy";
import { Types } from "../../actions/flight/types";
import FilterTime from "../../components/Flight/FlightListForeign/FlightListForeignFilter/FilterTime";
import moment from "moment-jalaali";

const initState = {
  error: null,
  keyAvailability: null,
  allFlights: [],
  flights: [],
  fetchingKey: false,
  isCompleted: false,
  loadingFetchFlight: false,
  flightTotal: 0,
  sortby: "LowPrice",
  airlines: [],
  airports: [],
  minPrice: null,
  maxPrice: null,
  filterAirlines: [],
  filterAirports: [],
  filtersNumberOfStop: null,
  filterPriceValue: [null, null],
  filterMinPrice: null,
  filterMaxPrice: null,
  filtersTime: [],
  pathSelected: [],
  rulles: [],
  loadingRulles: false,
  loadingGetValidate: "",
  flightSelected: "",
  keyValidate: "",
  loadingPostValidate: false,
  countries: [],
  loadingPreReserve: false,
  PreReserveData: "",
  GetReserveData: "",
  loadingGetReserve: false,
  confirmLoading: false,
  confirmData: "",
  confirmError: "",
  confirmComplete: 0,
  vocherLoading: false,
  vocherData: "",
};

const sort = (flights, sortBase) => {
  switch (sortBase) {
    case "LowPrice":
      return sortBy(flights, [
        function (flight) {
          return flight.airItineraryPricingInfo.totalFare.totalFare;
        },
      ]);
    case "HighPrice":
      return reverse(
        sortBy(flights, [
          function (flight) {
            return flight.airItineraryPricingInfo.totalFare.totalFare;
          },
        ])
      );
    case "departureTime":
      return sortBy(flights, [
        function (flight) {
          return flight.airItinerary.originDestinationOptions[0]
            .journeyDuration;
        },
      ]);

    default:
      return flights;
  }
};

const getAirlines = (flights) => {
  const list = groupBy(
    flights,
    (flight) =>
      flight.airItinerary.originDestinationOptions[0].flightSegments[0]
        .marketingAirline.code
  );
  return list;
};

const getAirlinesFlight = (flights) => {
  const list = flights.airItinerary.originDestinationOptions[0].flightSegments.map(
    (flight) => flight.marketingAirline.code
  );
  return [...new Set(list)];
};

const getAirports = (flights) => {
  const list = groupBy(
    flights,
    (flight) =>
      flight.airItinerary.originDestinationOptions[0].flightSegments[0]
        .departureAirport.code
  );
  return list;
};

const getAirportsFlight = (flights) => {
  const list = flights.airItinerary.originDestinationOptions[0].flightSegments.map(
    (flight) => flight.departureAirport.code
  );
  return [...new Set(list)];
};

const getMinPrice = (flights) => {
  if (flights.length) {
    const flight = minBy(
      flights,
      (flight) => flight.airItineraryPricingInfo.totalFare.totalFare
    );
    return flight.airItineraryPricingInfo.totalFare.totalFare;
  }
  return 0;
};

const getMaxPrice = (flights) => {
  if (flights.length) {
    const flight = maxBy(
      flights,
      (flight) => flight.airItineraryPricingInfo.totalFare.totalFare
    );
    return flight.airItineraryPricingInfo.totalFare.totalFare;
  }
  return 0;
};

const getStopsFlight = (flights) => {
  let number = 0;
  const list = flights.airItinerary.originDestinationOptions.map((flight) => {
    if (flight.flightSegments.length > number)
      number = flight.flightSegments.length;
  });
  return number ? number : null;
};

const getTimeFlight = (flights, filtersTime) => {
  // (params.filterItems.filterTime.length === 0 || params.filterItems.filterTime.some(time => Number(time.split('-')[0]) <= moment(flightItem.departureTime).format('H') & Number(time.split('-')[1]) > moment(flightItem.departureTime).format('H')))
  const departureTime = moment(
    flights.airItinerary.originDestinationOptions[0].flightSegments[0]
      .departureDateTime
  ).format("H");
  return filtersTime.some(
    (time) =>
      (Number(time.split("-")[0]) <= departureTime) &
      (Number(time.split("-")[1]) > departureTime)
  );
};

const filterFlights = (state) => {
  const {
    allFlights,
    filterAirlines,
    filterAirports,
    filtersNumberOfStop,
    filterMinPrice,
    filterMaxPrice,
    filtersTime,
    sortby,
  } = state;
  let filteredResults = [];

  if (allFlights && allFlights.length) {
    filteredResults = [...allFlights].filter((flightItem, index) => {
      const price = flightItem.airItineraryPricingInfo.totalFare.totalFare;

      const airlines = getAirlinesFlight(flightItem);
      const foundAirlines = filterAirlines.length
        ? filterAirlines.find((val) => airlines.includes(val))
        : "";

      const airports = getAirportsFlight(flightItem);
      const foundAirports = filterAirports.length
        ? filterAirports.find((val) => airports.includes(val))
        : "";

      const stops = filtersNumberOfStop ? getStopsFlight(flightItem) : null;
      const time = FilterTime ? getTimeFlight(flightItem, filtersTime) : null;

      if (
        (filterAirlines.length === 0 || foundAirlines) &&
        // &&
        (filtersTime.length === 0 || time) &&
        ((filterMinPrice == null && filterMaxPrice == null) ||
          (price >= filterMinPrice && filterMaxPrice >= price)) &&
        (filterAirports.length === 0 || foundAirports) &&
        (filtersNumberOfStop === null || filtersNumberOfStop >= stops)
        // (params.filterItems.filterFlightType.length === 0 || params.filterItems.filterFlightType.includes(flightItem.flightType))
        // &&
        // (params.filterItems.filterFlightCabin.length === 0 || cobinFilter > 0 || cobinFilter === 0 )
      ) {
        return true;
      } else {
        return false;
      }
    });
  }
  // return filteredResults
  return sort(filteredResults, sortby);
};

function flightForeign(state = initState, action) {
  switch (action.type) {
    case Types.FETCH_FLIGHTS_KEY:
      return {
        ...state,
        fetchingKey: true,
        flights: [],
        allFlights: [],
        isCompleted: false,
        flightTotal: 0,
        pathSelected: [],
      };

    case Types.FETCH_FLIGHTS_KEY_SUCCESS:
      return {
        ...state,
        fetchingKey: false,
        keyAvailability: action.response.data,
      };

    case Types.FETCH_FLIGHTS_KEY_ERROR:
      return {
        ...state,
        fetchingKey: false,
        error: action.error,
        isCompleted: true,
      };
    case Types.FETCH_FLIGHTS: {
      return {
        ...state,
        loadingFetchFlight: true,
      };
    }

    case Types.FETCH_FLIGHTS_SUCCESS:
      const flights = [
        ...state.allFlights,
        ...action.response.data.availability,
      ];

      return {
        ...state,
        loadingFetchFlight: false,
        allFlights: flights,
        isCompleted: action.response.data.isCompleted,
        flightTotal: flights.length,
        flights: sort(flights, state.sortby),
        airlines: getAirlines(flights),
        airports: getAirports(flights),
        minPrice: getMinPrice(flights),
        maxPrice: getMaxPrice(flights),
      };

    case Types.FETCH_FLIGHTS_ERROR:
      return {
        ...state,
        error: action.error,
        isCompleted: true,
        loadingFetchFlight: false,
      };

    case Types.CLEARE_FLIGHTS:
      return {
        ...state,
        flights: [],
        keyAvailability: null,
      };

    case Types.SORT:
      return {
        ...state,
        sortby: action.data.sortby,
      };

    case Types.FLIGHT_SORT:
      return {
        ...state,
        flights: sort(state.flights, state.sortby),
      };

    case Types.FILTER:
      return {
        ...state,
        [action.data.field]: action.data.data,
      };

    case Types.DO_FILTER:
      return {
        ...state,
        flights: filterFlights(state),
      };

    case Types.FETCH_PATH_SUCCESS:
      const data = action.response.data.find(
        (item) => item.code === action.response.values
      );
      return {
        ...state,
        pathSelected: [...state.pathSelected, data],
      };
    case Types.FETCH_PATH_ERROR:
      return {
        ...state,
        error: action.error,
      };

    case Types.FETCH_RULLES:
      return {
        ...state,
        rulles: [],
        loadingRulles: true,
      };
    case Types.FETCH_RULLES_SUCCESS:
      return {
        ...state,
        rulles: action.response.data.length
          ? action.response.data[0].rules
          : [],
        loadingRulles: false,
      };
    case Types.FETCH_RULLES_ERROR:
      return {
        ...state,
        error: action.error,
        loadingRulles: false,
      };

    case Types.FETCH_VALIDATE:
      return {
        ...state,
        flightSelected: "",
        loadingGetValidate: true,
      };
    case Types.FETCH_VALIDATE_SUCCESS:
      return {
        ...state,
        flightSelected: action.response.data,
        loadingGetValidate: false,
      };
    case Types.FETCH_VALIDATE_ERROR:
      return {
        ...state,
        error: action.error,
        loadingGetValidate: false,
      };

    case Types.POST_VALIDATE:
      return {
        ...state,
        keyValidate: "",
        loadingPostValidate: true,
      };
    case Types.POST_VALIDATE_SUCCESS:
      return {
        ...state,
        keyValidate: action.response.data.preReserveKey,
        loadingPostValidate: false,
      };
    case Types.POST_VALIDATE_ERROR:
      return {
        ...state,
        error: action.error,
        loadingPostValidate: false,
      };
    case Types.RESET:
      return {
        ...state,
        keyValidate: "",
      };

    case Types.FETCH_COUNTRIES:
      return {
        ...state,
        countries: [],
      };
    case Types.FETCH_COUNTRIES_SUCCESS:
      return {
        ...state,
        countries: action.response.data.items,
      };
    case Types.FETCH_COUNTRIES_ERROR:
      return {
        ...state,
        error: action.error,
      };

    case Types.POST_PRE_RESERVE:
      return {
        ...state,
        loadingPreReserve: true,
        PreReserveData: "",
      };
    case Types.POST_PRE_RESERVE_SUCCESS:
      return {
        ...state,
        PreReserveData: action.response.data,
        loadingPreReserve: false,
      };
    case Types.POST_PRE_RESERVE_ERROR:
      return {
        ...state,
        error: action.error,
        loadingPreReserve: false,
      };

    case Types.GET_RESERVE:
      return {
        ...state,
        loadingGetReserve: true,
        GetReserveData: "",
      };
    case Types.GET_RESERVE_SUCCESS:
      return {
        ...state,
        GetReserveData: action.response.data,
        loadingGetReserve: false,
      };
    case Types.GET_RESERVE_ERROR:
      return {
        ...state,
        error: action.error,
        loadingGetReserve: false,
      };
    case Types.RESET_FILTER:
      return {
        ...state,
        filterAirlines: [],
        filterAirports: [],
        filtersNumberOfStop: null,
        filterPriceValue: [null, null],
        filterMinPrice: state.minPrice,
        filterMaxPrice: state.maxPrice,
        filtersTime: [],
      };

    case Types.GET_CONFIRM:
      return {
        ...state,
        confirmLoading: true,
      };
    case Types.GET_CONFIRM_SUCCESS:
      return {
        ...state,
        confirmLoading: action.response.data.isCompleted ? false : true,
        confirmData: action.response.data,
        confirmComplete: !action.response.data.isCompleted
          ? state.confirmComplete + 1
          : 0,
      };
    case Types.GET_CONFIRM_ERROR:
      return {
        ...state,
        confirmComplete: !action.response.data.isCompleted
          ? state.confirmComplete + 1
          : 0,
      };

    case Types.GET_VOCHER:
      return {
        ...state,
        vocherLoading: true,
        vocherData: "",
      };
    case Types.GET_VOCHER_SUCCESS:
      return {
        ...state,
        vocherLoading: false,
        vocherData: action.response.data,
      };
    case Types.GET_VOCHER_ERROR:
      return {
        ...state,
        vocherLoading: false,
      };

    default:
      return state;
  }
}

export default flightForeign;
