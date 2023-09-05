import React from 'react';
import PropTypes from 'prop-types';
import { i18n, withTranslation } from '../../../../i18n';

const HotelPoint = (props) =>{
    const { t } = props;
    let pointTitle,
    pointColor;
    if (props.point>=90){
        pointTitle=t("excellent");
        pointColor = "rgb(20, 148, 15)";
    } else if (props.point>=80){
        pointTitle=t("very-good");
        pointColor = "rgb(108, 191, 74)";
    } else if (props.point>=70){
        pointTitle=t("good");
        pointColor = "rgb(163, 205, 77)";
    } else if (props.point>=50){
        pointTitle=t("fair");
        pointColor = "rgb(243, 163, 36)";
    } else {
        pointTitle=t("bad");
        pointColor = "#FF5722";
    }
    return <>{(props.reviews>0)?<div className="hotel-point-holder">
    <div className="text-left">
        <div className="point-title" style={{'color':pointColor}}>
            {pointTitle}
        </div>
        <span className="point-reviews">{props.reviews} {t("guest-reviews")}</span>
    </div>
    <div className="point-number" style={{'backgroundColor':pointColor}}><span className="point-caret" style={{'backgroundColor':pointColor}} />{props.point}</div>
</div>
    : null}
</>
}
HotelPoint.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
HotelPoint.propTypes = {
    t: PropTypes.func.isRequired,
}

export default withTranslation('common')(HotelPoint);