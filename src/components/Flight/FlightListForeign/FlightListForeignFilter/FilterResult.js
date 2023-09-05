import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { i18n, withTranslation } from "../../../../../i18n";
import { Skeleton } from "antd";

import styles from "../../../../styles/Flight.module.css";

const FilterResult = (props) => {
  const { t, flightTotal } = props;
  return (
    <>
      <div className={styles.filterResult}>
        {t("your-search-result")}
        <div className={styles.textFilterResult}>
          {flightTotal} {t("flight-found")}
        </div>
      </div>
    </>
  );
};

FilterResult.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

FilterResult.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    flightTotal: state.flightForeign.flightTotal,
  };
};

const mapDispatchToProp = {};

export default withTranslation("common")(
  connect(mapStateToProps, mapDispatchToProp)(FilterResult)
);
