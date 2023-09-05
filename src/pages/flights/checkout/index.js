import PropTypes from 'prop-types'
import { withTranslation } from '../../../../i18n'
import Layout from '../../../components/Layout/Layout'
import Head from 'next/head'

import Checkout from '../../../components/Flight/Checkout/Checkout'

const CheckoutPage = ({ t }) => (
  <Layout>
        <Head>
            <title>{t("passengers-information")}</title>
            <link rel="stylesheet" type="text/css" href="https://cdn2.safaraneh.com/libs/react-phone-input-2/style.min.css" />
        </Head>
        
        <Checkout/>
        
  </Layout>
)

CheckoutPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

CheckoutPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(CheckoutPage)