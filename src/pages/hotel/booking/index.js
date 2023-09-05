import PropTypes from 'prop-types'
import { withTranslation } from '../../../../i18n'
import Layout from '../../../components/Layout/Layout'
import Head from 'next/head'
import Booking from '../../../components/Hotel/Booking/Booking'
import BookingV4 from '../../../components/Hotel/Booking/BookingV4'

const BookingPage = ({ t }) => (
  <Layout>
        <Head>
            <title>{t('reserve-page')}</title>
        </Head>
        
        {process.env.DomesticHotelV4 ? <BookingV4 /> :<Booking />}

  </Layout>
)

BookingPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

BookingPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(BookingPage)