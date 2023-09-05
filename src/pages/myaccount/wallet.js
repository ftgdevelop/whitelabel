import PropTypes from 'prop-types'
import { Link, withTranslation, i18n } from '../../../i18n'
import Layout from '../../components/Layout/Layout'
import Head from 'next/head'
import { RightOutlined } from '@ant-design/icons'
import { connect } from "react-redux";

import styles from '../../styles/Home.module.css'
import { Row, Col, Alert, Button } from 'antd'
import AsideMyAccount from '../../components/MyAccount/AsideMyAccount'
import { TravellersIcon, WalletIcon, ProfileIcon, BookingIcon, PasswordIcon, InvoiceLargeIcon } from '../../components/UI/Icons'
import Wallet from '../../components/MyAccount/Wallet/Wallet'
import RequireAuth from '../../utils/requireAuth'

const WalletPage = (props) => {
  const { t } = props;
  return(
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
                      <div className={styles.walletPage}>
                        <div className={styles.headWalletPage}>
                              <WalletIcon/>
                              <div className={styles.headWalletPageText}>
                                  <h2>{t("money-bag")}</h2>
                                  <span>{t("visit-your-history")}</span>
                              </div>
                          </div>
                          <div className={styles.contentWalletPage}>
                            <div className={styles.balanceWalletPage}>
                              <div className={styles.contantBalanceWalletPage}>
                                <div className={styles.headBalance}>{t('fee')}</div>
                                <div className={styles.priceBalance}>
                                  <b>{Intl.NumberFormat({ style: 'currency', currency: 'IRR' }).format(props.creditAmount)} {t('rial')}</b>
                                </div>
                              </div>
                            </div>
                            <div className={styles.mainContentWalletPage}>
                              {props.auth.user.isEmailConfirmed || props.auth.user.isPhoneNumberConfirmed ? (
                              <Wallet/>
                              ):(
                              <Alert 
                                  message={t('alert')} 
                                  description={ <Link as="/myaccount/profile" href="myaccount/profile">
                                      <a>
                                        <Button>{t('confirm-registration')}</Button>
                                      </a>
                                    </Link>
                                  }  
                                  type="warning"
                                  className={styles.alertVerifyBalance} />
                              )}
                                  
                            </div>
                          </div>
                      </div>
                  </Col>
              </Row>
          </div>
        </div>
    </Layout>
  )
}

WalletPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

WalletPage.propTypes = {
  t: PropTypes.func.isRequired,
}


const mapStateToProp = (state) => {
  return {
    creditAmount: state.creditAmount,
    auth: state.auth,
  };
};


export default (withTranslation('common'))(RequireAuth(connect(mapStateToProp, null)(WalletPage)))
