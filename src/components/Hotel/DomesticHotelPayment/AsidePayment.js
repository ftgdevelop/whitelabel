import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation, Link, i18n } from '../../../../i18n'
import { InfoCircleOutlined } from '@ant-design/icons';
import { HotelIcon, UserOutlineIcon, DateOutlineIcon, ArrowLeftIcon } from '../../UI/Icons'
import moment from 'moment-jalaali';
import dynamic from 'next/dynamic'

import styles from '../../../styles/Home.module.css'
import defaultImage from '../../../assets/defaultHotel.svg';
import { Row, Col, Typography, Skeleton} from 'antd';

const Rating = dynamic(() => import('../../UI/Rating/Rating'))


class AsidePayment extends React.Component {
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
        const { Text } = Typography;
        moment.loadPersian();

        return (
            (reserveInformation && hotelInformation)?
            <div className={styles.asidePayment}>
                <div
                    className={`${styles.bookingSummary} ${process.env.THEME_NAME === "TRAVELO" && styles.bookingSummaryTravelo}`}
                    >
                    <h4 className={styles.subjectBookingSummary}>{t("reserve-details")}</h4>
                    <div className={styles.hotelBookingSummary}>
                        {((reserveInformation.totalPrice.boardPrice - reserveInformation.totalPrice.salePrice)*100/ reserveInformation.totalPrice.boardPrice)> 1 &&
                            <div className={styles.alertOfferSaving}>
                                ٪{Math.floor(((reserveInformation.totalPrice.boardPrice - reserveInformation.totalPrice.salePrice)*100/ reserveInformation.totalPrice.boardPrice))} {t("discount-over-total")}</div>
                         }
                        <div className={styles.contentHotelBookingSummary}>
                            <Row>
                                <Col xs={6} sm={3} md={8} lg={6} xl={6}>
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
                            <span>{t("tracking-code")} : {reserveInformation.idReserve}</span>
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
                                {item.description && <div className="margin-bottom"><Text type="warning"><InfoCircleOutlined className="vertical-middle" /> {item.description} </Text></div>}
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
                                    <span>{t("sum")}</span>
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
                                    <span> {t("site-discount")}</span>
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
                                    <span>{t("price-paid")}</span>
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
                
                <div className={styles.paymentService}>
                    <div className={styles.contentService}>
                        <div className={styles.imageService}>
                            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNiIgdmlld0JveD0iMCAwIDI0IDI2Ij4KICAgIDxwYXRoIGZpbGw9IiMxREFDMDgiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTExLjA1OC4xODhjLjM4Ni0uMjUgMS40OTgtLjI1IDEuODg0IDAgMy4zOSAyLjE5NyA2LjQ1IDMuMzM0IDkuNjc1IDMuNTMuOTUxLjA0IDEuMzY1LjQ3MSAxLjM2NSAxLjM3NCAwIC41NjkuMDQxIDYuNTUgMCA4LjcwOCAwIC43NDUtLjA4MyAxLjUzLS4yOSAyLjMxNS0uNDU1IDEuODA0LTEuNDQ3IDMuNDktMy4xIDUuMDYtMi4xMSAyLTguMzk0IDQuODI1LTguNjI0IDQuODI1LS4xNjYgMC02LjQ1LTIuODI0LTguNTYtNC44MjUtMS42NTMtMS41Ny0yLjY0NS0zLjI1Ni0zLjEtNS4wNmE5LjA4OSA5LjA4OSAwIDAgMS0uMjktMi4zMTVjLS4wNDEtMi4xNTcgMC04LjEzOSAwLTguNzA4IDAtLjkwMy40MTQtMS4zMzQgMS4zNjUtMS4zNzMgMy4yMjUtLjE5NyA2LjI4NS0xLjMzNCA5LjY3NS0zLjUzMXpNOS41MTEgMTYuOTM5Yy41NC41MjYgMS40MTQuNTI2IDEuOTU0IDBsNi4xMy01Ljk3NGMuNTQtLjUyNi41NC0xLjM3OCAwLTEuOTA0YTEuNDA3IDEuNDA3IDAgMCAwLTEuOTU0IDBsLTUuMTM5IDUuMDM2LTIuMTQzLTIuMDlhMS40MDcgMS40MDcgMCAwIDAtMS45NTQgMCAxLjMyMiAxLjMyMiAwIDAgMCAwIDEuOTA1bDMuMTA2IDMuMDI3eiIvPgo8L3N2Zz4K" />
                        </div>
                        <div>
                            <strong>{t("safe-100%")}</strong>
                            <span>{t("we-use-ssl")}</span>
                        </div>
                    </div>
                    <hr/>
                    <div className={styles.contentService}>
                        <div className={styles.imageService}>
                            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAiIGhlaWdodD0iMjYiIHZpZXdCb3g9IjAgMCAyMCAyNiI+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBpZD0iYSIgZD0iTTc2LjMzMyAxNzEuMzc1di0zLjI1YzAtNC40ODgtMy43My04LjEyNS04LjMzMy04LjEyNXMtOC4zMzMgMy42MzctOC4zMzMgOC4xMjV2My4yNWMtLjkyMiAwLTEuNjY3LjcyNi0xLjY2NyAxLjYyNXYxMS4zNzVjMCAuODk5Ljc0NSAxLjYyNSAxLjY2NyAxLjYyNWgxNi42NjZjLjkyMiAwIDEuNjY3LS43MjYgMS42NjctMS42MjVWMTczYzAtLjg5OS0uNzQ1LTEuNjI1LTEuNjY3LTEuNjI1ek02OCAxNjMuMjVjMi43NTcgMCA1IDIuMTg3IDUgNC44NzV2My4yNUg2M3YtMy4yNWMwLTIuNjg4IDIuMjQzLTQuODc1IDUtNC44NzV6bS0yLjMzMiAxOC4wOGwtMi4zNi0yLjE4M2EuOTIuOTIgMCAwIDEgMC0xLjM3M2MuNDEtLjM4IDEuMDc0LS4zOCAxLjQ4NCAwbDEuNjMgMS41MDcgMy45MDUtMy42MzNjLjQxLS4zOCAxLjA3NS0uMzggMS40ODUgMGEuOTIuOTIgMCAwIDEgMCAxLjM3M2wtNC42NTkgNC4zMWMtLjQxLjM3OS0xLjA3NS4zNzktMS40ODUgMHoiLz4KICAgIDwvZGVmcz4KICAgIDx1c2UgZmlsbD0iIzFEQUMwOCIgZmlsbC1ydWxlPSJub256ZXJvIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNTggLTE2MCkiIHhsaW5rOmhyZWY9IiNhIi8+Cjwvc3ZnPgo=" />
                        </div>
                        <div>
                            <strong>{t("bank-procedure")}</strong>
                            <span>{t("we-dont-save")}</span>
                        </div>
                    </div>
                </div>

                <div className={styles.alertSuccess}>
                    <h6>{t("price-will-increase")}</h6>
                    <span>{t("price-will-increase-desc")}</span>
                </div>

            </div>
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
                <div className={styles.paymentService}>
                    <div className={styles.contentService}>
                        <div className={styles.imageService}>
                            <Skeleton.Avatar active size="medium" shape="circle" />
                        </div>
                        <div>
                            <Skeleton.Button active className={styles.subjectPaymentServiceSkeleton} />
                            <Skeleton.Button active className={styles.textPaymentServiceSkeleton} />
                        </div>
                    </div>
                    <hr/>
                    <div className={styles.contentService}>
                        <div className={styles.imageService}>
                            <Skeleton.Avatar active size="medium" shape="circle" />
                        </div>
                        <div>
                            <Skeleton.Button active className={styles.subjectPaymentServiceSkeleton} />
                            <Skeleton.Button active className={styles.textPaymentServiceSkeleton} />
                        </div>
                    </div>
                    <div className={styles.alertSuccess}>
                        <Skeleton.Button active className={styles.subjectAlertInfoSkeleton} />
                        <Skeleton.Button active className={styles.contentAlertInfoSkeleton} />
                    </div>
                </div>
            </div>
        )
    }
}

AsidePayment.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
AsidePayment.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(AsidePayment)
