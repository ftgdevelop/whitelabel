import PropTypes from 'prop-types'
import { withTranslation, i18n } from '../../../i18n'
import Layout from '../../components/Layout/Layout'
import Head from 'next/head'

import styles from '../../styles/Home.module.css'
import { Row, Col } from 'antd'
import AsideMyAccount from '../../components/MyAccount/AsideMyAccount'

const MyAccountPage = ({ t }) => (
  <Layout>
    <Head>
        <title>{t("my-account")}</title>
    </Head>
      <div
        className={`${styles.otherPage} ${process.env.THEME_NAME === "TRAVELO" && styles.otherPageTravelo}`}
        >
        <div className={styles.container}>
            <Row>
                <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                  <AsideMyAccount/>
                </Col>
                <Col span={16}>
                    {t("choose-on-menu")}
                </Col>
            </Row>
        </div>
      </div>
  </Layout>
)

MyAccountPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

MyAccountPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default (withTranslation('common'))(MyAccountPage)
