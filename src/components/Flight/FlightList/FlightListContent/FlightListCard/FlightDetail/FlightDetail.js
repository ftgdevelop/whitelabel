import React from "react";
import PropTypes from "prop-types";
import { i18n, withTranslation } from "../../../../../../../i18n";
import { Tabs, Tab, TabPanel, TabList } from "react-re-super-tabs";
import CustomTab from "../../../../../UI/CustomTab/CustomTab";
import InfoFlight from "./InfoFlight";
import RolesFlight from "./RolesFlight";
import styles from "../../../../../../styles/Flight.module.css";

const FlightDetail = (props) => {
  const { flight,t } = props;
  return (
    <>
      {/* <Tabs activeTab='info'>
                <TabList>
                <Tab component={CustomTab} label='اطلاعات پرواز' id='info' />
                <Tab component={CustomTab} label='قوانین استرداد کنسلی' id='role' />
                </TabList>
                <TabList className={styles.flightTab} >
                <TabPanel component={()=><InfoFlight flight={flight} />} id='info' />
                <TabPanel component={RolesFlight} id='role'/>
                </TabList>
            </Tabs> */}
      <InfoFlight flight={flight} />
    </>
  );
};

FlightDetail.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

FlightDetail.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(FlightDetail);
