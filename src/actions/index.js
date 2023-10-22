import axios from 'axios'
import {
  DomesticHotelV4GetRooms,
  DomesticHotelV4Search,
  DomesticHotelV4Validate,
  DomesticHotelV4GetValidate,
  DomesticHotelV4PreReserve,
  HotelV4DomesticGetReserve,
  getConfirmHotelV4Domestic,
  getInteriorHotelsV4
} from './hotel/HotelActions'

const flightdomestic = 'https://flightdomestic.safaraneh.com/api/services/app/'
const crm = 'https://crm.safaraneh.com/api/services/app/'

import {
  AUTH_REGISTER,
  AUTH_ERROR,
  AUTH_SIGN_IN,
  STATUS_REGISTER_MESSAGE,
  HOTEL_LIST,
  HOTEL_INTERIOR_LIST,
  HOTEL_FOREIGN_LIST,
  HOTEL_INTERIOR_DETAILS,
  HOTEL_FOREIGN_DETAILS,
  SEARCH_ENTITY,
  GET_IP_LOCATION,
  GET_CURRENT_USER,
  FLIGHT_LIST_SEARCH,
  SET_AIRLINES,
  FLIGHT_FILTER,
  SET_FILTER_FLIGHT,
  FLIGHT_SELECTED,
  CLEAR_FILTER_FLIGHT,
  MIN_MAX_PRICES,
  PORTAL_DATA,
  SET_CURRENCY,
} from './types'

export const Register = (data, currentLang = 'fa') => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        'https://identity.safaraneh.com/api/services/app/Account/Register',
        data,
        {
          headers: {
            TenantId: process.env.ABP_TENANT_ID,
            apikey: process.env.API_KEY,
            'Accept-Language': `${currentLang === 'fa' ? 'fa-IR' : 'ar-AE'}`,
          },
        },
      )
      console.log('res register', res.data)
      // console.log(res.data.success);

      dispatch({
        type: AUTH_REGISTER,
        payload: res.data.success,
      })
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: 'Email is already in use',
      })

      console.log('error', error)
    }
  }
}

export const SignIn = (data, currentLang = 'fa') => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        'https://identity.safaraneh.com/api/TokenAuth/Login',
        data,
        {
          headers: {
            TenantId: process.env.ABP_TENANT_ID,
            apikey: process.env.API_KEY,
            'Accept-Language': `${currentLang === 'fa' ? 'fa-IR' : 'ar-AE'}`,
          },
        },
      )
      dispatch({
        type: AUTH_SIGN_IN,
        payload: res.data.result.accessToken,
      })
      localStorage.setItem('token', res.data.result.accessToken)
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: 'Email and password not exist',
      })

      console.log('error', error)
    }
  }
}

export const changeStatusRegisterMessage = (params) => ({
  type: STATUS_REGISTER_MESSAGE,
  payload: params,
})

export const HotelList = () => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        'https://api.safaraneh.com/v2/Hotel/SearchHotels',
        {
          CityId: '164',
          IsInstant: null,
          MaxPrice: '20000000',
          SortColumn: 'Priority',
          SortDirection: 'Desc',
          PageSize: '2000',
          PageNumber: '1',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            apikey: process.env.GET_PORTAL_API_KEY,
          },
        },
      )
      dispatch({
        type: HOTEL_LIST,
        payload: res.data.Hotels,
      })
    } catch (error) {
      console.log('error', error)
    }
  }
}

export const HotelInteriorSearchList = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        'https://hotelapi.safaraneh.com/v3/Hotel/Advance/Search',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            key: '63627a81755443e89bcca3aa73044e60',
            apikey: process.env.API_KEY,
          },
        },
      )
      dispatch({
        type: HOTEL_INTERIOR_LIST,
        payload: res.data,
      })
    } catch (error) {
      console.log('error', error)
    }
  }
}

export const HotelForeignSearchList = async (param) => {
  const token = localStorage.getItem('Token')
  try {
    let response = await axios.get(
      `https://hotel.safaraneh.com/api/services/app/BookingHotelInternational/GetSearch?${param}`,
      {
        headers: {
          accept: 'text/plain',
          'Accept-Language': 'en-US',
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
          Authorization: `Bearer ${token}`,
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.API_KEY,
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}

export const HotelDomesticSearchList = async (param, currentLang = 'fa') => {
  try {
    let response = await axios.post(
      `https://api.safaraneh.com/v2/Hotel/SearchHotels`,
      param,
      {
        headers: {
          'Content-Type': 'application/json',
          apikey: process.env.GET_PORTAL_API_KEY,
          // "Accept-Language": "ar-AE",
          'Accept-Language': `${currentLang === 'fa' ? 'fa-IR' : 'ar-AE'}`,
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}
export const GetEntityNameByLocation = async (id, currentLang = 'fa') => {
  try {
    let response = await axios.get(
      `https://api.safaraneh.com/v2/Entity/GetEntityNameByLocation?location=${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': `${currentLang === 'fa' ? 'fa-IR' : 'ar-AE'}`,
          apikey: process.env.GET_PORTAL_API_KEY,
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}
export const GetHotelRate = async (param) => {
  try {
    let response = await axios.get(
      `https://api.safaraneh.com/v2/Comment/GetRates?locationId=${param}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'fa-IR',
          apikey: process.env.GET_PORTAL_API_KEY,
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}

export const HotelRate = async (param) => {
  try {
    let response = await axios.post(
      `https://api.safaraneh.com/v2/Comment/Rates`,
      param,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'fa-IR',
          apikey: process.env.GET_PORTAL_API_KEY,
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}

export const GetDomesticHotelDetails = async (param) => {
  try {
    let response = await axios.get(
      `https://api.safaraneh.com/v2/Hotel/GetHotelByUrl?url=${param}`,
      {
        headers: {
          'Content-Type': 'application/json',
          apikey: process.env.GET_PORTAL_API_KEY,
          'Accept-Language': 'fa-IR',
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}
export const GetDomesticHotelRooms = async (param) => {
  const token = localStorage.getItem('Token')
  try {
    let response = await axios.post(
      `https://hotelv2.safaraneh.com/api/services/app/BookingHotelDomestic/Rooms`,
      param,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'fa-IR',
          Authorization: `Bearer ${token}`,
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.API_KEY,
          currency: 'EUR',
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}


export const GetpageByUrl = async (param, currentLang = 'fa') => {
  try {
    let response = await axios.get(
      `https://api.safaraneh.com/v2/Page/GetPageByUrl?url=${param}&isNewVisitor=true`,
      {
        headers: {
          'Content-Type': 'application/json',
          apikey: process.env.GET_PORTAL_API_KEY,
          'Accept-Language': `${currentLang === 'fa' ? 'fa-IR' : 'ar-AE'}`,
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}
export const GetComments = async (param) => {
  try {
    let response = await axios.get(
      `https://api.safaraneh.com/v2/Comment/GetComments?pageId=${param}`,
      {
        headers: {
          'Content-Type': 'application/json',
          apikey: process.env.GET_PORTAL_API_KEY,
          'Accept-Language': 'fa-IR',
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}
export const GetScore = async (param, currentLang = 'fa') => {
  try {
    let response = await axios.get(
      `https://api.safaraneh.com/v2/Comment/GetScore?pageId=${param}`,
      {
        headers: {
          'Content-Type': 'application/json',
          apikey: process.env.GET_PORTAL_API_KEY,
          // "Accept-Language": "fa-IR",
          'Accept-Language': `${currentLang === 'fa' ? 'fa-IR' : 'ar-AE'}`,
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}
export const InsertComment = async (param) => {
  try {
    let response = await axios.post(
      `https://api.safaraneh.com/v2/Comment/InsertComment`,
      param,
      {
        headers: {
          'Content-Type': 'application/json',
          // apiKey: '88a146de-fca0-4bdf-9899-9d41fdad3a44',
          apikey: process.env.GET_PORTAL_API_KEY,
          'Accept-Language': 'fa-IR',
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}

export const GetAccommodationById = async (id, currentLang = 'fa') => {
  try {
    let response = await axios.get(
      `https://hoteldomesticdata.safaraneh.com/api/services/app/Accommodation/Get?Id=${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          apikey: process.env.API_KEY,
          'Accept-Language': `${currentLang === 'fa' ? 'fa-IR' : 'ar-AE'}`,
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}

export const GetAllFaqById = async (id, currentLang = 'fa') => {
  try {
    let response = await axios.get(
      `https://hoteldomesticdata.safaraneh.com/api/services/app/Faq/GetAll?EntityId=${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          apikey: process.env.API_KEY,
          'Accept-Language': `${currentLang === 'fa' ? 'fa-IR' : 'ar-AE'}`,
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}

export const HotelDomesticSearchList2 = async (param) => {
  
  const token = localStorage.getItem('Token')
  try {
    let response = await axios.post(
      `https://hotelv2.safaraneh.com/api/services/app/BookingHotelDomestic/Hotels`,
      param,
      {
        headers: {
          accept: 'text/plain',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.API_KEY,
          currency: 'EUR',
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}



export const HotelDomesticPreReserve = async (param) => {
  
  const token = localStorage.getItem('Token')
  try {
    let response = await axios.post(
      `https://hotelv2.safaraneh.com/api/services/app/BookingHotelDomestic/PreReserve`,
      param,
      {
        headers: {
          accept: 'text/plain',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.API_KEY,
          currency: 'EUR',
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}

export const GetPreReserve = async (param) => {
  
  const token = localStorage.getItem('Token')
  try {
    let response = await axios.get(
      `https://hotelv2.safaraneh.com/api/services/app/BookingHotelDomestic/GetPreReserve?key=${param}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'fa-IR',
          Authorization: `Bearer ${token}`,
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.API_KEY,
          currency: 'EUR',
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}

export const HotelDomesticReserve = async (param) => {
  
  const token = localStorage.getItem('Token')
  try {
    let response = await axios.post(
      `https://hotelv2.safaraneh.com/api/services/app/BookingHotelDomestic/Reserve`,
      param,
      {
        headers: {
          accept: 'text/plain',
          'Content-Type': 'application/json',
          'Accept-Language': 'fa-IR',
          Authorization: `Bearer ${token}`,
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.API_KEY,
          currency: 'EUR',
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}

export const HotelDomesticGetReserve = async (reserveId, userName) => {
  
  const token = localStorage.getItem('Token')
  try {
    let response = await axios.get(
      `https://hotelv2.safaraneh.com/api/services/app/BookingHotelDomestic/GetReserve2?reserveId=${reserveId}&userName=${userName}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'fa-IR',
          Authorization: `Bearer ${token}`,
          // apikey: '68703d73-c92c-4105-9f71-9f718aaad2cc',
          // 'bs.currency': 'EUR',
          // tenantId: 7
          //'bs.terminal': '02839414-2997-4050-97B6-149F1AF9D67E',
          apikey: process.env.API_KEY,
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}

export const getConfirmHotelDomestic = async (reserveId, username) => {
  
  const token = localStorage.getItem('Token')
  try {
    const res = await axios.post(
      `https://hotelv2.safaraneh.com/api/services/app/BookingHotelDomestic/Confirm2`,
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
        },
      },
    )
    return res
  } catch (error) {
    console.log('error', error)
    return error.response
  }
}

export const GetVoucherHotelDomesticPdf = async (id, username) => {
  
  const token = localStorage.getItem('Token')
  try {
    const res = await axios.get(
      `https://hotelv2.safaraneh.com/api/services/app/Reserve/GetVoucherPdf?ReserveId=${id}&Username=${username}`,
      {
        headers: {
          'Content-Type': 'application/json',
          accept: 'text/plain',
          'Accept-Language': 'fa-IR',
          Authorization: `Bearer ${token}`,
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.API_KEY,
        },
      },
    )
    return res
  } catch (error) {
    console.log('error', error)
    return error.response
  }
}

export const GetGateways = async (reserveId, currentLang = 'fa') => {
  try {
    let response = await axios.get(
      `https://paymentv1.safaraneh.com/api/v1/Reserves/Gateway/GetGateways?ReserveId=${reserveId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': `${currentLang === 'fa' ? 'fa-IR' : 'ar-AE'}`,
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}

export const MakeToken = async (param) => {
  
  try {
    let response = await axios.post(
      `https://paymentv1.safaraneh.com/api/v1/Reserves/Gateway/MakeToken`,
      param,
      {
        headers: {
          accept: 'text/plain',
          'Content-Type': 'application/json',
          'Accept-Language': 'fa-IR',
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.API_KEY,
          currency: 'EUR',
        },
      },
    )
    return response
  } catch (error) {
    console.log(error)
    return error
  }
}

export const GetHotelById = async (param, currentLang = 'fa') => {
  try {
    let response = await axios.get(
      `https://api.safaraneh.com/v2/Hotel/GetHotelById?hotelId=${param}`,
      {
        headers: {
          'Content-Type': 'application/json',
          apikey: process.env.GET_PORTAL_API_KEY,
          'Accept-Language': `${currentLang === 'fa' ? 'fa-IR' : 'ar-AE'}`,
          TenantId: process.env.ABP_TENANT_ID,
          currency: 'EUR',
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}

export const GetPortal = async () => {
  try {
    let response = await axios.get(
      'https://api.safaraneh.com/v2/Portal/GetPortal',
      {
        headers: {
          'Content-Type': 'application/json',
          apikey: process.env.GET_PORTAL_API_KEY,
          'Accept-Language': 'fa-IR',
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}

export const GetForeignHotelById = async (param) => {
  const token = localStorage.getItem('Token')
  try {
    let response = await axios.get(
      `https://hotel.safaraneh.com/api/services/app/BookingHotelInternational/GetHotelById?${param}`,
      {
        headers: {
          apikey: process.env.API_KEY,
          'Content-Type': 'application/json',
          'Accept-Language': 'en-US',
          Authorization: `Bearer ${token}`,
          TenantId: process.env.ABP_TENANT_ID,
          currency: 'IRR',
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}

export const GetCancellationPolicy = async (param) => {
  const token = localStorage.getItem('Token')
  try {
    let response = await axios.get(
      `https://hotel.safaraneh.com/api/services/app/BookingHotelInternational/GetCancellation?${param}`,
      {
        //let response = await axios.get(`https://hotel2.imt.as/api/services/app/BookingHotel/GetCancellationPolicy?${param}`, {
        headers: {
          apikey: process.env.API_KEY,
          'Content-Type': 'application/json',
          'Accept-Language': 'en-US',
          Authorization: `Bearer ${token}`,
          TenantId: process.env.ABP_TENANT_ID,
          currency: 'IRR',
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}

export const foreignPreReserve = async (param) => {
  
  const token = localStorage.getItem('Token')
  try {
    let response = await axios.post(
      `https://hotel.safaraneh.com/api/services/app/BookingHotelInternational/PreReserve`,
      param,
      {
        headers: {
          accept: 'text/plain',
          'Content-Type': 'application/json',
          'Accept-Language': 'fa-IR',
          Authorization: `Bearer ${token}`,
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.API_KEY,
          currency: 'EUR',
        },
      },
    )
    return response
  } catch (error) {
    console.log(error)
    return error
  }
}

export const foreignPreReserveKey = async (param) => {
  const token = localStorage.getItem('Token')
  try {
    let response = await axios.get(
      `https://hotel.safaraneh.com/api/services/app/BookingHotelInternational/GetPreReserveByKey?preReserveKey=${param}`,
      {
        headers: {
          apikey: process.env.API_KEY,
          'Content-Type': 'application/json',
          'Accept-Language': 'en-US',
          Authorization: `Bearer ${token}`,
          TenantId: process.env.ABP_TENANT_ID,
          currency: 'IRR',
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}

export const foreignHotelReserve = async (param) => {
  
  const token = localStorage.getItem('Token')
  try {
    let response = await axios.post(
      `https://hotel.safaraneh.com/api/services/app/BookingHotelInternational/Reserve`,
      param,
      {
        headers: {
          accept: 'text/plain',
          'Content-Type': 'application/json',
          'Accept-Language': 'en-US',
          Authorization: `Bearer ${token}`,
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.API_KEY,
          currency: 'IRR',
        },
      },
    )
    return response
  } catch (error) {
    console.log(error)
    return error
  }
}

export const foreignHotelGetReserveById = async (id, username) => {
  
  const token = localStorage.getItem('Token')
  try {
    let response = await axios.get(
      `https://hotel.safaraneh.com/api/services/app/BookingHotelInternational/GetReserveById?reserveId=${id}&username=${username}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'en-US',
          Authorization: `Bearer ${token}`,
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.API_KEY,
          currency: 'IRR',
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}

export const getAllNationalities = async (param) => {
  const token = localStorage.getItem('Token')
  try {
    let response = await axios.get(
      `https://hotel.safaraneh.com/api/services/app/Country/GetAll?MaxResultCount=500`,
      {
        headers: {
          'Accept-Language': 'fa-IR',
          Authorization: `Bearer ${token}`,
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.API_KEY,
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}

export const GetCipAirPortListPrice = async () => {
  
  try {
    let response = await axios.get(
      `https://api.safaraneh.com/v2/Cip/GetCipAirPortList`,
      {
        headers: {
          'Accept-Language': 'fa-IR',
          apikey: process.env.GET_PORTAL_API_KEY,
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}

export const GetCipAirPortList = async () => {
  try {
    let response = await axios.get(
      `https://cip.safaraneh.com/api/services/app/Airport/GetAll`,
      {
        headers: {
          'Accept-Language': 'fa-IR',
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.API_KEY,
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}

export const GetCipAirPortDetailsByUrl = async (cipUrl) => {
  try {
    let response = await axios.get(
      `https://cip.safaraneh.com/api/services/app/Airport/GetByUrl?Url=${cipUrl}`,
      {
        headers: {
          'Accept-Language': 'fa-IR',
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.API_KEY,
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}

// export const GetCipServicesInfo = async (param) => {
//   ;
//   try {
//     let response = await axios.post(
//       `https://hotelapi.safaraneh.com/V1/Cip/Advance/Services`,
//       param,
//       {
//         headers: {
//           accept: "text/plain",
//           apikey: process.env.GET_PORTAL_API_KEY,
//           "Accept-Language": "fa-IR",
//         },
//       }
//     );
//     return response;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };

export const CipServicesInfoSubmit = async (param) => {
  
  try {
    let response = await axios.post(
      `https://hotelapi.safaraneh.com/V1/Cip/Advance/Reserve2`,
      param,
      {
        headers: {
          apikey: process.env.API_KEY,
          Accept: 'application/json, application/xml, text/json, text/x-json, text/javascript, text/xml',
          'Content-Type': 'Application/json',
          TenantId: process.env.ABP_TENANT_ID,
        },
      },
    )
    return response
  } catch (error) {
    console.log(error)
    return error
  }
}

export const CipGetInformation = async (reserveId, userName) => {
  
  try {
    let response = await axios.get(
      `https://cip.safaraneh.com/api/services/app/Reserve/Get?ReserveId=${reserveId}&Username=${userName}`,
      {
        headers: {
          apikey: process.env.API_KEY,
        },
      },
    )
    return response
  } catch (error) {
    console.log(error)
    return error
  }
}

export const CipConfirm = async (reserveId, userName) => {
  
  try {
    let response = await axios.post(
      `https://hotelapi.safaraneh.com//V1/Cip/Advance/Confirm`,
      { LanguageId: 1, ReserveId: reserveId, username: userName },
      {
        headers: {
          key: '63627a81755443e89bcca3aa73044e60',
          TenantId: process.env.ABP_TENANT_ID,
        },
      },
    )
    return response
  } catch (error) {
    console.log(error)
    return error
  }
}

export const CipAirPortAvailability = async (param) => {
  try {
    let response = await axios.post(
      `https://cip.safaraneh.com/api/services/app/BookingCip/Availability`,
      param,
      {
        headers: {
          'Accept-Language': 'fa-IR',
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.API_KEY,
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}

export const AvailabilityByIataCode = async (param) => {
  try {
    let response = await axios.post(
      `https://cip.safaraneh.com/api/services/app/BookingCip/AvailabilityByIataCode`,
      param,
      {
        headers: {
          'Accept-Language': 'fa-IR',
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.API_KEY,
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}

export const CipBookingValidate = async (param) => {
  try {
    let response = await axios.post(
      `https://cip.safaraneh.com/api/services/app/BookingCip/Validate`,
      param,
      {
        headers: {
          'Accept-Language': 'fa-IR',
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.API_KEY,
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}

export const CipGetValidate = async (key) => {
  try {
    let response = await axios.get(
      `https://cip.safaraneh.com/api/services/app/BookingCip/GetValidate?Id=${key}`,
      {
        headers: {
          'Accept-Language': 'fa-IR',
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.API_KEY,
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}

export const CipPreReserve = async (param) => {
  try {
    let response = await axios.post(
      `https://cip.safaraneh.com/api/services/app/BookingCip/PreReserve`,
      param,
      {
        headers: {
          'Accept-Language': 'fa-IR',
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.API_KEY,
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}

export const CipGetReserveId = async (reserveId, userName) => {
  try {
    let response = await axios.get(
      `https://cip.safaraneh.com/api/services/app/Reserve/Get?ReserveId=${reserveId}&Username=${userName}`,
      {
        headers: {
          'Accept-Language': 'fa-IR',
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.API_KEY,
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}

export const CipPostConfirm = async (param) => {
  try {
    let response = await axios.post(
      `https://cip.safaraneh.com/api/services/app/BookingCip/Confirm`,
      param,
      {
        headers: {
          'Accept-Language': 'fa-IR',
          'Content-Type': 'Application/json',
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.API_KEY,
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}

export const CipGetVoucher = async (reserveId, userName) => {
  try {
    let response = await axios.get(
      `https://cip.safaraneh.com/api/services/app/Reserve/GetVoucherPdf?ReserveId=${reserveId}&Username=${userName}`,
      {
        headers: {
          'Accept-Language': 'fa-IR',
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.API_KEY,
        },
      },
    )
    return response
  } catch (error) {
    return error
  }
}

// export const  = async (id,username) => {
//   ;
//   try {
//     let response = await axios.post(

//       {"reserveId":id,"username":username},
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "Accept-Language": "en-US",
//           'Abp.TenantId': 7,
//           "bs.terminal": portalApiKey,
//           "bs.currency": "IRR",

//         },
//       }
//     );
//     return response;
//   } catch (error) {
//     return error;
//   }
// };

export const BookingHotelInternationalBook = async (param) => {
  const token = localStorage.getItem('Token')
  try {
    let response = await axios.post(
      `https://hotel.safaraneh.com/api/services/app/BookingHotelInternational/Book`,
      param,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'en-US',
          Authorization: `Bearer ${token}`,
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.API_KEY,
        },
      },
    )
    return response
  } catch (error) {
    console.log(error)
    return error
  }
}

export const HotelDomesticReserveDetail = async (param) => {
  try {
    let response = await axios.post(
      `https://hotelapi.safaraneh.com/v3_1/Hotel/Advance/Get`,
      param,
      {
        headers: {
          key: ' 63627a81755443e89bcca3aa73044e60',
          // "abp.tenantId": 7,
          // "Content-Type": "application/json",
          // "Accept-Language": "en-US",
        },
      },
    )
    return response
  } catch (error) {
    console.log(error)
    return error
  }
}

export const setForeignHotelList = (data) => ({
  type: HOTEL_FOREIGN_LIST,
  payload: data,
})

export const setDomesticHotelList = (data) => ({
  type: HOTEL_INTERIOR_LIST,
  payload: data,
})

export const setDomesticHotelDetail = (data) => ({
  type: HOTEL_INTERIOR_DETAILS,
  payload: data,
})

export const setForeignHotelDetail = (data) => ({
  type: HOTEL_FOREIGN_DETAILS,
  payload: data,
})

export const SearchEntity = (entity) => {
  const url =
    entity.EntityTypeId === 3
      ? 'https://api.safaraneh.com/v2/Entity/GetEntityNameByLocation?location=164'
      : 'https://api.safaraneh.com/v2/Hotel/GetHotelById?hotelId=203'
  const data = {
    SearchValue: entity.SearchValue,
    LanguageIds: [1, 2],
    EntityTypeId: entity.EntityTypeId,
  }

  return async (dispatch) => {
    try {
      const res = await axios.post(url, data, {
        headers: {},
      })

      dispatch({
        type: SEARCH_ENTITY,
        payload: res,
      })
    } catch (error) {
      console.log('error', error)
    }
  }
}

const renameKeys = (keysMap, obj) => {
  return Object.keys(obj).reduce((acc, key) => {
    const renamedObject = {
      [keysMap[key] || key]: obj[key],
    }
    return {
      ...acc,
      ...renamedObject,
    }
  }, {})
}

export const GetIpLocation = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        'https://iplocation.safaraneh.com/api/services/app/LocationService/GetIpLocation',
      )
      dispatch({
        type: GET_IP_LOCATION,
        payload: res.data,
      })
    } catch (error) {
      console.log('error', error)
    }
  }
}

// export const GetCurrentUser = () => {
//     return async dispatch => {
//       try {

//         const token = localStorage.getItem('token');

//         const AuthStr = 'Bearer '.concat(USER_TOKEN);

//         const res = await axios.get('https://identity.safaraneh.com/api/services/app/Profile/GetCurrentUserProfileForEdit', {
//             headers: {
//                 'Abp.TenantId' : '1040',
//                 'bs.terminal' : 'ACE01BF4-AAEE-45D6-ABE7-F3FF519052DB',
//                 'Authorization': `Bearer ${token}`
//             }
//         });

//         // console.log('GetCurrentUser : ', res);

//         dispatch({ type: GET_CURRENT_USER, payload: res.data})

//       } catch (error) {
//           console.log('error', error);
//       }
//     }
//   }

export const getPathFlight = async (params) => {
  const token = localStorage.getItem('Token')
  try {
    const res = await axios.get(
      `${flightdomestic}Airport/GetAll?Codes=${params.departureCode}&Codes=${params.returnCode}&AirportTypes=Main`,
      {
        headers: {
          accept: 'text/plain',
          'Accept-Language': 'fa-IR',
          Authorization: `Bearer ${token}`,
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.API_KEY,
        },
      },
    )
    return res
  } catch (error) {
    return error.response
  }
}

export const GetKeyFlights = async (params) => {
  const token = localStorage.getItem('Token')
  try {
    const res = await axios.post(
      `${flightdomestic}BookingFlight/Availability`,
      params,
      {
        headers: {
          accept: 'text/plain',
          'Accept-Language': 'fa-IR',
          Authorization: `Bearer ${token}`,
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.API_KEY,
        },
      },
    )
    return res
  } catch (error) {
    console.log('error', error)
    return error.response
  }
}
export const FlightSearchList = async (key) => {
  const token = localStorage.getItem('Token')
  try {
    const res = await axios.get(
      `${flightdomestic}BookingFlight/GetAvailability?key=${key}`,
      {
        headers: {
          'Content-Type': 'application/json',
          accept: 'text/plain',
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

export const FlightGetValidate = async (key) => {
  const token = localStorage.getItem('Token')
  try {
    const res = await axios.get(
      `${flightdomestic}BookingFlight/GetValidate?preReserveKey=${key}`,
      {
        headers: {
          'Content-Type': 'application/json',
          accept: 'text/plain',
          'Accept-Language': 'fa-IR',
          Authorization: `Bearer ${token}`,
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.API_KEY,
        },
      },
    )
    return res
  } catch (error) {
    console.log('error', error)
    return error.response
  }
}

export const setFlightsSearchForm = async (cityName, currentLang = 'fa') => {
  const token = localStorage.getItem('Token')
  try {
    const res = await axios.post(
      `${flightdomestic}Airport/Search`,
      { query: cityName },
      {
        headers: {
          'Content-Type': 'application/json',
          accept: 'text/plain',
          'Accept-Language': `${currentLang === 'fa' ? 'fa-IR' : 'ar-AE'}`,
          Authorization: `Bearer ${token}`,
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.API_KEY,
        },
      },
    )
    return res
  } catch (error) {
    console.log('error', error)
    return error.response
  }
}

export const validateFlights = async (params) => {
  const token = localStorage.getItem('Token')
  try {
    const res = await axios.post(
      `${flightdomestic}BookingFlight/Validate`,
      params,
      {
        headers: {
          'Content-Type': 'application/json',
          accept: 'text/plain',
          'Accept-Language': 'fa-IR',
          Authorization: `Bearer ${token}`,
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.API_KEY,
        },
      },
    )
    return res
  } catch (error) {
    console.log('error', error)
    return error.response
  }
}

export const sendPassenger = async (params) => {
  const token = localStorage.getItem('Token')
  try {
    const res = await axios.post(
      `${flightdomestic}BookingFlight/PreReserve`,
      params,
      {
        headers: {
          'Content-Type': 'application/json',
          accept: 'text/plain',
          'Accept-Language': 'fa-IR',
          Authorization: `Bearer ${token}`,
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.API_KEY,
        },
      },
    )
    return res
  } catch (error) {
    console.log('error', error)
    return error.response
  }
}

export const getReserveBankGateway = async (id) => {
  const token = localStorage.getItem('Token')
  try {
    const res = await axios.get(
      `https://payline.safaraneh.com/api/services/app/ReserveBankGateway/GetAll?ReserveId=${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          accept: 'text/plain',
          'Accept-Language': 'fa-IR',
          Authorization: `Bearer ${token}`,
          TenantId: process.env.ABP_TENANT_ID,
        },
      },
    )
    return res
  } catch (error) {
    console.log('error', error)
    return error.response
  }
}

export const getReserve = async (id, username) => {
  const token = localStorage.getItem('Token')
  try {
    const res = await axios.get(
      `${flightdomestic}Reserve/Get?reserveId=${id}&username=${username}`,
      {
        headers: {
          'Content-Type': 'application/json',
          accept: 'text/plain',
          'Accept-Language': 'fa-IR',
          Authorization: `Bearer ${token}`,
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.API_KEY,
        },
      },
    )
    return res
  } catch (error) {
    console.log('error', error)
    return error.response
  }
}

export const GetVoucherPdf = async (id, username) => {
  const token = localStorage.getItem('Token')
  try {
    const res = await axios.get(
      `${flightdomestic}Reserve/GetVoucherPdf?ReserveId=${id}&Username=${username}`,
      {
        headers: {
          'Content-Type': 'application/json',
          accept: 'text/plain',
          'Accept-Language': 'fa-IR',
          Authorization: `Bearer ${token}`,
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.API_KEY,
        },
      },
    )
    return res
  } catch (error) {
    console.log('error', error)
    return error.response
  }
}

export const makeToken = async (params) => {
  const token = localStorage.getItem('Token')
  try {
    const res = await axios.post(
      `https://payline.safaraneh.com/api/services/app/ReserveBankGateway/MakeToken`,
      params,
      {
        headers: {
          'Content-Type': 'application/json',
          accept: 'text/plain',
          'Accept-Language': 'fa-IR',
          Authorization: `Bearer ${token}`,
          TenantId: process.env.ABP_TENANT_ID,
        },
      },
    )
    return res
  } catch (error) {
    console.log('error', error)
    return error.response
  }
}

export const getAllCountries = async () => {
  const token = localStorage.getItem('Token')
  try {
    const res = await axios.get(
      `${flightdomestic}Country/GetAll?MaxResultCount=500`,
      {
        headers: {
          'Content-Type': 'application/json',
          accept: 'text/plain',
          'Accept-Language': 'fa-IR',
          Authorization: `Bearer ${token}`,
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.API_KEY,
        },
      },
    )
    return res
  } catch (error) {
    console.log('error', error)
    return error.response
  }
}

export const getOrder = async (id, username) => {
  try {
    const res = await axios.get(
      `https://coordinator.safaraneh.com/api/services/app/Order/Get?Id=${id}&Username=${username}`,
      {
        headers: {
          'Content-Type': 'application/json',
          accept: 'text/plain',
          'Accept-Language': 'fa-IR',
          Authorization: '',
          TenantId: process.env.ABP_TENANT_ID,
        },
      },
    )
    return res
  } catch (error) {
    console.log('error', error)
    return error.response
  }
}

export const getAllOrders = async (SkipCount, MaxResultCount, Status) => {
  try {
    const token = localStorage.getItem('Token')
    const res = await axios.get(
      `https://coordinator.safaraneh.com/api/services/app/Order/GetAll?SkipCount=${SkipCount}&MaxResultCount=${MaxResultCount}&Statue=${Status}`,
      {
        headers: {
          'Content-Type': 'application/json',
          accept: 'text/plain',
          'Accept-Language': 'fa-IR',
          Authorization: `Bearer ${token}`,
          TenantId: process.env.ABP_TENANT_ID,
        },
      },
    )
    return res
  } catch (error) {
    console.log('error', error)
    return error.response
  }
}

export const getOrderHotel = async (id, username) => {
  try {
    const res = await axios.post(
      `https://hotelapi.safaraneh.com/v3_1/Hotel/Advance/Get`,
      {
        reserveId: id,
        username: username,
        LanguageId: 1,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          charset: 'utf-8',
          'Content-Length': 62,
          Host: 'api.traveloiran.com',
        },
      },
    )
    return res
  } catch (error) {
    console.log('error', error)
    return error.response
  }
}

export const getConfirmFlight = async (id, username) => {
  const token = localStorage.getItem('Token')
  try {
    const res = await axios.post(
      `${flightdomestic}BookingFlight/Confirm`,
      {
        reserveId: id,
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
        },
      },
    )
    return res
  } catch (error) {
    console.log('error', error)
    return error.response
  }
}

export const validateDiscountCode = async (key, type, discountPromoCode) => {
  try {
    const res = await axios.post(
      `${crm}Discount/Validate`,
      {
        preReserve: key,
        type: type,
        promoCode: discountPromoCode,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          accept: 'text/plain',
          'Accept-Language': 'fa-IR',
          TenantId: process.env.ABP_TENANT_ID,
        },
      },
    )
    return res
  } catch (error) {
    console.log('error', error)
    return error.response
  }
}

export const registerDiscountCode = async (
  reserveId,
  username,
  discountPromoCode,
) => {
  try {
    const res = await axios.post(
      `${crm}Discount/Register`,
      {
        reserveId: reserveId,
        username: username,
        promoCode: discountPromoCode,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          accept: 'text/plain',
          'Accept-Language': 'fa-IR',
          TenantId: process.env.ABP_TENANT_ID,
        },
      },
    )
    return res
  } catch (error) {
    console.log('error', error)
    return error.response
  }
}

export const setFlightListSearch = (data) => ({
  type: FLIGHT_LIST_SEARCH,
  payload: data,
})

export const setPortalInfo = (data) => ({
  type: PORTAL_DATA,
  payload: data,
})

export const setAirlines = (data) => ({
  type: SET_AIRLINES,
  payload: data,
})

export const flightsFilter = (data) => ({
  type: FLIGHT_FILTER,
  payload: data,
})

export const clearFilter = () => ({
  type: CLEAR_FILTER_FLIGHT,
  payload: '',
})

export const setFilterFlight = (data) => ({
  type: SET_FILTER_FLIGHT,
  payload: data,
})

export const setFlightSelected = (data) => ({
  type: FLIGHT_SELECTED,
  payload: data,
})

export const setMinMaxPrice = (data) => ({
  type: MIN_MAX_PRICES,
  payload: data,
})

export const setCurrency = (data) => ({
  type: SET_CURRENCY,
  payload: data,
})

export { DomesticHotelV4GetRooms,DomesticHotelV4Search,DomesticHotelV4Validate ,DomesticHotelV4GetValidate,DomesticHotelV4PreReserve,HotelV4DomesticGetReserve,getConfirmHotelV4Domestic,getInteriorHotelsV4}