import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, i18n, withTranslation } from "../../../../i18n";
import { Typography, Spin } from "antd";
import { LoadingOutlined, CheckCircleOutlined } from "@ant-design/icons";

import styles from "../../../styles/Home.module.css";
import { CheckIcon, CheckCircleIcon, UserIcon, ErrorIcon, BookingTicketIcon, WarningIcon } from "../../UI/Icons";
import AsidePaymentFlight from "../../Payment/AsidePaymentFlight";
import { GetVoucherPdf } from "../../../actions";

const ContentBooking = (props) => {
  const [voucherStatus,setVoucherStatus] = useState("pending");
  const [loading, setLoading] = useState(0);
  let val =1;
  let name = '';
  let email = props.flights && props.flights.reserver ? props.flights.reserver.email : ''
  const { t, progress, data, price, flights, reserveId, username } = props;

  if(props.flights && props.flights.reserver){
        name = props.flights.reserver.firstName + ' ' + props.flights.reserver.lastName
  }else{
      name = t("dear-user")
  }
    
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
    const res = await GetVoucherPdf(reserveId, username);
    if(res.data.result){
      setVoucherStatus("success");
      let url = `https://flightdomestic.safaraneh.com/File/DownloadTempFile?filename=${res.data.result.fileName}.pdf&fileType=${res.data.result.fileType}&fileToken=${res.data.result.fileToken}`;
      let a = document.createElement('a');
      a.href = url;
      a.click();
    } else {
      setVoucherStatus("error");
    }
    setVoucherStatus("pending");
  }

  const { Text } = Typography;
  return (
    <div className={styles.contentBooking}>
      {progress ?
          <div className={styles.statusMyBooking}>
            <div className={styles.progressMyBooking}>
              <div
                className={styles.progress}
                style={{ width: `${loading}%` }}
              ></div>
              <span>{t("reserve-checking")}</span>
            </div>
            <div className={styles.contentMyBooking}>
              <div className={styles.proccessBooking}>
                <h4>{t("hello")} { name}  </h4>
                <span>{t("wait-second")}</span>
                <span>
                  {t("email-voucher")}
                </span>
              </div>
            </div>
          </div>
        :
        <>
          {
            data.status === "Issued" ?
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
                  <span> {progress? <LoadingOutlined style={{marginRight:'20px'}}/> : data.id} </span>
                </div>
              </div>
              <div className={styles.contentMyBooking}>
                <div className={styles.successBooking}>
                  <CheckCircleIcon />
                  <h4> سلام { name } </h4>
                  <span>{t("reserve-success")}</span>
                  <span>
                    {t("email-with-link2")}
                    <b> {email} </b>
                    {t("sent")}
                    {t("for-tracking-with-us")}
                    <b> {t("tracking-code")} : {data.id} </b>
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
                    <span> {progress? <LoadingOutlined style={{marginRight:'20px'}}/> : data.id} </span>
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

      {
        data.status === "Issued" ?
        <div className={styles.downloadVoucher}>
          <a onClick={handleClick} disabled={voucherStatus === "pending" ? null : "disabled"}>
            {voucherStatus === "pending" ?
              <><BookingTicketIcon/>{t("recieve-voucher")}</> :
              <><LoadingOutlined spin /> {t("loading-recieve-voucher")}</>}
          </a>
        </div> : null
      }

      <div className={styles.roomInfoMybooking}>
        <div className={styles.subjectRoomInfoMybooking}>
          <div>
            <div className={styles.textRoomInfoMybooking}>{t("flight-details")}</div>
          </div>
          <div>
            <div className={styles.confirmationNoInfoBooking}>
              <span> {t("tracking-code")} : </span> {progress? <LoadingOutlined style={{marginRight:'20px'}}/>: data.id}
            </div>
          </div>
        </div>
        <div className={styles.contentRoomInfoMyBooking}>
          <div className={styles.myRoomInfomation}>
            <div className={styles.headMyRoomInformation}>
              <UserIcon />
              {t("reserver")} : { name } 
            </div>
            <div className={styles.contentMyRoomInformation}>
            {flights ?<AsidePaymentFlight price={price} flights={flights} hiddenTitle={true} hiddenOffPrice={true}/>:''}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bookingInfo}>
        <div className={styles.subjectBookingInfo}>{t("send-details-flight")}</div>
        <div className={styles.contentBookingInfo}>
          <div className={styles.goToPaymwnt}>
            <div>
              <span>
                {t("reserve-details-desc")}
                <>
                  {" "}
                  {t("and-to-email")}<b> {email} </b>{t("sent")}.{" "}
                </>
              </span>
            </div>
          </div>
          <div className={styles.contactBookingInto}>
            {t("for-clarity-email")}
            <a href="mailto:support@safaraneh.com"> support@safaraneh.com </a>
            {t("or-phone-number")}
            <a href="tel:+982126150051"> 02126150051 </a>
            {t("call-24hours")}
          </div>
        </div>
      </div>
    </div>
  );
};

ContentBooking.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

ContentBooking.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(ContentBooking);
