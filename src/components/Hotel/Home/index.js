import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation, Link, i18n } from '../../../../i18n'
import dynamic from 'next/dynamic'
import Image from 'next/image'

import styles from '../../../styles/Home.module.css'

const SearchHotel = dynamic(() => import('../SearchHotel/SearchHotel'))

class HotelsHome extends React.Component {
    render() {
        const { t } = this.props;
        return (
            <div className={`${styles.searchBox} ${process.env.THEME_NAME === "TRAVELO" && styles.searchBoxTravelo}`}>
                <div className={styles.container}>
                    <div className={styles.hotelsHomeSubject}>
                        <h1>{t('searchbox-title')}</h1>
                    </div>
                </div>
                <div className={styles.container}>
                    <div className={styles.hotelsHome}>
                        <div className={styles.wrapSearchHotel}>
                            <SearchHotel/>
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

HotelsHome.getInitialProps = async () => ({
    namespacesRequired: ["common"],
})
  
HotelsHome.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation("common")(HotelsHome)
