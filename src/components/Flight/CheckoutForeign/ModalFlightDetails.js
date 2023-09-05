import React from "react";
import PropTypes from "prop-types";
import { i18n, withTranslation } from "../../../../i18n";
import { Modal } from "antd";
import DetailModal from "../FlightListForeign/FlightListForeignContent/FlightListCard/DetailModal";
import styles from "../../../styles/Flight.module.css";
import {
  FlightDepartureIcon,
  ArrowLeftIcon,
  FlightReturnIcon,
  InfoIcon,
  VerticalBaggageIcon,
  HorizontalBaggageIcon,
} from "../../UI/Icons";

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
    const { t, info } = this.props;
    return (
      <div className={`${styles.modalFlightDetails}`}>
        <a className={styles.btnFlightDetails} onClick={this.showModal}>
          {t("more-details")}
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
            <DetailModal info={info} />
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
