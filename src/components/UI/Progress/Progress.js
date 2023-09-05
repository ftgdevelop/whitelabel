import { withTranslation,i18n } from 'next-i18next';
import React from 'react';


const Progress = (props) =>{
    const {t} = props;
    return<div className={`ui-progress-holder ${(props.percent===100)?"display-none":(props.percent===99)?"completing":""}`}>
        <div className="ui-progress-bar" style={{"width":props.percent+'%'}} />

        {(props.percent===100)?
            (props.total > 0) && <div className="ui-progress-text">
            <strong className="margin-right-small margin-left-small"> {props.total} </strong> {t('hotel-in')}<strong className="margin-right-small margin-left-small"> 
            {props.searchedLocation?props.searchedLocation:<span className="small-loading" />}
             </strong> {t('found')} </div>:
            <div className="ui-progress-text">{props.description}</div>
        }
    </div>
}

Progress.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})

export default withTranslation('common')(Progress);