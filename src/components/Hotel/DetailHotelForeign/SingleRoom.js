import React,{useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { Link, i18n, withTranslation } from '../../../../i18n'
import { useRouter } from 'next/router';
import { Button,Tooltip } from 'antd'
import moment from 'moment-jalaali';
import dynamic from 'next/dynamic'

import styles from '../../../styles/Hotel.module.css'
import { CoffeeOutlined, UserOutlined } from '@ant-design/icons'

const Cancellation = dynamic(() => import('../Cancellation/Cancellation'))

const SingleRoom = props => {
    const { t } = props;
    const router = useRouter();

    function numberWithCommas(x) {
        if (x){
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }else{
            return "0";
        }
    }


    let checkin,
    checkout,
    roomsInfo;
    const urlParams = router.asPath.split("hotel-foreign")[1];
    if (urlParams.includes("checkin-")){
        checkin = urlParams.split("checkin-")[1].split("/")[0];
    }else{
        checkin = moment().format("YYYY-MM-DD");
    }
    if (urlParams.includes("checkout-")){
        checkout = urlParams.split("checkout-")[1].split("/")[0];
    }else{
        checkout = moment().add(1, "day").format("YYYY-MM-DD");
    }            
    if (urlParams.includes("adult-")){
        let roomsArray = urlParams.split("adult-");
        roomsArray.shift();
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
    
    return (
        <div
            className={`${styles.cardRoomChoices} ${process.env.THEME_NAME === "TRAVELO" && styles.cardRoomChoicesTravelo}`}
            >
            {/* <h3>{item.rooms[0].name}</h3> */}
            <h3>{props.roomInfo.name}</h3>
            <div className={styles.contentCardRoomChoices}>
                <div className={styles.imageCardRoomChoices}>
                    {/* <div className={styles.imageRoom}>
                        <img src="https://cdn.mehrbooking.net/general/Images/RoomType/tehran-espinas-palace-hotel-twin-room.jpg" alt="" />
                    </div> */}
                    <div className={styles.facilitiesRoom}>
                        <ul className="font-12">
                        {props.hotelDetails.features.filter(featuresItem=>featuresItem.keyword === "room_facilities")[0] &&
                            props.hotelDetails.features.filter(featuresItem=>featuresItem.keyword === "room_facilities")[0].items.map((roomFacilityItem,facilityIndex) => 
                            (facilityIndex < 5 || roomFacilityItem.isImportant)?
                            <li key={roomFacilityItem.keyword} className={roomFacilityItem.isImportant?"is-important":""}>
                                {(roomFacilityItem.typeHint === "bool") ?
                                <>
                                {roomFacilityItem.name}
                                </>  
                                :(roomFacilityItem.typeHint === "int")?
                                <>
                                {roomFacilityItem.name} : {roomFacilityItem.value}
                                </>
                                :
                                roomFacilityItem.name
                                }
                            </li>:null)}                      
                        </ul>
                    </div>
                </div>
                <div className={styles.bedCardRoomChoices}>
                    {props.ratesInfo.map((rateItem,index)=><div  key={rateItem.bookingToken} className={styles.bedRoomPackage}>
                        <div className={styles.bedRoomPackageName}>
                            {index === 0 && 
                                <div className={styles.bedRoomSubject}>
                                    {t("contain")}
                                </div>
                            }
                            <div className={styles.bedRoomDetailPackage}>
                                <div className={styles.detailPackageSubject}>
                                    <Tooltip title={rateItem.board.extra}>
                                        {rateItem.board.name}
                                    </Tooltip>
                                </div>    
                                <ul className={styles.detailPackageList}>
                                    <li >
                                        <Cancellation 
                                            status ={rateItem.cancellationPolicy.status} 
                                            parametersString = {`bookingToken=${rateItem.bookingToken}&checkin=${checkin}&checkout=${checkout}${roomsInfo}`}
                                        />
                                    </li>
  
                                    {rateItem.board.description ? (
                                        <li className="margin-top no-link">
                                            <CoffeeOutlined /> <span> {rateItem.board.description}</span>
                                        </li>
                                        ) 
                                    : null}
                                </ul>
                            </div>
                        </div>
                        <div className={styles.bedRoomPackageCount}>
                            {index === 0 && 
                                <div className={styles.bedRoomSubject}>
                                    {t("number")}
                                </div>
                            }
                            <div className={styles.detailPackageCount}>
                                <UserOutlined /> <span> {rateItem.totalAdults} </span> <span> {t("adult")} </span> {(rateItem.totalChildren > 0) && <> <span> و </span> <span> {rateItem.totalChildren} </span> <span> {t("child")}</span></> }
                            </div>
                        </div>
                        <div className={styles.bedRoomPackagePrice}>
                            {index === 0 && 
                                <div className={styles.bedRoomSubject}>
                                    {t("fee")}
                                </div>
                            }
                            <div className={styles.detailPackagePrice}>

                                {(rateItem.salePrice && rateItem.regularPrice && (rateItem.salePrice !== rateItem.regularPrice)) && <>
                                    {rateItem.discountPercent && rateItem.discountPercent>0 ?<span className="red-tag margin-bottom-small">{rateItem.discountPercent}{t("discount")}</span>:null}
                                    <div className={styles.oldPrice}>
                                        {numberWithCommas(rateItem.regularPrice)} {t('rial')}
                                    </div>
                                </>}
                                <Tooltip placement="topLeft" title={
                                    <div>
                                        <div>
                                            <span>{numberWithCommas((rateItem.salePrice/props.nights).toFixed(0))}</span>
                                            <span> {t('rial')} </span>
                                        </div>
                                        <small>
                                            {t("Avg-per-night")}
                                        </small>
                                    </div>
                                }>
                                    <div className="new-price">
                                        {numberWithCommas(rateItem.salePrice)} {t('rial')}
                                        <b className="font-20">
                                        </b>
                                    </div>
                                </Tooltip>

                                {props.nights && <span className={styles.detailsmall}>{t("price-start-from")} {props.nights} {t("night")}</span>}
                            </div>
                        </div>
                        <div className={styles.bedRoomPackageBtn}>
                            <Button 
                                type="primary" 
                                danger
                                className={`min-width-150 antd-btn-loading-end ${process.env.THEME_NAME === "TRAVELO" && "antd-btn-select-room-travelo"}`}
                                disabled={props.selectedRoomBookingToken && (props.selectedRoomBookingToken!==rateItem.bookingToken)}
                                loading={props.selectedRoomBookingToken && (props.selectedRoomBookingToken===rateItem.bookingToken)}
                                onClick = {(e)=>{
                                    props.preReserve(rateItem.bookingToken);
                                }}
                            >
                                {t("room-reserve")}
                            </Button>
                        </div> 
                    </div>)}
                    
                </div>
            </div>
        </div>
    )
}

SingleRoom.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
SingleRoom.propTypes = {
t: PropTypes.func.isRequired,
}
  
  
const mapStateToProp = (state) => {
    return {
      hotelDetails: state.hotel.foreignHotelDetail
    };
};

export default withTranslation('common')(connect(mapStateToProp)(SingleRoom))
