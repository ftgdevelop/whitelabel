import React,{useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {useRouter} from 'next/router';
import { withTranslation, Link, i18n } from '../../../../../i18n'
import { Checkbox, Skeleton} from 'antd'


const FilterAvailability = props => {  
    const { t } = props;
    const router = useRouter();
    const [checkboxValue,setCheckboxValue] = useState(false);
    const [showClearFilterBtn,setShowClearFilterBtn] = useState(false);

    useEffect(()=>{
        const path = router.asPath;
        if (path.includes('available')){
            setCheckboxValue(true);
            setShowClearFilterBtn(true);
            props.handleFilter(true);
        } 
    },[]);

    const  onChange = (value) => {    
        setCheckboxValue(value);
        props.handleFilter(value);
        setShowClearFilterBtn(value);
    }
    const clearFilter = () => {
        setCheckboxValue(false);
        props.handleFilter(false);
        setShowClearFilterBtn(false);
    }
    return (
      
        props.loading?
        <div className="filter-item">
            <div className="filter-lable clearfix">
                <Skeleton.Button style={{ width: 100, height: 15 }} active size="small" />
            </div>
            <Checkbox disabled>
                <Skeleton.Button style={{ width: 100, height: 15, margin: 5 }} active size="small" />
            </Checkbox>

        </div>
        :
        <div className="filter-item">
            <div className="filter-lable clearfix">
                <label className="pull-start">{t("available-hotel")}</label>
                {showClearFilterBtn && <button disabled={props.loading} type="button" className="pull-end filter-reset-btn" onClick={clearFilter}>{t("reset-filter")}</button>}
            </div>
            <Checkbox
                className={`availabailityFilterCheckbox ${process.env.THEME_NAME === "TRAVELO" && "availabailityFilterCheckbox-travelo"}`}
                checked={checkboxValue}
                onChange={e=>{onChange(e.target.checked)}}>
                    <span>{t("just-available-hotel")}</span>
                    {props.availabilityFilterInfo ? <span className="pull-left">({props.availabilityFilterInfo})</span>:null}
            </Checkbox>
        </div>
    )

}

FilterAvailability.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
FilterAvailability.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(FilterAvailability)
