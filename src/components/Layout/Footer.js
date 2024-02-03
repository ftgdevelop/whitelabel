import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Script from 'next/script'
import Image from 'next/image'
import { Link, i18n, withTranslation } from '../../../i18n'
import { withRouter } from 'next/router'
import styles from '../../styles/Home.module.css'
import { Row, Col } from 'antd'
import faceBookIcon from '../../assets/facebook.svg'
import whatsappIcon from '../../assets/whatsapp.svg'
import faceBookGift from '../../../public/images/tr.gif'
import parse from 'html-react-parser';
import {
  TelegramIcon,
  TwitterIcon,
  LinkedinIcon,
  InstagramIcon,
} from '../UI/Icons'
import dynamic from 'next/dynamic'
import { GTM_ID } from '../../../helpers/gtm'

const Logo = dynamic(() => import('./Logo'))

const Footer = (props) => {
  const { t } = props

  const [sessionStorageTelNumber, setSessionStorageTelNumber] = useState()
  const [sessionStorageInstagram, setSessionStorageInstagram] = useState()
  const [sessionStorageLinkedin, setSessionStorageLinkedin] = useState()
  const [sessionStorageTwitter, setSessionStorageTwitter] = useState()
  const [sessionStorageTelegram, setSessionStorageTelegram] = useState()
  const [sessionStorageFacebook, setSessionStorageFaceBook] = useState()
  const [sessionStorageWhatsapp, setSessionStorageWhatsapp] = useState()
  const [sessionStorageSymbol, setSessionStorageSymbol] = useState()

  useEffect(() => {
    setSessionStorageTelNumber(
      window.sessionStorage.getItem('whiteLabelTelNumber'),
    )
    setSessionStorageInstagram(
      window.sessionStorage.getItem('whiteLabelInstagram'),
    )
    setSessionStorageLinkedin(
      window.sessionStorage.getItem('whiteLabelLinkedin'),
    )
    setSessionStorageTwitter(window.sessionStorage.getItem('whiteLabelTwitter'))
    setSessionStorageTelegram(
      window.sessionStorage.getItem('whiteLabelTelegram'),
    )
    setSessionStorageFaceBook(
      window.sessionStorage.getItem('whiteLabelFacebook'),
    )
    setSessionStorageWhatsapp(
      window.sessionStorage.getItem('whiteLabelWhatsapp'),
    )
    setSessionStorageSymbol(window.sessionStorage.getItem('whiteLabelSymbol'))

    //sessionStorage.getItem("lastname")
  }, [])

  const getPortalValue = (dataArray, keyword) => {
    const itemIndex = dataArray.findIndex((item) => item.Keyword === keyword)
    if (itemIndex !== -1 && dataArray[itemIndex]) {
      return dataArray[itemIndex]
    } else {
      return null
    }
  }

  let portalLogo,
    telNumber,
    instagram,
    twitter,
    telegram,
    facebook,
    whatsapp,
    symbol,
    enamadElement,
    linkedin;

  // const portalGoogleAnalytic = process.env.GOOGLE_ANALYTIC_ID;

  if (props.portalInfo) {

    portalLogo =
      getPortalValue(props.portalInfo.Phrases, 'Logo') &&
      getPortalValue(props.portalInfo.Phrases, 'Logo')['ImageUrl']
    telNumber =
      getPortalValue(props.portalInfo.Phrases, 'TelNumber') &&
      getPortalValue(props.portalInfo.Phrases, 'TelNumber')['Value']
    instagram =
      getPortalValue(props.portalInfo.Phrases, 'Instagram') &&
      getPortalValue(props.portalInfo.Phrases, 'Instagram')['Value']
    twitter =
      getPortalValue(props.portalInfo.Phrases, 'Twitter') &&
      getPortalValue(props.portalInfo.Phrases, 'Twitter')['Value']
    linkedin =
      getPortalValue(props.portalInfo.Phrases, 'Linkedin') &&
      getPortalValue(props.portalInfo.Phrases, 'Linkedin')['Value']
    telegram =
      getPortalValue(props.portalInfo.Phrases, 'Telegram') &&
      getPortalValue(props.portalInfo.Phrases, 'Telegram')['Value']
    facebook =
      getPortalValue(props.portalInfo.Phrases, 'Facebook') &&
      getPortalValue(props.portalInfo.Phrases, 'Facebook')['Value']
    whatsapp =
      getPortalValue(props.portalInfo.Phrases, 'whatsapp') &&
      getPortalValue(props.portalInfo.Phrases, 'whatsapp')['Value']
    symbol =
      getPortalValue(props.portalInfo.Phrases, 'Symbol') &&
      getPortalValue(props.portalInfo.Phrases, 'Symbol')['Value']
    
      enamadElement = props.portalInfo.Phrases.find(item => item.Keyword === "Enamad")?.Value;
  }

  return (
    <>
      <footer
        className={`${styles.footer} ${
          process.env.THEME_NAME === 'TRAVELO' && styles.footerTravelo
        }`}
      >
        {process.env.THEME_NAME === 'TAJAWAL' && (
          <div className={styles.container}>
            <Row>
              <Col xs={24} sm={12} md={12}>
                <div className={styles.callPhoneNumber}>
                  {sessionStorageSymbol || symbol ? (
                    <span className="unset-img">
                      <Image
                        layout="fill"
                        className="custom-img"
                        src={symbol ? symbol : sessionStorageSymbol}
                        alt="پشتیبانی"
                        title="پشتیبانی"
                      />
                    </span>
                  ) : null}
                  <span>{t('support')}</span>
                  <a
                    href={`tel:${
                      telNumber ? telNumber : sessionStorageTelNumber
                    }`}
                    title="telephone"
                  >
                    {telNumber ? telNumber : sessionStorageTelNumber}
                  </a>
                </div>
              </Col>
              <Col xs={24} sm={12} md={12}>
                <div className={styles.socialNetwork}>
                  <ul>
                    {sessionStorageInstagram || instagram ? (
                      <li>
                        <a
                          target="_blank"
                          href={instagram ? instagram : sessionStorageInstagram}
                          className={styles.instagramIcon}
                          title="instagram"
                        >
                          <InstagramIcon />
                        </a>
                      </li>
                    ) : null}
                    {sessionStorageTwitter || twitter ? (
                      <li>
                        <a
                          target="_blank"
                          href={twitter ? twitter : sessionStorageTwitter}
                          title="twitter"
                        >
                          <TwitterIcon />
                        </a>
                      </li>
                    ) : null}
                    {/* {(sessionStorageTelegram || telegram) ? <li><a target="_blank" href={telegram?telegram:sessionStorageTelegram} title="telegram"><TelegramIcon/></a></li> :null} */}
                    {/* {(sessionStorageWhatsapp || whatsapp) ? <li><a target="_blank" href={`https://api.whatsapp.com/send?phone=${whatsapp?whatsapp:sessionStorageWhatsapp}`} title="whatsapp"><img src={whatsappIcon} className="footer-social-icon" alt="whatsapp" title="whatsapp" /></a></li> :null} */}
                    {sessionStorageFacebook || facebook ? (
                      <li>
                        <a
                          target="_blank"
                          href={facebook ? facebook : sessionStorageFacebook}
                          title="facebook"
                        >
                          <Image
                            width="30"
                            height="30"
                            layout="fixed"
                            src={faceBookIcon}
                            // className="footer-social-icon"
                            alt="facebook"
                            title="facebook"
                          />
                        </a>
                      </li>
                    ) : null}
                    {sessionStorageLinkedin || linkedin ? (
                      <li>
                        <a
                          target="_blank"
                          href={linkedin ? linkedin : sessionStorageLinkedin}
                          title="linkedin"
                        >
                          <LinkedinIcon />
                        </a>
                      </li>
                    ) : null}

                    {/* <li><a href="#" disabled><YoutubeFilled /></a></li> */}
                  </ul>
                </div>
              </Col>
            </Row>
          </div>
        )}
        {process.env.THEME_NAME === 'TAJAWAL' && (
          <div className={styles.middleFooter}>
            <div className={styles.container}>
              <Row>
                <Col xs={24} sm={12} md={12}>
                  <div className={styles.tandis}>
                    <div
                      className={`unset-img ${styles.imageTandis}`}
                      onContextMenu={(e) => e.preventDefault()}
                    >
                      <Image
                        src="https://cdn2.safaraneh.com/images/home/tandis-01.png"
                        alt="تندیس"
                        title="تندیس"
                        layout="fill"
                        className="custom-img"
                      />
                    </div>
                    <div
                      className={`unset-img ${styles.imageTandis}`}
                      onContextMenu={(e) => e.preventDefault()}
                    >
                      <Image
                        src="https://cdn2.safaraneh.com/images/home/tandis-02.png"
                        alt="تندیس"
                        title="تندیس"
                        layout="fill"
                        className="custom-img"
                      />
                    </div>
                    <div
                      className={`unset-img ${styles.imageTandis}`}
                      onContextMenu={(e) => e.preventDefault()}
                    >
                      <Image
                        src="https://cdn2.safaraneh.com/images/home/tandis-03.png"
                        alt="تندیس"
                        title="تندیس"
                        layout="fill"
                        className="custom-img"
                      />
                    </div>
                    <div
                      className={`unset-img ${styles.imageTandis}`}
                      onContextMenu={(e) => e.preventDefault()}
                    >
                      <Image
                        src="https://cdn2.safaraneh.com/images/home/tandis-04.png"
                        alt="تندیس"
                        title="تندیس"
                        layout="fill"
                        className="custom-img"
                      />
                    </div>
                    <div
                      className={`unset-img ${styles.imageTandis}`}
                      onContextMenu={(e) => e.preventDefault()}
                    >
                      <Image
                        src="https://cdn2.safaraneh.com/images/home/tandis-05.png"
                        alt="تندیس"
                        title="تندیس"
                        layout="fill"
                        className="custom-img"
                      />
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={12}>
                  <div className={styles.enamad}>
                  
                  {!!enamadElement && parse(enamadElement)}

                  </div>
                  <div className={styles.enamad}>
                    <a
                      href="https://logo.samandehi.ir/Verify.aspx?id=238809&p=uiwkxlaomcsimcsiobpdpfvl"
                      target="_blank"
                      title="logo-samandehi"
                      onContextMenu={(e) => e.preventDefault()}
                      className={`unset-img ${styles.nemads}`}
                    >
                      <img
                        id="nbqergvjoeukoeukesgtsizp"
                        alt="logo-samandehi"
                        title="logo-samandehi"
                        src="https://logo.samandehi.ir/logo.aspx?id=238809&p=odrfqftiaqgwaqgwlymabsiy"
                        // layout="fill"
                        // className={`unset-img ${styles.nemads}`}
                        width="70"
                        height="75"
                        layout="fixed"
                      />
                    </a>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        )}

        {
          // props.router.pathname === "/" &&
          process.env.THEME_NAME === 'TRAVELO' && (
            <div className={styles.middleFooter}>
              <div className={styles.container}>
                <Row>
                  <Col span={24}>
                    <div className={styles.tandis}>
                      <div
                        className={`unset-img ${styles.imageTandis}`}
                        onContextMenu={(e) => e.preventDefault()}
                      >
                        <Image
                          src="https://cdn2.safaraneh.com/images/home/tandis-01.png"
                          alt="تندیس"
                          title="تندیس"
                          layout="fill"
                          className="custom-img"
                        />
                        {/* <i className={`${styles.generalImage} ${styles.tandis01}`} /> */}
                      </div>
                      <div
                        className={`unset-img ${styles.imageTandis}`}
                        onContextMenu={(e) => e.preventDefault()}
                      >
                        <Image
                          src="https://cdn2.safaraneh.com/images/home/tandis-02.png"
                          alt="تندیس"
                          title="تندیس"
                          layout="fill"
                          className="custom-img"
                        />
                        {/* <i className={`${styles.generalImage} ${styles.tandis02}`} /> */}
                      </div>
                      <div
                        className={`unset-img ${styles.imageTandis}`}
                        onContextMenu={(e) => e.preventDefault()}
                      >
                        <Image
                          src="https://cdn2.safaraneh.com/images/home/tandis-03.png"
                          alt="تندیس"
                          title="تندیس"
                          layout="fill"
                          className="custom-img"
                        />
                        {/* <i className={`${styles.generalImage} ${styles.tandis03}`} /> */}
                      </div>
                      <div
                        className={`unset-img ${styles.imageTandis}`}
                        onContextMenu={(e) => e.preventDefault()}
                      >
                        <Image
                          src="https://cdn2.safaraneh.com/images/home/tandis-04.png"
                          alt="تندیس"
                          title="تندیس"
                          layout="fill"
                          className="custom-img"
                        />
                        {/* <i className={`${styles.generalImage} ${styles.tandis04}`} /> */}
                      </div>
                      <div
                        className={`unset-img ${styles.imageTandis}`}
                        onContextMenu={(e) => e.preventDefault()}
                      >
                        <Image
                          src="https://cdn2.safaraneh.com/images/home/tandis-05.png"
                          alt="تندیس"
                          title="تندیس"
                          layout="fill"
                          className="custom-img"
                        />
                        {/* <i className={`${styles.generalImage} ${styles.tandis05}`} /> */}
                      </div>
                      <div
                        className={styles.enamad}
                        onContextMenu={(e) => e.preventDefault()}
                      >

                        {!!enamadElement && parse(enamadElement)}

                      </div>
                      <div
                        className={styles.enamad}
                        onContextMenu={(e) => e.preventDefault()}
                      >
                        <a
                          href="https://logo.samandehi.ir/Verify.aspx?id=238809&p=uiwkxlaomcsimcsiobpdpfvl"
                          target="_blank"
                          title="logo-samandehi"
                          aria-label="samandehi"
                          className={`unset-img ${styles.nemads}`}
                        >
                          <img
                            id="nbqergvjoeukoeukesgtsizp"
                            alt="logo-samandehi"
                            title="logo-samandehi"
                            src="https://logo.samandehi.ir/logo.aspx?id=238809&p=odrfqftiaqgwaqgwlymabsiy"
                            // layout="fill"
                            // className={`unset-img ${styles.nemads}`}
                            width="70"
                            height="75"
                            layout="fixed"
                          />
                        </a>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          )
        }

        <div className={styles.bottomFooter}>
          <div className={styles.container}>
            <Row>
              <Col span={24}>
                <div className={styles.navigationFooter}>
                  <ul>
                    <li>
                      <Link as="/contact" href="/contact">
                        <a title={t('contact-us')}>{t('contact-us')}</a>
                      </Link>
                    </li>
                    <li>
                      <Link as="/faq" href="/faq">
                        <a title={t('faq')}>{t('faq')}</a>
                      </Link>
                    </li>
                    <li>
                      <Link as="/terms" href="/terms">
                        <a title={t('rules-regulations')}>
                          {t('rules-regulations')}
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link as="/privacy" href="/privacy">
                        <a title={t('privacy')}>{t('privacy')}</a>
                      </Link>
                    </li>
                    <li>
                      <Link as="/about" href="/about">
                        <a title={t('about-us')}>{t('about-us')}</a>
                      </Link>
                    </li>
                    <li>
                      <Link
                        as="/organizational-reservation"
                        href="/organizational-reservation"
                      >
                        <a title={t('organizational-reservation')}>
                          {t('organizational-reservation')}
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <div className={styles.logoFooter}>
                  <Logo />
                </div>
              </Col>
            </Row>
          </div>
        </div>

        {process.env.THEME_NAME === 'TRAVELO' && (
          <div className={styles.container}>
            <Row>
              <Col span={24}>
                <div className={styles.callPhoneNumber}>
                  <span>{t('support')}</span>
                  <a
                    href={`tel:${
                      telNumber ? telNumber : sessionStorageTelNumber
                    }`}
                    title="telephone"
                  >
                    {telNumber ? telNumber : sessionStorageTelNumber}
                  </a>
                </div>
              </Col>
              <Col span={24}>
                <div className={styles.socialNetwork}>
                  <ul>
                    {sessionStorageInstagram || instagram ? (
                      <li>
                        <a
                          target="_blank"
                          href={instagram ? instagram : sessionStorageInstagram}
                          className={styles.instagramIcon}
                          title="instagram"
                        >
                          <InstagramIcon />
                        </a>
                      </li>
                    ) : null}
                    {sessionStorageTwitter || twitter ? (
                      <li>
                        <a
                          target="_blank"
                          href={twitter ? twitter : sessionStorageTwitter}
                          title="twitter"
                        >
                          <TwitterIcon />
                        </a>
                      </li>
                    ) : null}
                    {/* {(sessionStorageTelegram || telegram) ? <li><a target="_blank" href={telegram?telegram:sessionStorageTelegram} title="telegram"><TelegramIcon/></a></li> :null} */}
                    {/* {(sessionStorageWhatsapp || whatsapp) ? <li><a target="_blank" href={`https://api.whatsapp.com/send?phone=${whatsapp?whatsapp:sessionStorageWhatsapp}`} title="whatsapp"><img src={whatsappIcon} className="footer-social-icon" alt="whatsapp" title="whatsapp" /></a></li> :null} */}
                    {sessionStorageFacebook || facebook ? (
                      <li>
                        <a
                          target="_blank"
                          href={facebook ? facebook : sessionStorageFacebook}
                          title="facebook"
                        >
                          <Image
                            src={faceBookIcon}
                            // className="footer-social-icon"
                            alt="facebook"
                            title="facebook"
                            width="30"
                            height="30"
                            layout="fixed"
                          />
                        </a>
                      </li>
                    ) : null}
                    {sessionStorageLinkedin || linkedin ? (
                      <li>
                        <a
                          target="_blank"
                          href={linkedin ? linkedin : sessionStorageLinkedin}
                          title="linkedin"
                        >
                          <LinkedinIcon />
                        </a>
                      </li>
                    ) : null}

                    {/* <li><a href="#" disabled><YoutubeFilled /></a></li> */}
                  </ul>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </footer>
      {/* <script
        id="script_footer_1"
        async=""
        src="/static/scripts/analytics.js"
      ></script> */}
      {/* <script
        id="script_footer_2"
        async=""
        src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
      ></script> */}
      {/* Google Tag Manager - Global base code */}
      {/* <script
        id="script_footer_3"
        dangerouslySetInnerHTML={{
          __html: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l]
          .push({'gtm.start':new Date().getTime(),event:'gtm.js'});
          var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
          j.async=true;
          j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer', '${GTM_ID}');
        `,
        }}
      /> */}
      {/* anti-flicker snippet */}
      {/* <script
    id="script_footer_4"
      dangerouslySetInnerHTML={{
        __html: `
          (function(a,s,y,n,c,h,i,d,e){s.className+=' '+y;h.start=1*new Date;
          h.end=i=function(){s.className=s.className.replace(RegExp(' ?'+y),'')};
          (a[n]=a[n]||[]).hide=h;setTimeout(function(){i();h.end=null},c);h.timeout=c;
          })(window,document.documentElement,'async-hide','dataLayer',4000,
          {'${GTM_ID}':true});
        `,
      }}
    /> */}
      {/* Global site tag (gtag.js) - Google Analytics */}
      {/* <script
        id="script_footer_5"
        async
        src="https://www.googletagmanager.com/gtag/js?id=UA-179383169-1"
      ></script> */}
      
      
     {/* {!!portalGoogleAnalytic &&  <script
        id="script_footer_6"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${portalGoogleAnalytic}');
        `,
        }}
      />} */}


      {/* Global site tag (gtag.js) - Google Ads: 599246268 */}
      {/* <script
        id="script_footer_7"
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-599246268"
      ></script> */}
      {/* <Script
        id="script_footer_8"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-599246268');
          gtag('event', 'conversion', {'send_to': 'AW-599246268/26w4CL3KwPABELyL350C', 'transaction_id': ''});
        `,
        }}
      /> */}
      {/* Global site tag (gtag.js) - Google Ads: 599246268 */}
      {/* <script id="script_footer_9" async src="https://www.googletagmanager.com/gtag/js?id=AW-599246268"></script>
    <script
    id="script_footer_10"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-599246268');
          gtag('event', 'conversion', {'send_to': 'AW-599246268/26w4CL3KwPABELyL350C', 'transaction_id': ''});
        `,
      }}
    /> */}
      {/* <!-- Global site tag (gtag.js) - Google Ads: 301558402 --> */}
      {/* <script
        id="script_footer_11"
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-301558402"
      ></script> */}
      {/* <script
        id="script_footer_12"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-301558402');
          gtag('event', 'conversion', {'send_to': 'AW-301558402/5_PZCLOAw_0CEILV5Y8B', 'transaction_id': ''});
        `,
        }}
      /> */}
      {/* <!-- Facebook Pixel Code --> */}
      {/* <script
    id="script_footer_13"
      dangerouslySetInnerHTML={{
        __html: `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '2928848847397620');
        fbq('track', 'PageView');
        `,
      }}
    />
    <img height="1" width="1" style={{display:'none'}}
    src="https://www.facebook.com/tr?id=2928848847397620&ev=PageView&noscript=1"
    alt="facebook" title="facebook"
    /> */}
      {/* <!-- End Facebook Pixel Code --> */}
      {/* <!-- Hotjar Tracking Code for https://www.safaraneh.com --> */}
      {/* <script
    id="script_footer_14"
      dangerouslySetInnerHTML={{
        __html: `
        (function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:2127390,hjsv:6};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `,
      }}
    /> */}
      {/* <!-- Yektanet --> */}
      <script
        id="script_footer_15"
        dangerouslySetInnerHTML={{
          __html: `
          !function (t, e, n) { t.yektanetAnalyticsObject = n, t[n] = t[n] || function () { t[n].q.push(arguments) }, t[n].q = t[n].q || []; var a = new Date, r = a.getFullYear().toString() + "0" + a.getMonth() + "0" + a.getDate() + "0" + a.getHours(), c = e.getElementsByTagName("script")[0], s = e.createElement("script"); s.id = "ua-script-GHp3ZhOz"; s.dataset.analyticsobject = n; s.async = 1; s.type = "text/javascript"; s.src = "/static/scripts/rg.complete.js?v=" + r, c.parentNode.insertBefore(s, c) }(window, document, "yektanet");
        `,
        }}
      />
      {/* <!---start GOFTINO code---> */}
      <script
        id="script_footer_16"
        dangerouslySetInnerHTML={{
          __html: `
          !function(){var i="HVhVQP",a=window,d=document;function g(){var g=d.createElement("script"),s="https://www.goftino.com/widget/"+i,l=localStorage.getItem("goftino_"+i);g.async=!0,g.src=l?s+"?o="+l:s;d.getElementsByTagName("head")[0].appendChild(g);}"complete"===d.readyState?g():a.attachEvent?a.attachEvent("onload",g):a.addEventListener("load",g,!1);}();
          `,
        }}
      />
    </>
  )
}

Footer.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

Footer.propTypes = {
  t: PropTypes.func.isRequired,
}

const mapStateToProp = (state) => {
  return {
    portalInfo: state.portal.portalData,
  }
}

export default withTranslation('common')(
  connect(mapStateToProp)(withRouter(Footer)),
)
