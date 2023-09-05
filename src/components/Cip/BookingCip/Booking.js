import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types'
import { i18n, withTranslation } from '../../../../i18n'
import {useRouter} from 'next/router';
import styles from '../../../styles/Home.module.css'
import BookingSteps from './BookingSteps';
import { Row, Col } from 'antd';
import AsideBooking from './AsideBooking';
import ContentBooking from './ContentBooking';
import {CipGetReserveId} from '../../../actions'

const Booking = props => {
   const { t } = props;
   const router = useRouter();
   const [reserveInfo,setReserveInfo]=useState(); 
   useEffect (()=>{
      const fetchData = async () => {
         const response = await CipGetReserveId(router.query.reserveId,router.query.username);
         if (response.data.result) {  
            setReserveInfo(response.data.result);
         }
      };
      fetchData()
   },[]);
   return (
      <div
         className={`${styles.booking} ${process.env.THEME_NAME === "TRAVELO" && styles.bookingTravelo}`}
         >
         <div className={styles.container}>
            <BookingSteps/>
            <Row gutter={[20,20]}>
               <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                  <ContentBooking reserveInfo={reserveInfo} reserveId={router.query.reserveId} userName={router.query.username}/>
               </Col>
               <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                  <AsideBooking reserveInfo={reserveInfo}/>
               </Col>
            </Row>
         </div>
      </div>
   )
}
Booking.getInitialProps = async () => ({
   namespacesRequired: ['common'],
})
Booking.propTypes = {
   t: PropTypes.func.isRequired,
}
export default withTranslation('common')(Booking)