import { GET_CURRENT_USER, AUTH_ERROR } from '../actions/types'

const DEFAULT_STATE = {
    isAuthenticated: false,
    token: '',
    errorMessage: '',
}

const userReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case GET_CURRENT_USER:
            return { ...state, getUser: action.payload, errorMessage: '' }    
        case AUTH_ERROR:
            return { ...state, errorMessage: action.payload }
        default:
            return state;
    }
}

export default userReducer;