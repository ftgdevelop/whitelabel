import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { i18n, withTranslation } from "../../../../../i18n";
import { Collapse, Skeleton, Checkbox, Row, Col } from "antd";
import { DownOutlined } from "@ant-design/icons";

import styles from "../../../../styles/Flight.module.css";

const { Panel } = Collapse;

class FilterFlightCabin extends React.Component {
  state={
    value: this.props.value,
  }

  onChange = (value) => {
    this.setState({value})
  };

  render() {
    const { t } = this.props;
    const options = [
      {
        label: (
          <>
            <span className="option-filter">{t('economy')}</span>
            <span> (12)</span>
          </>
        ),
        value: "Economy",
      },
      {
        label: (
          <>
            <span className="option-filter">{t('business')}</span>
            <span> (5)</span>
          </>
        ),
        value: "Business",
      },
    ];

    return (
      <>
          <div className="filter-item">
            <div className="filter-lable clearfix">
              <label className="pull-start"> {t('cabin-type')}</label>
                <button
                  disabled={this.props.loading}
                  type="button"
                  className="pull-end filter-reset-btn"
                >
                  {t("reset-filter")}
                </button>
            </div>
            <Checkbox.Group
              className="vertical-checkbox-group"
              options={options}
              onChange={(e) => {
                this.onChange(e);
              }}
            />
          </div>
      </>
    );
  }
}

FilterFlightCabin.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

FilterFlightCabin.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProp = (state) => {
  return {
    filters: state.filterFlights,
  };
};

export default withTranslation("common")(FilterFlightCabin);
