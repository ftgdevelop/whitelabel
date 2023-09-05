import React from "react";
import PropTypes from "prop-types";
import { i18n, withTranslation } from "../../../../../i18n";
import { Radio, Button } from "antd";

import styles from "../../../../styles/Bus.module.css";
import { SortIcon } from "../../../UI/Icons";
class SortBusList extends React.Component {
  changeValue = (e) => {
    this.props.changeSort(e.target.value);
  };

  render() {
    const { t } = this.props;
    return (
      <>
        <div className={styles.sortFlightList}>
          <span className={styles.sortFlightListText}>{t("sort-by")} :</span>
          <span className={styles.sortFlightListIcon}>
            <SortIcon />
          </span>
          <Radio.Group
            defaultValue="LowPrice"
            className={styles.sortRadioGroup}
            onChange={(e) => this.changeValue(e)}
          >
            <Radio.Button value="LowPrice"> {t("lowest-price")}</Radio.Button>
            <Radio.Button value="HighPrice"> {t("highest-price")}</Radio.Button>
            <Radio.Button value="departureTime"> زمان سفر </Radio.Button>
          </Radio.Group>
        </div>
      </>
    );
  }
}

SortBusList.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

SortBusList.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(SortBusList);
