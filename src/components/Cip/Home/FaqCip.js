import React from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation } from '../../../../i18n'
import { Collapse } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import styles from '../../../styles/Cip.module.css'


const { Panel } = Collapse;
class FaqCip extends React.Component {
    render() {
        const { t } = this.props;
        return (
            <div
                className={`${styles.faqCip} ${process.env.THEME_NAME === "TRAVELO" && styles.faqCipTravelo}`}
                >
                <h2>سوالات متداول</h2>
                <div className={styles.contentFaqCip}>
                    <Collapse
                        bordered={false}
                        // defaultActiveKey={['1']}
                        expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />}
                        // className="site-collapse-custom-collapse"
                        className={`${process.env.THEME_NAME === "TRAVELO" && "ant-collapse-borderless-travelo"}`}
                    >
                        <Panel header={<h2 className="cip-faq-header">رزرو خدمات CIP سفرانه چگونه است؟</h2>} key="1" className={styles.collape}>
                            <div className={styles.paraghraphFaqCip}>
                                <p>رزرو خدمات CIP سفرانه به دو روش قابل انجام است.</p>
                                <p>
                                    <b>روش اول: </b>
                                    با پرکردن فیلد جزئیات پرواز، فیلد مشخصات رزروکننده و مشخصات مسافران وارد صفحه پرداخت می‌شوید و بعد از پرداخت، واچر مخصوص را دریافت می‌کنید. با ارائه این واچر در فرودگاه از خدمات CIP بهره‌مند خواهید بود.
                                </p>
                                <p>
                                    <b>روش دوم: </b>
                                    در روش دوم مسافران خواهان دریافت خدمات CIP می‌توانند از طریق ارسال بلیط به شماره واتسپ سفرانه (09129590542)، برای دریافت خدمات CIP اقدام کنند. 
                                </p>
                            </div>
                        </Panel>
                        <Panel header={<h2 className="cip-faq-header">خدمات CIP شامل ترنسفر فرودگاهی می‌شود؟</h2>} key="2" className={styles.collape}>
                            <div className={styles.paraghraphFaqCip}>
                                <p>خیر! CIP سفرانه شامل ترنسفر فرودگاهی از مبدا فردوگاه نمی‌شود و در صورت درخواست این خدمات باید هزینۀ ترانسفر به صورت جداگانه پرداخت شود.</p>
                            </div>
                        </Panel>
                        <Panel header={<h2 className="cip-faq-header">خدمات CIP به چه ایرلاین‌هایی تعلق می‌گیرد؟</h2>} key="3" className={styles.collape}>
                            <div className={styles.paraghraphFaqCip}>
                                <p>به طور کلی خدمات CIP برای پروازهای ورودی کلیه ایرلاین‌ها ارائه می‌شود. اما برای پروازهای خروجی امکان ارائه خدمات به ایرلاین‌های لوفت‌هانزا، زاگرس، کویت و آسترین و وارش وجود ندارد.</p>
                            </div>
                        </Panel>
                        <Panel header={<h2 className="cip-faq-header">آیا امکان رزرو خدمات CIP به تاریخ امروز وجود دارد؟</h2>} key="4" className={styles.collape}>
                            <div className={styles.paraghraphFaqCip}>
                                <p>به طور کلی برای رزرو آنلاین خدمات CIP حداقل از 12 ساعت قبل بایستی اقدام شود؛ اما اگر به هر دلیلی موفق به انجام این امر نشدید و نیاز به رزرو خدمات CIP فوری داشتید با شماره 02179515000 تماس حاصل فرمایید.</p>
                            </div>
                        </Panel>
                        <Panel header={<h2 className="cip-faq-header">مدارک لازم برای رزرو خدمات CIP سفرانه چیست؟</h2>} key="5" className={styles.collape}>
                            <div className={styles.paraghraphFaqCip}>
                                <p>برای رزرو و استفاده از خدمات CIP فرودگاه امام، به مدارک و اطلاعات زیر نیاز دارید.</p>
                                <ul>
                                    <li>نام ایرلاین</li>
                                    <li>شماره پرواز</li>
                                    <li>تاریخ پرواز</li>
                                    <li>ساعت پرواز (پرواز خروجی)</li>
                                    <li>ساعت ورود (پرواز ورودی)</li>
                                    <li>مشخصات رزروگیرنده</li>
                                    <li>مشخصات مسافران</li>
                                </ul>
                            </div>
                        </Panel>
                        <Panel header={<h2 className="cip-faq-header">خدمات CIP برای پروازهای ورودی به چه صورت است؟</h2>} key="6" className={styles.collape}>
                            <div className={styles.paraghraphFaqCip}>
                                <p>بعد از رزرو خدمات CIP سفرانه، پرسنل سی‌آی‌پی براساس نام مسافر، ساعت ورود هواپیما (بر اساس اطلاعات اعلامی) با بورد مخصوص نام مسافر و یا مسافرین حضور دارند. مسافرانی که خدمات CIP سفرانه را خریداری نموده‌اند خود را به خودرویی که کنار هواپیما منتظر است و نام مسافر را در دست دارد معرفی می‌کنند و از طریق خودروی مخصوص CIP از پای پرواز تا سالن تشریفات همراهی می‌شوند. درصورتی که مسافر در قسمت بار، چمدان داشته باشد به پرسنل اعلام کرده تا آنها برای دریافت بار مسافر وارد عمل شوند.</p>
                                <p>در سالن تشریفات مسافر از بخش گذرنامه عبور و در سالن تشریفات تا زمان دریافت پاسپورت و چمدان از رستوران سلف سرویس با غذاهای متنوع و کافی‌شاپ پذیرایی می‌شوند. بعد از دریافت چمدان و پاسپورت پروسه بهره‌مندی مسافر از خدمات CIP نیز به پایان خواهد رسید.</p>
                            </div>
                        </Panel>
                        <Panel header={<h2 className="cip-faq-header">خدمات CIP برای پروازهای خروجی چگونه است؟</h2>} key="7" className={styles.collape}>
                            <div className={styles.paraghraphFaqCip}>
                                <p>خدمات CIP در پروازهای خروجی از درب منزل شروع نمی‌شوند. ترنسفر فرودگاهی بایستی به طور مجزا رزرو بشود. خدمات تشریفات ویژه برای پروازهای خروجی از زمان رسیدن مسافر تا درب اصلی فرودگاه آغاز می‌شود. در این بخش پرسنل سی آی پی سفرانه به استقبال مسافر آمده و خدمات حمل بار و چمدان او را به عهده می‌گیرند. سپس مسافر از گیت‌های مخصوص پلیس گذر می‌کند و مدراک شامل پاسپورت، بلیط و ویزا (یا مدارک اقامتی کشور مقصد) را در اختیار پرسنل CIP قرار می‌دهد و بدون معطلی وارد فضای دلپذیر سالن تشریفات می‌شود. </p>
                                <p>زمانی که مسافر در حال استرحت و برخورداری از امکانات بی‌نظیر کافی‌شاپ، رستوران، غرفه خرید صنایع دستی و سوغاتی است، همکاران سی‌آی‌پی ما، کارت پرواز به همراه تگ بار و مدارک اقامتی را دریافت کرده و به مسافر تحویل می‌دهند.</p>
                                <p>در این مرحله  گذرنامۀ مسافرِ دارای خدمات سی‌آی پی برای مهر به پلیس فرودگاه ارسال می‌شود. زمانی که ساعت دقیق پرواز فرامی‌رسد، پرسنل CIP برای عبور از بخش گذرنامه به مسفر اطلاع می‌دهند. مسافر از گیت پرواز عبور می‌کند و بعد از بازرسی پلیس، پرسنل CIP با خودروی مخصوص مسافر را تا پای پلکان هواپیما همراهی خواهند کرد.</p>
                            </div>
                        </Panel>
                        <Panel header={<h2 className="cip-faq-header">آیا همراه مسافر CIP باید هزینه جداگانه بپردازد؟</h2>} key="8" className={styles.collape}>
                            <div className={styles.paraghraphFaqCip}>
                                <p>مشایعت کنندۀ مسافران CIP چه در پروازهای خروجی و چه ورودی برای ورود به سالن تشریفات ویژه بایستی هزینه جداگانه بپردازند.</p>
                            </div>
                        </Panel>
                        <Panel header={<h2 className="cip-faq-header">خدمات CIP فرودگاه امام برای چه افرادی مناسب است؟</h2>} key="9" className={styles.collape}>
                            <div className={styles.paraghraphFaqCip}>
                                <p>همانطور که در موارد بالا نیز گفته شد تمامی مسافران به شرط پرداخت هزینۀ خدمات قادر به استفاده از خدمات CIP خواهند بود. اما استفاده از این خدمات برای یکسری از افراد مناسب‌تر است.</p>
                                <ul>
                                    <li>تاجران، رؤسا و مدیران رده بالای شرکت‌های مهم خصوصی و دولتی</li>
                                    <li>افراد مشهور جامعه مانند ورزشکاران و هنرمندان</li>
                                    <li>سالمندان و افراد دارای معلولیت</li>
                                    <li>افرادی که به واسطۀ شغلشان ناگریز به سفرهای زیاد هستند</li>
                                    <li>افراد غیر ایرانی به خصوص هنگام ورود و دریافت ویزا</li>
                                </ul>
                            </div>
                        </Panel>
                    </Collapse>
                </div>
            </div>
        )
    }
}

FaqCip.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
FaqCip.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(FaqCip)
