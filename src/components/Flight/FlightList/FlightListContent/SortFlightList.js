import React from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation } from '../../../../../i18n'
import { Radio, Button } from 'antd'

import styles from '../../../../styles/Flight.module.css'
import { SortIcon } from '../../../UI/Icons'
class SortFlightList extends React.Component {
    
    render() {
        const { t } = this.props;
        return (
            <>
                <div className={styles.sortFlightList}>
                    <span className={styles.sortFlightListText}>{t('sort-by')} :</span>
                    <span className={styles.sortFlightListIcon}><SortIcon/></span>
                    <Radio.Group defaultValue="LowPrice" className={styles.sortRadioGroup} onChange={e=>{this.props.sortHandler(e.target.value)}}>
                        <Radio.Button value="LowPrice"> {t('lowest-price')}</Radio.Button>
                        <Radio.Button value="HighPrice"> {t('highest-price')}</Radio.Button>
                        <Radio.Button value="departureTime">{t('flight-time')}</Radio.Button>
                    </Radio.Group>
                </div>
            </>
        )
    }
}

SortFlightList.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
SortFlightList.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(SortFlightList)
