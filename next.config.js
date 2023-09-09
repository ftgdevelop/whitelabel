const { nextI18NextRewrites } = require('next-i18next/rewrites')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

const localeSubpaths = {
  fa: 'fa',
  ar: 'ar',
  // us: 'us',
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
      'trustseal.enamad.ir',
      'logo.samandehi.ir',
      'www.facebook.com',
    ],
    formats: ['image/avif', 'image/webp'],
  },
  env: {
    SITE_NAME: 'https://www.safaraneh.com',
    ABP_TENANT_ID: 1040,
    BS_TERMINAL: 'ACE01BF4-AAEE-45D6-ABE7-F3FF519052DB',
    API_KEY: '68703d73-c92c-4105-9f71-9f718aaad2cc',
    GET_PORTAL_API_KEY: 'b4fa99cc-3dfd-40a5-8bcf-53acdc2dbd84',
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
      // { title: 'العربية', value: 'ar' },
      // ,{title:"English",value:"us"}
    ],
    //CALENDAR_LOCALES:['en']
    CALENDAR_LOCALES: ['en', 'fa', 'ar'],
  },
})
