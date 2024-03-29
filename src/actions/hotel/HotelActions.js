import axios from 'axios'
import { Request } from "../../../helpers/api/request";

import { HOTEL } from "../types";

export const getInteriorHotels = (params, currentLang = "fa") => {
  return async (dispatch) => {
    dispatch({ type: HOTEL.GET_INTERIOR_LIST.REQUEST });
    const response = Request.post(
      "https://api.safaraneh.com/v2/Entity/Autocomplete2",
      params,
      {
        // key: "63627a81755443e89bcca3aa73044e60",
        apikey: process.env.GET_PORTAL_API_KEY,
        "Accept-Language": `${currentLang === "fa" ? "fa-IR" : "ar-AE"}`,
      }
    );

    if (response && response.ok)
      dispatch({ type: HOTEL.GET_INTERIOR_LIST.SUCCESS });
    else dispatch({ type: HOTEL.GET_INTERIOR_LIST.ERROR });

    return response;
  };
};

export const getExteriorHotels = (params) => {
  return async (dispatch) => {
    dispatch({ type: HOTEL.GET_EXTERIOR_LIST.REQUEST });
    const response = Request.get(
      "https://hotel.safaraneh.com/api/services/app/BookingHotelInternational/GetLocation",
      params,
      {
        TenantId: process.env.ABP_TENANT_ID,
        apikey: process.env.API_KEY,
      }
    );

    if (response && response.ok)
      dispatch({ type: HOTEL.GET_EXTERIOR_LIST.SUCCESS });
    else dispatch({ type: HOTEL.GET_EXTERIOR_LIST.ERROR });

    return response;
  };
};

export const getHotelDetails = (params, currentLang = "fa") => {
  return async (dispatch) => {
    dispatch({ type: HOTEL.GET_HOTEL_DETAILS.REQUEST });

    const response = Request.get(
      "https://api.safaraneh.com/v2/Hotel/GetHotelById",
      params,
      {
        "Content-Type": "application/json",
        "Accept-Language": `${currentLang === "fa" ? "fa-IR" : "ar-AE"}`,
        TenantId: process.env.ABP_TENANT_ID,
        apikey: process.env.GET_PORTAL_API_KEY,
        currency: "EUR",
      }
    );

    if (response && response.ok)
      dispatch({ type: HOTEL.GET_HOTEL_DETAILS.SUCCESS });
    else dispatch({ type: HOTEL.GET_HOTEL_DETAILS.ERROR });

    return response;
  };
};

export const DomesticHotelV4Search = async (param) => {
  
  const token = localStorage.getItem('Token')
  try {
    let response = await axios.post(
      `https://hotelv4.safaraneh.com/api/services/app/Booking/AvailabilityByHotelId`,
      param,
      {
        headers: {
          accept: 'text/plain',
          'Content-Type': 'application/json',
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.API_KEY,
          Authorization: `Bearer ${token}`,
          Currency: 'IRR'
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}

export const DomesticHotelV4GetRooms = async (params, currentLang = 'fa') => {

  const token = localStorage.getItem('Token')
  try {
    let response = await axios.get(
      `https://hotelv4.safaraneh.com/api/services/app/Booking/GetRoom?Id=${params.hotelId}&CheckIn=${params.checkin}&CheckOut=${params.checkout}`,
      {
        headers: {
          'Content-Type': 'application/json',
          apikey: process.env.API_KEY,
          TenantId: process.env.ABP_TENANT_ID,
          'Accept-Language': `${currentLang === 'fa' ? 'fa-IR' : 'ar-AE'}`,
          Authorization: `Bearer ${token}`,
          Currency: 'IRR'
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}

export const DomesticHotelV4Validate = async (param, currentLang = 'fa') => {
  
  const token = localStorage.getItem('Token')
  try {
    let response = await axios.post(
      "https://hotelv4.safaraneh.com/api/services/app/Booking/Validate",
      param,
      {
        headers: {
          accept: 'text/plain',
          'Content-Type': 'application/json',
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.API_KEY,
          'Accept-Language': `${currentLang === 'fa' ? 'fa-IR' : 'ar-AE'}`,
          Authorization: `Bearer ${token}`,
          Currency: 'IRR'
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}




export const DomesticHotelV4GetValidate = async (key, currentLang = 'fa') => {
  
  const token = localStorage.getItem('Token')
  try {
    let response = await axios.get(
      `https://hotelv4.safaraneh.com/api/services/app/Booking/GetValidate?Id=${key}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': `${currentLang === 'fa' ? 'fa-IR' : 'ar-AE'}`,
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.API_KEY,
          Authorization: `Bearer ${token}`,
          Currency: 'IRR'
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}

export const DomesticHotelV4PreReserve = async (param, currentLang = 'fa') => {

  const token = localStorage.getItem('Token')
  try {
    let response = await axios.post(
      "https://hotelv4.safaraneh.com/api/services/app/Booking/PreReserve",
      param,
      {
        headers: {
          accept: 'text/plain',
          'Content-Type': 'application/json',
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.API_KEY,
          'Accept-Language': `${currentLang === 'fa' ? 'fa-IR' : 'ar-AE'}`,
          Authorization: `Bearer ${token}`,
          Currency: 'IRR'
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}

export const HotelV4DomesticGetReserve = async (reserveId, userName, currentLang = 'fa') => {
  
  const token = localStorage.getItem('Token')
  try {
    let response = await axios.get(`https://hotelv4.safaraneh.com/api/services/app/Reserve/Get?ReserveId=${reserveId}&Username=${userName}`,
      {
        headers: {
          accept: 'text/plain',
          'Content-Type': 'application/json',
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.API_KEY,
          'Accept-Language': `${currentLang === 'fa' ? 'fa-IR' : 'ar-AE'}`,
          Authorization: `Bearer ${token}`,
          Currency: 'IRR'
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}

export const getConfirmHotelV4Domestic = async (reserveId, username) => {
  
  const token = localStorage.getItem('Token')
  try {
    const res = await axios.post(
      `https://hotelv4.safaraneh.com/api/services/app/Booking/Confirm`,
      {
        reserveId: reserveId,
        username: username,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          accept: 'text/plain',
          'Accept-Language': 'fa-IR',
          Authorization: `Bearer ${token}`,
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.API_KEY,
          Currency: 'IRR'
        },
      },
    )
    return res
  } catch (error) {
    console.log('error', error)
    return error.response
  }
}

export const getInteriorHotelsV4 = (params, currentLang = "fa") => {
  return async (dispatch) => {
    dispatch({ type: HOTEL.GET_INTERIOR_LIST.REQUEST });
    const response = Request.post(
      params ? `https://hoteldomesticdata.safaraneh.com/api/services/app/Entity/Search?input=${params}` :
        `https://hoteldomesticdata.safaraneh.com/api/services/app/Entity/Search`,
      null,
      {
        "Accept-Language": `${currentLang === "fa" ? "fa-IR" : "ar-AE"}`,
        // "Host": "hoteldomesticdata.safaraneh.com",
        // "Content-Length": 0
      }
    );
    if (response && response.ok)
      dispatch({ type: HOTEL.GET_INTERIOR_LIST.SUCCESS });
    else dispatch({ type: HOTEL.GET_INTERIOR_LIST.ERROR });

    return response;
  };
};

export const getReserveV4Domestic = async (reserveId, username) => {
  
  const token = localStorage.getItem('Token')
  try {
    const res = await axios.get(
      `https://hotelv4.safaraneh.com/api/services/app/Reserve/Get?ReserveId=${reserveId}&Username=${username}`,
      {
        headers: {
          'Content-Type': 'application/json',
          accept: 'text/plain',
          'Accept-Language': 'fa-IR',
          Authorization: `Bearer ${token}`,
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.API_KEY,
          Currency: 'IRR'
        },
      },
    )
    return res
  } catch (error) {
    console.log('error', error)
    return error.response
  }
}