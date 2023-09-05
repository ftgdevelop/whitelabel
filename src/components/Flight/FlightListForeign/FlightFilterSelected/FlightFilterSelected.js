import React from "react";
import { connect } from "react-redux";
import { i18n, withTranslation } from "../../../../../i18n";
import styles from "../../../../styles/Flight.module.css";
import { RemoveIcon } from "../../../UI/Icons";
import { Filter } from "../../../../actions/flight/Flight";
import PriceFormat from "../../../UI/PriceFormat/PriceFormat";

const FlightFilterSelected = (props) => {
  const {
    t,
    filtersTime,
    filterAirlines,
    filterAirports,
    filtersNumberOfStop,
    filterMaxPrice,
    filterMinPrice,
    minPrice,
    maxPrice,
    Filter,
  } = props;
  const times = {
    "0-6": "قبل از ۶:۰۰ صبح",
    "6-12": "۶:۰۰ صبح تا ۱۱:۵۹ ظهر",
    "12-18": "۱۲:۰۰ ظهر تا ۱۸:۰۰ بعد از ظهر",
    "18-24": "بعد از ۱۸:۰۰ بعد از ظهر",
  };

  const stops = {
    1: t("direct-flight"),
    2: t("stop-less-1"),
    3: t("2stop-less"),
  };

  const removeFilter = (field, data) => {
    const list = props[field].filter((item) => item !== data);
    Filter(field, list);
  };

  const removeFiltersNumberOfStop = (field, data) => {
    Filter(field, data);
  };

  return (
    <div className={styles.selectedFilters}>
      <div className={styles.subjectFilterText}>فیلترهای انتخاب شده :</div>
      {filtersTime.map((time, key) => (
        <button className={styles.togglePill} key={key}>
          <span>{times[time]}</span>
          <span onClick={() => removeFilter("filtersTime", time)}>
            <RemoveIcon />
          </span>
        </button>
      ))}
      {filterAirlines.map((airline, key) => (
        <button className={styles.togglePill} key={key}>
          <span>{airline}</span>
          <span onClick={() => removeFilter("filterAirlines", airline)}>
            <RemoveIcon />
          </span>
        </button>
      ))}
      {filterAirports.map((airport, key) => (
        <button className={styles.togglePill} key={key}>
          <span>{airport}</span>
          <span onClick={() => removeFilter("filterAirports", airport)}>
            <RemoveIcon />
          </span>
        </button>
      ))}
      {filtersNumberOfStop && (
        <button className={styles.togglePill}>
          <span>{stops[filtersNumberOfStop]}</span>
          <span
            onClick={() =>
              removeFiltersNumberOfStop("filtersNumberOfStop", null)
            }
          >
            <RemoveIcon />
          </span>
        </button>
      )}
      {filterMinPrice && filterMinPrice !== minPrice ? (
        <button className={styles.togglePill}>
          <span>
            <PriceFormat price={filterMinPrice} />
            {t("rial")}
          </span>
          <span
            onClick={() =>
              removeFiltersNumberOfStop("filterMinPrice", minPrice)
            }
          >
            <RemoveIcon />
          </span>
        </button>
      ) : (
        ""
      )}
      {filterMaxPrice && filterMaxPrice !== maxPrice ? (
        <button className={styles.togglePill}>
          <span>
            <PriceFormat price={filterMaxPrice} />
            {t("rial")}
          </span>
          <span
            onClick={() =>
              removeFiltersNumberOfStop("filterMaxPrice", maxPrice)
            }
          >
            <RemoveIcon />
          </span>
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filterMinPrice: state.flightForeign.filterMinPrice,
    filterMaxPrice: state.flightForeign.filterMaxPrice,
    filterAirlines: state.flightForeign.filterAirlines,
    filterAirports: state.flightForeign.filterAirports,
    filtersNumberOfStop: state.flightForeign.filtersNumberOfStop,
    filtersTime: state.flightForeign.filtersTime,
    minPrice: state.flightForeign.minPrice,
    maxPrice: state.flightForeign.maxPrice,
  };
};

const mapDispatchToProp = {
  Filter,
};

export default withTranslation("common")(
  connect(mapStateToProps, mapDispatchToProp)(FlightFilterSelected)
);
