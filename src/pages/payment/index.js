import PropTypes from 'prop-types'
import { withTranslation } from '../../../i18n'
import Layout from '../../components/Layout/Layout'
import Head from 'next/head'

import Payment from '../../components/Payment/Payment'

const PaymentPage = ({ t }) => (
  <Layout>
    <Head>
      <title>درگاه بانک</title>
    </Head>

    <Payment />
  </Layout>
)

PaymentPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

PaymentPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(PaymentPage)
