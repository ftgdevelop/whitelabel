import React from 'react'
import PropTypes from 'prop-types'
import { Link, i18n, withTranslation } from '../../../../i18n'
import {  UserIcon, BedIcon } from '../../UI/Icons'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin, Skeleton,Tag } from 'antd';
import {CipPostConfirm, CipGetVoucher} from '../../../actions/index'
import styles from '../../../styles/Home.module.css'
import { CheckIcon, CheckCircleIcon, ErrorIcon, WarningIcon, BookingTicketIcon } from '../../UI/Icons'

const antIcon = <LoadingOutlined style={{ 'font-size': '18px', 'margin-right': '5px', 'position': 'relative','top': '3px' }} spin />

class ContentBooking extends React.Component {
    state = { 
        bookLoading: true,
        sessionStorageTelNumber: undefined,
        sessionStorageEmail : undefined,
        status : undefined,
        loadingWidth: 0,
        voucherStatus: "pending"
     };
     
    fetchData = async () => {
        if (this.props.reserveInfo && this.props.reserveId && this.props.userName){
            const response = await CipPostConfirm({
                "reserveId": this.props.reserveId, "username": this.props.userName
            });
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

    handleClick = async () => {
        this.setState({voucherStatus: "loading"});
        if (this.props.reserveInfo && this.props.reserveId && this.props.userName) {
            const res = await CipGetVoucher(this.props.reserveId, this.props.userName);
            if (res.data.result) {
                this.setState({ voucherStatus: "success" });
                let url = `https://cip.safaraneh.com/File/DownloadTempFile?filename=${res.data.result.fileName}.pdf&fileType=${res.data.result.fileType}&fileToken=${res.data.result.fileToken}`;
                let a = document.createElement('a');
                a.href = url;
                a.click();
                this.setState
            } else {
                this.setState({voucherStatus: "error"});
            }
            this.setState({voucherStatus: "pending"});
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
                                 {this.props.reserveInfo && this.props.reserveInfo.reserver.firstName ? <h4> {t('hello')} {this.props.reserveInfo.reserver.lastName} </h4>: ''}                         
                                 <span>{t("wait-a-second")}</span>
                                 <span>
                                 {t("an-email-will-sent")}
                                 </span>
                              </div>
                           </div>                    
                        </div>
                    :
                    (this.state.status === "ContactProvider") ?
                    <>
                        <div className={styles.successMyBooking}>
                            <div>
                                <CheckIcon/>
                                <span className={styles.textSuccessMyBooking}>{t("congratulation-reserve-success")}</span>
                            </div>
                            <div>
                                <span className={styles.reserveIdSuccessBooking}>{t('tracking-code')} : {this.props.reserveId}</span> 
                            </div>
                        </div>
                        <div className={styles.contentMyBooking}>
                            <div className={styles.successBooking}>
                                <CheckCircleIcon/>
                                {this.props.reserveInfo && this.props.reserveInfo.reserver.firstName ? <h4> {t('hello')} {this.props.reserveInfo.reserver.firstName} </h4>: ''} 
                                <span>{t("reserve-success")}</span>
                                {this.props.reserveInfo.email &&
                                <span>
                                    {t("email-with-link2")}
                                    <b> {this.props.reserveInfo.reserver.email} </b>
                                    {t("sent")}
                                    {t("for-tracking-with-us")}
                                    <b> {t("tracking-code")}: {this.props.reserveId || <Spin />} </b>
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
                                 <span> {this.props.reserveId || <LoadingOutlined style={{marginRight:'20px'}}/>} </span>
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
                
                { this.state.status === "ContactProvider" ?
                    <>
                        {
                            this.props.reserveInfo?.id && this.props.reserveInfo?.username ?
                              <div className={styles.downloadVoucher}>
                                 <a onClick={this.handleClick} disabled={this.state.voucherStatus === "pending" ? null : "disabled"}>
                                        {this.state.voucherStatus === "pending" ?
                                            <><BookingTicketIcon/>{t("recieve-voucher")}</> :
                                            <><LoadingOutlined spin /> {t("loading-recieve-voucher")}</>}
                                 </a>
                              </div>
                            : null
                            // <div className={styles.downloadVoucher}>
                            //     <Skeleton.Button active className={styles.downloadVoucherSkeleton} />
                            // </div>
                        }
                    </> : null}
    
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
                                {/* {this.props.reserveInfo &&  (this.props.reserveInfo.reserveStatus !== 11) ?
                                <div>
                                    <a href="#">{t("go-to-pay-page")}</a>
                                </div>
                                :null } */}
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
{/* 
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
                        </div> */}
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
