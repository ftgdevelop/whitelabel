import axios from "axios";
const url = "https://flight.safaraneh.com";

const handelSuccess = ({ response, type, next, valuesCount }) => {
  next({
    response: { data: response.data.result, valuesCount },
    type: type,
  });
};

const handelError = ({ error, type, next }) => {
  next({
    error,
    type: type,
  });
};

const apiMiddleware = (store) => (next) => (action) => {
  const { isEndpointCall } = action;
  const token = localStorage.getItem("Token");
  if (isEndpointCall) {
    const { method, data, type, successType, errorType, valuesCount } = action;
    next({ type });
    axios({
      method,
      url: `${url}${action.endpoint}`,
      data: data,
      headers: {
        accept: "text/plain",
        "Accept-Language": "fa-IR",
        TenantId: process.env.ABP_TENANT_ID,
        apikey: process.env.BS_TERMINAL,
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        handelSuccess({ response, type: successType, next, valuesCount });
      })
      .catch((error) => {
        handelError({ error, type: errorType, next });
      });
  } else {
    next(action);
  }
};

export default apiMiddleware;
