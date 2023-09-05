import React from "react";
import PropTypes from "prop-types";
import { i18n, withTranslation } from "../../../../i18n";
import { Col, Row, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import styles from "../../../styles/Flight.module.css";
import ModalFlightDetails from "./ModalFlightDetails";
import { FlightDepartureIcon, FlightReturnIcon } from "../../UI/Icons";
import { ArrowRightIcon } from "../../UI/Icons";
import ModalFlightDetailsCancel from "./ModalFlightDetailsCancel";
import Time from "../../UI/Time/Time";
import DatePersion from "../../UI/DatePersion/DatePersion";

const AsideCheckout = (props) => {
  const { t, flight } = props;
  if (!flight) {
    return <>Loading...</>;
  }
  const info = flight
    ? flight.segment.airItinerary.originDestinationOptions
    : [];

  return (
    <div
      className={`${styles.asideCheckout} ${styles.asideCheckoutFlightForeign}`}
    >
      <div className={styles.topAside}>
        <div className={styles.subject}>
          <span>{t("flight-details")}</span>
          <ModalFlightDetails info={info} />
        </div>
        {info.map((segments, index) => {
          const segment = segments.flightSegments[0];
          const arrivalInfo =
            segments.flightSegments[segments.flightSegments.length - 1];
          return (
            <div className={styles.flightSelected} key={index}>
              <div className={styles.date}>
                <FlightDepartureIcon />
                {/* {t("departure-flight")} */}
                <DatePersion
                  date={flight.departureTime[index].replaceAll("/", "-")}
                  showMiladi={true}
                />
              </div>
              <div className={styles.contentFlightSelected}>
                <Row>
                  <Col xs={24} sm={4} md={4} lg={4} xl={4}>
                    <div className={styles.airLine}>
                      <img
                        src={segment.marketingAirline.photoUrl}
                        alt={segment.marketingAirline.name}
                      />
                    </div>
                  </Col>
                  <Col xs={9} sm={4} md={4} lg={4} xl={4}>
                    <div className={styles.origin}>
                      <div className={styles.textOrigin}>
                        {flight.originCodes[index]}
                      </div>
                      <div className={styles.timeOrigin}>
                        {/* 14:30 */}
                        <Time date={flight.departureTime[index]} />
                      </div>
                    </div>
                  </Col>
                  <Col xs={6} sm={12} md={12} lg={12} xl={12}>
                    <div className={styles.symbolFlight}>
                      <div className={styles.airlineType}>
                        {/* PC-317 */}
                        {!segments.numberOfStop
                          ? "مستقیم"
                          : `${segments.numberOfStop} توقف`}
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
                        className="sc-gbOuXE gZUTkG sc-chPdSV ctQrKd"
                      >
                        <g fill="none" fillRule="evenodd">
                          <path d="M0 0h16v16H0z"></path>
                          <path
                            fill="currentcolor"
                            d="M8.002 13.429h.42c.557 0 1.009-.44 1.009-.572v.572c0-.316-.44-.572-1.003-.572h-.14l1.714-1.714h.14c.554 0 1.003-.439 1.003-.572v.572c0-.316-.449-.572-.857-.572l1.143-1.428c0-.286.857-.288.857-.288s1.43.028 2.287.002C15.432 8.883 16 8.286 16 8c.003-.286-.568-.857-1.425-.857h-2.287s-.857 0-.857-.286L10.288 5.43c.012 0 0 0 0 0 .473 0 .857-.44.857-.572v.572c0-.316-.438-.572-1.003-.572h-.14L8.287 3.143h.14c.555 0 1.004-.439 1.004-.572v.572c0-.316-.444-.572-.992-.572h-.46L6.253.534S5.895 0 5.39 0l-.441.029s.482.828 1.625 3.4C7.716 6 7.716 6 7.716 6.857l-.572.286H4.572c0 .055-.285 0-1.428.286L1.453 5.547S.857 4.857 0 4.857l1.429 2.857L0 8l1.429.286L0 11.143c.857 0 1.363-.44 1.363-.44l1.78-2.132c1.144.286 1.43.286 1.43.286h2.571l.572.286c0 .857 0 .857-1.143 3.428C5.43 15.143 4.977 16 4.977 16h.412s.516-.108.863-.506l1.75-2.065z"
                          ></path>
                        </g>
                      </svg>
                      <div className={styles.dashedFlight}></div>
                      <div className={styles.typeFlight}>
                        <span>{flight.cabinClass}</span>
                      </div>
                    </div>
                  </Col>
                  <Col xs={9} sm={4} md={4} lg={4} xl={4}>
                    <div className={styles.destination}>
                      <div className={styles.textDestination}>
                        {flight.destinationCode[index]}
                      </div>
                      <div className={styles.timeDestination}>17:00</div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          );
        })}

        {/* <div className={styles.flightSelected}>
          <div className={styles.date}>
            <FlightReturnIcon />
            {t("arrival-flight")}
          </div>
          <div className={styles.contentFlightSelected}>
            <Row>
              <Col xs={24} sm={4} md={4} lg={4} xl={4}>
                <div className={styles.airLine}>
                  <img
                    src="https://cdn3.itours.no/Content/images/airlines/Thumbs/Pegasus%20Hava%20Tasimaciligi%20A.S..png"
                    alt="Pegasus Hava Tasimaciligi A.S."
                    title="Pegasus Hava Tasimaciligi A.S."
                  />
                </div>
              </Col>
              <Col xs={9} sm={4} md={4} lg={4} xl={4}>
                <div className={styles.origin}>
                  <div className={styles.textOrigin}>ORY</div>
                  <div className={styles.timeOrigin}>14:30</div>
                </div>
              </Col>
              <Col xs={6} sm={12} md={12} lg={12} xl={12}>
                <div className={styles.symbolFlight}>
                  <div className={styles.airlineType}>PC-317</div>
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
                    className="sc-gbOuXE gZUTkG sc-chPdSV ctQrKd"
                  >
                    <g fill="none" fillRule="evenodd">
                      <path d="M0 0h16v16H0z"></path>
                      <path
                        fill="currentcolor"
                        d="M8.002 13.429h.42c.557 0 1.009-.44 1.009-.572v.572c0-.316-.44-.572-1.003-.572h-.14l1.714-1.714h.14c.554 0 1.003-.439 1.003-.572v.572c0-.316-.449-.572-.857-.572l1.143-1.428c0-.286.857-.288.857-.288s1.43.028 2.287.002C15.432 8.883 16 8.286 16 8c.003-.286-.568-.857-1.425-.857h-2.287s-.857 0-.857-.286L10.288 5.43c.012 0 0 0 0 0 .473 0 .857-.44.857-.572v.572c0-.316-.438-.572-1.003-.572h-.14L8.287 3.143h.14c.555 0 1.004-.439 1.004-.572v.572c0-.316-.444-.572-.992-.572h-.46L6.253.534S5.895 0 5.39 0l-.441.029s.482.828 1.625 3.4C7.716 6 7.716 6 7.716 6.857l-.572.286H4.572c0 .055-.285 0-1.428.286L1.453 5.547S.857 4.857 0 4.857l1.429 2.857L0 8l1.429.286L0 11.143c.857 0 1.363-.44 1.363-.44l1.78-2.132c1.144.286 1.43.286 1.43.286h2.571l.572.286c0 .857 0 .857-1.143 3.428C5.43 15.143 4.977 16 4.977 16h.412s.516-.108.863-.506l1.75-2.065z"
                      ></path>
                    </g>
                  </svg>
                  <div className={styles.dashedFlight}></div>
                  <div className={styles.typeFlight}>
                    <span>Economy</span>
                  </div>
                </div>
              </Col>
              <Col xs={9} sm={4} md={4} lg={4} xl={4}>
                <div className={styles.destination}>
                  <div className={styles.textDestination}>TBS</div>
                  <div className={styles.timeDestination}>17:00</div>
                </div>
              </Col>
            </Row>
          </div>
        </div> */}
      </div>
      <div className={styles.detailsAside}>
        <div className={styles.subject}>
          <span>{t("price-details")}</span>
          <ModalFlightDetailsCancel rules={flight.rules} />
        </div>
        <div className={styles.contentDetailsAside}>
          {flight.segment.airItineraryPricingInfo.fareBreakdown.map(
            (item, index) => (
              <div className={styles.passengerDetails} key={index}>
                <span>
                  {item.passengerTypeQuantity.code === "ADT" && t("adult")}{" "}
                  {item.passengerTypeQuantity.code === "CHD" && t("child")}{" "}
                  {item.passengerTypeQuantity.code === "INF" && t("infant")}{" "}
                  {item.passengerTypeQuantity.quantity} {t("individual")}
                </span>
                <b>
                  {item.passengerFare.totalFare} {t("rial")}
                </b>
              </div>
            )
          )}

          <div className={styles.pricePay}>
            <span>{t("price-pay")}</span>
            <b>
              {flight.totalFare} {t("rial")}
            </b>
          </div>
        </div>
      </div>
      {!props.hiddenSubmit ? (
        <div className={styles.btnContent}>
          <div>
            <Button htmlType="submit"
              className={`${process.env.THEME_NAME === "TRAVELO" && styles.btnFlightForeignTravelo}`}
            >
              <span className={styles.btnText}>{t("complete-reserve-and-get-confirmation")}</span>
              {!props.loading ? <ArrowRightIcon /> : <LoadingOutlined spin />}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

AsideCheckout.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

AsideCheckout.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(AsideCheckout);
