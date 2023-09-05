import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { withTranslation,Router } from '../../../i18n'
import Layout from '../../components/Layout/Layout'
import Head from 'next/head'
import DetailHotelForeign from '../../components/Hotel/DetailHotelForeign/DetailHotelForeign'

const HotelSearchPage = ({ t }) => {
  useEffect(()=>{
    if(Router && !process.env.MODULES.includes("foreignHotel")) {Router.push("/")}
  });
  return(
    (process.env.MODULES.includes("foreignHotel")) && <Layout>
        <Head>
          <link rel="stylesheet" type="text/css" href="https://cdn2.safaraneh.com/libs/react-bnb-gallery/1.4.4/css/react-bnb-gallery.min.css" />
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css" />
          <link rel="stylesheet" type="text/css" href="https://unpkg.com/leaflet-geosearch@latest/assets/css/leaflet.css" />
        </Head>
        
         <DetailHotelForeign />

  </Layout>
)}

HotelSearchPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

HotelSearchPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(HotelSearchPage)