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
import PriceFormat from "../../../../UI/PriceFormat/PriceFormat";
import DetailModal from "./DetailModal";
import { FetchRulles } from "../../../../../actions/flight/Flight";

const { TabPane } = Tabs;
const { Panel } = Collapse;

class ModalFlightDetail extends React.Component {
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
    const { t, flight } = this.props;
    const info = this.props.flight.airItinerary.originDestinationOptions;

    return (
      <div className={styles.modalFlightDetails}>
        <a className={styles.btnFlightDetails} onClick={this.showModal}>
          {t("flight-details")}
        </a>
        <Modal
          title={null}
          open={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          width={1000}
        >
          <div className={styles.contentModalFlightDetails}>
            <div
              className={`${styles.flightCard} ${styles.flightCardForeign} ${styles.flightCardModal}`}
            >
              <FlightDetail
                flight={flight}
                selectedFlight={this.props.selectFlight}
                loading={this.props.loading}
              />
            </div>
            <div className={styles.tabModalFlightForeign}>
              <Tabs defaultActiveKey="1" className="ant-tabs-flight-foreign">
                <TabPane tab="برنامه سفر" key="1">
                  <DetailModal info={info} />
                  {/* <div className={styles.paxHeader}>
                    <div>
                      <div className={styles.directionFlight}>
                        <FlightReturnIcon />
                      </div>
                      <div className={styles.departureDetails}>
                        {t("arrival-flight-text")} :<b>London</b>
                        <ArrowLeftIcon />
                        <b>New Delhi</b>
                      </div>
                    </div>
                    <div className={styles.durationTime}>
                      <span>مدت زمان پرواز :</span>
                      <b> ۱۱ ساعت و ۲۰ دقیقه </b>
                    </div>
                  </div>
                  <div className={styles.paxContent}>
                    <div className={styles.alertBoxFlight}>
                      <div>
                        <FlightDepartureIcon />
                        <b>فرودگاه خروج : </b>
                        <span>
                          این سفر به <b> LHR </b> لندن ، انگلستان می رسد
                        </span>
                      </div>
                    </div>

                    <div className={styles.flightUpDetail}>
                      <div className={styles.info}>
                        <div className={styles.contentInfo}>
                          <img src="https://tjwlcdn.com/img/air/AI.png" />
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
                  </div>
                 */}
                </TabPane>
                <TabPane tab="اطلاعات چمدان" key="2">
                  <div className={styles.baggageInfo}>
                    <div>
                      {info.map((segments, idx) => (
                        <div className={styles.summaryBaggageInfo} key={idx}>
                          <div className={styles.head}>
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
                              <b>
                                {
                                  segments.flightSegments[0].departureAirport
                                    .cityName
                                }
                              </b>
                            </div>
                          </div>
                          <div className={styles.content}>
                            <div className={styles.cabinBaggage}>
                              <div>
                                <VerticalBaggageIcon />
                                <span>چمدان کابین</span>
                              </div>
                              <div>
                                {
                                  segments.flightSegments[0].handBags[0]
                                    .handBagAllowance
                                }{" "}
                                {
                                  segments.flightSegments[0].handBags[0]
                                    .unitType
                                }
                                {/* (حداکثر 1 کیف) */}
                              </div>
                            </div>
                            <div className={styles.cabinBaggage}>
                              <div>
                                <HorizontalBaggageIcon />
                                <span>بار چمدان </span>
                              </div>
                              <div>
                                {
                                  segments.flightSegments[0].baggages[0]
                                    .baggageAllowance
                                }{" "}
                                {
                                  segments.flightSegments[0].baggages[0]
                                    .unitType
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className={styles.airlineBaggageInformation}>
                        <div className={styles.head}>
                          اطلاعات چمدان هواپیمایی
                        </div>
                        <div className={styles.content}>
                          <div className={styles.subject}>ابعاد چمدان</div>
                          <div className={styles.IconBaggage}>
                            <figure className={styles.propertyBaggage}>
                              <svg
                                focusable="false"
                                color="inherit"
                                fill="currentcolor"
                                aria-hidden="true"
                                role="presentation"
                                viewBox="0 0 91 102"
                                preserveAspectRatio="xMidYMid meet"
                                size="120"
                                width="100"
                                height="100"
                                className="sc-hMqMXs irGMpL"
                              >
                                <defs>
                                  <rect
                                    id="path-1"
                                    x="17.0454545"
                                    y="62.5690178"
                                    width="21.5909091"
                                    height="1"
                                  ></rect>
                                  <mask
                                    id="mask-2"
                                    maskContentUnits="userSpaceOnUse"
                                    maskUnits="objectBoundingBox"
                                    x="0"
                                    y="0"
                                    width="21.5909091"
                                    height="0.909090909"
                                    fill="white"
                                  ></mask>
                                </defs>
                                <g
                                  id="Page-1"
                                  stroke="none"
                                  strokeWidth="1"
                                  fill="none"
                                  fillRule="evenodd"
                                >
                                  <g
                                    id="icon_cabin_tjw"
                                    transform="translate(-0.166085, 0.000000)"
                                  >
                                    <g
                                      id="Alm"
                                      transform="translate(25.166085, 0.000000)"
                                    >
                                      <rect
                                        id="Rectangle"
                                        stroke="#3665AC"
                                        strokeWidth="0.909090909"
                                        fill="#FFFFFF"
                                        x="0.454545455"
                                        y="19.4602988"
                                        width="55.1307597"
                                        height="66.1363636"
                                        rx="4.3357718"
                                      ></rect>
                                      <rect
                                        id="Rectangle-Copy-12"
                                        fill="#E0E8F6"
                                        x="6.47807338"
                                        y="33.3063856"
                                        width="1.704545"
                                        height="36.5"
                                        rx="0.8522725"
                                      ></rect>
                                      <rect
                                        id="Rectangle-Copy-8"
                                        fill="#AFC1DE"
                                        x="5.68708249"
                                        y="32.7751984"
                                        width="1.704545"
                                        height="37.5"
                                        rx="0.8522725"
                                      ></rect>
                                      <rect
                                        id="Rectangle-Copy-12"
                                        fill="#E0E8F6"
                                        x="16.8429201"
                                        y="33.3704044"
                                        width="1.70454545"
                                        height="36.5"
                                        rx="0.852272727"
                                      ></rect>
                                      <rect
                                        id="Rectangle-Copy-8"
                                        fill="#AFC1DE"
                                        x="16.0519292"
                                        y="32.8392172"
                                        width="1.70454545"
                                        height="37.5"
                                        rx="0.852272727"
                                      ></rect>
                                      <rect
                                        id="Rectangle-Copy-12"
                                        fill="#E0E8F6"
                                        x="27.4780734"
                                        y="33.3063856"
                                        width="1.70454545"
                                        height="36.5"
                                        rx="0.852272727"
                                      ></rect>
                                      <rect
                                        id="Rectangle-Copy-8"
                                        fill="#AFC1DE"
                                        x="26.6870825"
                                        y="32.7751984"
                                        width="1.70454545"
                                        height="37.5"
                                        rx="0.852272727"
                                      ></rect>
                                      <rect
                                        id="Rectangle-Copy-12"
                                        fill="#E0E8F6"
                                        x="38.4651532"
                                        y="33.661352"
                                        width="1.70454545"
                                        height="36.5"
                                        rx="0.852272727"
                                      ></rect>
                                      <rect
                                        id="Rectangle-Copy-8"
                                        fill="#AFC1DE"
                                        x="37.6741623"
                                        y="33.1301648"
                                        width="1.70454545"
                                        height="37.5"
                                        rx="0.852272727"
                                      ></rect>
                                      <rect
                                        id="Rectangle-Copy-12"
                                        fill="#E0E8F6"
                                        x="48.4780734"
                                        y="33.3063856"
                                        width="1.70454545"
                                        height="36.5"
                                        rx="0.852272727"
                                      ></rect>
                                      <rect
                                        id="Rectangle-Copy-8"
                                        fill="#AFC1DE"
                                        x="47.6870825"
                                        y="32.7751984"
                                        width="1.70454545"
                                        height="37.5"
                                        rx="0.852272727"
                                      ></rect>
                                      <rect
                                        id="Rectangle-Copy-16"
                                        stroke="#5992E8"
                                        strokeWidth="2.27272727"
                                        x="18.1818182"
                                        y="2.13636364"
                                        width="20.4545455"
                                        height="17.7272727"
                                        rx="4.3357718"
                                      ></rect>
                                      <path
                                        d="M38.8460464,54.5454545 C39.9178174,54.5454545 40.888124,54.9798756 41.5904878,55.6822394 C42.2928517,56.3846032 42.7272727,57.3549098 42.7272727,58.4266809 L42.7272727,58.4266809 L42.7272727,75.2272727 L14.0909091,75.2272727 L14.0909091,58.4266809 C14.0909091,57.3549098 14.5253301,56.3846032 15.227694,55.6822394 C15.9300578,54.9798756 16.9003644,54.5454545 17.9721354,54.5454545 L17.9721354,54.5454545 Z"
                                        id="Combined-Shape"
                                        stroke="#3665AC"
                                        strokeWidth="0.909090909"
                                        fill="#FFFFFF"
                                      ></path>
                                      <path
                                        d="M55.5853051,73.4984379 L55.5853051,81.7154361 C55.5853051,82.7872071 55.150884,83.7575137 54.4485202,84.4598775 C53.7461564,85.1622414 52.7758498,85.5966624 51.7040788,85.5966624 L51.7040788,85.5966624 L4.3357718,85.5966624 C3.26400074,85.5966624 2.29369415,85.1622414 1.59133033,84.4598775 C0.888966511,83.7575137 0.454545455,82.7872071 0.454545455,81.7154361 L0.454545455,81.7154361 L0.454545455,73.4984379 L55.5853051,73.4984379 Z"
                                        id="Rectangle-Copy-14"
                                        stroke="#3665AC"
                                        strokeWidth="0.909090909"
                                        fill="#EAEFF6"
                                      ></path>
                                      <path
                                        d="M55.5853051,19.3181818 L55.5853051,24.7551373 C55.5853051,25.8269083 55.150884,26.7972149 54.4485202,27.4995788 C53.7461564,28.2019426 52.7758498,28.6363636 51.7040788,28.6363636 L51.7040788,28.6363636 L4.3357718,28.6363636 C3.26400074,28.6363636 2.29369415,28.2019426 1.59133033,27.4995788 C0.888966511,26.7972149 0.454545455,25.8269083 0.454545455,24.7551373 L0.454545455,24.7551373 L0.454545455,19.3181818 L55.5853051,19.3181818 Z"
                                        id="Rectangle-Copy-15"
                                        stroke="#3665AC"
                                        strokeWidth="0.909090909"
                                        fill="#EAEFF6"
                                        transform="translate(28.019925, 23.977273) rotate(-180.000000) translate(-28.019925, -23.977273) "
                                      ></path>
                                      <ellipse
                                        id="shadow"
                                        fill="#EAEFF6"
                                        transform="translate(27.600000, 94.000000) scale(1, -1) translate(-27.600000, -94.000000) "
                                        cx="27.6"
                                        cy="94"
                                        rx="24.6"
                                        ry="2"
                                      ></ellipse>
                                      <ellipse
                                        id="Oval"
                                        fill="#3665AC"
                                        cx="16.1918079"
                                        cy="89.8470209"
                                        rx="4.54545455"
                                        ry="4.57183049"
                                      ></ellipse>
                                      <ellipse
                                        id="Oval-Copy"
                                        fill="#3665AC"
                                        cx="40.6050659"
                                        cy="89.8470209"
                                        rx="4.54545455"
                                        ry="4.57183049"
                                      ></ellipse>
                                      <circle
                                        id="Oval"
                                        fill="#FFFFFF"
                                        cx="16.1272511"
                                        cy="89.8329994"
                                        r="2.27272727"
                                      ></circle>
                                      <circle
                                        id="Oval-Copy-2"
                                        fill="#FFFFFF"
                                        cx="40.5965113"
                                        cy="89.9304281"
                                        r="2.27272727"
                                      ></circle>
                                      <path
                                        d="M41.5584416,4.54545455 L15.2597403,4.54545455 C13.1071808,4.54545455 11.3636364,3.52783196 11.3636364,2.27272727 C11.3636364,1.01762244 13.1071808,2.27373675e-13 15.2597403,2.27373675e-13 L41.5584416,2.27373675e-13 C43.7100496,2.27373675e-13 45.4545455,1.01762244 45.4545455,2.27272727 C45.4545455,3.52783196 43.7100496,4.54545455 41.5584416,4.54545455 Z"
                                        id="Path-Copy"
                                        fill="#3665AC"
                                        fillRule="nonzero"
                                      ></path>
                                      <path
                                        d="M22.2313042,18.8643793 L14.2313042,18.8643793 L14.2313042,15.8749886 C14.2313042,15.3173771 14.6628708,14.8643793 15.196204,14.8643793 L21.2664043,14.8643793 C21.7997375,14.8643793 22.2313042,15.3173771 22.2313042,15.8749886 L22.2313042,18.8643793 Z"
                                        id="Path-Copy-2"
                                        fill="#3665AC"
                                        fillRule="nonzero"
                                      ></path>
                                      <path
                                        d="M42.7694142,18.9135933 L34.7694142,18.9135933 L34.7694142,15.9242026 C34.7694142,15.3665911 35.2009809,14.9135933 35.7343141,14.9135933 L41.8045143,14.9135933 C42.3378475,14.9135933 42.7694142,15.3665911 42.7694142,15.9242026 L42.7694142,18.9135933 Z"
                                        id="Path-Copy-3"
                                        fill="#3665AC"
                                        fillRule="nonzero"
                                      ></path>
                                      <use
                                        id="Rectangle"
                                        stroke="#3665AC"
                                        mask="url(#mask-2)"
                                        strokeWidth="2.27272727"
                                        strokeDasharray="1.136363636363636"
                                      ></use>
                                      <path
                                        d="M37.511102,62.9520607 L36.8307967,64.9364438 C36.6272666,65.530121 36.9435433,66.1763852 37.5372205,66.3799153 C37.6558321,66.4205789 37.780356,66.4413313 37.9057443,66.4413313 L39.8901275,66.4413313 C40.5177238,66.4413313 41.0264911,65.932564 41.0264911,65.3049677 C41.0264911,65.0831765 40.9615871,64.8662334 40.8397808,64.6808836 L39.5357029,62.6965005 C39.1910308,62.1720215 38.4864446,62.0262591 37.9619656,62.3709312 C37.7514099,62.5093022 37.5928105,62.7137249 37.511102,62.9520607 Z"
                                        id="Path-4-Copy"
                                        fill="#E0E8F6"
                                        transform="translate(39.155786, 63.600422) rotate(-21.000000) translate(-39.155786, -63.600422) "
                                      ></path>
                                      <path
                                        d="M36.8732478,62.8152646 L36.1929425,64.7996477 C35.9894124,65.3933249 36.3056891,66.0395892 36.8993663,66.2431193 C37.0179779,66.2837829 37.1425018,66.3045353 37.2678902,66.3045353 L39.2522733,66.3045353 C39.8798696,66.3045353 40.3886369,65.7957679 40.3886369,65.1681716 C40.3886369,64.9463805 40.323733,64.7294373 40.2019266,64.5440876 L38.8978488,62.5597045 C38.5531767,62.0352254 37.8485904,61.8894631 37.3241114,62.2341352 C37.1135557,62.3725061 36.9549563,62.5769289 36.8732478,62.8152646 Z"
                                        id="Path-4-Copy"
                                        fill="#E64129"
                                        transform="translate(38.517932, 63.463626) rotate(-21.000000) translate(-38.517932, -63.463626) "
                                      ></path>
                                    </g>
                                    <g
                                      id="Group-3"
                                      transform="translate(86.166085, 15.000000)"
                                    >
                                      <polygon
                                        id="Triangle"
                                        fill="#C6CCCE"
                                        points="2 0 4 4 0 4"
                                      ></polygon>
                                      <polygon
                                        id="Triangle-Copy"
                                        fill="#C6CCCE"
                                        transform="translate(2.000000, 77.000000) scale(1, -1) translate(-2.000000, -77.000000) "
                                        points="2 75 4 79 0 79"
                                      ></polygon>
                                      <line
                                        x1="2.17102733"
                                        y1="6"
                                        x2="2.17102733"
                                        y2="73"
                                        id="Line-3"
                                        stroke="#97A1A6"
                                        strokeWidth="0.4"
                                        strokeLinecap="square"
                                        strokeDasharray="2"
                                      ></line>
                                    </g>
                                    <g
                                      id="Group-11"
                                      transform="translate(25.166085, 98.000000)"
                                    >
                                      <polygon
                                        id="Triangle"
                                        fill="#C6CCCE"
                                        transform="translate(2.000000, 2.000000) rotate(270.000000) translate(-2.000000, -2.000000) "
                                        points="2 0 4 4 0 4"
                                      ></polygon>
                                      <polygon
                                        id="Triangle-Copy"
                                        fill="#C6CCCE"
                                        transform="translate(54.000000, 2.000000) scale(1, -1) rotate(-270.000000) translate(-54.000000, -2.000000) "
                                        points="54 0 56 4 52 4"
                                      ></polygon>
                                      <line
                                        x1="6.54145709"
                                        y1="2.384113"
                                        x2="50.5414571"
                                        y2="2.384113"
                                        id="Line"
                                        stroke="#97A1A6"
                                        strokeWidth="0.4"
                                        strokeLinecap="square"
                                        strokeDasharray="2"
                                      ></line>
                                    </g>
                                    <g
                                      id="Group-12"
                                      transform="translate(14.000000, 90.469849) rotate(8.000000) translate(-14.000000, -90.469849) translate(3.000000, 81.469849)"
                                    >
                                      <polygon
                                        id="Triangle"
                                        fill="#C6CCCE"
                                        transform="translate(3.000000, 3.000000) rotate(304.000000) translate(-3.000000, -3.000000) "
                                        points="3 1 5 5 1 5"
                                      ></polygon>
                                      <polygon
                                        id="Triangle-Copy"
                                        fill="#C6CCCE"
                                        transform="translate(19.000000, 15.000000) scale(1, -1) rotate(-303.000000) translate(-19.000000, -15.000000) "
                                        points="19 13 21 17 17 17"
                                      ></polygon>
                                      <line
                                        x1="5.88043477"
                                        y1="5.06959374"
                                        x2="16.1258309"
                                        y2="13.0715846"
                                        id="Line-2"
                                        stroke="#97A1A6"
                                        strokeWidth="0.4"
                                        strokeLinecap="square"
                                        strokeDasharray="2"
                                      ></line>
                                    </g>
                                  </g>
                                </g>
                              </svg>
                              <span className={styles.size1}>55 cm</span>
                              <figcaption className={styles.size2}>
                                40 cm{" "}
                              </figcaption>
                              <figcaption className={styles.size3}>
                                20 cm
                              </figcaption>
                            </figure>
                            <span>چمدان کابین</span>
                          </div>
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
                            <span>چمدان کنترل شده</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabPane>
                <TabPane tab="لغو و تغییر" key="3">
                  <div className={styles.cancelChangeFlightForeign}>
                    {/* <div className={styles.alertInfo}>
                      <InfoIcon />
                      <span>
                        جزئیات لغو و تغییر از شرکت هواپیمایی قابل بازیابی نیست.
                        لطفاً برای کمک به شما در این پرواز با تیم پشتیبانی ما
                        تماس بگیرید.
                      </span>
                    </div> */}
                    <Collapse accordion>
                      {this.props.rulles && this.props.rulles.length
                        ? this.props.rulles.map((rule, index) => (
                            <Panel
                              header={rule.title}
                              key={index}
                              showArrow={false}
                              style={{ padding: "0px 15px" }}
                            >
                              <p>{rule.description}</p>
                            </Panel>
                          ))
                        : null}
                    </Collapse>
                  </div>
                </TabPane>
                <TabPane tab="جزئیات مبلغ" key="4">
                  <div className={styles.fareDetailsFlightForeign}>
                    <div className={styles.subject}>جزئیات مبلغ</div>
                    <ul>
                      <li>
                        <span>مبلغ</span>
                        <span>
                          <PriceFormat
                            price={
                              flight.airItineraryPricingInfo.totalFare.baseFare
                            }
                          />{" "}
                          ریال
                        </span>
                      </li>
                      <li>
                        <span>مالیات</span>
                        <span>
                          {" "}
                          {flight.airItineraryPricingInfo.totalFare &&
                          flight.airItineraryPricingInfo.totalFare.taxes &&
                          flight.airItineraryPricingInfo.totalFare.taxes
                            .length ? (
                            <PriceFormat
                              price={
                                flight.airItineraryPricingInfo.totalFare
                                  .taxes[0].amount
                              }
                            />
                          ) : (
                            0
                          )}{" "}
                          ریال
                        </span>
                      </li>
                      <li>
                        <span>تخفیف</span>
                        <span>0 ریال</span>
                      </li>
                    </ul>
                    <div className={styles.totalFare}>
                      <span>مبلغ قابل پرداخت</span>
                      <span>
                        <PriceFormat
                          price={
                            flight.airItineraryPricingInfo.totalFare.totalFare
                          }
                        />{" "}
                        ریال
                      </span>
                    </div>
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

ModalFlightDetail.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

ModalFlightDetail.propTypes = {
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
  connect(mapStateToProp, mapDispatchToProp)(ModalFlightDetail)
);
