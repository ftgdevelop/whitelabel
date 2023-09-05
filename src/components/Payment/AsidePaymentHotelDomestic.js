
import React, { useState ,useEffect} from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation } from '../../../i18n';
import {useRouter} from 'next/router';
import { InfoCircleOutlined } from '@ant-design/icons';
import { HotelIcon, UserOutlineIcon, DateOutlineIcon, ArrowLeftIcon } from '../UI/Icons'

import styles from '../../styles/Home.module.css'
//import ViewCancelationPolicy from './ViewCancelationPolicy'
import defaultImage from '../../assets/defaultHotel.svg';
import Rating  from "../UI/Rating/Rating";
import { Row, Col,Tag, Typography, Skeleton} from 'antd';
import moment from 'moment-jalaali';
import { HotelDomesticGetReserve } from '../../actions'
import { GetHotelById } from '../../actions'


const AsidePaymentHotel = props => {
    const router = useRouter();
    const [reserveInformation,setReserveInformation] = useState();
    const [hotelId,setHotelId] = useState();
    const [hotelMoreDetails,setHotelMoreDetails] = useState();

    useEffect (()=>{
        const fetchData = async () => {
            const response = await HotelDomesticGetReserve(router.query.reserveId, router.query.username);
            if (response.data) {
                setReserveInformation(response.data.result);
                setHotelId(response.data.result.hotelId);
                if(response.data.result.discountAmount === null) {
                    props.getPrice(response.data.result.totalPrice.salePrice);
                } else {
                    props.getPrice(response.data.result.totalPrice.salePrice - response.data.result.discountAmount);
                }
            }
        };
        fetchData();

    },[]);

    useEffect (()=>{
        if(hotelId) {
            const hotelDetails = async () => {
                const response = await GetHotelById(hotelId);
                if (response.data) {
                    setHotelMoreDetails(response.data);
                }
            };
            hotelDetails();
        }
    },[hotelId]);

    const numberWithCommas = (x) =>{
        if (x){
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }else{
            return "0";
        }
    }
    
    const { t } = props;
    const { Text } = Typography;
    moment.loadPersian();

    return (
        (reserveInformation && hotelMoreDetails)?
        <div
            className={`${styles.asidePayment} ${process.env.THEME_NAME === "TRAVELO" && styles.asidePaymentTravelo}`}
            >
            <div className={styles.bookingSummary}>
                <h4 className={styles.subjectBookingSummary}>{t("reserve-details")}</h4>
                <div className={styles.hotelBookingSummary}>
                    {/* {((reserveInformation.introPrice - reserveInformation.salePrice)*100/ reserveInformation.introPrice)> 1 &&
                        <div className={styles.alertOfferSaving}>
                            ٪{Math.floor(((reserveInformation.introPrice - reserveInformation.salePrice)*100/ reserveInformation.introPrice))} {t("discount-on-total")}</div>
                        } */}
                    <div className={styles.contentHotelBookingSummary}>
                        <Row>
                            <Col xs={6} sm={3} md={8} lg={6} xl={6}>
                                <div className={styles.imageSummary} onContextMenu={(e)=> e.preventDefault()}>
                                    <img src={hotelMoreDetails ? hotelMoreDetails.ImageUrl : defaultImage} alt="" title={hotelMoreDetails && hotelMoreDetails.HotelName} />
                                </div>
                            </Col>
                            <Col xs={18} sm={21} md={16} lg={18} xl={18}>
                                <div className={styles.nameSummary}>
                                    <h4>{hotelMoreDetails && `${hotelMoreDetails.HotelCategoryName} ${hotelMoreDetails.HotelName} ${hotelMoreDetails.CityName}`}</h4>
                                    <div className={styles.hotelCardRating}>
                                        <Rating rate={hotelMoreDetails && hotelMoreDetails.HotelRating} />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <div className={styles.addressSummary}>
                                {hotelMoreDetails && hotelMoreDetails.Address}
                            </div>
                        </Row>
                    </div>
                </div>
                <div className={styles.passengerBookingSummary}>
                    <div className={styles.reserveCodeSummary}>
                        <span>{t('track-code')} : { reserveInformation.idReserve }</span>
                    </div>
                    
                    {reserveInformation.accommodation && reserveInformation.accommodation.rooms.map((item,index) =><div key={index} className={styles.passengerSummary}>
                        <UserOutlineIcon />
                        <span className='margin-start-10'>{item.adults} {t('adult')}</span> {(item.children>0)&& <span> {t('and')}  {item.children} {t('child')}</span>}
                    </div>)}

                    <div className={styles.dateSummary}>
                        <DateOutlineIcon />
                        <span className={styles.datepickerSummary}>
                            {moment(reserveInformation.reserveStartDate).format("jDD jMMMM jYYYY")}
                            <ArrowLeftIcon />
                            {moment(reserveInformation.reserveEndDate).format("jDD jMMMM jYYYY")}
                        </span>
                        {/* <span className={styles.countNightSummary}>{moment(reserveInformation.reserveEndDate).diff(moment(reserveInformation.reserveStartDate), 'days')} {t('night')}</span> */}
                        <span className={styles.countNightSummary}>{reserveInformation.diffDays} {t('night')}</span>
                    </div>
                    
                    {reserveInformation && reserveInformation.rooms.map((item,index)=><div key={index}>
                        <div className={styles.roomSummary}>
                            <HotelIcon />
                            <span>{item.roomName}</span>
                            {(item.roomName.includes("DAY USE") || item.roomName.includes("اکونومی") || item.roomName.includes("ECONOMIC"))?
                            <div className="margin-bottom"><Text type="warning"><InfoCircleOutlined className="vertical-middle" /> {t("residence-10-hour")}</Text></div>:null}
                        </div>
                    </div>)}
                    
                    <div className={styles.dateSummary}>
                        <span>شماره سفارش : { router.query.reserveId }</span>
                    </div>

                </div>
                {/* <div className={styles.passengerBookingSummary}>
                    <Tag className="margin-bottom-small" color={(reserveInformation.cancellations === "Refundable") ? "green" : (reserveInformation.cancellations === "NonRefundable")?"red": undefined }>{(reserveInformation.cancellations === "Refundable") ? t("refundable") : (reserveInformation.cancellations === "NonRefundable")?t("non-refundable"): reserveInformation.cancellations }</Tag> */}
                    {/* <ul>
                        {reserveInformation.cancellations.map((cancellationItem,cancellationIndex)=><li key={cancellationIndex}>
                            {numberWithCommas(cancellationItem.amount)} {t("rial-from-date")}<span> {moment(cancellationItem.fromDate).format("D MMMM YYYY")} </span> ({moment(cancellationItem.fromDate).format("jD jMMMM jYYYY")})
                        </li>
                        )}
                    </ul>*/}
                {/* </div> */}
                <div className={styles.vatSummary}>
                    <Row>
                        <Col span={12}>
                            <div className={styles.subjectVatSummary}>
                                <span>{t('total')}</span>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className={styles.contentVatSummary}>
                                <span>{numberWithCommas(reserveInformation.totalPrice.salePrice)} {t('rial')}</span>
                            </div>
                        </Col>
                    </Row>
                    {
                        numberWithCommas((reserveInformation.introPrice - reserveInformation.totalPrice.salePrice)) == 0 ? null :
                        <Row>
                            <Col span={12}>
                                <div className={styles.subjectVatSummary}>
                                    <span> {t("site-discount")}</span>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className={styles.contentVatSummary}> <span>{numberWithCommas((reserveInformation.introPrice - reserveInformation.totalPrice.salePrice))} {t('rial')}</span>
                                </div>
                            </Col>
                        </Row>
                    }
                    {reserveInformation.discountAmount === null ?
                        <Row>
                            <Col span={12}>
                                <div className={styles.subjectVatSummaryResult}>
                                    <span>{t("paid-price")}</span>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className={styles.contentVatSummaryResult}>
                                    <span>{numberWithCommas(reserveInformation.totalPrice.salePrice)} {t('rial')}</span>
                                </div>
                            </Col>
                        </Row>
                        :
                        <><Row>
                            <Col span={12}>
                                <div className={styles.subjectVatSummary}>
                                    <span> کد تخفیف</span>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className={styles.contentVatSummary}> <span>{numberWithCommas(reserveInformation.discountAmount)} {t('rial')}</span>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <div className={styles.subjectVatSummaryResult}>
                                    <span>{t("paid-price")}</span>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className={styles.contentVatSummaryResult}>
                                    <span>{numberWithCommas(reserveInformation.totalPrice.salePrice - reserveInformation.discountAmount)} {t('rial')}</span>
                                </div>
                            </Col>
                        </Row></>}
                </div>
            </div>
            
            <div className={styles.paymentService}>
                <div className={styles.contentService}>
                    <div className={styles.imageService}>
                        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNiIgdmlld0JveD0iMCAwIDI0IDI2Ij4KICAgIDxwYXRoIGZpbGw9IiMxREFDMDgiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTExLjA1OC4xODhjLjM4Ni0uMjUgMS40OTgtLjI1IDEuODg0IDAgMy4zOSAyLjE5NyA2LjQ1IDMuMzM0IDkuNjc1IDMuNTMuOTUxLjA0IDEuMzY1LjQ3MSAxLjM2NSAxLjM3NCAwIC41NjkuMDQxIDYuNTUgMCA4LjcwOCAwIC43NDUtLjA4MyAxLjUzLS4yOSAyLjMxNS0uNDU1IDEuODA0LTEuNDQ3IDMuNDktMy4xIDUuMDYtMi4xMSAyLTguMzk0IDQuODI1LTguNjI0IDQuODI1LS4xNjYgMC02LjQ1LTIuODI0LTguNTYtNC44MjUtMS42NTMtMS41Ny0yLjY0NS0zLjI1Ni0zLjEtNS4wNmE5LjA4OSA5LjA4OSAwIDAgMS0uMjktMi4zMTVjLS4wNDEtMi4xNTcgMC04LjEzOSAwLTguNzA4IDAtLjkwMy40MTQtMS4zMzQgMS4zNjUtMS4zNzMgMy4yMjUtLjE5NyA2LjI4NS0xLjMzNCA5LjY3NS0zLjUzMXpNOS41MTEgMTYuOTM5Yy41NC41MjYgMS40MTQuNTI2IDEuOTU0IDBsNi4xMy01Ljk3NGMuNTQtLjUyNi41NC0xLjM3OCAwLTEuOTA0YTEuNDA3IDEuNDA3IDAgMCAwLTEuOTU0IDBsLTUuMTM5IDUuMDM2LTIuMTQzLTIuMDlhMS40MDcgMS40MDcgMCAwIDAtMS45NTQgMCAxLjMyMiAxLjMyMiAwIDAgMCAwIDEuOTA1bDMuMTA2IDMuMDI3eiIvPgo8L3N2Zz4K" />
                    </div>
                    <div>
                        <strong>{t('safe-100%')}</strong>
                        <span>{t('we-use-ssl')}</span>
                    </div>
                </div>
                <hr/>
                <div className={styles.contentService}>
                    <div className={styles.imageService}>
                        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAiIGhlaWdodD0iMjYiIHZpZXdCb3g9IjAgMCAyMCAyNiI+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBpZD0iYSIgZD0iTTc2LjMzMyAxNzEuMzc1di0zLjI1YzAtNC40ODgtMy43My04LjEyNS04LjMzMy04LjEyNXMtOC4zMzMgMy42MzctOC4zMzMgOC4xMjV2My4yNWMtLjkyMiAwLTEuNjY3LjcyNi0xLjY2NyAxLjYyNXYxMS4zNzVjMCAuODk5Ljc0NSAxLjYyNSAxLjY2NyAxLjYyNWgxNi42NjZjLjkyMiAwIDEuNjY3LS43MjYgMS42NjctMS42MjVWMTczYzAtLjg5OS0uNzQ1LTEuNjI1LTEuNjY3LTEuNjI1ek02OCAxNjMuMjVjMi43NTcgMCA1IDIuMTg3IDUgNC44NzV2My4yNUg2M3YtMy4yNWMwLTIuNjg4IDIuMjQzLTQuODc1IDUtNC44NzV6bS0yLjMzMiAxOC4wOGwtMi4zNi0yLjE4M2EuOTIuOTIgMCAwIDEgMC0xLjM3M2MuNDEtLjM4IDEuMDc0LS4zOCAxLjQ4NCAwbDEuNjMgMS41MDcgMy45MDUtMy42MzNjLjQxLS4zOCAxLjA3NS0uMzggMS40ODUgMGEuOTIuOTIgMCAwIDEgMCAxLjM3M2wtNC42NTkgNC4zMWMtLjQxLjM3OS0xLjA3NS4zNzktMS40ODUgMHoiLz4KICAgIDwvZGVmcz4KICAgIDx1c2UgZmlsbD0iIzFEQUMwOCIgZmlsbC1ydWxlPSJub256ZXJvIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNTggLTE2MCkiIHhsaW5rOmhyZWY9IiNhIi8+Cjwvc3ZnPgo=" />
                    </div>
                    <div>
                        <strong>{t('bank-operation')}</strong>
                        <span>{t('we-dont-save-cart-info')}</span>
                    </div>
                </div>
            </div>

            <div className={styles.alertSuccess}>
                <h6>{t('price-increase')}</h6>
                <span>{t('reserve-today')}</span>
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

AsidePaymentHotel.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
AsidePaymentHotel.propTypes = {
    t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(AsidePaymentHotel)
