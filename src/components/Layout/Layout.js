import React, { ReactNode, useEffect, useState } from 'react'
import { i18n } from '../../../i18n'
import Head from 'next/head'
import { GetPortal, setPortalInfo } from '../../actions'
import { connect } from 'react-redux'
import dynamic from 'next/dynamic'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'

import styles from '../../styles/Home.module.css'

const Header = dynamic(() => import('./Header'))
const Footer = dynamic(() => import('./Footer'))

const Layout = (props) => {
  const [faviconUrl, setFaviconUrl] = useState()
  //GetPortal
  useEffect(() => {
    let localStorageFavicon = window.localStorage.whiteLabelFavicon
    setFaviconUrl(localStorageFavicon)

    const fetchData = async () => {
      const response = await GetPortal()

      if (response.data) {
        props.setPortalInfo(response.data)

        const faviconArray = getPortalValue(response.data.Phrases, 'Favicon')
        if (faviconArray) {
          setFaviconUrl(faviconArray.ImageUrl)
          localStorage.setItem('whiteLabelFavicon', faviconArray.ImageUrl)
        }

        const logoArray = getPortalValue(response.data.Phrases, 'Logo')
        if (logoArray) {
          localStorage.setItem('whiteLabelLogo', logoArray.ImageUrl)
        }

        const nameArray = getPortalValue(response.data.Phrases, 'Name')
        if (nameArray) {
          localStorage.setItem('whiteLabelProjectName', nameArray.Value)
        }

        // const telNumberArray = getPortalValue(response.data.Phrases,"TelNumber");
        // if (telNumberArray){
        //   localStorage.setItem('whiteLabelTelNumber', telNumberArray.Value);
        // }

        const portalApiKey = response.data['Apikeys'][0]['ApiKey']
        localStorage.setItem('portalApiKey', portalApiKey)

        if (typeof Storage !== 'undefined') {
          const telNumberArray = getPortalValue(
            response.data.Phrases,
            'TelNumber',
          )
          if (telNumberArray) {
            sessionStorage.setItem('whiteLabelTelNumber', telNumberArray.Value)
          }

          const instagramArray = getPortalValue(
            response.data.Phrases,
            'Instagram',
          )
          if (instagramArray) {
            sessionStorage.setItem('whiteLabelInstagram', instagramArray.Value)
          }

          const linkedinArray = getPortalValue(
            response.data.Phrases,
            'Linkedin',
          )
          if (linkedinArray) {
            sessionStorage.setItem('whiteLabelLinkedin', linkedinArray.Value)
          }

          const whatsappArray = getPortalValue(
            response.data.Phrases,
            'whatsapp',
          )
          if (whatsappArray) {
            sessionStorage.setItem('whiteLabelWhatsapp', whatsappArray.Value)
          }

          const telegramArray = getPortalValue(
            response.data.Phrases,
            'Telegram',
          )
          if (telegramArray) {
            sessionStorage.setItem('whiteLabelTelegram', telegramArray.Value)
          }

          const twitterArray = getPortalValue(response.data.Phrases, 'Twitter')
          if (twitterArray) {
            sessionStorage.setItem('whiteLabelTwitter', twitterArray.Value)
          }

          const facebookArray = getPortalValue(
            response.data.Phrases,
            'Facebook',
          )
          if (facebookArray) {
            sessionStorage.setItem('whiteLabelFacebook', facebookArray.Value)
          }

          const symbolArray = getPortalValue(response.data.Phrases, 'Symbol')
          if (symbolArray) {
            sessionStorage.setItem('whiteLabelSymbol', symbolArray.Value)
          }

          const emailArray = getPortalValue(response.data.Phrases, 'Email')
          if (emailArray) {
            sessionStorage.setItem('whiteLabelEmail', emailArray.Value)
          }
        }
      }
    }
    fetchData()
  }, [])

  const getPortalValue = (dataArray, keyword) => {
    const itemIndex = dataArray.findIndex((item) => item.Keyword === keyword)
    if (itemIndex !== -1 && dataArray[itemIndex]) {
      return dataArray[itemIndex]
    } else {
      return null
    }
  }

  return (
    <div
      className={`main-content-holder ${
        i18n.language === 'us' ? 'ltr' : 'rtl'
      }`}
    >
      <Head>
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href={faviconUrl && faviconUrl}
          sizes="16x16"
          data-react-helmet="true"
        />
        <link
          rel="icon"
          type="image/png"
          href={faviconUrl && faviconUrl}
          sizes="16x16"
        />
        <link
          rel="apple-touch-icon"
          type="image/png"
          href={faviconUrl && faviconUrl}
        />
        <link
          rel="apple-touch-icon"
          type="image/png"
          sizes="72x72"
          href={faviconUrl && faviconUrl}
        />
        <link
          rel="apple-touch-icon"
          type="image/png"
          sizes="114x114"
          href={faviconUrl && faviconUrl}
        />
        <link rel="icon" type="image/png" href={faviconUrl && faviconUrl} />
      </Head>

      <Header />
      <ErrorBoundary>{props.children}</ErrorBoundary>

      <Footer />
    </div>
  )
}

// Layout.propTypes = {
//   title: PropTypes.string.isRequired,
//   children: PropTypes.ReactNode
// }

const mapDispatchToProp = (dispatch) => ({
  setPortalInfo: (d) => dispatch(setPortalInfo(d)),
})
const mapStateToProp = (state) => {
  return {
    portalInfo: 'state.portalData',
  }
}

export default connect(mapStateToProp, mapDispatchToProp)(Layout)
