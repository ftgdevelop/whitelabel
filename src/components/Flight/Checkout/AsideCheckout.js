import React from "react";
import PropTypes from "prop-types";
import { Link, i18n, withTranslation } from "../../../../i18n";
import { Col, Row } from "antd";
import AnimatedShowMore from "react-animated-show-more";
import { EditIcon } from "../../UI/Icons";
import FlightCartCheckout from "../FlightList/FlightRound/FlightCartCheckout";
import styles from "../../../styles/Flight.module.css";

class AsideCheckout extends React.Component {
  
  render() {
    const { t, departureFlight, returnFlight } = this.props;
    return (
      <>
      {returnFlight ?
        <div className={styles.flightRound} id="flightRound">
          <Row gutter={[20, 20]}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <div className={styles.subjectFlightRound}>{t('departure-ticket')}</div>
              <FlightCartCheckout flight={departureFlight}  clearSelectedFlight="" />
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <div className={styles.subjectFlightRound}>{t("arrival-ticket")}</div>
              <FlightCartCheckout flight={returnFlight}  clearSelectedFlight=""/>
            </Col>
          </Row>
        </div>
      :
        <div
          className={`${styles.flightRound} ${styles.flightOneWay}`}
          id="flightRound"
        >
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <FlightCartCheckout flight={departureFlight}  />
             </Col>
          </Row>
        </div>
      }
      </>
    );
  }
}

AsideCheckout.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

AsideCheckout.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(AsideCheckout);
