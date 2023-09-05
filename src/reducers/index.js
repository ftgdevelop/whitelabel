import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import auth from "./auth";
import statusRegister from "./auth/statusRegister";
import hotelReducer from "./hotel";
import portalReducer from "./portal";
import flightListSearch from "./flights/flightListSearch";
import airlineList from "./flights/airlines";
import filterFlights from "./flights/filterFlights";
import flightSelected from "./flights/flightSelected";
import minMaxPrices from "./flights/minMaxPrices";
import dateInfo from "./flights/checkout/dateInfo";
import creditAmount from "./auth/wallet";
import currency from "./currency";
import flightForeign from "./flightForeign";
import bus from "./bus";
export default combineReducers({
  // form: formReducer,
  auth,
  statusRegister,
  hotel: hotelReducer,
  flightListSearch,
  airlineList,
  filterFlights,
  flightSelected,
  minMaxPrices,
  portal: portalReducer,
  dateInfo,
  creditAmount,
  currency,
  flightForeign,
  bus,
});
