import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import { withTranslation } from '../../../../i18n'
import Slider from 'react-slick'
import Image from 'next/image'
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
  const { className, style, onClick } = props
  return <div style={{ ...style, display: 'none' }} onClick={onClick} />
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
  const { style, onClick } = props
  return <div style={{ ...style, display: 'none' }} onClick={onClick} />
}

const PopularCities = (props) => {

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
  
  const { t } = props
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    rtl: true,
    ariaHidden: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
        },
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
        },
      },
    ],
  }
  return (
    <div className={styles.popularCities}>
      <div className={styles.container}>
        <Row>
          <Col span={16}>
            <div className={styles.subjectPopularCities}>
              <h2>شهرهای محبوب</h2>
            </div>
          </Col>
        </Row>
        <div className={styles.popularCitiesContent}>
          <Slider ref={slider} {...settings}>
            <div className={styles.popularCitItem}>
              <a
              // TODO DELETE process.env.NEW_SITE_URL
                href={process.env.NEW_SITE_URL+"/"+t('esfahan-city-link')}
                title={t('esfahan-city-name')}
                target="_blank"
                className={`unset-img ${styles.item}`}
              >
                <Image
                  layout="fill"
                  className="custom-img"
                  src="https://cdn2.safaraneh.com/images/home/esfahancityhome.jpg"
                  alt={t('esfahan-city-name')}
                  title={t('esfahan-city-name')}
                />
                <div className={styles.text}>
                  <span>
                    رزرو هتل در
                    <b>اصفهان</b>
                  </span>
                  <small>بیش از 115 هتل</small>
                </div>
              </a>
            </div>
            <div className={styles.popularCitItem}>
              <a
              // TODO DELETE process.env.NEW_SITE_URL
                href={process.env.NEW_SITE_URL+"/"+t('kish-city-link')}
                title={t('kish-city-name')}
                target="_blank"
                className={`unset-img ${styles.item}`}
              >
                <Image
                  layout="fill"
                  className="custom-img"
                  src="https://cdn2.safaraneh.com/images/home/kishcityhome.jpg"
                  alt={t('kish-city-name')}
                  title={t('kish-city-name')}
                />
                <div className={styles.text}>
                  <span>
                    رزرو هتل در
                    <b>کیش</b>
                  </span>
                  <small>بیش از 50 هتل</small>
                </div>
              </a>
            </div>
            <div className={styles.popularCitItem}>
              <a
              // TODO DELETE process.env.NEW_SITE_URL
                href={process.env.NEW_SITE_URL+"/"+t('shiraz-city-link')}
                title={t('shiraz-city-name')}
                target="_blank"
                className={`unset-img ${styles.item}`}
              >
                <Image
                  layout="fill"
                  className="custom-img"
                  src="https://cdn2.safaraneh.com/images/home/shirazcityhome.jpg"
                  alt={t('shiraz-city-name')}
                  title={t('shiraz-city-name')}
                />
                <div className={styles.text}>
                  <span>
                    رزرو هتل در
                    <b>شیراز</b>
                  </span>
                  <small>بیش از 50 هتل</small>
                </div>
              </a>
            </div>
            <div className={styles.popularCitItem}>
              <a
              // TODO DELETE process.env.NEW_SITE_URL
                href={process.env.NEW_SITE_URL+"/"+t('mashhad-city-link')}
                title={t('mashhad-city-name')}
                target="_blank"
                className={`unset-img ${styles.item}`}
              >
                <Image
                  layout="fill"
                  className="custom-img"
                  src="https://cdn2.safaraneh.com/images/home/mashhadcityhome.jpg"
                  alt={t('mashhad-city-name')}
                  title={t('mashhad-city-name')}
                />
                <div className={styles.text}>
                  <span>
                    رزرو هتل در
                    <b>مشهد</b>
                  </span>
                  <small>بیش از 75 هتل</small>
                </div>
              </a>
            </div>
            <div className={styles.popularCitItem}>
              <a
              // TODO DELETE process.env.NEW_SITE_URL
                href={process.env.NEW_SITE_URL+"/"+t('tehran-city-link')}
                title={t('tehran-city-name')}
                target="_blank"
                className={`unset-img ${styles.item}`}
              >
                <Image
                  layout="fill"
                  className="custom-img"
                  src="https://cdn2.safaraneh.com/images/home/tehrancityhome.jpg"
                  alt={t('tehran-city-name')}
                  title={t('tehran-city-name')}
                />
                <div className={styles.text}>
                  <span>
                    رزرو هتل در
                    <b>تهران</b>
                  </span>
                  <small>بیش از 90 هتل</small>
                </div>
              </a>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  )
}

PopularCities.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

PopularCities.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(PopularCities)
