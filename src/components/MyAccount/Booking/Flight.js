import React, { useState, useEffect } from "react";
import {connect} from 'react-redux';
import PropTypes from "prop-types";

import { Link, i18n, withTranslation, Router } from "../../../../i18n";
import {useRouter} from 'next/router';
import { Collapse, Row, Col, Modal, notification } from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";
import moment from "moment-jalaali";
import ReserveStatus from '../../UI/ReserveStatus/ReserveStatus'
import styles from "../../../styles/Home.module.css";
import {
  BedBookIcon,
  UserIcon,
  LockSuccessIcon,
  LocationIcon,
  DirectionIcon,
  PhoneIcon,
  EmailIcon,
  CheckIcon,
  BedIcon,
  UserOutlineIcon,
  PhoneGrayIcon,
  WhatsappGrayIcon,
  EmailGrayIcon,
  FlightIcon,
  FlightDepartureIcon,
  ArrowLeftIcon,
  FlightReturnIcon,
  BookingTicketIcon
} from "../../UI/Icons";
import AsideMyAccount from "../AsideMyAccount";
import FlightDetail from '../../Payment/FlightDetail'
import { RightOutlined, StarFilled } from "@ant-design/icons";
// import ViewCancelationPolicy from '../../components/Booking/ViewCancelationPolicy'
import AnimatedShowMore from "react-animated-show-more";
import { LoadingOutlined } from "@ant-design/icons";

import { getReserve, GetVoucherPdf } from "../../../actions";

moment.loadPersian({ dialect: "persian-modern" });
const { Panel } = Collapse;
const openNotification = (type, placement, msg) => {
  notification[type]({
    message: msg,
    description: "",
    placement,
    style: {
      color: "#fff",
      background: "rgba(0,0,0,0.8)",
    },
  });
};

const Flight = (props) => {

  const [value, setValue] = useState("");
  const [loading, setLading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [modalReserveId, setModalReserveId] = useState(false);
  const [flights, setFlights] = useState([]);
  const [price, setPrice] = useState("");
  // const [vacherUrl, setVacherUrl] = useState('');
  const router = useRouter();
  const [sessionStorageTelNumber,setSessionStorageTelNumber] = useState();
  const [sessionStorageEmail,setSessionStorageEmail] = useState();
  const [sessionStorageWhatsapp,setSessionStorageWhatsapp] = useState();
  const [voucherStatus,setVoucherStatus] = useState("pending");

  const reserveId = router.query.reserveId;
  const username = router.query.username;

  useEffect(() => {
    setSessionStorageTelNumber(window.sessionStorage.getItem("whiteLabelTelNumber"));
    setSessionStorageEmail(window.sessionStorage.getItem("whiteLabelEmail"));
    setSessionStorageWhatsapp(window.sessionStorage.getItem("whiteLabelWhatsapp"));

    let hostName = window.location.hostname.split('.');
    hostName = hostName[1]
    // const vacherUrl =`http://voucher.safaraneh.com/${i18n.language}/${hostName}/Reserve/flightdomestic/voucher?reserveId=${reserveId}&username=${username}`
    // setVacherUrl(vacherUrl);

    const getData = async () => {
      const res = await getReserve(reserveId, username);
      if (res.status == 200) {
        const data = res.data.result;
        setFlights(res.data.result);
        setPrice(
          data.adultTotalPrice + data.childTotalPrice + data.infantTotalPrice
        );
        setLading(false);
      } else {
        openNotification("error", "bottomRight", res.data.error.message);
        setLading(false);
      }
    };

    getData();
  }, []);

  const goBooksPage = () =>{
    if(props.auth && props.auth.isAuthenticated){
      Router.push('/myaccount/booking')
    }else{
      Router.push('/signin')
    }
  }

  const numberWithCommas = (x) =>{
    if (x){
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }else{
        return "0";
    }
}

  const { t } = props;
  const getPortalValue = (dataArray, keyword) => {
    const itemIndex = dataArray.findIndex((item) => item.Keyword === keyword);
      if (itemIndex !== -1 && dataArray[itemIndex]) {
        return dataArray[itemIndex];
      } else {
        return null;
      }
  }

  let telNumber,
  whatsapp,
  email;

    if( props.portalInfo){
        telNumber=getPortalValue(props.portalInfo.Phrases,"TelNumber") && getPortalValue(props.portalInfo.Phrases,"TelNumber")['Value'];  
        whatsapp=getPortalValue(props.portalInfo.Phrases,"whatsapp") && getPortalValue(props.portalInfo.Phrases,"whatsapp")['Value'];
        email=getPortalValue(props.portalInfo.Phrases,"Email") && getPortalValue(props.portalInfo.Phrases,"Email")['Value']; 
    }

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

  return (
    <>
      <Row>
        <Col xs={24} sm={24} md={24} lg={7} xl={8}>
          <div className={styles.asideMobile}>
            <AsideMyAccount />
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={17} xl={16}>
          {!loading ? (
            <div className={styles.managePage}>
              <div className={styles.detailBook}>
                <div className={styles.headDetailBook}>
                  <div className={styles.headBookMore}>
                    {/* <Link as="/myaccount/booking" href="/myaccount/booking"> */}
                      <a className={styles.backBooking} onClick={()=>goBooksPage()}>
                        <RightOutlined />
                        {t("return-reserv-list")}
                      </a>
                    {/* </Link> */}
                    <div className={styles.cityNameBookingFlight}>
                      <span className={styles.city}>
                        {flights.departureFlight.departureAirport.city.name}
                      </span>
                      <div className={styles.midIcon}>
                        <div className={styles.hrDotRight}></div>
                        <FlightIcon />
                        <div className={styles.hrDotLeft}></div>
                      </div>
                      <span className={styles.city}>
                        {flights.departureFlight.arrivalAirport.city.name}
                      </span>
                      <div className={styles.text}>
                        {flights.returnFlight ? t("two-way") : t("one-way")}
                      </div>
                    </div>
                    <div className={styles.iconBooking}>
                      <span className={styles.airlineImage}>
                          {flights.departureFlight.airline?
                        <img
                          src={flights.departureFlight.airline.picture.path}
                          alt={
                            flights.departureFlight.airline.picture.altAttribute
                          }
                        />:''}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`${styles.imageBooking} ${styles.imageBookingFlight}`}
                  >
                    <img src="/images/flight-cabin.jpg" />
                  </div>
                </div>
                <div className={styles.contentDetailBook}>

                  {/* <button 
                       className={styles.btnModalReserveId}
                        onClick={() => this.setModalReserveId(true)}
                      >مدیریت رزرو</button> */}
                  {/* <Modal
                      open={this.state.modalReserveId}
                      onOk={() => this.setModalReserveId(false)}
                      onCancel={() => this.setModalReserveId(false)}
                      footer={null}
                      >
                      <div className={styles.modalReserveId}>
                          <div className={styles.subjectModal}>آیا باید رزرو خود را به روز کنید یا لغو کنید؟</div>
                          <div className={styles.descriptionModal}>تیم پشتیبانی مشتری ما آماده کمک به شما است.</div>

                          <div className={styles.reserveIdCopy}>
                              <div className={styles.content}>
                                  <div className={styles.contentIdCopy}>
                                      <span>کد پیگیری</span>
                                      <div className={styles.copyCode}>
                                          <span>۵۸۳۴۶۴۴</span>
                                          <CopyToClipboard
                                              text="۵۸۳۴۶۴۴"
                                              onCopy={() => this.setState({copied: true})}>
                                              { 
                                                  this.state.copied ?
                                                      <span className={styles.successCopyCode}><CheckIcon/> کپی شد</span> :
                                                      <span className={styles.spanCopyCode}>کپی کن</span>
                                              }
                                          </CopyToClipboard>
                                      </div>
                                      <span>هنگام صحبت با پشتیبانی از این کد استفاده کنید</span>
                                  </div>
                              </div>
                          </div>

                          <div className={styles.helpBook}>
                              <Row>
                                  <Col span={12}>
                                      <div className={styles.contactHelpBook}>
                                          <PhoneGrayIcon/>
                                          <div>
                                              <div className={styles.textContact}>با ما تماس بگیرید</div>
                                              <a href="#">+123456789</a>
                                          </div>
                                      </div>
                                  </Col>
                                  <Col span={12}>
                                      <div className={styles.contactHelpBook}>
                                          <WhatsappGrayIcon/>
                                          <div>
                                              <div className={styles.textContact}>ارسال پیام در واتس آپ</div>
                                              <a href="#">+123 456789</a>
                                          </div>
                                      </div>
                                  </Col>
                                  <Col span={12}>
                                      <div className={styles.contactHelpBook}>
                                          <EmailGrayIcon/>
                                          <div>
                                              <div className={styles.textContact}>ایمیل</div>
                                              <a href="#">support@domain.com</a>
                                          </div>
                                      </div>
                                  </Col>
                              </Row>
                          </div>
                      </div>
                  </Modal> */}

                  <h1>
                    {flights.departureFlight.departureAirport.city.name} به{" "}
                    {flights.departureFlight.arrivalAirport.city.name}
                  </h1>
                  <div className={styles.dateDetailBook}>
                    {/* <span>۱</span>
                    <UserIcon /> */}
                    <span>{moment(flights.departureFlight.departureTime).format('jDD jMMMM jYYYY')}</span>
                  </div>
                  <div className={styles.statusPayment}>
                    {/* <span className={styles.bgStatusPayment}>
                                            <span className={styles.dot}></span>
                                            <span className={styles.typeText}>در انتظار پرداخت</span>
                                        </span> */}
                    {/* <span
                      className={`${styles.bgStatusPayment} ${styles.success}`}
                    >
                      <span className={styles.typeText}>{getStatus(flights.status)}</span>
                    </span> */}
                    <ReserveStatus className={styles.statusPayment} status={flights.status}/>

                  </div>
                  {flights.status === "Pending"?
                  <Link as={`/payment?username=${username}&reserveId=${reserveId}`}
                   href={`/payment?username=${username}&reserveId=${reserveId}`}>
                    <a className={styles.goBooking}>
                      <button className={styles.btnGoBooking}>
                        <LockSuccessIcon />
                        <span>{t("pay-rial",{number: numberWithCommas(price)})}</span>
                      </button>
                    </a>
                  </Link>
                  :flights.status === "Issued"?
                    <div className={styles.downloadVoucher}>
                      <a onClick={handleClick} disabled={voucherStatus === "pending" ? null : "disabled"}>
                        {voucherStatus === "pending" ?
                          <><BookingTicketIcon/>{t("recieve-voucher")}</> :
                          <><LoadingOutlined spin /> {t("loading-recieve-voucher")}</>}
                      </a>
                    </div>
                    // <a target="_blank" href={vacherUrl} className={styles.goBooking}>
                    //   <button className={styles.btnGoBooking}>
                    //     <span>{t("view-voucher")}</span>
                    //   </button>
                    // </a>
                    : null
                  } 
                  <div className={styles.reserveIdCopy}>
                    <div className={styles.content}>
                      <div className={styles.contentIdCopy}>
                        <span>{t("tracking-code")}</span>
                        <div className={styles.copyCode}>
                          <span>{flights.id}</span>
                          <CopyToClipboard
                            text={flights.id}
                            onCopy={() => setCopied(true)}
                          >
                            {copied ? (
                              <span className={styles.successCopyCode}>
                                <CheckIcon /> {t("copied")}
                              </span>
                            ) : (
                              <span className={styles.spanCopyCode}>
                                {t("copy")}
                              </span>
                            )}
                          </CopyToClipboard>
                        </div>
                        <span>
                          {t("use-this-code")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.infoFlightBook}>
                <div className={styles.subject}>{t("flight-details")}</div>

                {flights ?<FlightDetail flights={flights} />:''}

              </div>

              
                <div className={styles.infoTraveller}>
                  <div className={styles.subject}>{t("passenger-info")}</div>
                  
                    <div className={styles.treveller}>
                      <span>{t("full-name")}</span>
                      {flights.passengers.map((passenger)=> 
                      <>
                      {passenger.persianFirstName ? <div className={styles.name}>{passenger.persianFirstName} {passenger.persianLastName}</div>:''}
                      {!passenger.persianFirstName ?<div className={styles.name}>{passenger.firstName} {passenger.lastName}</div>:''}
                      </>
                      )}
                    </div>
                  
                </div> 
              

              <div className={styles.infoPrice}>
                <div className={styles.subject}>{t("price-details")}</div>
                <div className={styles.content}>
                {flights.adultCount ? (
                  <div className={styles.rowPrice}>
                    <span>{t("adult")} {flights.adultCount} {t("individual")}</span>
                    <span>{numberWithCommas(flights.adultTotalPrice)} {t('rial')}</span>
                  </div>
                ) : (
                  ""
                )}
                {flights.childCount ? (
                  <div className={styles.rowPrice}>
                    <span>{t('child')} {flights.childCount} {t("individual")}</span>
                    <span>{numberWithCommas(flights.childTotalPrice)} {t('rial')}</span>
                  </div>
                ) : (
                  ""
                )}
                {flights.infantCount ? (
                  <div className={styles.rowPrice}>
                    <span>{t('infant')} {flights.infantCount} {t("individual")}</span>
                    <span>{numberWithCommas(flights.infantTotalPrice)} {t('rial')}</span>
                  </div>
                ) : (
                  ""
                )}
                <div className={styles.rowPriceResult}>
                  <span>{t('total')}</span>
                  <span>{numberWithCommas(price)} {t('rial')}</span>
                </div>
                </div>
              </div>

              <div className={styles.lookingHotel}>
                <div className={styles.detail}>
                  <img src="data:image/svg+xml;base64,PHN2ZyBpZD0iaWNvbiIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB3aWR0aD0iNTEyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im05Ni4xODUgMzMuMDM0aDIxLjY1MnY4OC40MzJoLTIxLjY1MnoiIGZpbGw9IiNjMWNkZDMiLz48cGF0aCBkPSJtMTE3LjgzNyAxMjIuNDY1aC0yMS42NTFhMSAxIDAgMCAxIC0xLTF2LTg4LjQzMWExIDEgMCAwIDEgMS0xaDIxLjY1MWExIDEgMCAwIDEgMSAxdjg4LjQzMmExIDEgMCAwIDEgLTEgLjk5OXptLTIwLjY1MS0yaDE5LjY1MXYtODYuNDMxaC0xOS42NTF6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTEwLjE2MyAzMy4wMzRoMjEuNjUydjg4LjQzMmgtMjEuNjUyeiIgZmlsbD0iI2MxY2RkMyIvPjxwYXRoIGQ9Im0zMS44MTQgMTIyLjQ2NWgtMjEuNjUxYTEgMSAwIDAgMSAtMS0xdi04OC40MzFhMSAxIDAgMCAxIDEtMWgyMS42NTFhMSAxIDAgMCAxIDEgMXY4OC40MzJhMSAxIDAgMCAxIC0xIC45OTl6bS0yMC42NTEtMmgxOS42NTF2LTg2LjQzMWgtMTkuNjUxeiIgZmlsbD0iIzJmM2E1YSIvPjxwYXRoIGQ9Im0yOC40OTMgNi41MzVoNzEuMDE0djExNC45MzFoLTcxLjAxNHoiIGZpbGw9IiNkOWUyZTkiLz48cGF0aCBkPSJtOTkuNTA3IDEyMi40NjVoLTcxLjAxNGExIDEgMCAwIDEgLTEtMXYtMTE0LjkzYTEgMSAwIDAgMSAxLTFoNzEuMDE0YTEgMSAwIDAgMSAxIDF2MTE0LjkzYTEgMSAwIDAgMSAtMSAxem0tNzAuMDE0LTJoNjkuMDE0di0xMTIuOTNoLTY5LjAxNHoiIGZpbGw9IiMyZjNhNWEiLz48cGF0aCBkPSJtMzguNjU0IDE1LjU2M2gxMS4wNDR2MTEuMDQ0aC0xMS4wNDR6IiBmaWxsPSIjYjlkZGZjIi8+PHBhdGggZD0ibTQ5LjcgMjcuNjA3aC0xMS4wNDZhMSAxIDAgMCAxIC0xLTF2LTExLjA0NGExIDEgMCAwIDEgMS0xaDExLjA0NmExIDEgMCAwIDEgMSAxdjExLjA0NGExIDEgMCAwIDEgLTEgMXptLTEwLjA0NC0yaDkuMDQ0di05LjA0NGgtOS4wNDZ6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTU4LjQ3OCAxNS41NjNoMTEuMDQ0djExLjA0NGgtMTEuMDQ0eiIgZmlsbD0iI2I5ZGRmYyIvPjxwYXRoIGQ9Im02OS41MjIgMjcuNjA3aC0xMS4wNDRhMSAxIDAgMCAxIC0xLTF2LTExLjA0NGExIDEgMCAwIDEgMS0xaDExLjA0NGExIDEgMCAwIDEgMSAxdjExLjA0NGExIDEgMCAwIDEgLTEgMXptLTEwLjA0NS0yaDkuMDQ1di05LjA0NGgtOS4wNDR6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTc4LjMwMiAxNS41NjNoMTEuMDQ0djExLjA0NGgtMTEuMDQ0eiIgZmlsbD0iI2I5ZGRmYyIvPjxwYXRoIGQ9Im04OS4zNDYgMjcuNjA3aC0xMS4wNDZhMSAxIDAgMCAxIC0xLTF2LTExLjA0NGExIDEgMCAwIDEgMS0xaDExLjA0NmExIDEgMCAwIDEgMSAxdjExLjA0NGExIDEgMCAwIDEgLTEgMXptLTEwLjA0NC0yaDkuMDQ0di05LjA0NGgtOS4wNDZ6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTM4LjY1NCAzMy44M2gxMS4wNDR2MTEuMDQ0aC0xMS4wNDR6IiBmaWxsPSIjYjlkZGZjIi8+PHBhdGggZD0ibTQ5LjcgNDUuODc0aC0xMS4wNDZhMSAxIDAgMCAxIC0xLTF2LTExLjA0NGExIDEgMCAwIDEgMS0xaDExLjA0NmExIDEgMCAwIDEgMSAxdjExLjA0NGExIDEgMCAwIDEgLTEgMXptLTEwLjA0NC0yaDkuMDQ0di05LjA0NGgtOS4wNDZ6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTU4LjQ3OCAzMy44M2gxMS4wNDR2MTEuMDQ0aC0xMS4wNDR6IiBmaWxsPSIjYjlkZGZjIi8+PHBhdGggZD0ibTY5LjUyMiA0NS44NzRoLTExLjA0NGExIDEgMCAwIDEgLTEtMXYtMTEuMDQ0YTEgMSAwIDAgMSAxLTFoMTEuMDQ0YTEgMSAwIDAgMSAxIDF2MTEuMDQ0YTEgMSAwIDAgMSAtMSAxem0tMTAuMDQ1LTJoOS4wNDV2LTkuMDQ0aC05LjA0NHoiIGZpbGw9IiMyZjNhNWEiLz48cGF0aCBkPSJtNzguMzAyIDMzLjgzaDExLjA0NHYxMS4wNDRoLTExLjA0NHoiIGZpbGw9IiNiOWRkZmMiLz48cGF0aCBkPSJtODkuMzQ2IDQ1Ljg3NGgtMTEuMDQ2YTEgMSAwIDAgMSAtMS0xdi0xMS4wNDRhMSAxIDAgMCAxIDEtMWgxMS4wNDZhMSAxIDAgMCAxIDEgMXYxMS4wNDRhMSAxIDAgMCAxIC0xIDF6bS0xMC4wNDQtMmg5LjA0NHYtOS4wNDRoLTkuMDQ2eiIgZmlsbD0iIzJmM2E1YSIvPjxwYXRoIGQ9Im0zOC42NTQgNTIuMDk2aDExLjA0NHYxMS4wNDRoLTExLjA0NHoiIGZpbGw9IiNiOWRkZmMiLz48cGF0aCBkPSJtNDkuNyA2NC4xNGgtMTEuMDQ2YTEgMSAwIDAgMSAtMS0xdi0xMS4wNGExIDEgMCAwIDEgMS0xaDExLjA0NmExIDEgMCAwIDEgMSAxdjExLjA0YTEgMSAwIDAgMSAtMSAxem0tMTAuMDQ0LTJoOS4wNDR2LTkuMDRoLTkuMDQ2eiIgZmlsbD0iIzJmM2E1YSIvPjxwYXRoIGQ9Im01OC40NzggNTIuMDk2aDExLjA0NHYxMS4wNDRoLTExLjA0NHoiIGZpbGw9IiNiOWRkZmMiLz48cGF0aCBkPSJtNjkuNTIyIDY0LjE0aC0xMS4wNDRhMSAxIDAgMCAxIC0xLTF2LTExLjA0YTEgMSAwIDAgMSAxLTFoMTEuMDQ0YTEgMSAwIDAgMSAxIDF2MTEuMDRhMSAxIDAgMCAxIC0xIDF6bS0xMC4wNDUtMmg5LjA0NXYtOS4wNGgtOS4wNDR6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTc4LjMwMiA1Mi4wOTZoMTEuMDQ0djExLjA0NGgtMTEuMDQ0eiIgZmlsbD0iI2I5ZGRmYyIvPjxwYXRoIGQ9Im04OS4zNDYgNjQuMTRoLTExLjA0NmExIDEgMCAwIDEgLTEtMXYtMTEuMDRhMSAxIDAgMCAxIDEtMWgxMS4wNDZhMSAxIDAgMCAxIDEgMXYxMS4wNGExIDEgMCAwIDEgLTEgMXptLTEwLjA0NC0yaDkuMDQ0di05LjA0aC05LjA0NnoiIGZpbGw9IiMyZjNhNWEiLz48cGF0aCBkPSJtMzguNjU0IDcwLjM2M2gxMS4wNDR2MTEuMDQ0aC0xMS4wNDR6IiBmaWxsPSIjYjlkZGZjIi8+PHBhdGggZD0ibTQ5LjcgODIuNDA3aC0xMS4wNDZhMSAxIDAgMCAxIC0xLTF2LTExLjA0NGExIDEgMCAwIDEgMS0xaDExLjA0NmExIDEgMCAwIDEgMSAxdjExLjA0NGExIDEgMCAwIDEgLTEgMXptLTEwLjA0NC0yaDkuMDQ0di05LjA0NGgtOS4wNDZ6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTU4LjQ3OCA3MC4zNjNoMTEuMDQ0djExLjA0NGgtMTEuMDQ0eiIgZmlsbD0iI2I5ZGRmYyIvPjxwYXRoIGQ9Im02OS41MjIgODIuNDA3aC0xMS4wNDRhMSAxIDAgMCAxIC0xLTF2LTExLjA0NGExIDEgMCAwIDEgMS0xaDExLjA0NGExIDEgMCAwIDEgMSAxdjExLjA0NGExIDEgMCAwIDEgLTEgMXptLTEwLjA0NS0yaDkuMDQ1di05LjA0NGgtOS4wNDR6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTc4LjMwMiA3MC4zNjNoMTEuMDQ0djExLjA0NGgtMTEuMDQ0eiIgZmlsbD0iI2I5ZGRmYyIvPjxwYXRoIGQ9Im04OS4zNDYgODIuNDA3aC0xMS4wNDZhMSAxIDAgMCAxIC0xLTF2LTExLjA0NGExIDEgMCAwIDEgMS0xaDExLjA0NmExIDEgMCAwIDEgMSAxdjExLjA0NGExIDEgMCAwIDEgLTEgMXptLTEwLjA0NC0yaDkuMDQ0di05LjA0NGgtOS4wNDZ6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTUzLjEgOTYuMDdoMjEuOHYyNS4zOTVoLTIxLjh6IiBmaWxsPSIjOTI5N2FiIi8+PHBhdGggZD0ibTc0LjkgMTIyLjQ2NWgtMjEuOGExIDEgMCAwIDEgLTEtMXYtMjUuMzk1YTEgMSAwIDAgMSAxLTFoMjEuOGExIDEgMCAwIDEgMSAxdjI1LjRhMSAxIDAgMCAxIC0xIC45OTV6bS0yMC44LTJoMTkuOHYtMjMuMzk1aC0xOS44eiIgZmlsbD0iIzJmM2E1YSIvPjxnIGZpbGw9IiM4NDg3OWMiPjxwYXRoIGQ9Im0xMDUuNzA0IDQzLjE0Nmg0LjQ2NHY0LjQ2NGgtNC40NjR6Ii8+PHBhdGggZD0ibTEwNS43MDQgNTUuODk1aDQuNDY0djQuNDY0aC00LjQ2NHoiLz48cGF0aCBkPSJtMTA1LjcwNCA2OC42NDNoNC40NjR2NC40NjRoLTQuNDY0eiIvPjxwYXRoIGQ9Im0xMDUuNzA0IDgxLjM5Mmg0LjQ2NHY0LjQ2NGgtNC40NjR6Ii8+PHBhdGggZD0ibTEwNS43MDQgOTQuMTRoNC40NjR2NC40NjRoLTQuNDY0eiIvPjxwYXRoIGQ9Im0xMDUuNzA0IDEwNi44ODloNC40NjR2NC40NjRoLTQuNDY0eiIvPjxwYXRoIGQ9Im0xNi41MjUgNDMuMTQ2aDQuNDY0djQuNDY0aC00LjQ2NHoiLz48cGF0aCBkPSJtMTYuNTI1IDU1Ljg5NWg0LjQ2NHY0LjQ2NGgtNC40NjR6Ii8+PHBhdGggZD0ibTE2LjUyNSA2OC42NDNoNC40NjR2NC40NjRoLTQuNDY0eiIvPjxwYXRoIGQ9Im0xNi41MjUgODEuMzkyaDQuNDY0djQuNDY0aC00LjQ2NHoiLz48cGF0aCBkPSJtMTYuNTI1IDk0LjE0aDQuNDY0djQuNDY0aC00LjQ2NHoiLz48cGF0aCBkPSJtMTYuNTI1IDEwNi44ODloNC40NjR2NC40NjRoLTQuNDY0eiIvPjwvZz48cGF0aCBkPSJtMTI3IDEyMi40NjVoLTEyNmExIDEgMCAwIDEgMC0yaDEyNmExIDEgMCAwIDEgMCAyeiIgZmlsbD0iIzJmM2E1YSIvPjwvc3ZnPg==" />
                  <div className={styles.text}>
                    <h4>{t("search-hotel-in")}{flights.departureFlight.arrivalAirport.city.name}</h4>
                    <span>{t("finding-best-hotels")}</span>
                  </div>
                </div>
                <div className={styles.btnLink}>
                  <Link as="/" href="/">
                    <button>{t("search-hotel")}</button>
                  </Link>
                </div>
              </div>

              {/* <div className={styles.feesExtrasBook}>
                                <div className={styles.cardTitle}>هزینه و موارد اضافی</div>
                                <div className={styles.feesExtras}>
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
                            </div> */}

              {/* <div className={styles.checkInstructionsBook}>
                                <div className={styles.cardTitle}>بررسی دستورالعمل ها</div>
                                <div className={styles.checkInstructions}>
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
                                </div>
                            </div> */}

              <div className={styles.needHelpBook}>
                <div className={styles.subjectHelpBook}>{t("need-help")}</div>
                <div className={styles.descriptionHelpBook}>
                  {t("24hours-backup")}
                </div>
                <div className={styles.helpBook}>
                    <div className={styles.contactHelpBook}>
                        <PhoneGrayIcon/>
                        <div>
                            <div className={styles.textContact}>{t("contact-us")}</div>
                            <a href={`tel:${telNumber?telNumber:sessionStorageTelNumber}`}>{telNumber?telNumber:sessionStorageTelNumber}</a>
                        </div>
                    </div>
                    {(sessionStorageWhatsapp || whatsapp) && 
                        <div className={styles.contactHelpBook}>
                            <WhatsappGrayIcon/>
                            <div>
                                <div className={styles.textContact}>{t("whatsapp")}</div>
                                <a href={`https://api.whatsapp.com/send?phone=${whatsapp?whatsapp:sessionStorageWhatsapp}`}>
                                    <span dir="ltr">{whatsapp?whatsapp:sessionStorageWhatsapp}</span>
                                </a>                                        
                            </div>
                        </div>
                    }
                    <div className={styles.contactHelpBook}>
                        <EmailGrayIcon/>
                        <div>
                            <div className={styles.textContact}>{t('email')}</div>
                            <a href={`mailto:${email?email:sessionStorageEmail}`}>{email?email:sessionStorageEmail}</a>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          ) : (
            <LoadingOutlined />
          )}
        </Col>
      </Row>
    </>
  );
};

Flight.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

Flight.propTypes = {
  t: PropTypes.func.isRequired,
};

// const mapStateToProp = (state) => {
//   return {
//       portalInfo: state.portal.portalData,
//   };
// };

// export default withTranslation("common")(connect(mapStateToProp)(Flight))

function mapStateToProps(state) {
  return {
      auth: state.auth
  }
}
export default (withTranslation('common'))(connect(mapStateToProps, null)(Flight))
