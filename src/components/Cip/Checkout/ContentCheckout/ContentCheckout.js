import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types'
import { i18n, withTranslation, Link } from '../../../../../i18n'
import { ArrowRightIcon } from '../../../UI/Icons'
import { Input, Collapse, Skeleton } from 'antd'
import moment from 'moment-jalaali';

import styles from '../../../../styles/Home.module.css'
import Reserver from './Reserver';
import Airline from './Airline';
import Passenger from './Passenger';
import Transport from './Transport';

const { Panel } = Collapse;
const { TextArea } = Input;

const ContentCheckout = props => {
    const { t, reserveInfo } = props;

    const AirPortList = [
        {
          "url": "fa/cip/فرودگاه-بین-المللی-امام-خمینی-Cip-خدمات",
          "address": "تهران، بزرگراه خلیج فارس، کیلومتر ۳۰، فرودگاه بین المللی امام خمینی(ره)",
          "name": "فرودگاه بین المللی امام خمینی",
          "nameLong": "فرودگاه بین المللی امام خمینی تهران ، تهران ، ایران",
          "city": {
            "name": "تهران",
            "code": "THR"
          },
          "code": "IKA",        
          "id": 9131
        },
        {
          "url": "fa/cip/فرودگاه-مهرآباد-Cip-خدمات",
          "address": " تهران، میدان آزادی، خیابان معراج، فرودگاه بین المللی مهراباد تهران",
          "name": "فرودگاه مهرآباد",
          "nameLong": "فرودگاه مهرآباد ، تهران،ایران",
          "city": {
            "name": "تهران",
            "code": "THR"
          },
          "code": "THR",
          "id": 9116
        },
        {
          "url": "fa/cip/فرودگاه-کیش-Cip-خدمات",
          "address": "استان هرمزگان، كيش، بلوار فرودگاه",
          "name": "فرودگاه بین المللی کیش",
          "nameLong": "فرودگاه بین المللی کیش ، جزیره کیش ، ایران",
          "city": {
            "name": "کیش",
            "code": "KIH"
          },
          "code": "KIH",
          "id": 9117
        },
        {
          "url": "fa/cip/فرودگاه-شهید-هاشمی-نژاد-مشهد-Cip-خدمات",
          "address": " بلوار فرودگاه – فرودگاه شهید هاشمی نژاد",
          "name": "فرودگاه بین المللی شهید هاشمی نژاد مشهد",
          "nameLong": "فرودگاه شهید هاشمی نژاد، مشهد،ایران",
          "city": {
            "name": "مشهد",
            "code": "MHD"
          },
          "code": "MHD",
          "id": 9121
        },
        {
          "url": "fa/cip/فرودگاه-شهید-اشرفی-اصفهانی-کرمانشاه-Cip-خدمات",
          "address": "شهر کرمانشاه، فرودگاه شهید اشرفی اصفهانی کرمانشاه",
          "name": "فرودگاه شهید اشرفی کرمانشاه",
          "nameLong": "فرودگاه شهید اشرفی ، کرمانشاه ، ایران\r\n",
          "city": {
            "name": "کرمانشاه",
            "code": "KSH"
          },
          "code": "KSH",
          "id": 9137
        },
        {
          "url": "fa/cip/فرودگاه-اهواز-Cip-خدمات",
          "address": "اهواز، بلوار پاسداران فرودگاه بین المللی اهواز٫",
          "name": "فرودگاه سپهبد شهید قاسم سلیمانی اهواز",
          "nameLong": "فرودگاه سپهبد شهید قاسم سلیمانی ، اهواز ، ایران",
          "city": {
            "name": "اهواز",
            "code": "AWH"
          },
          "code": "AWH",
          "id": 9146
        },
        {
          "url": "fa/cip/فرودگاه-شهید-مدنی-تبریز-Cip-خدمات",
          "address": "تبریز، فرودگاه بین المللی شهید مدنی تبریز",
          "name": "فرودگاه بین المللی شهید مدنی تبریز",
          "nameLong": "فرودگاه بین المللی شهید مدنی ،تبریز ، ایران",
          "city": {
            "name": "تبریز",
            "code": "TBZ"
          },
          "code": "TBZ",
          "id": 9152
        },
        {
          "url": "/fa/cip/فرودگاه-بین-المللی-سردار-جنگل-رشت-Cip-خدمات",
          "address": "استان گیلان ، رشت ، بلوار ولی‌عصر",
          "name": "فرودگاه بین المللی سردار جنگل رشت",
          "nameLong": "فرودگاه بین المللی سردار جنگل ، رشت ، ایران",
          "city": {
            "name": "رشت",
            "code": "RAS"
          },
          "code": "RAS",
          "id": 9155
    }];

    let cipUrlSelected = reserveInfo && AirPortList.find(item => item.id === reserveInfo.airport.id);
    let cipFlightdate = reserveInfo && reserveInfo.creationTime.split("T")[0];
    let backCipUrl = `/${cipUrlSelected && cipUrlSelected.url}/flightdate-${cipFlightdate}/adult-1-children-0-accompanying-0`;
    
    return (
        <div className={`${styles.contentCheckout}`}>
            <div className={styles.backPage}>
                {reserveInfo? <>
                    {reserveInfo && backCipUrl && <Link as={backCipUrl} href={backCipUrl}>
                        <a>
                            <ArrowRightIcon />
                            <span>برگشت به صفحه جزئیات فرودگاه</span>
                        </a>
                    </Link>}
                </> : <a><Skeleton.Button active className={styles.backPageSkeleton} /></a>}
            </div>

            <Airline
                reserveInfo={reserveInfo}

                optionsAirline={props.optionsAirline}
                airlineName={props.airlineName}
                flightNumber={props.flightNumber}
                onSelectAirline={props.onSelectAirline}
                onChangeflightNumber={props.onChangeflightNumber}
                onChangeFlightDate={props.onChangeFlightDate}
                onChangeFlightTime={props.onChangeFlightTime}
                flightTime={props.flightTime}
                flightDate={props.flightDate}
                setSelectedDay={props.setSelectedDay}
            />
            
            <Reserver
                setReserverGender={props.setReserverGender}
                setReserverFirstName={props.setReserverFirstName}
                setReserverLastName={props.setReserverLastName}
                
                setCountryCode={props.setCountryCode}
                setPhoneNumber={props.setPhoneNumber}
                setReserverEmail={props.setReserverEmail}
            />

            <Passenger
                reserveInfo={reserveInfo}
                addAdult={props.addAdult}
                removeAdult={props.removeAdult}
                addChildren={props.addChildren}
                removeChildren={props.removeChildren}
                addAccompanying={props.addAccompanying}
                removeAccompanying={props.removeAccompanying}

                adultList={props.adultList}
                adultInputChange={props.adultInputChange}
                adultRemoveClick={props.adultRemoveClick}
                adultAddClick={props.adultAddClick}
                adultRemoveEndClick={props.adultRemoveEndClick}

                childList={props.childList}
                childInputChange={props.childInputChange}
                childRemoveClick={props.childRemoveClick}
                childAddClick={props.childAddClick}
                childRemoveEndClick={props.childRemoveEndClick}

                accompanyingList={props.accompanyingList}
                accompanyingInputChange={props.accompanyingInputChange}
                accompanyingRemoveClick={props.accompanyingRemoveClick}
                accompanyingAddClick={props.accompanyingAddClick}
                accompanyingRemoveEndClick={props.accompanyingRemoveEndClick}

            />

            <Transport
                reserveInfo={reserveInfo}
                setCountTransports={props.setCountTransports}
                setAddressTransports={props.setAddressTransports}
            />

        </div>
    )
}

ContentCheckout.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})

ContentCheckout.propTypes = {
    t: PropTypes.func.isRequired,
}

export default withTranslation('common')(ContentCheckout)