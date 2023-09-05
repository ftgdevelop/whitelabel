import PropTypes from 'prop-types'
import { Link, withTranslation, i18n } from '../../../../i18n'
import Layout from '../../../components/Layout/Layout'
import Head from 'next/head'

import styles from '../../../styles/Home.module.css'
import Hotel from '../../../components/MyAccount/Booking/Hotel'

const HotelBookingPage = ({ t }) => (
  <Layout>
    <Head>
        <title>{t("title")}</title>
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css" />
        <link rel="stylesheet" type="text/css" href="https://unpkg.com/leaflet-geosearch@latest/assets/css/leaflet.css" />
    </Head>
      <div
        className={`${styles.otherPage} ${process.env.THEME_NAME === "TRAVELO" && styles.otherPageTravelo}`}
        >
        <div className={styles.container}>

            <Hotel/>
            
        </div>
      </div>
  </Layout>
)

HotelBookingPage.getInitialProps = async () => ({
  namespacesRequired: ["common"],
})

HotelBookingPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation("common")(HotelBookingPage)