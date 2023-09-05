import axios from 'axios'
import { truncate } from 'lodash'
import { useState } from 'react'
import { Types } from './types'

const url = 'https://busdomestic.safaraneh.com'
const apis = {
  SearchTerminal: '/api/services/app/Terminal/Search',
  Availability: '/api/services/app/BookingBus/Availability',
  getBuses: '/api/services/app/BookingBus/GetAvailability',
  getBusesPath: '/api/services/app/Terminal/GetAll',
  getBusesSeat: '/api/services/app/BookingBus/GetBusSeat',
  getBusValidate: '/api/services/app/BookingBus/Validate',
  getBusPreReserve: '/api/services/app/BookingBus/Reserve',
  getBusReserve: '/api/services/app/Reserve/Get',
  getConfirmBus: '/api/services/app/BookingBus/Confirm',
  getVoucherBus: '/api/services/app/Reserve/GetVoucherPdf',
}

export const FetchSearchTerminal = async (value) => {
  try {
    const res = await axios.post(
      `${url}${apis.SearchTerminal}`,
      { query: value },
      {
        headers: {
          accept: 'text/plain',
          'Accept-Language': 'fa-IR',
          TenantId: 7,
          apikey: process.env.BS_TERMINAL,
        },
      },
    )
    return res
  } catch (error) {
    console.log('error', error)
    return error.response
  }
}

export const FetchKeyBuses = (params) => {
  return {
    type: Types.FETCH_BUSES_KEY,
    successType: Types.FETCH_BUSES_KEY_SUCCESS,
    errorType: Types.FETCH_BUSES_KEY_ERROR,
    isEndpointCall: true,
    endpoint: url + apis.Availability,
    method: 'post',
    data: params,
  }
}

export const FetchBuses = (key) => {
  return {
    type: Types.FETCH_BUSES,
    successType: Types.FETCH_BUSES_SUCCESS,
    errorType: Types.FETCH_BUSES_ERROR,
    isEndpointCall: true,
    endpoint: `${url + apis.getBuses}?key=${key}`,
    method: 'get',
  }
}

export const FetchBusesPath = (origin, destination) => {
  return {
    type: Types.FETCH_BUSES_PATH,
    successType: Types.FETCH_BUSES_PATH_SUCCESS,
    errorType: Types.FETCH_BUSES_PATH_ERROR,
    isEndpointCall: true,
    endpoint: `${url + apis.getBusesPath}?ids=${origin}&ids=${destination}`,
    method: 'get',
  }
}

export const ChangeSort = (sortby) => {
  return {
    type: Types.SORT,
    isEndpointCall: false,
    data: {
      sortby,
    },
  }
}

export const Filter = (field, data) => {
  return {
    type: Types.FILTER,
    isEndpointCall: false,
    data: {
      data,
      field,
    },
  }
}

export const DoFilter = () => {
  return {
    type: Types.DO_FILTER,
    isEndpointCall: false,
  }
}

export const reset = () => {
  return {
    type: Types.RESET_BUS_LIST,
    isEndpointCall: false,
    
  }
}

export const FetchBusesSeat = (departureKey) => {
  let encoded = encodeURIComponent(departureKey)
   return {
    type: Types.FETCH_BUSES_SEAT,
    successType: Types.FETCH_BUSES_SEAT_SUCCESS,
    errorType: Types.FETCH_BUSES_SEAT_ERROR,
    isEndpointCall: true,
    endpoint: `${url + apis.getBusesSeat}?DepartureKey=${encoded}`,
    method: 'get',
    values: {
      departureKey: encoded,
    },
  }
}

export const FetchBusesValidate = (departureKey) => {
  let encoded = encodeURIComponent(departureKey)
  return {
    type: Types.FETCH_BUSES_VALIDATE,
    successType: Types.FETCH_BUSES_VALIDATE_SUCCESS,
    errorType: Types.FETCH_BUSES_VALIDATE_ERROR,
    isEndpointCall: true,
    endpoint: `${url + apis.getBusValidate}`,
    method: 'post',
    data: {
      departureKey: departureKey,
    },
    values: {
      departureKey: encoded,
    },
  }
}

export const FetchPreReserve = async (value) => {
  try {
    const res = await axios.post(
      `${url}${apis.getBusPreReserve}`,
      value,
      {
        headers: {
          'Content-Type': 'application/json',
          accept: 'text/plain',
          'Accept-Language': 'fa-IR',
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.BS_TERMINAL,
        },
      }
    )
    return res
  } catch (error) {
    console.log('error', error)
    return error.response
  }
}

export const GetReserveBus = async (id, username) => {
  try {
    const res = await axios.get(
      `${url}${apis.getBusReserve}?ReserveId=${id}&Username=${username}`,
      {
        headers: {
          'Content-Type': 'application/json',
          accept: 'text/plain',
          'Accept-Language': 'fa-IR',
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.BS_TERMINAL,
        },
      }
    )
    return res
  } catch (error) {
    console.log('error', error)
    return error.response
  }
}

export const GetConfirm = async (value) => {
  try {
    const res = await axios.post(
      `${url}${apis.getConfirmBus}`,
      value,
      {
        headers: {
          'Content-Type': 'application/json',
          accept: 'text/plain',
          'Accept-Language': 'fa-IR',
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.BS_TERMINAL,
        },
      }
    )
    return res
  } catch (error) {
    console.log('error', error)
    return error.response
  }
}

export const GetVoucherBusPdf = async (id, username) => {
  const portalApiKey = window.localStorage.portalApiKey
  const token = localStorage.getItem('Token')
  try {
    const res = await axios.get(
      `https://hotelv2.safaraneh.com/${apis.getVoucherBus}?ReserveId=${id}&Username=${username}`,
      {
        headers: {
          'Content-Type': 'application/json',
          accept: 'text/plain',
          'Accept-Language': 'fa-IR',
          Authorization: `Bearer ${token}`,
          TenantId: process.env.ABP_TENANT_ID,
          apikey: portalApiKey,
        },
      },
    )
    return res
  } catch (error) {
    console.log('error', error)
    return error.response
  }
}