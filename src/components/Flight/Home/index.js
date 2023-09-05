import React from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation } from '../../../../i18n'
import Image from 'next/image'

import styles from '../../../styles/Home.module.css'
import SearchFlight from '../SearchFlight/SearchFlight'

class FlightsHome extends React.Component {
    render() {
        const { t } = this.props;
        return (
            <div className={`${styles.searchBox} ${process.env.THEME_NAME === "TRAVELO" && styles.searchBoxTravelo}`}>
                <div className={styles.container}>
                    <div className={styles.flightsHomeSubject}>
                        <h1>{t('searchbox-title')}</h1>
                    </div>
                </div>
                <div className={styles.container}>
                    <div className={styles.flightsHome}>
                        <div className={styles.wrapSearchFlight}>
                            <SearchFlight/>
                        </div>
                    </div>
                </div>
                <div className={styles.searchBoxBackground}>
                    <Image
                        layout="fill"
                        title="سفرانه"
                        alt="سفرانه"
                        src="https://cdn2.safaraneh.com/images/home/balon.jpg"
                    />
                </div>
            </div>
        )
    }
}

FlightsHome.getInitialProps = async () => ({
    namespacesRequired: ["common"],
})
  
FlightsHome.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation("common")(FlightsHome)
