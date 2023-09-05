import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation, Link, i18n } from '../../../../i18n'
import dynamic from 'next/dynamic'

import styles from '../../../styles/Home.module.css'

const SearchHotel = dynamic(() => import('../SearchHotel/SearchHotel'))

class HotelsHomeForeign extends React.Component {
    render() {
        const { t } = this.props;
        return (
            <div className={styles.searchBox}>
                <div className={styles.container}>
                    <div className={styles.hotelsHomeSubject}>
                        <h1>{t('searchbox-title')}</h1>
                    </div>
                </div>
                <div className={styles.hotelsHome}>
                    <div className={styles.container}>
                        <div className={styles.wrapSearchHotel}>
                            <SearchHotel 
                                isForeign
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

HotelsHomeForeign.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
HotelsHomeForeign.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(HotelsHomeForeign)
