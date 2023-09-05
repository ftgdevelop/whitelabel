import PropTypes from 'prop-types'
import { withTranslation } from '../../../i18n'
import Layout from '../../components/Layout/Layout'
import Head from 'next/head'
import Booking from '../../components/Hotel/BookingForeign/Booking'

const BookingPage = ({ t }) => (
  <Layout>
        <Head>
            <title>صفحه رزرو</title>
        </Head>
        
        <Booking/>

  </Layout>
)

BookingPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

BookingPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(BookingPage)