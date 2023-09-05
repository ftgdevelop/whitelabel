import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation, Router } from '../../../../i18n'
import {useRouter} from 'next/router'
import dynamic from 'next/dynamic'
import moment from 'moment-jalaali'

import styles from '../../../styles/Home.module.css'
import { Row, Col,notification } from 'antd'

import { HotelV4DomesticGetReserve, GetHotelById, getConfirmHotelV4Domestic, getOrder } from '../../../actions'

const BookingSteps = dynamic(() => import('./BookingSteps'))
const AsideV4 = dynamic(() => import('../Shared/AsideV4'))
const ContentBookingV4 = dynamic(() => import('./ContentBookingV4'))

const BookingV4 = props => {
    const { t } = props;
    const router = useRouter();
    const reserveId = router.query.reserveId;
    const path = router.asPath;
    const username = path.split("username=")[1]?.split("&")[0].split("#")[0];

    const [data, setData] = useState("");
    const [loading, setLoading] = useState(true);
    const [reserveInfo,setReserveInfo]=useState(); 
    const [hotelInfo, setHotelInfo] = useState();
    const [coordinatorPrice, setCoordinatorPrice] = useState("");

    const fetchData = async () => {
        const response = await HotelV4DomesticGetReserve(reserveId,username);
        if (response.data) {  
            setReserveInfo(response.data.result);
            const hotelId = response.data.result.accommodationId;
            const HotelInfoResponse = await GetHotelById(hotelId,i18n.language);
            if (HotelInfoResponse.data){
                setHotelInfo(HotelInfoResponse.data);
            }

        }
    };
    const openNotification = (type, placement, msg) => {
        notification[type]({
          message: msg,
          description: "",
          placement,
          style: {
            color: "#fff",
            background: "rgba(0,0,0,0.8)",
          },
        });
      };
      
    const getConfirm = async () => {
        const res = await getConfirmHotelV4Domestic(reserveId, username);
        if (res.status == 200) {
          if (res.data.result.isCompleted) {
            const data = res.data.result;
              setData(data);
            setLoading(false);
          } else {
            setData(data);
            setTimeout(getConfirm,4000);
          }
        } else {
            setLoading(false);
            openNotification("error", "topRight", res.data.error.message);
        }
    };

    const getOrderPrice = async () => {
        const res = await getOrder(reserveId, username);
        if (res?.status == 200) {
            setCoordinatorPrice(res.data.result.salePrice);
        }
    };
      
    useEffect(() => {
        
        fetchData();
        getConfirm();
        getOrderPrice();

    },[]);

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
    if(reserveInfo){
        reserveInformation = {
            reserveId:reserveInfo.id,
            checkin:reserveInfo.checkin,
            checkout:reserveInfo.checkout,
            duration:moment(reserveInfo.checkout).diff(moment(reserveInfo.checkin),'days'),
            rooms : reserveInfo.rooms.map(roomItem =>({
                name:roomItem.name,
                board:roomItem.boardCode,
                cancellationPolicyStatus:roomItem.cancellationPolicyStatus,
                bed:roomItem.bed
            })),
            // salePrice:reserveInfo.totalPrice,
            salePrice: coordinatorPrice,
            boardPrice:reserveInfo.totalBoardPrice || 0,
        }   
    }
  
    

    return (
        <div
            className={`${styles.booking} ${process.env.THEME_NAME === "TRAVELO" && styles.bookingTravelo}`}
        >
            <div className={styles.container}>

                <BookingSteps/>

                <Row gutter={[20]}>
                    <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                        
                        <ContentBookingV4 
                            progress={loading}
                            data={data}
                            reserveInfo={reserveInfo}
                            reserveId={reserveId}
                            username={username}
                        />
                        
                    </Col>

                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <AsideV4
                            hotelInformation={hotelInformation}
                            reserveInformation={reserveInformation}
                            isBooking
                        />                      
                    </Col>
                </Row>

            </div>
        </div>
    )
}

BookingV4.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
BookingV4.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(BookingV4)
