import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withTranslation, i18n } from '../../../../i18n';
import { Button, Row, Col, Skeleton } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic'

import styles from '../../../styles/Hotel.module.css'
import { DomesticHotelV4Search } from '../../../actions';

const SimilarHotelsV4Item = dynamic(() => import('./SimilarHotelsV4Item'));

const SimilarHotelsV4 = props => {
    const { t, hotelsArray, checkin, checkout } = props;

    let hotelsArrayLength;
    if (hotelsArray) {
        hotelsArrayLength = hotelsArray.length
    }

    const [displayAll, setDisplayAll] = useState(false);
    const [PricedResponse, setPricedResponse] = useState();
    const [loading, setLoading] = useState(true);

    const similarHotels = hotelsArray?.map(hotelItem => ({
        ...hotelItem,
        boardPriceFrom: loading ? 'loading' : undefined,
        salePriceFrom: loading ? 'loading' : undefined,
        averagePrice: loading ? 'loading' : undefined
    })
    )

    if (PricedResponse?.hotels) {
        similarHotels = hotelsArray.map(hotelItem => {
            const pricedItem = PricedResponse.hotels.find(item => item.id === hotelItem.HotelId);
            return ({
                ...hotelItem,
                boardPriceFrom: pricedItem?.boardPrice || undefined,
                salePriceFrom: pricedItem?.salePrice || undefined,
                averagePrice: pricedItem?.averagePrice || undefined
            });
        }).filter(item => item.salePriceFrom);
    }

    useEffect(() => {
        const fetchData = async () => {
            if (hotelsArrayLength && checkin && checkout) {
                const searchedHotelsId = hotelsArray.map(hotelItem => hotelItem.HotelId);
                let params = { "hotelIds": searchedHotelsId, "checkIn": checkin, "checkOut": checkout };
                const priceResponse = await DomesticHotelV4Search(params);
                if (priceResponse.data) {
                    setPricedResponse(priceResponse.data.result);
                }
                setLoading(false);
            }
        }
        fetchData();

    }, [hotelsArrayLength, checkin, checkout]);


    const toggleDisplayAll = () => {
        setDisplayAll(prevState => !prevState);
    }

    return (
        <div className={styles.similarHotels}>
            {!similarHotels ? (
                <div className={styles.container}>
                    <div className={styles.subjectSimilarHotels}>
                        <h3>{t('similar-hotels')}</h3>
                        <span>{t('you-might-be-interested-this-hotels')}</span>
                    </div>
                    <div className={styles.contentSimilarHotels}>
                        <Row gutter={[20, 20]}>
                            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                                <div className={styles.singleSimilarHotels}>
                                    <div className={styles.imageSimilarHotels}>
                                        <Skeleton.Image className={styles.imageSimilarHotelsSkeleton} />
                                    </div>
                                    <div className={styles.detailSimilarHotels}>
                                        <div className={styles.mainDetail}>
                                            <Skeleton.Button active size="medium" className={styles.nameSimilarHotelsSkeleton} />
                                            <Skeleton.Button active size="small" className={styles.ratingSimilarHotelsSkeleton} />
                                            <Skeleton.Button active size="small" className={styles.addressSimilarHotelsSkeleton} />
                                        </div>
                                        <div className={styles.moreDetail}>
                                            <Skeleton.Input active size="large" className={styles.btnSimilarHotelsSkeleton} />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                                <div className={styles.singleSimilarHotels}>
                                    <div className={styles.imageSimilarHotels}>
                                        <Skeleton.Image className={styles.imageSimilarHotelsSkeleton} />
                                    </div>
                                    <div className={styles.detailSimilarHotels}>
                                        <div className={styles.mainDetail}>
                                            <Skeleton.Button active size="medium" className={styles.nameSimilarHotelsSkeleton} />
                                            <Skeleton.Button active size="small" className={styles.ratingSimilarHotelsSkeleton} />
                                            <Skeleton.Button active size="small" className={styles.addressSimilarHotelsSkeleton} />
                                        </div>
                                        <div className={styles.moreDetail}>
                                            <Skeleton.Input active size="large" className={styles.btnSimilarHotelsSkeleton} />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                                <div className={styles.singleSimilarHotels}>
                                    <div className={styles.imageSimilarHotels}>
                                        <Skeleton.Image className={styles.imageSimilarHotelsSkeleton} />
                                    </div>
                                    <div className={styles.detailSimilarHotels}>
                                        <div className={styles.mainDetail}>
                                            <Skeleton.Button active size="medium" className={styles.nameSimilarHotelsSkeleton} />
                                            <Skeleton.Button active size="small" className={styles.ratingSimilarHotelsSkeleton} />
                                            <Skeleton.Button active size="small" className={styles.addressSimilarHotelsSkeleton} />
                                        </div>
                                        <div className={styles.moreDetail}>
                                            <Skeleton.Input active size="large" className={styles.btnSimilarHotelsSkeleton} />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            ) : similarHotels.length > 0 ? (
                <div className={styles.container}>
                    <div className={styles.subjectSimilarHotels}>
                        <h3>{t('similar-hotels')}</h3>
                        <span>{t('you-might-be-interested-this-hotels')}</span>
                    </div>
                    <div className={styles.contentSimilarHotels}>
                        <Row gutter={[20, 20]}>
                            {similarHotels.slice(0, 3).map(item => <SimilarHotelsV4Item item={item} key={item.HotelName} checkin={checkin} checkout={checkout} CityId={props.CityId} />)}
                            {displayAll && similarHotels.slice(3, similarHotels.length > 6 ? 6 : similarHotels.length).map(item => <SimilarHotelsV4Item item={item} key={item.HotelName} CityId={props.CityId} />)}
                        </Row>
                    </div>
                    {
                        ((!displayAll) && similarHotels && similarHotels.length > 3) &&
                        <div
                            className={`${styles.moreSimilarHotels} ${process.env.THEME_NAME === "TRAVELO" && styles.moreSimilarHotelsTravelo}`}
                        >
                            <Button htmlType="button" onClick={toggleDisplayAll}>{t('other-similar-hotels')}</Button>
                        </div>
                    }
                </div>
            ) : (
                <div className={styles.container}>
                    <div className={styles.subjectSimilarHotels}>
                        <h3>{t("similar-hotels")}</h3>
                    </div>
                    <div className={styles.noRoomsAvailableCard}>
                        <div className="text-right">
                            <ExclamationCircleOutlined /> {t('no-similar-hotels')}
                        </div>
                    </div>
                </div>
            )

            }
        </div>
    )
}

SimilarHotelsV4.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})

SimilarHotelsV4.propTypes = {
    t: PropTypes.func.isRequired,
}

export default withTranslation('common')(SimilarHotelsV4)
