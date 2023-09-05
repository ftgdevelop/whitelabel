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
  HorizontalBaggageIcon,
} from "../../UI/Icons";

const { Panel } = Collapse;

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
    const { t, rules } = this.props;
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
          <div style={{ margin: "20px 0 10px" }}>جزئیات لغو و تغییر</div>
          <Collapse accordion>
            {rules.map((rule, index) => (
              <Panel
                header={rule.title}
                showArrow={false}
                style={{ padding: "0px 15px" }}
                key={index}
              >
                <p>{rule.description}</p>
              </Panel>
            ))}
          </Collapse>
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
