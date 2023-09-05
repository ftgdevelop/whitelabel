import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation, Link, i18n } from '../../../../i18n'

import styles from '../../../styles/Hotel.module.css'

class Attractions extends React.Component {
    render() {
        const { t } = this.props;
        return (
            <div className={styles.attractionsHotel} id="anchorattractions">
                <div className={styles.container}>
                    <div className={styles.subjectAttractionsHotel}>
                        {t("attraction")}
                    </div>
                    <div className={styles.contentAttractionsHotel}>
                        <h4>{t("hotel-distance-to-attractions")}</h4>
                        <ul>
                            <li>
                            {t("hotel-distance1")}
                            </li>
                            <li>
                            {t("hotel-distance2")}
                            </li>
                            <li>
                            {t("hotel-distance3")}
                            </li>
                            <li>
                            {t("hotel-distance4")}
                            </li>
                            <li>
                            {t("hotel-distance1")}
                            </li>
                            <li>
                            {t("hotel-distance2")}
                            </li>
                            <li>
                            {t("hotel-distance3")}
                            </li>
                            <li>
                            {t("hotel-distance4")}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

Attractions.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
Attractions.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(Attractions)
