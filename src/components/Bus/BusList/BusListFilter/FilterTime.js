import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { i18n, withTranslation } from "../../../../../i18n";
import { Collapse, Skeleton, Checkbox, Row, Col } from "antd";
import { DownOutlined } from "@ant-design/icons";

import styles from "../../../../styles/Bus.module.css";

const { Panel } = Collapse;

const FilterTime = (props) => {
  const [values, setValues] = useState([]);
  const [showClearFilterBtn, setShowClearFilterBtn] = useState(false);

  useEffect(() => {
    if (props.filterTime.length !== values.length) {
      setValues(props.filterTime);
      setShowClearFilterBtn(true);
    }
  }, [props.filterTime]);

  const onChange = (value) => {
    setValues(value);
    props.handleFilter("filterTime", value);
    setShowClearFilterBtn(value);
  };

  const clear = () => {
    setValues([]);
    props.handleFilter("filterTime", []);
    setShowClearFilterBtn(false);
  };

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
          <label className="pull-right">ساعت حرکت</label>
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

FilterTime.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

FilterTime.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(FilterTime);
