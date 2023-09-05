import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { i18n, withTranslation } from "../../../../../i18n";
import { Collapse, Skeleton, Checkbox, Row, Col } from "antd";
import { DownOutlined } from "@ant-design/icons";

import styles from "../../../../styles/Bus.module.css";

const { Panel } = Collapse;

class FilterFlightType extends React.Component {
  render() {
    const { t } = this.props;
    const options = [
      {
        label: (
          <>
            <span className="option-filter">دارای ظرفیت</span>
          </>
        ),
        value: "System",
      },
      {
        label: (
          <>
            <span className="option-filter">با تخفیف</span>
          </>
        ),
        value: "",
      },
      {
        label: (
          <>
            <span className="option-filter">با مقصد نهایی</span>
          </>
        ),
        value: "",
      },
      {
        label: (
          <>
            <span className="option-filter">بین‌راهی</span>
          </>
        ),
        value: "",
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
              <label className="pull-start"> نوع اتوبوس</label>
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
            />
          </div>
        )}
      </>
    );
  }
}

FilterFlightType.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

FilterFlightType.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(FilterFlightType);
