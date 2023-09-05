import PropTypes from 'prop-types'
import { withTranslation } from '../../../i18n'
import Layout from '../../components/Layout/Layout'
import Head from 'next/head'

import BusList from '../../components/Bus/BusList/BusList'

const BusesListPage = ({ t }) => (
  <Layout>
        <Head>
            <title>لیست اتوبوس</title>
        </Head>
        
        <BusList/>
        
  </Layout>
)

BusesListPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

BusesListPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(BusesListPage)