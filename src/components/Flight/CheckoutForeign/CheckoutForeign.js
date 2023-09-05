import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { i18n, withTranslation, Router } from "../../../../i18n";
import moment from "moment-jalaali";
import { connect } from "react-redux";
import styles from "../../../styles/Flight.module.css";
import CheckoutSteps from "./CheckoutSteps";
import { Row, Col, Form } from "antd";
import AsideCheckout from "./AsideCheckout";
import ContentCheckout from "./ContentCheckout";
import { useRouter } from "next/router";
import { FetchValidate, PreReserve } from "../../../actions/flight/Flight";
moment.loadPersian({ dialect: "persian-modern" });

const Checkout = (props) => {
  const { t } = props;
  const router = useRouter();

  useEffect(() => {
    let query = window.location.search;
    query = query.replace("?", "");
    let string = decodeURI(query),
      object = _.fromPairs(string.split("&").map((s) => s.split("=")));
    props.FetchValidate(router.query.key);
  }, []);

  const [form] = Form.useForm();

  const onFinish = (data) => {
    const values = { ...data };
    values.reserver.phoneNumber = values.registrationMobile.replace(/ +/g, "").replace(/[{()}]/g, '').replace(/-/g , "");
    if (!props.loadingPreReserve) {
      props.PreReserve({
        passengers: values.passengers,
        reserver: {
          ...values.reserver,
          userName: values.reserver.phoneNumber,
        },
        preReserveKey: router.query.key,
      });
    }
  };

  const onFinishFailed = (values) => {};

  useEffect(() => {
    if (props.PreReserveData) {
      Router.push(
        `/payment?username=${props.PreReserveData.reserver.userName}&reserveId=${props.PreReserveData.id}`
      );
    }
  }, [props.PreReserveData]);

  return (
    <div
      className={`${styles.flightCheckout} ${
        process.env.THEME_NAME === "TRAVELO" && styles.flightCheckoutTravelo
      }`}
    >
      <div className={styles.container}>
        <CheckoutSteps />
        <Form
          layout="vertical"
          name="nest-messages"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row gutter={[20, 0]}>
            <Col span={16}>
            {props.userInfo.loadingGetUser || <ContentCheckout flight={props.flightSelected} form={form} userInfo={props.userInfo.isAuthenticated?props.userInfo.user:undefined} />}
            </Col>
            <Col span={8}>
              <AsideCheckout
                flight={props.flightSelected}
                loading={props.loadingPreReserve}
              />
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

Checkout.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

Checkout.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProp = (state) => {
  return {
    flightSelected: state.flightForeign.flightSelected,
    PreReserveData: state.flightForeign.PreReserveData,
    loadingPreReserve: state.flightForeign.loadingPreReserve,
    PreReserveData: state.flightForeign.PreReserveData,
    userInfo : state.auth
  };
};

const mapDispatchToProp = (dispatch) => ({
  FetchValidate: (d) => dispatch(FetchValidate(d)),
  PreReserve: (d) => dispatch(PreReserve(d)),
  // clearFilter: () => dispatch(clearFilter()),
});

export default withTranslation("common")(
  connect(mapStateToProp, mapDispatchToProp)(Checkout)
);
