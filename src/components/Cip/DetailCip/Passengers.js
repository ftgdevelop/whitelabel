import React from 'react'
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { i18n, withTranslation } from '../../../../i18n'
import { MinusOutlined } from '@ant-design/icons'
import _ from "lodash";

import styles from '../../../styles/Cip.module.css'
import { PlusOutlineIcon } from "../../UI/Icons";
import PassengerItem from './PassengerItem';


const Passengers = props => {

    const { t, passengers, decreasePassengers, increasePassengers,passengerServicesArray,UpdatePassenger,removePassenger } = props;

    const setReserverIsNotPassenger = (passengerIndex) => {
        if(passengerIndex===0 && props.reserverPassenger && props.setReserverPassenger){
            props.setReserverPassenger(false);
        }
    }
    return (
        <div className={`${styles.passengerCip} ${process.env.THEME_NAME === "TRAVELO" && styles.passengerCipTravelo}`}>
            <div className={styles.subject}>
                <h3>مشخصات مسافران</h3>
                <div className={styles.passengerCount}>
                    <button type="button" className={styles.minusCount} onClick={decreasePassengers}>
                        <MinusOutlined />
                    </button>
                    <b> {passengers ? passengers.length : <Spin />}</b>
                    <span>مسافر</span>
                    <button type="button" className={styles.plusCount} onClick={increasePassengers}>
                        <PlusOutlineIcon />
                    </button>
                </div>
            </div>
            {passengers && passengers.sort((a,b)=> +a.id - +b.id).map((passengerItem,passengerIndex)=><PassengerItem 
                key={passengerItem.id} 
                passengerItem={passengerItem} 
                passengerIndex={passengerIndex}
                setReserverIsNotPassenger={setReserverIsNotPassenger}
                passengerServicesArray={passengerServicesArray}
                UpdatePassenger={UpdatePassenger}
                removePassenger={removePassenger}
                form={props.form}
            />)}
        </div>
    )
}

Passengers.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
Passengers.propTypes = {
    t: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    dateInfo: state.dateInfo,
  };
}
  
export default withTranslation('common')(
    connect(mapStateToProps)(Passengers)
)
