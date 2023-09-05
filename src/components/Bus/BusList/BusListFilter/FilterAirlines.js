import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import sortBy from "lodash/sortBy";

import { i18n, withTranslation } from "../../../../../i18n";
import { Collapse, Skeleton, Checkbox, Row, Col, Tooltip } from "antd";
import { DownOutlined } from "@ant-design/icons";
import PriceFormat from "../../../UI/PriceFormat/PriceFormat";

const { Panel } = Collapse;
const CheckboxGroup = Checkbox.Group;

import styles from "../../../../styles/Bus.module.css";

const FilterAirlines = (props) => {
  const [values, setValues] = useState([]);
  const [showClearFilterBtn, setShowClearFilterBtn] = useState(false);
  
  useEffect(() => {
    if (props.filterOffices.length !== values.length) {
      setValues(props.filterOffices);
      setShowClearFilterBtn(true);
    }
  }, [props.filterOffices]);

  const onChange = (value) => {
    setValues(value);
    props.handleFilter("filterOffices", value);
    setShowClearFilterBtn(value);
  };

  const clear = () => {
    setValues([]);
    props.handleFilter("filterOffices", []);
    setShowClearFilterBtn(false);
  };

  const { t, offices } = props;

  const busKeys = Object.keys(offices);
  const options =
    busKeys && busKeys.length
      ? busKeys.map((airlineCode, key) => {
          const flight = offices[airlineCode][0];
          const obj = {
            label: (
              <div className={styles.filterAirlineItem}>
                <Tooltip
                  placement="top"
                  title={
                    <div>
                      <small>{flight.office.name}</small>
                    </div>
                  }
                >
                  {flight.office.picture ? (
                    <img
                      className={styles.filterAirlineLogo}
                      src={flight.office.picture.path}
                    />
                  ) : (
                    <img
                      className={styles.filterAirlineLogo}
                      src="https://cdn.alibaba.ir/static/img/bus/349945335.jpg"
                    />
                  )}
                  <span className="option-filter">{flight.office.name}</span>
                </Tooltip>
              </div>
            ),
            value: flight.office.id,
          };
          return obj;
        })
      : [];
  return (
    <>
      <div className="filter-item filter-item-bus">
        <div className="filter-lable clearfix">
          <label className="pull-right">شرکت‌های اتوبوسرانی</label>
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

        <CheckboxGroup
          style={{ width: "100%" }}
          className="vertical-checkbox-group"
          options={options}
          // defaultValue={value}
          value={values}
          onChange={(e) => {
            onChange(e);
          }}
        ></CheckboxGroup>
      </div>
    </>
  );
};

FilterAirlines.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

FilterAirlines.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(FilterAirlines);
