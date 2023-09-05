import React from "react";
import PropTypes from "prop-types";
import { i18n, withTranslation } from "../../../../i18n";
import { Modal } from "antd";

import styles from "../../../styles/Flight.module.css";
import { 
  FlightDepartureIcon,
  ArrowLeftIcon,
  FlightReturnIcon,
  InfoIcon,
  VerticalBaggageIcon,
  HorizontalBaggageIcon
} from "../../UI/Icons";

class ModalFlightDetails extends React.Component {
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
    const {t} = this.props;
    return (
      <div className={`${styles.modalFlightDetails}`}>
        <a className={styles.btnFlightDetails} onClick={this.showModal}>
          {t('more-details')}
        </a>
        <Modal
          title={null}
          open={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          width={800}
        >
          <div className={styles.paxHeaderForeign}>
            <div>
              <div className={styles.directionFlight}>
                <FlightDepartureIcon />
              </div>
              <div className={styles.departureDetails}>
                پرواز رفت :<b>London</b>
                <ArrowLeftIcon />
                <b>New Delhi</b>
              </div>
            </div>
            <div className={styles.durationTime}>
              <span>مدت زمان پرواز :</span>
              <b> ۱۱ ساعت و ۲۰ دقیقه </b>
            </div>
          </div>
          <div className={styles.paxContentForeign}>
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

          <div className={styles.paxHeaderForeign}>
            <div>
              <div className={styles.directionFlight}>
                <FlightReturnIcon />
              </div>
              <div className={styles.departureDetails}>
                پرواز برگشت :<b>London</b>
                <ArrowLeftIcon />
                <b>New Delhi</b>
              </div>
            </div>
            <div className={styles.durationTime}>
              <span>مدت زمان پرواز :</span>
              <b> ۱۱ ساعت و ۲۰ دقیقه </b>
            </div>
          </div>
          <div className={styles.paxContentForeign}>
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
        </Modal>
      </div>
    );
  }
}

ModalFlightDetails.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

ModalFlightDetails.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(ModalFlightDetails);