import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from '../../../../i18n'

import styles from '../../../styles/Home.module.css'

class Title extends React.Component {
    render() {
        const { t } = this.props;
        return (
            <div 
                className={`${styles.titleBox} ${process.env.THEME_NAME === "TRAVELO" && styles.titleBoxTravelo}`}
                >
                <h1>{t('searchbox-title')}</h1>
            </div>
        )
    }
}

Title.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
Title.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(Title)
