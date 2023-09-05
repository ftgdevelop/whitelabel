import { Request } from '../../../helpers/api/request'
import axios from 'axios'
import setAuthorizationToken from '../../utils/setAuthorizationToken'
import jwt from 'jsonwebtoken'
import {
  SET_CURRENT_USER,
  SET_LOADING_USER,
  EDIT_USER,
  USER,
  SET_USER_CREDIT_AMOUNT,
} from '../types'

export function setCurrentUser(user, value) {
  return {
    type: SET_CURRENT_USER,
    user,
    value,
  }
}

export function logout() {
  localStorage.removeItem('Token')

  return (dispatch) => {
    setAuthorizationToken(false)
    dispatch(setCurrentUser({}, true))
  }
}

export function login(data) {
  try {
    const headerOptions = {
      headers: {
        Accept: 'application/json;charset=UTF-8',
        TenantId: process.env.ABP_TENANT_ID,
        apikey: process.env.BS_TERMINAL,
      },
    }
    return async (dispatch) => {
      const res = await axios.post(
        'https://identity.safaraneh.com/api/TokenAuth/Login',
        data,
        headerOptions,
      )

      if (res && res.status === 200) {
        const token = res.data.result.accessToken
        localStorage.setItem('Token', token)
        setAuthorizationToken(token)

        dispatch(setCurrentUser(res.data.result.user))
      }
      return res
    }
  } catch (e) {
    return e.response
  }
}

export function userProfile() {
  const token = localStorage.getItem('Token')

  const headerOptions = {
    headers: {
      Accept: 'application/json;charset=UTF-8',
      Authorization: `Bearer ${token}`,
      TenantId: process.env.ABP_TENANT_ID,
      apikey: process.env.BS_TERMINAL,
    },
  }
  return async (dispatch) => {
    try {
      if (token) {
        const res = await axios.get(
          'https://identity.safaraneh.com/api/services/app/Profile/GetCurrentUserProfileForEdit',
          headerOptions,
        )

        if (res && res.status === 200) {
          const myData = res.data.result
          dispatch(setCurrentUser(myData))
          return myData
        } else {
          logout()
        }
      } else {
        dispatch(setCurrentUser({}))
      }
    } catch (e) {
      logout()
      return e.response
    }
  }
}

export const updateProfile = async (data, currentLang = 'fa') => {
  const token = localStorage.getItem('Token')

  const headerOptions = {
    headers: {
      Accept: 'application/json;charset=UTF-8',
      Authorization: `Bearer ${token}`,
      TenantId: process.env.ABP_TENANT_ID,
      apikey: process.env.BS_TERMINAL,
      'Accept-Language': `${currentLang === 'fa' ? 'fa-IR' : 'ar-AE'}`,
    },
  }
  // return async (dispatch) => {

  try {
    const res = await axios.put(
      'https://identity.safaraneh.com/api/services/app/Profile/UpdateCurrentUserProfile',
      data,
      headerOptions,
    )

    if (res && res.status === 200) {
      const myData = res.data.result

      // setAuthorizationToken(token);
      // dispatch(setCurrentUser(myData));
    }
    return res
  } catch (e) {
    return e.response
  }
  // }
}

export const loginUser = (params, currentLang = 'fa') => {
  return async (dispatch) => {
    dispatch({ type: USER.REGISTER.REQUEST })
    try {
      const response = await axios.post(
        'https://identity.safaraneh.com/api/TokenAuth/Login',
        params,
        {
          headers: {
            Accept: 'application/json;charset=UTF-8',
            TenantId: process.env.ABP_TENANT_ID,
            apikey: process.env.BS_TERMINAL,
            'Accept-Language': `${currentLang === 'fa' ? 'fa-IR' : 'ar-AE'}`,
          },
        },
      )

      if (response.status == 200) {
        dispatch({ type: USER.REGISTER.SUCCESS })
        const token = response.data.result.accessToken
        localStorage.setItem('Token', token)
        setAuthorizationToken(token)

        dispatch(setCurrentUser(response.data.result.user))
      } else dispatch({ type: USER.REGISTER.ERROR })

      return response
    } catch (e) {
      return e.response
    }
  }
}

export const registerUser = (params, currentLang = 'fa') => {
  return async (dispatch) => {
    dispatch({ type: USER.REGISTER.REQUEST })
    try {
      const response = await axios.post(
        'https://identity.safaraneh.com/api/services/app/Account/Register',
        params,
        {
          headers: {
            'Accept-Language': 'fa-IR',
            TenantId: process.env.ABP_TENANT_ID,
            apikey: process.env.BS_TERMINAL,
            'Accept-Language': `${currentLang === 'fa' ? 'fa-IR' : 'ar-AE'}`,
          },
        },
      )

      if (response.status == 200) dispatch({ type: USER.REGISTER.SUCCESS })
      else dispatch({ type: USER.REGISTER.ERROR })

      return response
    } catch (error) {
      return error.response
    }
  }
}

export const verifyPhone = (params, currentLang = 'fa') => {
  const token = localStorage.getItem('Token')
  return async (dispatch) => {
    dispatch({ type: USER.VERIFY_PHONE.REQUEST })
    try {
      const response = await axios.post(
        'https://identity.safaraneh.com/api/services/app/Profile/VerifySmsCode',
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            TenantId: process.env.ABP_TENANT_ID,
            apikey: process.env.BS_TERMINAL,
            'Accept-Language': `${currentLang === 'fa' ? 'fa-IR' : 'ar-AE'}`,
          },
        },
      )

      if (response.status == 200) dispatch({ type: USER.VERIFY_PHONE.SUCCESS })
      else dispatch({ type: USER.VERIFY_PHONE.ERROR })

      return response
    } catch (e) {
      return e.response
    }
  }
}

export const VerifyForgetPassword = (params, currentLang = 'fa') => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        'https://identity.safaraneh.com/api/services/app/Account/ForgotPasswordVerification',
        params,
        {
          headers: {
            TenantId: process.env.ABP_TENANT_ID,
            apikey: process.env.BS_TERMINAL,
            'Accept-Language': `${currentLang === 'fa' ? 'fa-IR' : 'ar-AE'}`,
          },
        },
      )

      if (response.status == 200) dispatch({ type: USER.VERIFY_PHONE.SUCCESS })
      else dispatch({ type: USER.VERIFY_PHONE.ERROR })

      return response
    } catch (e) {
      return e.response
    }
  }
}

export const changePassword = async (params) => {
  try {
    const token = localStorage.getItem('Token')
    const response = await axios.post(
      'https://identity.safaraneh.com/api/services/app/Account/ChangePassword',
      params,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.BS_TERMINAL,
        },
      },
    )

    return response
  } catch (e) {
    return e.response
  }
}

export const activateEmail = async (params) => {
  try {
    const response = await axios.post(
      'https://identity.safaraneh.com/api/services/app/Account/ActivateEmail',
      params,
      {
        headers: {
          Authorization: '',
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.BS_TERMINAL,
        },
      },
    )

    return response
  } catch (e) {
    return e.response
  }
}

export const sendVerificationCode = (params, currentLang = 'fa') => {
  return async (dispatch) => {
    dispatch({ type: USER.SEND_VERIFICATION_CODE.REQUEST })
    try {
      const token = localStorage.getItem('Token')
      const response = await axios.post(
        'https://identity.safaraneh.com/api/services/app/Profile/SendVerificationSms',
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            TenantId: process.env.ABP_TENANT_ID,
            apikey: process.env.BS_TERMINAL,
            'Accept-Language': `${currentLang === 'fa' ? 'fa-IR' : 'ar-AE'}`,
          },
        },
      )
      if (response.status == 200)
        dispatch({ type: USER.SEND_VERIFICATION_CODE.SUCCESS })
      else dispatch({ type: USER.SEND_VERIFICATION_CODE.ERROR })

      return response
    } catch (e) {
      return e.response
    }
  }
}

export const getIpLocation = () => {
  try {
    return async (dispatch) => {
      dispatch({ type: USER.GET_IP_LOCATION.REQUEST })
      const response = await axios.get(
        'https://iplocation.safaraneh.com/api/services/app/LocationService/GetIpLocation',
      )

      if (response.status == 200)
        dispatch({ type: USER.GET_IP_LOCATION.SUCCESS })
      else dispatch({ type: USER.GET_IP_LOCATION.ERROR })

      return response
    }
  } catch (e) {
    console.log(e.response.status)
  }
}

export const forgetPasswordByEmail = (params, currentLang = 'fa') => {
  return async (dispatch) => {
    dispatch({ type: USER.FORGET_PASSWORD.REQUEST })
    try {
      const response = await axios.post(
        'https://identity.safaraneh.com/api/services/app/Account/ForgotPassword',
        params,
        {
          headers: {
            'Accept-Language': 'fa-IR',
            TenantId: process.env.ABP_TENANT_ID,
            apikey: process.env.BS_TERMINAL,
            'Accept-Language': `${currentLang === 'fa' ? 'fa-IR' : 'ar-AE'}`,
          },
        },
      )

      if (response.status == 200)
        dispatch({ type: USER.FORGET_PASSWORD.SUCCESS })
      else dispatch({ type: USER.FORGET_PASSWORD.ERROR })

      return response
    } catch (e) {
      return e.response
    }
  }
}

export const forgetPasswordByPhoneNumber = (params, currentLang = 'fa') => {
  return async (dispatch) => {
    dispatch({ type: USER.FORGET_PASSWORD.REQUEST })
    try {
      const response = await axios.post(
        'https://identity.safaraneh.com/api/services/app/Account/ForgotPasswordByPhoneNumber',
        params,
        {
          headers: {
            'Accept-Language': 'fa-IR',
            TenantId: process.env.ABP_TENANT_ID,
            apikey: process.env.BS_TERMINAL,
            'Accept-Language': `${currentLang === 'fa' ? 'fa-IR' : 'ar-AE'}`,
          },
        },
      )

      if (response.status == 200)
        dispatch({ type: USER.FORGET_PASSWORD.SUCCESS })
      else dispatch({ type: USER.FORGET_PASSWORD.ERROR })

      return response
    } catch (e) {
      return e.response
    }
  }
}

export const setNewPassword = (params, currentLang = 'fa') => {
  return async (dispatch) => {
    dispatch({ type: USER.SET_NEW_PASSWORD.REQUEST })
    try {
      const response = await axios.post(
        'https://identity.safaraneh.com/api/services/app/Account/ResetPassword',
        params,
        {
          headers: {
            TenantId: process.env.ABP_TENANT_ID,
            apikey: process.env.BS_TERMINAL,
            'Accept-Language': `${currentLang === 'fa' ? 'fa-IR' : 'ar-AE'}`,
          },
        },
      )

      if (response.status == 200)
        dispatch({ type: USER.SET_NEW_PASSWORD.SUCCESS })
      else dispatch({ type: USER.SET_NEW_PASSWORD.ERROR })

      return response
    } catch (e) {
      return e.response
    }
  }
}

export const updateProfileEmail = async (params, currentLang = 'fa') => {
  const token = localStorage.getItem('Token')
  try {
    const response = await axios.put(
      'https://identity.safaraneh.com/api/services/app/Profile/UpdateProfileEmail',
      params,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.BS_TERMINAL,
          'Accept-Language': `${currentLang === 'fa' ? 'fa-IR' : 'ar-AE'}`,
        },
      },
    )
    return response
  } catch (e) {
    return e.response
  }
}

export const UpdateNewsletterUserProfile = async (params) => {
  try {
    const token = localStorage.getItem('Token')
    const response = await axios.put(
      'https://identity.safaraneh.com/api/services/app/Profile/UpdateNewsletterUserProfile',
      params,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.BS_TERMINAL,
        },
      },
    )
    return response
  } catch (e) {
    return e.response
  }
}

export const updateProfileMobile = async (params) => {
  const token = localStorage.getItem('Token')

  try {
    const response = await axios.put(
      'https://identity.safaraneh.com/api/services/app/Profile/UpdateProfilePhoneNumber',
      params,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.BS_TERMINAL,
        },
      },
    )

    return response
  } catch (e) {
    return e.response
  }
}

export const sendEmailActivation = async (email) => {
  try {
    const response = await axios.post(
      'https://identity.safaraneh.com/api/services/app/Account/SendEmailActivation',
      {
        emailAddress: email,
      },
      {
        headers: {
          'Accept-Language': 'fa-IR',
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.BS_TERMINAL,
        },
      },
    )
    return response
  } catch (e) {
    return e.response
  }
}

export const setCreditAmount = (data) => ({
  type: SET_USER_CREDIT_AMOUNT,
  payload: data,
})

export const GetBalance = (currency = 'IRR') => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('Token')

      const res = await axios.get(
        'https://payline.safaraneh.com/api/services/app/Deposit/GetBalance',
        {
          headers: {
            currency: 'IRR',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      if (res && res.status === 200) {
        const myData = res.data.result
        dispatch(setCreditAmount(myData.amount))
      }
      return res
    } catch (e) {
      // console.log(e.response.status);
      dispatch(setCreditAmount(0))
      return e.response
    }
  }
}

export const UserDepositeBankGateway = async () => {
  try {
    const token = localStorage.getItem('Token')

    const res = await axios.get(
      'https://payline.safaraneh.com/api/services/app/UserDepositBankGateway/GetAll?CurrencyType=IRR',
      {
        headers: {
          'Accept-Language': 'fa-IR',
          // "Bs.Terminal": "ACE01BF4-AAEE-45D6-ABE7-F3FF519052DB",
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return res
  } catch (e) {
    return e.response
  }
}

export const MakeToken = async (params) => {
  try {
    const token = localStorage.getItem('Token')

    const res = await axios.post(
      'https://payline.safaraneh.com/api/services/app/UserDepositBankGateway/MakeToken',
      params,
      {
        headers: {
          // "Bs.Terminal": "ACE01BF4-AAEE-45D6-ABE7-F3FF519052DB",
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return res
  } catch (e) {
    return e.response
  }
}

export const GetTransactionDeposit = async (params) => {
  try {
    const token = localStorage.getItem('Token')

    const res = await axios.get(
      `https://payline.safaraneh.com/api/services/app/TransactionDeposit/GetAll?${params}`,
      {
        headers: {
          'Accept-Language': 'fa-IR',
          // "Bs.Terminal": "ACE01BF4-AAEE-45D6-ABE7-F3FF519052DB",
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return res
  } catch (e) {
    return e.response
  }
}

export const ConfirmByDeposit = async (params) => {
  try {
    const token = localStorage.getItem('Token')

    const res = await axios.post(
      `https://payline.safaraneh.com/api/services/app/DepositReserve/ConfirmByDeposit`,
      params,
      {
        headers: {
          'Accept-Language': 'fa-IR',
          // "Bs.Terminal": "ACE01BF4-AAEE-45D6-ABE7-F3FF519052DB",
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return res
  } catch (e) {
    return e.response
  }
}

export const sendOtp = async (params, currentLang = 'fa') => {
  try {
    const token = localStorage.getItem('Token')

    const res = await axios.post(
      `https://identity.safaraneh.com/api/services/app/OTP/SendOTP`,
      params,
      {
        headers: {
          Accept: 'application/json;charset=UTF-8',
          TenantId: process.env.ABP_TENANT_ID,
          apikey: process.env.BS_TERMINAL,
          'Accept-Language': `${currentLang === 'fa' ? 'fa-IR' : 'ar-AE'}`,
        },
      },
    )
    return res
  } catch (e) {
    return e.response
  }
}
export const registerOrLoginOtp = (params, currentLang = 'fa') => {
  return async (dispatch) => {
    
    try {
      const res = await axios.post(
        `https://identity.safaraneh.com/api/services/app/OTP/RegisterOrLogin`,
        params,
        {
          headers: {
            Accept: 'application/json;charset=UTF-8',
            TenantId: process.env.ABP_TENANT_ID,
            apikey: process.env.BS_TERMINAL,
            'Accept-Language': `${currentLang === 'fa' ? 'fa-IR' : 'ar-AE'}`,
          },
        },
      )
      if (res && res.status === 200) {
        const token = res.data.result.accessToken
        localStorage.setItem('Token', token)
        setAuthorizationToken(token)
        dispatch(setCurrentUser(res.data.result.user))
      } else {dispatch(setCurrentUser({}, true))}
      return res
    } catch (e) {
      dispatch(setCurrentUser({}, true))
      return e.response
    }
  }
}
