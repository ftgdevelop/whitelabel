import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation, Link, i18n } from '../../../../i18n'
import { HotelIcon, UserOutlineIcon, DateOutlineIcon } from '../../UI/Icons'

import defaultImage from '../../../assets/defaultHotel.svg';
import Rating  from "../../UI/Rating/Rating";
import styles from '../../../styles/Home.module.css'
import { Row, Col, Button, Typography, Tag, Skeleton } from 'antd';
import moment from 'moment-jalaali';
import ArrowPng from '../../../assets/arrow_right.png';
 
const AsideCheckout =props => {
    
    const numberWithCommas=(x) =>{
        if (x){
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }else{
            return "0";
        }
    }


    const { t } = props;
    const hotel = props.hotelInfo;
    const { Text } = Typography;
    moment.loadPersian();

    const usDateFormat = date => {
        const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        const d = new Date(date);
        let month = months[d.getMonth()];
        return ( d.getDate() + " " + month + " " + d.getFullYear());
    }

    let dateOfCheckin,dateOfCheckout;
    if (hotel){
        if(i18n.language === 'fa'){
            dateOfCheckin = moment(hotel.date.checkIn).format("jDD jMMMM jYYYY");
            dateOfCheckout =moment(hotel.date.checkOut).format("jDD jMMMM jYYYY"); 
        }else{
            dateOfCheckin = usDateFormat(hotel.date.checkIn);
            dateOfCheckout =usDateFormat(hotel.date.checkOut); 
        }
    }

    return (
        <div className={styles.asideCheckout}>
            {hotel ?
                <div
                    className={`${styles.bookingSummary} ${process.env.THEME_NAME === "TRAVELO" && styles.bookingSummaryTravelo}`}
                    >
                    <h4 className={styles.subjectBookingSummary}>{t("reserve-details")}</h4>
                        <div className={styles.hotelBookingSummary}>
                        <div className={styles.contentHotelBookingSummary}>
                            <Row>
                                <Col xs={6} sm={3} md={8} lg={6} xl={6}>
                                    <div className={styles.imageSummary} onContextMenu={(e)=> e.preventDefault()}>
                                        <img src={hotel.accommodation.mainPhoto ? hotel.accommodation.mainPhoto : defaultImage} alt={hotel.accommodation.name} />
                                    </div>
                                </Col>
                                <Col xs={18} sm={21} md={16} lg={18} xl={18}>
                                    <div className={styles.nameSummary}>
                                        <h4>{hotel.accommodation.name}</h4>
                                        <div className={styles.hotelCardRating}>
                                            <Rating rate={hotel.accommodation.rating} />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            {hotel.accommodation.address && <Row>
                                <div className={styles.addressSummary}>
                                    {hotel.accommodation.address}
                                </div>
                            </Row>}
                        </div>
                    </div>
                    
                    <div className={styles.passengerBookingSummary}>
                        {hotel.accommodation.rooms.map((item,index) =><div key={index} className={styles.passengerSummary}>
                            <UserOutlineIcon />
                            <span className='margin-start-10'>{item.adults} {t('adult')}</span> {(item.children>0)&& <span> و  {item.children} {t('child')}</span>}
                        </div>)}

                        {hotel.date && <div className={styles.dateSummary}>
                            <DateOutlineIcon />
                            <span className={`margin-start-10 ${styles.datepickerSummary}`}>
                                {dateOfCheckin} <img src={ArrowPng} alt="arror" className="png-icon mirror-rtl" /> {dateOfCheckout}
                            </span>
                            <span className={`margin-start-10 ${styles.countNightSummary}`}>{hotel.date.duration} {t('night')}</span>
                        </div>}

                        {hotel.accommodation.rooms.map((item,index)=><div key={index}>
                            <div className={`${styles.roomSummary} margin-top`}>
                                <HotelIcon />
                                <span className='margin-start-10'>{item.name}</span>
                            </div>
                            <div className={styles.noteSummary}>
                                <span>{item.board && item.board.name}</span>
                                {/* <span>??? کنسلی رایگان تا قبل از تاریخ ۱۱ مهر ۱۳۹۹</span> */}
                            </div>            
                        </div>)}

                    </div>
                    <div className={styles.passengerBookingSummary}>
                        <Tag className="margin-bottom-small" color={(hotel.cancellationPolicy.status === "Refundable") ? "green" : (hotel.cancellationPolicy.status === "NonRefundable")?"red": undefined }>{(hotel.cancellationPolicy.status === "Refundable") ? t("refundable") : (hotel.cancellationPolicy.status === "NonRefundable")?t("non-refundable"): hotel.cancellationPolicy.status }</Tag>
                        <ul>
                            {hotel.cancellationPolicy.fees.map((item,index)=><li key={index}>
                                {numberWithCommas(item.amount)} {t("rial-from")}<span> {moment(item.fromDate).format("D MMMM YYYY")} </span> ({moment(item.fromDate).format("jD jMMMM jYYYY")})
                            </li>
                            )}
                        </ul>                    
                    </div>

                    <div className={styles.vatSummary}>
                        {(hotel.salePrice && hotel.regularPrice && hotel.salePrice !== hotel.regularPrice)?
                            <>
                                <Row>
                                    <Col span={12}>
                                        <div className={styles.subjectVatSummary}>
                                            <span>{t("room-price")}</span>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div className={styles.contentVatSummary}>
                                            <span>{numberWithCommas(hotel.regularPrice)} {t('rial')}</span>
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
                                            <span>{numberWithCommas(hotel.salePrice - hotel.regularPrice )} {t('rial')}</span>
                                        </div>
                                    </Col>
                                </Row>
                            </>:null
                        }
                        <Row>
                            <Col span={12}>
                                <div className={styles.subjectVatSummaryResult}>
                                    <span>{t("total-price")}</span>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className={styles.contentVatSummaryResult}>
                                    <span>{hotel.salePrice && numberWithCommas(hotel.salePrice)} {t('rial')}</span>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    
                    <a className={styles.btnCheckout}>
                        <Button type="primary" htmlType="submit" loading={props.submitLoading} className="antd-btn-full-width-loading-end" >
                            {t("complete-reserve-and-get-confirmation")}
                        </Button>
                    </a>

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
            hotel ?
            <div className={styles.alertSuccess}>
                <h6>{t("price-will-increase")}</h6>
                <span>{t("price-will-increase-desc")}</span>
            </div>
            :
            <div className={styles.alertSuccess}>
                <Skeleton.Button active className={styles.subjectAlertInfoSkeleton} />
                <Skeleton.Button active className={styles.contentAlertInfoSkeleton} />
            </div>
        }
            
            {
                hotel ?
                hotel.TopSelling?
                <div className={styles.alertInfo}>
                    <h6>{t("recent-reserve-number")}</h6>
                    <span>
                        {t("recent-reserve-number-of-hotel")}
                        <b> {hotel.TopSelling} </b>
                        {t("are")}
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

AsideCheckout.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
AsideCheckout.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(AsideCheckout)
