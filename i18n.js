const NextI18Next = require('next-i18next').default
const { localeSubpaths } = require('next/config').default().publicRuntimeConfig
const path = require('path')

module.exports = new NextI18Next({
  // browserLanguageDetection:	true,
  // serverLanguageDetection:	true,
  defaultLanguage: 'fa',
  otherLanguages: ['ar', 'us'],
  defaultNS: 'common',
  // localeSubpaths,
  localeSubpaths: {
    fa: 'fa',
    ar: 'ar',
    us: 'us',
  },
  localePath: typeof window === 'undefined' ? 
  require('path').resolve('./public/static/locales'):
  './static/locales',
  localeStructure: '{{lng}}/{{ns}}',

  defaultLocale: 'fa',
  locales: ['fa', 'ar', 'us'],

  // defaultNS: 'common',

  localeDetection: false,
})
