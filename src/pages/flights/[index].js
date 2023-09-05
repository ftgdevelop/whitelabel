import PropTypes from 'prop-types'
import { withTranslation, Router } from '../../../i18n'
import Layout from '../../components/Layout/Layout'
import Head from 'next/head'
import { useRouter } from 'next/router'

import FlightList from '../../components/Flight/FlightList/FlightList'
import { useEffect, useState } from 'react'

import { GetFlightDomesticDetails } from '../../actions/blog/blogActions'

const FlightListPage = ({ t, data, query }) => {
  console.log(query)
  useEffect(() => {
    if (Router && !process.env.MODULES.includes('domesticFlight')) {
      Router.push('/')
    }
    data && data[0] && setFlightContent(data[0].content.rendered)
  })
  const router = useRouter()
  let flightUrl = `https://www.safaraneh.com/${router.asPath}`
  const [flightContent, setFlightContent] = useState('')

  return (
    process.env.MODULES.includes('domesticFlight') && (
      <Layout>
        <Head>
          {/* <title>{t('flights-list')}</title> */}
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdn2.safaraneh.com/libs/react-modern-calendar-datepicker/3.1.6/css/datepicker.min.css"
          />

          {data && data[0] && (
            <>
              <title>{data[0].yoast_head_json.title}</title>
              <meta
                property="og:title"
                content={data[0].yoast_head_json.og_title}
                key="title"
              ></meta>
              <meta
                name="description"
                content={data[0].yoast_head_json.description}
              ></meta>
              <meta
                property="og:description"
                content={data[0].yoast_head_json.og_description}
                key="description"
              ></meta>
              <meta property="og:type" content="website"></meta>
              <meta property="og:url" content={flightUrl}></meta>
              <meta name="og:locale" content="fa-IR" />
              <meta name="twitter:card" content="summary" />
              <meta name="twitter:site" content="@safaraneh" />
              <meta
                name="twitter:title"
                content={data[0].yoast_head_json.title}
              />
              <meta
                name="twitter:description"
                content={data[0].yoast_head_json.description}
              />
            </>
          )}
        </Head>

        <FlightList flightContent={flightContent} />
      </Layout>
    )
  )
}

// FlightListPage.getInitialProps = async () => ({
//   namespacesRequired: ['common'],
// })

FlightListPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export const getServerSideProps = async ({ query }) => {
  const url = encodeURI(`/${query.index[2]}`)
  const res = await GetFlightDomesticDetails(url)

  return {
    props: {
      data: JSON.parse(JSON.stringify(res.data)),
      query,
    },
  }
}

export default withTranslation('common')(FlightListPage)
