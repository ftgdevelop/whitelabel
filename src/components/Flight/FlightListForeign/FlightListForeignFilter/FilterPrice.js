import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { i18n, withTranslation } from "../../../../../i18n";
import { Slider, Skeleton, Row, Col } from "antd";
import { connect } from "react-redux";
import PriceFormat from "../../../UI/PriceFormat/PriceFormat";
import { Filter, DoFilter } from "../../../../actions/flight/Flight";
import styles from "../../../../styles/Flight.module.css";

const FilterPrice = (props) => {
  const { t, minPrice, maxPrice } = props;

  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);

  useEffect(() => {
    setMin(props.minPrice);
    setMax(props.maxPrice);
  }, [props.minPrice, props.maxPrice]);

  useEffect(() => {
    setMin(props.filterMinPrice);
    setMax(props.filterMaxPrice);
  }, [props.filterMinPrice, props.filterMaxPrice]);

  useEffect(() => {
    props.DoFilter();
  }, [props.filterMinPrice, props.filterMaxPrice]);

  const onChange = (values) => {
    setMin(values[0]);
    setMax(values[1]);
  };

  const clearFilter = () => {
    props.Filter("filterMinPrice", props.minPrice);
    props.Filter("filterMaxPrice", props.maxPrice);
  };

  const onAfterChange = (value) => {
    props.Filter("filterMinPrice", value[0]);
    props.Filter("filterMaxPrice", value[1]);
  };

  return (
    <>
      <div className="filter-item">
        <div className="filter-lable clearfix">
          <label className="pull-start">{t("price")} </label>
          <button
            type="button"
            className="pull-end filter-reset-btn"
            disabled={props.loading}
            onClick={() => clearFilter()}
          >
            {t("reset-filter")}
          </button>
        </div>
        <Slider
          // disabled={loading}
          className="slider-main-div"
          reverse={true}
          // step={1}
          range={true}
          min={minPrice}
          max={maxPrice}
          value={[min, max]}
          onChange={onChange}
          onAfterChange={onAfterChange}
        />
        <Row gutter={[10, 10]} className="mb-0">
          <Col span={12} className="text-right count-filter-price">
            <PriceFormat price={minPrice} /> {t("rial")}
          </Col>
          <Col span={12} className="text-left count-filter-price">
            <PriceFormat price={maxPrice} /> {t("rial")}
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

const mapStateToProps = (state) => {
  return {
    minPrice: state.flightForeign.minPrice,
    maxPrice: state.flightForeign.maxPrice,
    filterMinPrice: state.flightForeign.filterMinPrice,
    filterMaxPrice: state.flightForeign.filterMaxPrice,
  };
};

const mapDispatchToProp = {
  Filter,
  DoFilter,
  // FetchKeyFlights,
  // FetchFlights,
  // FlightSort,
};

export default withTranslation("common")(
  connect(mapStateToProps, mapDispatchToProp)(FilterPrice)
);
