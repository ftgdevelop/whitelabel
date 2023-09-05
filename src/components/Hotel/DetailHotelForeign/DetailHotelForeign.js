import React,{useEffect,useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import { withTranslation, Router, i18n } from '../../../../i18n'
import { useRouter } from 'next/router';
import { Anchor } from 'antd';
import moment from 'moment-jalaali';
import dynamic from 'next/dynamic'

import {GetForeignHotelById,setForeignHotelDetail,foreignPreReserve} from '../../../actions';
import styles from '../../../styles/Hotel.module.css'

const GalleryHotel = dynamic(() => import('./GalleryHotel'))
const AnchorNavigation = dynamic(() => import('./AnchorNavigation'))
const RoomChoices = dynamic(() => import('./RoomChoices'))
const HotelAmenities = dynamic(() => import('./HotelAmenities'))
const AboutTheHotel = dynamic(() => import('./AboutTheHotel'))
const HotelName = dynamic(() => import('./HotelName'))

const { Link } = Anchor;

const DetailHotelForeign = props => {

    const { t } = props;
    const router = useRouter();

    const [searchedInfo,setSearchedInfo] = useState(); 
    const [singleRoom,setSingleRoom] = useState(true); 
    const [nights,setNights] = useState(); 

    const clearUrlPath = router.asPath.split("?")[0];
    useEffect(()=>{

        const fetchData = async () => {
            if (clearUrlPath.includes("hotel-foreign/") && clearUrlPath.includes("/id=")){
                let hotelId,
                checkin,
                checkout,
                roomsInfo;
                const urlParams = clearUrlPath.split("hotel-foreign")[1];
                let searchedParams = "/checkin-"+clearUrlPath.split("checkin-")[1]
                if (clearUrlPath.includes("checkin")){
                    setSearchedInfo(searchedParams);
                }else{
                    setSearchedInfo("");
                }
                hotelId = urlParams.split("/id=")[1].split("/")[0];
                if (urlParams.includes("checkin-")){
                    checkin =moment(urlParams.split("checkin-")[1].split("/")[0]).format("YYYY-MM-DD");
                }else{
                    checkin = moment().format("YYYY-MM-DD");
                }
                if (urlParams.includes("checkout-")){
                    checkout = moment(urlParams.split("checkout-")[1].split("/")[0]).format("YYYY-MM-DD");
                }else{
                    checkout = moment().add(1, "day").format("YYYY-MM-DD");
                } 
                let nightsNumber = moment(checkout).diff(moment(checkin), 'days');
                setNights(nightsNumber);               
                if (urlParams.includes("adult-")){
                    let roomsArray = urlParams.split("adult-");
                    roomsArray.shift();
                    if (roomsArray.length === 1){
                        setSingleRoom(true);
                    }else{
                        setSingleRoom(false);
                    }
                    let adultsInfo = "";
                    let childrenInfo = "";
                    let agesInfo = "";
                    for(let i=0 ; i < roomsArray.length ; i++){
                        let roomAdult = roomsArray[i].split("/")[0];
                        adultsInfo += "&Adults="+roomAdult;
                        let roomChildrenArr = roomsArray[i].split("child-");
                        roomChildrenArr.shift();
                        childrenInfo += "&Children="+(roomChildrenArr.length);
                        for(let j=0 ; j < roomChildrenArr.length ; j++){
                            let ageItem = roomChildrenArr[j].split("/")[0];
                            agesInfo +="&Ages="+(ageItem);
                        }
                    }
                    roomsInfo = adultsInfo+childrenInfo+agesInfo;
                }else{
                    roomsInfo = '&Adults=2&Children=0';
                }
                let params =`Id=${hotelId}${roomsInfo}&Checkin=${checkin}&Checkout=${checkout}&NationalityCode=IR`;
                const response = await GetForeignHotelById(params);
                if (response.data) {   
                    props.saveHotelDetails(response.data.result);                 
                }

            }else{
                console.log("url parameters is not complete")
            }  

          };

          fetchData();
    },[]);

    
    const preReserve = async (bookingtoken) =>{
        let checkin,
        checkout;
        let adults = [];
        let children = [];
        let ages=[];
        const urlParams = clearUrlPath.split("hotel-foreign")[1];
        let hotelId = urlParams.split("/id=")[1].split("/")[0];
        if (urlParams.includes("checkin-")){
            checkin = moment(urlParams.split("checkin-")[1].split("/")[0]).format("YYYY-MM-DD");
        }else{
            checkin = moment().format("YYYY-MM-DD");
        }
        if (urlParams.includes("checkout-")){
            checkout =  moment( urlParams.split("checkout-")[1].split("/")[0]).format("YYYY-MM-DD");
        }else{
            checkout = moment().add(1, "day").format("YYYY-MM-DD");
        }            
        if (urlParams.includes("adult-")){
            let roomsArray = urlParams.split("adult-");
            roomsArray.shift();
            for(let i=0 ; i < roomsArray.length ; i++){
                let roomAdult = roomsArray[i].split("/")[0];
                adults.push(+roomAdult);
                let roomChildrenArr = roomsArray[i].split("child-");
                roomChildrenArr.shift();
                children.push(roomChildrenArr.length);
                for(let j=0 ; j < roomChildrenArr.length ; j++){
                    let ageItem = roomChildrenArr[j].split("/")[0];
                    ages.push(+ageItem);
                }
            }
        }else{
            adults=[2];
            children=[0];
            ages=[0];
        }

        let params={
            "checkin":checkin,
            "checkout":checkout,
            "bookingToken":bookingtoken,
            "adults":adults,
            "children":children,
            "ages":ages
        }
        const prereserveResponse = await foreignPreReserve(params);
        if (prereserveResponse.data ) {
             let key = prereserveResponse.data.result.preReserveKey;
                Router.push(`/hotel-foreign/checkout/id-${hotelId}${searchedInfo}/preReserveKey=${key}`);
        }

    }


    return (
        <div 
            className={`${styles.detailHotel} ${process.env.THEME_NAME === "TRAVELO" && styles.detailHotelTravelo}`}
            >

            <GalleryHotel 
                // hotelDetails={hotelDetails}
                // loading={hotelDetailLoading}
                // images={images} 
                // score={score} 
                // mapInfo={mapInfo}
            />

            <AnchorNavigation/>

            <HotelName searchedInfo={searchedInfo} />

            <RoomChoices preReserve={preReserve} isSingleRoom={singleRoom} nights={nights} />

            {/* <Reviews /> */}
            
            <HotelAmenities/>

            {/* <Attractions/> */}

            <AboutTheHotel/>

            {/* <SimilarHotels/> */}

        </div>
    )

}

DetailHotelForeign.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
DetailHotelForeign.propTypes = {
t: PropTypes.func.isRequired,
}
const mapDispatchToProp = (dispatch) => ({
    saveHotelDetails : (d) => dispatch(setForeignHotelDetail(d))
});
  
export default withTranslation('common')(connect(null,mapDispatchToProp)(DetailHotelForeign))
