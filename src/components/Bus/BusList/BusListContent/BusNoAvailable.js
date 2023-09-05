import React from 'react'
import PropTypes from 'prop-types'
import { Link, i18n, withTranslation } from '../../../../../i18n'

import { BusFlatIcon } from '../../../UI/Icons'

import styles from '../../../../styles/Bus.module.css'
class BusNoAvailable extends React.Component {
    
    render() {
        const { t, subjectText, helpText, btnText, handler } = this.props;
        return (
            <>
                <div className={styles.flightNoAvailable}>
                    <div className={styles.subjectText}>{subjectText}</div>
                    <div className={styles.helpText}>{helpText}</div>
                    <div className={styles.btnSearch}>
                        <button onClick={()=> handler()}>{btnText}</button>
                    </div>
                    <BusFlatIcon/>
                </div>
            </>
        )
    }
}

BusNoAvailable.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
BusNoAvailable.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(BusNoAvailable)
