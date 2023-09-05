import React from "react";
import PropTypes from "prop-types";
import { i18n, withTranslation } from "../../../../../i18n";
import { Skeleton } from "antd";

import styles from "../../../../styles/Bus.module.css";

const FilterResult = (props) => {
  const { t } = props;
  return (
    <>
      <div className={styles.filterResult}>
        {t("your-search-result")}
        <div className={styles.textFilterResult}>
          {props.total} اتوبوس پیدا شد
        </div>
      </div>
    </>
  );
};

FilterResult.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

FilterResult.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(FilterResult);
