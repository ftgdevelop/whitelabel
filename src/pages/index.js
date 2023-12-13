import React from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'
import { withTranslation } from '../../i18n'
import dynamic from 'next/dynamic'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import styles from '../styles/Home.module.css'
import PopularCities from '../components/Home/PopularCities/PopularCities'
import { GetPortal } from '../actions/index'

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 32, color: '#0a438b' }} spin />
)

const Layout = dynamic(() => import('../components/Layout/Layout'))

// const SearchBox = dynamic(() => import('../components/Home/SearchBox/SearchBox'))
const SearchBox = dynamic(
  () => import('../components/Home/SearchBox/SearchBox'),
  {
    loading: () => (
      <div style={{ textAlign: 'center' }}>
        <Spin indicator={loadingIcon} />
      </div>
    ),
  },
)

const Banner = dynamic(() => import('../components/Home/Banner/Banner'))
const BannerTravelo = dynamic(() =>
  import('../components/Home/Banner/BannerTravelo'),
)
const Offer = dynamic(() => import('../components/Home/Offer/Offer'))
const MyService = dynamic(() =>
  import('../components/Home/MyService/MyService'),
)
const Subscribe = dynamic(() =>
  import('../components/Home/Subscribe/Subscribe'),
)
const SuggestedHotels = dynamic(() =>
  import('../components/Home/SuggestedHotels/SuggestedHotels'),
)
const BeachHotels = dynamic(() =>
  import('../components/Home/BeachHotels/BeachHotels'),
)
const LatestBlogPost = dynamic(() =>
  import('../components/Home/LatestBlogPost/LatestBlogPost'),
)
const AboutSummary = dynamic(() =>
  import('../components/Home/AboutSummary/AboutSummary'),
)

const Homepage = ({ t,host, portalData}) => {

  const portalTitle = portalData?.MetaTags?.find(item => item.Name === "title")?.Content || "";
  const portalKeywords = portalData?.MetaTags?.find(item => item.Name === "keywords")?.Content || "";
  const portalDescription = portalData?.MetaTags?.find(item => item.Name === "description")?.Content || "";


  return (
    <Layout>
      <Head>

        {!!portalTitle && <title>{portalTitle}</title>}
        {!!portalKeywords && <meta name="keywords" content={portalKeywords} />  }
        {!!portalDescription && <meta name="description" content={portalDescription} />  }

        <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no,maximum-scale=5,viewport-fit=cover" />
        
        {!!host && (
          <link rel="canonical" href={host} />
        )}

        {/* 
        <meta property="og:site_name" content={pageData? pageData.pageTitle: t("title")} key="site_name"/>
        <meta property="og:title" content={pageData? pageData.pageTitle: t("title")} key="title"></meta>
        <meta property="og:description" content={pageData? pageData.description: "سفرانه مشرق زمین ارائه دهنده تمامی خدمات مربوط به رزرو هتل، بلیط، تور، ویزا، بیمه و خدمات CIP"} key="description"></meta>
        */}
        <meta property="og:type" content="website"></meta>
        <meta
          property="og:image"
          itemProp="image"
          content="https://cdn2.safaraneh.com/images/home/balon.jpg"
          key="image"
        ></meta>

        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn2.safaraneh.com/libs/react-modern-calendar-datepicker/3.1.6/css/datepicker.min.css"
        />

        <script
          id="script_1"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
          "@context": "https://schema.org",
          "@type": "Organization",
          "image": "https://cdn2.safaraneh.com/images/logo/fa/safaraneh-150x60.png",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "ایران، تهران",
            "postalCode": "1957644595",
            "streetAddress": "پاسداران شمالی، پایین‌تر از سه‌راه اقدسیه، مجتمع صاحبقرانیه، پلاک ۵۶۵، طبقه ۳، واحد ۷"
          },
          "email": "info(at)safaraneh.com",
          "faxNumber": "(+98) 21 26150054",
          "name": "safaraneh.com (سفرانه)",
          "telephone": "(+98) 21 26150051"
        }`,
          }}
        ></script>

        <script
          id="script_2"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://www.safaraneh.com",
            "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.safaraneh.com/fa/hotels/?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }}`,
          }}
        ></script>

        <script
          id="script_3"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
              {"@context":"https://schema.org",
                "@type":"FAQPage",
                "mainEntity":[
                  {
                    "@type":"Question",
                    "name":"چگونه با تخفیف‌های همیشگی هتل رزرو کنیم؟",
                    "acceptedAnswer":{
                        "@type":"Answer",
                        "text":"<b> رزرو آنلاین هتل </b>
                                    چند سالی است که جایگزین روش‌های سنتی رزرو شده است. در همین راستا سایت سفرانه (آژانس مسافرتی سفرانه مشرق زمین) به عنوان یکی از مهم‌ترین نقش‌آفرینان عرصه خدمات آنلاین گردشگری، واسطه‌ها را حذف کرده و آماده ارائه خدمات رزرواسیون
                                    <b> بهترین هتل های تهران </b>
                                    و ایران با مناسب‌ترین قیمت و بیشترین تخفیف است.
                                <br/>
                                    در سفرانه امکان دسترسی به
                                    <b> بهترین هتل های ایران </b>
                                    از هتل 5 ستاره الی 1 ستاره؛ از هتل لوکس، هتل آپارتمان، بوتیک هتل تا اقامتگاه سنتی (هتل سنتی) را دارید. علاوه بر این موارد، در این سامانه اطلاعاتی مانند امکانات هتل، موقعیت جغرافیایی روی نقشه، ستاره‌های هتل، تجربه اقامتی، قوانین هتل و امتیاز کاربران به یک هتل خاص را یکجا می‌توانید ملاحظه بفرمایید."
                    }
                  },
                  {
                    "@type":"Question",
                    "name":"مزایای رزرو آنلاین هتل از سفرانه چیست؟",
                    "acceptedAnswer":{
                        "@type":"Answer",
                        "text":"<ul>
                                  <li>رزرو هتل از سفرانه ارزان‌تر از رزرو مستقیم از خود هتل است.</li>
                                  <li>
                                      <b> رزرو هتل </b>
                                      در سفرانه راحت و سریع است.
                                  </li>
                                  <li>
                                      <b> فرایند رزرو آنلاین </b>
                                      هتل در سفرانه بدون هیچ‌گونه صرف وقت و هزینه‌های جانبی انجام می‌شود.
                                  </li>
                                  <li>
                                      در سفرانه امکان رزرو
                                      <b> هتل های تمام شهرهای ایران </b>
                                      را دارید.
                                  </li>
                                  <li>در سفرانه امکان جست و جوی هتل براساس موقعیت مکانی روی نقشه و ستاره‌های هتل را دارید.</li>
                                  <li>در قسمت جستجوی هتل می‌توانید هتل را بر اساس کمترین و یا بیشترین قیمت، امتیاز کاربران و بیشترین تخفیف دسته بندی کنید.</li>
                                  <li>در سفرانه موقعیت جغرافیایی هر هتل را بر روی نقشه گوگل با جزئیات و جاهای دیدنی اطراف مشاهده می‌کنید.</li>
                                  <li>
                                      تصاویر هتل‌ها به طور اختصاصی توسط سفرانه تهیه شده‌اند که با کیفیت‌ترین تصاویر از موقعیت بیرونی و داخلی هتل در بین تمامی وبسایت‌های
                                      <b> رزرو آنلاین هتل </b>
                                      هستند.
                                  </li>
                                  <li>در صفحه هر هتل، عکس هر واحد اقامتی به طور اختصاصی رو به روی آن نمایش داده می‌شود.</li>
                                  <li>در سفرانه امکان بررسی نظرات و تجربیات مهمانان سابق هتل ها وجود دارد.</li>
                              </ul>"
                    }
                  },
                  {
                    "@type":"Question",
                    "name":"رزرو هتل با بیشترین تخفیف در سفرانه",
                    "acceptedAnswer":{
                        "@type":"Answer",
                        "text":"
                                تخفیف رزرو آنلاین هتل و سهولت رزرو از اهداف مهم سفرانه و در راستای خدمت رسانی به مشتاقان سفرهای داخلی است. ما در اینجا تمام تلاشمان را می‌کنیم تا هزینه‌های سفر شما را کاهش دهیم و از طرفی موجبات ارتقاء کیفیت خدمات رسانی را فراهم آوریم. در همین راستا برخی از هتلها از جمله
                                <b> هتل آزادی تهران و هتل استقلال تهران </b>
                                (برای شرکت‌ها و سازمان‌ها) با گارانتی سفرانه و تضمین بهترین قیمت قابل رزرو هستند.
                                <br/>
                                برای رزرو هریک از هتل‌ها می‌توانید قیمت ها را مقایسه کنید، تخفیف ها را مشاهده کنید و با کارشناسان رزرواسیون ما در تماس باشید."
                    }
                  },
                  {
                    "@type":"Question",
                    "name":"مراحل رزرو هتل در سفرانه به چه صورت است؟",
                    "acceptedAnswer":{
                        "@type":"Answer",
                        "text":"
                                برای
                                <b> رزرو آنلاین هتل </b>
                                در سفرانه از لحظه انتخاب بهترین هتل تا دریافت واچر تنها به اندازه چند کلیک ساده زمان نیاز دارید. کافیست در قسمت جست‌وجو نام شهر مورد نظر و تاریخ ورود و خروجتان را وارد کنید و با زدن دکمه جستجو وارد صفحه رزرو آنلاین هتل‌های همان شهر ‌شوید. در این قسمت قیمت‌ها و تخفیف‌ها را مشاهده کنید و متناسب با بودجه و بازه زمانی مدنظرتان رزرو هتل را انجام بدهید. البته فیلترهای جستجو مانند فیلتر قیمت، ستاره هتل‌، امکانات، امتیاز مهمانان و نوع اقامتگاه شما را برای رسیدن به هتل هدفتان یاری می‌کنند.
                                <br/>
                                بعد از ثبت رزرو، کارشناسان سفرانه با شما تماس می‌گیرند و بعد از کسب رضایت و پرداخت آنلاین هزینه اقامت از سمت شما، رزرو هتل را برای شما نهایی می‌کنند."
                    }
                  },
                  {
                    "@type":"Question",
                    "name":"رزرو بهترین هتل داخلی",
                    "acceptedAnswer":{
                        "@type":"Answer",
                        "text":"
                                فراهم کردن
                                <b> رزرو آنلاین بهترین </b>
                                هتل‌های ایران رسالتی است که سفرانه به خوبی آن را در راس اهداف کاری خود قرار داده است. در سفرانه خبری از هتل بی‌کیفیت و خدمات رسانی ضعیف نیست!
                                <br/>
                                پس اگر به دنبال رزرو هتل لوکس،
                                <b> بهترین هتل های تهران، بهترین هتل‌های مشهد، بهترین هتل‌های اصفهان، بهترین هتل های کیش، بهترین هتل‌های شیراز، بهترین هتل های قشم </b>
                                و غیره هستید سفرانه همراه بسیار خوبی برای شماست."
                    }
                  },
                  {
                    "@type":"Question",
                    "name":"پیگیری رزرو آنلاین هتل در سفرانه",
                    "acceptedAnswer":{
                        "@type":"Answer",
                        "text":"
                                بعد از ثبت
                                <b> رزرو هتل </b>
                                در سایت سفرانه یک کد پیگیری 6 رقمی به شماره موبایل و یا ایمیل شماره ارسال می‌شود. در قسمت پیگیری رزرو در قسمت بالای سایت می‌توانید با وارد کردن شماره موبایل و کدپیگیری وضعیت رزرو آنلاین را مشاهده بفرمایید. ضمن اینکه تمامی مراحل پیشروی ثبت رزرو از طریق پیامک به مسافران اطلاع‌رسانی می‌شود.
                                <br/>
                                همین قسمت را به عنوان رسید (واچر) به هتل ارائه بدهید و اگر نیاز به فاکتور داشتید آن را پرینت گرفته و به اداره و یا سازمان (دولتی/ خصوصی) مد نظرتان تحویل دهید. پشتیبانی رزرو آنلاین هتل در سفرانه از ساعت 9 صبح تا 23 شب آماده پاسخگویی به تمامی سوالات و ابهامات شما در رابطه با فرایند رزرو است."
                    }
                  }
                ]
              }`,
          }}
        />
      </Head>

      <SearchBox />

      <div
        className={`${styles.wrapHome} ${
          process.env.THEME_NAME === 'TRAVELO' && styles.wrapHomeTravelo
        }`}
      >
        {process.env.THEME_NAME === 'TAJAWAL' && <Banner />}
        {process.env.THEME_NAME === 'TRAVELO' && <BannerTravelo />}

        <SuggestedHotels />
        <PopularCities />
        <BeachHotels />
        <Offer />
        <LatestBlogPost />
        <MyService />
        <AboutSummary />
      </div>

      <Subscribe />
    </Layout>
  )
}

// Homepage.getInitialProps = async () => ({
//   namespacesRequired: ['common'],
// })

Homepage.propTypes = {
  t: PropTypes.func.isRequired,
}
export const getServerSideProps = async ({ req }) => {
  
  let hostName = req.headers.host;
  const host = req.headers.host;
  if (host.includes("www")){
    const domainName = host.split("www.")[1]; 
    hostName = `https://www.${domainName}/fa`;
  }

  const portalData = await GetPortal();

  return {
    props: {
      host : hostName,
      portalData: portalData?.data || null
    },
  }
}

export default withTranslation('common')(Homepage)
