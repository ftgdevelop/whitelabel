import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { i18n, withTranslation } from "../../../../../i18n";
import _ from "lodash";
import styles from "../../../../styles/Flight.module.css";
import FilterResult from "./FilterResult";
import FilterStops from "./FilterStops";
import FilterAirlines from "./FilterAirlines";
import FilterTime from "./FilterTime";
import FilterPrice from "./FilterPrice";
// import FilterFlightCabin from "./FilterFlightCabin";
// import FilterFlightType from "./FilterFlightType";
import FilterAirports from "./FilterAirports";

const FlightListForeignFilter = (props) => {
  const { t } = props;

  return (
    <>
      <div className={styles.filghtListFilter}>
        <FilterResult />

        <FilterStops />

        <FilterAirlines />

        <FilterTime />

        <FilterPrice />

        {/* <FilterFlightType/> */}

        {/* <FilterFlightCabin /> */}

        <FilterAirports />
      </div>
    </>
  );
};

FlightListForeignFilter.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

FlightListForeignFilter.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(FlightListForeignFilter);
