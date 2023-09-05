import React from "react";
import PropTypes from "prop-types";
import { i18n, withTranslation } from "../../../../i18n";
import { Modal, Button, Form, Item, Input } from "antd";

import styles from "../../../styles/Flight.module.css";
import {
  FlightDepartureIcon,
  ArrowLeftIcon,
  FlightReturnIcon,
} from "../../UI/Icons";
import Time from '../../UI/Time/Time';
import DatePersion from '../../UI/DatePersion/DatePersion';

class Checkout extends React.Component {
  state = { visible: false };

  showModal = () => {
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
    const { t, departureFlight, returnFlight } = this.props;
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
          width={800}
        >
          <div className={styles.contentModalFlightDetails}>
            <div className={styles.paxHeader}>
              <div className={styles.directionFlight}>
                <FlightDepartureIcon />
              </div>
              <div className={styles.departureDetails}>
                {t("departure-flight-text")}
                <b>تهران</b>
                <ArrowLeftIcon />
                <b>شیراز</b>
              </div>
              <div className={styles.moreDetailsPax}>
                <span> {t("flight-number")} : 6245 </span>
                <span>{t("flight-from-terminal")} : 4 </span>
                <span> {t("allowed-cargo")} : 20 {t("kg")} </span>
                <span> {t("price-class")} : Economy Y </span>
              </div>
            </div>
            <div className={styles.paxContent}>
              <div className={styles.flightUpDetail}>
                <div className={styles.info}>
                  <div className={styles.contentInfo}>
                    <img src="https://cdn2.safaraneh.com/images/flights/ji.png" />
                    <div>
                      <div className={styles.airlineText}>ایران ایر</div>
                      <div className={styles.airlineNumber}>Airbus</div>
                      <div className={styles.aircraftTypeLabel}>{t("charter")}</div>
                    </div>
                  </div>
                </div>
                <div className={styles.infoOrigin}>
                  <div className={styles.departureTimeLabel}>
                    <span className={styles.arrivalAirportLabel}>تهران</span>
                    <span>14:30</span>
                  </div>
                  <div className={styles.departureDateLabel}>شنبه، ۱ دی</div>
                  <div className={styles.airportLabel}>
                    فرودگاه دستغیب شیراز
                  </div>
                </div>
                <div className={styles.infoDestination}>
                  <div className={styles.departureTimeLabel}>
                    <span className={styles.arrivalAirportLabel}>شیراز</span>
                    <span>17:00</span>
                  </div>
                  <div className={styles.departureDateLabel}>شنبه، ۱ دی</div>
                  <div className={styles.airportLabel}>
                    فرودگاه مهرآباد تهران
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.paxHeader}>
              <div className={styles.directionFlight}>
                <FlightReturnIcon />
              </div>
              <div className={styles.departureDetails}>
                {t("arrival-flight-text")} :
                <b>تهران</b>
                <ArrowLeftIcon />
                <b>شیراز</b>
              </div>
              <div className={styles.moreDetailsPax}>
                <span> {t("flight-number")} : 6245 </span>
                <span>{t("flight-from-terminal")} : 4 </span>
                <span> {t("allowed-cargo")} : 20 {t("kg")} </span>
                <span> {t("price-class")} : Economy Y </span>
              </div>
            </div>
            <div className={styles.paxContent}>
              <div className={styles.flightUpDetail}>
                <div className={styles.info}>
                  <div className={styles.contentInfo}>
                    <img src="https://cdn2.safaraneh.com/images/flights/ji.png" />
                    <div>
                      <div className={styles.airlineText}>ایران ایر</div>
                      <div className={styles.airlineNumber}>Airbus</div>
                      <div className={styles.aircraftTypeLabel}>{t("charter")}</div>
                    </div>
                  </div>
                </div>
                <div className={styles.infoOrigin}>
                  <div className={styles.departureTimeLabel}>
                    <span className={styles.arrivalAirportLabel}>تهران</span>
                    <span>14:30</span>
                  </div>
                  <div className={styles.departureDateLabel}>شنبه، ۱ دی</div>
                  <div className={styles.airportLabel}>
                    فرودگاه دستغیب شیراز
                  </div>
                </div>
                <div className={styles.infoDestination}>
                  <div className={styles.departureTimeLabel}>
                    <span className={styles.arrivalAirportLabel}>شیراز</span>
                    <span>17:00</span>
                  </div>
                  <div className={styles.departureDateLabel}>شنبه، ۱ دی</div>
                  <div className={styles.airportLabel}>
                    فرودگاه مهرآباد تهران
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

Checkout.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

Checkout.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(Checkout);
