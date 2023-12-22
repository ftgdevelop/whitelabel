import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation, Link, i18n } from '../../../../i18n'
import dynamic from 'next/dynamic'

import { HotelIcon, UserOutlineIcon, DateOutlineIcon, ArrowLeftIcon } from '../../UI/Icons'
import ArrowPng from '../../../assets/arrow_right.png';
import defaultImage from '../../../assets/defaultHotel.svg';
import styles from '../../../styles/Home.module.css'
import { Row, Col, Button, Typography, Skeleton } from 'antd';
import moment from 'moment-jalaali';
import { connect } from 'react-redux'
 
const Rating = dynamic(() => import('../../UI/Rating/Rating'))

const AsideV4 = (props) => {

    // state = { modalCancelationPolicy: false, datesInfo:undefined};

    // setModalCancelationPolicy(modalCancelationPolicy) {
    //     this.setState({ modalCancelationPolicy });
    // }
    
    const numberWithCommas = x => {
        if (x){
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }else{
            return "0";
        }
    }

    const { t } = props;
    const hotel = props.hotelInfo;
    const rooms = props.roomsInfo;
    const discountResponse = props.discountResponse
    const { Text } = Typography;
    moment.loadPersian();
    const { hotelInformation, reserveInformation, roomChildAndExtraBed } = props;

    const board = code => {
        switch (code) {
            case "BB":
                return "به همراه صبحانه";
            case "HB":
                return "صبحانه + ناهار یا شام";
            case "FB":
                return "تمام وعده های غذایی شامل می شود";
            case "RO":
                return "بدون صبحانه";
            case "Hour6":
                return "اقامت به مدت ۶ ساعت";
            case "Hour10":
                return "اقامت به مدت ۱۰ ساعت";
            
            default:
                return code ;
        }
    }

    const hasDiscount = reserveInformation?.salePrice && reserveInformation.boardPrice && reserveInformation.boardPrice > reserveInformation.salePrice ;

    let childCount = 0;
    let childPrice = 0;
    let extraBedCount = 0;
    let extraBedPrice = 0;
    if (roomChildAndExtraBed?.length){
        childCount = roomChildAndExtraBed.reduce((total,item) => item.selectedChild ? (total + 1) : total , 0);
        childPrice = roomChildAndExtraBed.reduce((total,item) => item.selectedChild ? (total + item.childFee) : total ,0);
        extraBedCount = roomChildAndExtraBed.reduce((total,item) => total + item.selectedExtraBed , 0);
        extraBedPrice = roomChildAndExtraBed.reduce((total,item) => total + (item.selectedExtraBed * item.extraBedFee) , 0 );
    }

    let activeExtraBedPrice;
    let activeExtraBedCount;

    if(props.reserveInformation?.selectedExtraBedPrice){
        activeExtraBedPrice = props.reserveInformation?.selectedExtraBedPrice;
        activeExtraBedCount = props.reserveInformation?.selectedExtraBedCount;
    }else{
        activeExtraBedPrice = extraBedPrice;
        activeExtraBedCount = extraBedCount;
    }

    let safaranehEmailAddress = "support@safaraneh.com";
    let safaranehPhoneNumber = "02126150051"
    let safaranehPhoneLink = "+982126150051";

    let portalEmailAddress;
    let portalPhoneNumber;
    let portalPhoneLink;
    
    if(props.portalInfo?.Phrases){
        portalEmailAddress = props.portalInfo.Phrases.find(item=> item.Keyword === "Email")?.Value;
        portalPhoneNumber = props.portalInfo.Phrases.find(item=> item.Keyword === "TelNumber")?.Value;

        if (portalPhoneNumber && portalPhoneNumber[0] === "0"){
            portalPhoneLink = portalPhoneNumber.substring(1);
            portalPhoneLink = "+98" + portalPhoneLink;
        }
    }

    return (
        <div                
            className={`${styles.asideCheckout} ${process.env.THEME_NAME === "TRAVELO" && styles.asideCheckoutTravelo}`}
            >

            {hotelInformation && reserveInformation ?
                <div
                    className={`${styles.bookingSummary} ${process.env.THEME_NAME === "TRAVELO" && styles.bookingSummaryTravelo}`}
                    >
                    <h4 className={styles.subjectBookingSummary}>{t('reserve-details')}</h4>
                    <div className={styles.hotelBookingSummary}>
                        <div className={styles.contentHotelBookingSummary}>
                            <Row>
                                <Col xs={6} sm={3} md={8} lg={6} xl={6}>
                                    <div className={styles.imageSummary} onContextMenu={(e)=> e.preventDefault()}>
                                        <img src={hotelInformation?.image?.url || defaultImage} alt={hotelInformation?.image?.alt} title={hotelInformation?.image?.title} />
                                    </div>
                                </Col>
                                <Col xs={18} sm={21} md={16} lg={18} xl={18}>
                                    <div className={styles.nameSummary}>
                                        <h4>{hotelInformation.name}</h4>
                                        <div className={styles.hotelCardRating}>
                                            <Rating rate={hotelInformation?.rating} />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            {hotelInformation?.address && <Row>
                                <div className={styles.addressSummary}>
                                    {hotelInformation?.address}
                                </div>
                            </Row>}
                        </div>
                    </div>

                    {!!props.reserveInformation.reserveId && 
                    <div className='padding-start-10 padding-end-10 margin-top-15'>
                        <div className='dashed-reserve-id'>
                        {t('tracking-code')} : {props.reserveInformation.reserveId}
                        </div>
                    </div>}

                    <div className={styles.passengerBookingSummary}>

                        {reserveInformation && <div className={styles.dateSummary}>
                            <DateOutlineIcon />
                            <span className={`margin-start-10 ${styles.datepickerSummary}`}>
                                {moment(reserveInformation.checkin).format("jDD jMMMM jYYYY")}
                                <img src={ArrowPng.src} alt="arror" className="png-icon mirror-rtl" />
                                {moment(reserveInformation.checkout).format("jDD jMMMM jYYYY")}
                            </span>
                            <span className={`margin-start-10 ${styles.countNightSummary}`}>{reserveInformation.duration} {t('night')}</span>
                        </div>}

                        {reserveInformation.rooms.map((roomItem,roomIndex)=>{
                            
                            let cancellation = null;
                            switch (roomItem.cancellationPolicyStatus) {
                            case "NonRefundable":
                                cancellation = <div className="margin-bottom-5 text-red">{t("non-refundable")}</div>;
                                break;
                            case "Refundable":
                                cancellation = <div className="text-green margin-bottom-5"><CheckOutlined className="margin-end-5" /> {t("refundable")}</div>;
                                break;
                            // case "CallSupport":
                            //     cancellation = <div className="text-green margin-bottom-5"><CheckOutlined className="margin-end-5" /> {t("call-support-cancellation")}</div>;
                            //     break;
                            default:
                                cancellation = <div className="margin-bottom-5">{roomItem.cancellationPolicyStatus}</div>;
                            }

                            let childPriceBlock = null;
                            let extraBedPriceBlock = null;

                            if (roomChildAndExtraBed?.length){
                                const itemInfo = roomChildAndExtraBed[roomIndex];
                                if (itemInfo?.selectedChild){
                                    childPriceBlock = <span> + یک کودک</span>
                                }
                                if (itemInfo?.selectedExtraBed){
                                    let count = null;
                                    switch (itemInfo.selectedExtraBed){
                                        case 1:
                                            count = "یک";
                                            break;
                                        case 2:
                                            count = "دو";
                                            break;
                                        case 3:
                                            count = "سه";
                                            break;
                                        default:
                                            count = itemInfo.selectedExtraBed;

                                    }
                                    extraBedPriceBlock = <span> + {count} تخت اضافه</span>
                                }
                            }

                            return(
                                <div key={roomIndex}>
                                    {reserveInformation.rooms.length > 1 && <div className='title-hr'>اتاق {roomIndex+1} <span className='line margin-start-10' /></div>}
                                    <div className={`${styles.roomSummary} margin-top`}>
                                        <HotelIcon />
                                        <span className='margin-start-10'>{roomItem.name}</span>
                                    </div>
                                    <div className={styles.passengerSummary}>
                                        <UserOutlineIcon />
                                        <span className='margin-start-10'>{roomItem.bed} {t('guest')}</span> {childPriceBlock} {extraBedPriceBlock}
                                    </div>
                                    <div className={styles.noteSummary}>
                                        <span>{board(roomItem.board)}</span>
                                    </div> 
                                    <div>
                                        {cancellation}
                                    </div>           
                                </div>
                            )}
                        )}
                    </div>

                    <div className={styles.vatSummary}>
                        {/* {(reserveInformation.salePrice && reserveInformation.boardPrice && reserveInformation.boardPrice > reserveInformation.salePrice)?
                            <>
                                <Row>
                                    <Col span={12}>
                                        <div className={styles.subjectVatSummary}>
                                            <span>{t("room-price")}</span>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div className={styles.contentVatSummary}>
                                            <span>{numberWithCommas(reserveInformation.boardPrice)} {t('rial')}</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <div className={styles.subjectVatSummary}>
                                            <span>{t("room-discount")}</span>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div className={styles.contentVatSummary}>
                                            <span>{numberWithCommas(reserveInformation.boardPrice - reserveInformation.salePrice )} {t('rial')}</span>
                                        </div>
                                    </Col>
                                </Row>
                            </>
                        :null} */}

                        {reserveInformation.boardPrice && (hasDiscount || !!childCount || !!activeExtraBedPrice || !!reserveInformation.promoCodePrice ) && <Row className='margin-bottom-5'>
                                <Col span={12} className="font-12">
                                    {t("sum")}
                                </Col>
                                <Col span={12} className="text-end">
                                    {numberWithCommas(reserveInformation.boardPrice)} {t('rial')}
                                </Col>
                        </Row>}

                        {!!childCount && <Row className='margin-bottom-5'>
                                <Col span={12} className="font-12">
                                    {t("child")} (x{childCount})
                                </Col>
                                <Col span={12} className="text-end">
                                    {numberWithCommas(childPrice)} {t('rial')}
                                </Col>
                        </Row>}

                        {!!activeExtraBedPrice && <Row className='margin-bottom-5'>
                                <Col span={12} className="font-12">
                                    {t("extra-bed")} (x{activeExtraBedCount})
                                </Col>
                                <Col span={12} className="text-end">
                                    {numberWithCommas(activeExtraBedPrice)} {t('rial')}
                                </Col>
                        </Row>}

                        { hasDiscount && <Row className='margin-bottom-5'>
                            <Col span={12} className='font-12'>
                                {t("site-discount")}
                            </Col>
                            <Col span={12} className="text-end">
                                    <span>{numberWithCommas(reserveInformation.boardPrice - reserveInformation.salePrice )} {t('rial')}</span>
                            </Col>
                        </Row>}

                        {discountResponse || !!reserveInformation.promoCodePrice ? <Row className='margin-bottom-5'>
                            <Col span={12} className='font-12'>
                                    کد تخفیف
                            </Col>
                            <Col span={12} className="text-end">
                                <span>{numberWithCommas(discountResponse?.discountPrice || reserveInformation.promoCodePrice)} {t('rial')}</span>
                            </Col>
                        </Row> : null}
                        
                        {!!reserveInformation.salePrice && <Row className='margin-bottom-5'>
                            <Col span={12} className="font-12">
                                {t("price-paid")}
                            </Col>
                            <Col span={12} className="text-end bold">
                                {!!discountResponse && discountResponse.orderSubTotalDiscount >= 10000 ?
                                    numberWithCommas(discountResponse.orderSubTotalDiscount + (activeExtraBedPrice || 0)) + " " + t('rial')
                                    :
                                    numberWithCommas(reserveInformation.salePrice + (activeExtraBedPrice || 0) - (reserveInformation.promoCodePrice || 0) ) + " " +  t('rial')
                                }
                            </Col>
                        </Row>}

                    </div>
                    {props.hasSubmit && <div className='padding-x-10 margin-top-10 button-aside-fixed'>
                        <Button type="primary" htmlType="submit" loading={props.submitLoading} className="button blue-btn full-width" >
                            {t('complete-reserve-and-get-confirmation')}
                        </Button>
                    </div>}

                </div>
            :
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
                <a className={styles.btnCheckout}>
                    <Skeleton.Button active className={styles.btnCheckoutSkeleton} />
                </a>
            </div>
        }

        {
            hotelInformation ?
                props.isBooking ? <div className={styles.bookingNeedHelp}>
                    <h4 className={styles.subjectBookingNeedHelp}>{t('need-help')}</h4>
                    <div className={styles.contentBookingNeedHelp}>
                        <span>{t('24hours-backup')}</span>
                        <a href={`tel:${portalPhoneLink || safaranehPhoneLink}`}> {portalPhoneNumber || safaranehPhoneNumber} </a>
                        <a href={`mailto:${portalEmailAddress || safaranehEmailAddress}`}> {portalEmailAddress || safaranehEmailAddress} </a>
                    </div>
                </div>
                :
                null
            :
            <div className={styles.alertSuccess}>
                <Skeleton.Button active className={styles.subjectAlertInfoSkeleton} />
                <Skeleton.Button active className={styles.contentAlertInfoSkeleton} />
            </div>

        }


        {
            hotelInformation ?
            <div className={styles.alertSuccess}>
                <h6>{t('price-will-increase')}</h6>
                <span>{t('price-will-increase-desc')}</span>
            </div>
            :
            <div className={styles.alertSuccess}>
                <Skeleton.Button active className={styles.subjectAlertInfoSkeleton} />
                <Skeleton.Button active className={styles.contentAlertInfoSkeleton} />
            </div>
        }
            
            {
                hotelInformation ?
                hotelInformation.TopSelling && !props.isBooking ?
                <div className={styles.alertInfo}>
                    <h6>{t('recent-reserve-number')}</h6>
                    <span>
                        {t('recent-reserve-number-of-hotel')}<b> {hotelInformation.TopSelling} </b> {t('are')}
                    </span>
                </div>
                :null
                :
                <div className={styles.alertInfo}>
                    <Skeleton.Button active className={styles.subjectAlertInfoSkeleton} />
                    <Skeleton.Button active className={styles.contentAlertInfoSkeleton} />
                </div>
            }
        </div>
    )

}

AsideV4.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
AsideV4.propTypes = {
    t: PropTypes.func.isRequired,
}
  
function mapStateToProps(state) {
    return {
        portalInfo: state.portal.portalData
    }
}
export default withTranslation('common')(connect(mapStateToProps)(AsideV4))
