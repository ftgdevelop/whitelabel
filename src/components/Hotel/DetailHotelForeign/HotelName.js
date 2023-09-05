import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { Link, withTranslation, i18n } from '../../../../i18n'
import { Breadcrumb, Skeleton } from 'antd'
import { HomeOutlined, EnvironmentOutlined } from '@ant-design/icons';
import moment from 'moment-jalaali'; 
import dynamic from 'next/dynamic'

import styles from '../../../styles/Hotel.module.css'

const Rating = dynamic(() => import('../../UI/Rating/Rating'))


const HotelName = props =>{
        const { t } = props;
        let listUrl;
        if(props.hotelDetails){
            if(props.searchedInfo){
                listUrl = "/hotels-foreign/"+ props.hotelDetails.city.name +"/location-"+props.hotelDetails.city.id + props.searchedInfo;
            }else{
                listUrl = "/hotels-foreign/"+ props.hotelDetails.city.name +"/location-"+props.hotelDetails.city.id + "/checkin-"+moment().format("YYYY-MM-DD")+"/checkout-"+moment().add(1, 'day').format("YYYY-MM-DD")+"/adult-1";
            }
        }
        return (
            <div className={styles.hotelName}>
                <div className={`${styles.container} relative`}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link as="/" href="/">
                                <a>
                                    <HomeOutlined />
                                </a>
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {(listUrl)? <Link as={listUrl} href={listUrl}>
                                <a>
                                    <span className="inline-block"> {t("hotels-of")}</span> <span className="inline-block"> {props.hotelDetails.city.name} </span>
                                </a>
                            </Link>:<Skeleton.Button active size="small" className={styles.skeletonHotelBreadcrumb} /> }                           
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <span>{props.hotelDetails? props.hotelDetails.name :<Skeleton.Button active size="small" className={styles.skeletonHotelBreadcrumb} />}</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>

                    {/* <Row justify="space-between" align="top">
                        <Col> */}
                            <div className={styles.hotelNameText}>
                            {
                                props.hotelDetails?                                
                                <>
                                    <h1 className="xlarge-title">{props.hotelDetails.name}</h1>
                                    <Rating rate={props.hotelDetails.rating}/>
                                    <div className="margin-top font-12">
                                        <EnvironmentOutlined className="margin-end-5"/>
                                        {props.hotelDetails.address}
                                    </div>
                                </>
                                :
                                <div className={styles.hotelNameTextSkeleton}>
                                    <Skeleton.Button active size="large" className={styles.skeletonHotelNameText} />
                                    <Skeleton.Button active size="small" className={styles.skeletonHotelRating} />
                                    <Skeleton.Button active size="small" className={styles.skeletonHotelAddress} />
                                </div>
                            }
                            </div>
                        {/* </Col>
                        <Col>
                            {
                                props.score?<HotelPoint point={props.score.Satisfaction}
                                reviews={props.score.CommentCount} />
                                :
                                <Skeleton.Button active size="medium" className={styles.skeletonHotelPoint} />
                            }
                        </Col>
                    </Row> */}
                </div>
            </div>
        )
    
}

HotelName.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
HotelName.propTypes = {
t: PropTypes.func.isRequired,
}
  
const mapStateToProp = (state) => {
    return {
      hotelDetails: state.hotel.foreignHotelDetail
    };
  };

export default withTranslation('common')(connect(mapStateToProp)(HotelName))
