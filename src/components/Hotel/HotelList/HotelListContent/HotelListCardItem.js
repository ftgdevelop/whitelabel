import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import { Link, withTranslation, i18n } from '../../../../../i18n';
import styles from '../../../../styles/Hotel.module.css'
import {GetHotelById} from '../../../../actions'
import { Button, Row, Col,Tag,Tooltip } from 'antd';
import { LeftOutlined,ClockCircleOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic'

import defaultHotelImage from "../../../../assets/defaultHotel.svg";
import parking from "../../../../assets/parking.svg";
import meal from "../../../../assets/cafe.svg";
import wifi from "../../../../assets/wifi.svg";

const Rating = dynamic(() => import('../../../UI/Rating/Rating'))
const HotelPoint = dynamic(() => import('../../../UI/HotelPoint/HotelPoint'))
const HotelPointTravelo = dynamic(() => import('../../../UI/HotelPoint/HotelPointTravelo'))
const HotelListImageGallary = dynamic(() => import('./HotelListImageGallary'))

const HotelListCardItem = props => {
    const { t } = props;

    // const [hotelDetailGallery,setHotelDetailGallery] = useState([]);

    function numberWithCommas(x) {
        if (x){
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }else{
            return "0";
        }
    }
    
    const calulateDiscount = (sale,board) => {
        let discountPercentage,fixedDiscountPercentage;
        discountPercentage = ((board-sale)*100/board);
        if (discountPercentage > 0 && discountPercentage < 1){
            fixedDiscountPercentage = 1;
        } else {
            fixedDiscountPercentage = discountPercentage.toFixed(0);
        }
        return (fixedDiscountPercentage);
    }

    // const fetchHotelDetailsData = async () => {
    //     const response = await GetHotelById(props.item.HotelId);
    //     if(response.data) {
    //         let firstImage = {
    //             Image : props.item.ImageUrl,
    //             Alt: props.item.ImageAlt,
    //             Image: props.item.ImageUrl,
    //             ImageThumb: props.item.ImageUrl,
    //             Priority: props.item.Priority,
    //             Title: props.item.ImageTitle
    //         };
    //         let otherImage = [firstImage]
    //         // let otherImage = [firstImage, ...response.data.Gallery]
    //         setHotelDetailGallery(otherImage)
    //     }
    // }

    // useEffect(()=>{
    //     fetchHotelDetailsData();
    // },[]);
    
    return (
        <Row 
            key={props.item.HotelId}
            className={`hotel-list-item ${process.env.THEME_NAME === "TRAVELO" && "hotel-list-item-travelo"}`}
            >
            <Link as={props.item.Url+"/"+props.searchedInfo} href={props.item.Url+"/"+props.searchedInfo}>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}
                    className={props.item.ImageUrl?"hotel-image":"hotel-image default-hotel-image"}
                    >
                    <a target="_blank" rel="noreferrer" className="hotel-list-thumbnail-link">
                        {/* <HotelListImageGallary hotelDetailGallery={hotelDetailGallery}/> */}
                        <div className="image-slide-gallety">
                            <img src={props.item.ImageUrl} alt={props.item.ImageAlt} title={props.item.ImageTitle} onContextMenu={(e)=> e.preventDefault()}/>
                        </div>

                        {process.env.THEME_NAME === "TRAVELO" && props.item.IsPromotion &&
                            <span className="hotel-item-promotion">پیشنهاد ویژه</span>}
                    </a>
                </Col>
            </Link>
            <Col xs={24} sm={10} md={10} lg={10} xl={10} className="hotel-item-content" >
                <Row gutter={[10,10]}>
                    <Col>
                        <Link as={props.item.Url+"/"+props.searchedInfo} href={props.item.Url+"/"+props.searchedInfo}>
                            <a className="hotel-name underline-on-hover inherit-color" target="_blank" rel="noreferrer">
                            <span>{props.item.HotelCategoryName} {props.item.HotelName} {props.item.CityName}</span>
                            </a>
                        </Link>
                    </Col>
                    <Col><Rating rate={props.item.HotelRating}/></Col>
                    <Col>
                        <Tag
                            className={`mx-0 hotel-type ${process.env.THEME_NAME === "TRAVELO" && "hotel-type-travelo"}`}
                            >
                                {props.item.HotelTypeName}
                        </Tag>
                    </Col>
                </Row>
                <div
                    className={`hotel-address ${process.env.THEME_NAME === "TRAVELO" && "hotel-address-travelo"}`}
                    >
                    {props.item.Address}
                </div>

                {/*{process.env.THEME_NAME === "TRAVELO" && props.item.BriefDescription &&
                    <div className='hotel-brief-description margin-bottom'>
                         {props.item.BriefDescription
                            .replace('&zwnj;','')
                            .replace('.&nbsp;','.')
                            .replace('&rlm;',' ')
                            .replace(' &nbsp;',' ')
                            .replace('&zwnj;','')} 
                    </div>}*/}
                
                {process.env.THEME_NAME === "TRAVELO" && props.item.Satisfaction?
                        <HotelPointTravelo point={props.item.Satisfaction} reviews={props.item.TotalRowCount} /> :
                    <div />}
                
                {props.item.IsCovid ?
                    <div className="alert-info">
                        <span className="hotel-type hotel-type-travelo">اطلاعات ایمنی کووید-۱۹</span>
                    </div> : null}

                {/* <div className={styles.hotelCardNearbyPlaces}>
                    <ul>
                    {item.surroundings.surroundings.map(surroundingItem =>
                    surroundingItem.items.map(i=> <li>
                        <AimOutlined />
                        {i.name}:{i.distance}
                        </li>)
                    )}
                </ul> 
                </div> */}
                {process.env.THEME_NAME === "TAJAWAL" &&
                    <Row gutter={[6,6]}>
                        {props.item.Facilities.filter(facility => (facility.Keyword ==="Internet" ||  facility.Keyword ==="Parking" || facility.Keyword ==="Meal")  ).map((facilityItem ,index)=><Col key={index}><Tag className="mx-0" color="green">
                            {(facilityItem.Keyword ==="Internet")&&<img src={wifi} alt="wifi" className="facility-icon" />}
                            {(facilityItem.Keyword ==="Parking")&&<img src={parking} alt="parking" className="facility-icon" />}
                            {(facilityItem.Keyword ==="Meal")&&<img src={meal} alt="Meal" className="facility-icon" />}
                            {facilityItem.Title}
                        </Tag></Col>)}
                    </Row>}
                {(!props.loadingPrices && !props.item.salePriceFrom )?
                <div className="ui-alert alert-danger margin-top-small padding-5">
                    <ClockCircleOutlined className="alert-icon" />
                    {/* <div className="alert-text">
                        <h5 className="title">{t('There-is-no-price-for-this-hotel')}!</h5>
                        <p className="description">جهت رزرو با شماره <a href="tel:+982179515000" title="telephone">02179515000</a> تماس بگیرید.</p>
                    </div> */}
                    <div className="alert-text">
                        <h5 className="title">{t("you-missed-this-deal")}</h5>
                        <p className="description">{t("we-dont-have-any-available-rooms-for-these-dates")}</p>
                    </div>
                </div>
                :null
                }
            </Col>
            <Col xs={24} sm={6} md={6} lg={6} xl={6}
                className={`hotel-item-footer ${process.env.THEME_NAME === "TRAVELO" && "hotel-item-footer-travelo"}`}
                >
                {props.item.Satisfaction?
                process.env.THEME_NAME === "TAJAWAL" && <HotelPoint point={props.item.Satisfaction} reviews={props.item.TotalRowCount} /> :
                <div/>
                }
                <div className={`${styles.hotleCardPrice} ${styles.hotleCardPriceTravelo}`} >
                    {props.loadingPrices?
                    <>
                        <div>
                            <span className="small-loading" />
                        </div>
                        <small>
                        {t('updating-prices')} 
                        </small>
                    </>
                    :
                        props.item.salePriceFrom?
                            <>
                            <div className={styles.hotelCardPriceDisplay}>
                                {props.nights?
                                <>
                                {(props.item.boardPriceFrom> props.item.salePriceFrom) &&
                                    <span
                                        className={`red-tag margin-bottom-small ${process.env.THEME_NAME === "TRAVELO" && "green-tag-travelo"}`}
                                        >
                                        {calulateDiscount(props.item.salePriceFrom,props.item.boardPriceFrom)}% {t('discount')}
                                    </span>}
                                <div className="prices-block">
                                    {(props.item.boardPriceFrom> props.item.salePriceFrom) && <div className="old-price">
                                        <span>{numberWithCommas(props.item.boardPriceFrom)}</span>
                                        <span> {t('rial')} </span>
                                    </div>}
                                    
                                    <Tooltip placement="topLeft" title={
                                        <div>
                                            {props.item.boardPriceFrom >= 10000 || props.item.salePriceFrom >= 10000 ? <>
                                                <div>
                                                    <span>{numberWithCommas((props.item.salePriceFrom/props.nights).toFixed(0))}</span>
                                                    <span> {t('rial')} </span>
                                                </div>
                                                <small>
                                                    {t("Avg-per-night")}
                                                </small>
                                            </> : <span>قیمت نیازمند استعلام است</span>}
                                        </div>
                                    }>
                                        {props.item.boardPriceFrom >= 10000 || props.item.salePriceFrom >= 10000 ?
                                        <div className="new-price">
                                            <span>{numberWithCommas(props.item.salePriceFrom)}</span>
                                            <span> {t('rial')} </span>
                                        </div> :
                                        <div className="new-price">
                                            <span style={{color:"red",fontSize: "12px"}}>قیمت نیازمند استعلام است</span>
                                        </div>}
                                    </Tooltip>
                                    
                                </div>
                                {props.item.boardPriceFrom >= 10000 || props.item.salePriceFrom >= 10000 ?
                                    <div className="price-description">
                                        {t("price-for-nights", { nights: props.nights })}
                                    </div>
                                    : null}
                                </>                                        
                                :null}

                            </div>
                            <Link as={props.item.Url+"/"+props.searchedInfo} href={props.item.Url+"/"+props.searchedInfo}>
                                <a target="_blank" rel="noreferrer">
                                    <Button
                                        type="primary"
                                        block
                                        htmlType="button"
                                        className={`red-button ${process.env.THEME_NAME === "TRAVELO" && "button-travelo" }`}
                                        >
                                            {props.item.boardPriceFrom >= 10000 || props.item.salePriceFrom >= 10000 ?
                                                <>{t("see-rooms")}</>
                                                : "درخواست رزرو"}
                                        <LeftOutlined className={styles.hotelCardButtonIcon} />
                                    </Button> 
                                </a>
                            </Link>
                            </>
                        :
                        null
                    }
                </div>
            </Col>
        </Row>
    );
}

HotelListCardItem.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
HotelListCardItem.propTypes = {
    t: PropTypes.func.isRequired,
}
    
export default (withTranslation('common'))(HotelListCardItem);
