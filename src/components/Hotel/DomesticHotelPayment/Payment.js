import React,{useEffect,useState} from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation, Router } from '../../../../i18n'
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic'

import styles from '../../../styles/Home.module.css'
import { Row, Col } from 'antd';
import {HotelDomesticGetReserve,GetGateways,GetHotelById} from '../../../actions';

const PaymentSteps = dynamic(() => import('./PaymentSteps'))
const AsidePayment = dynamic(() => import('./AsidePayment'))
const ContentPayment = dynamic(() => import('./ContentPayment'))

const Payment = props =>{
    const { t } = props;
    const router = useRouter();

    const [reserveInfo,setReserveInfo]=useState(); 
    const [hotelInfo,setHotelInfo]=useState();  
    const [gateWays,setGateWays]=useState(); 
    const [paymentStatus,setPaymentStatus]=useState(); 
    const [origin,setOrigin]=useState();  

    useEffect(()=>{

        const fetchData = async () => {
            const pathName = router.asPath;
            setOrigin(window.location.origin);
            const reserveId = pathName.split("reserveId-")[1].split("/")[0]; 
            const username = pathName.split("username-")[1];
            let searchParameters = window.location.search;
            if(searchParameters.includes("status=")){
                let status = searchParameters.split("status=")[1].split("&")[0];
                if(status === "0"){
                    setPaymentStatus("failed");
                }else if(status === "1"){
                    const reserveResponse = await HotelDomesticGetReserve(reserveId,username);
                    if (reserveResponse.data) {  
                        if (reserveResponse.data.result.reserveStatus === 11){
                            let reserverUsername = searchParameters.split("username=")[1].split("&")[0];
                            Router.push(`/hotel/booking/reserveId=${reserveId}/username=${username}`);
                            //Router.push(`/hotel/booking/reserveId=${reserveId}/referenceId=${referenceId}/username=${reserverUsername}`);
                        }else{
                            console.log(`payment is successfull, but reserve status is not 11, its:${reserveResponse.data.result.reserveStatus}`)
                        }
                    }

                }
            }

            const response = await HotelDomesticGetReserve(reserveId,username);
            
            if (response.data) {  
                setReserveInfo(response.data.result);
                const hotelId = response.data.result.hotelId;
                const gatHotelResponse = await GetHotelById(hotelId, i18n.language);
                if (gatHotelResponse.data) {  
                    setHotelInfo(gatHotelResponse.data);
                }
            }

            const gateWaysResponse = await GetGateways(reserveId, i18n.language);
            if (gateWaysResponse.data) {  
                setGateWays(gateWaysResponse.data.result);
            }
          };
          fetchData();
    },[t]);

    return (
        <div
            className={`${styles.payment} ${process.env.THEME_NAME === "TRAVELO" && styles.paymentTravelo}`}
            >
            <div className={styles.container}>

                <PaymentSteps/>

                <Row>
                    <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                        <ContentPayment origin={origin} gateWays={gateWays} reserveInfo={reserveInfo} paymentStatus={paymentStatus} />
                    </Col>

                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <AsidePayment reserveInfo={reserveInfo} hotelInfo={hotelInfo}/>
                    </Col>
                </Row>

            </div>
        </div>
    )
}

Payment.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
Payment.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(Payment)
