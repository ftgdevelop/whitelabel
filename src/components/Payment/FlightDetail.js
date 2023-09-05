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

class CipDetail extends React.Component {

  render() {
    const { t, flights } = this.props;
    const flightsList = ['departureFlight']
    if(flights.returnFlight){
      flightsList.push('returnFlight')
    }

    return (
        <>
            {flightsList.map((item, index)=>
                <div className={styles.contentModalFlightDetails} key={index}>
                    <div className={styles.paxHeader}>
                        <div className={styles.directionFlight}>
                        <FlightReturnIcon />
                        </div>
                        <div className={styles.departureDetails}>
                        <b>{flights[item].departureAirport.city.name}</b>
                        <ArrowLeftIcon />
                        <b>{flights[item].arrivalAirport.city.name}</b>
                        </div>
                        <div className={styles.moreDetailsPax}>
                        <span> {t('flight-no')}{flights[item].flightNumber} </span>
                        {flights[item].departureAirport &&
                        flights[item].departureAirport.terminalId ? (
                            <span>
                            {" "}
                            {t('flight-from')}:{flights[item].departureAirport.terminalId}
                            </span>
                        ) : (
                            ""
                        )}
                        <span>
                            {" "}
                            {t('accepted-cargo')}:{flights[item].maxAllowedBaggage} {t('kilogram:')}{" "}
                        </span>
                        <span>
                            {" "}
                            {t('class')}:{flights[item].cabinClass.name} {flights[item].cabinClass.code}{" "}
                        </span>
                        </div>
                    </div>
                    <div className={styles.paxContent}>
                    <div className={styles.flightUpDetail}>
                    <div className={styles.info}>
                        <div className={styles.contentInfo}>
                        {flights[item].airline.picture ? (
                            <img
                            src={flights[item].airline.picture.path}
                            alt={flights[item].airline.picture.altAttribute}
                            />
                        ) : (
                            ""
                        )}
                        <div>
                            <div className={styles.airlineText}>
                            {flights[item].airline.name}
                            </div>
                            <div className={styles.airlineNumber}>
                            {flights[item].airCraft.manufacturer}
                            </div>
                            <div className={styles.aircraftTypeLabel}>
                            {flights[item].flightType === "System" ? t('system') : t('charter')}
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className={styles.infoOrigin}>
                        <div className={styles.departureTimeLabel}>
                        <span className={styles.arrivalAirportLabel}>
                            {flights[item].departureAirport.city.name}
                        </span>
                        <Time date={flights[item].departureTime} />
                        </div>
                        <div className={styles.departureDateLabel}>
                        <DatePersion date={flights[item].departureTime} />
                        </div>
                        {/* <div className={styles.airportLabel}>
                        فرودگاه دستغیب شیراز
                        </div> */}
                    </div>
                    <div className={styles.infoDestination}>
                        <div className={styles.departureTimeLabel}>
                        <span className={styles.arrivalAirportLabel}>
                            {flights[item].arrivalAirport.city.name}
                        </span>
                        <Time date={flights[item].arrivalTime} />
                        </div>
                        <div className={styles.departureDateLabel}>
                        <DatePersion date={flights[item].arrivalTime} />
                        </div>
                        {/* <div className={styles.airportLabel}>
                        فرودگاه مهرآباد تهران
                        </div> */}
                    </div>
                    </div>
                </div>
                </div>
                )}
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
