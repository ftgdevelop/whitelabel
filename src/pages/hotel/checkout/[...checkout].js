import PropTypes from 'prop-types'
import { withTranslation } from '../../../../i18n'
import Layout from '../../../components/Layout/Layout'
import Head from 'next/head'
import Checkout from '../../../components/Hotel/Checkout/Checkout'
import CheckoutV4 from '../../../components/Hotel/Checkout/CheckoutV4'

const CheckoutPage = ({ t }) => (
  <Layout>
        <Head>
            <title>{t('completing-informaion')}</title>
            <link rel="stylesheet" type="text/css" href="https://cdn2.safaraneh.com/libs/react-phone-input-2/style.min.css" />
        </Head>
        
        {process.env.DomesticHotelV4 ? <CheckoutV4 /> :<Checkout />}

  </Layout>
)

CheckoutPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

CheckoutPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(CheckoutPage)