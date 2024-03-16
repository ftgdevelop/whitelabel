import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import { withTranslation, i18n, Router } from '../../../i18n'
import Layout from '../../components/Layout/Layout'
import Head from 'next/head'
import Script from 'next/script'
import DetailHotel from '../../components/Hotel/DetailHotel/DetailHotel'
import DetailHotelV4 from '../../components/Hotel/DetailHotel/DetailHotelV4'
import {
  GetpageByUrl,
  GetDomesticHotelDetails,
  GetScore,
  GetAccommodationById,
  GetPortal,
} from '../../actions/index'

const HotelHomePage = ({
  t,
  data,
  dataHotel,
  dataScore,
  dataAccommodation,
  portalData
}) => {

  useEffect(() => {
    if (Router && !process.env.MODULES.includes('domesticHotel')) {
      Router.push('/')
    }
  })

  const portalName = portalData?.Phrases?.find(item=> item.Keyword === "Name")?.Value;
  const portalTwitter = portalData?.Phrases?.find(item=> item.Keyword === "Twitter")?.Value;
  const configWebsiteUrl = process.env.SITE_NAME;

  return (
    process.env.MODULES.includes('domesticHotel') && (
      <Layout>
        <Head>
          <title>{data && data.PageTitle?.replace("{0}",portalName)}</title>
          {data && data.MetaTags
            ? data.MetaTags.map((item) => (
                <meta name={item.Name} content={item.Content?.replace("{0}",portalName)} key={item.Name} />
              ))
            : null}
          
          {dataHotel && (
            <>
              <meta property="og:site_name" content={portalName} key="site_name" />
              <meta
                property="og:title"
                content={dataHotel.PageTitle}
                key="title"
              ></meta>
              <meta
                name="description"
                content={dataHotel.MetaDescription}
              ></meta>
              <meta
                property="og:description"
                content={dataHotel.MetaDescription}
                key="description"
              ></meta>
              <meta property="og:type" content="website"></meta>
              <meta property="og:url" content={dataHotel.Url}></meta>
              <meta
                property="og:image"
                itemProp="image"
                content={dataHotel.ImageUrl}
                key="image"
              ></meta>
              <meta name="og:locale" content="fa-IR" />
              <meta name="twitter:card" content="summary" />
              <meta name="twitter:site" content={portalTwitter} />
              <meta name="twitter:title" content={dataHotel?.PageTitle} />
              <meta
                name="twitter:description"
                content={dataHotel.MetaDescription}
              />
            </>
          )}

          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdn2.safaraneh.com/libs/react-bnb-gallery/1.4.4/css/react-bnb-gallery.min.css"
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

        {process.env.DomesticHotelV4 ? <DetailHotelV4 /> : <DetailHotel />}

        <script
          id="script_detail_1"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
            "@context": "https://schema.org",
            "@type": "Hotel",
            "name": "${dataHotel?.PageTitle}",
            "description": "${dataHotel?.BriefDescription}",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "${dataHotel?.Address}"
            },
            "checkinTime": "14:00",
            "checkoutTime": "14:00",
            "telephone": "021-26150051",
            "image": "${dataHotel?.ImageUrl}",
            "starRating": {
              "@type": "Rating",
              "ratingValue": "${dataHotel?.HotelRating}"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "${
                dataScore.Satisfaction !== 0 ? dataScore.Satisfaction : '100'
              }",
              "reviewCount": "${
                dataScore.CommentCount !== 0 ? dataScore.CommentCount : '1'
              }",
              "worstRating": "0",
              "bestRating": "100"
            }
          }`,
          }}
        />

        <script
          id="script_detail_2"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement":
            [
              {
              "@type": "ListItem",
              "position": 1,
              "item":
              {
                "@id": "${configWebsiteUrl}",
                "name": "صفحه اصلی"
                }
              },
              {
              "@type": "ListItem",
              "position": 2,
              "item":
              {
                "@id": "${configWebsiteUrl}/fa/hotels/${
                  dataHotel && dataHotel.CityName
                }/location-${dataHotel && dataHotel.CityId}",
                "name": "هتل های ${dataHotel && dataHotel.CityName}"
              }
              }
            ]
          }`,
          }}
        />

        {dataAccommodation && dataAccommodation.result.faqs.length !== 0 ? (
          <script
            id="script_detail_3"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: `
              {"@context":"https://schema.org",
                "@type":"FAQPage",
                "mainEntity":[
                  ${
                    dataAccommodation.result.faqs &&
                    dataAccommodation.result.faqs.map(
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

        {/* "image": [
        ${dataHotel.Gallery.map(item=> `"${item.Image}"`)}
      ], */}
        {/* "review": [
          ${dataScore && dataScore.Comments.map(item => `{
          "@type": "Review",
            "author": {
                "@type": "Person",
                "name": "${item.FullName}"
            },
            "datePublished": "${item.CreateDate}",
            "description": "${item.Comment}",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "${item.Satisfaction}",
              "worstRating": "0",
              "bestRating": "100"
            }
        }`)}] */}

        {/* <script
        id="script_detail_4"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            "associatedMedia": [
              ${
                dataHotel &&
                dataHotel.Gallery.map(
                  (item) =>
                    `{"@type": "ImageObject","author": "Safaraneh","contentLocation": "${item.Alt}","contentUrl": "${item.Image}","description": "${item.Alt}","name": "${item.Title}"}`
                )
              }
            ]
          }`,
          }}
        /> */}
      </Layout>
    )
  )
}

// HotelHomePage.getInitialProps = async () => ({
//   namespacesRequired: ["common"],
// });

HotelHomePage.propTypes = {
  t: PropTypes.func.isRequired,
}

export const getServerSideProps = async ({ query, req }) => {
  const locale = req.url.split('/')[1]
  // const locale = req.cookies['next-i18next']

  const url = encodeURI(`/${locale}/hotel/${query.domesticHotelDetail[0]}`)

  const fetchPageDetailsAndScore = async (url) => {
    const pageInfo = await GetpageByUrl(url);
    const scoreInfo = await GetScore(pageInfo.data?.Id);
    return { pageInfo, scoreInfo };
  }

  const fetchHotelDetailsAndAccomodation = async (url) => {
    const hotelInfo = await GetDomesticHotelDetails(url);
    const accomodationInfo = await GetAccommodationById(hotelInfo.data?.HotelId, locale);
    return { hotelInfo, accomodationInfo };
  }

  const [{ pageInfo, scoreInfo }, { hotelInfo, accomodationInfo }, portalData] = await Promise.all([
    fetchPageDetailsAndScore(url),
    fetchHotelDetailsAndAccomodation(url),
    GetPortal()
  ]);

  return {
    props: {
      data: JSON.parse(JSON.stringify(pageInfo.data)),
      dataHotel: JSON.parse(JSON.stringify(hotelInfo.data || null)),
      dataScore: JSON.parse(JSON.stringify(scoreInfo.data)),
      dataAccommodation:
      accomodationInfo.name === 'Error'
          ? null
          : JSON.parse(JSON.stringify(accomodationInfo.data)),
      portalData: portalData.data || null
    },
  }
}

export default withTranslation('common')(HotelHomePage)
