import React from "react";
import PropTypes from "prop-types";
import { withTranslation } from "../../../../../i18n";
import { Tabs, Spin } from "antd";
import dynamic from "next/dynamic";
import { LoadingOutlined } from "@ant-design/icons";

import styles from "../../../../styles/Home.module.css";

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 32, color: "#ffffff" }} spin />
);

const SearchHotel = dynamic(
  () => import("../../../Hotel/SearchHotel/SearchHotel"),
  {
    loading: () => (
      <div style={{ textAlign: "center" }}>
        <Spin indicator={loadingIcon} />
      </div>
    ),
  }
);
const DomesticSearchHotel = dynamic(
  () => import("../../../Hotel/SearchHotel/DomesticSearchHotel"),
  {
    loading: () => (
      <div style={{ textAlign: "center" }}>
        <Spin indicator={loadingIcon} />
      </div>
    ),
  }
);
const SearchFlight = dynamic(
  () => import("../../../Flight/SearchFlight/SearchFlight"),
  {
    loading: () => (
      <div style={{ textAlign: "center" }}>
        <Spin indicator={loadingIcon} />
      </div>
    ),
  }
);
const SearchFlightForeign = dynamic(
  () => import("../../../Flight/SearchFlightForeign/SearchFlightForeign"),
  {
    loading: () => (
      <div style={{ textAlign: "center" }}>
        <Spin indicator={loadingIcon} />
      </div>
    ),
  }
);
const SearchCip = dynamic(() => import("../../../Cip/SearchCip/SearchCip"), {
  loading: () => (
    <div style={{ textAlign: "center" }}>
      <Spin indicator={loadingIcon} />
    </div>
  ),
});
const SearchBus = dynamic(() => import("../../../Bus/SearchBus/SearchBus"), {
  loading: () => (
    <div style={{ textAlign: "center" }}>
      <Spin indicator={loadingIcon} />
    </div>
  ),
});

const { TabPane } = Tabs;

class TabSearch extends React.Component {
  state = { size: "small" };

  onChange = (e) => {
    this.setState({ size: e.target.value });
  };

  render() {
    const { t } = this.props;
    const { size } = this.state;
    return (
      <div>
        <Tabs
          defaultActiveKey="1"
          type="card"
          size={size}
          className={styles.tabSearch}
        >
          <TabPane tab={t("domestic-hotels")} key="1">
            <div className={styles.wrapSearchHotel}>
              {process.env.DomesticHotelV4 ? <DomesticSearchHotel /> :<SearchHotel/>}
            </div>
          </TabPane>
          <TabPane tab={t("domestic-flight")} key="2">
            <SearchFlight />
          </TabPane>
          <TabPane tab={t("foreign-hotels")} key="3">
            <div className={styles.wrapSearchHotel}>
              <SearchHotel isForeign />
            </div>
          </TabPane>
          <TabPane tab={t("foreign-flight")} key="4">
            <SearchFlightForeign />
          </TabPane>
          <TabPane tab={t("cip")} key="5">
            <div className={styles.wrapSearchCip}>
              <SearchCip />
            </div>
          </TabPane>
          <TabPane tab={t("bus")} key="6">
            <SearchBus/>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

TabSearch.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

TabSearch.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(TabSearch);
