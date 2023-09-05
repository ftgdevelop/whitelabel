import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation, Link, i18n } from '../../../../i18n'
import {AimOutlined} from '@ant-design/icons'
import { Row, Col, Skeleton } from 'antd'

import styles from '../../../styles/Hotel.module.css'

const Attractions = props => {

    const { t } = props;
    return (
        props.attractionsData?
        <div
            className={`${styles.attractionsHotel} ${process.env.THEME_NAME === "TRAVELO" && styles.attractionsHotelTravelo}`}
            id="anchorattractions"
            >
            {(props.attractionsData.length>0)?
                <>
                <div className={styles.container}>
                    <div className={styles.subjectAttractionsHotel}>
                        {t('attractions')}
                    </div>
                    <div className={styles.contentAttractionsHotel}>
                    
                        <h4>{t('hotel-distance-to-attractions')}</h4>
                        <div>
                            {props.attractionsData.map(item=><div key={item.AttractionName}>
                                <Row justify="space-between" gutter={[20,0]} className="margin-top-small">
                                    <Col><span><AimOutlined /> {t('distance-to')}{item.AttractionName} : {item.DistanceText}</span></Col>
                                    <Col><span>({item.DurationText} {t('with-car')})</span></Col>
                                </Row>
                            </div>)}
                        </div>
                        
                    </div>
                </div>
                </>
                :
                null
            }
        </div>
        :
        <div
        className={`${styles.attractionsHotel} ${process.env.THEME_NAME === "TRAVELO" && styles.attractionsHotelTravelo}`}
            >
            <div className={styles.container}>
                <div className={styles.subjectAttractionsHotel}>
                    {t('attractions')}
                </div>
                <div className={styles.contentAttractionsHotel}>
                    <div>
                        <Row justify="space-between" gutter={[20,0]} className="margin-top-small">
                            <Col>
                                <Skeleton.Button active size="small" className={styles.attractionsHotelSkeleton} />
                            </Col>
                            <Col>
                                <Skeleton.Button active size="small" className={styles.carAttractionsHotelSkeleton} />
                            </Col>
                        </Row>
                    </div>
                    <div>
                        <Row justify="space-between" gutter={[20,0]} className="margin-top-small">
                            <Col>
                                <Skeleton.Button active size="small" className={styles.attractionsHotelSkeleton} />
                            </Col>
                            <Col>
                                <Skeleton.Button active size="small" className={styles.carAttractionsHotelSkeleton} />
                            </Col>
                        </Row>
                    </div>
                    <div>
                        <Row justify="space-between" gutter={[20,0]} className="margin-top-small">
                            <Col>
                                <Skeleton.Button active size="small" className={styles.attractionsHotelSkeleton} />
                            </Col>
                            <Col>
                                <Skeleton.Button active size="small" className={styles.carAttractionsHotelSkeleton} />
                            </Col>
                        </Row>
                    </div>
                    <div>
                        <Row justify="space-between" gutter={[20,0]} className="margin-top-small">
                            <Col>
                                <Skeleton.Button active size="small" className={styles.attractionsHotelSkeleton} />
                            </Col>
                            <Col>
                                <Skeleton.Button active size="small" className={styles.carAttractionsHotelSkeleton} />
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    )
}

Attractions.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
Attractions.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(Attractions)
