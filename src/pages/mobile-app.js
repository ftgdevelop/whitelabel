import PropTypes from 'prop-types'
import { Link, withTranslation, i18n } from '../../i18n'
import Layout from '../components/Layout/Layout'
import Head from 'next/head'
import { Row, Col, Breadcrumb } from 'antd'
import { HomeOutlined } from '@ant-design/icons'

import styles from '../styles/Home.module.css'

const MobileAppPage = ({ t }) => (
  <Layout>
    <Head>
        <title>{t('mobile')}</title>
    </Head>      
    <div
      className={`${styles.otherPage} ${process.env.THEME_NAME === "TRAVELO" && styles.otherPageTravelo}`}
      >
      <div className={styles.container}>
        <Row>
          <Breadcrumb>
              <Breadcrumb.Item>
              <Link as="/" href="/">
                  <a>
                  <HomeOutlined />
                  </a>
              </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
              <span>{t('mobile')}</span>
              </Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Row>
            <Col span={24}>
                <div
                  className={`${styles.app} ${process.env.THEME_NAME === "TRAVELO" && styles.appTravelo}`}
                  >
                    <h1>{t('mobile')}</h1>
                    <div className={styles.content}>

                    </div>
                </div>
            </Col>
        </Row>
      </div>
    </div>
  </Layout>
)

MobileAppPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

MobileAppPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(MobileAppPage)