import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { i18n, withTranslation } from "../../../../../i18n";
import { Collapse, Skeleton, Checkbox, Row, Col } from "antd";
import { DownOutlined } from "@ant-design/icons";

import styles from "../../../../styles/Bus.module.css";

const { Panel } = Collapse;

const FilterFlightCabin = (props) => {
  const [values, setValues] = useState([]);
  const [showClearFilterBtn, setShowClearFilterBtn] = useState(false);

  useEffect(() => {
    if (props.filterProviders.length !== values.length) {
      setValues(props.filterProviders);
      setShowClearFilterBtn(true);
    }
  }, [props.filterProviders]);

  const onChange = (value) => {
    setValues(value);
    props.handleFilter("filterProviders", value);
    setShowClearFilterBtn(value);
  };

  const clear = () => {
    setValues([]);
    props.handleFilter("filterProviders", []);
    setShowClearFilterBtn(false);
  };

  const { t, providers } = props;
  const busKeys = Object.keys(providers);
  const options =
    busKeys && busKeys.length
      ? busKeys.map((airlineCode, key) => {
          const flight = providers[airlineCode][0];
          const obj = {
            label: flight.source.name || "-",
            value: flight.source.id,
          };
          return obj;
        })
      : [];

  return (
    <>
      <div className="filter-item">
        <div className="filter-lable clearfix">
          <label className="pull-right">پایانه</label>
          {showClearFilterBtn && showClearFilterBtn.length !== 0 &&
            <button
              disabled={props.loading}
              type="button"
              className="pull-left filter-reset-btn"
              onClick={clear}
            >
              {t("reset-filter")}
            </button>
          }
        </div>
        <Checkbox.Group
          className="vertical-checkbox-group"
          options={options}
          value={values}
          onChange={(e) => {
            onChange(e);
          }}
        />
      </div>
    </>
  );
};

FilterFlightCabin.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

FilterFlightCabin.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProp = (state) => {
  return {
    filters: state.filterFlights,
  };
};

export default withTranslation("common")(FilterFlightCabin);
