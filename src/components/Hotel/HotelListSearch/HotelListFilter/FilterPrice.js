import React,{useEffect,useState} from 'react'
import PropTypes from 'prop-types'
import { withTranslation, Link, i18n } from '../../../../../i18n'
import { Slider, Skeleton, Row, Col } from 'antd'

import styles from '../../../../styles/Hotel.module.css'

const FilterPrice =  props => {

    const [minValue,setMinValue]=useState(props.minPrice);
    const [maxValue,setMaxValue]=useState(props.maxPrice);
    const [showClearFilterBtn,setShowClearFilterBtn]=useState(false);

    useEffect(()=>{
        props.handleFilter([minValue,maxValue]);
    },[minValue,maxValue]);

    const onChange = value => {
        setMinValue(value[0]);
        setMaxValue(value[1]);
        
        if (value[0]> props.minPrice || value[1] < props.maxPrice){
            setShowClearFilterBtn(true);
        } else{
            setShowClearFilterBtn(false);
        }
    };
    const clearFilter = ()=>{
        setMinValue(props.minPrice);
        setMaxValue(props.maxPrice);
        setShowClearFilterBtn(false);
    }
    const numberWithCommas = (x)=> {
        if (x){
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }else{
            return "0";
        }
    }


    const { t } = props;

    return (
        <>
            {
                props.loading?
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
                        <label className="pull-start"> {t("total-price-for-stay")} ({t('rial')})</label>
                        {showClearFilterBtn &&<button type="button" className="pull-end filter-reset-btn" disabled={props.loading} onClick={clearFilter}>{t("reset-filter")}</button>}
                    </div>
                    <Slider
                        disabled={props.loading}
                        className="slider-main-div"
                        reverse={true}
                        min={props.minPrice}
                        max={props.maxPrice}
                        step={10}
                        onChange={onChange}
                        range={true}
                        value={[minValue, maxValue]}
                        tipFormatter={null}
                    />
                    <Row gutter={[10,10]} className="mb-0">
                        <Col span={12} className="text-right count-filter-price">{numberWithCommas(minValue)} {t('rial')}</Col>
                        <Col span={12} className="text-left count-filter-price">{numberWithCommas(maxValue)} {t('rial')}</Col>
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
  
export default withTranslation('common')(FilterPrice)
