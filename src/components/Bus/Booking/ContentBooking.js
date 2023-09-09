import React, { useEffect, useState } from "react"
import PropTypes from 'prop-types'
import { withTranslation, Link, i18n } from '../../../../i18n'
import { LoadingOutlined,InfoCircleOutlined } from '@ant-design/icons'
import { Spin, Typography, Skeleton } from 'antd';
import { GetVoucherBusPdf } from '../../../actions/bus/bus'

import styles from '../../../styles/Home.module.css'
import { CheckIcon, CheckCircleIcon, BookingTicketIcon, WarningIcon, UserIcon, ErrorIcon, BusIcon } from '../../UI/Icons'

const antIcon = <LoadingOutlined style={{ 'font-size': '18px', 'margin-right': '5px', 'position': 'relative','top': '3px' }} spin />

const ContentBooking = props => {
    const [voucherStatus,setVoucherStatus] = useState("pending");
    const { t, confirmBus, progress } = props;
    const { Text } = Typography;

    const handleClick = async () => {
        setVoucherStatus("loading");
        const res = await GetVoucherBusPdf(reserveId, username);
        if(res.data.result){
          setVoucherStatus("success");
          let url = `https://hotelv2.safaraneh.com/File/DownloadTempFile?filename=${res.data.result.fileName}.pdf&fileType=${res.data.result.fileType}&fileToken=${res.data.result.fileToken}`;
          let a = document.createElement('a');
          a.href = url;
          a.click();
        } else {
          setVoucherStatus("error");
        }
        setVoucherStatus("pending");
    }
    
    return (
        <div className={styles.contentBooking}>
            {progress ?
                <div className={styles.statusMyBooking}>
                    <div className={styles.progressMyBooking}>
                    <div
                        className={styles.progress}
                        // style={{ width: `${loading}%` }}
                    ></div>
                    <span>{t("reserve-is-checking")}</span>
                    </div>
                    <div className={styles.contentMyBooking}>
                    <div className={styles.proccessBooking}>
                        <h4><>{t("hello")} {confirmBus.reserver.firstName} {confirmBus.reserver.lastName}</></h4>
                        <span>{t("wait-a-second")}</span>
                        <span>{t("an-email-will-sent")}</span>
                    </div>
                    </div>
                </div>
                :
                <>
                    {confirmBus.status === "Issued" ? 
                        <div className={styles.statusMyBooking}>
                            <div className={styles.successMyBooking}>
                                <div>
                                <CheckIcon />
                                <span className={styles.textSuccessMyBooking}>
                                    {t("congratulation-reserve-success")}
                                </span>
                                </div>
                                <div>
                                <span className={styles.reserveIdSuccessBooking}> {t("tracking-code")} </span>
                                <span>
                                    <LoadingOutlined style={{ marginRight: '20px' }} />
                                    {confirmBus.id}
                                </span>
                                </div>
                            </div>
                            <div className={styles.contentMyBooking}>
                                <div className={styles.successBooking}>
                                    <CheckCircleIcon />
                                    <h4>
                                        {t("hello")} {confirmBus.reserver.firstName} {confirmBus.reserver.lastName}
                                    </h4>
                                    <span>{t("reserve-success")}</span>
                                    <span>
                                        {t("email-with-link2")}
                                        <b> {confirmBus.reserver.email} </b>
                                        {t("sent")}
                                        {t("for-tracking-with-us")}
                                        <b> {t("tracking-code")} : {confirmBus.id} </b>
                                        {t("use")}
                                    </span>
                                </div>
                            </div>
                        </div>
                        :
                        <div className={styles.statusMyBooking}>
                            <div className={styles.errorMyBooking}>
                                <div className={styles.alarmError}>
                                <ErrorIcon />
                                <span className={styles.textErrorMyBooking}>
                                    رزرو شما به مشکل خورد
                                </span>
                                </div>
                                <div className={styles.supportError}>
                                <span className={styles.checkError}>
                                    درخواست رزرو شما در حال بررسی توسط تیم پشتیبانی می باشد، جهت مشاهده وضعیت سفارش خود به بخش
                                    پیگیری رزرو
                                    مراجعه کنید.
                                </span>
                                <small>
                                    <WarningIcon/>
                                    لطفا قبل از مشخص شدن وضعیت سفارش خود از خرید مجدد خودداری فرمایید.
                                </small>
                                <div className={styles.reserveIdContent}>
                                    <span className={styles.reserveIdErrorBooking}> {t("tracking-code")} : </span>
                                    <span>
                                        { progress ?
                                            <LoadingOutlined style={{ marginRight: '20px' }} />
                                            : confirmBus.id
                                        }
                                    </span>
                                </div>
                                <div className={styles.contactSupport}>
                                    برای تماس با پشتیبانی با شماره
                                    <a href="tel:+982126150051"> 02126150051 </a>
                                    تماس بگیرید.
                                </div>
                                </div>
                            </div>
                        </div>
                    }
                </>
            }
            
            {confirmBus.status === "Issued" &&
                <div className={styles.downloadVoucher}>
                    <a
                        onClick={handleClick}
                        disabled={voucherStatus === "pending" ? null : "disabled"}
                    >
                        {voucherStatus === "pending" ?
                            <><BookingTicketIcon />{t("recieve-voucher")}</>
                            :<><LoadingOutlined spin /> {t("loading-recieve-voucher")}</>
                        }
                    </a>
                </div>
            }

            {confirmBus ?
                <div className={styles.roomInfoMybooking}>
                    <div className={styles.subjectRoomInfoMybooking}>
                        <div>
                            <div className={styles.textRoomInfoMybooking}>{t('reserve-details')}</div>
                        </div>
                        <div>
                            <div className={styles.confirmationNoInfoBooking}>
                                <span> {t('tracking-code')} : { confirmBus.id }</span>
                                {/* <>
                                    <b> {t('checking')}</b>
                                    <Spin indicator={antIcon} />
                                </> */}
                            </div>
                        </div>
                    </div>
                    <div className={styles.contentRoomInfoMyBooking}>
                        <div className={styles.myRoomInfomation}>
                            <div className={styles.headMyRoomInformation}>
                                <UserIcon/>
                                <span>رزرو گیرنده </span>
                                {confirmBus.reserver.firstName} {confirmBus.reserver.lastName}
                            </div>
                            <div className={styles.contentMyRoomInformation}>
                                <div className={styles.bedMyRoomInformation}>
                                    <div> <BusIcon/>
                                        شماره صندلی :
                                        {confirmBus.passengers.map(item => item.seatNumber)}
                                    </div>
                                    {/* <div className="margin-bottom"><Text type="warning"><InfoCircleOutlined className="vertical-middle" /> توضیحات </Text></div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className={styles.roomInfoMybooking}>
                    <div className={styles.subjectRoomInfoMybooking}>
                        <div>
                            <Skeleton.Button active className={styles.subMybookingSkeleton} />
                        </div>
                        <div>
                            <Skeleton.Button active className={styles.idMybookingSkeleton} />
                        </div>
                    </div>
                    <div className={styles.contentRoomInfoMyBooking}>
                        <div className={styles.myRoomInfomation}>
                            <div className={styles.headMyRoomInformation}>
                                <Skeleton.Avatar active size="small" shape="circle" />
                                <Skeleton.Button active className={styles.textRoomInformation} />
                            </div>
                            <div className={styles.contentMyRoomInformation}>
                                <div className={styles.bedMyRoomInformation}>
                                    <div>
                                        <Skeleton.Avatar active size="small" shape="circle" />
                                        <Skeleton.Button active className={styles.textBedRoomInformation} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
                
                {/* <div className={styles.roomInfoMybooking}>
                    <div className={styles.subjectRoomInfoMybooking}>
                        <div>
                            <Skeleton.Button active className={styles.subMybookingSkeleton} />
                        </div>
                        <div>
                            <Skeleton.Button active className={styles.idMybookingSkeleton} />
                        </div>
                    </div>
                    <div className={styles.contentRoomInfoMyBooking}>
                        <div className={styles.myRoomInfomation}>
                            <div className={styles.headMyRoomInformation}>
                                <Skeleton.Avatar active size="small" shape="circle" />
                                <Skeleton.Button active className={styles.textRoomInformation} />
                            </div>
                            <div className={styles.contentMyRoomInformation}>
                                <div className={styles.bedMyRoomInformation}>
                                    <div>
                                        <Skeleton.Avatar active size="small" shape="circle" />
                                        <Skeleton.Button active className={styles.textBedRoomInformation} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

                <div className={styles.bookingInfo}>
                    <div className={styles.subjectBookingInfo}>{t("reserve-details")}</div>
                    <div className={styles.contentBookingInfo}>
                        <div className={styles.goToPaymwnt}>
                            <div>
                                <span>
                                    {t('reserve-details-desc')} 
                                    <> {t('and-to-email')}  <b> ramin.derakhshan@gmail.com </b>{t('sent')}</>
                                </span>
                            </div>
                            <div>
                                <a href="#">{t('go-to-pay-page')}</a>
                            </div>
                        </div>
                        <div className={styles.contactBookingInto}>
                            {t('for-clarity-email')} 
                            <a href="mailto:support@safaraneh.com"> support@safaraneh.com </a>
                            {t('or-phone-number')}
                            <a href="tel:+982126150051"> 02126150051 </a>
                            {t('call-24hours')}
                        </div>
                    </div>
                </div>
                
                {/* <div className={styles.bookingInfo}>
                    <div className={styles.subjectBookingInfo}>
                        <Skeleton.Button active className={styles.subBookingInfoSkeleton} />
                    </div>
                    <div className={styles.contentBookingInfo}>
                        <div className={styles.goToPaymwnt}>
                            <Skeleton.Button active className={styles.goToPaymwntSkeleton} />
                        </div>
                        <div className={styles.contactBookingInto}>
                            <Skeleton.Button active className={styles.subBookingIntoSkeleton} />
                            <Skeleton.Button active className={styles.moreSubBookingIntoSkeleton} />
                        </div>
                    </div>
                </div> */}

        </div>
    )
}

ContentBooking.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
ContentBooking.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(ContentBooking)
