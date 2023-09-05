import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation, Link } from '../../../../i18n'
import dynamic from 'next/dynamic'
import { Row, Col, Collapse } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import styles from '../../../styles/Home.module.css'
import { QuestionIcon } from '../../UI/Icons'

const Logo = dynamic(() => import('../../Layout/Logo'))
const { Panel } = Collapse

class AboutSummary extends React.Component {
  render() {
    const { t } = this.props
    return (
      <div
        className={`${styles.aboutSummary} ${
          process.env.THEME_NAME === 'TRAVELO' && styles.aboutSummaryTravelo
        }`}
      >
        <div className={styles.container}>
          <div className={styles.contentAboutSummary}>
            <Logo />
            <p>
              مدت زمان زیادی نیست که رزرو خدمات گردشگری نیز مانند صدها خدمات
              دیگر به دنیای دیجیتال قدم گذاشته و خیلی سریع روش‌های سنتی سفر کردن
              را پایان بخشیده. در دوران شروع دیجیتالی شدن رزرو خدمات گردشگری
              شرکت‌های کمی در این عرصه فعالیت داشتند.
            </p>
            <p>
              هلدینگ فرهیختگان تجارت قرن با بیش از 13 سال تجربه در زمینه ارائه
              خدمات گردشگری یکی از اولین بازیگران این عرصه بوده، و امروز بخش
              خدمات گردشگری خود را تحت عنوان آژانس مسافرتی سفرانه مشرق زمین با
              نام تجاری سفرانه انجام می‌دهد. سایت سفرانه با استفاده از تجربۀ
              سالیانی که توسط هلدینگ فرهیختگان به دست آورده، تحت به‌روزترین
              زیرساخت‌ها و با شناخت کامل نیازهای مسافران طی سال‌های متمادی،
              امروز با قوی‌ترین تیم پشتیبانی و با تاییدیه به عنوان نماینده رسمی
              وزارت گردشگری جهت رزرو آنلاین و آفلاین کلیه خدمات گردشگری در خدمت
              مسافران است.
            </p>

            <Link as="/about" href="/about">
              <a target="_blank">اطلاعات بیشتر درباره سفرانه</a>
            </Link>
          </div>
          <div className={styles.contentFaqSummary}>
            <Collapse
              bordered={false}
              expandIcon={({ isActive }) => (
                <DownOutlined rotate={isActive ? 180 : 0} />
              )}
              className="faq-travelo"
            >
              <Panel
                header={
                  <div className={styles.subjectFaq}>
                    <QuestionIcon />
                    <h2 className="cip-faq-header">
                      چگونه با تخفیف‌های همیشگی هتل رزرو کنیم؟
                    </h2>
                  </div>
                }
                key="1"
                className={styles.collape}
              >
                <div className={styles.paraghraphFaq}>
                  <p>
                    <b> رزرو آنلاین هتل </b>
                    چند سالی است که جایگزین روش‌های سنتی رزرو شده است. در همین
                    راستا سایت سفرانه (آژانس مسافرتی سفرانه مشرق زمین) به عنوان
                    یکی از مهم‌ترین نقش‌آفرینان عرصه خدمات آنلاین گردشگری،
                    واسطه‌ها را حذف کرده و آماده ارائه خدمات رزرواسیون
                    <b> بهترین هتل های تهران </b>و ایران با مناسب‌ترین قیمت و
                    بیشترین تخفیف است.
                  </p>
                  <p>
                    در سفرانه امکان دسترسی به
                    <b> بهترین هتل های ایران </b>
                    از هتل 5 ستاره الی 1 ستاره؛ از هتل لوکس، هتل آپارتمان، بوتیک
                    هتل تا اقامتگاه سنتی (هتل سنتی) را دارید. علاوه بر این
                    موارد، در این سامانه اطلاعاتی مانند امکانات هتل، موقعیت
                    جغرافیایی روی نقشه، ستاره‌های هتل، تجربه اقامتی، قوانین هتل
                    و امتیاز کاربران به یک هتل خاص را یکجا می‌توانید ملاحظه
                    بفرمایید.
                  </p>
                </div>
              </Panel>
            </Collapse>

            <Collapse
              bordered={false}
              expandIcon={({ isActive }) => (
                <DownOutlined rotate={isActive ? 180 : 0} />
              )}
              className="faq-travelo"
            >
              <Panel
                header={
                  <div className={styles.subjectFaq}>
                    <QuestionIcon />
                    <h2 className="cip-faq-header">
                      مزایای رزرو آنلاین هتل از سفرانه چیست؟
                    </h2>
                  </div>
                }
                key="2"
                className={styles.collape}
              >
                <div className={styles.paraghraphFaq}>
                  <ul>
                    <li>
                      رزرو هتل از سفرانه ارزان‌تر از رزرو مستقیم از خود هتل است.
                    </li>
                    <li>
                      <b> رزرو هتل </b>
                      در سفرانه راحت و سریع است.
                    </li>
                    <li>
                      <b> فرایند رزرو آنلاین </b>
                      هتل در سفرانه بدون هیچ‌گونه صرف وقت و هزینه‌های جانبی
                      انجام می‌شود.
                    </li>
                    <li>
                      در سفرانه امکان رزرو
                      <b> هتل های تمام شهرهای ایران </b>
                      را دارید.
                    </li>
                    <li>
                      در سفرانه امکان جست و جوی هتل براساس موقعیت مکانی روی نقشه
                      و ستاره‌های هتل را دارید.
                    </li>
                    <li>
                      در قسمت جستجوی هتل می‌توانید هتل را بر اساس کمترین و یا
                      بیشترین قیمت، امتیاز کاربران و بیشترین تخفیف دسته بندی
                      کنید.
                    </li>
                    <li>
                      در سفرانه موقعیت جغرافیایی هر هتل را بر روی نقشه گوگل با
                      جزئیات و جاهای دیدنی اطراف مشاهده می‌کنید.
                    </li>
                    <li>
                      تصاویر هتل‌ها به طور اختصاصی توسط سفرانه تهیه شده‌اند که
                      با کیفیت‌ترین تصاویر از موقعیت بیرونی و داخلی هتل در بین
                      تمامی وبسایت‌های
                      <b> رزرو آنلاین هتل </b>
                      هستند.
                    </li>
                    <li>
                      در صفحه هر هتل، عکس هر واحد اقامتی به طور اختصاصی رو به
                      روی آن نمایش داده می‌شود.
                    </li>
                    <li>
                      در سفرانه امکان بررسی نظرات و تجربیات مهمانان سابق هتل ها
                      وجود دارد.
                    </li>
                  </ul>
                </div>
              </Panel>
            </Collapse>

            <Collapse
              bordered={false}
              expandIcon={({ isActive }) => (
                <DownOutlined rotate={isActive ? 180 : 0} />
              )}
              className="faq-travelo"
            >
              <Panel
                header={
                  <div className={styles.subjectFaq}>
                    <QuestionIcon />
                    <h2 className="cip-faq-header">
                      رزرو هتل با بیشترین تخفیف در سفرانه
                    </h2>
                  </div>
                }
                key="3"
                className={styles.collape}
              >
                <div className={styles.paraghraphFaq}>
                  <p>
                    تخفیف رزرو آنلاین هتل و سهولت رزرو از اهداف مهم سفرانه و در
                    راستای خدمت رسانی به مشتاقان سفرهای داخلی است. ما در اینجا
                    تمام تلاشمان را می‌کنیم تا هزینه‌های سفر شما را کاهش دهیم و
                    از طرفی موجبات ارتقاء کیفیت خدمات رسانی را فراهم آوریم. در
                    همین راستا برخی از هتلها از جمله
                    <b> هتل آزادی تهران و هتل استقلال تهران </b>
                    (برای شرکت‌ها و سازمان‌ها) با گارانتی سفرانه و تضمین بهترین
                    قیمت قابل رزرو هستند.
                  </p>
                  <p>
                    برای رزرو هریک از هتل‌ها می‌توانید قیمت ها را مقایسه کنید،
                    تخفیف ها را مشاهده کنید و با کارشناسان رزرواسیون ما در تماس
                    باشید.
                  </p>
                </div>
              </Panel>
            </Collapse>

            <Collapse
              bordered={false}
              expandIcon={({ isActive }) => (
                <DownOutlined rotate={isActive ? 180 : 0} />
              )}
              className="faq-travelo"
            >
              <Panel
                header={
                  <div className={styles.subjectFaq}>
                    <QuestionIcon />
                    <h2 className="cip-faq-header">
                      مراحل رزرو هتل در سفرانه به چه صورت است؟
                    </h2>
                  </div>
                }
                key="4"
                className={styles.collape}
              >
                <div className={styles.paraghraphFaq}>
                  <p>
                    برای
                    <b> رزرو آنلاین هتل </b>
                    در سفرانه از لحظه انتخاب بهترین هتل تا دریافت واچر تنها به
                    اندازه چند کلیک ساده زمان نیاز دارید. کافیست در قسمت جست‌وجو
                    نام شهر مورد نظر و تاریخ ورود و خروجتان را وارد کنید و با
                    زدن دکمه جستجو وارد صفحه رزرو آنلاین هتل‌های همان شهر ‌شوید.
                    در این قسمت قیمت‌ها و تخفیف‌ها را مشاهده کنید و متناسب با
                    بودجه و بازه زمانی مدنظرتان رزرو هتل را انجام بدهید. البته
                    فیلترهای جستجو مانند فیلتر قیمت، ستاره هتل‌، امکانات، امتیاز
                    مهمانان و نوع اقامتگاه شما را برای رسیدن به هتل هدفتان یاری
                    می‌کنند.
                  </p>
                  <p>
                    بعد از ثبت رزرو، کارشناسان سفرانه با شما تماس می‌گیرند و بعد
                    از کسب رضایت و پرداخت آنلاین هزینه اقامت از سمت شما، رزرو
                    هتل را برای شما نهایی می‌کنند.
                  </p>
                </div>
              </Panel>
            </Collapse>

            <Collapse
              bordered={false}
              expandIcon={({ isActive }) => (
                <DownOutlined rotate={isActive ? 180 : 0} />
              )}
              className="faq-travelo"
            >
              <Panel
                header={
                  <div className={styles.subjectFaq}>
                    <QuestionIcon />
                    <h2 className="cip-faq-header">رزرو بهترین هتل داخلی</h2>
                  </div>
                }
                key="5"
                className={styles.collape}
              >
                <div className={styles.paraghraphFaq}>
                  <p>
                    فراهم کردن
                    <b> رزرو آنلاین بهترین </b>
                    هتل‌های ایران رسالتی است که سفرانه به خوبی آن را در راس
                    اهداف کاری خود قرار داده است. در سفرانه خبری از هتل بی‌کیفیت
                    و خدمات رسانی ضعیف نیست!
                  </p>
                  <p>
                    پس اگر به دنبال رزرو هتل لوکس،
                    <b>
                      {' '}
                      بهترین هتل های تهران، بهترین هتل‌های مشهد، بهترین هتل‌های
                      اصفهان، بهترین هتل های کیش، بهترین هتل‌های شیراز، بهترین
                      هتل های قشم{' '}
                    </b>
                    و غیره هستید سفرانه همراه بسیار خوبی برای شماست.
                  </p>
                </div>
              </Panel>
            </Collapse>

            <Collapse
              bordered={false}
              expandIcon={({ isActive }) => (
                <DownOutlined rotate={isActive ? 180 : 0} />
              )}
              className="faq-travelo"
            >
              <Panel
                header={
                  <div className={styles.subjectFaq}>
                    <QuestionIcon />
                    <h2 className="cip-faq-header">
                      پیگیری رزرو آنلاین هتل در سفرانه
                    </h2>
                  </div>
                }
                key="6"
                className={styles.collape}
              >
                <div className={styles.paraghraphFaq}>
                  <p>
                    بعد از ثبت
                    <b> رزرو هتل </b>
                    در سایت سفرانه یک کد پیگیری 6 رقمی به شماره موبایل و یا
                    ایمیل شماره ارسال می‌شود. در قسمت پیگیری رزرو در قسمت بالای
                    سایت می‌توانید با وارد کردن شماره موبایل و کدپیگیری وضعیت
                    رزرو آنلاین را مشاهده بفرمایید. ضمن اینکه تمامی مراحل پیشروی
                    ثبت رزرو از طریق پیامک به مسافران اطلاع‌رسانی می‌شود.
                  </p>

                  <p>
                    همین قسمت را به عنوان رسید (واچر) به هتل ارائه بدهید و اگر
                    نیاز به فاکتور داشتید آن را پرینت گرفته و به اداره و یا
                    سازمان (دولتی/ خصوصی) مد نظرتان تحویل دهید. پشتیبانی رزرو
                    آنلاین هتل در سفرانه از ساعت 9 صبح تا 23 شب آماده پاسخگویی
                    به تمامی سوالات و ابهامات شما در رابطه با فرایند رزرو است.
                  </p>
                </div>
              </Panel>
            </Collapse>
          </div>
        </div>
      </div>
    )
  }
}

AboutSummary.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

AboutSummary.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(AboutSummary)
