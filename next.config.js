const { nextI18NextRewrites } = require('next-i18next/rewrites')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

const localeSubpaths = {
  fa: 'fa',
  ar: 'ar',
  us: 'us',
}

const withSass = require('@zeit/next-sass')
const withLess = require('@zeit/next-less')
const withCSS = require('@zeit/next-css')

const isProd = process.env.NODE_ENV === 'production'
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
})
// fix: prevents error when .less files are required by node
// if (typeof require !== 'undefined') {
//   require.extensions['.less'] = (file) => {}
// }

module.exports = withPWA({
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  redirects : async() => {
    return [
      {
        source: '/fa/fa:path*',
        destination: '/',
        permanent: true,
      }
    ]
  },
  publicRuntimeConfig: {
    localeSubpaths,
  },
  // cssModules: true,
  // cssLoaderOptions: {
  //   importLoaders: 1,
  //   localIdentName: '[local]___[hash:base64:5]',
  //   url: false,
  // },
  // ...withLess(
  //   withSass({
  //     // lessLoaderOptions: {
  //     //   javascriptEnabled: true,
  //     // },
  //     webpack(config, options) {
  //       config.module.rules.push({
  //         test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
  //         use: {
  //           loader: 'url-loader',
  //           options: {
  //             limit: 100000,
  //           },
  //         },
  //       })
  //       return config
  //     },
  //   }),
  // ),
  // trailingSlash: true,
  // exportPathMap: function () {
  //   return {
  //     '/': { page: '/' },
  //   }
  // },
  // async headers() {
  //   return [
  //     {
  //         source: '/',
  //         headers: [
  //             {
  //               "key": "Content-Security-Policy",
  //               "value": "default-src 'self' https: ; script-src 'self' ; object-src 'none'"
  //             }
  //         ]
  //     }
  //   ]
  // },
  swcMinify: true,
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  plugins: [new BundleAnalyzerPlugin()],
  images: {
    domains: [
      'cdn.safaraneh.com',
      'cdn2.safaraneh.com',
      'panel.safaraneh.com',
      'blog.iranhotel.ir',
      'trustseal.enamad.ir',
      'logo.samandehi.ir',
      'www.facebook.com',
      'cdn.mehrbooking.net'
    ],
    formats: ['image/avif', 'image/webp'],
  },
  env: {
    SITE_NAME: 'https://www.iranhotel.ir',
    COMPANY_NAME: 'ایران هتل',
    ABP_TENANT_ID: 1045,
    API_KEY: '602d3109-6e40-4653-42a4-08dbc10a4f4a',
    GET_PORTAL_API_KEY: '92ba7928-ab01-4011-be49-5bed7556ae2a',
    GOOGLE_ANALYTIC_ID: 'G-L9XG7Q3D68',
    GOOGLE_TAG_MANAGER_ID: 'GTM-MJQWGBV',
    BLOG_URL_PANEL: 'https://panel.safaraneh.com/',
    THEME_NAME: 'TRAVELO',
    //THEME_NAME: "TAJAWAL",
    // MODULES:["foreignHotel","domesticHotel","blog","cip","newFeature"]
    DomesticHotelV4: true,
    MODULES: [
      'foreignHotel',
      'domesticHotel',
      'domesticFlight',
      'foreignFlight',
      'blog',
      'cip',
      // 'bus',
      'newFeature',
    ],
    Languages: [
      { title: 'فارسی', value: 'fa' },
      // { title: 'العربية', value: 'ar' }
      // ,{title:"English",value:"us"}
    ],
    //CALENDAR_LOCALES:['en']
    CALENDAR_LOCALES: ['en', 'fa', 'ar'],
  },
})
