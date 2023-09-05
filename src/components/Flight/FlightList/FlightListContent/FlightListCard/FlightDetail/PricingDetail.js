import React from "react";
import PropTypes from "prop-types";
import { i18n, withTranslation } from "../../../../../../../i18n";
import styles from "../../../../../../styles/Flight.module.css";

const FlightDetail = (props) => {
  const { info, sum,t } = props;

  function numberWithCommas(x) {
    return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x;
  }

  return (
    <>
      {info && info.length
        ? info.map((item, index) => (
            <div key={index} className={styles.detailFlightPrice}>
              <small>
                {item.type} ({item.count})
              </small>
              <small>{numberWithCommas(item.price)} {t('rial')}</small>
            </div>
          ))
        : ""}
      <div className={styles.totalFlightPrice}>
        <b>{t('total')}</b>
        <b> {numberWithCommas(sum)} {t('rial')}</b>
      </div>
    </>
  );
};

FlightDetail.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

FlightDetail.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(FlightDetail);
