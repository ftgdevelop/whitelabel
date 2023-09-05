import {
    MIN_MAX_PRICES
} from '../../actions/types'

const initialState= [];

const minMaxPrices = (state= initialState , action) => {
    switch (action.type) {
        case MIN_MAX_PRICES:
            return (action.payload && action.payload.length ?
                [action.payload[0].adultPrice, action.payload[action.payload.length-1].adultPrice]
                : state)
        default:
            return state;
    }
}

export default minMaxPrices;