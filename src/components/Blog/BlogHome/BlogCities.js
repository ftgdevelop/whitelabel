import React from 'react'
import PropTypes from 'prop-types'
import { Link, i18n, withTranslation } from '../../../../i18n'
import Slider from "react-slick"
import { Row, Col, Skeleton } from 'antd'
import styles from '../../../styles/Blog.module.css'

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        style={{ ...style, display: "none"}}
        onClick={onClick}
      />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            style={{ ...style, display: "none" }}
            onClick={onClick}
        />
    );
}

const BlogCities = (props) => {
    // const { t } = props;
    const { Cities } = props;

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

    let cityList = (
        Cities ?
        Cities.map((city, index) =>
            <div key={index}>
                <div className={styles.itemBlogCities} >
                    <a href={`/${city.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, "")}`} target="_blank">
                        <img src={city.images.large} alt={city.title.rendered} />
                        <div className={styles.subject}>
                            <h3>{city.title.rendered}</h3>
                        </div>
                    </a>
                </div>
            </div>
        )
        :
        null
    )
    
    let loadingSkeleton = (
        <div>
            <div className={styles.itemBlogCities}>
                <a>
                    <Skeleton.Image className={styles.itemBlogCitiesImageSkeleton} />
                    <div className={styles.subject}>
                        <Skeleton.Button active size="small" className={styles.itemBlogCitiesSubjectSkeleton} />
                    </div>
                </a>
            </div>
        </div>
    )

    return (
        <>
            <div className={styles.container}>
                <div className={styles.BlogCities}>
                    {
                        Cities ?
                        <Slider {...settings}>
                            {cityList}
                        </Slider>
                        :
                        <Row gutter={[20,0]}>
                            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                                {loadingSkeleton}
                            </Col>
                            <Col xs={0} sm={12} md={8} lg={8} xl={8}>
                                {loadingSkeleton}
                            </Col>
                            <Col xs={0} sm={0} md={8} lg={8} xl={8}>
                                {loadingSkeleton}
                            </Col>
                        </Row>
                    }
                </div>
            </div>
        </>
    )
}

BlogCities.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
BlogCities.propTypes = {
    t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(BlogCities)
