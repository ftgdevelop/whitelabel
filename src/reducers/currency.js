import { SET_CURRENCY } from '../actions/types'

const currency = (state = 'IRR' , action = {}) => {
    switch (action.type) {
        case SET_CURRENCY:
            return action.payload   
        default:
            return state
    }
}
export default currency