import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { i18n, withTranslation } from "../../../../../i18n";
import { Radio, Button } from "antd";
import { connect } from "react-redux";

import styles from "../../../../styles/Flight.module.css";
import { SortIcon } from "../../../UI/Icons";
import { ChangeSort } from "../../../../actions/flight/Flight";
const SortFlightList = React.memo((props) => {
  const { t, sortby, ChangeSort } = props;

  const changeValue = (e) => {
    ChangeSort(e.target.value);
  };

  return (
    <>
      <div className={styles.sortFlightList}>
        <span className={styles.sortFlightListText}>{t("sort-by")} :</span>
        <span className={styles.sortFlightListIcon}>
          <SortIcon />
        </span>
        <Radio.Group
          value={sortby}
          className={styles.sortRadioGroup}
          onChange={changeValue}
        >
          <Radio.Button value="LowPrice"> {t("lowest-price")}</Radio.Button>
          <Radio.Button value="HighPrice"> {t("highest-price")}</Radio.Button>
          <Radio.Button value="departureTime">{t("flight-time")}</Radio.Button>
        </Radio.Group>
      </div>
    </>
  );
});

SortFlightList.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

SortFlightList.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    sortby: state.flightForeign.sortby,
  };
};

const mapDispatchToProp = {
  ChangeSort,
  //   FetchKeyFlights,
  //   FetchFlights,
};

export default withTranslation("common")(
  connect(mapStateToProps, mapDispatchToProp)(SortFlightList)
);
