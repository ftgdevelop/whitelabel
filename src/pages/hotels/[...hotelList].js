import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { withTranslation, i18n, Router } from '../../../i18n'
import Layout from '../../components/Layout/Layout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'

import HotelList from '../../components/Hotel/HotelList/HotelList'
import DomesticHotelList from '../../components/Hotel/HotelList/DomesticHotelList'
import { GetpageByUrl, GetAllFaqById } from '../../actions/index'
import { useSelector } from 'react-redux'

const HotelListFaPage = ({ t, data, dataFaq }) => {
  const router = useRouter()
  useEffect(() => {
    if (Router && !process.env.MODULES.includes('domesticHotel')) {
      Router.push('/')
    }
  })

  const portalData = useSelector(state => state.portal?.portalData);
  const siteName = portalData?.Phrases?.find(item => item.Keyword === "Name")?.Value || "";

  return (
    process.env.MODULES.includes('domesticHotel') && (
      <Layout>
        <Head>
          
          <title>{data && data.PageTitle?.replace("{0}",siteName)}</title>
          
          {data && data.MetaTags
            ? data.MetaTags.map((item) => (
                <meta name={item.Name} content={item.Content?.replace("{0}", siteName)} key={item.Name} />
              ))
            : null}

          {data && data.Url && (
            <link rel="canonical" href={process.env.SITE_NAME + data.Url} />
          )}

          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdn2.safaraneh.com/libs/slick-carousel/1.6.0/css/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdn2.safaraneh.com/libs/slick-carousel/1.6.0/css/slick-theme.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdn2.safaraneh.com/libs/react-modern-calendar-datepicker/3.1.6/css/datepicker.min.css"
          />

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

        {process.env.DomesticHotelV4 ? (
          <DomesticHotelList dataFaq={dataFaq} />
        ) : (
          <HotelList dataFaq={dataFaq} />
        )}

        {dataFaq && dataFaq.result.items.length !== 0 ? (
          <script
            id="script_hotel_1"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: `
              {"@context":"https://schema.org",
                "@type":"FAQPage",
                "mainEntity":[
                  ${
                    dataFaq.result.items &&
                    dataFaq.result.items.map(
                      (item) => `{
                    "@type":"Question",
                    "name":"${item.question && item.question}",
                    "acceptedAnswer":{
                        "@type":"Answer",
                        "text":"${
                          item.answer &&
                          item.answer
                            .replace(/<\/?[^>]+(>|$)/g, '')
                            .replace(/&zwnj;/g, '')
                        }"
                    }
                  }`,
                    )
                  }
                ]
              }`,
            }}
          />
        ) : null}
      </Layout>
    )
  )
}

// HotelListFaPage.getInitialProps = async () => ({
//   namespacesRequired: ["hotels"],
// });

HotelListFaPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export const getServerSideProps = async ({ query, req }) => {
  // const locale = req.cookies['next-i18next']
  const locale = req.url.split('/')[1]
  const url = encodeURI(`/${locale}/hotels/${query.hotelList[0]}`)

  const res = await GetpageByUrl(url, locale)
  let resFaq = ''
  if (res.data) {
    resFaq = await GetAllFaqById(res.data.EntityId, locale)
  }

  return {
    props: {
      data: JSON.parse(JSON.stringify(res.data)),
      dataFaq: resFaq.data ? JSON.parse(JSON.stringify(resFaq.data)) : '',
    },
  }
}

export default withTranslation('common')(HotelListFaPage)
