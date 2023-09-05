import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { i18n, withTranslation } from "../../../../../i18n";
import { Collapse, Skeleton, Checkbox, Row, Col } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Filter, DoFilter } from "../../../../actions/flight/Flight";

import styles from "../../../../styles/Flight.module.css";

const { Panel } = Collapse;

const FilterTime = (props) => {
  const [filterSelected, setFilterSelected] = useState(props.filtersTime);

  const onChange = (value) => {
    props.Filter("filtersTime", value);
  };

  const clearFilter = () => {
    props.Filter("filtersTime", []);
  };

  useEffect(() => {
    setFilterSelected(props.filtersTime);
    props.DoFilter();
  }, [props.filtersTime]);

  const { t } = props;
  const options = [
    {
      label: (
        <>
          <span className="option-filter">{t("before-6-am")}</span>
        </>
      ),
      value: "0-6",
    },
    {
      label: (
        <>
          <span className="option-filter">{t("6am-to-1159pm")}</span>
        </>
      ),
      value: "6-12",
    },
    {
      label: (
        <>
          <span className="option-filter">{t("12pm-to-18pm")}</span>
        </>
      ),
      value: "12-18",
    },
    {
      label: (
        <>
          <span className="option-filter">{t("after-18pm")}</span>
        </>
      ),
      value: "18-24",
    },
  ];

  return (
    <>
      <div className="filter-item">
        <div className="filter-lable clearfix">
          <label className="pull-start"> {t("flight-time")}</label>
          <button
            // disabled={this.props.loading}
            type="button"
            className="pull-end filter-reset-btn"
            onClick={() => clearFilter()}
          >
            {t("reset-filter")}
          </button>
        </div>
        <Checkbox.Group
          className="vertical-checkbox-group"
          options={options}
          value={filterSelected}
          onChange={(e) => {
            onChange(e);
          }}
        />
      </div>
    </>
  );
};

FilterTime.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

FilterTime.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    filtersTime: state.flightForeign.filtersTime,
  };
};

const mapDispatchToProp = {
  Filter,
  DoFilter,
};

export default withTranslation("common")(
  connect(mapStateToProps, mapDispatchToProp)(FilterTime)
);
