import { Result, Button } from 'antd'
import { Link, withTranslation, i18n } from '../../i18n'
import Head from 'next/head'

import styles from '../styles/Home.module.css'

function Custom404() {
  return (
    <>
      <Head>
        <title>خطای ۴۰۴</title>
      </Head>
      <div className={styles.error404}>
        <img src="/images/passenger.png" />
        <div className={styles.title}>خطای ۴۰۴</div>
        <div className={styles.description}>
          ظاهراً در کوچه پس‌کوچه‌های شهر گم شده‌اید، ما شما را به نزدیک‌ترین هتل
          راهنمایی می‌کنیم :)
        </div>
        <div className={styles.extra}>
          <Link as="/" href="/">
            <a>
              <Button type="primary">برو به صفحه اصلی</Button>
            </a>
          </Link>
          <Link
            as="/hotel/هتل-پارسیان-آزادی-تهران"
            href="/hotel/هتل-پارسیان-آزادی-تهران"
          >
            <a>
              <Button type="primary">برو به نزدیک‌ترین هتل</Button>
            </a>
          </Link>
          <Link as="/blog" href="/blog">
            <a>
              <Button type="primary">برو به یک جای هیجان انگیز</Button>
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}

export default withTranslation('common')(Custom404)
