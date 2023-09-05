import React from 'react';
import PropTypes from 'prop-types';
import { Link, withTranslation, i18n } from '../../../../../i18n';
import { Button, Row, Col, Tag, Skeleton,Tooltip } from 'antd';
import { LeftOutlined ,RightOutlined} from '@ant-design/icons';
import defaultHotelImage from "../../../../assets/defaultHotel.svg";
import dynamic from 'next/dynamic'

import styles from '../../../../styles/Hotel.module.css';

const Rating = dynamic(() => import('../../../UI/Rating/Rating'))

class HotelListCard extends React.Component {

    constructor(props) {
        super(props);
    }   
    render() {
        const { t } = this.props;
        function numberWithCommas(x) {
            if (x){
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }else{
                return "0";
            }
        }
        return (
            <>
            {this.props.loading?
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
                            <div >
                                <Skeleton active className={styles.skeletonContentHotelCard} />
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
                                <Skeleton active className={styles.skeletonContentHotelCard} />
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
                                <Skeleton active className={styles.skeletonContentHotelCard} />
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
                                <Skeleton active className={styles.skeletonContentHotelCard} />
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
                                <Skeleton active className={styles.skeletonContentHotelCard} />
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
                                <Skeleton active className={styles.skeletonContentHotelCard} />
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
                                <Skeleton active className={styles.skeletonContentHotelCard} />
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
           
            this.props.hotelList.map(item =><Row key={item.id} className={`hotel-list-item ${process.env.THEME_NAME === "TRAVELO" && "hotel-list-item-travelo"}`}>
                    <Col xs={24} sm={6} md={6} lg={6} xl={6} className={item.mainPhoto?"hotel-image":"hotel-image default-hotel-image"} style={{'backgroundImage':`url(${item.mainPhoto?item.mainPhoto:defaultHotelImage})`}} >
                    <Link as={`/hotel-foreign/id=${item.id+"/"+this.props.searchedInfo}`} href={`/hotel/hotel-foreign/id=${item.id+"/"+this.props.searchedInfo}`}>
                            <a target="_blank" rel="noreferrer" className="hotel-list-thumbnail-link"></a>
                        </Link>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12} className="hotel-item-content" >
                        <Row gutter={[10,10]}>
                            <Col>
                                <Link as={`/hotel-foreign/id=${item.id+"/"+this.props.searchedInfo}`} href={`/hotel/hotel-foreign/id=${item.id+"/"+this.props.searchedInfo}`}>
                                    <a className="hotel-name underline-on-hover inherit-color" target="_blank" rel="noreferrer">
                                    <span>{item.name}</span>
                                    </a>
                                </Link>
                            </Col>
                            <Col><Rating rate={item.rating}/></Col>
                            {/* <Col><Tag className="mx-0">{item.HotelTypeName}</Tag></Col> */}

                        </Row>
                        <div className='hotel-address margin-bottom'>
                            {item.address}
                        </div>
                        <ul className="tag-list margin-bottom-10">
                            {item.boards.map(boardItem =><li key={boardItem.name} className="margin-end-5">{boardItem.description || boardItem.name}</li>)}
                        </ul>
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
                        <Row gutter={[6,6]}>
                            {item.features.map(facilityItem =><Col key={facilityItem.name}>
                                <Tag className={`${styles.facilityListItem}`}>
                                    {facilityItem.name}
                                </Tag>
                            </Col>)}
                        </Row>
                    </Col>
                    <Col xs={24} sm={6} md={6} lg={6} xl={6} className="hotel-item-footer">
                        
                        <div />
                        {/* {item.Satisfaction?
                        <HotelPoint point={item.Satisfaction} reviews={item.TotalRowCount} />:
                        <div/>
                        } */}
                        <div>
                            <div className={styles.hotelCardPriceDisplay}>
                                <div className="prices-block">
                                    {(item.regularPrice === item.salePrice) ||
                                    <div className="old-price">
                                        <span>{numberWithCommas(item.regularPrice)}</span>
                                        <span> {t('rial')} </span>
                                    </div>
                                    }
                                    <Tooltip placement="topLeft" title={
                                        <div>
                                            <div>
                                                <span>{numberWithCommas((item.salePrice/this.props.nights).toFixed(0))}</span>
                                                <span> {t('rial')} </span>
                                            </div>
                                            <small>
                                                {t("Avg-per-night")}
                                            </small>
                                        </div>
                                    }>
                                        <div className={`new-price ${item.cheapestBoard.code === "BB" ? "new-price-green" : null}`}>
                                            <span>{numberWithCommas(item.salePrice)}</span>
                                            <span> {t('rial')} </span>
                                        </div>
                                    </Tooltip>
                                </div>
                                <div className="price-description text-end">
                                    {t("price-for-nights", { nights: this.props.nights })}
                                </div>
                            </div>
                            <div className={`${styles.cheapestBoardBB} text-end`}>
                                {item.cheapestBoard.code === "BB" ?<span>{t("price-includes-breakfast")}</span>:null}
                            </div>
                            
                            <Link as={`/hotel-foreign/id=${item.id+"/"+this.props.searchedInfo}`} href={`/hotel/hotel-foreign/id=${item.id+"/"+this.props.searchedInfo}`}>
                                <a target="_blank" rel="noreferrer">
                                    <Button
                                        type="primary"
                                        block htmlType="button"
                                        className={`"red-button" ${process.env.THEME_NAME === "TRAVELO" && "button-travelo"}`}
                                        style={{ height: 40 }}
                                        >
                                        {t("see-rooms")}
                                        {i18n.language === "us" ? <RightOutlined className={styles.hotelCardButtonIcon} />:<LeftOutlined className={styles.hotelCardButtonIcon} />}
                                    </Button> 
                                </a>
                            </Link>
                            {/* <Link as={`/hotels-foreign/details?Id=${item.id}&Adults=${1}&Children=${2}&Ages=${5,3}&Checkin=${"checkin"}&Checkout=${"checkout"}`} href={`/hotels-foreign/details?Id=${item.id}&Adults=${1}&Children=${2}&Ages=${5,3}&Checkin=${"checkin"}&Checkout=${"checkout"}`}>
                                <a>
                                    <Button type="primary" block htmlType="button" className="red-button">
                                    {t("see-rooms")}
                                        <LeftOutlined className={styles.hotelCardButtonIcon} />
                                    </Button> 
                                </a>
                            </Link> */}
                        </div>
                    </Col>
                </Row>)
            }
            </>
        )
    }
}

HotelListCard.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
HotelListCard.propTypes = {
    t: PropTypes.func.isRequired,
}

export default withTranslation('common')(HotelListCard)