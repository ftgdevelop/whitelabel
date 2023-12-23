import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, i18n, withTranslation } from "../../../../i18n";
import { Typography } from "antd";
import AsidePaymentFlightForeign from "../../Payment/AsidePaymentFlightForeign";
import { useRouter } from "next/router";

import styles from "../../../styles/Home.module.css";
import {
  CheckIcon,
  CheckCircleIcon,
  UserIcon,
  ErrorIcon,
  BookingTicketIcon,
  WarningIcon,
} from "../../UI/Icons";
import { LoadingOutlined } from "@ant-design/icons";
import { connect } from "react-redux";

const ContentBooking = (props) => {
  const [voucherStatus, setVoucherStatus] = useState("pending");

  const { t } = props;
  const router = useRouter();
  let name = "";
  let email =
    props.flights && props.flights.reserver ? props.flights.reserver.email : "";

  if (props.flights && props.flights.reserver) {
    name =
      props.flights.reserver.firstName + " " + props.flights.reserver.lastName;
  } else {
    name = t("dear-user");
  }

  const handleClick = async () => {
    props.GetVoucherPdf(router.query.reserveId, router.query.username);
  };

  useEffect(() => {
    setVoucherStatus("loading");
    if (props.vocherData) {
      setVoucherStatus("success");
      let url = `https://flight.safaraneh.com/File/DownloadTempFile?filename=${props.vocherData.fileName}.pdf&fileType=${props.vocherData.fileType}&fileToken=${props.vocherData.fileToken}`;
      let a = document.createElement("a");
      a.href = url;
      a.click();
    } else {
      setVoucherStatus("error");
    }
    setVoucherStatus("pending");
  }, [props.vocherData]);

  let safaranehEmailAddress = "support@safaraneh.com";
  let safaranehPhoneNumber = "02126150051"
  let safaranehPhoneLink = "+982126150051";

  let portalEmailAddress;
  let portalPhoneNumber;
  let portalPhoneLink;
  
  if(props.portalInfo?.Phrases){
      portalEmailAddress = props.portalInfo.Phrases.find(item=> item.Keyword === "Email")?.Value;
      portalPhoneNumber = props.portalInfo.Phrases.find(item=> item.Keyword === "TelNumber")?.Value;

      if (portalPhoneNumber && portalPhoneNumber[0] === "0"){
          portalPhoneLink = portalPhoneNumber.substring(1);
          portalPhoneLink = "+98" + portalPhoneLink;
      }
  }


  const { Text } = Typography;
  return (
    <div className={styles.contentBooking}>
      {props.loading ? (
        <div className={styles.statusMyBooking}>
          <div className={styles.progressMyBooking}>
            <div
              className={styles.progress}
              // style={{ width: `${loading}%` }}
            ></div>
            <span>{t("reserve-checking")}</span>
          </div>
          <div className={styles.contentMyBooking}>
            <div className={styles.proccessBooking}>
              <h4>
                {t("hello")} {name}{" "}
              </h4>
              <span>{t("wait-second")}</span>
              <span>{t("email-voucher")}</span>
            </div>
          </div>
        </div>
      ) : null}
      {!props.loading && props.flights ? (
        <>
          {props.flights.reserver.status === "Issued" ? (
            <div className={styles.statusMyBooking}>
              <div className={styles.successMyBooking}>
                <div>
                  <CheckIcon />
                  <span className={styles.textSuccessMyBooking}>
                    {t("congratulation-reserve-success")}
                  </span>
                </div>
                <div>
                  <span className={styles.reserveIdSuccessBooking}>
                    {" "}
                    {t("tracking-code")}{" "}
                  </span>
                  {/* <span> {progress? <LoadingOutlined style={{marginRight:'20px'}}/> : data.id} </span> */}
                </div>
              </div>
              <div className={styles.contentMyBooking}>
                <div className={styles.successBooking}>
                  <CheckCircleIcon />
                  <h4> سلام {name} </h4>
                  <span>{t("reserve-success")}</span>
                  <span>
                    {t("email-with-link2")}
                    <b> {email} </b>
                    {t("sent")}
                    {t("for-tracking-with-us")}
                    <b> {t("tracking-code")} : 234567 </b>
                    {t("use")}
                  </span>
                </div>
              </div>
            </div>
          ) : (
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
                    درخواست رزرو شما در حال بررسی توسط تیم پشتیبانی می باشد، جهت
                    مشاهده وضعیت سفارش خود به بخش پیگیری رزرو مراجعه کنید.
                  </span>
                  <small>
                    <WarningIcon />
                    لطفا قبل از مشخص شدن وضعیت سفارش خود از خرید مجدد خودداری
                    فرمایید.
                  </small>
                  <div className={styles.reserveIdContent}>
                    <span className={styles.reserveIdErrorBooking}>
                      {" "}
                      {t("tracking-code")} :{" "}
                    </span>
                    {/* <span> {progress? <LoadingOutlined style={{marginRight:'20px'}}/> : data.id} </span> */}
                  </div>
                  <div className={styles.contactSupport}>
                    برای تماس با پشتیبانی با شماره
                    <a href="tel:+982126150051"> 02126150051 </a>
                    تماس بگیرید.
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : null}

      {props.flights &&
      props.flights.reserver &&
      props.flights.reserver.status === "Issued" ? (
        <div className={styles.downloadVoucher}>
          <a
            onClick={handleClick}
            disabled={voucherStatus === "pending" ? null : "disabled"}
          >
            {voucherStatus === "pending" ? (
              <>
                <BookingTicketIcon />
                {t("recieve-voucher")}
              </>
            ) : (
              <>
                <LoadingOutlined spin /> {t("loading-recieve-voucher")}
              </>
            )}
          </a>
        </div>
      ) : null}

      <div className={styles.roomInfoMybooking}>
        <div className={styles.subjectRoomInfoMybooking}>
          <div>
            <div className={styles.textRoomInfoMybooking}>
              {t("flight-details")}
            </div>
          </div>
          <div>
            <div className={styles.confirmationNoInfoBooking}>
              <span> {t("tracking-code")} : </span>
              {/* {progress ? <LoadingOutlined style={{ marginRight: '20px' }} /> : */}
              <span>
                {" "}
                {!props.loading && props.flights ? (
                  props.flights.id
                ) : (
                  <LoadingOutlined style={{ marginRight: "20px" }} />
                )}{" "}
              </span>
              {/* } */}
            </div>
          </div>
        </div>
        <div className={styles.contentRoomInfoMyBooking}>
          <div className={styles.myRoomInfomation}>
            <div className={styles.headMyRoomInformation}>
              <UserIcon />
              {t("reserver")} : {name}
            </div>
            <div className={styles.contentMyRoomInformation}>
              {props.flights ? (
                <AsidePaymentFlightForeign
                  price={
                    props.flights.reserver.adultTotalPrice +
                    props.flights.reserver.childTotalPrice +
                    props.flights.reserver.infantTotalPrice
                  }
                  // flights={flights}
                  // hiddenTitle={true}
                  // hiddenOffPrice={true}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bookingInfo}>
        <div className={styles.subjectBookingInfo}>
          {t("send-details-flight")}
        </div>
        <div className={styles.contentBookingInfo}>
          <div className={styles.goToPaymwnt}>
            <div>
              <span>
                {t("reserve-details-desc")}
                <>
                  {" "}
                  {t("and-to-email")}
                  <b> {email} </b>
                  {t("sent")}.{" "}
                </>
              </span>
            </div>
          </div>
          <div className={styles.contactBookingInto}>
            {t("for-clarity-email")}
              <a href={`mailto:${portalEmailAddress || safaranehEmailAddress}`}> {portalEmailAddress || safaranehEmailAddress} </a>
              {t('or-phone-number')}
              <a href={`tel:${portalPhoneLink || safaranehPhoneLink}`}> {portalPhoneNumber || safaranehPhoneNumber} </a>
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

function mapStateToProps(state) {
  return {
      portalInfo: state.portal.portalData
  }
}

export default withTranslation("common")(connect(mapStateToProps)(ContentBooking));
