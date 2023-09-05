import React from "react";
import PropTypes from "prop-types";
import { i18n, withTranslation } from "../../../../../../../i18n";
import { Row, Col } from "antd";
import DatePersion from "../../../../../UI/DatePersion/DatePersion";
import Time from "../../../../../UI/Time/Time";
import styles from "../../../../../../styles/Flight.module.css";

const InfoFlight = (props) => {
  const { flight,t } = props;

  return (
    <>
      <Row>
        <Col xs={12} sm={8} md={9} lg={9} xl={9} className={styles.infoFlight}>
          <div className={styles.contentInfoFlight}>
            <div className={styles.nameInfoFlight}>
              {flight.departureAirport.city.name}
            </div>
            <div className={styles.timeInfoFlight}>
              <Time date={flight.departureTime} />
            </div>
            <DatePersion
              className={styles.dateInfoFlight}
              date={flight.departureTime}
              showMiladi={true}
            />
          </div>
        </Col>
        <Col xs={12} sm={8} md={9} lg={9} xl={9} className={styles.infoFlight}>
          <div className={styles.contentInfoFlight}>
            <div className={styles.nameInfoFlight}>
              {flight.arrivalAirport.city.name}
            </div>
            <div className={styles.timeInfoFlight}>
              <Time date={flight.arrivalTime} />
            </div>
            <DatePersion
              className={styles.dateInfoFlight}
              date={flight.arrivalTime}
              showMiladi={true}
            />
          </div>
        </Col>
        <Col
          xs={24}
          sm={8}
          md={6}
          lg={6}
          xl={6}
          className={` ${styles.infoFlight} ${styles.collapseInfoFlight} `}
        >
          <div className={styles.rootInfoFlight}>
            <span>{t('flight-no')} :</span>
            <span>{flight.flightNumber}</span>
          </div>
          {flight.departureAirport && flight.departureAirport.terminalId ? (
            <div className={styles.rootInfoFlight}>
              <span> {t("flight-from-terminal")} :</span>
              <span>{flight.departureAirport.terminalId}</span>
            </div>
          ) : (
            ""
          )}
          <div className={styles.rootInfoFlight}>
            <span>{t("allowed-cargo")} :</span>
            <span>{flight.maxAllowedBaggage} {t('kilogram')}</span>
          </div>
          <div className={styles.rootInfoFlight}>
            <span>{t('price-class')}</span>
            <span>
              {flight.cabinClass.name} {flight.cabinClass.code}
            </span>
          </div>
        </Col>
      </Row>
    </>
  );
};

InfoFlight.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

InfoFlight.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(InfoFlight);
