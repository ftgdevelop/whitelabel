import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import { withTranslation } from '../../../../i18n'
import Slider from "react-slick"
import dynamic from 'next/dynamic'

import styles from '../../../styles/Home.module.css'

const Rating = dynamic(() => import('../../UI/Rating/Rating'))

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
    const { className, style, onClick } = props;
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


const BeachHotels = (props) => {

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
        <div className={`${styles.beachHotels} ${process.env.THEME_NAME === "TRAVELO" && styles.beachHotelsTravelo}`}>
            <div className={styles.container}>
                <Row>
                    <Col span={16}>
                        <div className={styles.subjectOffer}>
                            <h2>هتل‌‌های ساحلی</h2>
                        </div>
                    </Col>
                </Row>
                <div className={styles.beachHotelsContent}>
                    <Slider ref={slider} {...settings}>
                        <div>
                            <div className={styles.item}>
                                <a
                                // TODO DELETE process.env.NEW_SITE_URL
                                    href={process.env.NEW_SITE_URL+"/"+t("noor-hotel-beach-link")}
                                    target="_blank"
                                    title={t("noor-hotel-beach-name")}
                                >
                                    <div className={styles.itemImage} onContextMenu={(e)=> e.preventDefault()}>
                                        <div className={styles.image}>
                                            {/* <img src="https://cdn2.safaraneh.com/images/home/hotel-beach-noor-thumb.jpg" alt="هتل آپارتمان ساحلی شهر نور" title="هتل آپارتمان ساحلی شهر نور" /> */}
                                            <i className={`${styles.generalImage} ${styles.hotelBeachNoorThumb}`} />
                                        </div>
                                    </div>
                                    <div className={styles.itemContent}>
                                        <span>{t("noor-hotel-beach-name")}</span>
                                        <Rating rate="4"/>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div>
                            <div className={styles.item}>
                                <a
                                // TODO DELETE process.env.NEW_SITE_URL
                                    href={process.env.NEW_SITE_URL+"/"+t("toranj-hotel-beach-link")}
                                    target="_blank"
                                    title={t("toranj-hotel-beach-name")}
                                >
                                    <div className={styles.itemImage} onContextMenu={(e)=> e.preventDefault()}>
                                        <div className={styles.image}>
                                            {/* <img src="https://cdn2.safaraneh.com/images/home/hotel-beach-toranj-thumb.jpg" alt="هتل دریایی ترنج کیش" title="هتل دریایی ترنج کیش" /> */}
                                            <i className={`${styles.generalImage} ${styles.hotelBeachToranjThumb}`} />
                                        </div>
                                    </div>
                                    <div className={styles.itemContent}>
                                        <span>{t("toranj-hotel-beach-name")}</span>
                                        <Rating rate="5"/>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div>
                            <div className={styles.item}>
                                <a
                                // TODO DELETE process.env.NEW_SITE_URL
                                    href={process.env.NEW_SITE_URL+"/"+t("parsian-chalos-hotel-beach-link")}
                                    target="_blank"
                                    title={t("parsian-chalos-hotel-beach-name")}
                                >
                                    <div className={styles.itemImage} onContextMenu={(e)=> e.preventDefault()}>
                                        <div className={styles.image}>
                                            {/* <img src="https://cdn2.safaraneh.com/images/home/hotel-beach-azadi-khazar-thumb.jpg" alt="هتل پارسیان آزادی خزر چالوس" title="هتل پارسیان آزادی خزر چالوس" /> */}
                                            <i className={`${styles.generalImage} ${styles.hotelBeachAzaiThumb}`} />
                                        </div>
                                    </div>
                                    <div className={styles.itemContent}>
                                        <span>{t("parsian-chalos-hotel-beach-name")}</span>
                                        <Rating rate="5"/>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div>
                            <div className={styles.item}>
                                <a
                                // TODO DELETE process.env.NEW_SITE_URL
                                    href={process.env.NEW_SITE_URL+"/"+t("homa-hotel-beach-link")}
                                    target="_blank"
                                    title={t("homa-hotel-beach-name")}
                                >
                                    <div className={styles.itemImage} onContextMenu={(e)=> e.preventDefault()}>
                                        <div className={styles.image}>
                                            {/* <img src="https://cdn2.safaraneh.com/images/home/hotel-beach-homa-bandarabbas-thumb.jpg" alt="هتل هما بندرعباس" title="هتل هما بندرعباس" /> */}
                                            <i className={`${styles.generalImage} ${styles.hotelBeachHomaThumb}`} />
                                        </div>
                                    </div>
                                    <div className={styles.itemContent}>
                                        <span>{t("homa-hotel-beach-name")}</span>
                                        <Rating rate="5"/>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div>
                            <div className={styles.item}>
                                <a
                                // TODO DELETE process.env.NEW_SITE_URL
                                    href={process.env.NEW_SITE_URL+"/"+t("lipar-hotel-beach-link")}
                                    target="_blank"
                                    title={t("lipar-hotel-beach-name")}
                                >
                                    <div className={styles.itemImage} onContextMenu={(e)=> e.preventDefault()}>
                                        <div className={styles.image}>
                                            {/* <img src="https://cdn2.safaraneh.com/images/home/hotel-beach-lipar-thumb.jpg" alt="هتل لیپار چابهار" title="هتل لیپار چابهار" /> */}
                                            <i className={`${styles.generalImage} ${styles.hotelBeachLiparThumb}`} />
                                        </div>
                                    </div>
                                    <div className={styles.itemContent}>
                                        <span>{t("lipar-hotel-beach-name")}</span>
                                        <Rating rate="5"/>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div>
                            <div className={styles.item}>
                                <a
                                    // TODO DELETE process.env.NEW_SITE_URL
                                    href={process.env.NEW_SITE_URL+"/"+t("marina-hotel-beach-link")}
                                    target="_blank"
                                    title={t("marina-hotel-beach-name")}
                                >
                                    <div className={styles.itemImage} onContextMenu={(e)=> e.preventDefault()}>
                                        <div className={styles.image}>
                                            {/* <img src="https://cdn2.safaraneh.com/images/home/hotel-beach-marina-thumb.jpg" alt="هتل مارینا پارک کیش" title="هتل مارینا پارک کیش" /> */}
                                            <i className={`${styles.generalImage} ${styles.hotelBeachMarinaThumb}`} />
                                        </div>
                                    </div>
                                    <div className={styles.itemContent}>
                                        <span>{t("marina-hotel-beach-name")}</span>
                                        <Rating rate="5"/>
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

BeachHotels.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
BeachHotels.propTypes = {
    t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(BeachHotels)
