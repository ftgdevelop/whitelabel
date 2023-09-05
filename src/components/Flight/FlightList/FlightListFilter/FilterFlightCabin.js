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
    this.props.handleFilter(value);
  };
  clearFilter = () => {
    this.props.handleFilter([]);
  };

  // componentWillReceiveProps = nextProps => {
  //   
  //   if (!(_.isEqual(nextProps.filters.filterFlightCabin,this.props.filters.filterFlightCabin))){
  //       
  //       this.setState({value: nextProps.filters.filterFlightCabin});
  //   }
  // };
  groupBy = (array) => {
    if(array && array.length){
        return array.reduce((result, currentValue) => {
        (result[currentValue['cabinClass']['name'] ]= result[currentValue['cabinClass']['name']] || []).push(
            currentValue
        );
        return result;
        }, {});
    }else{
        return {}
    }
  };


  render() {
    const { t } = this.props;
    const checkStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px",
      marginRight: "0",
    };

    const data = this.groupBy(this.props.allFlightList)

    const options = [
      {
        label: (
          <>
            <span className="option-filter">{t('economy')}</span>
            <span> ({data.Economy? data.Economy.length: 0})</span>
          </>
        ),
        value: "Economy",
      },
      {
        label: (
          <>
            <span className="option-filter">{t('business')}</span>
            <span> ({data.Business? data.Business.length: 0})</span>
          </>
        ),
        value: "Business",
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
              <label className="pull-start"> {t('cabin-type')}</label>
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
