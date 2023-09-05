import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation ,Router } from '../../../../i18n'
import { Row, Col, Tooltip, Skeleton } from 'antd';
import dynamic from 'next/dynamic';

import styles from '../../../styles/Cip.module.css'

const MapWithNoSSR = dynamic(() => import('../../UI/LeafletMap/LeafletMap'), {
    ssr: false
});

const Map = props => {
    const { t, mapInfo } = props;
    return (
        <div className={styles.cipMap}>
            <div className={styles.subject}>فرودگاه بر روی نقشه</div>
            <div className={styles.content}>
                <MapWithNoSSR mapInfo={mapInfo}/>
            </div>
        </div>
    )
}

Map.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
    
Map.propTypes = {
    t: PropTypes.func.isRequired,
}

export default withTranslation('common')(Map)