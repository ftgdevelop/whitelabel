import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import { Link } from '../../../i18n'

const Logo = (props) => {
  const [logoUrl, setLogoUrl] = useState()
  useEffect(() => {
    let localStorageLogo = window.localStorage.whiteLabelLogo
    setLogoUrl(localStorageLogo)
  }, [])
  const getPortalValue = (dataArray, keyword) => {
    const itemIndex = dataArray.findIndex((item) => item.Keyword === keyword)
    if (itemIndex !== -1 && dataArray[itemIndex]) {
      return dataArray[itemIndex]
    } else {
      return null
    }
  }

  let img = null
  if (props.portal && props.portal.Phrases) {
    const imgArray = getPortalValue(props.portal.Phrases, 'Logo')
    if (imgArray) {
      img = (
        <Image
          layout="fill"
          className="custom-img"
          src={imgArray.ImageUrl}
          alt="سفرانه"
          title="سفرانه"
        />
      )
    }
  }

  return (
    <div
      className={`${styles.logo} ${
        process.env.THEME_NAME === 'TRAVELO' && styles.logoTravelo
      }`}
    >
      <Link as="/" href="/">
        <a
          href="/"
          title="سفرانه"
          onContextMenu={(e) => e.preventDefault()}
          className="unset-img"
        >
          {img || logoUrl ? (
            img ||  <Image
            layout="fill"
            className="custom-img"
            src={logoUrl}
            alt="سفرانه"
            title="سفرانه"
          />
          ) : (
           ''
          )}
        </a>
      </Link>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    portal: state.portal.portalData,
  }
}

export default connect(mapStateToProps)(Logo)
