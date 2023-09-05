import PropTypes from 'prop-types'
import { withTranslation, i18n } from '../../../../i18n'
import Layout from '../../../components/Layout/Layout'
import Head from 'next/head'

import styles from '../../../styles/Home.module.css'

const BusPage = ({ t }) => (
  <Layout>
    <Head>
      <title>{t('title')}</title>
    </Head>
    <div
      className={`${styles.otherPage} ${
        process.env.THEME_NAME === 'TRAVELO' && styles.otherPageTravelo
      }`}
    >
      <div className={styles.container}>Bus</div>
    </div>
  </Layout>
)

BusPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

BusPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(BusPage)
