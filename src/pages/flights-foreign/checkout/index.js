import PropTypes from 'prop-types'
import { withTranslation } from '../../../../i18n'
import Layout from '../../../components/Layout/Layout'
import Head from 'next/head'

import CheckoutForeign from '../../../components/Flight/CheckoutForeign/CheckoutForeign'

const CheckoutPage = ({ t }) => (
  <Layout>
        <Head>
            <title>{t("passengers-information")}</title>
        </Head>
        
        <CheckoutForeign/>
        
  </Layout>
)

CheckoutPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

CheckoutPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(CheckoutPage)