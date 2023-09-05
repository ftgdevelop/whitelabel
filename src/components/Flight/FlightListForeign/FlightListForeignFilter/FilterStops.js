import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { i18n, withTranslation } from "../../../../../i18n";
import { Radio, Collapse } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Filter, DoFilter } from "../../../../actions/flight/Flight";
const { Panel } = Collapse;

import styles from "../../../../styles/Flight.module.css";

const FilterStops = (props) => {
  const onChange = (e) => {
    props.Filter("filtersNumberOfStop", e.target.value);
  };

  const clearFilter = () => {
    props.Filter("filtersNumberOfStop", null);
  };

  useEffect(() => {
    props.DoFilter();
  }, [props.value]);

  const { t, value } = props;
  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px",
    marginRight: "0",
  };
  return (
    <div className="filter-item">
      <div className="filter-lable clearfix">
        <label className="pull-start">توقف ها</label>
        <button
          // disabled={this.props.loading}
          type="button"
          className="pull-end filter-reset-btn"
          onClick={() => clearFilter()}
        >
          {t("reset-filter")}
        </button>
      </div>
      <Radio.Group
        onChange={onChange}
        value={value}
        style={{ display: "flow-root" }}
      >
        <Radio style={radioStyle} value={null}>
          {t("stop-number")}
        </Radio>
        <Radio style={radioStyle} value={1}>
          {t("direct-flight")}
        </Radio>
        <Radio style={radioStyle} value={2}>
          {t("stop-less-1")}
        </Radio>
        <Radio style={radioStyle} value={3}>
          {t("2stop-less")}
        </Radio>
      </Radio.Group>
    </div>
  );
};

FilterStops.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

FilterStops.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    value: state.flightForeign.filtersNumberOfStop,
  };
};

const mapDispatchToProp = {
  Filter,
  DoFilter,
};

export default withTranslation("common")(
  connect(mapStateToProps, mapDispatchToProp)(FilterStops)
);
