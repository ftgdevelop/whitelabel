import PropTypes from "prop-types";
import { withTranslation ,Router} from "../../../i18n";
import Layout from "../../components/Layout/Layout";
import Head from "next/head";
import { useEffect } from "react";

import FlightListForeign from "../../components/Flight/FlightListForeign/FlightListForeign";
const FlightListForeignPage = ({ t }) => {
  useEffect(()=>{
    if(Router && !process.env.MODULES.includes("foreignFlight")) {Router.push("/")}
  });
  return(
    (process.env.MODULES.includes("foreignFlight")) && <Layout>
    <Head>
        <title>{t("flights-list")}</title>
        <link rel="stylesheet" type="text/css" href="https://cdn2.safaraneh.com/libs/react-modern-calendar-datepicker/3.1.6/css/datepicker.min.css" />
    </Head>
    
      <FlightListForeign />
  </Layout>
)};

FlightListForeignPage.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

FlightListForeignPage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(FlightListForeignPage);
