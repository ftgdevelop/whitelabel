import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import Image from 'next/image'
import { i18n, withTranslation } from '../../../../i18n'
import { LeftOutlined } from '@ant-design/icons'
import dynamic from 'next/dynamic'
import Slider from 'react-slick'

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

const SuggestedHotels = (props) => {
  
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
    slidesToShow: 4,
    slidesToScroll: 1,
    // rtl: true,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          // slidesToScroll: 2,
          infinite: true,
          dots: true,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          // slidesToScroll: 1,
          dots: true,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
        },
      },
    ],
  }
  return (
    <div
      className={`${styles.suggestedHotels} ${
        process.env.THEME_NAME === 'TRAVELO' && styles.suggestedHotelsTravelo
      }`}
    >
      <div className={styles.container}>
        <Row>
          <Col span={16}>
            <div className={styles.subject}>
              <h2>{t('suggested-hotels')}</h2>
            </div>
          </Col>
        </Row>
        <div className={styles.suggestedHotelsContent}>
          <Slider ref={slider} {...settings}>
            <div>
              <div className={styles.item}>
                <a
                  href={t('azadi-hotel-link')}
                  title={t('azadi-hotel-name')}
                  target="_blank"
                >
                  <div className={`unset-img ${styles.image}`}>
                    <Image
                      layout="fill"
                      className="custom-img"
                      src="https://cdn2.safaraneh.com/images/home/hotel-azadi-thumb.jpg"
                      alt={t('azadi-hotel-name')}
                      title={t('azadi-hotel-name')}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                    {/* <i className={`${styles.generalImage} ${styles.hotelAzadiThumb}`} /> */}
                  </div>
                  <div className={styles.text}>
                    <span>{t('azadi-hotel-name')}</span>
                    <Rating rate="5" />
                    {/* <div className={styles.arrowLink}>
                      <LeftOutlined />
                    </div> */}
                  </div>
                </a>
              </div>
            </div>
            <div>
              <div className={styles.item}>
                <a
                  href={t('pars-hotel-link')}
                  target="_blank"
                  title={t('pars-hotel-name')}
                >
                  <div className={`unset-img ${styles.image}`}>
                    <Image
                      layout="fill"
                      className="custom-img"
                      src="https://cdn2.safaraneh.com/images/home/hotel-pars-thumb.jpg"
                      alt={t('pars-hotel-name')}
                      title={t('pars-hotel-name')}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                    {/* <i className={`${styles.generalImage} ${styles.hotelChamranThumb}`} /> */}
                  </div>
                  <div className={styles.text}>
                    <span>{t('pars-hotel-name')}</span>
                    <Rating rate="5" />
                    {/* <div className={styles.arrowLink}>
                      <LeftOutlined />
                    </div> */}
                  </div>
                </a>
              </div>
            </div>
            <div>
              <div className={styles.item}>
                <a
                  href={t('darvishi-hotel-link')}
                  target="_blank"
                  title={t('darvishi-hotel-name')}
                >
                  <div className={`unset-img ${styles.image}`}>
                    <Image
                      layout="fill"
                      className="custom-img"
                      src="https://cdn2.safaraneh.com/images/home/hotel-darvishi-thumb.jpg"
                      alt={t('darvishi-hotel-name')}
                      title={t('darvishi-hotel-name')}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                    {/* <i className={`${styles.generalImage} ${styles.hotelDarvishiThumb}`} /> */}
                  </div>
                  <div className={styles.text}>
                    <span>{t('darvishi-hotel-name')}</span>
                    <Rating rate="5" />
                    {/* <div className={styles.arrowLink}>
                      <LeftOutlined />
                    </div> */}
                  </div>
                </a>
              </div>
            </div>
            <div>
              <div className={styles.item}>
                <a
                  href={t('esteghlal-hotel-link')}
                  target="_blank"
                  title={t('esteghlal-hotel-name')}
                >
                  <div className={`unset-img ${styles.image}`}>
                    <Image
                      layout="fill"
                      className="custom-img"
                      src="https://cdn2.safaraneh.com/images/home/hotel-esteghlal-thumb.jpg"
                      alt={t('esteghlal-hotel-name')}
                      title={t('esteghlal-hotel-name')}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                    {/* <i className={`${styles.generalImage} ${styles.hotelEvenThumb}`} /> */}
                  </div>
                  <div className={styles.text}>
                    <span>{t('esteghlal-hotel-name')}</span>
                    <Rating rate="5" />
                    {/* <div className={styles.arrowLink}>
                      <LeftOutlined />
                    </div> */}
                  </div>
                </a>
              </div>
            </div>
            <div>
              <div className={styles.item}>
                <a
                  href={t('astara-hotel-link')}
                  target="_blank"
                  title={t('astara-hotel-name')}
                >
                  <div className={`unset-img ${styles.image}`}>
                    <Image
                      layout="fill"
                      className="custom-img"
                      src="https://cdn2.safaraneh.com/images/home/hotel-espinas-thumb.jpg"
                      alt={t('astara-hotel-name')}
                      title={t('astara-hotel-name')}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                    {/* <i className={`${styles.generalImage} ${styles.hotelEspinasThumb}`} /> */}
                  </div>
                  <div className={styles.text}>
                    <span>{t('astara-hotel-name')}</span>
                    <Rating rate="4" />
                    {/* <div className={styles.arrowLink}>
                      <LeftOutlined />
                    </div> */}
                  </div>
                </a>
              </div>
            </div>
            <div>
              <div className={styles.item}>
                <a
                  href={t('miraj-hotel-link')}
                  target="_blank"
                  title={t('miraj-hotel-name')}
                >
                  <div className={`unset-img ${styles.image}`}>
                    <Image
                      layout="fill"
                      className="custom-img"
                      src="https://cdn2.safaraneh.com/images/home/hotel-miraj-thumb.jpg"
                      alt={t('miraj-hotel-name')}
                      title={t('miraj-hotel-name')}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                    {/* <i className={`${styles.generalImage} ${styles.hotelVidaThumb}`} /> */}
                  </div>
                  <div className={styles.text}>
                    <span>{t('miraj-hotel-name')}</span>
                    <Rating rate="5" />
                    {/* <div className={styles.arrowLink}>
                      <LeftOutlined />
                    </div> */}
                  </div>
                </a>
              </div>
            </div>
            <div>
              <div className={styles.item}>
                <a
                  href={t('dad-hotel-link')}
                  target="_blank"
                  title={t('dad-hotel-name')}
                >
                  <div className={`unset-img ${styles.image}`}>
                    <Image
                      layout="fill"
                      className="custom-img"
                      src="https://cdn2.safaraneh.com/images/home/hotel-dad-thumb.jpg"
                      alt={t('dad-hotel-name')}
                      title={t('dad-hotel-name')}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                    {/* <i className={`${styles.generalImage} ${styles.hotelDadThumb}`} /> */}
                  </div>
                  <div className={styles.text}>
                    <span>{t('dad-hotel-name')}</span>
                    <Rating rate="4" />
                    {/* <div className={styles.arrowLink}>
                      <LeftOutlined />
                    </div> */}
                  </div>
                </a>
              </div>
            </div>
            <div>
              <div className={styles.item}>
                <a
                  href={t('kosar-hotel-link')}
                  target="_blank"
                  title={t('kosar-hotel-name')}
                >
                  <div className={`unset-img ${styles.image}`}>
                    <Image
                      layout="fill"
                      className="custom-img"
                      src="/images/hotel-kowsar-thumb.jpg"
                      alt={t('kosar-hotel-name')}
                      title={t('kosar-hotel-name')}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                    {/* <i className={`${styles.generalImage} ${styles.hotelKowsarThumb}`} /> */}
                  </div>
                  <div className={styles.text}>
                    <span>{t('kosar-hotel-name')}</span>
                    <Rating rate="5" />
                    {/* <div className={styles.arrowLink}>
                      <LeftOutlined />
                    </div> */}
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

SuggestedHotels.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

SuggestedHotels.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(SuggestedHotels)
