import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Line } from "rc-progress";
import { Router, i18n, withTranslation } from "../../../../../../i18n";
import { useRouter } from "next/router";
import {
  FetchKeyFlights,
  FetchFlights,
  FlightSort,
  reset,
  resetFilter,
  PostValidate,
} from "../../../../../actions/flight/Flight";
import styles from "../../../../../styles/Flight.module.css";
import FlightDetail from "./FlightDetail";
import FlightNoAvailable from "../FlightNoAvailable";

const FlightListCard = (props) => {
  const router = useRouter();
  const urlParameters = { ...router.query };

  const { t, flights, keyAvailability, FlightSort } = props;

  const [count, setCount] = useState(10);
  const [idSelected, setIdSelected] = useState("");
  const [percentLoading, setPercentLoading] = useState(5);

  
  const getFlightKey = async () => {
    setTimeout(() => {
      setPercentLoading(20);
    }, 800);
    const params = await getParams();
    props.FetchKeyFlights(params);
    setTimeout(() => {
      setPercentLoading(40);
    }, 800);
  };

  const getParams = () => {
    const pathFlight = urlParameters.index.split("-");
    let originCodes = [];
    let destinationCodes = [];
    for (var i = 0; i < pathFlight.length; i += 2) {
      originCodes.push(pathFlight[i]);
      pathFlight[i + 1] && destinationCodes.push(pathFlight[i + 1]);
    }
    let airTrip = originCodes.length > 1 ? "severalRoutes" : "OneWay";
    let params = {
      originCodes: originCodes,
      destinationCodes: destinationCodes,
      departureTime:
        airTrip === "OneWay"
          ? [urlParameters.departing]
          : urlParameters.departing,
      adult: Number(urlParameters.adult),
      child: Number(urlParameters.child),
      infant: Number(urlParameters.infant),
      airTrip: airTrip,
    };

    if (urlParameters.returning) {
      params.retrunTime = [urlParameters.returning];
      params.airTrip = "roundTrip";
    }

    return params;
  };

  const getFlights = async () => {
    if (props.keyAvailability) {
      await props.FetchFlights(keyAvailability);

      setTimeout(() => {
        setPercentLoading(60);
      }, 800);
    }
  };

  useEffect(() => {
    if (props.keyValidate) {
      Router.push(`/flights-foreign/checkout?key=${props.keyValidate}`);
    }
  }, [props.keyValidate]);

  useEffect(() => {
    props.reset();
    getFlightKey();
  }, []);

  useEffect(() => {
    if (!props.loadingFetchFlight) {
      if (props.isCompleted) {
        setTimeout(() => {
          setPercentLoading(100);
        }, 800);
      } else {
        setTimeout(() => {
          getFlights();
        }, 4000);
      }
    }
  }, [props.loadingFetchFlight]);

  useEffect(() => {
    const handleScroll = (event) => {
      var y = window.scrollY;
      if (y + 1300 > event.srcElement.body.scrollHeight) {
        if (count + 10 < flights.length) setCount(count + 10);
        else {
          setCount(flights.length);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  useEffect(() => {
    if (props.key !== null) getFlights();
  }, [props.keyAvailability]);

  useEffect(() => {
    if (props.flights.length && !props.isCompleted) {
      setTimeout(getFlights, 4000);
    }
  }, [props.flights]);

  useEffect(() => {
    flights.length && flights.length < 10
      ? setCount(flights.length)
      : setCount(10);
    FlightSort();
  }, [props.sortby]);

  useEffect(() => {
    flights.length && flights.length < 10
      ? setCount(flights.length)
      : setCount(10);
  }, [props.flights.length]);

  const selectedFlight = (key) => {
    if (!props.loadingPostValidate) {
      setIdSelected(key);
      props.PostValidate({ key: key });
    }
  };

  const selectFlight = () => {
    props.selectedFlight(props.flight.flightKey);
  };

  return (
    <>
      {percentLoading !== 100 && (
        <div className={styles.loadingFlightSearch}>
          <span>{t("getting-best-suggestion")}</span>
          <Line
            percent={percentLoading}
            // strokeWidth="1"
            strokeColor="#71ce6c"
          />
        </div>
      )}

      {flights.length ? (
        <>
          {flights.slice(0, count).map(
            (flight, index) =>
              flight && (
                <div
                  className={`${styles.flightCard} ${styles.flightCardForeign}`}
                >
                  <FlightDetail
                    flight={flight}
                    key={index}
                    selectedFlight={selectedFlight}
                    loading={
                      props.loadingPostValidate &&
                      idSelected === flight.flightKey
                    }
                  />
                </div>
              )
          )}
        </>
      ) : (
        ""
      )}

      {props.isCompleted && !flights.length && props.flightTotal ? (
        <FlightNoAvailable
          subjectText={t("no-flight-available-filter")}
          helpText={t("change-filter")}
          btnText={t("clear-filters")}
          handler={props.resetFilter}
        />
      ) : null}
    </>
  );
};

FlightListCard.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

FlightListCard.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    keyValidate: state.flightForeign.keyValidate,
    keyAvailability: state.flightForeign.keyAvailability,
    flights: state.flightForeign.flights,
    fetchingKey: state.flightForeign.fetchingKey,
    fetchingFlights: state.flightForeign.fetchingFlights,
    isCompleted: state.flightForeign.isCompleted,
    error: state.flightForeign.error,
    sortby: state.flightForeign.sortby,
    loadingPostValidate: state.flightForeign.loadingPostValidate,
    flightTotal: state.flightForeign.flightTotal,
    loadingFetchFlight: state.flightForeign.loadingFetchFlight,
  };
};

const mapDispatchToProp = (dispatch) => ({
  FetchKeyFlights: (d) => dispatch(FetchKeyFlights(d)),
  FetchFlights: (d) => dispatch(FetchFlights(d)),
  FlightSort: (d) => dispatch(FlightSort(d)),
  reset: () => dispatch(reset()),
  PostValidate: (d) => dispatch(PostValidate(d)),
  resetFilter: () => dispatch(resetFilter()),
});

export default withTranslation("common")(
  connect(mapStateToProps, mapDispatchToProp)(FlightListCard)
);
