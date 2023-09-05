import PropTypes from 'prop-types'
import { Link, withTranslation, i18n } from '../../i18n'
import Layout from '../components/Layout/Layout'
import Head from 'next/head'
import { Row, Col, Breadcrumb } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import VerifyEmail from '../components/Verift/VerifyEmail'
import styles from '../styles/Home.module.css'

const VerifyPage = ({ t }) => (
  <Layout>
    <Head>
        <title>{t("confirm-account")}</title>
    </Head>      
    <div
      className={`${styles.otherPage} ${process.env.THEME_NAME === "TRAVELO" && styles.otherPageTravelo}`}
      >
      <div className={styles.container}>
        <Row>
            <Col span={24}>
                <div className={styles.verify}>
                    <div className={styles.content}>
                        <VerifyEmail />
                    </div>
                </div>
            </Col>
        </Row>
      </div>
    </div>
  </Layout>
)

VerifyPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

VerifyPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(VerifyPage)