import PropTypes from 'prop-types'
import { Link, withTranslation, i18n } from '../../../i18n'
import Layout from '../../components/Layout/Layout'
import Head from 'next/head'

import styles from '../../styles/Home.module.css'
import SearchBus from '../../components/Bus/Home'
import Banner from '../../components/Home/Banner/Banner'
import Offer from '../../components/Home/Offer/Offer'
import MyService from '../../components/Home/MyService/MyService'
import Subscribe from '../../components/Home/Subscribe/Subscribe'
import SuggestedHotels from '../../components/Home/SuggestedHotels/SuggestedHotels'
import BeachHotels from '../../components/Home/BeachHotels/BeachHotels'
import PopularCities from '../../components/Home/PopularCities/PopularCities'

const BusPage = ({ t }) => (
  <Layout>
    <Head>
        <title>بلیط اتوبوس || رزرو آنلاین هتل و بلیط هواپیما</title>
    </Head>

    <SearchBus/>


    <div className={styles.wrapHome}>
        <Banner/>
        <SuggestedHotels/>
        <PopularCities/>
        <BeachHotels/>
        <Offer/>
        <MyService/>
    </div>

    <Subscribe/>
    
  </Layout>
)

BusPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

BusPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(BusPage)