import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { i18n, withTranslation } from "../../../../../i18n";
import { Collapse, Skeleton, Checkbox, Row, Col } from "antd";
import { DownOutlined } from "@ant-design/icons";

import styles from "../../../../styles/Flight.module.css";

const { Panel } = Collapse;

class FilterTime extends React.Component {
  onChange = (value) => {
    this.props.handleFilter(value);
  };
  clearFilter = () => {
    this.props.handleFilter([]);
  };

  render() {
    const { t } = this.props;
    const checkStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px",
      marginRight: "0",
    };
    const options = [
      {
        label: (
          <>
            <span className="option-filter">{t('before-6-am')}</span>
          </>
        ),
        value: "0-6",
      },
      {
        label: (
          <>
            <span className="option-filter">{t('6am-to-1159pm')}</span>
          </>
        ),
        value: "6-12",
      },
      {
        label: (
          <>
            <span className="option-filter">{t('12pm-to-18pm')}</span>
          </>
        ),
        value: "12-18",
      },
      {
        label: (
          <>
            <span className="option-filter">{t('after-18pm')}</span>
          </>
        ),
        value: "18-24",
      },
    ];

    return (
      <>
        {this.props.loading ? (
          <div className="filter-item">
            <div className="filter-lable clearfix">
              <Skeleton.Button
                style={{ width: 100, height: 15 }}
                active
                size="small"
              />
            </div>
            <Row style={{ lineHeight: 2 }}>
              <Col flex="auto">
                <Checkbox disabled>
                  <Skeleton.Button
                    style={{ width: 100, height: 15, margin: 5 }}
                    active
                    size="small"
                  />
                </Checkbox>
              </Col>
              <Col flex="auto">
                <Checkbox disabled>
                  <Skeleton.Button
                    style={{ width: 100, height: 15, margin: 5 }}
                    active
                    size="small"
                  />
                </Checkbox>
              </Col>
              <Col flex="auto">
                <Checkbox disabled>
                  <Skeleton.Button
                    style={{ width: 100, height: 15, margin: 5 }}
                    active
                    size="small"
                  />
                </Checkbox>
              </Col>
            </Row>
          </div>
        ) : (
          <div className="filter-item">
            <div className="filter-lable clearfix">
              <label className="pull-start"> {t("flight-time")}</label>
              {this.props.defaultValue.length ? (
                <button
                  disabled={this.props.loading}
                  type="button"
                  className="pull-end filter-reset-btn"
                  onClick={this.clearFilter}
                >
                  {t("reset-filter")}
                </button>
              ) : (
                ""
              )}
            </div>
            <Checkbox.Group
              disabled={this.props.loading}
              className="vertical-checkbox-group"
              defaultValue={this.props.defaultValue}
              value={this.props.defaultValue}
              options={options}
              onChange={(e) => {
                this.onChange(e);
              }}
            />
          </div>
        )}
      </>
    );
  }
}

FilterTime.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

FilterTime.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(FilterTime);
