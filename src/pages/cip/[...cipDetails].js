import PropTypes from 'prop-types'
import { Link, withTranslation, i18n,Router } from '../../../i18n'
import Layout from '../../components/Layout/Layout'
import Head from 'next/head'
import { useRouter } from "next/router";
import { useEffect } from 'react';

import DetailCip from '../../components/Cip/DetailCip'

const CipPage = ({ t }) => {
  const router = useRouter();
  useEffect(()=>{
    const url = router.asPath;
    if (url.includes("cip/checkout/key=")){
      Router.push(`/fa/cip-home`);
    }
  },[]);
  useEffect(()=>{
    if(Router && !process.env.MODULES.includes("cip")) {Router.push("/")}
  });

  return (
    process.env.MODULES.includes("cip") && <Layout>
      <Head>
        {router.query.cipDetails[0] === "فرودگاه-بین-المللی-امام-خمینی-Cip-خدمات" ?
          <>
            <title>رزرو CIP فرودگاه امام خمینی | کاملا آنلاین + بهترین پشتیبانی</title>
            <meta property="description" content="ساده‌ترین روش رزرو خدمات CIP جایگاه تشریفات فرودگاه امام خمینی تهران با بهترین قیمت و بدون جریمه کنسلی با بازگشت 100% وجه در صورت لغو؛ برای رزرو سی آی پی در کمتر از 2 دقیقه اینجا کلیک نمایید." />
            <meta property="og:title" content="رزرو CIP فرودگاه امام خمینی | کاملا آنلاین + بهترین پشتیبانی" />
            <meta property="og:description" content="ساده‌ترین روش رزرو خدمات CIP جایگاه تشریفات فرودگاه امام خمینی تهران با بهترین قیمت و بدون جریمه کنسلی با بازگشت 100% وجه در صورت لغو؛ برای رزرو سی آی پی در کمتر از 2 دقیقه اینجا کلیک نمایید." />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@safaraneh" />
            <meta name="twitter:title" content="رزرو CIP فرودگاه امام خمینی | کاملا آنلاین + بهترین پشتیبانی" />
            <meta name="twitter:description" content="ساده‌ترین روش رزرو خدمات CIP جایگاه تشریفات فرودگاه امام خمینی تهران با بهترین قیمت و بدون جریمه کنسلی با بازگشت 100% وجه در صورت لغو؛ برای رزرو سی آی پی در کمتر از 2 دقیقه اینجا کلیک نمایید." />
          </>
          :
          <title>تشریفات فرودگاهی cip || رزرو آنلاین هتل و بلیط هواپیما</title>
        }
          
        <link rel="stylesheet" type="text/css" href="https://cdn2.safaraneh.com/libs/react-bnb-gallery/1.4.4/css/react-bnb-gallery.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdn2.safaraneh.com/libs/react-modern-calendar-datepicker/3.1.6/css/datepicker.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css" />
        <link rel="stylesheet" type="text/css" href="https://unpkg.com/leaflet-geosearch@latest/assets/css/leaflet.css" />
      </Head>

      <DetailCip/>
      
    </Layout>
  )
}

CipPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

CipPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(CipPage)