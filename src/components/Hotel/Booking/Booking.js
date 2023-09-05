import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation, Router } from '../../../../i18n'
import {useRouter} from 'next/router'
import dynamic from 'next/dynamic'

import styles from '../../../styles/Home.module.css'
import { Row, Col } from 'antd'

import { HotelDomesticGetReserve, GetHotelById, getConfirmHotelDomestic } from '../../../actions'

const BookingSteps = dynamic(() => import('./BookingSteps'))
const AsideBooking = dynamic(() => import('./AsideBooking'))
const ContentBooking = dynamic(() => import('./ContentBooking'))

const Booking = props => {
    const { t } = props;
    const router = useRouter();
    const reserveId = router.query.reserveId;
    const username = router.query.username;
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(true);
    const [reserveInfo,setReserveInfo]=useState(); 
    const [hotelInfo,setHotelInfo]=useState();  

    const fetchData = async () => {
        const response = await HotelDomesticGetReserve(reserveId,username);
        if (response.data) {  
            setReserveInfo(response.data.result);
            const hotelId = response.data.result.hotelId;
            const gatHotelResponse = await GetHotelById(hotelId);
            if (gatHotelResponse.data) {  
                setHotelInfo(gatHotelResponse.data);
            }
        }
    };

    const getConfirm = async () => {
        const res = await getConfirmHotelDomestic(reserveId, username);
        if (res.status == 200) {
          if (res.data.result.isCompleted) {
            const data = res.data.result;
            setData(data);
            setLoading(false)
          } else {
            setData(data);
            getConfirm();
          }
        } else {
          openNotification("error", "bottomRight", res.data.error.message);
        }
    };
      
    useEffect(()=>{
        fetchData();
        getConfirm();
    },[]);
    return (
        <div
            className={`${styles.booking} ${process.env.THEME_NAME === "TRAVELO" && styles.bookingTravelo}`}
            >
            <div className={styles.container}>

                <BookingSteps/>

                <Row gutter={[20]}>
                    <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                        <ContentBooking 
                            progress={loading}
                            data={data}
                            reserveInfo={reserveInfo}
                            reserveId={reserveId}
                            username={username}
                            />
                    </Col>

                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <AsideBooking reserveInfo={reserveInfo} hotelInfo={hotelInfo}/>
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
