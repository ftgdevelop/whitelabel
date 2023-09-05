import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { i18n, withTranslation } from "../../../../../i18n";
import _ from "lodash";
import styles from "../../../../styles/Bus.module.css";
import FilterResult from "./FilterResult";
import FilterAirlines from "./FilterAirlines";
import FilterTime from "./FilterTime";
import FilterPrice from "./FilterPrice";
import FilterFlightCabin from "./FilterFlightCabin";
import FilterFlightType from "./FilterFlightType";
import { Filter, DoFilter } from "../../../../actions/bus/bus";

const BusListFilter = (props) => {
  const { t } = props;

  useEffect(() => {
    props.DoFilter();
  }, [
    props.filterOffices.length,
    props.filterProviders.length,
    props.filterTime.length,
    props.filterMinPrice,
    props.filterMaxPrice,
  ]);

  return (
    <>
      <div className={styles.filghtListFilter}>
        <FilterResult total={props.total} totalAll={props.totalAll} />

        <FilterAirlines
          offices={props.offices}
          handleFilter={props.Filter}
          filterOffices={props.filterOffices}
        />

        <FilterTime handleFilter={props.Filter} filterTime={props.filterTime} />

        <FilterPrice
          handleFilter={props.Filter}
          minPrice={props.minPrice}
          maxPrice={props.maxPrice}
          filterMinPrice={props.filterMinPrice}
          filterMaxPrice={props.filterMaxPrice}
        />

        {/* <FilterFlightType /> */}

        <FilterFlightCabin
          providers={props.providers}
          handleFilter={props.Filter}
          filterProviders={props.filterProviders}
        />
      </div>
    </>
  );
};

BusListFilter.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

BusListFilter.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    keyValidate: state.bus.keyValidate,
    keyAvailability: state.bus.keyAvailability,
    total: state.bus.total,
    totalAll: state.totalAll,
    reFetch: state.bus.reFetch,
    loadingFetchData: state.bus.loadingFetchData,
    offices: state.bus.offices,
    providers: state.bus.providers,
    filterProviders: state.bus.filterProviders,
    filterOffices: state.bus.filterOffices,
    filterTime: state.bus.filterTime,
    minPrice: state.bus.minPrice,
    maxPrice: state.bus.maxPrice,
    filterMinPrice: state.bus.filterMinPrice,
    filterMaxPrice: state.bus.filterMaxPrice,
    // fetchingKey: state.flightForeign.fetchingKey,
    // fetchingFlights: state.flightForeign.fetchingFlights,
    // isCompleted: state.flightForeign.isCompleted,
    // error: state.flightForeign.error,
    // sortby: state.flightForeign.sortby,
    // loadingPostValidate: state.flightForeign.loadingPostValidate,
    // flightTotal: state.flightForeign.flightTotal,
    // loadingFetchFlight: state.flightForeign.loadingFetchFlight,
  };
};

const mapDispatchToProp = (dispatch) => ({
  Filter: (field, value) => dispatch(Filter(field, value)),
  DoFilter: () => dispatch(DoFilter()),
  // FetchKeyBuses: (d) => dispatch(FetchKeyBuses(d)),
  // FetchBuses: (d) => dispatch(FetchBuses(d)),
  // ChangeSort: (d) => dispatch(ChangeSort(d)),
});

export default withTranslation("common")(
  connect(mapStateToProps, mapDispatchToProp)(BusListFilter)
);
