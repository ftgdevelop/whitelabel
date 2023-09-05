import React from 'react';

const RatingBar = (props) =>{
    const barWidth = props.persentage+"%";
    let color;
    if (props.persentage>=90){
        color = "rgb(20, 148, 15)";
    } else if (props.persentage>=80){
        color = "rgb(108, 191, 74)";
    } else if (props.persentage>=70){
        color = "rgb(163, 205, 77)";
    } else if (props.persentage>=50){
        color = "rgb(243, 163, 36)";
    } else {
        color = "#FF5722";
    }

    return<div className="bar-rating-holder">
        <span className="bar-rating" style={{"width":barWidth,"backgroundColor":color}}></span>
    </div>
}
export default RatingBar;