import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation } from '../../../../../i18n'

import styles from '../../../../styles/Flight.module.css'
import { RemoveIcon } from '../../../UI/Icons'

const SuggestionFilterFlight = props => {

    const { t } = props;
    const [hasChild, setHasChild] = useState(false)

    useEffect(() => {
        const el = document.getElementById('suggestion');
        if(el){
            setHasChild(el.innerHTML ? true : false)
        }
    },[props.filters.filterAirlines, props.filters.filterTime, props.filters.filterFlightType,props.filters.filterPriceValue, props.loadingFlightList])

    const cleanItemFilters = (type, val) => {
        let value = '', index= ''

        switch (type) {
            case "filterAirlines":
                index = props.filters.filterAirlines.indexOf(val);
                value= [...props.filters.filterAirlines];
                value.splice( index, 1);
                
                break;
            case "filterTime":
                index = props.filters.filterTime.indexOf(val);
                value= [...props.filters.filterTime];
                value.splice( index, 1);
                break;
            case "filterPriceValue":
                value = [...props.filters.filterPriceValue]
                if(val === 'min')  value[0] = props.filterMinPrice
                if(val === 'max')  value[1] = props.filterMaxPrice
                break;
            case "filterFlightType":
                index = props.filters.filterFlightType.indexOf(val);
                value= [...props.filters.filterFlightType];
                value.splice( index, 1);
                break;   
            case "filterFlightCabin":
                    index = props.filters.filterFlightCabin.indexOf(val);
                    value= [...props.filters.filterFlightCabin];
                    value.splice( index, 1);
                    break;              
            default:
        }
        const params = {
            type,
            value
        }
        props.setFilterFlight(params);
        props.flightsFilter({
            filterItems:props.filters,
            data: props.allFlightList,
            sortFactor:props.sortFactor
        })

    }

    const times = {
        '0-6': 'قبل از ۶:۰۰ صبح',
        '6-12': '۶:۰۰ صبح تا ۱۱:۵۹ ظهر',
        '12-18': '۱۲:۰۰ ظهر تا ۱۸:۰۰ بعد از ظهر',
        '18-24': 'بعد از ۱۸:۰۰ بعد از ظهر'
    }
    

    return (
            <div className={styles.filterSortFlightList}>  
            {!props.loadingFlightList ?     
                <div className={styles.filterTopResult}>
                {hasChild ? <div className={styles.subject}>{t('suggested-filter')}:</div> : ''}
                    <div className={styles.suggested} id="suggestion">
                        {(props.airlineList && props.filters.filterAirlines) && props.filters.filterAirlines.map((item, index) =>
                            <button key={index} className={styles.activeSuggested}  onClick={()=> cleanItemFilters('filterAirlines',item)}>
                                <RemoveIcon  />
                                {props.airlineList[item][0].airline.name}
                            </button>
                        )}
                        {props.filters.filterTime && props.filters.filterTime.map((item, index) =>
                            <button key={index} className={styles.activeSuggested}  onClick={()=> cleanItemFilters('filterTime',item)}>
                                <RemoveIcon  />
                                {times[item]}
                            </button>
                        )}
                        {props.filters.filterPriceValue[0] > props.filterMinPrice &&
                            <button className={styles.activeSuggested}  onClick={()=> cleanItemFilters('filterPriceValue','min')}>
                                <RemoveIcon  />
                                {t("least-price")}{props.filters.filterPriceValue[0]}
                            </button>
                        }
                        {props.filters.filterPriceValue[1] < props.filterMaxPrice &&
                            <button className={styles.activeSuggested}  onClick={()=> cleanItemFilters('filterPriceValue','max')}>
                                <RemoveIcon  />
                                    {t('most-price')}{props.filters.filterPriceValue[1]}
                            </button>
                        }
                        {props.filters.filterFlightType.map((item, index)=>
                            <button key={index} className={styles.activeSuggested} onClick={()=> cleanItemFilters('filterFlightType',item)}>
                                <RemoveIcon  />
                                    {item === 'System' ? t('system') : t('charter')}
                            </button>
                        )}
                        {props.filters.filterFlightCabin.map((item, index)=>
                            <button key={index} className={styles.activeSuggested} onClick={()=> cleanItemFilters('filterFlightCabin',item)}>
                                <RemoveIcon  />
                                    {item}
                            </button>
                        )}
                    </div>
                </div>:''
                }
            </div>
                                    
    )
    
}

SuggestionFilterFlight.getInitialProps = async () => ({
    namespacesRequired: ['common']
})
  
SuggestionFilterFlight.propTypes = {
    t: PropTypes.func.isRequired
}
  

  export default withTranslation("common")(SuggestionFilterFlight);
