import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation, Link, i18n } from '../../../../../i18n'
import Slider from "react-slick";

const HotelListImageGallary = props => {
    const settings = {
        dots: false,
        lazyLoad: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
    };
    return (
        <div className="hotel-list-slide-gallery">
            {props.hotelDetailGallery &&
                <Slider {...settings}>
                    {props.hotelDetailGallery.map((image, index) =><div key={index} className="image-slide-gallety">
                        <img src={image.Image} alt={image.Alt} title={image.Alt} onContextMenu={(e)=> e.preventDefault()}/>
                    </div>)}
                </Slider>}
        </div>
    );
}

HotelListImageGallary.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
HotelListImageGallary.propTypes = {
t: PropTypes.func.isRequired,
}
    
export default (withTranslation('common'))(HotelListImageGallary);