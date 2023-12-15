import React,{useEffect,useState} from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation, Router, Link } from '../../../../i18n';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import dynamic from 'next/dynamic'

import styles from '../../../styles/Home.module.css';
import { Row, Col,Form,Modal } from 'antd';
import { DomesticHotelV4GetValidate ,DomesticHotelV4PreReserve} from '../../../actions';
import { GetHotelById, validateDiscountCode, registerDiscountCode } from '../../../actions';
import DiscountCode from "./DiscountCode";
import moment from 'moment';

const CheckoutSteps = dynamic(() => import('./CheckoutSteps'))
const AsideV4 = dynamic(() => import('../Shared/AsideV4'))
const ContentCheckoutV4 = dynamic(() => import('./ContentCheckoutV4'))

const CheckoutV4 = props =>{
    const router = useRouter();
    const { t } = props;

    const [hotelInfo,setHotelInfo]=useState(); 
    const [reserveInfo,setReserveInfo]=useState(); 
    const [submitLoading,setSubmitLoading] = useState(false); 
    const [discountPromoCode, setDiscountCode] = useState('');
    const [discountResponse, setDiscountResponse] = useState('');
    const [discountMessage, setDiscountMessage] = useState('');
    const [discountLoading, setDiscountLoading] = useState(false);
    const [roomChildAndExtraBed, setRoomChildAndExtraBed] = useState([]);
    const [specialRequestText,setSpecialRequestText] = useState("");
    // const [hotelPreReserve, setHotelPreReserve] = useState();

    //const [firstPassenger,setFirstPassenger] = useState({gender:true,fName:"",lName:""});  
    const [reserverPhoneNumber,setReserverPhoneNumber]=useState("");
    const changePhoneNumber = number => {
        setReserverPhoneNumber(number);
    }
    const updateRoomChildAndExtraBed = (roomIndex,property,value,fee) => {
        if (roomChildAndExtraBed?.length){
            setRoomChildAndExtraBed(prevState => {
                const updatedState = [...prevState];
                updatedState[roomIndex][property] = value;
                if(property === "selectedChild"){
                    updatedState[roomIndex]["childFee"] = fee;
                }
                if(property === "selectedExtraBed"){
                    updatedState[roomIndex]["extraBedFee"] = fee;
                }
                return updatedState
            });
        }
    }

    const [form] = Form.useForm();
    
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

    let hotelInformation,reserveInformation;
    if (hotelInfo){
        hotelInformation = {  
            image : {
                url : hotelInfo.ImageUrl,
                alt:hotelInfo.ImageAlt,
                title:hotelInfo.ImageTitle
            },
            name : `${hotelInfo.HotelCategoryName} ${hotelInfo.HotelName} ${hotelInfo.CityName}`,
            rating: hotelInfo.HotelRating,
            address : hotelInfo.Address,
            TopSelling:hotelInfo.TopSelling,
            Url:hotelInfo.Url,
            CityId:hotelInfo.CityId
        }
    }
    
    let needToInquire = false;

    if(reserveInfo){
        reserveInformation = {
            checkin:reserveInfo.checkin,
            checkout:reserveInfo.checkout,
            duration:moment(reserveInfo.checkout).diff(moment(reserveInfo.checkin),'days'),
            rooms : reserveInfo.rooms.map(roomItem =>({
                name:roomItem.name,
                board:roomItem.boardCode,
                cancellationPolicyStatus:roomItem.cancellationPolicyStatus,
                bed:roomItem.bed,
                extraBed:roomItem.extraBed,
                pricing:roomItem.pricing,
                maxChildAge:roomItem.maxChildAge,
                maxInfantAge:roomItem.maxInfantAge
            })),

            salePrice : reserveInfo.rooms.reduce((totalPrice,roomItem)=>{
                const roomItemPrice = roomItem.pricing.find(
                    item => item.type === "Room" && item.ageCategoryType === "ADL"
                )?.amount;
                if (roomItemPrice){
                    return totalPrice + +roomItemPrice
                }else{
                    needToInquire = true;
                    return null;
                }
            },0),
            boardPrice : reserveInfo.rooms.reduce((totalPrice,roomItem)=>{
                const roomItemPrice = roomItem.pricing.find(
                    item => item.type === "RoomBoard" && item.ageCategoryType === "ADL"
                )?.amount;
                if (roomItemPrice){
                    return totalPrice + +roomItemPrice
                }else{
                    needToInquire = true;
                    return null;
                }
            },0)

        }   
    }

    useEffect(()=>{   
        const fetchData = async () => {
            const pathName = router.asPath;
            let key = pathName.split("key=")[1];
            const response = await DomesticHotelV4GetValidate(key);
            if (response.data) {  
                setReserveInfo(response.data.result);

                const initialExtra = response.data.result?.rooms?.map( _ => ({selectedChild:false,selectedExtraBed:0,childFee:0,extraBedFee:0}));
                setRoomChildAndExtraBed(initialExtra);

                const HotelId = response.data.result.accommodationId;
                const HotelInfoResponse = await GetHotelById(HotelId,i18n.language);
                if (HotelInfoResponse.data){
                    setHotelInfo(HotelInfoResponse.data);
                }


                // let HotelId;
                // if (response.data.result){
                //     setRoomsInfo(response.data.result.rooms);
                //     setHotelPreReserve(response.data.result);

                //     let searchedRoom=`adult-${response.data.result.rooms[0].adultNo}`;
                //     let childrenAgesArray = response.data.result.rooms[0].childAges;
                //     for (let i=0 ; i< childrenAgesArray.length ; i++){
                //         searchedRoom += `/child-${childrenAgesArray[i]}`
                //     }
                //     setSearchedRoomInfo(searchedRoom);

                //     setDates([response.data.result.checkinDate,response.data.result.checkoutDate]);
                //     let totalSalePrice=0;
                //     let totalBoardPrice=0;
                //     for(let i = 0 ; i<response.data.result.rooms.length ; i++){
                //         totalSalePrice += response.data.result.rooms[i].salePrice;
                //         totalBoardPrice += response.data.result.rooms[i].boardPrice;
                //     }
                //     setTotalPrices({
                //         salePrice:totalSalePrice,
                //         boardPrice:totalBoardPrice,
                //         diff:totalBoardPrice-totalSalePrice
                //     });
                //     HotelId = response.data.result.hotelId;
                //     const HotelInfoResponse = await GetHotelById(HotelId,i18n.language);
                //     if (HotelInfoResponse.data){
                //         setHotelInfo(HotelInfoResponse.data);
                //     }
                // }  
            }
          };

          fetchData();
    },[t]);
    
    const onSubmit = async (values)=>{
        setSubmitLoading(true);
        const pathName = router.asPath;
        const key = pathName.split("key=")[1];

        const reserverInformation = {...values.reserver} ;
        if (reserverPhoneNumber.toString()[0]==="+"){
            reserverInformation.phoneNumber = reserverPhoneNumber;
        }else{
            reserverInformation.phoneNumber = "+"+reserverPhoneNumber;
        }
        const passengerInformation = values.passengers?.map(item => ({
            ...item,
            extraBed:item.extraBed || 0,
            childrenAge: item.childrenAge ? [item.childrenAge] : []
        }));

        const params ={
            ...values,
            passengers:passengerInformation,
            reserver:reserverInformation,
            specialRequest:specialRequestText,
            preReserveKey:key
        }

        const reserveResponse = await DomesticHotelV4PreReserve(params);
        if (reserveResponse.data && reserveResponse.data.result) {
            const id = reserveResponse.data.result.id;
            const username = reserveResponse.data.result.username;

            if (discountResponse) {
                await registerDiscountCode(`${id}`, username, discountPromoCode);
            }
            
            if(reserveResponse.data.result.rooms.every(x => x.availablityType === "Online")){
                Router.push(`/payment?username=${username}&reserveId=${id}`);
            }else{
                Router.push(`/hotel/capacity?reserveId=${id}&username=${username}`);
            }
        }else{

            let backUrl;
            if (reserveInfo && hotelInfo){
                backUrl=`${hotelInfo.Url}/location-${hotelInfo.CityId}/checkin-${moment(reserveInfo.checkin).format("YYYY-MM-DD")}/checkout-${moment(reserveInfo.checkout).format("YYYY-MM-DD")}#anchorroomchoices`;
            }

            Modal.error({
                title: t('error-in-reserve-room'),
                content: t('sorry-room-is-full'),
                okText: t('choose-room'),
                onOk:()=>{
                    Router.push(backUrl);     
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
                            { props.userInfo.loadingGetUser || <ContentCheckoutV4 
                                form={form}
                                hotelInformation={hotelInformation}
                                reserveInformation={reserveInformation}
                                changePhoneNumber ={changePhoneNumber}
                                userInfo={props.userInfo.isAuthenticated?props.userInfo.user:undefined}
                                updateRoomChildAndExtraBed={updateRoomChildAndExtraBed}
                                setSpecialRequestText={setSpecialRequestText}
                            />}

                            { props.userInfo.loadingGetUser || <DiscountCode
                                setDiscountCode={setDiscountCode}
                                discountMessage={discountMessage}
                                addDiscountCode={addDiscountCode}
                                discountLoading={discountLoading}
                                setDiscountResponse={setDiscountResponse}
                            />}
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                            <AsideV4
                                hotelInformation={hotelInformation}
                                reserveInformation={reserveInformation}
                                submitLoading={submitLoading}
                                roomChildAndExtraBed={roomChildAndExtraBed}
                                discountResponse={discountResponse}
                                hasSubmit
                            />
                        </Col>
                    </Row>
                </Form>

            </div>
        </div>
    )

}

CheckoutV4.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
CheckoutV4.propTypes = {
t: PropTypes.func.isRequired,
}
  

const mapStatesToProps = state => {
    return {
        userInfo : state.auth
    }
}
  
export default connect(mapStatesToProps)(withTranslation('common')(CheckoutV4))