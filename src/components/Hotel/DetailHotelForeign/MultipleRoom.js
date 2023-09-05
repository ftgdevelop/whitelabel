import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { withTranslation, Link, i18n } from '../../../../i18n'
import { useRouter } from 'next/router';
import { Button, Tooltip } from 'antd'
import moment from 'moment-jalaali';
import dynamic from 'next/dynamic'

import styles from '../../../styles/Hotel.module.css'
import { CoffeeOutlined, UserOutlined } from '@ant-design/icons'

const Cancellation = dynamic(() => import('../Cancellation/Cancellation'))

const MultipleRoom = props => {
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
        <div className={styles.cardRoomChoices}>
            <div className={`${styles.contentCardRoomChoices} ${styles.contentCardMultiRoomChoices}`}>
                <div className={styles.detailMultiRoom}>
                    {props.roomInfo.map((roomItem,roomIndex)=> <div key={roomIndex} className={styles.roomDetailMultiRoom}>
                        <h5>{roomIndex+1}. {roomItem.name}</h5>
                        <div className={styles.imageDetailMultiRoom}>
                            <div className={styles.imageRoom}>
                                <div>
                                    <img src="https://cdn.mehrbooking.net/general/Images/RoomType/Tehran-espinas-palas-hotel-royal-room.jpg" alt="" />
                                </div>
                            </div>
                            <div className={styles.detailRoom}>
                                <div className={styles.passengerCount}>
                                    <span>{roomItem.adults} </span> <span>{t('adult')}</span> { roomItem.children > 0 && <> <span>+</span> <span>{roomItem.children}</span> <span>{t('child')}</span> </>}
                                </div>
                                {/* <div className={styles.bedCount}>
                                    <BedIcon/>
                                    ۲ تخته توئین
                                </div> */}
                            </div>
                        </div>
                    </div>
                    
                    )}
                    {/* <div className={styles.roomDetailMultiRoom}>
                        <h5>۱. اتاق دو تخته دبل</h5>
                        <div className={styles.imageDetailMultiRoom}>
                            <div className={styles.imageRoom}>
                                <div>
                                    <img src="https://cdn.mehrbooking.net/general/Images/RoomType/Tehran-espinas-palas-hotel-royal-room.jpg" alt="" />
                                </div>
                            </div>
                            <div className={styles.detailRoom}>
                                <div className={styles.passengerCount}>۲ {t('adult')}</div>
                                <div className={styles.bedCount}>
                                    <BedIcon/>
                                    ۲ تخته توئین
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
                {/* <div className={styles.imageCardRoomChoices}>
                    <div className={styles.imageRoom}>
                        <img src="https://cdn.mehrbooking.net/general/Images/RoomType/Tehran-espinas-palas-hotel-royal-room.jpg" alt="" />
                    </div>
                    <div className={styles.facilitiesRoom}>
                        <ul>
                            <li>
                                <WifiOutlined />
                                <span>وای فای</span>
                            </li>
                            <li>
                                <GlobalOutlined />
                                <span>زبان های خارجی</span>
                            </li>
                            <li>
                                <CoffeeOutlined />
                                <span>کافی شاپ</span>
                            </li>
                            <li>
                                <DesktopOutlined />
                                <span>تلویزیون</span>
                            </li>
                            <li>
                                <PhoneOutlined />
                                <span>تلفن</span>
                            </li>
                        </ul>
                    </div>
                </div> */}
                <div className={styles.bedCardRoomChoices}>
                    {
                    props.ratesInfo.map((rateItem,rateIndex) => <div key={rateItem.bookingToken} className={styles.bedRoomPackage}>
                        <div className={styles.bedRoomPackageName}>
                            {rateIndex === 0 &&
                            <div className={styles.bedRoomSubject}>
                                {t("choose-options-rooms")}
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
                            {rateIndex === 0 &&
                            <div className={styles.bedRoomSubject}>
                                {t("number")}
                            </div>
                            }                                                    
                            <div className={styles.detailPackageCount}>
                                <UserOutlined /> <span> {rateItem.totalAdults} </span> <span> {t('adult')} </span> {(rateItem.totalChildren > 0) && <> <span> و </span> <span> {rateItem.totalChildren} </span> <span> {t('child')}</span></> }
                            </div>
                        </div>
                        <div className={styles.bedRoomPackagePrice}>
                            {rateIndex === 0 &&
                            <div className={styles.bedRoomSubject}>
                                {t('price')}
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

                                {props.nights && <span className={styles.detailsmall}>{t("price-start-from")} {props.nights} {t('night')}</span>}
                            </div>
                        </div>
                        <div className={styles.bedRoomPackageBtn}>
                            <Button 
                                type="primary" 
                                danger 
                                className="min-width-150 antd-btn-loading-end" 
                                disabled={props.selectedRoomBookingToken && (props.selectedRoomBookingToken!==rateItem.bookingToken)}
                                loading={props.selectedRoomBookingToken && (props.selectedRoomBookingToken===rateItem.bookingToken)}
                                onClick = {(e)=>{
                                    props.preReserve(rateItem.bookingToken);
                                }}
                            >
                                {t("room-reserve")}
                            </Button>
                        </div> 
                    </div>) 
                    }

                </div>
            </div>
        </div>
    )
}

MultipleRoom.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
MultipleRoom.propTypes = {
t: PropTypes.func.isRequired,
}
  
  
const mapStateToProp = (state) => {
    return {
      hotelDetails: state.hotel.foreignHotelDetail
    };
};

export default withTranslation('common')(connect(mapStateToProp)(MultipleRoom))
