import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { i18n, withTranslation } from "../../../../../../i18n";
import { Modal, Button, Form, Item, Input, Tabs, Collapse } from "antd";

import styles from "../../../../../styles/Flight.module.css";
import {
  FlightDepartureIcon,
  ArrowLeftIcon,
  FlightReturnIcon,
  InfoIcon,
  VerticalBaggageIcon,
  HorizontalBaggageIcon,
} from "../../../../UI/Icons";
import FlightDetail from "./FlightDetail";
import { ClockCircleOutlined } from "@ant-design/icons";
import Time from "../../../../UI/Time/Time";
import TimeString from "../../../../UI/TimeString/TimeString";
import PriceFormat from "../../../../UI/PriceFormat/PriceFormat";
import { FetchRulles } from "../../../../../actions/flight/Flight";

const { TabPane } = Tabs;
const { Panel } = Collapse;

class DetailModal extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.props.FetchRulles(this.props.flight.flightKey);
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { t, info } = this.props;
    return (
      <>
        {info.map((segments, idx) => (
          <React.Fragment key={`flightSegments${idx}`}>
            <div className={styles.paxHeader}>
              <div>
                <div className={styles.directionFlight}>
                  <FlightDepartureIcon />
                </div>
                <div className={styles.departureDetails}>
                  {t("departure-flight-text")} :
                  <b>
                    {
                      segments.flightSegments[
                        segments.flightSegments.length - 1
                      ].arrivalAirport.cityName
                    }
                  </b>
                  <ArrowLeftIcon />
                  <b>{segments.flightSegments[0].departureAirport.cityName}</b>
                </div>
              </div>
              <div className={styles.durationTime}>
                <span>مدت زمان پرواز :</span>
                <b>
                  {" "}
                  <TimeString time={info[0].journeyDuration} />
                </b>
              </div>
            </div>
            <div className={styles.paxContent}>
              {segments.flightSegments.map((segment, index) => (
                <React.Fragment key={index}>
                  <div className={styles.flightUpDetail}>
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
                            {/* AI-1965 */}
                            {segment.marketingAirline.code}
                          </div>
                          {/* <div className={styles.airlineText}>
                                      AIRBUS - A321
                                    </div> */}
                          <div className={styles.airlineText}>
                            {segment.cabinClass.name}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.infoOrigin}>
                      <div className={styles.departureTimeLabel}>
                        <span className={styles.arrivalAirportLabel}>
                          {segment.departureAirport.code}
                        </span>
                        <span>
                          <Time date={segment.departureDateTime} />
                        </span>
                      </div>
                      <div className={styles.departureDateLabel}>
                        شنبه، ۱ دی
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
                          Terminal {segment.departureAirport.terminalId}
                        </div>
                      )}
                    </div>
                    <div className={styles.infoDestination}>
                      <div className={styles.departureTimeLabel}>
                        <span className={styles.arrivalAirportLabel}>
                          {segment.arrivalAirport.code}
                        </span>
                        <span>
                          <Time date={segment.arrivalDateTime} />
                        </span>
                      </div>
                      <div className={styles.departureDateLabel}>
                        شنبه، ۱ دی
                      </div>
                      <div className={styles.airportLabel}>
                        {segment.arrivalAirport.name}
                      </div>
                      <div className={styles.airportLabel}>
                        {segment.arrivalAirport.countryName},{" "}
                        {segment.arrivalAirport.cityName}
                      </div>

                      {segment.arrivalAirport.terminalId && (
                        <div className={styles.airportLabel}>
                          Terminal {segment.arrivalAirport.terminalId}
                        </div>
                      )}
                    </div>
                    <div className={styles.infoTime}>
                      <b>
                        {" "}
                        <TimeString time={segment.flightDuration} />{" "}
                      </b>
                    </div>
                  </div>
                  {segment.stopTime !== "00:00:00" && (
                    <div className={styles.alertBoxTime}>
                      <div className={styles.content}>
                        <ClockCircleOutlined />
                        <b>تغییر ترمینال : </b>
                        <span>
                          شما باید به ترمینال{" "}
                          <b>{segment.arrivalAirport.code}</b> مراجعه کنید
                        </span>
                      </div>
                      <div className={styles.durationTime}>
                        {/* ۴ ساعت و ۱۰ دقیقه */}
                        زمان انتظار
                        <TimeString time={segment.stopTime} />
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}

              {/*
                    <div className={styles.flightUpDetail}>
                      <div className={styles.info}>
                        <div className={styles.contentInfo}>
                          <img src="https://tjwlcdn.com/img/air/KL.png" />
                          <div>
                            <div className={styles.airlineText}>Air India</div>
                            <div className={styles.airlineText}>AI-1965</div>
                            <div className={styles.airlineText}>
                              AIRBUS - A321
                            </div>
                            <div className={styles.airlineText}>
                              Economy class
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.infoOrigin}>
                        <div className={styles.departureTimeLabel}>
                          <span className={styles.arrivalAirportLabel}>
                            DEL
                          </span>
                          <span>20:45</span>
                        </div>
                        <div className={styles.departureDateLabel}>
                          شنبه، ۱ دی
                        </div>
                        <div className={styles.airportLabel}>
                          Indira Gandhi International Airport
                        </div>
                        <div className={styles.airportLabel}>
                          New Delhi, India
                        </div>
                        <div className={styles.airportLabel}>Terminal 3</div>
                      </div>
                      <div className={styles.infoDestination}>
                        <div className={styles.departureTimeLabel}>
                          <span className={styles.arrivalAirportLabel}>
                            DXB
                          </span>
                          <span>23:00</span>
                        </div>
                        <div className={styles.departureDateLabel}>
                          شنبه، ۱ دی
                        </div>
                        <div className={styles.airportLabel}>
                          Dubai International Airport
                        </div>
                        <div className={styles.airportLabel}>
                          Dubai, United Arab Emirates
                        </div>
                        <div className={styles.airportLabel}>Terminal 2</div>
                      </div>
                      <div className={styles.infoTime}>
                        <b> ۱۱ ساعت و ۱۰ دقیقه </b>
                      </div>
                    </div>

                    <div className={styles.alertBoxFlight}>
                      <div>
                        <FlightReturnIcon />
                        <b>فرودگاه ورود : </b>
                        <span>
                          این سفر به <b> LCY </b> لندن ، انگلستان می رسد
                        </span>
                      </div>
                    </div>
                   */}
            </div>
          </React.Fragment>
        ))}
      </>
    );
  }
}

DetailModal.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

DetailModal.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProp = (state) => {
  return {
    rulles: state.flightForeign.rulles,
    loadingRulles: state.flightForeign.loadingRulles,
  };
};

const mapDispatchToProp = (dispatch) => ({
  clearFilter: () => dispatch(clearFilter()),
  FetchRulles: (d) => dispatch(FetchRulles(d)),
});

export default withTranslation("common")(
  connect(mapStateToProp, mapDispatchToProp)(DetailModal)
);
