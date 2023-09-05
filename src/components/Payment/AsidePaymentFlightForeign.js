import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { i18n, withTranslation } from "../../../i18n";
import { GetReserve } from "../../actions/flight/Flight";
import AsideCheckout from "../Flight/CheckoutForeign/AsideCheckout";

const AsidePaymentFlightForeign = (props) => {
  const router = useRouter();

  useEffect(() => {
    props.GetReserve(router.query.reserveId, router.query.username);
  }, []);

  useEffect(() => {
    if (props.flight) {
      props.getPrice(props.flight.totalFare);
    }
  }, [props.flight]);

  return (
    <AsideCheckout
      loading={props.loadingGetReserve}
      flight={props.flight}
      hiddenSubmit={true}
    />
  );
};

AsidePaymentFlightForeign.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

AsidePaymentFlightForeign.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    loadingGetReserve: state.flightForeign.loadingGetReserve,
    flight: state.flightForeign.GetReserveData,
  };
};

const mapDispatchToProp = (dispatch) => ({
  GetReserve: (id, username) => dispatch(GetReserve(id, username)),
});

export default withTranslation("common")(
  connect(mapStateToProps, mapDispatchToProp)(AsidePaymentFlightForeign)
);
