 import { SET_USER_CREDIT_AMOUNT } from '../../actions/types';

 const creditAmount = (state = '', action) => {
    switch (action.type) {
        case SET_USER_CREDIT_AMOUNT:
            return action.payload 
        default:
            return state;
    }
}

export default creditAmount;

