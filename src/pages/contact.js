import React,{useState,useEffect,Component, createRef} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { Link, withTranslation, i18n } from '../../i18n'
import Layout from '../components/Layout/Layout'
import Head from 'next/head'
import { Row, Col, Breadcrumb } from 'antd'
import { HomeOutlined } from '@ant-design/icons'

import styles from '../styles/Home.module.css'
import faceBookIcon from '../assets/facebook.svg';
import whatsappIcon from '../assets/whatsapp.svg';
import { TelegramIcon, TwitterIcon, LinkedinIcon, InstagramIcon} from '../components/UI/Icons'
import Contact from "../components/MyPage/contact"


const AboutPage = props => {

  const [sessionStorageTelNumber,setSessionStorageTelNumber] = useState();
  const [sessionStorageInstagram,setSessionStorageInstagram] = useState();
  const [sessionStorageLinkedin,setSessionStorageLinkedin] = useState();
  const [sessionStorageTwitter,setSessionStorageTwitter] = useState();
  const [sessionStorageTelegram,setSessionStorageTelegram] = useState();
  const [sessionStorageFacebook,setSessionStorageFaceBook] = useState();
  const [sessionStorageWhatsapp,setSessionStorageWhatsapp] = useState();
  const [sessionStorageSymbol,setSessionStorageSymbol] = useState();
  
  useEffect(()=>{
      
    setSessionStorageTelNumber(window.sessionStorage.getItem("whiteLabelTelNumber"));
    setSessionStorageInstagram(window.sessionStorage.getItem("whiteLabelInstagram"));
    setSessionStorageLinkedin(window.sessionStorage.getItem("whiteLabelLinkedin"));
    setSessionStorageTwitter(window.sessionStorage.getItem("whiteLabelTwitter"));
    setSessionStorageTelegram(window.sessionStorage.getItem("whiteLabelTelegram"));
    setSessionStorageFaceBook(window.sessionStorage.getItem("whiteLabelFacebook"));
    setSessionStorageWhatsapp(window.sessionStorage.getItem("whiteLabelWhatsapp"));
    setSessionStorageSymbol(window.sessionStorage.getItem("whiteLabelSymbol"));
       
    //sessionStorage.getItem("lastname")
    
},[]);

  const getPortalValue = (dataArray, keyword) => {
    const itemIndex = dataArray.findIndex((item) => item.Keyword === keyword);
      if (itemIndex !== -1 && dataArray[itemIndex]) {
        return dataArray[itemIndex];
      } else {
        return null;
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
  linkedin;
  
  if( props.portalInfo){
    portalLogo=getPortalValue(props.portalInfo.Phrases,"Logo") && getPortalValue(props.portalInfo.Phrases,"Logo")['ImageUrl'];  
    telNumber=getPortalValue(props.portalInfo.Phrases,"TelNumber") && getPortalValue(props.portalInfo.Phrases,"TelNumber")['Value'];  
    instagram=getPortalValue(props.portalInfo.Phrases,"Instagram") && getPortalValue(props.portalInfo.Phrases,"Instagram")['Value']; 
    twitter=getPortalValue(props.portalInfo.Phrases,"Twitter") && getPortalValue(props.portalInfo.Phrases,"Twitter")['Value']; 
    linkedin=getPortalValue(props.portalInfo.Phrases,"Linkedin") && getPortalValue(props.portalInfo.Phrases,"Linkedin")['Value']; 
    telegram=getPortalValue(props.portalInfo.Phrases,"Telegram") && getPortalValue(props.portalInfo.Phrases,"Telegram")['Value'];
    facebook=getPortalValue(props.portalInfo.Phrases,"Facebook") && getPortalValue(props.portalInfo.Phrases,"Facebook")['Value']; 
    whatsapp=getPortalValue(props.portalInfo.Phrases,"whatsapp") && getPortalValue(props.portalInfo.Phrases,"whatsapp")['Value']; 
    symbol=getPortalValue(props.portalInfo.Phrases,"Symbol") && getPortalValue(props.portalInfo.Phrases,"Symbol")['Value'];  
}
  const {t} = props;
  return(
    <Layout>
      <Head>
          <title>{t("contact-us")}</title>
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css" />
          <link rel="stylesheet" type="text/css" href="https://unpkg.com/leaflet-geosearch@latest/assets/css/leaflet.css" />
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
                <span>{t("contact-us")}</span>
                </Breadcrumb.Item>
            </Breadcrumb>
          </Row>
          <Row>
            <Col span={24}>
              <div
                className={`${styles.contact} ${process.env.THEME_NAME === "TRAVELO" && styles.contactTravelo}`}
                >
                <h1>{t("contact-us")}</h1>

                <div className={styles.content}>
                  <Row>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      <h2>{t("contacting-with-us")}</h2>
                      <address>
                        <b>{t("address-text")} :</b>
                        {t("address-company")}
                      </address>
                      <div className={styles.phone}>
                        <b>{t("tel")} : </b>
                        <a href="tel:+982179515000">02179515000</a>
                      </div>
                      <div className={styles.phone}>
                        <b>{t("fax")} : </b>
                        <a href="tel:+982126150054">2126150054 98+</a>
                      </div>
                      <div className={styles.email}>
                        <b>{t("email")} : </b>
                        <a href="mailto:info@safaraneh.com">info@safaraneh.com</a>
                      </div>
                      <div className={styles.postalcode}>
                        <b>{t("postal-code")} : </b>
                        <span>1957644595</span>
                      </div>
                      
                      <h2>{t("follow-social")}</h2>
                      <div className={styles.socialNetwork}>
                        <ul>
                          {(sessionStorageInstagram || instagram) ? <li><a target="_blank" href={instagram?instagram:sessionStorageInstagram} className={styles.instagramIcon}><InstagramIcon /></a></li> :null}
                          {(sessionStorageTwitter || twitter) ? <li><a target="_blank" href={twitter?twitter:sessionStorageTwitter}><TwitterIcon /></a></li> :null}
                          {(sessionStorageTelegram || telegram) ? <li><a target="_blank" href={telegram?telegram:sessionStorageTelegram}><TelegramIcon/></a></li> :null}
                          {(sessionStorageWhatsapp || whatsapp) ? <li><a target="_blank" href={`https://api.whatsapp.com/send?phone=${whatsapp?whatsapp:sessionStorageWhatsapp}`}><img src={whatsappIcon} className="footer-social-icon" alt="whatsapp" /></a></li> :null}
                          {(sessionStorageFacebook || facebook) ? <li><a target="_blank" href={facebook?facebook:sessionStorageFacebook}><img src={faceBookIcon} className="footer-social-icon" alt="facebook" /></a></li> :null}
                          {(sessionStorageLinkedin || linkedin) ? <li><a target="_blank" href={linkedin?linkedin:sessionStorageLinkedin}><LinkedinIcon /></a></li> :null}

                          {/* <li><a href="#" disabled><YoutubeFilled /></a></li>
                          <li><a href="#" disabled><FacebookFilled /></a></li> */}
                        </ul>
                      </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      <h2>{t("address-on-map")}</h2>
                      <Contact/>
                    </Col>
                  </Row>
                </div>
              </div>

            </Col>
          </Row>
        </div>
      </div>
    </Layout>
  )
}


AboutPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

AboutPage.propTypes = {
  t: PropTypes.func.isRequired,
}


const mapStateToProp = (state) => {
  return {
      portalInfo: state.portal.portalData,
  };
};

export default withTranslation('common')(connect(mapStateToProp)(AboutPage))
