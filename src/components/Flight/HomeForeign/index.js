import React from "react";
import PropTypes from "prop-types";
import { i18n, withTranslation } from "../../../../i18n";

import styles from "../../../styles/Home.module.css";
import SearchFlightForeign from "../SearchFlightForeign/SearchFlightForeign";

class FlightsHomeForeign extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <div className={styles.searchBox}>
        <div className={styles.container}>
          <div className={styles.flightsHomeSubject}>
            <h1>{t("searchbox-title")}</h1>
          </div>
        </div>
        <div className={styles.flightsHome}>
          <div className={styles.container}>
            <div className={styles.wrapSearchFlight}>
              <SearchFlightForeign />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FlightsHomeForeign.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

FlightsHomeForeign.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(FlightsHomeForeign);
