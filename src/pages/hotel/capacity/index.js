import PropTypes from 'prop-types'
import { withTranslation } from '../../../../i18n'
import Layout from '../../../components/Layout/Layout'
import Head from 'next/head'
import Capacity from '../../../components/Hotel/Capacity/Capacity'

const CapacityPage = ({ t }) => (
  <Layout>
        <Head>
            <title>{t("checking-capacity")}</title>
        </Head>
        
        <Capacity/>

  </Layout>
)

CapacityPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

CapacityPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(CapacityPage)