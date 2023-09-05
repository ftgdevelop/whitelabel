import React from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation } from '../../../../i18n'

import styles from '../../../styles/Home.module.css'
import SearchBus from '../SearchBus/SearchBus'

class BusHome extends React.Component {
    render() {
        const { t } = this.props;
        return (
            <div className={styles.hotelsHome}>
                <div className={styles.searchBox}>
                    <div className={styles.container}>
                        <div className={styles.busHomeSubject}>
                            <h1>{t('searchbox-title')}</h1>
                        </div>
                    </div>
                    <div className={styles.busHome}>
                        <div className={styles.container}>
                            <div className={styles.wrapSearchBus}>
                                <SearchBus/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

BusHome.getInitialProps = async () => ({
    namespacesRequired: ["common"],
})
  
BusHome.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation("common")(BusHome)
