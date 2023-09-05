import React from "react";
import PropTypes from "prop-types";
import { Link, i18n, withTranslation } from "../../../../i18n";
import { Col, Row } from "antd";
import AnimatedShowMore from "react-animated-show-more";
import { EditIcon } from "../../UI/Icons";
import { FlightDepartureIcon, FlightReturnIcon } from "../../UI/Icons";

import styles from "../../../styles/Home.module.css";
import ModalFlightDetails from "./ModalFlightDetails";

class AsideBooking extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <>
        <div className={styles.asidePayment}>
          <div
            className={`${styles.bookingSummary} ${
              process.env.THEME_NAME === "TRAVELO" &&
              styles.bookingSummaryTravelo
            }`}
          >
            <h4 className={styles.subjectBookingSummary}>
              {t("flight-details")}
            </h4>
            <div className={styles.flightBookingSummary}>
              <div className={styles.subjectFlightSummary}>
                <span>{t("flight-information")}</span>
                <ModalFlightDetails />
              </div>
              <div className={styles.contentFlightSummary}>
                <div className={styles.flightSelected}>
                  <div className={styles.date}>
                    <FlightDepartureIcon />
                    {t("departure-flight")}
                  </div>
                  <div className={styles.contentFlightSelected}>
                    <Row>
                      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <div className={styles.airLine}>
                          <img src="https://cdn2.safaraneh.com/images/flights/ji.png" />
                          <span>ایران ایر</span>
                        </div>
                      </Col>
                      <Col xs={9} sm={4} md={4} lg={4} xl={6}>
                        <div className={styles.origin}>
                          <div className={styles.textOrigin}>تهران</div>
                          <div className={styles.timeOrigin}>14:30</div>
                        </div>
                      </Col>
                      <Col xs={6} sm={12} md={12} lg={12} xl={12}>
                        <div className={styles.symbolFlight}>
                          <div className={styles.airlineType}>Airbus</div>
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
                            <span>{t("charter")}</span>
                          </div>
                        </div>
                      </Col>
                      <Col xs={9} sm={4} md={4} lg={4} xl={6}>
                        <div className={styles.destination}>
                          <div className={styles.textDestination}>شیراز</div>
                          <div className={styles.timeDestination}>17:00</div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
              <div className={styles.contentFlightSummary}>
                <div className={styles.flightSelected}>
                  <div className={styles.date}>
                    <FlightReturnIcon />
                    {t("arrival-flight")}
                  </div>
                  <div className={styles.contentFlightSelected}>
                    <Row>
                      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <div className={styles.airLine}>
                          <img src="https://cdn2.safaraneh.com/images/flights/ji.png" />
                          <span>ایران ایر</span>
                        </div>
                      </Col>
                      <Col xs={9} sm={4} md={4} lg={4} xl={6}>
                        <div className={styles.origin}>
                          <div className={styles.textOrigin}>شیراز</div>
                          <div className={styles.timeOrigin}>14:30</div>
                        </div>
                      </Col>
                      <Col xs={6} sm={12} md={12} lg={12} xl={12}>
                        <div className={styles.symbolFlight}>
                          <div className={styles.airlineType}>Airbus</div>
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
                            <span>{t("charter")}</span>
                          </div>
                        </div>
                      </Col>
                      <Col xs={9} sm={4} md={4} lg={4} xl={6}>
                        <div className={styles.destination}>
                          <div className={styles.textDestination}>تهران</div>
                          <div className={styles.timeDestination}>17:00</div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.flightPriceSummary}>
              <div className={styles.subjectPricetSummary}>
                <span>{t("price-details")}</span>
              </div>
              <div className={styles.contentPricetSummary}>
                <div className={styles.passengerDetails}>
                  <span>
                    {t("adult")} ۲ {t("individual")}
                  </span>
                  <b>۱۲.۰۰۰.۰۰۰ {t("rial")}</b>
                </div>
                <div className={styles.passengerDetails}>
                  <span>
                    {t("child")} ۱ {t("individual")}
                  </span>
                  <b>۳.۰۰۰.۰۰۰ {t("rial")}</b>
                </div>
                <div className={styles.passengerDetails}>
                  <span>
                    {t("infant")} ۱ {t("individual")}
                  </span>
                  <b>۱.۰۰۰.۰۰۰ {t("rial")}</b>
                </div>
              </div>
            </div>

            <div className={styles.vatSummary}>
              <Row>
                <Col span={12}>
                  <div className={styles.subjectVatSummary}>
                    <span>{t("total")}</span>
                  </div>
                </Col>
                <Col span={12}>
                  <div className={styles.contentVatSummary}>
                    <span>2.000.000 {t("rial")}</span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <div className={styles.subjectVatSummary}>
                    <span> {t("site-discount")}</span>
                  </div>
                </Col>
                <Col span={12}>
                  <div className={styles.contentVatSummary}>
                    <span>2.000.000 {t("rial")}</span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <div className={styles.subjectVatSummaryResult}>
                    <span>{t("price-pay")}</span>
                  </div>
                </Col>
                <Col span={12}>
                  <div className={styles.contentVatSummaryResult}>
                    <span>2.000.000 {t("rial")}</span>
                  </div>
                </Col>
              </Row>
            </div>
          </div>

          <div className={styles.bookingNeedHelp}>
            <h4 className={styles.subjectBookingNeedHelp}>{t("need-help")}</h4>
            <div className={styles.contentBookingNeedHelp}>
              <span>{t("24hours-backup")}</span>
              <a href="tel:+982179515000"> 02179515000 </a>
              <a href="mailto:support@safaraneh.com"> support@safaraneh.com </a>
            </div>
          </div>
          <div className={styles.alertSuccess}>
            <h6>{t("price-will-increase")}</h6>
            <span>{t("price-will-increase-desc")}</span>
          </div>
        </div>
      </>
    );
  }
}

AsideBooking.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

AsideBooking.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(AsideBooking);
