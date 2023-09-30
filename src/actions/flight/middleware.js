import axios from 'axios'

const handelSuccess = ({ response, type, next, valuesCount, values }) => {
  next({
    response: { data: response.data.result, valuesCount, values },
    type: type,
  })
}

const handelError = ({ error, type, values, next }) => {
  next({
    error,
    type: type,
    values,
  })
}

const apiMiddleware = (store) => (next) => (action) => {
  const { isEndpointCall } = action
  const token = localStorage.getItem('Token')
  if (isEndpointCall) {
    const {
      method,
      data,
      type,
      successType,
      errorType,
      valuesCount,
      values,
    } = action
    next({ type, values })
    axios({
      method,
      url: `${action.endpoint}`,
      data: data,
      headers: {
        accept: 'text/plain',
        'Accept-Language': 'fa-IR',
        TenantId: process.env.ABP_TENANT_ID,
        apikey: process.env.API_KEY,
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        handelSuccess({
          response,
          type: successType,
          next,
          valuesCount,
          values,
        })
      })
      .catch((error) => {
        handelError({ error, type: errorType, values, next })
      })
  } else {
    next(action)
  }
}

export default apiMiddleware
