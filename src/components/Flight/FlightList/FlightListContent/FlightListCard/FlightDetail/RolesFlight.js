import React from "react";
import PropTypes from "prop-types";
import { i18n, withTranslation } from "../../../../../../../i18n";

const RolesFlight = (props) => {
  return <>قوانین</>;
};

RolesFlight.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

RolesFlight.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(RolesFlight);
