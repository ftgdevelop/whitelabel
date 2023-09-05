import React,{useEffect,useState} from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { withTranslation, Router, Link, i18n } from '../../../../i18n';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic'

import styles from '../../../styles/Home.module.css';
import { Row, Col, Form } from 'antd';
import {foreignHotelReserve,foreignPreReserveKey} from '../../../actions';

const CheckoutSteps = dynamic(() => import('./CheckoutSteps'))
const AsideCheckout = dynamic(() => import('./AsideCheckout'))
const ContentCheckout = dynamic(() => import('./ContentCheckout'))

const CheckoutForeign = props =>{

    const { t } = props;
    const router = useRouter();

    const [hotelInfo,setHotelInfo]=useState();  
    const [roomsInfo,setRoomsInfo]=useState();  
    const [dates,setDates]=useState(); 
    const [totalPrices,setTotalPrices]=useState();      
    const [searchedInfo,setSearchedInfo] = useState();  
    const [submitLoading,setSubmitLoading] = useState(false); 

    
    

    useEffect(()=>{
        const urlDetails = router.asPath.split("/id-")[1].split("/preReserveKey=")[0];
        setSearchedInfo("/id="+urlDetails);
        
        const fetchData = async () => {
            const pathName = router.asPath;
            let key = pathName.split("/preReserveKey=")[1];
            const response = await foreignPreReserveKey(key);
            if (response.data) {  
                setHotelInfo(response.data.result);
            }
          };

          fetchData();


    },[]);
    
    const onSubmit = async (values)=>{
        setSubmitLoading(true);
        const pathName = router.asPath;
        const key = pathName.split("preReserveKey=")[1];
        let passengers = [];
        let valuesArray = Object.keys(values).map((key) => [key, values[key]]);
        const roomsQ =valuesArray.filter(item=> item[0].includes("passenger0-gender")).length;
        for (let i = 0 ; i<roomsQ ; i++  ){
            const roomValuesArray = valuesArray.filter(item=> item[0].includes(`room${i}-`));
            const roomPassengersQ = roomValuesArray.filter(item=>item[0].includes("gender")).length;
            for (let j = 0 ; j < roomPassengersQ ; j++){
                let passengerInfo = roomValuesArray.filter(item => item[0].includes(`passenger${j}`)); 
                let passengerItem = {
                    "gender":passengerInfo.filter(item => item[0].includes("gender"))[0][1],
                    "firstName":passengerInfo.filter(item => item[0].includes("fname"))[0][1],
                    "lastName":passengerInfo.filter(item => item[0].includes("lname"))[0][1],
                    "nationalityCode":passengerInfo.filter(item => item[0].includes("nationality"))[0][1].split("_")[1],
                    "roomNumber":i+1,
                    "ageCategory":(passengerInfo.filter(item => item[0].includes("fname-adult")).length > 0)?"Adult":"Child"
                }
                passengers.push(passengerItem);
            }
        }
        let params = {
            "reserver":{
            "gender":values.reserverGender,
            "firstName":values.registrationFirstName,
            "lastName":values.registrationLastName,
            "email":values.registrationEmail,
            // "postalcode":"00"+countryCode,
            "phoneNumber":values.registrationMobile.replace(/ +/g, "").replace(/[{()}]/g, '').replace(/-/g , ""),
            "username":values.registrationEmail
            },
            "preReserveKey":key,
            "specialRequest":values.specialRequest,
            "passengers":passengers
        }

        const reserveResponse = await foreignHotelReserve(params);
        if (reserveResponse.data) {
            const reserveId = reserveResponse.data.result.id;
            const userName = reserveResponse.data.result.reserver.username;
            Router.push(`/payment?reserveId=${reserveId}&username=${userName}`);
        }

    }


    return (
        <div
            className={`${styles.checkout} ${process.env.THEME_NAME === "TRAVELO" && styles.checkoutTravelo}`}
            >
            <div className={styles.container}>

                <CheckoutSteps/>

                <Form layout="vertical" name="nest-messages" 
                 onFinish={onSubmit} 
                >
                    <Row gutter={[20,0]}>
                        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                            { props.userInfo.loadingGetUser || <ContentCheckout 
                            hotelInfo={hotelInfo} 
                            searchedInfo={searchedInfo} 
                            userInfo={props.userInfo.isAuthenticated?props.userInfo.user:undefined}
                            />}
                        </Col>

                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <AsideCheckout hotelInfo={hotelInfo} submitLoading={submitLoading} />
                        </Col>
                    </Row>

                </Form>

            </div>
        </div>
    )

}

CheckoutForeign.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
CheckoutForeign.propTypes = {
t: PropTypes.func.isRequired,
}

const mapStatesToProps = state => {
    return {
        userInfo : state.auth
    }
}
  
export default connect(mapStatesToProps)(withTranslation('common')(CheckoutForeign))
