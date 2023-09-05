import PropTypes from 'prop-types'
import { Link, withTranslation, i18n } from '../../../../i18n'
import Layout from '../../../components/Layout/Layout'
import Head from 'next/head'
import RequireAuth from '../../../utils/requireAuth'


import styles from '../../../styles/Home.module.css'
import BookingHotel from '../../../components/MyAccount/Booking/Booking'

const BookingPage = ({ t }) => (
  <Layout>
    <Head>
        <title>{t("my-reserves")}</title>
    </Head>
      <div
        className={`${styles.otherPage} ${process.env.THEME_NAME === "TRAVELO" && styles.otherPageTravelo}`}
        >
        <div className={styles.container}>

            <BookingHotel/>
            
        </div>
      </div>
  </Layout>
)

BookingPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

BookingPage.propTypes = {
  t: PropTypes.func.isRequired,
}


export default (withTranslation('common'))(RequireAuth(BookingPage))
