import PropTypes from 'prop-types'
import { withTranslation } from '../../../../i18n'
import Layout from '../../../components/Layout/Layout'
import Head from 'next/head'

import BookingForeign from '../../../components/Flight/BookingForeign/BookingForeign'

const BookingPage = ({ t }) => (
  <Layout>
    <Head>
      <title>{t('passengers-information')}</title>
    </Head>

    <BookingForeign />
  </Layout>
)

BookingPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

BookingPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(BookingPage)
