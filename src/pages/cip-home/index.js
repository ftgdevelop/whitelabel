import PropTypes from 'prop-types'
import { Link, withTranslation, i18n } from '../../../i18n'
import Layout from '../../components/Layout/Layout'
import Head from 'next/head'

import CipHome from '../../components/Cip/Home'

const CipPage = ({ t }) => (
  <Layout>
    <Head>
        <title>تشریفات فرودگاهی cip || رزرو آنلاین هتل و بلیط هواپیما</title>
        <link rel="stylesheet" type="text/css" href="https://cdn2.safaraneh.com/libs/slick-carousel/1.6.0/css/slick.min.css" /> 
        <link rel="stylesheet" type="text/css" href="https://cdn2.safaraneh.com/libs/slick-carousel/1.6.0/css/slick-theme.min.css" />        
        <link rel="stylesheet" type="text/css" href="https://cdn2.safaraneh.com/libs/react-bnb-gallery/1.4.4/css/react-bnb-gallery.min.css" />
        <meta name="robots" content="noindex,follow" />
    </Head>
    
    <CipHome/>
    
  </Layout>
)

CipPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

CipPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(CipPage)