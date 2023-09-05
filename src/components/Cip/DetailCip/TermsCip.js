import React,{useEffect,useState} from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation } from '../../../../i18n'

import styles from '../../../styles/Cip.module.css'

const TermsCip = props =>{
    const { t } = props;
    return (
        <div className={styles.aboutAirportCip} id="anchortermsairport">
            <h3>قوانین و مقررات</h3>
            <div className={styles.content}>
                <b>بزرگسال</b>
                <ul>
                    <li>جریمه کنسلی از لحظه صدور تا ۲۴ ساعت مانده به پرواز: ۰ درصد</li>
                    <li>جریمه کنسلی از ۲۴ ساعت مانده به پرواز تا ۸ ساعت مانده به پرواز: ۳۰ درصد</li>
                    <li>جریمه کنسلی از ۸ ساعت مانده به پرواز به بعد: ۱۰۰ درصد</li>
                </ul>

                <b>کودک</b>
                <ul>
                    <li>جریمه کنسلی از لحظه صدور تا ۲۴ ساعت مانده به پرواز: ۰ درصد</li>
                    <li>جریمه کنسلی از ۲۴ ساعت مانده به پرواز تا ۸ ساعت مانده به پرواز: ۳۰ درصد</li>
                    <li>جریمه کنسلی از ۸ ساعت مانده به پرواز تا لحظه پرواز و بعد جریمه کنسلی از آن: ۱۰۰ درصد </li>
                </ul>

                <b>نوزاد</b>
                <ul>
                    <li>جریمه کنسلی از لحظه صدور تا ۲۴ ساعت مانده به پرواز: ۰ درصد</li>
                    <li>جریمه کنسلی از ۲۴ ساعت مانده به پرواز تا ۸ ساعت مانده به پرواز: ۰ درصد</li>
                    <li>جریمه کنسلی از ۸ ساعت مانده به پرواز تا لحظه پرواز و بعد جریمه کنسلی از آن: ۰ درصد</li>
                </ul>
            </div>
        </div>
    )
}

TermsCip.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
TermsCip.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(TermsCip)
