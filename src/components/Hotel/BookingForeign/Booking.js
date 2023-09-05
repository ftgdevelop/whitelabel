import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types'
import { withTranslation, Link, i18n } from '../../../../i18n'
import {useRouter} from 'next/router';
import { Row, Col } from 'antd';
import dynamic from 'next/dynamic'

import {foreignHotelGetReserveById} from '../../../actions'
import styles from '../../../styles/Home.module.css'

const BookingSteps = dynamic(() => import('./BookingSteps'))
const AsideBooking = dynamic(() => import('./AsideBooking'))
const ContentBooking = dynamic(() => import('./ContentBooking'))


const Booking = props => {
    const { t } = props;
    const router = useRouter();
    const [reserveInfo,setReserveInfo]=useState(); 

    useEffect(()=>{
        const fetchData = async () => {
            const reserveId = router.query.reserveId;
            const username = router.query.username;

            const response = await foreignHotelGetReserveById(reserveId,username);
            if (response.data) {  
                setReserveInfo(response.data.result);
            }

          };
          fetchData();
    },[]);
    return (
        <div className={styles.booking}>
            <div className={styles.container}>

                <BookingSteps/>

                <Row gutter={[20,20]}>
                    <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                        <ContentBooking reserveInfo={reserveInfo}/>
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
