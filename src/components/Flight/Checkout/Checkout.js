import React, { useEffect, useState } from "react";
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import { i18n, withTranslation, Router } from "../../../../i18n";
import moment from "moment-jalaali";

import styles from "../../../styles/Flight.module.css";
import CheckoutSteps from "./CheckoutSteps";
import { LoadingOutlined } from "@ant-design/icons";
import { Row, Col, Form, Skeleton } from "antd";
import AsideCheckout from "./AsideCheckout";
import ContentCheckout from "./ContentCheckout";
import FlightNoAvailable from "../FlightList/FlightListContent/FlightNoAvailable";
import { FlightGetValidate } from "../../../actions";
import { useRouter } from 'next/router';
moment.loadPersian({ dialect: "persian-modern" });
const Checkout = (props) => {
  const { t } = props;
  const router = useRouter();
  const urlParameters = {
    ADT: router.query.adult | 0,
    CHD: router.query.child | 0,
    INF: router.query.infant | 0,
  };

  const [flights, setFlights] = useState("");
  const [loading, setLoading] = useState(true);
  const [capacity, setCapacity] = useState(0);
  const [passengers, setPassengers] = useState(urlParameters);
  const [captchaLink, setcaptchaLink] = useState("");

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await FlightGetValidate(router.query.key);      
      if (res.status == 200) {
        const flightList = [res.data.result.departureFlight];
        const captcha = [res.data.result.captchaLink];
        if (res.data.result.returnFlight) {
          flightList.push(res.data.result.returnFlight);
        }

        const data = await sumPrice(flightList, passengers);
        setFlights(data);
        getMaxCapacity(data);
        setcaptchaLink(captcha);
      }
      setLoading(false);
    };

    getData();
  }, []);

  const getMaxCapacity = (data) => {
    const capacity1 = data[0].capacity ? data[0].capacity : 9;
    const capacity2 = data[1] && data[1].capacity ? data[1].capacity : 9;
    if (capacity1 < capacity2) {
      setCapacity(capacity1);
    } else {
      setCapacity(capacity2);
    }
  };

  const sumPrice = async (data, _passengers) => {
    const flights = data.map((flight, index) => {
      let persons = [],
        sum = 0;
      if (Number(_passengers.ADT)) {
        sum = sum + _passengers.ADT * flight.adultPrice;
        persons.push({
          type: t('adult'),
          count: _passengers.ADT,
          price: flight.adultPrice,
        });
      }
      if (Number(_passengers.CHD)) {
        sum = sum + _passengers.CHD * flight.childPrice;
        persons.push({
          type: t('child'),
          count: _passengers.CHD,
          price: flight.childPrice,
        });
      }
      if (Number(_passengers.INF)) {
        sum = sum + _passengers.INF * flight.infantPrice;
        persons.push({
          type: t('infant'),
          count: _passengers.INF,
          price: flight.infantPrice,
        });
      }
      flight.persons = persons;
      flight.sumPrice = sum;

      return flight;
    });
    return flights;
  };

  const updatePassengers = (value) => {
    setPassengers(value);
    if (flights.length > 1) {
      sumPrice([flights[0], flights[1]], value);
    } else {
      sumPrice([flights[0]], value);
    }
  };
  const goBack = () => {
    Router.push(localStorage.getItem("searchFlight"));
  };

  return (
    <div
      className={`${styles.flightCheckout} ${process.env.THEME_NAME === "TRAVELO" && styles.flightCheckoutTravelo}`}
      >
      <div className={styles.container}>
        <CheckoutSteps />
        {!loading ? (
          flights && flights.length ? (
            // <Form layout="vertical" name="nest-messages">
              <Row gutter={[20, 0]}>
                <Col xs={24} sm={24} md={16}>
                  {props.userInfo.loadingGetUser || <ContentCheckout
                    passengers={passengers}
                    updatePassengers={updatePassengers}
                    capacity={capacity}
                    captchaLink={captchaLink}
                    userInfo={props.userInfo.isAuthenticated?props.userInfo.user:undefined}
                  />}
                </Col>
                <Col xs={24} sm={24} md={8 }>
                  <AsideCheckout
                    departureFlight={flights[0]}
                    returnFlight={flights[1]}
                    passengers={passengers}
                  />
                </Col>
              </Row>
            // </Form>
          ) : (
            <FlightNoAvailable
              subjectText={t('selected-flight-is-not-available')}
              helpText={t('please-choose-another-flight')}
              btnText={t('return')}
              handler={() => goBack()}
            />
          )
        ) : (
          <Col className={styles.loadingCheckout}>
            <LoadingOutlined spin className={styles.icon} />
            {t("getting-informaion")}
          </Col>
        )}
      </div>
    </div>
  );
};

Checkout.getInitialProps = async () => ({
  namespacesRequired: "common",
});

Checkout.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStatesToProps = state => {
  return {
      userInfo : state.auth
  }
}

export default connect(mapStatesToProps)(withTranslation("common")(Checkout));