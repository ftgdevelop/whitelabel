import PropTypes from 'prop-types'
import { Link, withTranslation, i18n } from '../../../i18n'
import Layout from '../../components/Layout/Layout'
import Head from 'next/head'

import styles from '../../styles/Home.module.css'
import FlightsForeignHome from '../../components/Flight/HomeForeign'
import Banner from '../../components/Home/Banner/Banner'
import Offer from '../../components/Home/Offer/Offer'
import MyService from '../../components/Home/MyService/MyService'
import Subscribe from '../../components/Home/Subscribe/Subscribe'
import SuggestedHotels from '../../components/Home/SuggestedHotels/SuggestedHotels'
import BeachHotels from '../../components/Home/BeachHotels/BeachHotels'
import PopularCities from '../../components/Home/PopularCities/PopularCities'

const FlightsForeignHomePage = ({ t }) => (
  <Layout>
    <Head>
        <title>{t('online-hote-ticket-reserve')}</title>
    </Head>      

    <FlightsForeignHome/>

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

FlightsForeignHomePage.getInitialProps = async () => ({
  namespacesRequired: ["common"],
})

FlightsForeignHomePage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation("common")(FlightsForeignHomePage)