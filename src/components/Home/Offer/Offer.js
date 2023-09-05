import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import { withTranslation } from '../../../../i18n'
import Slider from "react-slick"
import { LeftOutlined } from '@ant-design/icons'

import styles from '../../../styles/Home.module.css'

function SampleNextArrow(props) {
    useEffect(() => {
        document.querySelectorAll('.slick-slide').forEach(item => {
            item.setAttribute('aria-hidden', false);
        })
        return () => {
        document.querySelectorAll('.slick-slide').forEach(item => {
            item.setAttribute('aria-hidden', false);
        })
        }
    });
    const { style, onClick } = props;
    return (
      <div
        style={{ ...style, display: "none"}}
        onClick={onClick}
      />
    );
}

function SamplePrevArrow(props) {
    useEffect(() => {
        document.querySelectorAll('.slick-slide').forEach(item => {
            item.setAttribute('aria-hidden', false);
        })
        return () => {
        document.querySelectorAll('.slick-slide').forEach(item => {
            item.setAttribute('aria-hidden', false);
        })
        }
    });
    const { style, onClick } = props;
    return (
        <div
        style={{ ...style, display: "none" }}
        onClick={onClick}
        />
    );
}

const Offer = (props) => {
    
    const slider = useRef()
    useEffect(() => {
        document.querySelectorAll('.slick-slide').forEach(item => {
            item.setAttribute('aria-hidden', false);
        })
        return () => {
        document.querySelectorAll('.slick-slide').forEach(item => {
            item.setAttribute('aria-hidden', false);
        })
        }
    });

  
    const { t } = props;
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        rtl: true,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true,
                nextArrow: <SampleNextArrow />,
                prevArrow: <SamplePrevArrow />,
                }
            },
            {
                breakpoint: 576,
                settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                nextArrow: <SampleNextArrow />,
                prevArrow: <SamplePrevArrow />,
                }
            }
            ]
    };
    return (
        <div className={`${styles.offer} ${process.env.THEME_NAME === "TRAVELO" && styles.offerTravelo}`}>
            <div className={styles.container}>
                <Row>
                    <Col span={16}>
                        <div className={styles.subjectOffer}>
                            <h2>ناشناخته‌ها</h2>
                            {/* <span>{t('our-offer-desc')}</span> */}
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className={styles.moreOffer}>
                            <a href="https://www.instagram.com/safaraneh.travel/" target="_blank" title="بیشتر">
                                بیشتر
                                <LeftOutlined />
                            </a>
                        </div>
                    </Col>
                </Row>
                <div className={styles.offerContent}>
                    <Slider ref={slider} {...settings}>
                        <div>
                            <div className={styles.offreItem}>
                                <a href="https://www.instagram.com/p/CHVMUhqAFbV/" target="_blank" title={t('offer3')}>
                                    <div className={styles.offreItemImage} onContextMenu={(e)=> e.preventDefault()}>
                                        <strong className={styles.offerCardTag}>
                                            {t('offer3')}
                                        </strong>
                                        <div className={styles.image}>
                                            {/* <img src="https://cdn2.safaraneh.com/images/home/unknown-busher-thumb.jpg" alt={t('offer3-desc')} title={t('offer3-desc')} /> */}
                                            <i className={`${styles.generalImage} ${styles.unknownBusherThumb}`} />
                                        </div>
                                    </div>
                                    <div className={styles.offreItemContent}>
                                        <span>{t('offer3-desc')}</span>
                                        <div className={styles.offerCardFooter}>
                                            {/* <div className={styles.offerValidIcon}>{t('offer3-date')}</div> */}
                                            <span className={styles.offerCardLink}>{t('more-details')}</span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div>
                            <div className={styles.offreItem}>
                                <a href="https://www.instagram.com/p/CJdreyCASlk/" target="_blank" title="جزیره هرمز">
                                    <div className={styles.offreItemImage} onContextMenu={(e)=> e.preventDefault()}>
                                        <strong className={styles.offerCardTag}>
                                            جزیره هرمز
                                        </strong>
                                        <div className={styles.image}>
                                            {/* <img src="https://cdn2.safaraneh.com/images/home/unknown-hormoz-thumb.jpg" alt="اقامتگاه لب ساحل هرمز" title="اقامتگاه لب ساحل هرمز" /> */}
                                            <i className={`${styles.generalImage} ${styles.unknownHormozThumb}`} />
                                        </div>
                                    </div>
                                    <div className={styles.offreItemContent}>
                                        <span>اقامتگاه لب ساحل هرمز</span>
                                        <div className={styles.offerCardFooter}>
                                            {/* <div className={styles.offerValidIcon}>{t('offer4-date')}</div> */}
                                            <span className={styles.offerCardLink}>{t('more-details')}</span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div>
                            <div className={styles.offreItem}>
                                <a href="https://www.instagram.com/p/CH2sdAqgK8i/" target="_blank" title="لاهیجان">
                                    <div className={styles.offreItemImage} onContextMenu={(e)=> e.preventDefault()}>
                                        <strong className={styles.offerCardTag}>
                                            {/* <span className={styles.labelNew}>{t('new')}</span> */}
                                            لاهیجان
                                        </strong>
                                        <div className={styles.image}>
                                            {/* <img src="https://cdn2.safaraneh.com/images/home/unknown-lahijan-thumb.jpg" alt={t('offer1-desc')} title={t('offer1-desc')} /> */}
                                            <i className={`${styles.generalImage} ${styles.unknownLahijanThumb}`} />
                                        </div>
                                    </div>
                                    <div className={styles.offreItemContent}>
                                        <span>{t('offer1-desc')}</span>
                                        <div className={styles.offerCardFooter}>
                                            {/* <div className={styles.offerValidIcon}> {t('offer1-date')}</div> */}
                                            <span className={styles.offerCardLink}>{t('more-details')}</span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div>
                            <div className={styles.offreItem}>
                                <a href="https://www.instagram.com/p/CHksBtmgZbl/" target="_blank" title="متین‌آباد">
                                    <div className={styles.offreItemImage} onContextMenu={(e)=> e.preventDefault()}>
                                        <strong className={styles.offerCardTag}>
                                            متین‌آباد
                                        </strong>
                                        <div className={styles.image}>
                                            {/* <img src="https://cdn2.safaraneh.com/images/home/unknown-matinabad-thumb.jpg" alt={t('offer2-desc')} title={t('offer2-desc')} /> */}
                                            <i className={`${styles.generalImage} ${styles.unknownMatinabadThumb}`} />
                                        </div>
                                    </div>
                                    <div className={styles.offreItemContent}>
                                        <span>{t('offer2-desc')}</span>
                                        <div className={styles.offerCardFooter}>
                                            {/* <div className={styles.offerValidIcon}>{t('offer2-date')}</div> */}
                                            <span className={styles.offerCardLink}>{t('more-details')}</span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div>
                            <div className={styles.offreItem}>
                                <a href="https://www.instagram.com/p/CHK5VE2gatE/" target="_blank" title={t('offer4')}>
                                    <div className={styles.offreItemImage} onContextMenu={(e)=> e.preventDefault()}>
                                        <strong className={styles.offerCardTag}>
                                            {t('offer4')}
                                        </strong>
                                        <div className={styles.image}>
                                            {/* <img src="https://cdn2.safaraneh.com/images/home/unknown-esfahan-thumb.jpg" alt={t('offer4-desc')} title={t('offer4-desc')} /> */}
                                            <i className={`${styles.generalImage} ${styles.unknownEsfahanThumb}`} />
                                        </div>
                                    </div>
                                    <div className={styles.offreItemContent}>
                                        <span>{t('offer4-desc')}</span>
                                        <div className={styles.offerCardFooter}>
                                            {/* <div className={styles.offerValidIcon}>{t('offer4-date')}</div> */}
                                            <span className={styles.offerCardLink}>{t('more-details')}</span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div>
                            <div className={styles.offreItem}>
                                <a href="https://www.instagram.com/p/CKT3qG_gGTF/" target="_blank" title="یزد">
                                    <div className={styles.offreItemImage} onContextMenu={(e)=> e.preventDefault()}>
                                        <strong className={styles.offerCardTag}>
                                            یزد
                                        </strong>
                                        <div className={styles.image}>
                                            {/* <img src="https://cdn2.safaraneh.com/images/home/unknown-yazd-thumb.jpg" alt={t('offer4-desc')} title={t('offer4-desc')} /> */}
                                            <i className={`${styles.generalImage} ${styles.unknownYazdThumb}`} />
                                        </div>
                                    </div>
                                    <div className={styles.offreItemContent}>
                                        <span>هتل کاروانسرا</span>
                                        <div className={styles.offerCardFooter}>
                                            {/* <div className={styles.offerValidIcon}>{t('offer4-date')}</div> */}
                                            <span className={styles.offerCardLink}>{t('more-details')}</span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    )
}

Offer.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
Offer.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(Offer)
