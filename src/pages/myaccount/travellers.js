import PropTypes from 'prop-types'
import { Link, withTranslation, i18n } from '../../../i18n'
import Layout from '../../components/Layout/Layout'
import Head from 'next/head'
import { Form, Input, Select, DatePicker, Button, Switch, Alert } from 'antd';
import { RightOutlined } from '@ant-design/icons'

import styles from '../../styles/Home.module.css'
import { Row, Col } from 'antd'
import AsideMyAccount from '../../components/MyAccount/AsideMyAccount'
import { TravellersIcon } from '../../components/UI/Icons'
import RequireAuth from '../../utils/requireAuth'

const { Option } = Select;

const TravellerPage = ({ t }) => (
  <Layout>
    <Head>
        <title>{t("my-account")}</title>
    </Head>
      <div
        className={`${styles.otherPage} ${process.env.THEME_NAME === "TRAVELO" && styles.otherPageTravelo}`}
        >
        <div className={styles.container}>
            <Row>
                <Col xs={24} sm={24} md={24} lg={7} xl={8}>
                    <div className={styles.asideMobile}>
                        <AsideMyAccount/>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={17} xl={16}>
                    <div className={styles.backHomeProfile}>
                        <Link as="/myaccount" href="/myaccount">
                            <a>
                                <RightOutlined />
                                {t('return')}
                            </a>
                        </Link>
                    </div>
                    <div className={styles.travellersPage}>
                      <div className={styles.headTravellersPage}>
                            <TravellersIcon/>
                            <div className={styles.headTravellersPageText}>
                                <h2>{t('passengers')}</h2>
                                <span>{t("passengers-details")}</span>
                            </div>
                        </div>
                        <div className={styles.contentTravellersPage}>
                        <div className={styles.accountInformation}>
                                <h3>{t("add-passenger")}</h3>
                                <div className={styles.alertAccountInformation}>{t('enter-passenger-name')}</div>
                                <Form name="complex-form" layout="vertical">
                                    <Row>
                                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                            <Form.Item label={t('name')}  >
                                                <Select defaultValue="male" style={{ width: '30%' }}>
                                                    <Option value="male">{t('male')}</Option>
                                                    <Option value="women">{t('femail')}</Option>
                                                </Select>
                                                <Input size="large" className={styles.input65} />
                                             </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                            <Form.Item label={t('family')}>
                                                <Input size="large"/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                     <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                            <Form.Item label="کد"  >
                                                <Select defaultValue="Sign Up" style={{ width: '30%' }}>
                                                    <Option value="Sign Up">{t('national-code')}</Option>
                                                    <Option value="Sign In">{t('passport')}</Option>
                                                </Select>
                                                <Input size="large" className={styles.input65} />
                                             </Form.Item>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                            <Form.Item label={t('birthdate')}>
                                                <DatePicker size="large" className={styles.input95} placeholder=""/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Button type="primary" size="large">
                                        {t('save')}
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
      </div>
  </Layout>
)

TravellerPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

TravellerPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default (withTranslation('common'))(RequireAuth(TravellerPage))
