import {
    STATUS_REGISTER_MESSAGE
} from '../../actions/types'



const statusRegister = (state = '', action) => {
    switch (action.type) {
        case STATUS_REGISTER_MESSAGE:
            return action.payload;
        default:
            return state;
    }
}

export default statusRegister;