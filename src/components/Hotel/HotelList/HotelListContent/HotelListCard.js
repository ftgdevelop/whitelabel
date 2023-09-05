import React from 'react'
import PropTypes from 'prop-types';
import { withTranslation, i18n } from '../../../../../i18n';
import { Row, Col, Skeleton } from 'antd';
import dynamic from 'next/dynamic'

import styles from '../../../../styles/Hotel.module.css';

const HotelListCardItem = dynamic(() => import('./HotelListCardItem'))

const HotelListCard = props => {
    const { t } = props;
    
    return (
        <>
        {props.loading?
        <div>
            <div className={styles.sortHotelListSkeleton}>
                <Row>
                    <Col lg={6} xl={6}>
                        <Skeleton.Button active size="small" className={styles.skeletonSubjectSort} />
                    </Col>
                    <Col xs={8} sm={8} md={4} lg={2} xl={2}>
                        <Skeleton.Button active size="small" className={styles.skeletonTextSort} />
                    </Col>
                    <Col xs={8} sm={8} md={4} lg={2} xl={2}>
                        <Skeleton.Button active size="small" className={styles.skeletonTextSort} />
                    </Col>
                    <Col xs={8} sm={8} md={4} lg={2} xl={2}>
                        <Skeleton.Button active size="small" className={styles.skeletonTextSort} />
                    </Col>
                </Row>
            </div>
            <div className={styles.hotelCard}>
                <Row>
                    <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                        <div className={styles.imageThumSkeleton}>
                            <Skeleton.Image />
                        </div>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <div>
                            <Skeleton active className={styles.skeletonContentHotelCard} style={{ marginTop: 15 }} />
                        </div>
                    </Col>
                    <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                        <div className={styles.buttonSkeleton}>
                            <Skeleton.Button active size="small" className={styles.skeletonButtonHotelCard} />
                            <Skeleton.Input active size="large" className={styles.skeletonInputHotelCard} />
                        </div>
                    </Col>
                </Row>
            </div>
            <div className={styles.hotelCard}>
                <Row>
                    <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                        <div className={styles.imageThumSkeleton}>
                            <Skeleton.Image />
                        </div>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <div >
                            <Skeleton active className={styles.skeletonContentHotelCard} style={{ marginTop: 15 }} />
                        </div>
                    </Col>
                    <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                        <div className={styles.buttonSkeleton}>
                            <Skeleton.Button active size="small" className={styles.skeletonButtonHotelCard} />
                            <Skeleton.Input active size="large" className={styles.skeletonInputHotelCard} />
                        </div>
                    </Col>
                </Row>
            </div>
            <div className={styles.hotelCard}>
                <Row>
                    <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                        <div className={styles.imageThumSkeleton}>
                            <Skeleton.Image />
                        </div>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <div>
                            <Skeleton active className={styles.skeletonContentHotelCard} style={{ marginTop: 15 }} />
                        </div>
                    </Col>
                    <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                        <div className={styles.buttonSkeleton}>
                            <Skeleton.Button active size="small" className={styles.skeletonButtonHotelCard} />
                            <Skeleton.Input active size="large" className={styles.skeletonInputHotelCard} />
                        </div>
                    </Col>
                </Row>
            </div>
            <div className={styles.hotelCard}>
                <Row>
                    <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                        <div className={styles.imageThumSkeleton}>
                            <Skeleton.Image />
                        </div>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <div >
                            <Skeleton active className={styles.skeletonContentHotelCard} style={{ marginTop: 15 }} />
                        </div>
                    </Col>
                    <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                        <div className={styles.buttonSkeleton}>
                            <Skeleton.Button active size="small" className={styles.skeletonButtonHotelCard} />
                            <Skeleton.Input active size="large" className={styles.skeletonInputHotelCard} />
                        </div>
                    </Col>
                </Row>
            </div>
            <div className={styles.hotelCard}>
                <Row>
                    <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                        <div className={styles.imageThumSkeleton}>
                            <Skeleton.Image />
                        </div>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <div >
                            <Skeleton active className={styles.skeletonContentHotelCard} style={{ marginTop: 15 }} />
                        </div>
                    </Col>
                    <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                        <div className={styles.buttonSkeleton}>
                            <Skeleton.Button active size="small" className={styles.skeletonButtonHotelCard} />
                            <Skeleton.Input active size="large" className={styles.skeletonInputHotelCard} />
                        </div>
                    </Col>
                </Row>
            </div>
            <div className={styles.hotelCard}>
                <Row>
                    <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                        <div className={styles.imageThumSkeleton}>
                            <Skeleton.Image />
                        </div>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <div >
                            <Skeleton active className={styles.skeletonContentHotelCard} style={{ marginTop: 15 }} />
                        </div>
                    </Col>
                    <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                        <div className={styles.buttonSkeleton}>
                            <Skeleton.Button active size="small" className={styles.skeletonButtonHotelCard} />
                            <Skeleton.Input active size="large" className={styles.skeletonInputHotelCard} />
                        </div>
                    </Col>
                </Row>
            </div>
            <div className={styles.hotelCard}>
                <Row>
                    <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                        <div className={styles.imageThumSkeleton}>
                            <Skeleton.Image />
                        </div>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <div >
                            <Skeleton active className={styles.skeletonContentHotelCard} style={{ marginTop: 15 }} />
                        </div>
                    </Col>
                    <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                        <div className={styles.buttonSkeleton}>
                            <Skeleton.Button active size="small" className={styles.skeletonButtonHotelCard} />
                            <Skeleton.Input active size="large" className={styles.skeletonInputHotelCard} />
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
        :
        props.hotelList.map(item =><HotelListCardItem
                    item={item}
                    loadingPrices={props.loadingPrices}
                    nights={props.nights}
                    IsPromotion={props.IsPromotion}
                    searchedInfo={props.searchedInfo}
                    key={item.HotelId}
                />
            )
        }
        </>
    )
}

HotelListCard.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
HotelListCard.propTypes = {
    t: PropTypes.func.isRequired,
}

export default withTranslation('common')(HotelListCard)