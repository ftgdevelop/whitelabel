import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation, Link, i18n } from '../../../../i18n'
import dynamic from 'next/dynamic'

import styles from '../../../styles/Home.module.css'

const CapacitySteps = dynamic(() => import('./CapacitySteps'))
const ContentCapacity = dynamic(() => import('./ContentCapacity'))
const ContentCapacityV4 = dynamic(() => import('./ContentCapacityV4'))

class Capacity extends React.Component {
    render() {
        const { t } = this.props;
        return (
            <div
                className={`${styles.capacity} ${process.env.THEME_NAME === "TRAVELO" && styles.capacityTravelo}`}
                >
                <div className={styles.container}>
                    
                    <CapacitySteps/>
                    
                    {process.env.DomesticHotelV4 ? <ContentCapacityV4 /> :<ContentCapacity />}
                    
                </div>
            </div>
        )
    }
}

Capacity.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
Capacity.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(Capacity)
