import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }


  render() {
    
    const portalGoogleAnalytic = process.env.GOOGLE_TAG_MANAGER_ID;
    return (
      <Html lang="fa">
        <Head>
          {/* <meta
            http-equiv="Content-Security-Policy"
            content="script-src 'self' 'unsafe-eval'; object-src 'self'"
          /> */}
           <link rel='manifest' href='/manifest.json' />
          {!!portalGoogleAnalytic &&  <Script
            src="/ga-script.js"
            strategy="beforeInteractive"
          />}
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdn2.safaraneh.com/libs/react-modern-calendar-datepicker/3.1.6/css/datepicker.min.css"
          />
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
        </Head>
        <body className={`body ${process.env.THEME_NAME}`}>

          {!!portalGoogleAnalytic && (
            <>
              {/* Google Tag Manager (noscript) */}
              <noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=${portalGoogleAnalytic}`}
              height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe></noscript>
              {/* End Google Tag Manager (noscript) */}
            </>
          )}


          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
