import PropTypes from 'prop-types'
import { withTranslation } from '../../../../i18n'
import Layout from '../../../components/Layout/Layout'
import Head from 'next/head'
import Booking from '../../../components/Bus/Booking/Booking'

const BusesCheckoutPage = ({ t }) => (
  <Layout>
        <Head>
            <title>تکمیل خرید</title>
        </Head>

        <Booking/>
        
  </Layout>
)

BusesCheckoutPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

BusesCheckoutPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(BusesCheckoutPage)