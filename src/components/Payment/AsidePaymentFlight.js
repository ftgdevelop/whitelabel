import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, i18n, withTranslation } from "../../../i18n";
import { useRouter } from "next/router";
import { Col, Row, notification } from "antd";
import AnimatedShowMore from "react-animated-show-more";
import { EditIcon } from "../UI/Icons";
import { FlightDepartureIcon, FlightReturnIcon } from "../UI/Icons";
import { LoadingOutlined } from "@ant-design/icons";

import styles from "../../styles/Home.module.css";
import ModalFlightDetails from "./ModalFlightDetails";
import DatePersion from "../UI/DatePersion/DatePersion";
import Time from "../UI/Time/Time";
import { getReserve } from "../../actions";

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

const AsidePayment = (props) => {
  const [flights, setFlights] = useState(props.flights);
  const [price, setPrice] = useState(props.price);
  const [flightsList, setFlightsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { t, hiddenTitle, hiddenOffPrice } = props;
  const reserveId = router.query.reserveId;
  const username = router.query.username;

  useEffect(() => {
    const getData = async () => {
      const res = await getReserve(reserveId, username);
      if (res.status == 200) {
        const data = res.data.result;
        setFlights(res.data.result);
        setPrice(
          data.adultTotalPrice + data.childTotalPrice + data.infantTotalPrice
        );
        props.getPrice(
          data.adultTotalPrice + data.childTotalPrice + data.infantTotalPrice
        );
        if (data.returnFlight) {
          setFlightsList(["departureFlight", "returnFlight"]);
        } else {
          setFlightsList(["departureFlight"]);
        }
      } else {
        openNotification("error", "bottomRight", res.data.error.message);
      }
      setLoading(false);
    };

    if (!props.flights) {
      getData();
    } else {
      if (props.flights.returnFlight) {
        setFlightsList(["departureFlight", "returnFlight"]);
      } else {
        setFlightsList(["departureFlight"]);
      }
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setPrice(props.price);
  }, [props.price]);

  function numberWithCommas(x) {
    return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x;
  }

  return (
    <>
      <div
        className={`${styles.asidePayment} ${
          process.env.THEME_NAME === "TRAVELO" && styles.asidePaymentTravelo
        }`}
      >
        <div
          className={`${styles.bookingSummary} ${
            process.env.THEME_NAME === "TRAVELO" && styles.bookingSummaryTravelo
          }`}
        >
          {!hiddenTitle ? (
            <h4 className={styles.subjectBookingSummary}>
              {t("flight-details")}
            </h4>
          ) : (
            ""
          )}
          <div className={styles.flightBookingSummary}>
            <div className={styles.subjectFlightSummary}>
              <span>{t("flight-information")}</span>
              {flights ? <ModalFlightDetails flights={flights} /> : ""}
            </div>
            {!loading ? (
              flightsList.map((item, index) => (
                <div className={styles.contentFlightSummary} key={index}>
                  {flights ? (
                    <div className={styles.flightSelected}>
                      <div className={styles.date}>
                        <FlightDepartureIcon />
                        {item === "departureFlight"
                          ? t("departure-flight") + ":"
                          : t("arrival-flight") + ":"}

                        <DatePersion date={flights[item].departureTime} />
                      </div>
                      <div className={styles.contentFlightSelected}>
                        <Row>
                          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <div className={styles.airLine}>
                              <img
                                src={flights[item].airline.picture.path}
                                alt={flights[item].airline.picture.altAttribute}
                              />
                              <span>{flights[item].airline.name}</span>
                            </div>
                          </Col>
                          <Col xs={9} sm={4} md={4} lg={4} xl={6}>
                            <div className={styles.origin}>
                              <div className={styles.textOrigin}>
                                {flights[item].departureAirport.city.name}
                              </div>
                              <div className={styles.timeOrigin}>
                                <Time date={flights[item].departureTime} />
                              </div>
                            </div>
                          </Col>
                          <Col xs={6} sm={12} md={12} lg={12} xl={12}>
                            <div className={styles.symbolFlight}>
                              <div className={styles.airlineType}>
                                {flights[item].airCraft.manufacturer}
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
                                <span>
                                  {flights[item].flightType === "System"
                                    ? t("system")
                                    : t("charter")}
                                </span>
                              </div>
                            </div>
                          </Col>
                          <Col xs={9} sm={4} md={4} lg={4} xl={6}>
                            <div className={styles.destination}>
                              <div className={styles.textDestination}>
                                {flights[item].arrivalAirport.city.name}
                              </div>
                              <div className={styles.timeDestination}>
                                <Time date={flights[item].arrivalTime} />
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ))
            ) : (
              <LoadingOutlined />
            )}
          </div>
          {flights ? (
            <div className={styles.flightPriceSummary}>
              <div className={styles.subjectPricetSummary}>
                <span>{t("flight-details")}</span>
              </div>
              <div className={styles.contentPricetSummary}>
                {flights.adultCount ? (
                  <div className={styles.passengerDetails}>
                    <span>
                      {t("adult")} {flights.adultCount} {t("invidiual")}
                    </span>
                    <b>
                      {numberWithCommas(flights.adultTotalPrice)} {t("rial")}
                    </b>
                  </div>
                ) : (
                  ""
                )}
                {flights.childCount ? (
                  <div className={styles.passengerDetails}>
                    <span>
                      {t("child")} {flights.childCount} {t("invidiual")}
                    </span>
                    <b>
                      {numberWithCommas(flights.childTotalPrice)} {t("rial")}
                    </b>
                  </div>
                ) : (
                  ""
                )}
                {flights.infantCount ? (
                  <div className={styles.passengerDetails}>
                    <span>
                      {t("infant")} {flights.infantCount} {t("invidiual")}
                    </span>
                    <b>
                      {numberWithCommas(flights.infantTotalPrice)} {t("rial")}
                    </b>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            ""
          )}
          <div className={styles.vatSummary}>
            <Row>
              <Col span={12}>
                <div className={styles.subjectVatSummary}>
                  <span>{t("total")}</span>
                </div>
              </Col>
              <Col span={12}>
                <div className={styles.contentVatSummary}>
                  <span>
                    {numberWithCommas(price)} {t("rial")}
                  </span>
                </div>
              </Col>
            </Row>
            {/* {!hiddenOffPrice ? (
              <Row>
                <Col span={12}>
                  <div className={styles.subjectVatSummary}>
                    <span> تخفیف سایت</span>
                  </div>
                </Col>
                <Col span={12}>
                  <div className={styles.contentVatSummary}>
                    <span>0 ریال</span>
                  </div>
                </Col>
              </Row>
            ) : (
              ""
            )} */}
            {!hiddenOffPrice ? (
              <Row>
                <Col span={12}>
                  <div className={styles.subjectVatSummaryResult}>
                    <span>{t("paid-price")}</span>
                  </div>
                </Col>
                <Col span={12}>
                  <div className={styles.contentVatSummaryResult}>
                    <span>
                      {numberWithCommas(price)} {t("rial")}
                    </span>
                  </div>
                </Col>
              </Row>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={styles.paymentService}>
          <div className={styles.contentService}>
            <div className={styles.imageService}>
              <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNiIgdmlld0JveD0iMCAwIDI0IDI2Ij4KICAgIDxwYXRoIGZpbGw9IiMxREFDMDgiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTExLjA1OC4xODhjLjM4Ni0uMjUgMS40OTgtLjI1IDEuODg0IDAgMy4zOSAyLjE5NyA2LjQ1IDMuMzM0IDkuNjc1IDMuNTMuOTUxLjA0IDEuMzY1LjQ3MSAxLjM2NSAxLjM3NCAwIC41NjkuMDQxIDYuNTUgMCA4LjcwOCAwIC43NDUtLjA4MyAxLjUzLS4yOSAyLjMxNS0uNDU1IDEuODA0LTEuNDQ3IDMuNDktMy4xIDUuMDYtMi4xMSAyLTguMzk0IDQuODI1LTguNjI0IDQuODI1LS4xNjYgMC02LjQ1LTIuODI0LTguNTYtNC44MjUtMS42NTMtMS41Ny0yLjY0NS0zLjI1Ni0zLjEtNS4wNmE5LjA4OSA5LjA4OSAwIDAgMS0uMjktMi4zMTVjLS4wNDEtMi4xNTcgMC04LjEzOSAwLTguNzA4IDAtLjkwMy40MTQtMS4zMzQgMS4zNjUtMS4zNzMgMy4yMjUtLjE5NyA2LjI4NS0xLjMzNCA5LjY3NS0zLjUzMXpNOS41MTEgMTYuOTM5Yy41NC41MjYgMS40MTQuNTI2IDEuOTU0IDBsNi4xMy01Ljk3NGMuNTQtLjUyNi41NC0xLjM3OCAwLTEuOTA0YTEuNDA3IDEuNDA3IDAgMCAwLTEuOTU0IDBsLTUuMTM5IDUuMDM2LTIuMTQzLTIuMDlhMS40MDcgMS40MDcgMCAwIDAtMS45NTQgMCAxLjMyMiAxLjMyMiAwIDAgMCAwIDEuOTA1bDMuMTA2IDMuMDI3eiIvPgo8L3N2Zz4K" />
            </div>
            <div>
              <strong>{t("safe-100%")}</strong>
              <span>{t("we-use-ssl")}</span>
            </div>
          </div>
          <hr />
          <div className={styles.contentService}>
            <div className={styles.imageService}>
              <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAiIGhlaWdodD0iMjYiIHZpZXdCb3g9IjAgMCAyMCAyNiI+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBpZD0iYSIgZD0iTTc2LjMzMyAxNzEuMzc1di0zLjI1YzAtNC40ODgtMy43My04LjEyNS04LjMzMy04LjEyNXMtOC4zMzMgMy42MzctOC4zMzMgOC4xMjV2My4yNWMtLjkyMiAwLTEuNjY3LjcyNi0xLjY2NyAxLjYyNXYxMS4zNzVjMCAuODk5Ljc0NSAxLjYyNSAxLjY2NyAxLjYyNWgxNi42NjZjLjkyMiAwIDEuNjY3LS43MjYgMS42NjctMS42MjVWMTczYzAtLjg5OS0uNzQ1LTEuNjI1LTEuNjY3LTEuNjI1ek02OCAxNjMuMjVjMi43NTcgMCA1IDIuMTg3IDUgNC44NzV2My4yNUg2M3YtMy4yNWMwLTIuNjg4IDIuMjQzLTQuODc1IDUtNC44NzV6bS0yLjMzMiAxOC4wOGwtMi4zNi0yLjE4M2EuOTIuOTIgMCAwIDEgMC0xLjM3M2MuNDEtLjM4IDEuMDc0LS4zOCAxLjQ4NCAwbDEuNjMgMS41MDcgMy45MDUtMy42MzNjLjQxLS4zOCAxLjA3NS0uMzggMS40ODUgMGEuOTIuOTIgMCAwIDEgMCAxLjM3M2wtNC42NTkgNC4zMWMtLjQxLjM3OS0xLjA3NS4zNzktMS40ODUgMHoiLz4KICAgIDwvZGVmcz4KICAgIDx1c2UgZmlsbD0iIzFEQUMwOCIgZmlsbC1ydWxlPSJub256ZXJvIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNTggLTE2MCkiIHhsaW5rOmhyZWY9IiNhIi8+Cjwvc3ZnPgo=" />
            </div>
            <div>
              <strong>{t("bank-operation")}</strong>
              <span>{t("we-dont-save-cart-info")}</span>
            </div>
          </div>
        </div>

        <div className={styles.alertSuccess}>
          <h6>{t("price-increase")}</h6>
          <span>{t("reserve-today")}</span>
        </div>
      </div>
    </>
  );
};

AsidePayment.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

AsidePayment.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(AsidePayment);
