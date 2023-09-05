import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useRouter } from "next/router";

import { Link, i18n, withTranslation, Router } from "../../../../i18n";
import { Collapse, Row, Col, notification, Tabs } from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { GetReserve, GetVoucherPdf } from "../../../actions/flight/Flight";
import ReserveStatus from "../../UI/ReserveStatus/ReserveStatus";
import TimeString from "../../UI/TimeString/TimeString";
import Time from "../../UI/Time/Time";
import DatePersion from "../../UI/DatePersion/DatePersion";
import PriceFormat from "../../UI/PriceFormat/PriceFormat";
import moment from "moment-jalaali";
import styles from "../../../styles/Home.module.css";
import {
  LockSuccessIcon,
  CheckIcon,
  PhoneGrayIcon,
  WhatsappGrayIcon,
  EmailGrayIcon,
  FlightIcon,
  BookingTicketIcon,
  UserIcon,
  ArrowLeftIcon,
  FlightDepartureIcon,
  FlightReturnIcon,
  VerticalBaggageIcon,
  HorizontalBaggageIcon,
} from "../../UI/Icons";
import AsideMyAccount from "../AsideMyAccount";
import { LoadingOutlined, RightOutlined, StarFilled } from "@ant-design/icons";

moment.loadPersian({ dialect: "persian-modern" });
const { TabPane } = Tabs;
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

const FlightForeign = (props) => {
  const { t } = props;
  const router = useRouter();
  const reserveId = router.query.reserveId;
  const username = router.query.username;
  const [voucherStatus, setVoucherStatus] = useState("pending");

  useEffect(() => {
    props.GetReserve(reserveId, username);
  }, []);

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

  return (
    <>
      <Row>
        <Col xs={24} sm={24} md={24} lg={7} xl={8}>
          <div className={styles.asideMobile}>
            <AsideMyAccount />
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={17} xl={16}>
          {!props.loading && props.data.segment ? (
            <div className={styles.managePage}>
              <div className={styles.detailBook}>
                <div className={styles.headDetailBook}>
                  <div className={styles.headBookMore}>
                    <Link as="/myaccount/booking" href="/myaccount/booking">
                      <a className={styles.backBooking}>
                        <RightOutlined />
                        {t("return-reserv-list")}
                      </a>
                    </Link>
                    <div className={styles.cityNameBookingFlight}>
                      <span className={styles.city}>
                        {
                          props.data.segment.airItinerary
                            .originDestinationOptions[0].flightSegments[0]
                            .departureAirport.cityName
                        }
                      </span>
                      <div className={styles.midIcon}>
                        <div className={styles.hrDotRight}></div>
                        <FlightIcon />
                        <div className={styles.hrDotLeft}></div>
                      </div>
                      <span className={styles.city}>
                        {
                          props.data.segment.airItinerary
                            .originDestinationOptions[0].flightSegments[0]
                            .arrivalAirport.cityName
                        }
                      </span>
                      <div className={styles.text}>
                        {props.data.tripType === "TwoWay" && t("two-way")}
                        {props.data.tripType === "OneWay" && t("one-way")}
                        {props.data.tripType === "severalRoute" &&
                          t("several-routes")}
                      </div>
                    </div>
                    <div className={styles.iconBooking}>
                      <span className={styles.airlineImage}>
                        <img
                          src={
                            props.data.segment.airItinerary
                              .originDestinationOptions[0].flightSegments[0]
                              .marketingAirline.photoUrl
                          }
                          alt={
                            props.data.segment.airItinerary
                              .originDestinationOptions[0].flightSegments[0]
                              .marketingAirline.name
                          }
                        />
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
                  <h1>
                    {
                      props.data.segment.airItinerary
                        .originDestinationOptions[0].flightSegments[0]
                        .departureAirport.cityName
                    }{" "}
                    به{" "}
                    {
                      props.data.segment.airItinerary
                        .originDestinationOptions[0].flightSegments[0]
                        .arrivalAirport.cityName
                    }
                  </h1>
                  <div className={styles.dateDetailBook}>
                    <span>{props.data.passengers.length}</span>
                    <UserIcon />
                    <span>
                      {moment(props.data.departureTime[0]).format(
                        "jD jMMMM  jYYYY "
                      )}
                    </span>
                  </div>
                  <div className={styles.statusPayment}>
                    {/* <span className={styles.bgStatusPayment}>
                        <span className={styles.dot}></span>
                        <span className={styles.typeText}>
                          در انتظار پرداخت
                        </span>
                      </span>

                      <span
                        className={`${styles.bgStatusPayment} ${styles.success}`}
                      >
                        <span className={styles.typeText}>پرداخت</span>
                      </span> */}
                    <ReserveStatus
                      className={styles.statusPayment}
                      status={props.data.status}
                    />
                  </div>
                  {props.data.status === "Pending" ? (
                    <Link
                      as={`/payment?username=${username}&reserveId=${reserveId}`}
                      href={`/payment?username=${username}&reserveId=${reserveId}`}
                    >
                      <a className={styles.goBooking}>
                        <button className={styles.btnGoBooking}>
                          <LockSuccessIcon />
                          <span>{t("pay-rial")} 10.000.000</span>
                        </button>
                      </a>
                    </Link>
                  ) : props.data.status === "Issued" ? (
                    <div className={styles.downloadVoucher}>
                      <a
                        onClick={handleClick}
                        disabled={
                          voucherStatus === "pending" ? null : "disabled"
                        }
                      >
                        <>
                          <BookingTicketIcon />
                          {t("recieve-voucher")}
                        </>
                        {/* <><LoadingOutlined spin /> {t("loading-recieve-voucher")}</> */}
                      </a>
                    </div>
                  ) : null}
                  {/* <a target="_blank" href="" className={styles.goBooking}>
                      <button className={styles.btnGoBooking}>
                        <span>{t("view-voucher")}</span>
                      </button>
                    </a> */}

                  <div className={styles.reserveIdCopy}>
                    <div className={styles.content}>
                      <div className={styles.contentIdCopy}>
                        <span>{t("tracking-code")}</span>
                        <div className={styles.copyCode}>
                          <span>{props.data.id}</span>
                          {/* <CopyToClipboard
                            text="23457"
                            onCopy={() => setCopied(true)}
                          >
                            <span className={styles.successCopyCode}>
                              <CheckIcon /> {t("copied")}
                            </span>
                            <span className={styles.spanCopyCode}>
                              {t("copy")}
                            </span>
                          </CopyToClipboard> */}
                        </div>
                        <span>{t("use-this-code")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {props.data.segment ? (
                <Tabs defaultActiveKey="1" className="ant-tabs-flight-foreign">
                  <TabPane
                    tab="برنامه سفر"
                    key="1"
                    className={styles.tabsFlightForeign}
                  >
                    {props.data.segment.airItinerary.originDestinationOptions.map(
                      (segments, idx) => {
                        const lastIndex = segments.flightSegments.length - 1;
                        return (
                          <div key={idx}>
                            <div className={styles.paxHeader}>
                              <div>
                                <div className={styles.directionFlight}>
                                  <FlightDepartureIcon />
                                </div>
                                <div className={styles.departureDetails}>
                                  {/* {t("arrival-flight-text")} : */}
                                  <b>
                                    {" "}
                                    {
                                      segments.flightSegments[0].arrivalAirport
                                        .cityName
                                    }
                                  </b>
                                  <ArrowLeftIcon />
                                  <b>
                                    {" "}
                                    {
                                      segments.flightSegments[lastIndex]
                                        .departureAirport.cityName
                                    }
                                  </b>
                                </div>
                              </div>
                              <div className={styles.durationTime}>
                                <span>مدت زمان پرواز :</span>
                                <b>
                                  {" "}
                                  <TimeString time={segments.journeyDuration} />
                                </b>
                              </div>
                            </div>
                            <div className={styles.paxContent}>
                              <div className={styles.alertBoxFlight}>
                                <div>
                                  <FlightDepartureIcon />
                                  <b>فرودگاه خروج : </b>
                                  <span>
                                    این سفر به{" "}
                                    <b>
                                      {" "}
                                      {
                                        segments.flightSegments[lastIndex]
                                          .departureAirport.name
                                      }
                                      {", "}
                                    </b>
                                    {
                                      segments.flightSegments[lastIndex]
                                        .departureAirport.cityName
                                    }
                                    ،{" "}
                                    {
                                      segments.flightSegments[lastIndex]
                                        .departureAirport.countryName
                                    }{" "}
                                    می رسد
                                  </span>
                                </div>
                              </div>
                              {segments.flightSegments.map((segment, index) => (
                                <div
                                  className={styles.flightUpDetail}
                                  key={index}
                                >
                                  <div className={styles.info}>
                                    <div className={styles.contentInfo}>
                                      <img
                                        src={segment.marketingAirline.photoUrl}
                                        alt={segment.marketingAirline.name}
                                      />
                                      <div>
                                        <div className={styles.airlineText}>
                                          {segment.marketingAirline.name}
                                        </div>
                                        <div className={styles.airlineText}>
                                          {segment.marketingAirline.code}-
                                          {segment.flightNumber}
                                        </div>
                                        {/* <div className={styles.airlineText}>
                                              AIRBUS - A321
                                            </div> */}
                                        <div className={styles.airlineText}>
                                          {segment.cabinClass.name} class
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className={styles.infoOrigin}>
                                    <div className={styles.departureTimeLabel}>
                                      <span
                                        className={styles.arrivalAirportLabel}
                                      >
                                        {segment.departureAirport.code}
                                      </span>
                                      <Time date={segment.departureDateTime} />
                                    </div>
                                    <div className={styles.departureDateLabel}>
                                      <DatePersion
                                        date={segment.departureDateTime}
                                      />
                                    </div>
                                    <div className={styles.airportLabel}>
                                      {segment.departureAirport.name}
                                    </div>
                                    <div className={styles.airportLabel}>
                                      {segment.departureAirport.countryName},{" "}
                                      {segment.departureAirport.cityName}
                                    </div>
                                    {segment.departureAirport.terminalId && (
                                      <div className={styles.airportLabel}>
                                        Terminal{" "}
                                        {segment.departureAirport.terminalId}
                                      </div>
                                    )}
                                  </div>
                                  <div className={styles.infoDestination}>
                                    <div className={styles.departureTimeLabel}>
                                      <span
                                        className={styles.arrivalAirportLabel}
                                      >
                                        {segment.arrivalAirport.code}
                                      </span>
                                      <Time date={segment.arrivalDateTime} />
                                    </div>
                                    <div className={styles.departureDateLabel}>
                                      <DatePersion
                                        date={segment.arrivalDateTime}
                                      />
                                    </div>
                                    <div className={styles.airportLabel}>
                                      {segment.arrivalAirport.name}
                                    </div>
                                    <div className={styles.airportLabel}>
                                      {segment.arrivalAirport.countryName},{" "}
                                      {segment.arrivalAirport.cityName}
                                    </div>
                                    <div className={styles.airportLabel}>
                                      Terminal{" "}
                                      {segment.arrivalAirport.terminalId}
                                    </div>
                                  </div>
                                  <div className={styles.infoTime}>
                                    <b>
                                      {" "}
                                      <TimeString
                                        time={segment.flightDuration}
                                      />{" "}
                                    </b>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }
                    )}{" "}
                  </TabPane>
                  <TabPane tab="اطلاعات مسافران" key="2">
                    <div className={styles.infoTraveller}>
                      <div className={styles.treveller}>
                        <span>{t("full-name")}</span>
                        <div className={styles.name}>
                          {props.data.reserver.firstName}{" "}
                          {props.data.reserver.lastName}
                        </div>
                        {/* <div className={styles.name}>Ramin Derakhshan</div> */}
                      </div>
                      {props.data.segment.airItinerary.originDestinationOptions.map(
                        (segments, idx) =>
                          segments.flightSegments.map((segment, index) => (
                            <div className={styles.baggageInfo} key={index}>
                              <div className={styles.head}>
                                {segment.departureAirport.code} -{" "}
                                {segment.arrivalAirport.code}
                              </div>
                              <div className={styles.content}>
                                <ul>
                                  <li>
                                    <div>
                                      <VerticalBaggageIcon />
                                      <span>چمدان کابین</span>
                                    </div>
                                    <div>
                                      {segment.handBags[0].handBagAllowance} KG
                                      <div className={styles.badge}>رایگان</div>
                                    </div>
                                  </li>
                                  <li>
                                    <div>
                                      <HorizontalBaggageIcon />
                                      <span>بار چمدان </span>
                                    </div>
                                    <div>
                                      {segment.baggages[0].baggageAllowance} KG
                                      <div className={styles.badge}>رایگان</div>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                              <div className={styles.contactBaggage}>
                                <div className={styles.IconBaggage}>
                                  <svg
                                    focusable="false"
                                    color="inherit"
                                    fill="currentcolor"
                                    aria-hidden="true"
                                    role="presentation"
                                    viewBox="0 0 61 52"
                                    preserveAspectRatio="xMidYMid meet"
                                    size="120"
                                    width="120"
                                    height="65"
                                    className="sc-hMqMXs irGMpL"
                                  >
                                    <g fill="none" fillRule="evenodd">
                                      <g>
                                        <g transform="translate(-571 -248) translate(571 248)">
                                          <rect
                                            width="59.473"
                                            height="40.888"
                                            x=".595"
                                            y="6.071"
                                            fill="#EAEFF6"
                                            rx="6.899"
                                          ></rect>
                                          <path
                                            fill="#3665AC"
                                            d="M20.807 6.071c.923-3.72 2.9-5.58 5.935-5.58h7.229c3.041.139 4.991 2 5.85 5.587 0-.005-1.013-.007-3.04-.007-.628-1.738-1.565-2.608-2.81-2.608h-6.635c-1.749.018-2.904.89-3.467 2.615-.025.015-1.046.012-3.062-.007z"
                                          ></path>
                                          <path
                                            fill="#FFF"
                                            d="M14.273 6.666H45.794V46.513000000000005H14.273z"
                                          ></path>
                                          <path
                                            fill="#E0E8F6"
                                            d="M35.389 23.047V15.77c.24-2.53 1.392-3.796 3.456-3.796s3.24 1.265 3.529 3.796v7.278c0 .215-.174.388-.388.388h-6.209c-.214 0-.388-.173-.388-.388z"
                                          ></path>
                                          <path
                                            fill="#E64129"
                                            d="M35.203 22.093v-7.148c.212-2.36 1.227-3.539 3.045-3.539 1.818 0 2.854 1.18 3.109 3.54v7.147h-6.154z"
                                          ></path>
                                          <circle
                                            cx="38.063"
                                            cy="13.803"
                                            r="1"
                                            fill="#EAEFF6"
                                          ></circle>
                                          <path
                                            fill="#FFF"
                                            d="M.953 39.17V14.278c4.776-1.014 7.305-3.506 7.589-7.475h3.17v39.925h-3.17c-.078-.965-.182-1.653-.312-2.063-.49-1.553-1.284-2.64-1.898-3.25-.585-.583-1.612-1.365-3.071-1.85-.451-.15-1.22-.281-2.308-.395z"
                                          ></path>
                                          <path
                                            fill="#FFF"
                                            d="M49.362 39.033V14.14c4.776-1.013 7.305-3.505 7.589-7.474h3.17V46.59h-3.17c-.078-.966-.182-1.653-.311-2.063-.49-1.553-1.285-2.64-1.898-3.25-.585-.583-1.613-1.365-3.072-1.85-.451-.15-1.22-.281-2.308-.395z"
                                            transform="matrix(-1 0 0 1 109.483 0)"
                                          ></path>
                                          <path
                                            fill="#3665AC"
                                            d="M55.019 46.443h-2.587c.185-3.713 3.18-6.694 6.91-6.878v2.555c0 2.384-1.94 4.323-4.323 4.323zm-8.76 0h2.366V6.803H46.26v39.64zm-34.222 0h2.366V6.803h-2.366v39.64zM1.32 42.12v-2.555c3.73.184 6.726 3.165 6.91 6.878H5.643c-2.384 0-4.323-1.94-4.323-4.323zM5.643 6.803H8.23c-.184 3.713-3.18 6.694-6.91 6.878v-2.555c0-2.384 1.94-4.323 4.323-4.323zm5.67 0v39.64H8.955C8.769 42.33 5.45 39.026 1.32 38.84V14.406c4.13-.186 7.449-3.49 7.636-7.603h2.356zm13.019 0h13.553v4.32c-1.732.184-3.09 1.636-3.09 3.416v7.916c0 .201.163.363.363.363h6.18c.2 0 .363-.162.363-.363V14.54c0-1.78-1.359-3.232-3.09-3.416v-4.32h6.923v39.64H15.128V6.803h9.204zm11.963-.725H24.368c.177-1.206 1.209-2.138 2.464-2.138h6.998c1.256 0 2.288.932 2.465 2.138zm1.15 6.944c-.443.442-.443 1.162 0 1.605.214.214.5.332.803.332.303 0 .588-.118.802-.332.444-.443.444-1.163 0-1.605-.127-.128-.279-.215-.44-.269v-.905c1.331.18 2.365 1.311 2.365 2.69v7.555H35.52v-7.554c0-1.38 1.034-2.512 2.365-2.69v.904c-.161.055-.313.14-.44.269zm.472.574c.056.127.183.216.33.216.148 0 .275-.09.331-.216.11.159.102.376-.04.518-.16.16-.42.16-.58 0-.077-.078-.12-.18-.12-.29 0-.084.032-.16.079-.228zM26.832.849h6.998c2.961 0 5.393 2.314 5.58 5.229h-2.374c-.18-1.609-1.55-2.864-3.206-2.864h-6.998c-1.656 0-3.025 1.255-3.205 2.864h-2.375c.188-2.915 2.62-5.229 5.58-5.229zm32.51 13.557V38.84c-4.13.186-7.45 3.49-7.636 7.603H49.35V6.803h2.356c.187 4.113 3.506 7.417 7.636 7.603zm0-3.28v2.555c-3.73-.184-6.725-3.165-6.91-6.878h2.588c2.383 0 4.322 1.94 4.322 4.323zM40.13 6.078c-.19-3.314-2.938-5.954-6.3-5.954h-6.997c-3.36 0-6.108 2.64-6.298 5.954H5.644c-2.784 0-5.05 2.264-5.05 5.048V42.12c0 2.783 2.266 5.048 5.05 5.048h49.375c2.783 0 5.048-2.265 5.048-5.048V11.126c0-2.784-2.264-5.048-5.047-5.048H40.129z"
                                          ></path>
                                          <rect
                                            width="60.662"
                                            height="42.226"
                                            y="5.476"
                                            rx="6.899"
                                          ></rect>
                                          <rect
                                            width="7.761"
                                            height="4.657"
                                            x="9.318"
                                            y="33.497"
                                            fill="#5992E8"
                                            rx=".776"
                                          ></rect>
                                          <rect
                                            width="7.761"
                                            height="4.657"
                                            x="43.467"
                                            y="33.497"
                                            fill="#5992E8"
                                            rx=".776"
                                          ></rect>
                                          <ellipse
                                            cx="29.963"
                                            cy="50.448"
                                            fill="#EAEFF6"
                                            rx="19.093"
                                            ry="1.552"
                                            transform="matrix(1 0 0 -1 0 100.896)"
                                          ></ellipse>
                                        </g>
                                      </g>
                                    </g>
                                  </svg>
                                </div>
                                <div className={styles.TextBaggage}>
                                  اگه نیاز به اضافه کردن بار بیشتر دارید لطفا با
                                  ما
                                  <Link as="/contact" href="/contact">
                                    <a target="_blank"> تماس بگیرید</a>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          ))
                      )}
                    </div>
                  </TabPane>
                  <TabPane tab="لغو و تغییر" key="3">
                    <Collapse accordion>
                      {props.data.rules.map((rule, index) => (
                        <Panel
                          header={rule.title}
                          style={{ padding: "0px 15px" }}
                          key={index}
                        >
                          <p>{rule.description}</p>
                        </Panel>
                      ))}
                    </Collapse>
                  </TabPane>
                  <TabPane tab="جزئیات مبلغ" key="4">
                    <div className={styles.infoPrice}>
                      <div className={styles.content}>
                        {props.data.segment.airItineraryPricingInfo.fareBreakdown.map(
                          (item, index) => (
                            <div className={styles.rowPrice} key={index}>
                              <span>
                                {item.passengerTypeQuantity.code === "ADT" &&
                                  t("adult")}{" "}
                                {item.passengerTypeQuantity.code === "CHD" &&
                                  t("child")}{" "}
                                {item.passengerTypeQuantity.code === "INF" &&
                                  t("infant")}{" "}
                                {item.passengerTypeQuantity.quantity}{" "}
                                {t("individual")}
                              </span>
                              <b>
                                {item.passengerFare.totalFare} {t("rial")}
                              </b>
                            </div>
                          )
                        )}

                        <div className={styles.rowPriceResult}>
                          <span>{t("total")}</span>
                          <span>
                            <PriceFormat
                              price={
                                props.data.segment.airItineraryPricingInfo
                                  .totalFare.totalFare
                              }
                            />{" "}
                            {t("rial")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </TabPane>
                </Tabs>
              ) : null}
              <div className={styles.lookingHotel}>
                <div className={styles.detail}>
                  <img src="data:image/svg+xml;base64,PHN2ZyBpZD0iaWNvbiIgaGVpZ2h0PSI1MTIiIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB3aWR0aD0iNTEyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im05Ni4xODUgMzMuMDM0aDIxLjY1MnY4OC40MzJoLTIxLjY1MnoiIGZpbGw9IiNjMWNkZDMiLz48cGF0aCBkPSJtMTE3LjgzNyAxMjIuNDY1aC0yMS42NTFhMSAxIDAgMCAxIC0xLTF2LTg4LjQzMWExIDEgMCAwIDEgMS0xaDIxLjY1MWExIDEgMCAwIDEgMSAxdjg4LjQzMmExIDEgMCAwIDEgLTEgLjk5OXptLTIwLjY1MS0yaDE5LjY1MXYtODYuNDMxaC0xOS42NTF6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTEwLjE2MyAzMy4wMzRoMjEuNjUydjg4LjQzMmgtMjEuNjUyeiIgZmlsbD0iI2MxY2RkMyIvPjxwYXRoIGQ9Im0zMS44MTQgMTIyLjQ2NWgtMjEuNjUxYTEgMSAwIDAgMSAtMS0xdi04OC40MzFhMSAxIDAgMCAxIDEtMWgyMS42NTFhMSAxIDAgMCAxIDEgMXY4OC40MzJhMSAxIDAgMCAxIC0xIC45OTl6bS0yMC42NTEtMmgxOS42NTF2LTg2LjQzMWgtMTkuNjUxeiIgZmlsbD0iIzJmM2E1YSIvPjxwYXRoIGQ9Im0yOC40OTMgNi41MzVoNzEuMDE0djExNC45MzFoLTcxLjAxNHoiIGZpbGw9IiNkOWUyZTkiLz48cGF0aCBkPSJtOTkuNTA3IDEyMi40NjVoLTcxLjAxNGExIDEgMCAwIDEgLTEtMXYtMTE0LjkzYTEgMSAwIDAgMSAxLTFoNzEuMDE0YTEgMSAwIDAgMSAxIDF2MTE0LjkzYTEgMSAwIDAgMSAtMSAxem0tNzAuMDE0LTJoNjkuMDE0di0xMTIuOTNoLTY5LjAxNHoiIGZpbGw9IiMyZjNhNWEiLz48cGF0aCBkPSJtMzguNjU0IDE1LjU2M2gxMS4wNDR2MTEuMDQ0aC0xMS4wNDR6IiBmaWxsPSIjYjlkZGZjIi8+PHBhdGggZD0ibTQ5LjcgMjcuNjA3aC0xMS4wNDZhMSAxIDAgMCAxIC0xLTF2LTExLjA0NGExIDEgMCAwIDEgMS0xaDExLjA0NmExIDEgMCAwIDEgMSAxdjExLjA0NGExIDEgMCAwIDEgLTEgMXptLTEwLjA0NC0yaDkuMDQ0di05LjA0NGgtOS4wNDZ6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTU4LjQ3OCAxNS41NjNoMTEuMDQ0djExLjA0NGgtMTEuMDQ0eiIgZmlsbD0iI2I5ZGRmYyIvPjxwYXRoIGQ9Im02OS41MjIgMjcuNjA3aC0xMS4wNDRhMSAxIDAgMCAxIC0xLTF2LTExLjA0NGExIDEgMCAwIDEgMS0xaDExLjA0NGExIDEgMCAwIDEgMSAxdjExLjA0NGExIDEgMCAwIDEgLTEgMXptLTEwLjA0NS0yaDkuMDQ1di05LjA0NGgtOS4wNDR6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTc4LjMwMiAxNS41NjNoMTEuMDQ0djExLjA0NGgtMTEuMDQ0eiIgZmlsbD0iI2I5ZGRmYyIvPjxwYXRoIGQ9Im04OS4zNDYgMjcuNjA3aC0xMS4wNDZhMSAxIDAgMCAxIC0xLTF2LTExLjA0NGExIDEgMCAwIDEgMS0xaDExLjA0NmExIDEgMCAwIDEgMSAxdjExLjA0NGExIDEgMCAwIDEgLTEgMXptLTEwLjA0NC0yaDkuMDQ0di05LjA0NGgtOS4wNDZ6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTM4LjY1NCAzMy44M2gxMS4wNDR2MTEuMDQ0aC0xMS4wNDR6IiBmaWxsPSIjYjlkZGZjIi8+PHBhdGggZD0ibTQ5LjcgNDUuODc0aC0xMS4wNDZhMSAxIDAgMCAxIC0xLTF2LTExLjA0NGExIDEgMCAwIDEgMS0xaDExLjA0NmExIDEgMCAwIDEgMSAxdjExLjA0NGExIDEgMCAwIDEgLTEgMXptLTEwLjA0NC0yaDkuMDQ0di05LjA0NGgtOS4wNDZ6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTU4LjQ3OCAzMy44M2gxMS4wNDR2MTEuMDQ0aC0xMS4wNDR6IiBmaWxsPSIjYjlkZGZjIi8+PHBhdGggZD0ibTY5LjUyMiA0NS44NzRoLTExLjA0NGExIDEgMCAwIDEgLTEtMXYtMTEuMDQ0YTEgMSAwIDAgMSAxLTFoMTEuMDQ0YTEgMSAwIDAgMSAxIDF2MTEuMDQ0YTEgMSAwIDAgMSAtMSAxem0tMTAuMDQ1LTJoOS4wNDV2LTkuMDQ0aC05LjA0NHoiIGZpbGw9IiMyZjNhNWEiLz48cGF0aCBkPSJtNzguMzAyIDMzLjgzaDExLjA0NHYxMS4wNDRoLTExLjA0NHoiIGZpbGw9IiNiOWRkZmMiLz48cGF0aCBkPSJtODkuMzQ2IDQ1Ljg3NGgtMTEuMDQ2YTEgMSAwIDAgMSAtMS0xdi0xMS4wNDRhMSAxIDAgMCAxIDEtMWgxMS4wNDZhMSAxIDAgMCAxIDEgMXYxMS4wNDRhMSAxIDAgMCAxIC0xIDF6bS0xMC4wNDQtMmg5LjA0NHYtOS4wNDRoLTkuMDQ2eiIgZmlsbD0iIzJmM2E1YSIvPjxwYXRoIGQ9Im0zOC42NTQgNTIuMDk2aDExLjA0NHYxMS4wNDRoLTExLjA0NHoiIGZpbGw9IiNiOWRkZmMiLz48cGF0aCBkPSJtNDkuNyA2NC4xNGgtMTEuMDQ2YTEgMSAwIDAgMSAtMS0xdi0xMS4wNGExIDEgMCAwIDEgMS0xaDExLjA0NmExIDEgMCAwIDEgMSAxdjExLjA0YTEgMSAwIDAgMSAtMSAxem0tMTAuMDQ0LTJoOS4wNDR2LTkuMDRoLTkuMDQ2eiIgZmlsbD0iIzJmM2E1YSIvPjxwYXRoIGQ9Im01OC40NzggNTIuMDk2aDExLjA0NHYxMS4wNDRoLTExLjA0NHoiIGZpbGw9IiNiOWRkZmMiLz48cGF0aCBkPSJtNjkuNTIyIDY0LjE0aC0xMS4wNDRhMSAxIDAgMCAxIC0xLTF2LTExLjA0YTEgMSAwIDAgMSAxLTFoMTEuMDQ0YTEgMSAwIDAgMSAxIDF2MTEuMDRhMSAxIDAgMCAxIC0xIDF6bS0xMC4wNDUtMmg5LjA0NXYtOS4wNGgtOS4wNDR6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTc4LjMwMiA1Mi4wOTZoMTEuMDQ0djExLjA0NGgtMTEuMDQ0eiIgZmlsbD0iI2I5ZGRmYyIvPjxwYXRoIGQ9Im04OS4zNDYgNjQuMTRoLTExLjA0NmExIDEgMCAwIDEgLTEtMXYtMTEuMDRhMSAxIDAgMCAxIDEtMWgxMS4wNDZhMSAxIDAgMCAxIDEgMXYxMS4wNGExIDEgMCAwIDEgLTEgMXptLTEwLjA0NC0yaDkuMDQ0di05LjA0aC05LjA0NnoiIGZpbGw9IiMyZjNhNWEiLz48cGF0aCBkPSJtMzguNjU0IDcwLjM2M2gxMS4wNDR2MTEuMDQ0aC0xMS4wNDR6IiBmaWxsPSIjYjlkZGZjIi8+PHBhdGggZD0ibTQ5LjcgODIuNDA3aC0xMS4wNDZhMSAxIDAgMCAxIC0xLTF2LTExLjA0NGExIDEgMCAwIDEgMS0xaDExLjA0NmExIDEgMCAwIDEgMSAxdjExLjA0NGExIDEgMCAwIDEgLTEgMXptLTEwLjA0NC0yaDkuMDQ0di05LjA0NGgtOS4wNDZ6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTU4LjQ3OCA3MC4zNjNoMTEuMDQ0djExLjA0NGgtMTEuMDQ0eiIgZmlsbD0iI2I5ZGRmYyIvPjxwYXRoIGQ9Im02OS41MjIgODIuNDA3aC0xMS4wNDRhMSAxIDAgMCAxIC0xLTF2LTExLjA0NGExIDEgMCAwIDEgMS0xaDExLjA0NGExIDEgMCAwIDEgMSAxdjExLjA0NGExIDEgMCAwIDEgLTEgMXptLTEwLjA0NS0yaDkuMDQ1di05LjA0NGgtOS4wNDR6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTc4LjMwMiA3MC4zNjNoMTEuMDQ0djExLjA0NGgtMTEuMDQ0eiIgZmlsbD0iI2I5ZGRmYyIvPjxwYXRoIGQ9Im04OS4zNDYgODIuNDA3aC0xMS4wNDZhMSAxIDAgMCAxIC0xLTF2LTExLjA0NGExIDEgMCAwIDEgMS0xaDExLjA0NmExIDEgMCAwIDEgMSAxdjExLjA0NGExIDEgMCAwIDEgLTEgMXptLTEwLjA0NC0yaDkuMDQ0di05LjA0NGgtOS4wNDZ6IiBmaWxsPSIjMmYzYTVhIi8+PHBhdGggZD0ibTUzLjEgOTYuMDdoMjEuOHYyNS4zOTVoLTIxLjh6IiBmaWxsPSIjOTI5N2FiIi8+PHBhdGggZD0ibTc0LjkgMTIyLjQ2NWgtMjEuOGExIDEgMCAwIDEgLTEtMXYtMjUuMzk1YTEgMSAwIDAgMSAxLTFoMjEuOGExIDEgMCAwIDEgMSAxdjI1LjRhMSAxIDAgMCAxIC0xIC45OTV6bS0yMC44LTJoMTkuOHYtMjMuMzk1aC0xOS44eiIgZmlsbD0iIzJmM2E1YSIvPjxnIGZpbGw9IiM4NDg3OWMiPjxwYXRoIGQ9Im0xMDUuNzA0IDQzLjE0Nmg0LjQ2NHY0LjQ2NGgtNC40NjR6Ii8+PHBhdGggZD0ibTEwNS43MDQgNTUuODk1aDQuNDY0djQuNDY0aC00LjQ2NHoiLz48cGF0aCBkPSJtMTA1LjcwNCA2OC42NDNoNC40NjR2NC40NjRoLTQuNDY0eiIvPjxwYXRoIGQ9Im0xMDUuNzA0IDgxLjM5Mmg0LjQ2NHY0LjQ2NGgtNC40NjR6Ii8+PHBhdGggZD0ibTEwNS43MDQgOTQuMTRoNC40NjR2NC40NjRoLTQuNDY0eiIvPjxwYXRoIGQ9Im0xMDUuNzA0IDEwNi44ODloNC40NjR2NC40NjRoLTQuNDY0eiIvPjxwYXRoIGQ9Im0xNi41MjUgNDMuMTQ2aDQuNDY0djQuNDY0aC00LjQ2NHoiLz48cGF0aCBkPSJtMTYuNTI1IDU1Ljg5NWg0LjQ2NHY0LjQ2NGgtNC40NjR6Ii8+PHBhdGggZD0ibTE2LjUyNSA2OC42NDNoNC40NjR2NC40NjRoLTQuNDY0eiIvPjxwYXRoIGQ9Im0xNi41MjUgODEuMzkyaDQuNDY0djQuNDY0aC00LjQ2NHoiLz48cGF0aCBkPSJtMTYuNTI1IDk0LjE0aDQuNDY0djQuNDY0aC00LjQ2NHoiLz48cGF0aCBkPSJtMTYuNTI1IDEwNi44ODloNC40NjR2NC40NjRoLTQuNDY0eiIvPjwvZz48cGF0aCBkPSJtMTI3IDEyMi40NjVoLTEyNmExIDEgMCAwIDEgMC0yaDEyNmExIDEgMCAwIDEgMCAyeiIgZmlsbD0iIzJmM2E1YSIvPjwvc3ZnPg==" />
                  <div className={styles.text}>
                    <h4>
                      {t("search-hotel-in")}
                      {
                        props.data.segment.airItinerary
                          .originDestinationOptions[0].flightSegments[0]
                          .arrivalAirport.cityName
                      }
                    </h4>
                    <span>{t("finding-best-hotels")}</span>
                  </div>
                </div>
                <div className={styles.btnLink}>
                  <Link as="/hotels-foreign-home" href="/hotels-foreign-home">
                    <button>{t("search-hotel")}</button>
                  </Link>
                </div>
              </div>

              <div className={styles.needHelpBook}>
                <div className={styles.subjectHelpBook}>{t("need-help")}</div>
                <div className={styles.descriptionHelpBook}>
                  {t("24hours-backup")}
                </div>
                <div className={styles.helpBook}>
                  <div className={styles.contactHelpBook}>
                    <PhoneGrayIcon />
                    <div>
                      <div className={styles.textContact}>
                        {t("contact-us")}
                      </div>
                      <a href="tel:0123456789">0123456789</a>
                    </div>
                  </div>
                  <div className={styles.contactHelpBook}>
                    <WhatsappGrayIcon />
                    <div>
                      <div className={styles.textContact}>{t("whatsapp")}</div>
                      <a
                        href={`https://api.whatsapp.com/send?phone=0123456789`}
                      >
                        <span dir="ltr">0123456789</span>
                      </a>
                    </div>
                  </div>
                  <div className={styles.contactHelpBook}>
                    <EmailGrayIcon />
                    <div>
                      <div className={styles.textContact}>{t("email")}</div>
                      <a href="info@safaraneh.com">info@safaraneh.com</a>
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

FlightForeign.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

FlightForeign.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProp = (state) => {
  return {
    data: state.flightForeign.GetReserveData,
    loading: state.flightForeign.loadingGetReserve,
    vocherData: state.flightForeign.vocherData,
  };
};

const mapDispatchToProp = (dispatch) => ({
  GetReserve: (id, username) => dispatch(GetReserve(id, username)),
  GetVoucherPdf: (id, username) => dispatch(GetVoucherPdf(id, username)),
});

export default withTranslation("common")(
  connect(mapStateToProp, mapDispatchToProp)(FlightForeign)
);
