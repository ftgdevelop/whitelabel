import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation, Link, i18n } from '../../../../i18n'
import { InfoCircleOutlined } from '@ant-design/icons';
import { HotelIcon, UserOutlineIcon, DateOutlineIcon, ArrowLeftIcon } from '../../UI/Icons'
import dynamic from 'next/dynamic'

import defaultImage from '../../../assets/defaultHotel.svg';
import styles from '../../../styles/Home.module.css'
import { Row, Col, Button, Typography, Skeleton } from 'antd';
import moment from 'moment-jalaali';
 
const Rating = dynamic(() => import('../../UI/Rating/Rating'))

class AsideCheckout extends React.Component {
    state = { modalCancelationPolicy: false, datesInfo:undefined};

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
        const hotel = this.props.hotelInfo;
        const rooms = this.props.roomsInfo;
        const discountResponse = this.props.discountResponse
        const { Text } = Typography;
        moment.loadPersian();
        return (
            <div                
                className={`${styles.asideCheckout} ${process.env.THEME_NAME === "TRAVELO" && styles.asideCheckoutTravelo}`}
                >
                {hotel ?
                    <div
                        className={`${styles.bookingSummary} ${process.env.THEME_NAME === "TRAVELO" && styles.bookingSummaryTravelo}`}
                        >
                        <h4 className={styles.subjectBookingSummary}>{t('reserve-details')}</h4>
                        <div className={styles.hotelBookingSummary}>
                            <div className={styles.contentHotelBookingSummary}>
                                <Row>
                                    <Col xs={6} sm={3} md={8} lg={6} xl={6}>
                                        <div className={styles.imageSummary} onContextMenu={(e)=> e.preventDefault()}>
                                            <img src={hotel.ImageUrl ? hotel.ImageUrl : defaultImage} alt={hotel.ImageAlt} />
                                        </div>
                                    </Col>
                                    <Col xs={18} sm={21} md={16} lg={18} xl={18}>
                                        <div className={styles.nameSummary}>
                                            <h4>{hotel.HotelCategoryName} {hotel.HotelName} {hotel.CityName}</h4>
                                            <div className={styles.hotelCardRating}>
                                                <Rating rate={hotel.HotelRating} />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                {hotel.Address && <Row>
                                    <div className={styles.addressSummary}>
                                        {hotel.Address}
                                    </div>
                                </Row>}
                            </div>
                        </div>
                        <div className={styles.passengerBookingSummary}>
                            {rooms.map((item,index) =><div key={index} className={styles.passengerSummary}>
                                <UserOutlineIcon />
                                <span className='margin-start-10'>{item.adultNo} {t('adult')}</span> {(item.childAges.length>0)&& <span> {t('and')}  {item.childAges.length} {t('child')}</span>}
                            </div>)}
                            {this.props.dates && <div className={styles.dateSummary}>
                                <DateOutlineIcon />
                                <span className={styles.datepickerSummary}>
                                    {moment(this.props.dates[0]).format("jDD jMMMM jYYYY")}
                                    <ArrowLeftIcon />
                                    {moment(this.props.dates[1]).format("jDD jMMMM jYYYY")}
                                </span>
                                {/* <span className={styles.countNightSummary}>{moment(this.props.dates[1]).diff(moment(this.props.dates[0]), 'days')} {t('night')}</span> */}
                                {/* <span className={styles.countNightSummary}>{this.props.dates[0] === "2021-03-22T00:00:00" ? moment(this.props.dates[1]).diff(moment(this.props.dates[0]), 'days') + 1 : moment(this.props.dates[1]).diff(moment(this.props.dates[0]), 'days')} {t('night')}</span> */}
                                <span className={styles.countNightSummary}>{this.props.hotelPreReserve.diffDays} {t('night')}</span>
                            </div>}
                            {this.props.roomsInfo && this.props.roomsInfo.map(item=><div key={item.rph}>
                                <div className={styles.roomSummary}>
                                    <HotelIcon />
                                    <span>{item.roomTypeName}</span>
                                </div>
                                {item.description && <div className="margin-bottom"><Text type="warning"><InfoCircleOutlined /> {item.description}</Text></div>}
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
                                        <span>{t('room-price')}</span>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className={styles.contentVatSummary}>
                                        {
                                            this.props.totalPrices.boardPrice >= 10000 ?
                                                <span>{this.numberWithCommas(this.props.totalPrices.boardPrice)} {t('rial')}</span>
                                                : <span>-</span>
                                        }
                                    </div>
                                </Col>
                            </Row>
                            {
                                this.props.totalPrices.boardPrice >= 10000 ?
                                    <Row>
                                        <Col span={12}>
                                            <div className={styles.subjectVatSummary}>
                                                <span>{t('room-discount')}</span>
                                            </div>
                                        </Col>
                                        <Col span={12}>
                                            <div className={styles.contentVatSummary}>
                                                <span>{this.numberWithCommas(this.props.totalPrices.diff)} {t('rial')}</span>
                                            </div>
                                        </Col>
                                    </Row>
                                    : null
                            }
                            {discountResponse ?
                                <Row>
                                    <Col span={12}>
                                        <div className={styles.subjectVatSummary}>
                                            <span>کد تخفیف</span>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div className={styles.contentVatSummary}>
                                            <span>{this.numberWithCommas(discountResponse.discountPrice)} {t('rial')}</span>
                                        </div>
                                    </Col>
                                </Row> : null}
                            {discountResponse ? <Row>
                                <Col span={12}>
                                    <div className={styles.subjectVatSummaryResult}>
                                        <span>{t("total-price")}</span>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className={styles.contentVatSummaryResult}>
                                        {
                                            discountResponse.orderSubTotalDiscount >= 10000 ?
                                                <span>{this.numberWithCommas(discountResponse.orderSubTotalDiscount)} {t('rial')}</span>
                                                : <span>-</span>
                                        }
                                    </div>
                                </Col>
                            </Row> : <Row>
                                <Col span={12}>
                                    <div className={styles.subjectVatSummaryResult}>
                                        <span>{t("total-price")}</span>
                                    </div>
                                </Col>
                                <Col span={12}>
                                        <div className={styles.contentVatSummaryResult}>
                                            {
                                                this.props.totalPrices.boardPrice >= 10000 ?
                                                    <span>{this.numberWithCommas(this.props.totalPrices.salePrice)} {t('rial')}</span>
                                                    : <span>-</span>
                                            }
                                    </div>
                                </Col>
                            </Row>}
                        </div>
                        {/* <Link as="/hotel/payment" href="/hotel/payment"></Link> */}
                        
                        <a className={`${styles.btnCheckout} ${styles.btnCheckoutFixed}`}>
                            <Button type="primary" htmlType="submit" loading={this.props.submitLoading} className="antd-btn-full-width-loading-end" >
                                {
                                    this.props.totalPrices.boardPrice >= 10000 ?
                                        <>{t('complete-reserve-and-get-confirmation')}</>
                                        : "ارسال درخواست استعلام"
                                }
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
                   hotel ?
                   hotel.TopSelling?
                   <div className={styles.alertInfo}>
                        <h6>{t('recent-reserve-number')}</h6>
                        <span>
                            {t('recent-reserve-number-of-hotel')}<b> {hotel.TopSelling} </b> {t('are')}
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
}

AsideCheckout.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
AsideCheckout.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(AsideCheckout)