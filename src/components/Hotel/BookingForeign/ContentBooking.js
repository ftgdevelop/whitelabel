import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation, Link, i18n } from '../../../../i18n'
import { UserIcon, BedIcon } from '../../UI/Icons'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin, Skeleton,Tag } from 'antd';

import styles from '../../../styles/Home.module.css'
import { CheckIcon, CheckCircleIcon, ErrorIcon, WarningIcon } from '../../UI/Icons'
import moment from 'moment-jalaali';

import {BookingHotelInternationalBook } from '../../../actions'; 

const antIcon = <LoadingOutlined style={{ 'font-size': '18px', 'margin-right': '5px', 'position': 'relative','top': '3px' }} spin />

class ContentBooking extends React.Component {
    state = { 
        bookLoading: true,
        sessionStorageTelNumber: undefined,
        sessionStorageEmail : undefined,
        status : undefined,
        loadingWidth:0
     };
     
    fetchData = async () => {
        if (this.props.reserveInfo){

            const parameters = {"reserveId":""+this.props.reserveInfo.id,"username":this.props.reserveInfo.reserver.email};
            const response = await BookingHotelInternationalBook(parameters);
            if (response.data) { 
                if (response.data.result.isCompleted) {
                    this.setState({bookLoading:false,status:response.data.result.reserve.status,loadingWidth:100});
                    clearInterval(this.bookInterval);
                    clearInterval(this.loadingInterval);
                }
            }            
        }
    };

    increaseWidth = () => {
        let w = this.state.loadingWidth;
        if (w < 95){
            this.setState({loadingWidth: w + 5 })
        }
    }

    componentDidMount = ()=>{
            
        this.setState({
            sessionStorageTelNumber : window.sessionStorage.getItem("whiteLabelTelNumber")
        });
        this.setState({
            sessionStorageEmail :window.sessionStorage.getItem("whiteLabelEmail")
        });

        this.fetchData();

        return () => {
            clearInterval(this.bookInterval);
        }
    };

   

    bookInterval = setInterval(() => {
        this.fetchData();
    }, 2000);

    loadingInterval = setInterval(() => {
        this.increaseWidth();
    }, 50);


    numberWithCommas = (x) =>{
        if (x){
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }else{
            return "0";
        }
    }

     render(){
        const { t } = this.props;

        return (
            <div className={styles.contentBooking}>
                <div className={styles.statusMyBooking}>
                    {(!this.props.reserveInfo) || this.state.bookLoading ?
                        <div className={styles.statusMyBooking}>
                            <div className={styles.progressMyBooking}>
                                <div
                                    className={styles.progress}
                                    style={{ width: `${this.state.loadingWidth}%` }}
                                ></div>
                                <span>{t("reserve-is-checking")}</span>
                                </div>
                                <div className={styles.contentMyBooking}>
                                <div className={styles.proccessBooking}>
                                {this.props.reserveInfo && this.props.reserveInfo.reserver.firstName ? <h4> {t('hello')}  {this.props.reserveInfo.reserver.gender ? t('mr') :t('mrs')}  {this.props.reserveInfo.reserver.firstName } {this.props.reserveInfo.reserver.lastName}</h4> : ''}
                                    <span>{t("wait-a-second")}</span>
                                    <span>
                                    {t("an-email-will-sent")}
                                    </span>
                                </div>
                            </div>
                    
                        </div>
                    :
                    (this.state.status === "Issued") ?
                    <>
                        <div className={styles.successMyBooking}>
                            <div>
                                <CheckIcon/>
                                <span className={styles.textSuccessMyBooking}>{t("congratulation-reserve-success")}</span>
                            </div>
                            <div>
                                <span className={styles.reserveIdSuccessBooking}>{t('tracking-code')}{this.props.reserveInfo.id}</span> 
                            </div>
                        </div>
                        <div className={styles.contentMyBooking}>
                            <div className={styles.successBooking}>
                                <CheckCircleIcon/>
                                {this.props.reserveInfo.reserver.firstName && <h4> {t('hello')}   {this.props.reserveInfo.reserver.gender ?t('mr') : t('mrs')}  {this.props.reserveInfo.reserver.firstName } {this.props.reserveInfo.reserver.lastName}</h4>}
                                <span>{t("reserve-success")}</span>
                                {this.props.reserveInfo.email &&
                                <span>
                                    {t("email-with-link2")}
                                    <b> {this.props.reserveInfo.reserver.email} </b>
                                    {t("sent")}
                                    {t("for-tracking-with-us")}
                                    <b> {t("tracking-code")}: {this.props.reserveInfo ? this.props.reserveInfo.id: <Spin />} </b>
                                    {t("use")}
                                </span>
                                }
                            </div>
                        </div>
                    </>
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
                                <span> {this.props.reserveInfo ? this.props.reserveInfo.id : <LoadingOutlined style={{marginRight:'20px'}}/>} </span>
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
                </div>

                {
                    this.state.status === "Issued" ?
                    <>
                        {
                            this.props.reserveInfo && this.props.reserveInfo.id && this.props.reserveInfo.reserver.email ?
                            <div className={styles.downloadVoucher}>
                                <a target="_blank" href={`http://voucher.safaraneh.com/fa/safaraneh/Reserve/hotel/voucher?reserveId=${this.props.reserveInfo.id}&username=${this.props.reserveInfo.reserver.email}`}>
                                    {t("recieve-voucher")}
                                </a>
                            </div>
                            :
                            <div className={styles.downloadVoucher}>
                                <Skeleton.Button active className={styles.downloadVoucherSkeleton} />
                            </div>
                        }
                    </> : null
                }

                {this.props.reserveInfo ?                
                    <div className={styles.roomInfoMybooking}>
                        
                        <div className={styles.subjectRoomInfoMybooking}>
                            <div>
                                <div className={styles.textRoomInfoMybooking}>{t("room-details")}</div>
                            </div>
                            <div>
                                <div className={styles.confirmationNoInfoBooking}>
                                    <span> {t("tracking-code")} : </span> {this.props.reserveInfo ? this.props.reserveInfo.id: <> <b> {t('checking')} </b> <Spin indicator={antIcon} /></>}
                                </div>
                            </div>
                        </div>
                        <div className={styles.contentRoomInfoMyBooking}>
                            <div className={styles.myRoomInfomation}>
                                <div className={styles.headMyRoomInformation}>
                                    <UserIcon/>
                                    {t('guest')} {this.props.reserveInfo && `${this.props.reserveInfo.reserver.gender ? t('mr') : t('mrs')} ${this.props.reserveInfo.reserver.firstName } ${this.props.reserveInfo.reserver.lastName}`}
                                    
                                </div>
                                {this.props.reserveInfo && this.props.reserveInfo.accommodation.rooms.map((item,index)=> <div key={index} className={styles.contentMyRoomInformation}>
                                    <div className={styles.bedMyRoomInformation}>
                                        <div> <BedIcon/> {item.name} </div>
                                    </div>
                                    <div className={styles.noteMyRoomInformation}>
                                        <span>
                                            <CheckIcon/>
                                            {item.boardCode}
                                        </span>
                                    </div>
                                    <Tag className="margin-bottom-small" color={(this.props.reserveInfo.cancellationPolicyType === "Refundable") ? "green" : (this.props.reserveInfo.cancellationPolicyType === "NonRefundable")?"red": undefined }>{(this.props.reserveInfo.cancellationPolicyType === "Refundable") ? t('refundable') : (this.props.reserveInfo.cancellationPolicyType === "NonRefundable")?t("non-refundable"): this.props.reserveInfo.cancellationPolicyType.status }</Tag>
                                    <ul>
                                        {this.props.reserveInfo.cancellations.map((item,index)=><li key={index}>
                                            {this.numberWithCommas(item.amount)} {t('rial-from')} <span> {moment(item.fromDate).format("D MMMM YYYY")} </span> ({moment(item.fromDate).format("jD jMMMM jYYYY")})
                                        </li>
                                        )}
                                    </ul>  
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
    
                {this.props.reserveInfo ?
                    <div className={styles.bookingInfo}>
                        <div className={styles.subjectBookingInfo}>{t("reserve-details")}</div>
                        <div className={styles.contentBookingInfo}>
                            <div className={styles.goToPaymwnt}>
                                <div>
                                    <span>
                                        {t("reserve-details-desc")}
                                        {this.props.reserveInfo && this.props.reserveInfo.email && <> {t("and-to-email")}<b> {this.props.reserveInfo.email} </b>{t("sent")}</>}
                        
                                    </span>
                                </div>
                                {this.props.reserveInfo &&  (this.props.reserveInfo.reserveStatus !== 11) ?
                                <div>
                                    <a href="#">{t("go-to-pay-page")}</a>
                                </div>
                                :null }
                            </div>
                            <div className={styles.contactBookingInto}>
                                {t("for-clarity-email")}
                                <a href={`mailto:${this.state.sessionStorageEmail}`}> {this.state.sessionStorageEmail} </a>
                                {t("or-phone-number")}
                                <a href={`tel:${this.state.sessionStorageTelNumber}`}> {this.state.sessionStorageTelNumber} </a>
                                {t("call-24hours")}
                            </div>
                        </div>
                    </div>
                    :
                    <div className={styles.bookingInfo}>
                        <div className={styles.subjectBookingInfo}>
                            <Skeleton.Button active className={styles.subBookingInfoSkeleton} />
                        </div>

                        <div className={styles.contantBody}>
                            <h5>{t("optianal-cost")}</h5>
                            <p>{t("optianal-cost-desc1")}</p>
                            <ul>
                                <li>{t("optianal-cost-desc2")}</li>
                                <li>{t("optianal-cost-desc3")}</li>
                                <li>{t("optianal-cost-desc4")}</li>
                                <li>{t("optianal-cost-desc5")}</li>
                                <li>{t("optianal-cost-desc6")}</li>
                            </ul>
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
    
            </div>
        )
     }

}

ContentBooking.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
ContentBooking.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(ContentBooking)
