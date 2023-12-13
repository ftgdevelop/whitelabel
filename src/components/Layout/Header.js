import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { Row, Col, BackTop } from 'antd'
import { withTranslation, Link } from '../../../i18n'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Script from 'next/script'

import styles from '../../styles/Home.module.css'
import { ArrowLeftIcon } from '../UI/Icons'
import { GTM_ID } from '../../../helpers/gtm'

const Logo = dynamic(() => import('./Logo'))
const SwitchLanguage = dynamic(() => import('./SwitchLanguage'))
const RetrieveMyBooking = dynamic(() => import('./RetrieveMyBooking'))
const ModalLogin = dynamic(() => import('./ModalLogin'))
const Navigation = dynamic(() => import('../Navigation/Navigation'))
const ModalAccount = dynamic(() => import('./ModalAccount'))
const MobileNavigation = dynamic(() => import('./MobileNavigation'))
const MenuTravelo = dynamic(() => import('./MenuTravelo'))

const token = '44eb958f-bb0e-452b-9ec4-61543b471f15'

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      // headerClass: '',
      myurl: '',
    }
  }

  // listenScrollEvent = e => {
  //   if (window.scrollY > 120) {
  //     this.setState({headerClass: 'headerFixed'})
  //   } else {
  //     this.setState({headerClass: ''})
  //   }
  // }

  // componentDidMount() {
  //   window.addEventListener('scroll', this.listenScrollEvent)
  // }

  render() {
    const { t, router } = this.props
    const { isAuthenticated } = this.props.auth

    return (
      <>
        {/* <div className={styles.bannerHeader}>
          <div className={styles.container}>
              <Link as="/contact" href="/contact">
                  <a target="_blank">
                      <img src="/images/summer-offer.png" alt="تخفیف تابستانه سفرانه!" title="تخفیف تابستانه سفرانه!" />
                  </a>
              </Link>
          </div>
        </div> */}
        <div
          className={`${styles.header} ${
            process.env.THEME_NAME === 'TRAVELO' && styles.headerTravelo
          }`}
        >
          <div
            className={`${styles.showInMobile} ${
              process.env.THEME_NAME === 'TRAVELO' && styles.showInMobileTravelo
            }`}
          >
            <MobileNavigation />
          </div>
          <div className={styles.container}>
            <Head>
              <meta name="robots" content="index, follow" />
              <meta name="theme-color" content="#0a438b" />
              <meta charSet="utf-8" />

              <meta name="author" content="safaraneh.com" />
              <meta name="copyright" content="safaraneh.com" />
              <meta name="cache-control" content="cache" />
              <meta name="content-language" content="fa" />
              <meta name="content-type" content="text/html;UTF-8" />
              <meta name="creator" content="safaraneh.com" />
              <meta name="DC.Language" content="fa" />
              <meta name="DC.Type" content="Text,Image" />
              <meta name="DC.Creator" content="safaraneh.com" />
              <meta name="rating" content="General" />

              <meta name="apple-mobile-web-app-capable" content="yes" />
              <meta name="mobile-web-app-capable" content="yes" />
              <meta
                name="apple-mobile-web-app-status-bar-style"
                content="#0a438b"
              />
              <meta
                httpEquiv="content-type"
                content="text/html; charset=UTF-8"
              />

              {typeof router !== 'undefined' &&
              (router.route !== '/hotels/[...hotelList]' && router.route !== "/") ? (
                <link
                  rel="canonical"
                  href={
                    process.env.SITE_NAME + router.asPath.split('/location-')[0]
                  }
                />
              ) : null}

              <link
                rel="preload"
                as="style"
                href="https://cdn2.safaraneh.com/libs/intl-tel-input/8.1.0/css/intlTelInput.min.css"
              />
              <link
                rel="stylesheet"
                href="https://cdn2.safaraneh.com/libs/intl-tel-input/8.1.0/css/intlTelInput.min.css"
              />
              <link
                rel="stylesheet"
                type="text/css"
                href="https://cdn2.safaraneh.com/libs/react-phone-input-2/style.min.css"
              />

              <meta
                name="google-site-verification"
                content="dL12BD7zy5YUBkz4xPLy-hKkz1PPUyStFEiXgJks_h0"
              />

              <script
                id="script_header_1"
                type="text/javascript"
                src="/static/scripts/cashback.js"
              ></script>
            </Head>
            <Head>
              {this.props.hotel && this.props.hotel.interiorHotelDetail && (
                <>
                  <title>
                    {this.props.hotel.interiorHotelDetail.PageTitle}
                  </title>
                  <meta
                    name="description"
                    content={
                      this.props.hotel.interiorHotelDetail.MetaDescription
                    }
                    key="description"
                  ></meta>
                  <meta
                    name="keywords"
                    content={this.props.hotel.interiorHotelDetail.MetaKeyword}
                    key="keywords"
                  ></meta>
                  <meta
                    name="robots"
                    content={this.props.hotel.interiorHotelDetail.MetaKeyword}
                    key="robots"
                  ></meta>
                  <meta
                    property="og:site_name"
                    content={this.props.hotel.interiorHotelDetail.PageTitle}
                    key="site_name"
                  ></meta>
                  <meta
                    property="og:title"
                    content={this.props.hotel.interiorHotelDetail.PageTitle}
                    key="title"
                  ></meta>
                  <meta
                    property="og:description"
                    content={
                      this.props.hotel.interiorHotelDetail.MetaDescription
                    }
                    key="description"
                  ></meta>
                  <meta
                    property="og:url"
                    content={this.props.hotel.interiorHotelDetail.Url}
                    key="url"
                  ></meta>
                  <meta
                    property="og:image"
                    itemProp="image"
                    content={this.props.hotel.interiorHotelDetail.ImageUrl}
                    key="image"
                  ></meta>
                  <meta property="og:type" content="website"></meta>
                </>
              )}
            </Head>

            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
              />
            </noscript>

            {process.env.THEME_NAME === 'TRAVELO' && (
              <>
                <Row>
                  <Col
                    xs={24}
                    sm={8}
                    md={8}
                    lg={12}
                    xl={12}
                    className={styles.customHeader}
                  >
                    <Logo />
                    <MenuTravelo />
                  </Col>
                  <Col
                    xs={16}
                    sm={16}
                    md={16}
                    lg={12}
                    xl={12}
                    className={`${styles.accountStatus} text-end ${
                      process.env.THEME_NAME === 'TRAVELO' &&
                      styles.accountStatusTravelo
                    }`}
                  >
                    {/* <SwitchLanguage /> */}
                      {/* <a href="https://norooz.safaraneh.com/" target="_blank"  style={{position: "relative"}}>
                          <img src="https://cdn2.safaraneh.com/images/icon/sabze.png" width={52} alt="رزرو هتل نوروز ۱۴۰۲" title="رزرو هتل نوروز ۱۴۰۲" style={{width: "52px", position: "absolute", right: "-53px", top: "-20px"}} />
                          <span style={{ color: "#0b5bb9" }}>رزرو هتل نوروز ۱۴۰۲</span>
                      </a> */}
                    {!isAuthenticated && <RetrieveMyBooking />}
                    {isAuthenticated ? <ModalAccount /> : <ModalLogin />}
                  </Col>
                </Row>
              </>
            )}

            {process.env.THEME_NAME === 'TAJAWAL' && (
              <>
                <Row>
                  <Col xs={24} sm={8} md={8} lg={12} xl={12}>
                    <Logo />
                  </Col>
                  <Col
                    xs={16}
                    sm={16}
                    md={16}
                    lg={12}
                    xl={12}
                    className={`${styles.accountStatus} text-end`}
                  >
                    <SwitchLanguage />
                    <RetrieveMyBooking />
                    {isAuthenticated ? <ModalAccount /> : <ModalLogin />}
                  </Col>
                </Row>
                {
                  <Row>
                    <Navigation />
                  </Row>
                }
              </>
            )}
          </div>

          {/* <RegisterMessage/> */}

          <BackTop>
            <div
              className={`${styles.backToTop} ${
                process.env.THEME_NAME === 'TRAVELO' && styles.backToToptravelo
              }`}
            >
              <ArrowLeftIcon />
            </div>
          </BackTop>
        </div>
      </>
    )
  }
}

Header.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

Header.propTypes = {
  t: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    hotel: state.hotel,
  }
}

export default withTranslation('common')(
  connect(mapStateToProps)(withRouter(Header)),
)
