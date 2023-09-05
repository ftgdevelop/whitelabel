import React from "react";
import PropTypes from "prop-types";
import { i18n, withTranslation } from "../../../../../../../i18n";
import styles from "../../../../../../styles/Bus.module.css";

const RolesBus = (props) => {
  return (
    <div className={styles.rolesBus}>
      <div className={`${styles.role} ${styles.role01}`}>
        <small>10% جریمه</small>
        <span>از زمان صدور تا یک ساعت قبل از حرکت</span>
      </div>
      <div className={`${styles.role} ${styles.role02}`}>
        <small>جریمه 50% حضوری</small>
        <span>امکان استرداد بلیط از یک ساعت قبل از حرکت تا بعد از حرکت</span>
      </div>
    </div>
  )
};

RolesBus.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

RolesBus.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(RolesBus);
