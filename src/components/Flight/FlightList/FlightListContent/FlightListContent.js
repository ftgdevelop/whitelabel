import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { i18n, withTranslation } from "../../../../../i18n";

import styles from "../../../../styles/Flight.module.css";
import SortFlightList from "./SortFlightList";
import FlightListCard from "./FlightListCard/FlightListCard";

const FlightListContent = (props) => {
  const {t} = props;
  return (
    <>
      <div
        className={`${styles.flightListContent} ${process.env.THEME_NAME === "TRAVELO" && styles.flightListContentTravelo}`}
        >
        {!props.loading && props.flightList.length ? (
          <SortFlightList sortHandler={props.sortHandler} />
        ) : (
          ""
        )}
        {props.flightSectionMsg && !props.loading && props.flightList.length ? (
          <div>
            {props.flightSection === "departure" ? (
              <span> {t("first-choose-departure-ticket")}</span>
            ) : (
              <span> {t('first-choose-arrival-ticket')}</span>
            )}
          </div>
        ) : (
          ""
        )}
        <div className={styles.flightResultList}>
          {props.flightList.map((flight, index) => (
            <FlightListCard
              key={index}
              flight={flight}
              flightSection={props.flightSection}
            />
          ))}
        </div>
      </div>
    </>
  );
};

FlightListContent.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

FlightListContent.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(FlightListContent);
