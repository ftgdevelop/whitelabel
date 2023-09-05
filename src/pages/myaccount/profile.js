import PropTypes from "prop-types";
import { withTranslation, i18n } from "../../../i18n";
import Layout from "../../components/Layout/Layout";
import Head from "next/head";

import styles from "../../styles/Home.module.css";
import Profile from "../../components/MyAccount/Profile";
import RequireAuth from "../../utils/requireAuth";

const ProfilePage = ({ t }) => (
  <Layout>
    <Head>
      <title>{t("profile-view-edit")}</title>
      <link rel="stylesheet" type="text/css" href="https://cdn2.safaraneh.com/libs/react-phone-input-2/style.min.css" />
    </Head>
    <div
      className={`${styles.otherPage} ${process.env.THEME_NAME === "TRAVELO" && styles.otherPageTravelo}`}
      >
      <div className={styles.container}>
        <Profile />
      </div>
    </div>
  </Layout>
);

ProfilePage.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

ProfilePage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(RequireAuth(ProfilePage));
