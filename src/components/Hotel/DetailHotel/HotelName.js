import React, { Children } from 'react'
import PropTypes from 'prop-types'
import { Link, withTranslation, i18n } from '../../../../i18n'
import { Breadcrumb, Row, Col, Skeleton } from 'antd'
import { useRouter } from 'next/router';
import { HomeOutlined, EnvironmentOutlined, AimOutlined } from '@ant-design/icons';
import moment from "moment-jalaali";
import dynamic from 'next/dynamic';
import Image from 'next/image'

import styles from '../../../styles/Hotel.module.css'

const MapWithNoSSR = dynamic(() => import('../../UI/LeafletMap/LeafletMap'), {
    ssr: false
});

const Rating = dynamic(() => import('../../UI/Rating/Rating'))
const HotelPoint = dynamic(() => import('../../UI/HotelPoint/HotelPoint'))
const HotelPointTravelo = dynamic(() => import('../../UI/HotelPoint/HotelPointTravelo'))

const HotelName = props =>{
        const { t } = props;
        const router = useRouter();

        let listUrl;
        const searchInfo = router.asPath;

        if(props.hotelDetails && searchInfo){
            
            let checkin,checkout,guests="";

            if (searchInfo.includes("checkin-")){

                checkin = searchInfo.split("checkin-")[1].split("/")[0];

                if (searchInfo.includes("checkout-")){
                    checkout = searchInfo.split("checkout-")[1].split("/")[0]
                }else{
                    checkout = moment(checkin).add(1, 'day').format("YYYY-MM-DD")
                }    

            }else{
                checkin = moment().format("YYYY-MM-DD");
                checkout = moment().add(1, 'day').format("YYYY-MM-DD")
            }



            if (searchInfo.includes("adult-")){
                guests += "adult-"+searchInfo.split("adult-")[1].split("/")[0];
                let ChildrenAges = searchInfo.split("child-");
                ChildrenAges.shift();
                for (let i=0 ; i<ChildrenAges.length ; i++ ){
                    const age = ChildrenAges[i].split("/")[0];
                    guests += `/child-${age}`
                }
            }else{
                guests = "adult-1"
            }
            
            listUrl = `/hotels/${props.hotelDetails.CityName}/location-${props.hotelDetails.CityId}/checkin-${checkin}/checkout-${checkout}/${guests}`;
        }
        return (
            <div 
                className={`${styles.hotelName} ${process.env.THEME_NAME === "TRAVELO" && styles.hotelNameTravelo}`}
                >
                <div className={`${styles.container} relative`}>
                    <div
                        className={`${process.env.THEME_NAME === "TRAVELO" && styles.contentHotelNameTravelo}`}
                        >
                        {/* <Breadcrumb>
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
                                        <span>{t('hotels-of')}{props.hotelDetails.CityName}</span>
                                    </a>
                                </Link>:<Skeleton.Button active size="small" className={styles.skeletonHotelBreadcrumb} /> }                           
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <span>{props.hotelDetails? props.hotelDetails.HotelCategoryName+" "+props.hotelDetails.HotelName+" "+props.hotelDetails.CityName:<Skeleton.Button active size="small" className={styles.skeletonHotelBreadcrumb} />}</span>
                            </Breadcrumb.Item>
                        </Breadcrumb> */}
                        <Row justify="space-between" align="top">
                            <Col
                                xs={24} sm={24} md={24}
                                lg={process.env.THEME_NAME === "TRAVELO" ? 16 : 12}
                                xl={process.env.THEME_NAME === "TRAVELO" ? 16 : 12}
                                >
                                <div className={styles.hotelNameText}>
                                {
                                    props.hotelDetails?                                
                                    <>
                                        <h1 className="xlarge-title">{props.hotelDetails.HotelCategoryName} {props.hotelDetails.HotelName} {props.hotelDetails.CityName}</h1>
                                        <Rating rate={props.hotelDetails.HotelRating}/>
                                        <div className="margin-top font-12">
                                            <EnvironmentOutlined className="margin-end-5"/>
                                            {props.hotelDetails.Address}
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

                                {process.env.THEME_NAME === "TRAVELO" && props.score ?
                                    <div className="hotel-name-point-text-travelo">
                                        <HotelPointTravelo point={props.score.Satisfaction} reviews={props.score.CommentCount} />
                                    </div>
                                    :
                                    <div className="hotel-name-point-text-travelo">
                                        <Skeleton.Button active size="medium" className={styles.skeletonHotelPoint} />
                                    </div>}

                                    {process.env.THEME_NAME === "TRAVELO" && props.hotelDetails ?
                                        <div className={styles.hotelNamePopularAmenities}>
                                            {props.hotelDetails.Facilities.length ? <div className="hotel-name-popular-amenities-subject">امکانات محبوب هتل</div> : null}
                                            <div className={styles.contentHotelNamePopularAmenities}>
                                                <ul>
                                                    {props.hotelDetails && props.hotelDetails.Facilities && props.hotelDetails.Facilities.slice(0, 6).map(item => <li
                                                        key={item.Title}
                                                        className={`${styles.singleAmenities} hotel-name-facility-icon`}
                                                    >
                                                        <Image
                                                            width={24}
                                                            height={24}
                                                            src={item.ImageUrl}
                                                            alt={item.Title}
                                                            title={item.Title}
                                                        />
                                                        <span>{item.Title}</span>
                                                    </li>)}
                                                </ul>
                                            </div>
                                        </div>
                                        :
                                        <div className={styles.hotelNamePopularAmenities}>
                                            <h3>
                                                <Skeleton.Button active size="small" className={styles.skeletonHotelNamePopularAmenities} />
                                            </h3>
                                            <div className={styles.contentHotelNamePopularAmenities}>
                                                <ul>
                                                    <li>
                                                        <Skeleton.Button active size="small" />
                                                    </li>
                                                    <li>
                                                        <Skeleton.Button active size="small"/>
                                                    </li>
                                                    <li>
                                                        <Skeleton.Button active size="small" />
                                                    </li>
                                                    <li>
                                                        <Skeleton.Button active size="small"/>
                                                    </li>
                                                    <li>
                                                        <Skeleton.Button active size="small" />
                                                    </li>
                                                    <li>
                                                        <Skeleton.Button active size="small"/>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    }
                            </Col>
                            <Col 
                                xs={24} sm={24} md={24}
                                lg={process.env.THEME_NAME === "TRAVELO" ? 8 : 12}
                                xl={process.env.THEME_NAME === "TRAVELO" ? 8 : 12}
                                >
                                {process.env.THEME_NAME === "TAJAWAL" && <>
                                    {props.score?
                                        <HotelPoint point={props.score.Satisfaction}
                                        reviews={props.score.CommentCount} />
                                        :
                                        <Skeleton.Button active size="medium" className={styles.skeletonHotelPoint} />}
                                </>}
                                
                                {process.env.THEME_NAME === "TRAVELO" && <>                                    
                                    {(props.mapInfo.lat === 0) && (props.mapInfo.lang === 0)?
                                    <div className="leaflet-travelo">
                                        <Skeleton.Button active size="medium" className={styles.skeletonLeafletTravelo} />
                                    </div>
                                    :
                                    <div className="leaflet-travelo">
                                        <MapWithNoSSR mapInfo={props.mapInfo}/>
                                    </div>}
                                </>}
                                
                                {process.env.THEME_NAME === "TRAVELO" &&<>
                                    {props.attractionsData ?
                                        props.attractionsData.length === 0 ? null :
                                            <div className={styles.hotelNameAattractions}>
                                                <div className="hotel-name-attractions-subject">{t('hotel-distance-to-attractions')}</div>
                                                <div className={styles.contantHotelNameAattractions}>
                                                    {props.attractionsData.slice(0, 4).map(item=><div key={item.AttractionName}>
                                                        <Row justify="space-between" gutter={[20,0]} className="margin-top-small">
                                                            <Col><span><AimOutlined /> {t('distance-to')}{item.AttractionName}</span></Col>
                                                            <Col><span>{item.DurationText} {t('with-car')}</span></Col>
                                                        </Row>
                                                    </div>)}
                                                </div>
                                            </div> 
                                        : 
                                        <div className={styles.hotelNameAattractions}>
                                            <h3>
                                                <Skeleton.Button active size="small" className={styles.skeletonHotelNamePopularAmenities} />
                                            </h3>
                                            <div className={styles.contantHotelNameAattractions}>
                                                <Row justify="space-between" gutter={[20,0]} className="margin-top-small">
                                                    <Col><Skeleton.Button active size="small"/></Col>
                                                    <Col><Skeleton.Button active size="small"/></Col>
                                                </Row>
                                                <Row justify="space-between" gutter={[20,0]} className="margin-top-small">
                                                    <Col><Skeleton.Button active size="small"/></Col>
                                                    <Col><Skeleton.Button active size="small"/></Col>
                                                </Row>
                                                <Row justify="space-between" gutter={[20,0]} className="margin-top-small">
                                                    <Col><Skeleton.Button active size="small"/></Col>
                                                    <Col><Skeleton.Button active size="small"/></Col>
                                                </Row>
                                            </div>
                                        </div>
                                    }
                                </>}
                            </Col>
                        </Row>
                    </div>
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
  
export default withTranslation('common')(HotelName)
