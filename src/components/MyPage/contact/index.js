import React from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation } from '../../../../i18n'

import styles from '../../../styles/Home.module.css'
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./Map'), {
    ssr: false
  });

class Contact extends React.Component {
    state = { markerPosition: { lat: 35.80346155562309, lng: 51.473055471138736 } };
    render() {
        const { t } = this.props;
        const { markerPosition } = this.state;
        return (
            <>
                <Map markerPosition={markerPosition} />
            </>
        )
    }
}

Contact.getInitialProps = async () => ({
    namespacesRequired: ["common"],
})
  
Contact.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation("common")(Contact)
