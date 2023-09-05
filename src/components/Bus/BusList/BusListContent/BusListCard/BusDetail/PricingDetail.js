import React from "react";
import PropTypes from "prop-types";
import { i18n, withTranslation } from "../../../../../../../i18n";
import styles from "../../../../../../styles/Bus.module.css";

const PricingDetail = (props) => {
  const { info, bus, t } = props;

  function numberWithCommas(x) {
    return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x;
  }

  return (
    <>
      {/* {info && info.length
        ? info.map((item, index) => (
          <div key={index} className={styles.detailFlightPrice}>
              <small>بزرگسال (1)</small>
              <small>5,556,000 ریال</small>
            </div>
          ))
        : ""} */}
      <div className={styles.totalFlightPrice}>
        <b>{t('total')}</b>
        <b>{numberWithCommas(bus.salePrice)} <small>{t('rial')}</small></b>
      </div>
    </>
  );
};

PricingDetail.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

PricingDetail.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(PricingDetail);