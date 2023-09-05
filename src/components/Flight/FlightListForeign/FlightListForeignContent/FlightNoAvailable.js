import React from "react";
import PropTypes from "prop-types";
import { Link, i18n, withTranslation } from "../../../../../i18n";

import { FlightCloudIcon } from "../../../UI/Icons";

import styles from "../../../../styles/Flight.module.css";
class FlightNoAvailable extends React.Component {
  render() {
    const { t, subjectText, helpText, btnText, handler } = this.props;
    return (
      <>
        <div className={styles.flightNoAvailable}>
          <div className={styles.subjectText}>{subjectText}</div>
          <div className={styles.helpText}>{helpText}</div>
          <div className={styles.btnSearch}>
            <button onClick={() => handler()}>{btnText}</button>
          </div>
          <FlightCloudIcon />
        </div>
      </>
    );
  }
}

FlightNoAvailable.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

FlightNoAvailable.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(FlightNoAvailable);
