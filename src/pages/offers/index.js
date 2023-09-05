import PropTypes from 'prop-types'
import { Link, withTranslation, i18n } from '../../../i18n'
import Layout from '../../components/Layout/Layout'
import Head from 'next/head'
import { Breadcrumb } from 'antd';

import { HomeOutlined } from '@ant-design/icons';
import styles from '../../styles/Home.module.css'
import { Row, Col } from 'antd'
import { TickerIcon } from '../../components/UI/Icons'

const OffersPage = ({ t }) => (
  <Layout>
    <Head>
        <title>تخفیف ها</title>
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
                    <span>تخفیف ها</span>
                    </Breadcrumb.Item>
                </Breadcrumb>
          </Row>
          <Row>
              <div className={styles.offers}>
                    <TickerIcon/>
                    <h4>در حال حاضر تخفیف وجود ندارد</h4>
              </div>
          </Row>
        </div>
      </div>
  </Layout>
)

OffersPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

OffersPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(OffersPage)