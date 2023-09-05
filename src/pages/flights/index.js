import PropTypes from 'prop-types'
import { withTranslation } from '../../../i18n'
import Layout from '../../components/Layout/Layout'
import Head from 'next/head'

console.log('index');
const Flight = ({ t }) => (
  <Layout>
        <Head>
            title="Flight"
        </Head>        

  </Layout>
)

Flight.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

Flight.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(Flight)