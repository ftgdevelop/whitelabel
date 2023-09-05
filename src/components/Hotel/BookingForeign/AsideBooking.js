import React,{useEffect,useState} from 'react'
import PropTypes from 'prop-types'
import { withTranslation, Link, i18n } from '../../../../i18n'
import { HotelIcon, UserOutlineIcon, DateOutlineIcon, ArrowLeftIcon } from '../../UI/Icons'
import dynamic from 'next/dynamic'

import styles from '../../../styles/Home.module.css'
import defaultImage from '../../../assets/defaultHotel.svg';
import { Row, Col, Skeleton } from 'antd';
import moment from 'moment-jalaali';

const Rating = dynamic(() => import('../../UI/Rating/Rating'))

const AsideBooking = props => {

    const [localStorageTelNumber,setLocalStorageTelNumber] = useState();
    const [sessionStorageEmail,setSessionStorageEmail] = useState();

    useEffect (()=>{
        setLocalStorageTelNumber(window.sessionStorage.getItem("whiteLabelTelNumber"));
        setSessionStorageEmail(window.sessionStorage.getItem("whiteLabelEmail"));
    },[]);


    const numberWithCommas = (x) => {
        if (x){
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }else{
            return "0";
        }
    }

    const { t } = props;
    const reserveInformation =  props.reserveInfo;
    moment.loadPersian();

    return (
        
        <div className={styles.asideBooking}>
            {(reserveInformation )?
                <>
                    <div
                        className={`${styles.bookingSummary} ${process.env.THEME_NAME === "TRAVELO" && styles.bookingSummaryTravelo}`}
                        >
                        <h4 className={styles.subjectBookingSummary}>{t('reserve-details')}</h4>
                        <div className={styles.hotelBookingSummary}>
                            {/* {((reserveInformation.regularPrice - reserveInformation.salePrice)*100/ reserveInformation.regularPrice)> 1 &&
                                <div className={styles.alertOfferSaving}>
                                    ٪{Math.floor(((reserveInformation.totalPrice.boardPrice - reserveInformation.totalPrice.salePrice)*100/ reserveInformation.totalPrice.boardPrice))} تخیف ویژه روی جمع کل رزرو
                                </div>
                            } */}
                            <div className={styles.contentHotelBookingSummary}>
                                <Row>
                                    <Col  xs={6} sm={3} md={8} lg={6} xl={6}>
                                        <div className={styles.imageSummary} onContextMenu={(e)=> e.preventDefault()}>
                                            <img src={reserveInformation.accommodation.mainPhoto ? reserveInformation.accommodation.mainPhoto : defaultImage} alt={reserveInformation.name} title={reserveInformation.name} />
                                        </div>
                                    </Col>
                                    <Col xs={18} sm={21} md={16} lg={18} xl={18}>
                                        <div className={styles.nameSummary}>
                                            <h4>{reserveInformation.accommodation.name}</h4>
                                            <div className={styles.hotelCardRating}>
                                                <Rating rate={reserveInformation.accommodation.rating} />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <div className={styles.addressSummary}>
                                        {reserveInformation.accommodation.address}
                                    </div>
                                </Row>
                            </div>
                        </div>
                        <div className={styles.passengerBookingSummary}>
                            <div className={styles.reserveCodeSummary}>
                                <span>{t("tracking-code")} :{reserveInformation.id}</span>
                            </div>
                            {reserveInformation.accommodation && reserveInformation.accommodation.rooms.map((item,index) =><div key={index} className={styles.passengerSummary}>
                                <UserOutlineIcon />
                                <span className='margin-start-10'>{item.adults} {t('adult')}</span> {(item.children>0)&& <span> و  {item.children} {t('child')}</span>}
                            </div>)}

                            <div className={styles.dateSummary}>
                                <DateOutlineIcon />
                                <span className={styles.datepickerSummary}>
                                    {moment(reserveInformation.date.checkIn).format("jDD jMMMM jYYYY")}
                                    <ArrowLeftIcon />
                                    {moment(reserveInformation.date.checkOut).format("jDD jMMMM jYYYY")}
                                </span>
                                <span className={styles.countNightSummary}>{moment(reserveInformation.date.checkOut).diff(moment(reserveInformation.date.checkIn), 'days')} {t('night')}</span>
                            </div>
                            {reserveInformation.rooms && reserveInformation.rooms.map((item,index)=><div key={index}>
                                <div className={styles.roomSummary}>
                                    <HotelIcon />
                                    <span>{item.name}</span>
                                </div>
                            </div>)}
                        </div>
                        <div className={styles.vatSummary}>
                            {/* <Row>
                                <Col span={12}>
                                    <div className={styles.subjectVatSummary}>
                                        <span>مجموع</span>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className={styles.contentVatSummary}>
                                        <span>
                                            {numberWithCommas(reserveInformation.regularPrice)} {t('rial')}</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <div className={styles.subjectVatSummary}>
                                        <span> تخفیف سایت</span>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className={styles.contentVatSummary}> <span>{numberWithCommas((reserveInformation.regularPrice - reserveInformation.regularPrice))} {t('rial')}</span>
                                    </div>
                                </Col>
                            </Row> */}
                            <Row>
                                <Col span={12}>
                                    <div className={styles.subjectVatSummaryResult}>
                                        <span>{t('price')}  </span>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className={styles.contentVatSummaryResult}>
                                        <span>{numberWithCommas(reserveInformation.salePrice)} {t('rial')}</span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className={styles.bookingNeedHelp}>
                        <h4 className={styles.subjectBookingNeedHelp}>{t('need-help')}</h4>
                        <div className={styles.contentBookingNeedHelp}>
                            <span>{t('24hours-backup')}</span>
                            {localStorageTelNumber ? <a href={`tel:${localStorageTelNumber}`}> {localStorageTelNumber} </a>: null} 
                            {sessionStorageEmail ? <a href={`mailto:${sessionStorageEmail}`}> {sessionStorageEmail} </a> : null}
                        </div>
                    </div>
                    <div className={styles.alertSuccess}>
                        <h6>{t("price-will-increase")}</h6>
                        <span>{t("price-will-increase-desc")}</span>
                    </div>
                </>
                :
                <div className={styles.asidePayment}>
                    <div className={styles.bookingSummary}>
                        <div className={styles.lineSubjectBookingSummarySkeleton}>
                            <Skeleton.Button active size="small" className={styles.subjectBookingSummarySkeleton} />
                        </div>
                        <div className={styles.hotelBookingSummary}>
                            <div className={styles.contentHotelBookingSummary}>
                                <Row>
                                    <Col xs={6} sm={3} md={8} lg={6} xl={6}>
                                        <Skeleton.Image className={styles.imageSummarySkeleton} />
                                    </Col>
                                    <Col xs={18} sm={21} md={16} lg={18} xl={18}>
                                        <Skeleton.Button active className={styles.hotelNameSkeleton} />
                                        <Skeleton.Button active className={styles.hotelRattingSkeleton} />
                                    </Col>
                                </Row>
                                <div className={styles.addressSummary}>
                                    <Skeleton.Button active className={styles.addressSummarySkeleton} />
                                </div>
                            </div> 
                        </div>
                        <div className={styles.passengerBookingSummary}>
                            <Skeleton.Button active className={styles.passengerSummarySkeleton} />
                            <Skeleton.Button active className={styles.dateSummarySkeleton} />
                            <Skeleton.Button active className={styles.passengerSummarySkeleton} />
                            <Skeleton.Button active className={styles.dateSummarySkeleton} />
                        </div>
                        <div className={styles.vatSummary}>
                            <Row>
                                <Col span={12}>
                                    <Skeleton.Button active className={styles.subjectVatSummarySkeleton} />
                                </Col>
                                <Col span={12}>
                                    <Skeleton.Button active className={styles.contentVatSummarySkeleton} />
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Skeleton.Button active className={styles.subjectVatSummarySkeleton} />
                                </Col>
                                <Col span={12}>
                                    <Skeleton.Button active className={styles.contentVatSummarySkeleton} />
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Skeleton.Button active className={styles.subjectVatSummarySkeleton} />
                                </Col>
                                <Col span={12}>
                                    <Skeleton.Button active className={styles.contentVatSummarySkeleton} />
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className={styles.bookingNeedHelpSkeleton}>
                        <div className={styles.linebookingNeedHelp}>
                            <Skeleton.Button active size="small" className={styles.subjectBookingNeedHelpSkeleton} />
                        </div>
                        <div className={styles.needHelpSkeleton}>
                            <Skeleton.Button active className={styles.subBookingNeedHelpSkeleton} />
                            <Skeleton.Button active className={styles.textBookingNeedHelpSkeleton} />
                            <Skeleton.Button active className={styles.textBookingNeedHelpSkeleton} />
                        </div>
                    </div>
                    <div className={styles.alertSuccess}>
                        <Skeleton.Button active className={styles.subjectAlertInfoSkeleton} />
                        <Skeleton.Button active className={styles.contentAlertInfoSkeleton} />
                    </div>
                </div>
            }
        </div>
    )

}

AsideBooking.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
AsideBooking.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(AsideBooking)
