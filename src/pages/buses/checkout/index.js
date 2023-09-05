import PropTypes from 'prop-types'
import { withTranslation } from '../../../../i18n'
import Layout from '../../../components/Layout/Layout'
import Head from 'next/head'
import Checkout from '../../../components/Bus/Checkout/Checkout'

const BusesCheckoutPage = ({ t }) => (
  <Layout>
        <Head>
            <title>اطلاعات مسافران</title>
        </Head>
        
        <Checkout/>
        
  </Layout>
)

BusesCheckoutPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

BusesCheckoutPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(BusesCheckoutPage)