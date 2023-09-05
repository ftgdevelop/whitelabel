import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { Link, i18n, withTranslation } from "../../../../../i18n";

import styles from "../../../../styles/Flight.module.css";
import { Col, Row, Button } from "antd";
import { EditIcon } from "../../../UI/Icons";
import AnimatedShowMore from "react-animated-show-more";
import Time from "../../../UI/Time/Time";
import DatePersion from "../../../UI/DatePersion/DatePersion";
import FlightCart from './FlightCart';

const FlightRound = (props) => {
  const { flightSelected, flightSection,t } = props;
  const flight = flightSelected[flightSection];
  useEffect(() => {
    var stickyContainer = document.getElementById("flightRound");
    console.log(
      "n: ",
      stickyContainer && stickyContainer.offsetTop
        ? stickyContainer.offsetTop
        : 0
    );

    // console.log('n: ',n);
    window.scrollTo({
      top: stickyContainer.offsetTop - 20,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <div className={styles.flightRound} id="flightRound">
        <Row gutter={[20,20]}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <FlightCart flight={flight} clearSelectedFlight={props.clearSelectedFlight}/>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <div className={styles.emptyFlightRound}>
              <span>{t('please-select-returened-ticket')}</span>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

FlightRound.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

FlightRound.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(FlightRound);
