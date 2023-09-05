import React, { useEffect, useState } from "react"
import PropTypes from 'prop-types'
import { withTranslation, Link, i18n } from '../../../../i18n'
import { LoadingOutlined,InfoCircleOutlined } from '@ant-design/icons'
import { Spin, Typography, Skeleton } from 'antd';
import { GetVoucherHotelDomesticPdf } from '../../../actions'

import styles from '../../../styles/Home.module.css'
import { CheckIcon, CheckCircleIcon, BookingTicketIcon, WarningIcon, UserIcon, ErrorIcon, BedIcon } from '../../UI/Icons'

const antIcon = <LoadingOutlined style={{ 'font-size': '18px', 'margin-right': '5px', 'position': 'relative','top': '3px' }} spin />

const ContentBooking = props => {
    const [voucherStatus,setVoucherStatus] = useState("pending");
    const [loading, setLoading] = useState(0);
    let val =1;
    const { t, progress, data, reserveInfo, price, reserveId, username, hotelInfo } = props;
    const { Text } = Typography;

    useEffect(() => {
        const changeProgress = async() => {
           val = val+1;
          await setLoading(val);
          if (val < 90) {
            setTimeout(() =>{ changeProgress()}, 1000);
          }
        };
        changeProgress();
    }, []);

    const handleClick = async () => {
        setVoucherStatus("loading");
        const res = await GetVoucherHotelDomesticPdf(reserveId, username);
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
                        style={{ width: `${loading}%` }}
                    ></div>
                    <span>{t("reserve-is-checking")}</span>
                    </div>
                    <div className={styles.contentMyBooking}>
                    <div className={styles.proccessBooking}>
                        <h4>{reserveInfo && <>{t("hello")} {reserveInfo.fullName}</>  }</h4>
                        <span>{t("wait-a-second")}</span>
                        <span>{t("an-email-will-sent")}</span>
                    </div>
                    </div>
                </div>
            :
                <>
                    {data.status === "Issued" ?
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
                                <span> {progress? <LoadingOutlined style={{marginRight:'20px'}}/> : reserveInfo.idReserve} </span>
                                </div>
                            </div>
                            <div className={styles.contentMyBooking}>
                                <div className={styles.successBooking}>
                                <CheckCircleIcon />
                                <h4> سلام {reserveInfo.fullName} </h4>
                                <span>{t("reserve-success")}</span>
                                <span>
                                    {t("email-with-link2")}
                                    <b> {reserveInfo.email} </b>
                                    {t("sent")}
                                    {t("for-tracking-with-us")}
                                    <b> {t("tracking-code")} : {reserveInfo.idReserve} </b>
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
                                    <span> {progress? <LoadingOutlined style={{marginRight:'20px'}}/> : reserveInfo.idReserve} </span>
                                </div>
                                <div className={styles.contactSupport}>
                                    برای تماس با پشتیبانی با شماره
                                    <a href="tel:+982179515000"> 02179515000 </a>
                                    تماس بگیرید.
                                </div>
                                </div>
                            </div>
                        </div>
                    }
                </>
            }
            
            {data.status === "Issued" &&
                <div className={styles.downloadVoucher}>
                    <a onClick={handleClick} disabled={voucherStatus === "pending" ? null : "disabled"}>
                        {voucherStatus === "pending" ?
                        <><BookingTicketIcon/>{t("recieve-voucher")}</> :
                        <><LoadingOutlined spin /> {t("loading-recieve-voucher")}</>}
                    </a>
                </div>}

            {reserveInfo ?                
                <div className={styles.roomInfoMybooking}>
                    <div className={styles.subjectRoomInfoMybooking}>
                        <div>
                            <div className={styles.textRoomInfoMybooking}>{t('room-details')}</div>
                        </div>
                        <div>
                            <div className={styles.confirmationNoInfoBooking}>
                                <span> {t('tracking-code')}</span> {props.reserveInfo ? props.reserveInfo.idReserve: <> <b> {t('checking')}</b> <Spin indicator={antIcon} /></>}
                            </div>
                        </div>
                    </div>
                    <div className={styles.contentRoomInfoMyBooking}>
                        <div className={styles.myRoomInfomation}>
                            <div className={styles.headMyRoomInformation}>
                                <UserIcon />
                                {t('guest')} {props.reserveInfo && props.reserveInfo.fullName}
                            </div>
                            {props.reserveInfo && props.reserveInfo.rooms.map((item,index)=> <div key={index} className={styles.contentMyRoomInformation}>
                                <div className={styles.bedMyRoomInformation}>
                                    <div> <BedIcon/> {item.roomName} </div>                                    
                                    {item.description && <div className="margin-bottom"><Text type="warning"><InfoCircleOutlined className="vertical-middle" /> {item.description} </Text></div>}
                                </div>
                                {/* <div className={styles.noteMyRoomInformation}>
                                    <span>
                                        <CheckIcon/>
                                        فقط اتاق
                                    </span>
                                    <span>
                                        <CheckIcon/>
                                        کنسلی رایگان تا قبل از تاریخ ۱۱ مهر ۱۳۹۹
                                    </span>
                                </div>
                                <ViewCancelationPolicy/> */}
                            </div>
                            )}
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

            {reserveInfo ?
                <div className={styles.bookingInfo}>
                    <div className={styles.subjectBookingInfo}>{t("reserve-details")}</div>
                    <div className={styles.contentBookingInfo}>
                        <div className={styles.goToPaymwnt}>
                            <div>
                                <span>
                                    {t('reserve-details-desc')} 
                                    {props.reserveInfo && props.reserveInfo.email && <> {t('and-to-email')}  <b> {props.reserveInfo.email} </b>{t('sent')}</>}
                    
                                </span>
                            </div>
                            {props.reserveInfo &&  (props.reserveInfo.reserveStatus !== 11) ?
                            <div>
                                <a href="#">{t('go-to-pay-page')}</a>
                            </div>
                            :null }
                        </div>
                        <div className={styles.contactBookingInto}>
                            {t('for-clarity-email')} 
                            <a href="mailto:support@safaraneh.com"> support@safaraneh.com </a>
                            {t('or-phone-number')}
                            <a href="tel:+982179515000"> 02179515000 </a>
                            {t('call-24hours')}
                        </div>
                    </div>
                </div>
                :
                <div className={styles.bookingInfo}>
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
                </div>
            }

            {/* <div className={styles.feesExtras}>
                <div className={styles.cardTitle}>هزینه و موارد اضافی</div>
                <div className={styles.cardBody}>
                    <AnimatedShowMore
                        height={130}
                        toggle={({ isOpen }) => isOpen ? 'بستن متن' : 'ادامه متن' }
                        speed={0}
                        shadowColor="#ffffff">
                        <div className={styles.contantBody}>
                            <h5>هزینه های اجباری</h5>
                            <p>تمام هزینه های ارائه شده توسط این ملک را شامل می شود. با این حال ، به عنوان مثال ، هزینه ها می توانند بسته به مدت اقامت یا اتاق مورد نظر شما متفاوت باشند.</p>
                        </div>
                        <div className={styles.contantBody}>
                            <h5>هزینه اختیاری</h5>
                            <p>هزینه ها و سپرده های زیر توسط ملک در زمان سرویس ، check-in یا check-out پرداخت می شود.</p>
                            <ul>
                                <li>هزینه صبحانه بوفه: 150 ریال برای بزرگسالان و 75 ریال برای کودکان (تقریباً)</li>
                                <li>هزینه شاتل فرودگاه: 260 ریال برای هر وسیله نقلیه (یک طرفه)</li>
                                <li>چک زود هنگام برای پرداخت هزینه (در دسترس بودن) در دسترس است</li>
                                <li>چک تأخیر برای هزینه در دسترس است (منوط به در دسترس بودن)</li>
                                <li>هزینه تختخواب تمام وقت: 240،0 ریال در هر شب</li>
                            </ul>
                        </div>
                    </AnimatedShowMore>
                </div>
            </div>
            <div className={styles.checkInstructions}>
                <div className={styles.cardTitle}>بررسی دستورالعمل ها</div>
                <div className={styles.cardBody}>
                    <AnimatedShowMore
                        height={130}
                        toggle={({ isOpen }) => isOpen ? 'بستن متن' : 'ادامه متن' }
                        speed={0}
                        shadowColor="#ffffff">
                        <div className={styles.contantBody}>
                            <h5>دستورالعمل های ورود</h5>
                            <p>هزینه های اضافی ممکن است بسته به خط مشی دارایی متفاوت باشد و متفاوت باشد.</p>
                            <p>شناسایی عکسی که توسط دولت صادر شده است و کارت اعتباری یا ودیعه نقدی نیز در هنگام ورود به اتهامات اتفاقی لازم است.</p>
                            <p>درخواست های ویژه در هنگام ورود به سیستم در دسترس هستند و ممکن است هزینه های اضافی را متحمل شوند. درخواست های ویژه تضمین نمی شود.</p>
                        </div>
                        <div className={styles.contantBody}>
                            <h5>دستورالعمل های خروج</h5>
                            <p>خدمات شاتل فرودگاه 24 ساعته در صورت درخواست ارائه می شود. برای انجام تنظیمات از قبل با ملک تماس بگیرید. هزینه گردشگری توسط شهر اعمال می شود و در ملک جمع می شود. هزینه برای اولین اتاق خواب در هر شب 20 AED است و برای هر اتاق خواب اضافی 20 AED در هر شب افزایش می یابد. برای اطلاعات بیشتر ، لطفاً با استفاده از اطلاعات موجود در ایمیل تأیید خود ، با ملک تماس بگیرید.</p>
                        </div>
                    </AnimatedShowMore>
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
