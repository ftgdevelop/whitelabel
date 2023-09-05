import PropTypes from 'prop-types'
import { Link, withTranslation, i18n } from '../../../i18n'
import Layout from '../../components/Layout/Layout'
import Head from 'next/head'

import styles from '../../styles/Home.module.css'
import HotelsHomeForeign from '../../components/Hotel/HomeForeign'
import Banner from '../../components/Home/Banner/Banner'
import Offer from '../../components/Home/Offer/Offer'
import MyService from '../../components/Home/MyService/MyService'
import Subscribe from '../../components/Home/Subscribe/Subscribe'
import SuggestedHotels from '../../components/Home/SuggestedHotels/SuggestedHotels'
import BeachHotels from '../../components/Home/BeachHotels/BeachHotels'
import LatestBlogPost from '../../components/Home/LatestBlogPost/LatestBlogPost'
import AboutSummary from '../../components/Home/AboutSummary/AboutSummary'
import PopularCities from '../../components/Home/PopularCities/PopularCities'

const HotelsSearchHomePage = ({ t }) => (
  <Layout>
    <Head>
        <title>{t('online-hote-ticket-reserve')}</title>
        <link rel="stylesheet" type="text/css" href="https://cdn2.safaraneh.com/libs/slick-carousel/1.6.0/css/slick.min.css" /> 
        <link rel="stylesheet" type="text/css" href="https://cdn2.safaraneh.com/libs/slick-carousel/1.6.0/css/slick-theme.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdn2.safaraneh.com/libs/react-modern-calendar-datepicker/3.1.6/css/datepicker.min.css" />
    </Head>      

    <HotelsHomeForeign/>

    <div className={`${styles.wrapHome} ${process.env.THEME_NAME === "TRAVELO" && styles.wrapHomeTravelo}`}>
        <Banner/>
        <SuggestedHotels/>
        <PopularCities/>
        <BeachHotels/>
        <Offer/>
        <LatestBlogPost/>
        <MyService/>
        <AboutSummary/>
    </div>

    <Subscribe/>
    
  </Layout>
)

HotelsSearchHomePage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

HotelsSearchHomePage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(HotelsSearchHomePage)