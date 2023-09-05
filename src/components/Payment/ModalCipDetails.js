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
import Time from "../UI/Time/Time";
import DatePersion from "../UI/DatePersion/DatePersion";
import CipDetail from "./CipDetail"

class ModalCipDetails extends React.Component {
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
      <div className={styles.modalFlightDetails}>
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
          <CipDetail reserveInformation={this.props.reserveInformation} />
        </Modal>
      </div>
    );
  }
}

ModalCipDetails.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

ModalCipDetails.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(ModalCipDetails);
