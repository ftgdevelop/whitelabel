import React from "react";
import PropTypes from "prop-types";
import { i18n, withTranslation } from "../../../i18n";
import { Modal, Button, Form, Item, Input } from "antd";

import styles from "../../styles/Flight.module.css";
import {
  FlightDepartureIcon,
  ArrowLeftIcon,
  FlightReturnIcon,
} from "../UI/Icons";
import Time from '../UI/Time/Time';
import DatePersion from '../UI/DatePersion/DatePersion';
import moment from 'moment-jalaali';
import { Row, Col } from 'antd';
import { RoomIcon, AnimalIcon, VisaIcon, WheelchairIcon, VipRoomIcon, FlightIcon } from "../UI/Icons";
class CipDetail extends React.Component {

  render() {
    const { t, reserveInformation } = this.props;
    moment.loadPersian();
    
    return (
        <>
            {
                reserveInformation && 
                <div className={styles.contentModalFlightDetails}>
                    <div className={styles.paxHeader}>
                        <div className={styles.directionFlight}>
                            <FlightReturnIcon />
                        </div>
                        <div className={styles.departureDetails}>
                            <span>مبدا :</span>
                            <b>{reserveInformation.FlightDetail.Location}</b>
                        </div>
                        <div className={styles.moreDetailsPaxCip}>
                            <Row>
                                <Col xs={24} sm={12} md={8} lg={8} xl={6}>
                                    <span>شماره پرواز : {reserveInformation.FlightDetail.IdFlight} </span>
                                </Col>
                                <Col xs={24} sm={12} md={8} lg={8} xl={6}>
                                    <span>ایرلاین : {reserveInformation.FlightDetail.AirLine} </span>
                                </Col>
                                <Col xs={24} sm={12} md={8} lg={8} xl={6}>
                                    <span>نوع پرواز : {reserveInformation.FlightDetail.flightType?"داخلی":"خارجی"} </span>
                                </Col>
                                <Col xs={24} sm={12} md={8} lg={8} xl={6}>
                                    <span>ترمینال : {reserveInformation.FlightDetail.travelType?"خروجی":"ورودی"} </span>
                                </Col>
                                <Col xs={24} sm={12} md={8} lg={8} xl={6}>
                                    <span>تاریخ پرواز : {moment(reserveInformation.FlightDetail.FlightDate).format("jYYYY/jM/jD")} </span>
                                </Col>
                                <Col xs={24} sm={12} md={8} lg={8} xl={6}>
                                    <span>ساعت پرواز : {reserveInformation.FlightDetail.FlightTime.slice(0, -3)}</span>
                                </Col>
                            </Row>
                        </div>
                    </div>

                    <div className={styles.paxHeader}>
                        <div className={styles.departureDetails}>
                            <b>خدمات اضافه</b>
                        </div>
                        {reserveInformation.Pets.length === 0 ? null :
                            <div className={styles.moreDetailsPaxCip}>
                                <div className={styles.servicesPaxCip}>
                                    <div>
                                        <AnimalIcon/>
                                        <b> حیوان خانگی </b>
                                    </div>
                                    <div>
                                        {reserveInformation.Pets.map((item, index)=> <span key={index}>{item.Price} ریال </span>)}
                                    </div>
                                </div>
                            </div>}

                        {reserveInformation.Suites.length === 0 ? null :
                            <div className={styles.moreDetailsPaxCip}>
                                <div className={styles.servicesPaxCip}>
                                    <div>
                                        <RoomIcon/>
                                        {reserveInformation.Suites.map((item, index)=> <b key={index}>{item.Name}</b>)}
                                    </div>
                                    <div>
                                        {reserveInformation.Suites.map((item, index)=> <span key={index}>{item.Price} ریال </span>)}
                                    </div>
                                </div>
                            </div>}

                        {reserveInformation.Visas.length === 0 ? null :
                            <div className={styles.moreDetailsPaxCip}>
                                <div className={styles.servicesPaxCip}>
                                    <div>
                                        <VisaIcon/>
                                        <b>خدمات ویزا</b>
                                    </div>
                                    <div>
                                        {reserveInformation.Visas.map((item, index)=> <span key={index}>{item.Price} ریال </span>)}
                                    </div>
                                </div>
                            </div>}

                        {reserveInformation.Wheelchairs.length === 0 ? null :
                            <div className={styles.moreDetailsPaxCip}>
                                <div className={styles.servicesPaxCip}>
                                    <div>
                                        <WheelchairIcon/>
                                        <b>خدمات ویلچر</b>
                                    </div>
                                    <div>
                                        {reserveInformation.Wheelchairs.map((item, index)=> <span key={index}>{item.Price} ریال </span>)}
                                    </div>
                                </div>
                            </div>}
                    </div>
                    {reserveInformation.Transfers.length === 0 ? null :
                        <div className={styles.paxHeader}>
                        <div className={styles.departureDetails}>
                            <b>ترانسفر</b>
                        </div>
                        
                        {reserveInformation.Transfers.map((item, index)=> <div className={styles.moreDetailsPaxCip} key={index}>
                                <div className={styles.servicesPaxCip}>
                                    <div>
                                        {
                                            item.TransferName === "تویوتا کمری"?<img src="/images/toyota.jpg" />
                                            :item.TransferName === "ون مکسوس"?<img src="/images/van.jpg" />
                                            :item.TransferName === "ولوو"?<img src="/images/volvo.jpg" />
                                            :<img src="/images/default-car.jpg" />
                                        }
                                        <b>{item.TransferName} </b>
                                    </div>
                                    <div>
                                        <b> {item.Price} ریال </b>
                                    </div>
                                </div>
                            </div>)}
                        <br/>
                        <div>
                            <span>آدرس : {reserveInformation.Transfers[0].Address}</span>
                        </div>
                    </div>}
                </div>
            }
        </>
    );
  }
}

CipDetail.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

CipDetail.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(CipDetail);
