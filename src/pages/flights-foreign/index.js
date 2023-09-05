import PropTypes from "prop-types";
import { withTranslation } from "../../../i18n";
import Layout from "../../components/Layout/Layout";
import Head from "next/head";

const FlightListForeignPage = ({ t }) => (
  <Layout>
    <Head>
      <title>{t("flights-list")}</title>
      <link rel="stylesheet" type="text/css" href="https://cdn2.safaraneh.com/libs/react-modern-calendar-datepicker/3.1.6/css/datepicker.min.css" />
    </Head>
  </Layout>
);

FlightListForeignPage.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

FlightListForeignPage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(FlightListForeignPage);
