import React from "react";
import PropTypes from "prop-types";
import { i18n, withTranslation } from "../../../../i18n";
import { Modal, Collapse } from "antd";

import styles from "../../../styles/Flight.module.css";
import { 
  FlightDepartureIcon,
  ArrowLeftIcon,
  FlightReturnIcon,
  InfoIcon,
  VerticalBaggageIcon,
  HorizontalBaggageIcon
} from "../../UI/Icons";

const { Panel } = Collapse;

class ModalFlightDetailsCancel extends React.Component {
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
          جزئیات لغو و تغییر
        </a>
        <Modal
          title={null}
          open={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          width={800}
        >
          <div style={{margin: "20px 0 10px"}}>جزئیات لغو و تغییر</div>
         <Collapse accordion>
            <Panel
              header="RULE APPLICATION AND OTHER CONDITIONS"
              showArrow={false}
              style={{ padding: "0px 15px" }}
            >
              <p>NOTE - THE FOLLOWING TEXT IS INFORMATIONAL AND NOT VALIDATED FOR AUTOPRICING. RESTRICTED ONE WAY AND ROUND TRIP PC FARES APPLICATION CLASS OF SERVICE HESE FARES APPLY FOR ECONOMY CLASS SERVICE. TYPES OF TRANSPORTATION FARES GOVERNED BY THIS RULE CAN BE USED TO CREATE ONE-WAY/ROUND-TRIP/OPEN-JAW JOURNEYS.</p>
            </Panel>
            <Panel
              header="ELIGIBILITY"
              showArrow={false}
              style={{ padding: "0px 15px" }}
            >
              <p>NO ELIGIBILITY REQUIREMENTS APPLY.</p>
            </Panel>
            <Panel
              header="ADVANCE RESERVATIONS/TICKETING"
              showArrow={false}
              style={{ padding: "0px 15px" }}
            >
              <p>CONFIRMED RESERVATIONS FOR ALL SECTORS ARE REQUIRED AT LEAST 75 MINUTES BEFORE DEPARTURE. TICKETING MUST BE COMPLETED THE DAY RESERVATIONS ARE MADE.</p>
            </Panel>
          </Collapse>
        </Modal>
      </div>
    );
  }
}

ModalFlightDetailsCancel.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

ModalFlightDetailsCancel.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(ModalFlightDetailsCancel);