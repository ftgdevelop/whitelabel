import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { i18n, withTranslation } from "../../../../../i18n";
import _ from 'lodash';
import styles from "../../../../styles/Flight.module.css";
import FilterResult from "./FilterResult";
// import FilterStops from './FilterStops'
import FilterAirlines from "./FilterAirlines";
import FilterTime from "./FilterTime";
import FilterPrice from "./FilterPrice";
import FilterFlightCabin from './FilterFlightCabin'
import FilterFlightType from "./FilterFlightType";
import { setFilterFlight, flightsFilter } from "../../../../actions";

const FlightListFilter = (props) => {
  const {
    t,
    allFlightList,
    filterFlightsTotal,
    airlines,
    sortFactor,
    loading,
    minPrice,
    maxPrice,
    filters,
  } = props;

  const filterHandler = (params) => {
    props.setFilterFlight(params);
    props.flightsFilter({
      filterItems: props.filters,
      data: allFlightList,
      sortFactor: sortFactor,
    });
  };

  return (
    <>
      <div
        className={
          loading
            ? `${styles.filghtListFilter} ${styles.flightListFilterLoading}`
            : styles.filghtListFilter
        }
      >
        {/* <FilterResult loading={loading} totalFlights={flights ?flights.length : 0} totalFilter={filterFlightsTotal} loading={loading}/> */}

        <FilterResult
          totalFlights={allFlightList ? allFlightList.length : 0}
          totalFilter={filterFlightsTotal}
          loading={loading}
        />

        {/* <FilterStops/> */}

        <FilterAirlines
          defaultValue={props.filters.filterAirlines}
          airlines={airlines}
          loading={loading}
          handleFilter={(x) => {
            filterHandler({ type: "filterAirlines", value: x });
          }}
        />

        <FilterTime
          defaultValue={props.filters.filterTime}
          handleFilter={(x) => {
            filterHandler({ type: "filterTime", value: x });
          }}
          loading={loading}
        />

        <FilterPrice
          defaultValue={props.filters.filterPriceValue}
          minPrice={minPrice}
          maxPrice={maxPrice}
          loading={loading}
          handleFilter={(x) => {
            filterHandler({ type: "filterPriceValue", value: x });
          }}
        />

        <FilterFlightType
          defaultValue={props.filters.filterFlightType}
          loading={loading}
          handleFilter={(x) => {
            filterHandler({ type: "filterFlightType", value: x });
          }}
        />

        <FilterFlightCabin
          defaultValue={props.filters.filterFlightCabin}
          loading={loading}
          allFlightList={props.allFlightList}
          handleFilter={(x) => {
            filterHandler({ type: "filterFlightCabin", value: x });
          }}
        />

        {/* <FilterAirports origin={allFlightList[0].departureAirport.city.name} Destination={allFlightList[0].arrivalAirport.city.name} /> */}
      </div>
    </>
    
  );
};

FlightListFilter.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

FlightListFilter.propTypes = {
  t: PropTypes.func.isRequired,
};




export default withTranslation("common")(FlightListFilter);
