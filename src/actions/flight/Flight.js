import axios from "axios";
import { useState } from "react";
import { Types } from "./types";

const url = "https://flight.safaraneh.com";
const apis = {
  GetAirports: "/api/services/app/BookingFlight/GetAirports",
  Availability: "/api/services/app/BookingFlight/Availability",
  getFlights: "/api/services/app/BookingFlight/GetAvailability",
  GetAllAirports: "/api/services/app/Airport/GetAll",
  GetRules: "/api/services/app/BookingFlight/GetRules",
  GetValidate: "/api/services/app/BookingFlight/GetValidate",
  Validate: "/api/services/app/BookingFlight/Validate",
  GetCountries: "/api/services/app/Country/GetAll",
  PreReserve: "/api/services/app/BookingFlight/PreReserve",
  GetReserve: "/api/services/app/Reserve/Get",
  GetConfirm: "/api/services/app/BookingFlight/Confirm",
  GetVoucherPdf: "/api/services/app/Reserve/GetVoucherPdf",
};

export const GetAirports = async (value) => {
  const token = localStorage.getItem("Token");
  try {
    const res = await axios.get(`${url}${apis.GetAirports}?value=${value}`, {
      headers: {
        accept: "text/plain",
        "Accept-Language": "fa-IR",
        TenantId: process.env.ABP_TENANT_ID,
        apikey: process.env.BS_TERMINAL,
      },
    });
    return res;
  } catch (error) {
    console.log("error", error);
    return error.response;
  }
};

export const reset = () => {
  return {
    type: Types.RESET,
    isEndpointCall: false,
  };
};

export const FetchKeyFlights = (params) => {
  return {
    type: Types.FETCH_FLIGHTS_KEY,
    successType: Types.FETCH_FLIGHTS_KEY_SUCCESS,
    errorType: Types.FETCH_FLIGHTS_KEY_ERROR,
    isEndpointCall: true,
    endpoint: `${url}${apis.Availability}`,
    method: "post",
    data: params,
  };
};

export const FetchPath = (code) => {
  return {
    type: Types.FETCH_PATH,
    successType: Types.FETCH_PATH_SUCCESS,
    errorType: Types.FETCH_PATH_ERROR,
    isEndpointCall: true,
    endpoint: `${url}${apis.GetAirports}?value=${code}`,
    method: "get",
    valuesCount: code,
  };
};

export const FetchFlights = (key) => {
  return {
    type: Types.FETCH_FLIGHTS,
    successType: Types.FETCH_FLIGHTS_SUCCESS,
    errorType: Types.FETCH_FLIGHTS_ERROR,
    isEndpointCall: true,
    endpoint: `${url}${apis.getFlights}?key=${key}`,
    method: "get",
  };
};

export const FetchAllAirports = (params) => {
  return {
    type: Types.FETCH_ALL_AIRPORTS,
    successType: Types.FETCH_ALL_AIRPORTS_SUCCESS,
    errorType: Types.FETCH_ALL_AIRPORTS_ERROR,
    isEndpointCall: true,
    endpoint: `${url}${apis.GetAllAirports}?Codes=${THR}&Codes=${AZD}&AirportTypes=Main`,
    method: "get",
  };
};

export const FetchRulles = (key) => {
  return {
    type: Types.FETCH_RULLES,
    successType: Types.FETCH_RULLES_SUCCESS,
    errorType: Types.FETCH_RULLES_ERROR,
    isEndpointCall: true,
    endpoint: `${url}${apis.GetRules}?key=${key}`,
    method: "get",
  };
};

export const FlightSort = () => {
  return {
    type: Types.FLIGHT_SORT,
    isEndpointCall: false,
  };
};

export const ChangeSort = (sortby) => {
  return {
    type: Types.SORT,
    isEndpointCall: false,
    data: {
      sortby,
    },
  };
};

export const Filter = (field, data) => {
  return {
    type: Types.FILTER,
    isEndpointCall: false,
    data: {
      data,
      field,
    },
  };
};

export const DoFilter = () => {
  return {
    type: Types.DO_FILTER,
    isEndpointCall: false,
  };
};

export const PostValidate = (key) => {
  return {
    type: Types.POST_VALIDATE,
    successType: Types.POST_VALIDATE_SUCCESS,
    errorType: Types.POST_VALIDATE_ERROR,
    isEndpointCall: true,
    endpoint: `${url}${apis.Validate}`,
    method: "post",
    data: key,
  };
};

export const FetchValidate = (key) => {
  return {
    type: Types.FETCH_VALIDATE,
    successType: Types.FETCH_VALIDATE_SUCCESS,
    errorType: Types.FETCH_VALIDATE_ERROR,
    isEndpointCall: true,
    endpoint: `${url}${apis.GetValidate}?preReserveKey=${key}`,
    method: "get",
  };
};

export const FetchCountries = () => {
  return {
    type: Types.FETCH_COUNTRIES,
    successType: Types.FETCH_COUNTRIES_SUCCESS,
    errorType: Types.FETCH_COUNTRIES_ERROR,
    isEndpointCall: true,
    endpoint: `${url}${apis.GetCountries}?MaxResultCount=500`,
    method: "get",
  };
};

export const PreReserve = (data) => {
  return {
    type: Types.POST_PRE_RESERVE,
    successType: Types.POST_PRE_RESERVE_SUCCESS,
    errorType: Types.POST_PRE_RESERVE_ERROR,
    isEndpointCall: true,
    endpoint: `${url}${apis.PreReserve}`,
    method: "post",
    data: data,
  };
};

export const GetReserve = (id, username) => {
  return {
    type: Types.GET_RESERVE,
    successType: Types.GET_RESERVE_SUCCESS,
    errorType: Types.GET_RESERVE_ERROR,
    isEndpointCall: true,
    endpoint: `${url}${apis.GetReserve}?reserveId=${id}&username=${username}`,
    method: "get",
  };
};

export const resetFilter = () => {
  return {
    type: Types.RESET_FILTER,
    isEndpointCall: false,
  };
};

export const GetConfirm = (id, username) => {
  return {
    type: Types.GET_CONFIRM,
    successType: Types.GET_CONFIRM_SUCCESS,
    errorType: Types.GET_CONFIRM_ERROR,
    isEndpointCall: true,
    endpoint: `${url}${apis.GetConfirm}`,
    method: "post",
    data: {
      reserveId: id,
      username: username,
    },
  };
};

export const GetVoucherPdf = (id, username) => {
  return {
    type: Types.GET_VOCHER,
    successType: Types.GET_VOCHER_SUCCESS,
    errorType: Types.GET_VOCHER_ERROR,
    isEndpointCall: true,
    endpoint: `${url}${apis.GetVoucherPdf}?reserveId=${id}&username=${username}`,
    method: "get",
  };
};
