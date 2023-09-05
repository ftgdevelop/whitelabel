import PropTypes from 'prop-types'
import { withTranslation,Router } from '../../../i18n'
import Layout from '../../components/Layout/Layout'
import Head from 'next/head';
import {useEffect} from "react";

import HotelListSearch from '../../components/Hotel/HotelListSearch/HotelListSearch'

const HotelListPage = ({ t }) => {
  useEffect(()=>{
    if(Router && !process.env.MODULES.includes("foreignHotel")) {Router.push("/")}
  });
  return(
    (process.env.MODULES.includes("foreignHotel")) && <Layout>
        <Head>
          <title>{t("foreing-hotel-list")}</title>
          <link rel="stylesheet" type="text/css" href="https://cdn2.safaraneh.com/libs/slick-carousel/1.6.0/css/slick.min.css" /> 
          <link rel="stylesheet" type="text/css" href="https://cdn2.safaraneh.com/libs/slick-carousel/1.6.0/css/slick-theme.min.css" />
          <link rel="stylesheet" type="text/css" href="https://cdn2.safaraneh.com/libs/react-modern-calendar-datepicker/3.1.6/css/datepicker.min.css" />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://unpkg.com/leaflet-geosearch@latest/assets/css/leaflet.css"
          />
        </Head>

        <HotelListSearch/>

  </Layout>
)}

HotelListPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

HotelListPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(HotelListPage)