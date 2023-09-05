import React from "react";
import PropTypes from "prop-types";
import { i18n, withTranslation } from "../../../../../i18n";
import { Collapse, Skeleton, Checkbox, Row, Col } from "antd";
import { DownOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

import styles from "../../../../styles/Flight.module.css";

class FilterAirlines extends React.Component {
  onChange = (value) => {
    this.props.handleFilter(value);
  };
  clearFilter = () => {
    this.props.handleFilter([]);
  };

  numberWithCommas = (x) => {
    if (x) {
      return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x;
    }
    return 0;
  };

  render() {
    const { t, airlines } = this.props;
    const checkStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px",
      marginRight: "0",
    };
    const airlineKeys = Object.keys(airlines);
    const options = airlineKeys
      ? airlineKeys.map((key, index) => {
          const obj = {
            label: (              
              <div className="checkbox-detail-item">
                {airlines[key][0].airline.picture ? (
                  <img
                    className={styles.filterAirlineLogo}
                    src={airlines[key][0].airline.picture.path}
                    alt={airlines[key][0].airline.picture.altAttribute}
                  />
                ) : (
                  ""
                )}
                <span className="option-filter">
                  {airlines[key][0].airline.name}
                </span>
                {
                  this.numberWithCommas(airlines[key][0].adultPrice) === 0 ? 
                  <span className={`${styles.filterAirlineCount} ${styles.filterAirlineCountNull}`}>
                    {t('capacity-full')}
                  </span>
                  :
                  <span className={styles.filterAirlineCount}>
                    از {this.numberWithCommas(airlines[key][0].adultPrice)} ریال
                  </span>
                }
              </div>
            ),
            value: airlines[key][0].airline.code,
            priceNull : this.numberWithCommas(airlines[key][0].adultPrice)
          };
          return obj;
        })
      : [];
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
              <label className="pull-start">{t('airlines')}</label>
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
              defaultValue={this.props.defaultValue}
              disabled={this.props.loading}
              className="vertical-checkbox-group vertical-checkbox-group-price"
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

FilterAirlines.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

FilterAirlines.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(FilterAirlines);
