import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation, Link, i18n } from '../../../../i18n'
import { HotelIcon, UserOutlineIcon, DateOutlineIcon, ArrowLeftIcon } from '../../UI/Icons'
import moment from 'moment-jalaali'
import dynamic from 'next/dynamic'

import styles from '../../../styles/Home.module.css'
import defaultImage from '../../../assets/defaultHotel.svg';
import { Row, Col, Skeleton } from 'antd';

const Rating = dynamic(() => import('../../UI/Rating/Rating'))

class AsideBooking extends React.Component {
    state = { modalCancelationPolicy: false, };

    setModalCancelationPolicy(modalCancelationPolicy) {
        this.setState({ modalCancelationPolicy });
    }
    numberWithCommas(x) {
        if (x){
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }else{
            return "0";
        }
    }
    render() {
        const { t } = this.props;
        const reserveInformation =  this.props.reserveInfo;
        const hotelInformation =  this.props.hotelInfo;
        moment.loadPersian();

        return (
          
            <div className={styles.asideBooking}>
                {(reserveInformation && hotelInformation)?
                    <>
                        <div
                            className={`${styles.bookingSummary} ${process.env.THEME_NAME === "TRAVELO" && styles.bookingSummaryTravelo}`}
                            >
                            <h4 className={styles.subjectBookingSummary}>{t("reserve-details")}</h4>
                            <div className={styles.hotelBookingSummary}>
                                {((reserveInformation.totalPrice.boardPrice - reserveInformation.totalPrice.salePrice)*100/ reserveInformation.totalPrice.boardPrice)> 1 &&
                                    <div className={styles.alertOfferSaving}>
                                        ٪{Math.floor(((reserveInformation.totalPrice.boardPrice - reserveInformation.totalPrice.salePrice)*100/ reserveInformation.totalPrice.boardPrice))} {t('discount-over-total')}</div>
                                }
                                <div className={styles.contentHotelBookingSummary}>
                                    <Row>
                                        <Col  xs={6} sm={3} md={8} lg={6} xl={6}>
                                            <div className={styles.imageSummary} onContextMenu={(e)=> e.preventDefault()}>
                                                <img src={hotelInformation.ImageUrl ? hotelInformation.ImageUrl : defaultImage} alt={hotelInformation.ImageAlt} title={hotelInformation.ImageTitle} />
                                            </div>
                                        </Col>
                                        <Col xs={18} sm={21} md={16} lg={18} xl={18}>
                                            <div className={styles.nameSummary}>
                                                <h4>{hotelInformation.HotelCategoryName} {hotelInformation.HotelName} {hotelInformation.CityName}</h4>
                                                <div className={styles.hotelCardRating}>
                                                    <Rating rate={hotelInformation.HotelRating} />
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <div className={styles.addressSummary}>
                                            {hotelInformation.Address}
                                        </div>
                                    </Row>
                                </div>
                            </div>
                            <div className={styles.passengerBookingSummary}>
                                <div className={styles.reserveCodeSummary}>
                                    <span>{t('tracking-code')}: {reserveInformation.idReserve}</span>
                                </div>
                                {reserveInformation.rooms.map((item,index) =><div key={index} className={styles.passengerSummary}>
                                    <UserOutlineIcon />
                                    <span className='margin-start-10'>{item.adultNo} {t('adult')}</span> {(item.childNo>0)&& <span> و  {item.childNo} {t('child')}</span>}
                                </div>)}

                                <div className={styles.dateSummary}>
                                    <DateOutlineIcon />
                                    <span className={styles.datepickerSummary}>
                                        {moment(reserveInformation.reserveStartDate).format("jDD jMMMM jYYYY")}
                                        <ArrowLeftIcon />
                                        {moment(reserveInformation.reserveEndDate).format("jDD jMMMM jYYYY")}
                                    </span>
                                    <span className={styles.countNightSummary}>{moment(reserveInformation.reserveEndDate).diff(moment(reserveInformation.reserveStartDate), 'days')} {t('night')}</span>
                                </div>
                                {reserveInformation.rooms && reserveInformation.rooms.map((item,index)=><div key={index}>
                                    <div className={styles.roomSummary}>
                                        <HotelIcon />
                                        <span>{item.roomName}</span>
                                    </div>
                                    {/* <div className={styles.noteSummary}>
                                        <span>??? فقط اتاق</span>
                                        <span>??? کنسلی رایگان تا قبل از تاریخ ۱۱ مهر ۱۳۹۹</span>
                                    </div>
                                    <div className={styles.viewCancelationPolicy}>
                                        <span onClick={() => this.setModalCancelationPolicy(true)}>??? مشاهده قوانین کنسلی</span>
                                        <Modal
                                            open={this.state.modalCancelationPolicy}
                                            onOk={() => this.setModalCancelationPolicy(false)}
                                            onCancel={() => this.setModalCancelationPolicy(false)}
                                            footer={null}
                                            width={1180}
                                            >
                                            <div className={styles.contentCancelationPolicy}>
                                                <div className={styles.subjectCancelationPolicy}>قوانین کنسلی</div>
                                                <div className={styles.contentTime}>
                                                    <div className={styles.startTime}>
                                                        <div className={styles.topTime}>
                                                            <div className={styles.contentTopTime}>
                                                                <span>۲۶ خرداد</span>
                                                                <span>تاریخ رزرو</span>
                                                            </div>
                                                        </div>
                                                        <div className={styles.bottomTime}>
                                                            <div className={styles.dotBottomTime}>
                                                                <div className={styles.contentDotBottomTime}>
                                                                    <div className={styles.myDotTime}>
                                                                        <div className={styles.myDotTime4}></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className={styles.subjectBottomTime}>استرداد كامل</div>
                                                            <div className={styles.detailBottomTime}>هزینه ای از شما دریافت نمی شود</div>
                                                        </div>
                                                    </div>
                                                    <div className={styles.endTime}>
                                                        <div className={styles.topEndTime}>
                                                            <div className={styles.righttopEndTime}>
                                                                <span>۲۸ خرداد</span>
                                                                <span>۱۲:۰۰ ظهر ، زمان هتل</span>
                                                            </div>
                                                            <div className={styles.lefttopEndTime}>
                                                                <span>۵ تیر</span>
                                                                <span>۱۴:۰۰ ظهر، زمان ورود</span>
                                                            </div>
                                                        </div>
                                                        <div className={styles.bottomEndTime}>
                                                            <div className={styles.dotBottomEndTime}>
                                                                <div className={styles.dotBottomEndTime1}></div>
                                                                <div className={styles.dotBottomEndTime2}></div>
                                                            </div>
                                                            <div className={styles.typeBottomEndTime}>پول برگشت داده نمیشود</div>
                                                            <div className={styles.titleBottomEndTime}>مبلغ کامل از شما کسر می شود:</div>
                                                            <div className={styles.nameBottomEndTime}>۴۰.۸۰۰.۰۰۰ - {t('rial')}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Modal>
                                        
                                    </div> */}
                                </div>)}
                            </div>
                            <div className={styles.vatSummary}>
                                <Row>
                                    <Col span={12}>
                                        <div className={styles.subjectVatSummary}>
                                            <span>{t('sum')}</span>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div className={styles.contentVatSummary}>
                                            <span>
                                                {this.numberWithCommas(reserveInformation.totalPrice.boardPrice)} {t('rial')}</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <div className={styles.subjectVatSummary}>
                                            <span> {t('site-discount')}</span>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div className={styles.contentVatSummary}> <span>{this.numberWithCommas((reserveInformation.totalPrice.boardPrice - reserveInformation.totalPrice.salePrice))} {t('rial')}</span>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <div className={styles.subjectVatSummaryResult}>
                                            <span>{t('price-paid')}</span>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div className={styles.contentVatSummaryResult}>
                                            <span>{this.numberWithCommas(reserveInformation.totalPrice.salePrice)} {t('rial')}</span>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className={styles.bookingNeedHelp}>
                            <h4 className={styles.subjectBookingNeedHelp}>{t('need-help')}</h4>
                            <div className={styles.contentBookingNeedHelp}>
                                <span>{t('24hours-backup')}</span>
                                <a href="tel:+982126150051"> 02126150051 </a>
                                <a href="mailto:support@safaraneh.com"> support@safaraneh.com </a>
                            </div>
                        </div>
                        <div className={styles.alertSuccess}>
                            <h6>{t('price-will-increase')}</h6>
                            <span>{t('price-will-increase-desc')}</span>
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
}

AsideBooking.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
AsideBooking.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(AsideBooking)
