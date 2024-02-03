import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  componentDidMount = () => {

    const portalGoogleAnalytic = process.env.GOOGLE_ANALYTIC_ID;
    if (portalGoogleAnalytic){
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer', portalGoogleAnalytic);
    }

  };

  render() {
    
    const portalGoogleAnalytic = process.env.GOOGLE_ANALYTIC_ID;
    return (
      <Html lang="fa">
        <Head>
          {/* <meta
            http-equiv="Content-Security-Policy"
            content="script-src 'self' 'unsafe-eval'; object-src 'self'"
          /> */}
           <link rel='manifest' href='/manifest.json' />
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
