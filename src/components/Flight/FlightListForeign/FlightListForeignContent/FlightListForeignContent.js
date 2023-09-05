import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { i18n, withTranslation } from "../../../../../i18n";

import styles from "../../../../styles/Flight.module.css";
import SortFlightList from "./SortFlightList";
import FlightListCard from "./FlightListCard/FlightListCard";

const FlightListForeignContent = (props) => {
  const {t} = props;
  return (
    <>
      <div className={styles.flightListContent}>
        
        <SortFlightList/>

        {/* <div>
            <span> {t("first-choose-departure-ticket")}</span>
            <span> {t('first-choose-arrival-ticket')}</span>
        </div>  */}

        <div className={styles.flightResultList}>
            <FlightListCard/>
        </div>

        
      </div>
    </>
  );
};

FlightListForeignContent.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

FlightListForeignContent.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(FlightListForeignContent);
