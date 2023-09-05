import React from 'react';
import moment from 'moment-jalaali';

import styles from '../../../styles/Home.module.css'

const CountDown = (props) =>{
    const min =  Math.floor(props.seconds/60);
    const sec = props.seconds%60;

    return <div className={styles.timeCapacity}>
        <div className={styles.minutes}>{moment(min+"-"+sec,'m-s').format("mm")}</div>
        <div className={styles.symbol}>:</div>
        <div className={styles.seconds}>{moment(min+"-"+sec,'m-s').format("ss")}</div>
    </div>
}
export default CountDown;