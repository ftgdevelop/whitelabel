import { isEmpty } from "lodash";
import { SET_CURRENT_USER, SET_LOADING_USER } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
  loadingGetUser: true,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user,
        loadingGetUser: action.value || false,
      };

    default:
      return state;
  }
};

// import actions from "redux-form/lib/actions";
// import { AUTH_REGISTER, AUTH_ERROR, AUTH_SIGN_IN, GET_IP_LOCATION, GET_CURRENT_USER } from '../actions/types'
// import { reduceRight } from "lodash";

// const DEFAULT_STATE = {
//     isAuthenticated: false,
//     token: '',
//     errorMessage: '',
//     myIp: '',
//     currentUser: '',
// }

// const authReducer = (state = DEFAULT_STATE, action) => {
//     switch (action.type) {
//         case AUTH_REGISTER:
//             return { ...state, success: action.payload, errorMessage: '' }
//         case AUTH_SIGN_IN:
//             return { ...state, token: action.payload, isAuthenticated: true, errorMessage: '' }
//         case AUTH_ERROR:
//             return { ...state, errorMessage: action.payload }
//         case GET_IP_LOCATION:
//                 return { ...state, myIp: action.payload }
//         case GET_CURRENT_USER:
//                 return { ...state, currentUser: action.payload }
//         default:
//             return state;
//     }
// }

// export default authReducer;
