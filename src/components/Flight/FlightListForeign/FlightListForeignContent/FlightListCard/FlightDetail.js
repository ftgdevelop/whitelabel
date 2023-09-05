import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Router, i18n, withTranslation } from "../../../../../../i18n";
import { useRouter } from "next/router";
import { Collapse, Button, Row, Col, notification, Tooltip } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import TimeString from "../../../../UI/TimeString/TimeString";
import PriceFormat from "../../../../UI/PriceFormat/PriceFormat";
import Time from "../../../../UI/Time/Time";
import styles from "../../../../../styles/Flight.module.css";
import {
  ArrowRightIcon,
  TimeIcon,
  BaggageIncludeIcon,
  BaggageNotIncludeIcon,
} from "../../../../UI/Icons";
import { PostValidate } from "../../../../../actions/flight/Flight";
import ModalFlightDetail from "./ModalFlightDetail";

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

const FlightDetail = (props) => {
  const { t, flight, loading } = props;
  const info = props.flight.airItinerary.originDestinationOptions;
  let logoAirline;
  const [active, setActive] = useState(false);

  const toggle = () => {
    setActive(!active);
  };

  const selectFlight = () => {
    props.selectedFlight(props.flight.flightKey);
  };

  return (
    <>
      <Row>
        <Col xs={16} sm={19} md={19} lg={19} xl={19}>
          <div className={styles.contentFlightForeign}>
            <div className={styles.rightCard} onClick={() => toggle()}>
              <div className={styles.contentRightCard}>
                {info.map((segments, idx) => {
                  const segment = segments.flightSegments[0];
                  const arrivalInfo =
                    segments.flightSegments[segments.flightSegments.length - 1];
                  return (
                    <React.Fragment key={`flightSegments${idx}`}>
                      {/* {segments.flightSegments.map((segment, index) => ( */}
                      <div className={styles.searchResultLegCard}>
                        <Row className={styles.rowWitdh}>
                          <Col xs={24} sm={6} md={6} lg={6} xl={5}>
                            <div className={styles.airlineLogo}>
                              <img
                                src={segment.marketingAirline.photoUrl}
                                alt={segment.marketingAirline.name}
                              />
                              <div className={styles.airlineName}>
                                <div className={styles.airlineLabel}>
                                  {segment.marketingAirline.name}
                                </div>
                                <div className={styles.airlineLabel}>
                                  {/* KL-428 */}
                                  {segment.marketingAirline.code}-
                                  {segment.flightNumber}
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col xs={10} sm={6} md={4} lg={4} xl={5}>
                            <div className={styles.departureTime}>
                              <div className={styles.departureAirportLabel}>
                                <Time date={segment.departureDateTime} />
                              </div>
                              <Tooltip
                                placement="top"
                                title={
                                  <div className={styles.airlineTooltip}>
                                    <span>
                                      {segment.departureAirport.countryName},{" "}
                                      {segment.departureAirport.cityName},{" "}
                                      {segment.departureAirport.name}
                                    </span>
                                  </div>
                                }
                              >
                                <div className={styles.textDepartureTime}>
                                  {" "}
                                  {segment.departureAirport.code}{" "}
                                </div>
                              </Tooltip>
                            </div>
                          </Col>
                          <Col xs={4} sm={6} md={10} lg={10} xl={9}>
                            <div className={styles.airlineItinerary}>
                              <Tooltip
                                placement="top"
                                title={
                                  <div className={styles.airlineTooltip}>
                                    <span>
                                      <b>۱ ساعت ۲۵ دقیقه</b> زمان انتظار در
                                      فرودگاه دبی
                                    </span>
                                  </div>
                                }
                              >
                                <div className={styles.textAirlineItinerary}>
                                  {segments.numberOfStop ? (
                                    <span>{segments.numberOfStop} توقف</span>
                                  ) : (
                                    <span className={styles.direct}>
                                      مستقیم
                                    </span>
                                  )}
                                </div>
                              </Tooltip>
                              <svg
                                focusable="false"
                                color="inherit"
                                fill="currentcolor"
                                aria-hidden="true"
                                role="presentation"
                                viewBox="0 0 16 16"
                                preserveAspectRatio="xMidYMid meet"
                                width="24px"
                                height="24px"
                                className="sc-hBbWxd bAtVEv sc-kGXeez gxECw"
                              >
                                <g fill="none" fillRule="evenodd">
                                  <path d="M0 0h16v16H0z"></path>
                                  <path
                                    fill="currentcolor"
                                    d="M8.002 13.429h.42c.557 0 1.009-.44 1.009-.572v.572c0-.316-.44-.572-1.003-.572h-.14l1.714-1.714h.14c.554 0 1.003-.439 1.003-.572v.572c0-.316-.449-.572-.857-.572l1.143-1.428c0-.286.857-.288.857-.288s1.43.028 2.287.002C15.432 8.883 16 8.286 16 8c.003-.286-.568-.857-1.425-.857h-2.287s-.857 0-.857-.286L10.288 5.43c.012 0 0 0 0 0 .473 0 .857-.44.857-.572v.572c0-.316-.438-.572-1.003-.572h-.14L8.287 3.143h.14c.555 0 1.004-.439 1.004-.572v.572c0-.316-.444-.572-.992-.572h-.46L6.253.534S5.895 0 5.39 0l-.441.029s.482.828 1.625 3.4C7.716 6 7.716 6 7.716 6.857l-.572.286H4.572c0 .055-.285 0-1.428.286L1.453 5.547S.857 4.857 0 4.857l1.429 2.857L0 8l1.429.286L0 11.143c.857 0 1.363-.44 1.363-.44l1.78-2.132c1.144.286 1.43.286 1.43.286h2.571l.572.286c0 .857 0 .857-1.143 3.428C5.43 15.143 4.977 16 4.977 16h.412s.516-.108.863-.506l1.75-2.065z"
                                  ></path>
                                </g>
                              </svg>
                              <div
                                className={styles.lineAirlineItinerary}
                              ></div>
                              <div
                                className={`${styles.airlineItineraryLabel} ${styles.airlineItineraryMore}`}
                              >
                                {/* <span>
                              {t("system")}
                            </span> */}
                                <Tooltip
                                  placement="bottom"
                                  title={
                                    <div className={styles.airlineTooltip}>
                                      <span>مدت زمان پرواز</span>
                                    </div>
                                  }
                                >
                                  <div className={styles.airlineTime}>
                                    <TimeIcon />
                                    {/* <small>۱۱ ساعت و ۲۰ دقیقه</small> */}
                                    <small>
                                      <TimeString
                                        time={segments.journeyDuration}
                                      />
                                    </small>
                                  </div>
                                </Tooltip>
                                <Tooltip
                                  placement="bottom"
                                  title={
                                    <>
                                      <div
                                        className={styles.airlineTooltipBottom}
                                      >
                                        {segment.handBags.map((item, key) => (
                                          <div key={key}>
                                            <span>چمدان کابین</span>
                                            <span>
                                              {item.handBagAllowance}{" "}
                                              {item.unitType}
                                            </span>
                                          </div>
                                        ))}
                                        {segment.baggages.map((item, key) => (
                                          <div key={key}>
                                            <span>بار چمدان </span>

                                            <span>
                                              {item.baggageAllowance}{" "}
                                              {item.unitType}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    </>
                                  }
                                >
                                  <div className={styles.airlineBaggage}>
                                    {segment.baggages[0].baggageAllowance ? (
                                      <BaggageIncludeIcon />
                                    ) : (
                                      <BaggageNotIncludeIcon />
                                    )}
                                    <small>شامل چمدان </small>
                                  </div>
                                </Tooltip>
                              </div>
                            </div>
                          </Col>
                          <Col xs={10} sm={6} md={4} lg={4} xl={5}>
                            <div className={styles.arrivalTime}>
                              <div className={styles.arrivalAirportLabel}>
                                <Time date={arrivalInfo.arrivalDateTime} />
                              </div>
                              <Tooltip
                                placement="top"
                                title={
                                  <div className={styles.airlineTooltip}>
                                    <span>
                                      {arrivalInfo.arrivalAirport.countryName},{" "}
                                      {arrivalInfo.arrivalAirport.cityName},{" "}
                                      {arrivalInfo.arrivalAirport.nameh}
                                    </span>
                                  </div>
                                }
                              >
                                <div className={styles.arrivalTimeLabel}>
                                  {" "}
                                  {arrivalInfo.arrivalAirport.code}{" "}
                                </div>
                              </Tooltip>
                            </div>
                          </Col>

                          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <div className={styles.partiallyOperated}>
                              {segment.marketingAirline.code !==
                                segment.operatingAirline.code && (
                                <span>
                                  میزبان پرواز شما{" "}
                                  {segment.operatingAirline.name} است
                                </span>
                              )}
                            </div>
                          </Col>
                        </Row>
                      </div>
                      {/* ))} */}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
            <div className={styles.detailReserveFlightForeign}>
              <ModalFlightDetail
                flight={flight}
                selectFlight={selectFlight}
                loading={props.loading}
              />
            </div>
          </div>
        </Col>
        <Col xs={8} sm={5} md={5} lg={5} xl={5}>
          <div className={styles.leftCard}>
            <div className={styles.priceFlight}>
              <Row>
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={24}
                  xl={24}
                  className={styles.textPriceFlight}
                >
                  <span>{t("rial")}</span>
                  <h6>
                    {flight && (
                      <PriceFormat
                        price={
                          flight.airItineraryPricingInfo.totalFare.totalFare
                        }
                      />
                    )}
                  </h6>
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={24}
                  xl={24}
                  className={styles.flightCardButton}
                >
                  {!loading ? (
                    <Button
                      onClick={() => selectFlight()}
                      className={`${
                        process.env.THEME_NAME === "TRAVELO" &&
                        "button-travelo"
                      }`}
                    >
                      {t("choose-flight")}
                      <ArrowRightIcon />
                    </Button>
                  )
                  : (
                    <Button
                      disabled
                      className={`${
                        process.env.THEME_NAME === "TRAVELO" &&
                        "button-travelo"
                      }`}
                    >
                      <LoadingOutlined spin />
                    </Button>
                  )}
                  {/* <div className={styles.remainingSeats}>
                    5 {t("remaining-chair")}
                  </div> */}
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

FlightDetail.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

FlightDetail.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(FlightDetail);
