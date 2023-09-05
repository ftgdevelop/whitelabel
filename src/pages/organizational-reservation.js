import PropTypes from 'prop-types'
import { Link, withTranslation, i18n } from '../../i18n'
import Layout from '../components/Layout/Layout'
import Head from 'next/head'
import { Row, Col, Breadcrumb } from 'antd'
import { HomeOutlined, TwitterOutlined, FacebookOutlined, InstagramOutlined, LinkedinOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { SendEmail } from '../components/MyPage/OrganizationalReservation/SendEmail';

import styles from '../styles/Home.module.css'

const MobileAppPage = ({ t }) => (
  <Layout>
    <Head>
        <title>رزروهای سازمانی</title>
    </Head>      
    <div
      className={`${styles.organizationalPage}`}
      >
      <div className={styles.container}>
        <Row>
          <Breadcrumb>
              <Breadcrumb.Item>
              <Link as="/" href="/">
                  <a>
                  <HomeOutlined />
                  </a>
              </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
              <span>رزروهای سازمانی</span>
              </Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <div className={`${styles.organizationalAbout}`}>
          <Row style={{alignItems: "center"}}>
            <Col xs={24} sm={24} md={10} lg={10} xl={10}>
              <div className={styles.image}>
                <img src="/images/em-company.jpg" alt="" title="" />
              </div>
            </Col>
            <Col xs={24} sm={24} md={14} lg={14} xl={14}>
              <div className={styles.content}>
                <div className={styles.sectionTitle}>
                  <h1>رزروهای سازمانی</h1>
                  <div className={styles.subject}>سفرانه به شرکت‌ها و سازمان‌ها چه خدماتی ارائه می‌کند؟</div>
                </div>
                <div className={styles.services}>
                  <Row>
                    <Col span={8}>
                      <div className={styles.detailServices}>
                        <div className={`${styles.imageService} ${styles.imageService1}`}>
                          <img src="/images/winner.png" alt="" title="" />
                        </div>
                        <span>تخفیف و پیشنهادات ویژه</span>
                      </div>
                    </Col>
                    <Col span={8}>
                      <div className={styles.detailServices}>
                        <div className={`${styles.imageService} ${styles.imageService2}`}>
                          <img src="/images/customer-service.png" alt="" title="" />
                        </div>
                        <span>پشتیبانی اختصاصی</span>
                      </div>
                    </Col>
                    <Col span={8}>
                      <div className={styles.detailServices}>
                        <div className={`${styles.imageService} ${styles.imageService3}`}>
                          <img src="/images/handshake.png" alt="" title="" />
                        </div>
                        <span>تضمین کمترین قیمت</span>
                      </div>
                    </Col>
                  </Row>
                </div>
                <p>یکی از چالش‌های پیش روی شرکت‌ها، سازماندهی سفرهای کاری، تفریحی، و سفر-همایش برای پرسنل است. انتخاب مناسب‌ترین هتل، بررسی ظرفیت، کیفیت و دریافت بیشترین تخفیف از جمله مواردی هستند که شرکت‌ها در این چالش پیش رو دارند. سفرانه با تجربه تخصصی برگزاری سفرهای گروهی یا فردی پرسنلی در این زمینه بهترین ارائه‌کننده خدمات گردشگری است.</p>
                <p>پنل رزرو شرکتی سفرانه با دریافت اطلاعات شرکت‌ها در کاهش دغدغه برنامه‌ریزی سفرهای کاری گام بزرگی را برمی‌دارد.</p>
              </div>
            </Col>
          </Row>
        </div>
        <div className={`${styles.organizationalTheory}`}>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <div className={styles.theoryText}>
                <h2>شرکت‌ها و سازمان‌ها برای چه مواردی نیاز به سفرهای سازمانی دارند؟</h2>
                <p>بسیاری از شرکت‌ها و سازمان‌های بزرگ با اهداف مختلف به یک شریک تجاری معتمد برای انجام امور مربوط به خدمات گردشگری نیاز دارند. این سفرها ممکن است به صورت مأموریت‌های کاری، هدایای مناسبتی و یا بن تخفیف مناسبتی برای کارکنان، برگزاری سفرهای گروهی با اهداف کاری و تفریحی و... باشد. </p>
                <p>شرکت خدمات هوایی و گردشگری سفرانه با سال‌ها تجربه در زمینه ارائه پکیج‌های مختلف سازمانی آماده خدمات‌رسانی به کلیه به بزرگ‌ترین شرکت‌ها و سازمان‌ها است.</p>
                <div className={styles.theorySign}>
                  <img alt="سفرانه" title="سفرانه" src="https://cdn2.safaraneh.com/images/logo/fa/safaraneh-150x60.png"></img>
                  <b>سفرانه مشرق زمین</b>
                </div>
              </div>
            </Col>
            {/* <Col xs={24} sm={24} md={10} lg={10} xl={10}>
              <div className={styles.theoryImage}>
                <img src='https://ezlu.hibootstrap.com/assets/img/theory-img.png' alt='' title='' />
              </div>
            </Col> */}
          </Row>
        </div>
      </div>
      <div className={`${styles.organizationalVideo}`}>
        <div className={`${styles.videoContent}`}>
          {/* <div className={`${styles.videoIcon}`}>
              <svg t="1649794539257" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8741" width="200" height="200"><path d="M900.571429 529.700571L141.714286 951.405714c-17.700571 9.728-32 1.133714-32-18.870857v-841.142857c0-20.004571 14.299429-28.562286 32-18.870857l758.857143 421.705143c17.700571 9.728 17.700571 25.709714 0 35.437714z" fill="" p-id="8742"></path></svg>
          </div> */}
          {/* <span>مشاهده ویدیو</span> */}
        </div>
      </div>
      <div className={styles.container}>
        <div className={`${styles.organizationalTeam}`}>
          <div className={`${styles.teamTitle}`}>
            {/* <span>اعضای تیم</span> */}
            <h2>رزرو شرکتی هتل در سفرانه به چه صورت است؟</h2>
          </div>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <ul>
                <li>1. به قسمت ثبت نام در سفرانه مراجعه فرمایید.</li>
                <li>2. مشخصات و اطلاعات تماس شرکتتان را ثبت کنید.</li>
                <li>3. با بخش فروش سازمانی سفرانه تماس بگیرید.</li>
                <li>راه دیگر نیز تماس مستقیم با بخش فروش سازمانی سفرانه است که در اینصورت همکاران فروش سازمانی اطلاعات شرکت شما را ثبت خواهند کرد.</li>
                <li>تلفن تماس 02179515000 داخلی 4</li>
              </ul>
            </Col>
            {/* <Col xs={12} sm={12} md={6} lg={6} xl={6}>
              <div className={`${styles.teamCard}`}>
                <div className={`${styles.teamImage}`}>
                  <img src='https://ezlu.hibootstrap.com/assets/img/team/1.jpg' />
                  <div className={`${styles.teamText}`}>
                    <div className={`${styles.teamSocial}`}>
                      <ul>
                        <li>
                          <a href='#'>
                            <TwitterOutlined />
                          </a>
                        </li>
                        <li>
                          <a href='#'>
                            <FacebookOutlined />
                          </a>
                        </li>
                        <li>
                          <a href='#'>
                            <InstagramOutlined />
                          </a>
                        </li>
                        <li>
                          <a href='#'>
                            <LinkedinOutlined />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <h3>صفحه‌آرایی و طراحی</h3>
                    <span>مدیر بیزینس</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
              <div className={`${styles.teamCard}`}>
                <div className={`${styles.teamImage}`}>
                  <img src='https://ezlu.hibootstrap.com/assets/img/team/2.jpg' />
                  <div className={`${styles.teamText}`}>
                    <div className={`${styles.teamSocial}`}>
                      <ul>
                        <li>
                          <a href='#'>
                            <TwitterOutlined />
                          </a>
                        </li>
                        <li>
                          <a href='#'>
                            <FacebookOutlined />
                          </a>
                        </li>
                        <li>
                          <a href='#'>
                            <InstagramOutlined />
                          </a>
                        </li>
                        <li>
                          <a href='#'>
                            <LinkedinOutlined />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <h3>صفحه‌آرایی و طراحی</h3>
                    <span>مدیر بیزینس</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
              <div className={`${styles.teamCard}`}>
                <div className={`${styles.teamImage}`}>
                  <img src='https://ezlu.hibootstrap.com/assets/img/team/3.jpg' />
                  <div className={`${styles.teamText}`}>
                    <div className={`${styles.teamSocial}`}>
                      <ul>
                        <li>
                          <a href='#'>
                            <TwitterOutlined />
                          </a>
                        </li>
                        <li>
                          <a href='#'>
                            <FacebookOutlined />
                          </a>
                        </li>
                        <li>
                          <a href='#'>
                            <InstagramOutlined />
                          </a>
                        </li>
                        <li>
                          <a href='#'>
                            <LinkedinOutlined />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <h3>صفحه‌آرایی و طراحی</h3>
                    <span>مدیر بیزینس</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
              <div className={`${styles.teamCard}`}>
                <div className={`${styles.teamImage}`}>
                  <img src='https://ezlu.hibootstrap.com/assets/img/team/4.jpg' />
                  <div className={`${styles.teamText}`}>
                    <div className={`${styles.teamSocial}`}>
                      <ul>
                        <li>
                          <a href='#'>
                            <TwitterOutlined />
                          </a>
                        </li>
                        <li>
                          <a href='#'>
                            <FacebookOutlined />
                          </a>
                        </li>
                        <li>
                          <a href='#'>
                            <InstagramOutlined />
                          </a>
                        </li>
                        <li>
                          <a href='#'>
                            <LinkedinOutlined />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <h3>صفحه‌آرایی و طراحی</h3>
                    <span>مدیر بیزینس</span>
                  </div>
                </div>
              </div>
            </Col> */}
          </Row>
        </div>
      </div>
      <div className={`${styles.organizationalServiceOne}`}>
        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <div className={`${styles.serviceTwoImage}`}></div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <div className={`${styles.serviceText}`}>
              <h2>خدمات ویژه سفرانه</h2>
              <ul>
                <li>
                  <CheckCircleOutlined />
                  ارائه تخفیف مازاد به شرکت ها و آژانس‌ها
                </li>
                <li>
                  <CheckCircleOutlined />
                  تضمین کمترین قیمت
                </li>
                <li>
                  <CheckCircleOutlined />
                  تنوع در راه‌های پرداخت
                </li>
                <li>
                  <CheckCircleOutlined />
                  امکان رزرو به صورت تقبل کلیه هزینه‌ها
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
      <div className={`${styles.organizationalServiceTwo}`}>
        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <div className={`${styles.serviceText}`}>
              <h2>مزایای رزرو شرکتی در سفرانه</h2>
              {/* <p>در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.</p> */}
              <ul>
                <li>
                  <CheckCircleOutlined />
                  ارائه فاکتور رسمی
                </li>
                <li>
                  <CheckCircleOutlined />
                  پشتیبانی اختصاصی برای شرکت‌ها در تمامی روزهای هفته
                </li>
                <li>
                  <CheckCircleOutlined />
                  برگزاری همایش و رزرو سالن با حداقل قیمت
                </li>
                <li>
                  <CheckCircleOutlined />
                  طراحی و اجرای تورهای اختصاصی پرسنلی و مأموریتی
                </li>
              </ul>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <div className={`${styles.serviceTwoImage}`}></div>
          </Col>
        </Row>
      </div>
      <div className={styles.container}>
        <div className={`${styles.organizationalContact}`}>
          <Row>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <div className={`${styles.contactImage}`}></div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <div className={`${styles.contactForm}`}>
                <div className={`${styles.contactText}`}>
                  <h3>ارسال درخواست</h3>
                  <p>در صورتی که تمایل دارید تیم فروش سازمانی سفرانه با شما تماس بگیرد، لطفاً از طریق پر کردن فرم ذیل اطلاعات خود را برای ما ارسال نمایید.</p>
                </div>
                <SendEmail/>
                <img src='/images/send-symbol-or.png' alt='' title='' className={styles.contactSymbol} />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  </Layout>
)

MobileAppPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

MobileAppPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(MobileAppPage)
