import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { i18n, withTranslation } from "../../../../../i18n";
import { Collapse, Tooltip, Checkbox, Row, Col } from "antd";
import { DownOutlined } from "@ant-design/icons";
import sortBy from "lodash/sortBy";
import PriceFormat from "../../../UI/PriceFormat/PriceFormat";
import { Filter, DoFilter } from "../../../../actions/flight/Flight";
const { Panel } = Collapse;

import styles from "../../../../styles/Flight.module.css";

const FilterAirlines = (props) => {
  const [filterSelected, setFilterSelected] = useState(props.filterAirlines);

  const onChange = (value) => {
    props.Filter("filterAirlines", value);
  };

  const clearFilter = () => {
    props.Filter("filterAirlines", []);
  };

  useEffect(() => {
    setFilterSelected(props.filterAirlines);
    setTimeout(props.DoFilter(), 10000);
  }, [props.filterAirlines.length]);

  const sort = (flights) => {
    const list = sortBy(
      flights,
      (flight) => flight.airItineraryPricingInfo.totalFare.totalFare
    );
    return list[0].airItineraryPricingInfo.totalFare.totalFare;
  };

  const { t, airlines } = props;
  const airlineKeys = Object.keys(airlines);

  const options =
    airlineKeys && airlineKeys.length
      ? airlineKeys.map((airlineCode, key) => {
          const flight =
            airlines[airlineCode][0].airItinerary.originDestinationOptions[0]
              .flightSegments[0];
          console.log("+++", airlineCode, airlines[airlineCode]);
          // return {
          //   label: key,
          //   value: key,
          //   priceNull: key,
          // };
          const obj = {
            label: (
              <Tooltip title={flight.marketingAirline.name}>
                {flight.marketingAirline.photoUrl ? (
                    <img
                      className={styles.filterAirlineLogo}
                      src={flight.marketingAirline.photoUrl}
                      alt={flight.marketingAirline.name}
                    />
                ) : (
                  ""
                )}
                {/* <span className="option-filter">
                </span> */}
                {sort(airlines[airlineCode]) === 0 ? (
                  <span
                    className={`${styles.filterAirlineCount} ${styles.filterAirlineCountNull}`}
                  >
                    {t("capacity-full")}
                  </span>
                ) : (
                  <span className={styles.filterAirlineCount}>
                    از <PriceFormat price={sort(airlines[airlineCode])} /> ریال
                  </span>
                )}
              </Tooltip>
            ),
            value: airlineCode,
            priceNull: <PriceFormat price={sort(airlines[airlineCode])} />,
          };
          return obj;
        })
      : [];

  return (
    <>
      <div className="filter-item">
        <div className="filter-lable clearfix">
          <label className="pull-start">{t("airlines")}</label>
          <button
            disabled={props.loading}
            type="button"
            className="pull-end filter-reset-btn"
            onClick={() => clearFilter()}
          >
            {t("reset-filter")}
          </button>
        </div>
        <Checkbox.Group
          style={{ width: "100%" }}
          defaultValue={props.filterAirlines}
          // disabled={this.props.loading}
          className="vertical-checkbox-group vertical-checkbox-group-price"
          value={filterSelected}
          options={options}
          onChange={(e) => {
            onChange(e);
          }}
        >
          {/* <Checkbox>
            <img
              className={styles.filterAirlineLogo}
              src="https://cdn2.safaraneh.com/images/flights/ep.png"
            />
            <span className="option-filter">آسمان</span>
            <span className={`${styles.filterAirlineCount}`}>
              از 5,556,000 ریال
            </span>
          </Checkbox>
          <Checkbox>
            <img
              className={styles.filterAirlineLogo}
              src="https://cdn2.safaraneh.com/images/flights/i3.png"
            />
            <span className="option-filter">آتا</span>
            <span className={`${styles.filterAirlineCount}`}>
              از 5,556,000 ریال
            </span>
          </Checkbox>
          <Checkbox>
            <img
              className={styles.filterAirlineLogo}
              src="https://cdn2.safaraneh.com/images/flights/iv.png"
            />
            <span className="option-filter">کاسپین</span>
            <span
              className={`${styles.filterAirlineCount} ${styles.filterAirlineCountNull}`}
            >
              ظرفیت تکمیل است
            </span>
          </Checkbox>
          <Checkbox>
            <img
              className={styles.filterAirlineLogo}
              src="https://cdn2.safaraneh.com/images/flights/qb.png"
            />
            <span className="option-filter">قشم ایر</span>
            <span
              className={`${styles.filterAirlineCount} ${styles.filterAirlineCountNull}`}
            >
              ظرفیت تکمیل است
            </span>
          </Checkbox> */}
        </Checkbox.Group>
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

const mapStateToProps = (state) => {
  return {
    airlines: state.flightForeign.airlines,
    filterAirlines: state.flightForeign.filterAirlines,
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
  connect(mapStateToProps, mapDispatchToProp)(FilterAirlines)
);
