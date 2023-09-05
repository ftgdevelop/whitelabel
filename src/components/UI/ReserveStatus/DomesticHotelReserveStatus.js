import React from 'react';
import {Tag} from 'antd';

const DomesticHotelReserveStatus = (props) =>{
    let color;
    switch(props.StatusId) {
        case 2:
            color ="blue";
            break;
        case 12:
        case 13:
            color = "gold"
            break;
        case 11:
        case 17:
            color="green"
            break;
        case 7:
        case 8:
        case 9:
            color = "default"
            break;
        case 4:
            color="success"
            break;  
        
        default:
            color = "default"
      }

    return <Tag color={color}>{props.StatusName}</Tag>;
}
export default DomesticHotelReserveStatus;