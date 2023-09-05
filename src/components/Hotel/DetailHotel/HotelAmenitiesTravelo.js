import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation, Link, i18n } from '../../../../i18n'
import { Row, Col, Skeleton } from 'antd'
import { CheckOutlined } from '@ant-design/icons'
import AnimatedShowMore from "react-animated-show-more"
import Image from 'next/image'

import styles from '../../../styles/Hotel.module.css'
import { DownOutlined, UpOutlined } from '@ant-design/icons'

const HotelAmenitiesTravelo = props => {
    const { t } = props;
    return (
        (props.hotelDetails) ?
        <>
        {props.hotelDetails.Facilities && props.hotelDetails.Facilities.length>0 ?
            <div
                className={`${styles.hotelAmenities} ${process.env.THEME_NAME === "TRAVELO" && styles.hotelAmenitiesTravelo}`}
                id="anchorhotelamenities"
                >
                <div className={styles.container}>
                    <div className={styles.subjectHotelAmenities}>
                        {t('hotel-amenities')}
                    </div>
                    <div className={styles.contentHotelAmenities}>
                        <AnimatedShowMore
                            height={300}
                            toggle={({ isOpen }) =>
                                isOpen ? <span>بستن <UpOutlined /></span> : <span>امکانات بیشتر <DownOutlined className={styles.BtnIcon}/></span>
                            }
                            speed={0}
                            shadowColor="transparent"
                            className={styles.shoMoreHotelAmenities}
                        >
                            <Row gutter={[20,0]}>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <div className={`${styles.mainHotelAmenities} main-hotel-amenities-icon`}>
                                                {props.hotelDetails && props.hotelDetails.Facilities && props.hotelDetails.Facilities.map(item => <div key={item.Title} className={styles.singleAmenities}>
                                            {/* <img src={item.ImageUrl} alt={item.Title} className="hotel-detail-facility-icon" /> */}
                                            <Image
                                                width="16"
                                                height="16"
                                                src={item.ImageUrl}
                                                alt={item.Title} 
                                                title={item.Title} 
                                            />
                                            <span>{item.Title}</span>
                                        </div> )}
                                    </div>  
                                </Col>
                                <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                                    <div className={styles.listHotelAmenities}>
                                        <div className="facility-groups-trtavelo">
                                            {props.hotelDetails && props.hotelDetails.Facilities && props.hotelDetails.Facilities.map(item =><div className="facility-group-block" key={item.Title}>
                                                <div className={`${styles.subjectListHotelAmenities} main-hotel-amenities-icon`}>
                                                    {/* <img src={item.ImageUrl} alt={item.Title} className="hotel-detail-facility-icon" /> */}
                                                    <Image
                                                        width="16"
                                                        height="16"
                                                        src={item.ImageUrl}
                                                        alt={item.Title} 
                                                        title={item.Title} 
                                                    />
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
                                </Col>
                            </Row>
                        </AnimatedShowMore>
                    </div>
                </div>
            </div>
            :
            null
        }
        </>
        :
        <div
            className={`${styles.hotelAmenities} ${process.env.THEME_NAME === "TRAVELO" && styles.hotelAmenitiesTravelo}`}
            >
            <div className={styles.container}>
                <div className={styles.subjectHotelAmenities}>
                    {t('hotel-amenities')}
                </div>
                <div className={styles.contentHotelAmenities}>
                    <Row gutter={[20,0]}>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <div className={styles.mainHotelAmenities}>
                                <Row>
                                    <Col span={24}>
                                        <Skeleton.Button active size="medium" className={styles.mainHotelAmenitiesSkeleton} />
                                    </Col><br/><br/>
                                    <Col span={24}>
                                        <Skeleton.Button active size="medium" className={styles.mainHotelAmenitiesSkeleton} />
                                    </Col><br/><br/>
                                    <Col span={24}>
                                        <Skeleton.Button active size="medium" className={styles.mainHotelAmenitiesSkeleton} />
                                    </Col><br/><br/>
                                    <Col span={24}>
                                        <Skeleton.Button active size="medium" className={styles.mainHotelAmenitiesSkeleton} />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                        <div className={styles.listHotelAmenities}>
                            <Row>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Skeleton.Button active size="medium" className={styles.hotelListAmenitiesSkeleton} />
                                    <Skeleton.Button active size="small" className={styles.textHotelAmenitiesSkeleton} />
                                    <Skeleton.Button active size="small" className={styles.textHotelAmenitiesSkeleton} />
                                    <Skeleton.Button active size="small" className={styles.textHotelAmenitiesSkeleton} />

                                    <Skeleton.Button active size="medium" className={styles.hotelListAmenitiesSkeleton} />
                                    <Skeleton.Button active size="small" className={styles.textHotelAmenitiesSkeleton} />
                                    <Skeleton.Button active size="small" className={styles.textHotelAmenitiesSkeleton} />
                                    <Skeleton.Button active size="small" className={styles.textHotelAmenitiesSkeleton} />
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Skeleton.Button active size="medium" className={styles.hotelListAmenitiesSkeleton} />
                                    <Skeleton.Button active size="small" className={styles.textHotelAmenitiesSkeleton} />
                                    <Skeleton.Button active size="small" className={styles.textHotelAmenitiesSkeleton} />
                                    <Skeleton.Button active size="small" className={styles.textHotelAmenitiesSkeleton} />

                                    <Skeleton.Button active size="medium" className={styles.hotelListAmenitiesSkeleton} />
                                    <Skeleton.Button active size="small" className={styles.textHotelAmenitiesSkeleton} />
                                    <Skeleton.Button active size="small" className={styles.textHotelAmenitiesSkeleton} />
                                    <Skeleton.Button active size="small" className={styles.textHotelAmenitiesSkeleton} />
                                </Col>
                            </Row>
                        </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}

HotelAmenitiesTravelo.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
HotelAmenitiesTravelo.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(HotelAmenitiesTravelo)
