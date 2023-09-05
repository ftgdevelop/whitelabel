import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Router, i18n, withTranslation } from "../../../../../../i18n";
import { useRouter } from "next/router";
import { Collapse, Button, Row, Col, notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import styles from "../../../../../styles/Flight.module.css";
import FlightDetail from "./FlightDetail/FlightDetail";
import PricingDetail from "./FlightDetail/PricingDetail";
import Time from "../../../../UI/Time/Time";
import DatePersion from "../../../../UI/DatePersion/DatePersion";
import { ArrowRightIcon } from "../../../../UI/Icons";
import {
  setFlightSelected,
  clearFilter,
  validateFlights,
} from "../../../../../actions";
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
const FlightListCard = (props) => {
  const router = useRouter();

  const { t, flight, flightSelected } = props;
  let logoAirline;

  const [active, setActive] = useState(false);
  const [price, setPrice] = useState(0);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [person, setPerson] = useState([]);

  let urlParameters = router.query;
  useEffect(() => {
    const sumPrice = () => {
      let persons = [],
        sum = 0;

      if (Number(urlParameters.adult)) {
        sum = sum + urlParameters.adult * flight.adultPrice;
        persons.push({
          type: t("adult"),
          count: urlParameters.adult,
          price: flight.adultPrice,
        });
      }
      if (Number(urlParameters.child)) {
        sum = sum + urlParameters.child * flight.childPrice;
        persons.push({
          type: t("child"),
          count: urlParameters.child,
          price: flight.childPrice,
        });
      }
      if (Number(urlParameters.infant)) {
        sum = sum + urlParameters.infant * flight.infantPrice;
        persons.push({
          type: t("infant"),
          count: urlParameters.infant,
          price: flight.infantPrice,
        });
      }
      flight.persons = persons;
      flight.sumPrice = sum;
      setPrice(sum);
      setPerson(persons);
    };
    sumPrice();
  }, [props.flight]);

  const toggle = () => {
    setActive(!active);
  };

  const selectFlight = async () => {
    if (!props.flight.hasReturn && urlParameters.returning) {
      openNotification(
        "info",
        "bottomRight",
        "در حال حاضر خرید این بلیط به صورت رفت و برگشت امکان پذیر نیست. اگر مایل به خرید این پرواز هستید لطفا به صورت بلیط رفت و برگشت مجزا برای خرید ان اقدام کنید"
      );
      return;
    }
    const params = {};
    const obj = { ...flightSelected };
    obj.persons = {
      adult: urlParameters.adult,
      child: urlParameters.child,
      infant: urlParameters.infant,
    };
    let res = "";
    if (props.flightSection == "departure") {
      obj.departure = props.flight;
    } else if (props.flightSection == "return") {
      obj.return = props.flight;
    }

    if (urlParameters.returning && props.flightSection == "return") {
      setLoadingSubmit(true);
      params.departureKey = obj.departure.flightKey;
      params.returnKey = obj.return.flightKey;
      res = await validateFlights(params);
    } else if (!urlParameters.returning && props.flightSection == "departure") {
      setLoadingSubmit(true);
      params.departureKey = obj.departure.flightKey;
      res = await validateFlights(params);
    } else {
      props.setFlightSelected(obj);
      props.clearFilter();
    }
    if (res.status == 200) {
      props.setFlightSelected({});
      props.clearFilter();
      Router.push(
        `/flights/checkout?key=${res.data.result.preReserveKey}&adult=${urlParameters.adult}&child=${urlParameters.child}&infant=${urlParameters.infant}`
      );
    } else if (res.status) {
      setLoadingSubmit(false);
      openNotification(
        "info",
        "bottomRight",
        "لطفا پرواز دیگری را انتخاب کنید"
      );
    }
  };

  if (flight.airline.picture && flight.airline.picture.path) {
    logoAirline = flight.airline.picture.path;
  } else {
    logoAirline = "https://tjwlcdn.com/img/air/GF.png";
  }

  function numberWithCommas(x) {
    return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x;
  }

  return (
    <>
      <div className={styles.flightCard}>
        <Row>
          <Col xs={16} sm={19} md={19} lg={19} xl={19}>
            <div className={styles.rightCard} onClick={() => toggle()}>
              <div className={styles.contentRightCard}>
                <div className={styles.searchResultLegCard}>
                  <Row className={styles.rowWitdh}>
                    <Col xs={24} sm={6} md={6} lg={6} xl={5}>
                      <div className={styles.airlineLogo}>
                        {flight.airline.picture ? (
                          <img
                            src={logoAirline}
                            alt={flight.airline.picture.altAttribute}
                            className={
                              flight.isAvailability === true
                                ? null
                                : "imageGrayscale"
                            }
                          />
                        ) : (
                          ""
                        )}
                        <div className={styles.airlineName}>
                          <div className={styles.airlineLabel}>
                            {flight.airline.name}
                          </div>
                          <div className={styles.airlineLabel}>
                            {flight.airCraft.manufacturer}
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col xs={10} sm={6} md={4} lg={4} xl={5}>
                      <div className={styles.departureTime}>
                        <div className={styles.departureAirportLabel}>
                          {flight.departureAirport.city.name}
                        </div>
                        <div className={styles.textDepartureTime}>
                          <Time date={flight.departureTime} />
                        </div>
                      </div>
                    </Col>
                    <Col xs={4} sm={6} md={10} lg={10} xl={9}>
                      <div className={styles.airlineItinerary}>
                        <div className={styles.textAirlineItinerary}>
                          <DatePersion date={flight.departureTime} />
                        </div>
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
                        <div className={styles.lineAirlineItinerary}></div>
                        <div className={styles.airlineItineraryLabel}>
                          {/* زمان پرواز : ۲ ساعت و ۲۵ دقیقه */}
                          <span>
                            {flight.flightType === "System"
                              ? t("system")
                              : t("charter")}
                          </span>
                        </div>
                      </div>
                    </Col>
                    <Col xs={10} sm={6} md={4} lg={4} xl={5}>
                      <div className={styles.arrivalTime}>
                        <div className={styles.arrivalAirportLabel}>
                          {flight.arrivalAirport.city.name}
                        </div>
                        <div className={styles.arrivalTimeLabel}>
                          <Time date={flight.arrivalTime} />
                        </div>
                      </div>
                    </Col>
                    <Col
                      xs={24}
                      className={
                        !active ? styles.activeDetail : styles.hiddenDetail
                      }
                    >
                      <div className={styles.detailFlightBtn}>
                        <a>
                          {t("flight-details")}
                          <ArrowRightIcon />
                        </a>
                      </div>
                      {/* <div className={styles.baggageIncludedIcon}>
                                                <svg focusable="false" color="inherit" fill="currentcolor" aria-hidden="true" role="presentation" viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet" width="24px" height="24px" className="sc-kGXeez kujTFb"><path d="M12.9 6.36H12.9l-5.654 5.655a.74.74 0 0 1-1.046 0l-3.067-3.07A1.12 1.12 0 1 1 4.714 7.36L6.723 9.37l4.593-4.593A1.12 1.12 0 0 1 12.9 6.36m3.092 1.28a8 8 0 1 0-15.983.72 8 8 0 0 0 15.983-.72"></path></svg>
                                                <div className={styles.baggageIncludedText}>شامل چمدان</div>
                                            </div> */}
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
            <div className={active ? styles.activeDetail : styles.hiddenDetail}>
              <div className={styles.detailFlight}>
                <FlightDetail flight={flight} />
                <div
                  className={active ? styles.activeDetail : styles.hiddenDetail}
                  onClick={() => toggle()}
                >
                  <div className={styles.detailFlightBtnClose}>
                    <a>
                      {t("close-flight-details")}
                      <ArrowRightIcon />
                    </a>
                  </div>
                </div>
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
                    {flight.isAvailability === true ? (
                      <span>{t("rial")}</span>
                    ) : null}
                    {flight.isAvailability === true ? (
                      <h6>{numberWithCommas(flight.adultPrice)}</h6>
                    ) : (
                      <span className={styles.isAvailability}>
                        {t("capacity-full")}
                      </span>
                    )}
                  </Col>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={24}
                    xl={24}
                    className={styles.flightCardButton}
                  >
                    {!loadingSubmit ? (
                      <Button
                        onClick={() => selectFlight()}
                        disabled={!flight.isAvailability ? "disabled" : null}
                        className={`${
                          process.env.THEME_NAME === "TRAVELO" &&
                          "button-travelo"
                        }`}
                      >
                        {t("choose-flight")}
                        <ArrowRightIcon />
                      </Button>
                    ) : (
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
                    {flight.isAvailability === true ? (
                      <div className={styles.remainingSeats}>
                        {flight.capacity < 9
                          ? flight.capacity + " " + t("remaining-chair")
                          : null}
                      </div>
                    ) : null}
                  </Col>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={24}
                    xl={24}
                    className={styles.pricingDetail}
                  >
                    <div
                      className={
                        active ? styles.activeDetail : styles.hiddenDetail
                      }
                    >
                      <PricingDetail info={person} sum={price} />
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

FlightListCard.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

FlightListCard.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProp = (state) => {
  return {
    flightSelected: state.flightSelected,
  };
};

const mapDispatchToProp = (dispatch) => ({
  setFlightSelected: (d) => dispatch(setFlightSelected(d)),
  clearFilter: () => dispatch(clearFilter()),
});

export default withTranslation("common")(
  connect(mapStateToProp, mapDispatchToProp)(FlightListCard)
);
