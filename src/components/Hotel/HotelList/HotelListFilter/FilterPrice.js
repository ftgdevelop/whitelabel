import React,{useEffect,useState} from 'react'
import PropTypes from 'prop-types'
import { withRouter } from "next/router"
import { withTranslation, Link, i18n } from '../../../../../i18n'
import { Slider, Skeleton, Row, Col } from 'antd'

import styles from '../../../../styles/Hotel.module.css'

const FilterPrice =  props => {

    const [sliderValue,setSliderValue]=useState();
    const [showClearFilterBtn,setShowClearFilterBtn]=useState(false);

    useEffect(()=>{
        const path = props.router.asPath;
        if (path.includes('price-')){
            const val = path.split('price-')[1].split('/')[0].split(",").map(item=>Number(item));
            setSliderValue(val);
            setShowClearFilterBtn(true);
        } 
    },[]);

    const onAfterChange =value =>{
        if (value){
            props.handleFilter(value);
        }
    }
    const onChange = value => {
        setSliderValue(value);
        
        if (value[0]> props.filterPriceRange[0] || value[1] < props.filterPriceRange[1]){
            setShowClearFilterBtn(true);
        } else{
            setShowClearFilterBtn(false);
        }
    };
    const clearFilter = ()=>{
        setSliderValue(props.filterPriceRange);
        setShowClearFilterBtn(false);
    }
    const numberWithCommas = (x)=> {
        if (x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }else{
            return "0";
        }
    }
    const { t } = props;

    return (
        <>
            {
                props.loading || !props.filterPriceRange ?
                <div className="filter-item">
                    <div className="filter-lable clearfix">
                        <Skeleton.Button style={{ width: 100, height: 15 }} active size="small" />
                    </div>
                    <div style={{ position: "relative", marginTop: 30 }}>
                        <Skeleton.Avatar style={{ width: 24, height: 24, position: "absolute", top: -9, right: 0 }} />
                        <Skeleton.Button style={{ height: 6 }} active size="small" className={styles.skeletonPriceLineHotelFilter} />
                        <Skeleton.Avatar style={{ width: 24, height: 24, position: "absolute", top: -9, left: 0 }} />
                    </div>
                </div>
                :
                <div className="filter-item">
                    <div className="filter-lable clearfix">
                        <label className="pull-start">{t("total-price-for-stay")} ({t('rial')}) </label>
                        {showClearFilterBtn &&<button type="button" className="pull-end filter-reset-btn" disabled={props.loading} onClick={clearFilter}>{t("reset-filter")}</button>}
                    </div>
                    <Slider
                        disabled={props.loading}
                        className="slider-main-div"
                        reverse={true}
                        min={props.filterPriceRange[0]}
                        max={props.filterPriceRange[1]}
                        step={50000}
                        onChange={onChange}
                        onAfterChange={onAfterChange}
                        range={true}
                        value={sliderValue}
                        defaultValue={props.filterPriceRange}
                    />
                    <Row gutter={[10,10]} className="mb-0">
                        <Col span={12} className="text-right count-filter-price">{numberWithCommas(sliderValue?sliderValue[0]:props.filterPriceRange[0])} {t('rial')}</Col>
                        <Col span={12} className="text-left count-filter-price">{numberWithCommas(sliderValue?sliderValue[1]:props.filterPriceRange[1])} {t('rial')}</Col>
                    </Row>
                </div>
            }
        </>
    )

}

FilterPrice.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
FilterPrice.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withRouter(withTranslation('common')(FilterPrice))
