import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { i18n, withTranslation } from "../../../../../i18n";
import { Slider, Skeleton, Row, Col } from "antd";

import styles from "../../../../styles/Bus.module.css";

const FilterPrice = (props) => {
  const { t } = props;
  const [values, setValues] = useState([]);

  useEffect(() => {
    if (!props.filterMinPrice || !props.filterMaxPrice) {
      setValues([]);
    }
  }, [props.filterMinPrice, props.filterMaxPrice]);

  useEffect(() => {
    setValues([props.minPrice, props.maxPrice]);
  }, [props.minPrice, props.maxPrice]);

  const onAfterChange = (value) => {
    // setValues(value);
    props.handleFilter("filterMinPrice", value[0]);
    props.handleFilter("filterMaxPrice", value[1]);
  };

  const onChange = (value) => {
    setValues(value);
  };

  const clear = () => {
    setValues([props.minPrice, props.maxPrice]);
    props.handleFilter("filterMinPrice", props.minPrice);
    props.handleFilter("filterMaxPrice", props.maxPrice);
  };

  return (
    <>
      <div className="filter-item">
        <div className="filter-lable clearfix">
          <label className="pull-right">{t("price")} </label>
          <button
            type="button"
            className="pull-left filter-reset-btn"
            disabled={props.loading}
            onClick={clear}
          >
            {t("reset-filter")}
          </button>
        </div>
        <Slider
          disabled={props.loading}
          className="slider-main-div"
          reverse={true}
          // step={50000}
          value={values}
          range={true}
          min={props.minPrice}
          max={props.maxPrice}
          onChange={onChange}
          onAfterChange={onAfterChange}
        />
        <Row gutter={[10, 10]} className="mb-0">
          <Col span={12} className="text-right count-filter-price">
            {props.minPrice} {t("rial")}
          </Col>
          <Col span={12} className="text-left count-filter-price">
            {props.maxPrice} {t("rial")}
          </Col>
        </Row>
      </div>
    </>
  );
};

FilterPrice.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

FilterPrice.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(FilterPrice);
