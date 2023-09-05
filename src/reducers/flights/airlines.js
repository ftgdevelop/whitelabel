import {
    SET_AIRLINES
} from '../../actions/types'

const groupBy = (array, key) => {
    if(array && array.length){
        return array.reduce((result, currentValue) => {
        (result[currentValue[key]['code'] ]= result[currentValue[key]['code']] || []).push(
            currentValue
        );
        return result;
        }, {});
    }else{
        return {}
    }
};

const airlineList = (state = {}, action) => {
    switch (action.type) {
        case SET_AIRLINES:
            return groupBy(action.payload,'airline') 
        default:
            return state;
    }
}

export default airlineList;