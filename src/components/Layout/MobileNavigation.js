import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, withTranslation } from '../../../i18n'
import dynamic from 'next/dynamic'
import { connect } from 'react-redux'

import styles from '../../styles/Home.module.css'
import { Drawer, Button } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import {
  HotelIcon,
  FlightIcon,
  UserAddIcon,
  UserIcon,
  BookingTicketIcon,
  HomeIcon,
  CipIcon,
  WalletAccountFillIcon,
  BlogIcon,
  BusIcon,
} from '../UI/Icons'

const Logo = dynamic(() => import('./Logo'))
const SwitchLanguage = dynamic(() => import('./SwitchLanguage'))
const RetrieveMyBooking = dynamic(() => import('./RetrieveMyBooking'))

const MobileNavigation = (props) => {
  const tomorrowDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
  const soTomorrowDate = new Date(new Date().getTime() + 24 * 60 * 60 * 2000)
  const dayt = tomorrowDate.getDate()
  const montht = tomorrowDate.getMonth() + 1
  const yeart = tomorrowDate.getFullYear()
  const dayst = soTomorrowDate.getDate()
  const monthst = soTomorrowDate.getMonth() + 1
  const yearst = soTomorrowDate.getFullYear()
  const tehranUrl = `/hotels/تهران/location-164/checkin-${yeart}-${montht}-${dayt}/checkout-${yearst}-${monthst}-${dayst}/adult-1`
  const istanbulUrl = `/hotels-foreign/Istanbul/location-75286/checkin-${yeart}-${montht}-${dayt}/checkout-${yearst}-${monthst}-${dayst}/adult-1`
  const tehranmashadUrl = `/flights/THR-MHD?adult=1&child=0&infant=0&step=results&departing=${yeart}-${montht}-${dayt}`

  const { t,auth } = props;

  const [visible, setVisible] = useState(false)
  const showDrawer = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }

  return (
    <>
      <Button type="text" onClick={showDrawer}>
        <MenuOutlined />
      </Button>
      <Drawer
        title={<Logo />}
        placement="right"
        onClose={onClose}
        open={visible}
        width="270px"
      >
        <div ClassName={styles.sidbarMobile}>
          <div className={styles.sidbarNav}>
            <ul>
              <li>
                <Link as="/" href="/">
                  <a>
                    <HomeIcon />
                    <span className={styles.sidbarNavName}>{t('home')}</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link as="/signin" href="/signin">
                  <a>
                    <UserIcon />
                    <span className={styles.sidbarNavName}>{t('sign-in')}</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link as="/register" href="/register">
                  <a>
                    <UserAddIcon />
                    <span className={styles.sidbarNavName}>
                      {t('create-account')}
                    </span>
                  </a>
                </Link>
              </li>
              {!auth?.isAuthenticated && <li className="custom-mobile-menu-link">
                <BookingTicketIcon />
                <RetrieveMyBooking />
                {/* <Link as="/" href="/">
                  <a>
                    <BookingTicketIcon />
                    <span className={styles.sidbarNavName}>
                      {t("retrieve-my-booking")}
                    </span>
                  </a>
                </Link> */}
              </li>}
              <li>
                <Link as="/myaccount/wallet" href="/myaccount/wallet">
                  <a>
                    <WalletAccountFillIcon />
                    <span className={styles.sidbarNavName}>۰ {t('rial')}</span>
                  </a>
                </Link>
              </li>
              <hr className={styles.sidebarNavHr} />
              {process.env.MODULES.includes('domesticHotel') && (
                <li>
                  <Link as="/hotels-home" href="/hotels-home">
                    <a>
                      <HotelIcon />
                      <span className={styles.sidbarNavName}>
                        {t('domestic-hotels')}
                      </span>
                    </a>
                  </Link>
                </li>
              )}
              {process.env.MODULES.includes('domesticFlight') && (
                <li>
                  <Link as="/flights-home" href="/flights-home">
                    <a>
                      <FlightIcon />
                      <span className={styles.sidbarNavName}>
                        {t('domestic-flight')}
                      </span>
                    </a>
                  </Link>
                </li>
              )}
              {process.env.MODULES.includes('foreignHotel') && (
                <li>
                  <Link as="/hotels-foreign-home" href="/hotels-foreign-home">
                    <a>
                      <HotelIcon />
                      <span className={styles.sidbarNavName}>
                        {t('foreign-hotels')}
                      </span>
                    </a>
                  </Link>
                </li>
              )}
              {process.env.MODULES.includes('foreignFlight') && (
                <li>
                  <Link as="/flights-foreign-home" href="/flights-foreign-home">
                    <a>
                      <FlightIcon />
                      <span className={styles.sidbarNavName}>
                        {t('foreign-flight')}
                      </span>
                    </a>
                  </Link>
                </li>
              )}
              {process.env.MODULES.includes('cip') && (
                <li>
                  <Link as="/cip-home" href="/cip-home">
                    <a>
                      <CipIcon />
                      <span className={styles.sidbarNavName}>{t('cip')}</span>
                    </a>
                  </Link>
                </li>
              )}
              {process.env.MODULES.includes('bus') && (
                <li>
                  <Link as="/bus-home" href="/bus-home">
                    <a>
                      <BusIcon />
                      <span className={styles.sidbarNavName}>{t('bus')}</span>
                    </a>
                  </Link>
                </li>
              )}
              {process.env.MODULES.includes('blog') && (
                <li>
                  <Link as="/blog" href="/blog">
                    <a>
                      <BlogIcon />
                      <span className={styles.sidbarNavName}>{t('blog')}</span>
                    </a>
                  </Link>
                </li>
              )}

              {/* <li>
                <Link as="/offers" href="/offers">
                    <a>
                      <TickerIcon />
                      <span className={styles.sidbarNavName}>تخفیف ها</span>
                    </a>
                </Link>
              </li> */}

              <hr className={styles.sidebarNavHr} />
              <li>
                <a href="#">
                  <div className={styles.sidebarNavLanguage}>
                    <span className={styles.sidbarNavName}>
                      {t('change-lang')}
                    </span>
                    <SwitchLanguage />
                  </div>
                </a>
              </li>
              <li>
                <Link
                  as="/organizational-reservation"
                  href="/organizational-reservation"
                >
                  <a>
                    <span className={styles.sidbarNavName}>
                      {t('organizational-reservation')}
                    </span>
                  </a>
                </Link>
              </li>
              <li>
                <Link as="/faq" href="/faq">
                  <a>
                    <span className={styles.sidbarNavName}>{t('faq')}</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link as="/terms" href="/terms">
                  <a>
                    <span className={styles.sidbarNavName}>
                      {t('rules-regulations')}
                    </span>
                  </a>
                </Link>
              </li>
              <li>
                <Link as="/privacy" href="/privacy">
                  <a>
                    <span className={styles.sidbarNavName}>{t('privacy')}</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link as="/contact" href="/contact">
                  <a>
                    <span className={styles.sidbarNavName}>
                      {t('contact-us')}
                    </span>
                  </a>
                </Link>
              </li>
              <li>
                <Link as="/about" href="/about">
                  <a>
                    <span className={styles.sidbarNavName}>
                      {t('about-us')}
                    </span>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Drawer>
    </>
  )
}

MobileNavigation.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

MobileNavigation.propTypes = {
  t: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default withTranslation('common')(connect(mapStateToProps)(MobileNavigation))
