import React from 'react';
import PropTypes from 'prop-types';
import { Link, withTranslation, i18n } from '../../../../i18n';
import { Button, Col, Tooltip } from 'antd';
import { EnvironmentOutlined, LeftOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic'

import defaultHotelImage from '../../../assets/defaultHotel.svg';
import styles from '../../../styles/Hotel.module.css';

const Rating = dynamic(() => import('../../UI/Rating/Rating'))


const SimilarHotelsV4Item = props => {

    const { item, t } = props;

    const linkUrl = `${item.Url}/location-${props.CityId}/checkin-${props.checkin}/checkout-${props.checkout}`;

    function numberWithCommas(x) {
        if (x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        } else {
            return "0";
        }
    }

    return (
        <Col xs={24} sm={12} md={8} lg={8} xl={8} key={item.HotelName}>
            <div
                className={`${styles.singleSimilarHotels} ${process.env.THEME_NAME === "TRAVELO" && styles.singleSimilarHotelsTravelo}`}
            >
                <div className={styles.imageSimilarHotels} style={{ "backgroundImage": `url(${defaultHotelImage})` }}>
                    <Link as={linkUrl} href={linkUrl} >
                        <a target="_blank" rel="noreferrer" onContextMenu={(e) => e.preventDefault()}>
                            {item.ImageUrl && <img src={item.ImageUrl} alt={item.ImageTitle} title={item.ImageTitle} />}
                        </a>
                    </Link>
                </div>
                <div className={styles.detailSimilarHotels}>
                    <div className={styles.mainDetail}>
                        <Link as={linkUrl} href={linkUrl} >
                            <a target="_blank" rel="noreferrer" onContextMenu={(e) => e.preventDefault()}>
                                <h4>{item.HotelTypeName} {item.HotelName} {item.CityName}</h4>
                            </a>
                        </Link>
                        <div className={styles.starSimilarHotels}>
                            <Rating rate={item.HotelRating} />
                        </div>
                        <div className={styles.addressSimilarHotels}>
                            <EnvironmentOutlined />
                            {item.Address}
                        </div>
                    </div>

                    <div className={styles.moreDetail}>
                        <div>
                            {item.salePriceFrom === 'loading' ?
                                <div className='margin-bottom-15'><span className="small-loading" /></div> : <>
                                    {(item.boardPriceFrom > item.salePriceFrom) && <span className="old-price no-margin">
                                        {numberWithCommas(item.boardPriceFrom)} {t('rial')}
                                    </span>}
                                    {(item.salePriceFrom && item.salePriceFrom > 0) ?
                                        <Tooltip placement="topLeft" title={
                                            <div>
                                                {item.boardPriceFrom >= 10000 || item.salePriceFrom >= 10000 ?
                                                    <>
                                                        <div>
                                                            <span>{numberWithCommas((item.salePriceFrom / props.nights).toFixed(0))}</span>
                                                            <span> {t('rial')} </span>
                                                        </div>
                                                        <small>
                                                            {t("Avg-per-night")}
                                                        </small>
                                                    </> : <div className="new-price">
                                                        <span>قیمت نیازمند استعلام است</span>
                                                    </div>}
                                            </div>
                                        }>
                                            <div className={styles.priceSimilarHotels}>
                                                {item.boardPriceFrom >= 10000 || item.salePriceFrom >= 10000 ?
                                                    <span> {numberWithCommas(item.salePriceFrom)} {t('rial')} </span>
                                                    : <div className="new-price">
                                                        <span style={{ color: "red", fontSize: "12px" }}>قیمت نیازمند استعلام است</span>
                                                    </div>}
                                                {item.boardPriceFrom >= 10000 || item.salePriceFrom >= 10000 ?
                                                    <span className={styles.perNightSimilarHotels}>{t('price-start-from')} {props.nights} {t('night')}</span>
                                                    : null}
                                            </div>
                                        </Tooltip>
                                        : null}
                                </>}

                            <Link as={linkUrl} href={linkUrl} >
                                <a target="_blank" rel="noreferrer">
                                    <Button
                                        type="primary"
                                        block
                                        htmlType="button"
                                        className={`red-button min-width-150 ${process.env.THEME_NAME === "TRAVELO" && "antd-btn-select-room-travelo"}`}
                                    >
                                        {item.boardPriceFrom >= 10000 || item.salePriceFrom >= 10000 ?
                                            <>{t("see-rooms")}</>
                                            : "درخواست رزرو"}
                                        <LeftOutlined className={styles.hotelCardButtonIcon} />
                                    </Button>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Col>
    )
}

SimilarHotelsV4Item.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})

SimilarHotelsV4Item.propTypes = {
    t: PropTypes.func.isRequired,
}

export default withTranslation('common')(SimilarHotelsV4Item)