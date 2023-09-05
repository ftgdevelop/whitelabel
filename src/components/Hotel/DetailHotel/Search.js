import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import { withTranslation, Link, i18n } from '../../../../i18n'
import _ from "lodash";
import {useRouter} from 'next/router';
import styles from '../../../styles/Hotel.module.css'
import dynamic from 'next/dynamic'

const SearchHotel = dynamic(() => import('../SearchHotel/SearchHotel'))

const Search = props=> {
    const {t} = props;
    const [checkin,SetCheckin] =  useState();
    const [checkout,SetCheckout] =  useState();
    const [defaultRooms,setDefaultRooms] =  useState();
    const router = useRouter();
    useEffect(()=>{
        if (router.asPath.includes("checkin-") && router.asPath.includes("checkout-")){
            SetCheckin(router.asPath.split("checkin-")[1].split("/")[0]);
            SetCheckout(router.asPath.split("checkout-")[1].split("/")[0]);
        }

        let defaultRoomsArray=[];
        if (router.asPath.includes("adult-")){
            const roomsGuestsArray = router.asPath.split("adult-");
            roomsGuestsArray.shift();            
            for( let i=0 ; i<roomsGuestsArray.length ; i++){
                let defaultRoomInfo ={};
                defaultRoomInfo['adultNo'] = +roomsGuestsArray[i].split("/")[0];
                let defaultChildren =[];
                let roomChildrenData = roomsGuestsArray[i].split('child-');
                roomChildrenData.shift();
                for( let j=0 ; j<roomChildrenData.length ; j++){
                    let defaultChildAge = +roomChildrenData[j].split("/")[0];
                    defaultChildren.push(defaultChildAge);
                }
                defaultRoomInfo['childrenAges']=defaultChildren;
                defaultRoomsArray.push(defaultRoomInfo);
            }
        }else{
            defaultRoomsArray=[{adultNo: 1, childrenAges: []}]
        }
        setDefaultRooms(defaultRoomsArray);


    },[]);

    
    return (
        <div className={styles.search}>
            <div className={`${styles.container} domestic-hotel-room-search-holder`}>
                <div className={styles.subjectSearch}>
                    {t('change-search')}
                </div>
          
                <SearchHotel 
                    domesticHotelRoomSearch={true} 
                    defaultSearchValue={props.hotelDetails && props.hotelDetails.HotelCategoryName+" "+props.hotelDetails.HotelName+" "+props.hotelDetails.CityName}
                    cityId={props.hotelDetails && props.hotelDetails.CityId}
                    selectedHotelId={props.hotelDetails && props.hotelDetails.HotelId}
                    //hotelUrl = {`${props.hotelDetails && props.hotelDetails.Url}/location-${props.hotelDetails && props.hotelDetails.CityId}`}
                    checkinDate={checkin}
                    checkoutDate={checkout}
                    defaultRooms={defaultRooms}
                    typeId={4}
                />

            </div>
        </div>
    )
    
}

Search.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
Search.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(Search)
