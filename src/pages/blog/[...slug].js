import PropTypes from 'prop-types'
import { Link, withTranslation, i18n } from '../../../i18n'
import Layout from '../../components/Layout/Layout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'

import BlogPost from '../../components/Blog/BlogPost/BlogPost'
import { GetBlogPostDetails } from '../../actions/blog/blogActions'

const BlogSinglePage = ({ t, data, query }) => {

  const router = useRouter()
  let post = router.asPath
  return (
    <Layout>
      <Head>
        {data && data[0] ? (
          <>
            <title>
              {data[0].yoast_head_json.title === undefined
                ? data[0].title.rendered
                : data[0].yoast_head_json.title}
            </title>
            <meta
              property="og:title"
              content={
                data[0].yoast_head_json.title === undefined
                  ? data[0].title.rendered
                  : data[0].yoast_head_json.title
              }
              key="title"
            ></meta>
            <meta
              name="description"
              content={
                data[0].yoast_head_json.description === undefined
                  ? data[0].excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, '')
                  : data[0].yoast_head_json.description
              }
            ></meta>
            <meta
              property="og:description"
              content={
                data[0].yoast_head_json.description === undefined
                  ? data[0].excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, '')
                  : data[0].yoast_head_json.description
              }
              key="description"
            ></meta>
            <meta property="og:type" content="website"></meta>
            <meta
              property="og:url"
              content={`https://www.safaraneh.com/${post}`}
            ></meta>
            <meta
              property="og:image"
              itemProp="image"
              content={data[0].yoast_head_json.og_image[0].url}
              key="image"
            ></meta>
            <meta name="og:locale" content="fa-IR" />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@safaraneh" />
            <meta
              name="twitter:title"
              content={
                data[0].yoast_head_json.title === undefined
                  ? data[0].title.rendered
                  : data[0].yoast_head_json.title
              }
            />
            <meta
              name="twitter:description"
              content={
                data[0].yoast_head_json.description === undefined
                  ? data[0].excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, '')
                  : data[0].yoast_head_json.description
              }
            />

            {data[0].acf.pp_faq.pp_subject_q1 &&
              data[0].acf.pp_faq.pp_answer_q1 && (
                <script
                id="script_slug_1"
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: `
                                {"@context":"https://schema.org",
                                "@type":"FAQPage",
                                "mainEntity":[
                                    ${
                                      data[0].acf.pp_faq.pp_subject_q1 &&
                                      data[0].acf.pp_faq.pp_answer_q1 &&
                                      `{
                                        "@type":"Question",
                                        "name":"${data[0].acf.pp_faq.pp_subject_q1}",
                                        "acceptedAnswer":{
                                            "@type":"Answer",
                                            "text":"${data[0].acf.pp_faq.pp_answer_q1}"
                                        }
                                        }`
                                    }
                                    ${
                                      data[0].acf.pp_faq.pp_subject_q2 &&
                                      data[0].acf.pp_faq.pp_answer_q2 &&
                                      `,{
                                        "@type":"Question",
                                        "name":"${data[0].acf.pp_faq.pp_subject_q2}",
                                        "acceptedAnswer":{
                                            "@type":"Answer",
                                            "text":"${data[0].acf.pp_faq.pp_answer_q2}"
                                        }
                                        }`
                                    }
                                    ${
                                      data[0].acf.pp_faq.pp_subject_q3 &&
                                      data[0].acf.pp_faq.pp_answer_q3 &&
                                      `,{
                                        "@type":"Question",
                                        "name":"${data[0].acf.pp_faq.pp_subject_q3}",
                                        "acceptedAnswer":{
                                            "@type":"Answer",
                                            "text":"${data[0].acf.pp_faq.pp_answer_q3}"
                                        }
                                        }`
                                    }
                                    ${
                                      data[0].acf.pp_faq.pp_subject_q4 &&
                                      data[0].acf.pp_faq.pp_answer_q4 &&
                                      `,{
                                        "@type":"Question",
                                        "name":"${data[0].acf.pp_faq.pp_subject_q4}",
                                        "acceptedAnswer":{
                                            "@type":"Answer",
                                            "text":"${data[0].acf.pp_faq.pp_answer_q4}"
                                        }
                                        }`
                                    }
                                    ${
                                      data[0].acf.pp_faq.pp_subject_q5 &&
                                      data[0].acf.pp_faq.pp_answer_q5 &&
                                      `,{
                                        "@type":"Question",
                                        "name":"${data[0].acf.pp_faq.pp_subject_q5}",
                                        "acceptedAnswer":{
                                            "@type":"Answer",
                                            "text":"${data[0].acf.pp_faq.pp_answer_q5}"
                                        }
                                        }`
                                    }
                                ]
                                }`,
                  }}
                />
              )}
          </>
        ) : null}
      </Head>
      <>
        <BlogPost />
      </>
    </Layout>
  )
}

// BlogSinglePage.getInitialProps = async () => ({
//     namespacesRequired: ['common'],
// })

BlogSinglePage.propTypes = {
  t: PropTypes.func.isRequired,
}

export const getServerSideProps = async ({ query }) => {
  const url = encodeURI(`/${query.slug[0]}`)
  const res = await GetBlogPostDetails(url)

  return {
    props: {
      data: JSON.parse(JSON.stringify(res.data)),
      query,
    },
  }
}

export default withTranslation('common')(BlogSinglePage)
