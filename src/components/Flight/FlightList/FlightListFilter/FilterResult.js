import React from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation } from '../../../../../i18n'
import { Skeleton } from 'antd'

import styles from '../../../../styles/Flight.module.css'

const FilterResult = props => {
    
    const { t, totalFlights, totalFilter } = props;
    return (
        <>
            {
                props.loading?
                <div className={styles.filterResult}>
                    <Skeleton.Button style={{ width: 100 }} active size="small" />
                </div>
                :
                <div>
                    {
                        totalFlights === totalFilter ?
                        <div className={styles.filterResult}>
                            {t("your-search-result")}
                            <div className={styles.textFilterResult}>{totalFlights} {t("flight-found")}</div>
                        </div>
                        :
                        <div className={styles.filterResult}>
                            {t("your-search-result")}
                            <div className={styles.textFilterResult}>{totalFilter} {t('flight-from')}{totalFlights} {t("flight-found")}</div>
                        </div>
                    }
                </div>
            }
        </>
    )
    
}

FilterResult.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
FilterResult.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(FilterResult)