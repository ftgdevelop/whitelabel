import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation, Link, i18n } from '../../../../i18n'
import { Row, Col, Skeleton } from 'antd'
import { CheckOutlined } from '@ant-design/icons'

import styles from '../../../styles/Hotel.module.css'

const HotelAmenities = props => {
    const { t } = props;
    return (
        (props.hotelDetails) ?
        <>
        {props.hotelDetails.Facilities && props.hotelDetails.Facilities.length>0 ?
            <div className={styles.hotelAmenities} id="anchorhotelamenities">
                <div className={styles.container}>
                    <div className={styles.subjectHotelAmenities}>
                        {t('hotel-amenities')}
                    </div>
                    <div className={styles.contentHotelAmenities}>
                        <div className={styles.mainHotelAmenities}>
                            {props.hotelDetails && props.hotelDetails.Facilities && props.hotelDetails.Facilities.map(item =><div key={item.Title} className={styles.singleAmenities}>
                                <img src={item.ImageUrl} alt={item.ImageAlt} className="hotel-detail-facility-icon" />
                                <span>{item.Title}</span>
                            </div> )}
                        </div>
                        <div className={styles.listHotelAmenities}>
                            <div className="facility-groups">
                                {props.hotelDetails && props.hotelDetails.Facilities && props.hotelDetails.Facilities.map(item =><div className="facility-group-block" key={item.Title}>
                                    <div className={styles.subjectListHotelAmenities}>
                                        <img src={item.ImageUrl} alt={item.ImageAlt} className="hotel-detail-facility-icon" />
                                        <span>{item.Title}</span>
                                    </div>
                                    <div className={styles.listHotelAmenities}>
                                        <ul>
                                            {
                                                item.Description.split(",").map(descriptionItem=><li key={descriptionItem}>
                                                    <CheckOutlined />
                                                    <span>
                                                        {descriptionItem}
                                                    </span>
                                                </li>)
                                            }        
                                        </ul>
                                    </div>
                            </div> )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            :
            null
        }
        </>
        :
        <div className={styles.hotelAmenities}>
            <div className={styles.container}>
                <div className={styles.subjectHotelAmenities}>
                    {t('hotel-amenities')}
                </div>
                <div className={styles.contentHotelAmenities}>
                    <div className={styles.mainHotelAmenities}>
                        <Skeleton.Button active size="medium" className={styles.mainHotelAmenitiesSkeleton} />
                        <Skeleton.Button active size="medium" className={styles.mainHotelAmenitiesSkeleton} />
                        <Skeleton.Button active size="medium" className={styles.mainHotelAmenitiesSkeleton} />
                        <Skeleton.Button active size="medium" className={styles.mainHotelAmenitiesSkeleton} />
                    </div>
                    <div className={styles.listHotelAmenities}>
                        <Row>
                            <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                                <Skeleton.Button active size="medium" className={styles.hotelListAmenitiesSkeleton} />
                                <Skeleton.Button active size="small" className={styles.textHotelAmenitiesSkeleton} />
                                <Skeleton.Button active size="small" className={styles.textHotelAmenitiesSkeleton} />
                                <Skeleton.Button active size="small" className={styles.textHotelAmenitiesSkeleton} />
                                <Skeleton.Button active size="small" className={styles.textHotelAmenitiesSkeleton} />
                            </Col>
                            <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                                <Skeleton.Button active size="medium" className={styles.hotelListAmenitiesSkeleton} />
                                <Skeleton.Button active size="small" className={styles.textHotelAmenitiesSkeleton} />
                                <Skeleton.Button active size="small" className={styles.textHotelAmenitiesSkeleton} />
                                <Skeleton.Button active size="small" className={styles.textHotelAmenitiesSkeleton} />
                            </Col>
                            <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                                <Skeleton.Button active size="medium" className={styles.hotelListAmenitiesSkeleton} />
                                <Skeleton.Button active size="small" className={styles.textHotelAmenitiesSkeleton} />
                                <Skeleton.Button active size="small" className={styles.textHotelAmenitiesSkeleton} />
                                <Skeleton.Button active size="small" className={styles.textHotelAmenitiesSkeleton} />
                            </Col>
                            <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                                <Skeleton.Button active size="medium" className={styles.hotelListAmenitiesSkeleton} />
                                <Skeleton.Button active size="small" className={styles.textHotelAmenitiesSkeleton} />
                                <Skeleton.Button active size="small" className={styles.textHotelAmenitiesSkeleton} />
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    )
}

HotelAmenities.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
HotelAmenities.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(HotelAmenities)
