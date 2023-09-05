import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { i18n, withTranslation, Router } from "../../../../i18n";
import moment from "moment-jalaali";
import { connect } from "react-redux";
import styles from "../../../styles/Flight.module.css";
import { LoadingOutlined } from "@ant-design/icons";
import { Row, Col, Form, Skeleton } from "antd";
import FlightNoAvailable from "../FlightListForeign/FlightListForeignContent/FlightNoAvailable";
import { useRouter } from "next/router";
import BookingSteps from "./BookingSteps";
import AsideBooking from "../CheckoutForeign/AsideCheckout";
import ContentBooking from "./ContentBooking";
import {
  GetConfirm,
  GetReserve,
  GetVoucherPdf,
} from "../../../actions/flight/Flight";
moment.loadPersian({ dialect: "persian-modern" });

const BookingForeign = (props) => {
  const { t } = props;
  const router = useRouter();

  useEffect(() => {
    props.GetReserve(router.query.reserveId, router.query.username);
    props.GetConfirm(router.query.reserveId, router.query.username);
  }, []);

  useEffect(() => {
    if (props.confirmComplete)
      setTimeout(
        () => props.GetConfirm(router.query.reserveId, router.query.username),
        3000
      );
  }, [props.confirmComplete]);

  return (
    <div
      className={`${styles.flightCheckout} ${
        process.env.THEME_NAME === "TRAVELO" && styles.flightCheckoutTravelo
      }`}
    >
      <div className={styles.container}>
        <BookingSteps />
        <Form layout="vertical" name="nest-messages">
          <Row gutter={[20, 0]}>
            <Col span={16}>
              <ContentBooking
                loading={props.loading}
                flights={props.data.reserve}
                vocherData={props.vocherData}
                GetVoucherPdf={props.GetVoucherPdf}
              />
            </Col>
            <Col span={8}>
              <AsideBooking
                loading={props.loadingGetReserve}
                flight={props.GetReserveData}
                hiddenSubmit={true}
              />
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

BookingForeign.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

BookingForeign.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProp = (state) => {
  return {
    data: state.flightForeign.confirmData,
    loading: state.flightForeign.confirmLoading,
    error: state.flightForeign.confirmError,
    GetReserveData: state.flightForeign.GetReserveData,
    loadingGetReserve: state.flightForeign.loadingGetReserve,
    confirmComplete: state.flightForeign.confirmComplete,
    vocherData: state.flightForeign.vocherData,
  };
};

const mapDispatchToProp = (dispatch) => ({
  GetConfirm: (id, username) => dispatch(GetConfirm(id, username)),
  GetReserve: (id, username) => dispatch(GetReserve(id, username)),
  GetVoucherPdf: (id, username) => dispatch(GetVoucherPdf(id, username)),
});

export default withTranslation("common")(
  connect(mapStateToProp, mapDispatchToProp)(BookingForeign)
);
