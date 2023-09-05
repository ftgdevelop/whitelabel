import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { withTranslation, Link, i18n } from '../../../../i18n'
import { Row, Col, Skeleton  } from 'antd'
import { CheckCircleOutlined} from '@ant-design/icons'

import styles from '../../../styles/Hotel.module.css'

const HotelAmenities = props => {
    const { t } = props;
    return (
        <div
            className={`${styles.hotelAmenities} ${process.env.THEME_NAME === "TRAVELO" && styles.hotelAmenitiesTravelo}`}
            id="anchorhotelamenities"
            >
            <div className={styles.container}>
                <div className={styles.subjectHotelAmenities}>
                    {t("hotel-facilities")}
                </div>
                <div className={styles.contentHotelAmenities}>
 
                    {props.hotelDetails  ?
                    <>

                    {/* facilities: */}
                    {props.hotelDetails.features && props.hotelDetails.features.filter(item=>item.keyword === "facilities").length === 1 && <div className="margin-bottom">
                    <h4 className="small-title">{t("hotel-facilities")}</h4>
                    <Row gutter={[15,15]} dir="ltr">
                        {props.hotelDetails.features.filter(item=>item.keyword === "facilities")[0].items.map(item => 
                        <Col xs={24} md={8} lg={6} key={item.keyword} className={item.isImportant?"is-important":""}>
                            {(item.typeHint === "bool") ?
                            <>
                            {item.name} <CheckCircleOutlined />
                            </>  
                            :(item.typeHint === "int")?
                            <>
                            {item.name} : {item.value}
                            </>
                            :
                            item.name
                            }
                        </Col>)}                       
                    </Row>
                    </div>}

                    {/* rooms facilities: */}
                    {props.hotelDetails.features && props.hotelDetails.features.filter(item=>item.keyword === "room_facilities").length === 1 && <div className="margin-bottom">
                    <h4 className="small-title">{t("room-amenties")}</h4>
                    <Row gutter={[15,15]} dir="ltr">
                        {props.hotelDetails.features.filter(item=>item.keyword === "room_facilities")[0].items.map(item => 
                        <Col xs={24} md={8} lg={6} key={item.keyword} className={item.isImportant?"is-important":""}>
                            {(item.typeHint === "bool") ?
                            <>
                            {item.name} <CheckCircleOutlined />
                            </>  
                            :(item.typeHint === "int")?
                            <>
                            {item.name} : {item.value}
                            </>
                            :
                            item.name
                            }
                        </Col>)}                       
                    </Row>
                    </div>}

                    {/* sports_entertainment facilities: */}
                    {props.hotelDetails.features && props.hotelDetails.features.filter(item=>item.keyword === "sports_entertainment").length === 1 && <div className="margin-bottom">
                    <h4 className="small-title">{t("sport-amenties")}</h4>
                    <Row gutter={[15,15]} dir="ltr">
                        {props.hotelDetails.features.filter(item=>item.keyword === "sports_entertainment")[0].items.map(item => 
                        <Col xs={24} md={8} lg={6} key={item.keyword} className={item.isImportant?"is-important":""}>
                            {(item.typeHint === "bool") ?
                            <>
                            {item.name} <CheckCircleOutlined />
                            </>  
                            :(item.typeHint === "int")?
                            <>
                            {item.name} : {item.value}
                            </>
                            :
                            item.name
                            }
                        </Col>)}                       
                    </Row>
                    </div>}


                    {/* building_info facilities: */}
                    {props.hotelDetails.features && props.hotelDetails.features.filter(item=>item.keyword === "building_info").length === 1 && <div className="margin-bottom">
                    <h4 className="small-title">{t("hotel-building-information")}</h4>
                    <Row gutter={[15,15]} dir="ltr">
                        {props.hotelDetails.features.filter(item=>item.keyword === "building_info")[0].items.map(item => 
                        <Col xs={24} md={8} lg={6} key={item.keyword} className={item.isImportant?"is-important":""}>
                            {(item.typeHint === "bool") ?
                            <>
                            {item.name} <CheckCircleOutlined />
                            </>  
                            :(item.typeHint === "int")?
                            <>
                            {item.name} : {item.value}
                            </>
                            :
                            item.name
                            }
                        </Col>)}                       
                    </Row>
                    </div>}

                    
                    {/* distances: */}
                    {props.hotelDetails.features && props.hotelDetails.features.filter(item=>item.keyword === "distances").length === 1 && <div className="margin-bottom">
                    <h4 className="small-title">{t("hotel-distance-important")}</h4>
                    <Row gutter={[15,15]} dir="ltr">
                        {props.hotelDetails.features.filter(item=>item.keyword === "distances")[0].items.map(item => 
                        <Col xs={24} md={8} lg={6} key={item.keyword} className={item.isImportant?"is-important":""}>
                        {item.name} : {item.value} m
                        </Col>)}                       
                    </Row>
                    </div>}

                    </>
                    :
                    <>
                        <div className="margin-bottom">
                            <h4 className="small-title">
                                <Skeleton.Button active size="medium" className={styles.mainHotelAmenitiesSkeleton} />
                            </h4>
                            <Row gutter={[15,15]} dir="ltr">
                                <Col xs={24} md={8} lg={6}>
                                    <Skeleton.Button active size="small" className={styles.textHotelAmenitiesForeignSkeleton} />
                                </Col>
                                <Col xs={24} md={8} lg={6}>
                                    <Skeleton.Button active size="small" className={styles.textHotelAmenitiesForeignSkeleton} />
                                </Col>
                                <Col xs={24} md={8} lg={6}>
                                    <Skeleton.Button active size="small" className={styles.textHotelAmenitiesForeignSkeleton} />
                                </Col>
                                <Col xs={24} md={8} lg={6}>
                                    <Skeleton.Button active size="small" className={styles.textHotelAmenitiesForeignSkeleton} />
                                </Col>
                                <Col xs={24} md={8} lg={6}>
                                    <Skeleton.Button active size="small" className={styles.textHotelAmenitiesForeignSkeleton} />
                                </Col>
                                <Col xs={24} md={8} lg={6}>
                                    <Skeleton.Button active size="small" className={styles.textHotelAmenitiesForeignSkeleton} />
                                </Col>
                                <Col xs={24} md={8} lg={6}>
                                    <Skeleton.Button active size="small" className={styles.textHotelAmenitiesForeignSkeleton} />
                                </Col>
                            </Row>
                        </div>
                        <div className="margin-bottom">
                            <h4 className="small-title">
                                <Skeleton.Button active size="medium" className={styles.mainHotelAmenitiesSkeleton} />
                            </h4>
                            <Row gutter={[15,15]} dir="ltr">
                                <Col xs={24} md={8} lg={6}>
                                    <Skeleton.Button active size="small" className={styles.textHotelAmenitiesForeignSkeleton} />
                                </Col>
                                <Col xs={24} md={8} lg={6}>
                                    <Skeleton.Button active size="small" className={styles.textHotelAmenitiesForeignSkeleton} />
                                </Col>
                                <Col xs={24} md={8} lg={6}>
                                    <Skeleton.Button active size="small" className={styles.textHotelAmenitiesForeignSkeleton} />
                                </Col>
                                <Col xs={24} md={8} lg={6}>
                                    <Skeleton.Button active size="small" className={styles.textHotelAmenitiesForeignSkeleton} />
                                </Col>
                                <Col xs={24} md={8} lg={6}>
                                    <Skeleton.Button active size="small" className={styles.textHotelAmenitiesForeignSkeleton} />
                                </Col>
                                <Col xs={24} md={8} lg={6}>
                                    <Skeleton.Button active size="small" className={styles.textHotelAmenitiesForeignSkeleton} />
                                </Col>
                                <Col xs={24} md={8} lg={6}>
                                    <Skeleton.Button active size="small" className={styles.textHotelAmenitiesForeignSkeleton} />
                                </Col>
                            </Row>
                        </div>
                    </>
                    }
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
  
const mapStateToProp = (state) => {
    return {
      hotelDetails: state.hotel.foreignHotelDetail
    };
  };

export default withTranslation('common')(connect(mapStateToProp)(HotelAmenities))
