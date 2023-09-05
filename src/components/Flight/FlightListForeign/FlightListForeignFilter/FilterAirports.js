import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { i18n, withTranslation } from "../../../../../i18n";
import { Collapse, Skeleton, Checkbox, Row, Col } from "antd";
import { DownOutlined } from "@ant-design/icons";
import sortBy from "lodash/sortBy";
import PriceFormat from "../../../UI/PriceFormat/PriceFormat";
const { Panel } = Collapse;
import { Filter, DoFilter } from "../../../../actions/flight/Flight";
import styles from "../../../../styles/Flight.module.css";

const FilterAirports = (props) => {
  const [filterSelected, setFilterSelected] = useState(props.filterAirports);

  const onChange = (value) => {
    props.Filter("filterAirports", value);
  };

  const clearFilter = () => {
    props.Filter("filterAirports", []);
  };

  useEffect(() => {
    setFilterSelected(props.filterAirports);
    props.DoFilter();
  }, [props.filterAirports]);

  const sort = (flights) => {
    const list = sortBy(
      flights,
      (flight) => flight.airItineraryPricingInfo.totalFare.totalFare
    );
    return list[0].airItineraryPricingInfo.totalFare.totalFare;
  };
  const { t, airports } = props;
  const airlineKeys = Object.keys(airports);

  const options =
    airlineKeys && airlineKeys.length
      ? airlineKeys.map((airlineCode, key) => {
          const flight =
            airports[airlineCode][0].airItinerary.originDestinationOptions[0]
              .flightSegments[0];
          console.log("+++", airlineCode, airports[airlineCode]);
          // return {
          //   label: key,
          //   value: key,
          //   priceNull: key,
          // };
          const obj = {
            label: (
              <>
                <span className="option-filter">
                  {flight.departureAirport.name}
                </span>
              </>
            ),
            value: airlineCode,
            priceNull: flight.departureAirport.code,
          };
          return obj;
        })
      : [];

  return (
    <>
      <div className="filter-item">
        <div className="filter-lable clearfix">
          <label className="pull-start">{t("airport")}</label>
          <button
            disabled={props.loading}
            type="button"
            className="pull-end filter-reset-btn"
            onClick={()=>clearFilter()}
          >
            {t("reset-filter")}
          </button>
        </div>
        <Checkbox.Group
          style={{ width: "100%" }}
          // defaultValue={this.props.defaultValue}
          // disabled={this.props.loading}
          className="vertical-checkbox-group"
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

FilterAirports.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

FilterAirports.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    airports: state.flightForeign.airports,
    filterAirports: state.flightForeign.filterAirports,
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
  connect(mapStateToProps, mapDispatchToProp)(FilterAirports)
);
