import React,{useEffect,useState} from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation, Router, Link } from '../../../../i18n';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import dynamic from 'next/dynamic'

import styles from '../../../styles/Home.module.css';
import { Row, Col,Form,Modal } from 'antd';
import { GetPreReserve, GetHotelById, HotelDomesticReserve, validateDiscountCode, registerDiscountCode } from '../../../actions';
import DiscountCode from "./DiscountCode";

const CheckoutSteps = dynamic(() => import('./CheckoutSteps'))
const AsideCheckout = dynamic(() => import('./AsideCheckout'))
const ContentCheckout = dynamic(() => import('./ContentCheckout'))

const Checkout = props =>{
    const router = useRouter();
    const { t } = props;

    const [hotelInfo,setHotelInfo]=useState();  
    const [roomsInfo,setRoomsInfo]=useState();  
    const [dates,setDates]=useState(); 
    const [totalPrices,setTotalPrices]=useState();      
    const [searchedRoomInfo,setSearchedRoomInfo] = useState();  
    const [submitLoading,setSubmitLoading] = useState(false); 
    const [countryCode,setCountryCode] = useState(98);  
    const [PhoneNumber,setphoneNumber] = useState();  
    const [reserverIsPassenger,setReserverIsPassenger] = useState(true);
    const [discountPromoCode, setDiscountCode] = useState('');
    const [discountResponse, setDiscountResponse] = useState('');
    const [discountMessage, setDiscountMessage] = useState('');
    const [discountLoading, setDiscountLoading] = useState(false);
    const [hotelPreReserve, setHotelPreReserve] = useState();

    const [firstPassenger,setFirstPassenger] = useState({gender:true,fName:"",lName:""});  

    useEffect(()=>{
        if (props.userInfo?.isAuthenticated){
            setFirstPassenger({
                gender:props.userInfo.user.gender,
                fName:props.userInfo.user.firstName,
                lName:props.userInfo.user.lastName 
            })
        }
    },[props.userInfo]);

    const [form] = Form.useForm();


    const changeReserverInfo = (value,field) => {
        let firstPassengerInfo = {...firstPassenger};
        if (field === "fName"){
            if (reserverIsPassenger){
                firstPassengerInfo.fName=value;
            }
        } else if (field === "lName"){
            if (reserverIsPassenger){
                firstPassengerInfo.lName=value;
            }
        } else if (field === "gender"){
            if (reserverIsPassenger){
                firstPassengerInfo.gender=value==="true"?true:false; 
            }
        }
        setFirstPassenger(firstPassengerInfo);
    }

    const changeFirstPassenger = (value,field) =>{
        setReserverIsPassenger(false);
        let firstPassengerInfo = {...firstPassenger};
        if (field === "fName"){
            firstPassengerInfo.fName=value;
        } else if (field === "lName"){
            firstPassengerInfo.lName=value;
        } else if (field === "gender"){
            firstPassengerInfo.gender= value;
        }
        setFirstPassenger(firstPassengerInfo);
    }
    
    const addDiscountCode = async () => {
        setDiscountLoading(true);
        const pathName = router.asPath;
        let key = pathName.split("key=")[1];
        let type = "HotelDomestic";
        const res = await validateDiscountCode(key, type, discountPromoCode);
        if (res.status == 200) {
            setDiscountResponse(res.data.result)
            setDiscountMessage(res.data.error)
            setDiscountLoading(false)
        } else {
            setDiscountMessage(res.data.error)
            setDiscountLoading(false)
        }
    }

    // const onChangeReserverData=(value,filed)=>{
    //     if(reserverIsPassenger){
    //         if (filed==="gender"){
    //             form.setFieldsValue({
    //                 passenger1gender :value
    //             });  
    //         }else if (filed==="fName"){
    //             form.setFieldsValue({
    //                 passenger1fname :"values"
    //             }); 
                
    //         }else if (filed==="lName"){
    //             form.setFieldsValue({
    //                 passenger1lname :"value"
    //             }); 
    //         } 
    //     }
    // };



    useEffect(()=>{   
        const fetchData = async () => {
            const pathName = router.asPath;
            let key = pathName.split("key=")[1];
           
            const response = await GetPreReserve(key);
            if (response.data) {  
                let HotelId;
                if (response.data.result){
                    setRoomsInfo(response.data.result.rooms);
                    setHotelPreReserve(response.data.result);

                    //only 1 room is available for domestic hotels:
                    let searchedRoom=`adult-${response.data.result.rooms[0].adultNo}`;
                    let childrenAgesArray = response.data.result.rooms[0].childAges;
                    for (let i=0 ; i< childrenAgesArray.length ; i++){
                        searchedRoom += `/child-${childrenAgesArray[i]}`
                    }
                    setSearchedRoomInfo(searchedRoom);

                    setDates([response.data.result.checkinDate,response.data.result.checkoutDate]);
                    let totalSalePrice=0;
                    let totalBoardPrice=0;
                    for(let i = 0 ; i<response.data.result.rooms.length ; i++){
                        totalSalePrice += response.data.result.rooms[i].salePrice;
                        totalBoardPrice += response.data.result.rooms[i].boardPrice;
                    }
                    setTotalPrices({
                        salePrice:totalSalePrice,
                        boardPrice:totalBoardPrice,
                        diff:totalBoardPrice-totalSalePrice
                    });
                    HotelId = response.data.result.hotelId;
                    const HotelInfoResponse = await GetHotelById(HotelId,i18n.language);
                    if (HotelInfoResponse.data){
                        setHotelInfo(HotelInfoResponse.data);
                    }
                }  
            }
          };

          fetchData();
    },[t]);
    
    const onSubmit = async (values)=>{
        setSubmitLoading(true);
        let rooms =[];

        if (reserverIsPassenger){
            rooms.push( {
                "passengers": [
                   {
                      "firstName": values.registrationFirstName,
                      "lastName": values.registrationLastName,
                      "gender": values.reserverGender,
                      "isLeader": true
                   }
                ],
                "roomNo": 1,
                "rph": roomsInfo[0]["rph"]
             });
        }


        if (values.rooms){

            for (let i = reserverIsPassenger?1:0 ; i < values.rooms.length ; i++) {
                if (values.rooms[i]){
                    let roomPassengers = [{
                        firstName: values.rooms[i].fName,
                        lastName: values.rooms[i].lName,
                        gender: values.rooms[i].gender,
                        isLeader:true
                    }]
                    let roomItem = {
                        passengers:roomPassengers,
                        roomNo:i+1,
                        rph:roomsInfo[i].rph
                    };
                    rooms.push(roomItem);
                }
            }
        }  

        const pathName = router.asPath;
        let key = pathName.split("key=")[1];
        let params = {"referenceId":key,
        "registrationFirstName":values.registrationFirstName,
        "registrationLastName":values.registrationLastName,
        "registrationEmail":values.registrationEmail,
        "SpecialRequest":values.SpecialRequest,
        "registrationNationalCode":values.codeMeli,
        "registrationMobile":values.registrationMobile.replace(/ +/g, "").replace(/[{()}]/g, '').replace(/-/g , ""),
            "rooms": rooms
        };

        const reserveResponse = await HotelDomesticReserve(params);
        if (reserveResponse.data && reserveResponse.data.result) {  
            const id = reserveResponse.data.result.id;
            const username = reserveResponse.data.result.username;
//            const reference_Id = reserveResponse.data.result.referenceId;

            if (discountResponse) {
                await registerDiscountCode(`${id}`, username, discountPromoCode);
            }
            
            if(roomsInfo[0].isOnline){
                Router.push(`/payment?username=${username}&reserveId=${id}`);
            }else{
                Router.push(`/hotel/capacity?reserveId=${id}&username=${username}`);
            }
        }else{
            Modal.error({
                title: t('error-in-reserve-room'),
                content: t('sorry-room-is-full'),
                okText: t('choose-room'),
                onOk:()=>{
                    Router.push(hotelInfo.Url+`/location-${hotelInfo.CityId}/checkin-${dates[0].split("T")[0]}/checkout-${dates[1].split("T")[0]}/${searchedRoomInfo}`+'#anchorroomchoices');     
                }
              });
        }

    }

    return (
        <div
            className={`${styles.checkout} ${process.env.THEME_NAME === "TRAVELO" && styles.checkoutTravelo}`}
            >
            <div className={styles.container}>
                
                <CheckoutSteps/>

                <Form layout="vertical" name="nest-messages" onFinish={onSubmit} form={form} >
                    <Row gutter={[20,0]}>
                        <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                            { props.userInfo.loadingGetUser || <ContentCheckout 
                            hotelInfo={hotelInfo}
                            roomsInfo={roomsInfo}
                            searchedInfo={hotelInfo && `/location-${hotelInfo.CityId}/checkin-${dates[0].split("T")[0]}/checkout-${dates[1].split("T")[0]}/${searchedRoomInfo}`}
                            onToggleReserverPassenger={e=>{setReserverIsPassenger(e)}}
                            reserverIsPassenger= {reserverIsPassenger}
                            changeReserverInfo={changeReserverInfo}
                            changeFirstPassenger={changeFirstPassenger}
                            firstPassenger={firstPassenger}
                            userInfo={props.userInfo.isAuthenticated?props.userInfo.user:undefined}
                            />}

                            <DiscountCode
                                setDiscountCode={setDiscountCode}
                                discountMessage={discountMessage}
                                addDiscountCode={addDiscountCode}
                                discountLoading={discountLoading}
                                setDiscountResponse={setDiscountResponse}
                                />
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                            <AsideCheckout
                                hotelInfo={hotelInfo}
                                roomsInfo={roomsInfo}
                                dates={dates}
                                totalPrices={totalPrices}
                                submitLoading={submitLoading}
                                discountResponse={discountResponse}
                                hotelPreReserve={hotelPreReserve}
                            />
                        </Col>
                    </Row>
                </Form>

            </div>
        </div>
    )

}

Checkout.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
Checkout.propTypes = {
t: PropTypes.func.isRequired,
}
  

const mapStatesToProps = state => {
    return {
        userInfo : state.auth
    }
}
  
export default connect(mapStatesToProps)(withTranslation('common')(Checkout))