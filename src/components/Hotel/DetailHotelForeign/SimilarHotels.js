import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation, Link, i18n } from '../../../../i18n'
import { Button, Row, Col } from 'antd'
import { StarFilled, EnvironmentOutlined } from '@ant-design/icons'

import styles from '../../../styles/Hotel.module.css'

class SimilarHotels extends React.Component {
    render() {
        const { t } = this.props;
        return (
            <div className={styles.similarHotels} id="anchorsimilarhotels">
                <div className={styles.container}>
                    <div className={styles.subjectSimilarHotels}>
                        <h3>{t("similar-hotel")}</h3>
                        <span>{t("you-might-be-interested-this-hotels")}</span>
                    </div>
                    <div className={styles.contentSimilarHotels}>
                        <Row>
                            <Col span={8}>
                                <div
                                    className={`${styles.singleSimilarHotels} ${process.env.THEME_NAME === "TRAVELO" && styles.singleSimilarHotelsTravelo}`}
                                    >
                                    <div className={styles.imageSimilarHotels} onContextMenu={(e)=> e.preventDefault()}>
                                        <img src="https://cdn.mehrbooking.net/mehrbooking/Images/Hotels/tehran-laleh-hotel-facade-1.jpg" alt="" />
                                    </div>
                                    <div className={styles.detailSimilarHotels}>
                                        <div className={styles.mainDetail}>
                                            <h4>{t("parsian-hotel")}</h4>
                                            <div className={styles.starSimilarHotels}>
                                                <StarFilled />
                                                <StarFilled />
                                                <StarFilled />
                                                <StarFilled />
                                                <StarFilled />
                                            </div>
                                            <div className={styles.addressSimilarHotels}>
                                                <EnvironmentOutlined />
                                                {t("parsian-hotel-address")}
                                            </div>
                                        </div>
                                        <div className={styles.moreDetail}>
                                            <div>
                                                <div className={styles.priceSimilarHotels}>
                                                    <span>{t("parsian-hotel-address-price")}</span>
                                                    <span className={styles.perNightSimilarHotels}>{t("parsian-hotel-address-price-night")}</span>
                                                </div>
                                                <div className={styles.btnSimilarHotels}>
                                                    <Button type="primary" danger>{t("please-reserve")}</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div
                                    className={`${styles.singleSimilarHotels} ${process.env.THEME_NAME === "TRAVELO" && styles.singleSimilarHotelsTravelo}`}
                                    >
                                    <div className={styles.imageSimilarHotels}>
                                        <img src="https://cdn.mehrbooking.net/mehrbooking/Images/Hotels/tehran-laleh-hotel-facade-1.jpg" alt=""  onContextMenu={(e)=> e.preventDefault()}/>
                                    </div>
                                    <div className={styles.detailSimilarHotels}>
                                        <div className={styles.mainDetail}>
                                            <h4>{t("parsian-hotel")}</h4>
                                            <div className={styles.starSimilarHotels}>
                                                <StarFilled />
                                                <StarFilled />
                                                <StarFilled />
                                                <StarFilled />
                                                <StarFilled />
                                            </div>
                                            <div className={styles.addressSimilarHotels}>
                                                <EnvironmentOutlined />
                                                {t("parsian-hotel-address")}
                                            </div>
                                        </div>
                                        <div className={styles.moreDetail}>
                                            <div>
                                                <div className={styles.priceSimilarHotels}>
                                                    <span>{t("parsian-hotel-address-price")}</span>
                                                    <span className={styles.perNightSimilarHotels}>{t("parsian-hotel-address-price-night")}</span>
                                                </div>
                                                <div className={styles.btnSimilarHotels}>
                                                    <Button type="primary" danger>{t("please-reserve")}</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div
                                    className={`${styles.singleSimilarHotels} ${process.env.THEME_NAME === "TRAVELO" && styles.singleSimilarHotelsTravelo}`}
                                    >
                                    <div className={styles.imageSimilarHotels}>
                                        <img src="https://cdn.mehrbooking.net/mehrbooking/Images/Hotels/tehran-laleh-hotel-facade-1.jpg" alt="" onContextMenu={(e)=> e.preventDefault()} />
                                    </div>
                                    <div className={styles.detailSimilarHotels}>
                                        <div className={styles.mainDetail}>
                                            <h4>{t("parsian-hotel")}</h4>
                                            <div className={styles.starSimilarHotels}>
                                                <StarFilled />
                                                <StarFilled />
                                                <StarFilled />
                                                <StarFilled />
                                                <StarFilled />
                                            </div>
                                            <div className={styles.addressSimilarHotels}>
                                                <EnvironmentOutlined />
                                                {t("parsian-hotel-address")}
                                            </div>
                                        </div>
                                        <div className={styles.moreDetail}>
                                            <div>
                                                <div className={styles.priceSimilarHotels}>
                                                    <span>{t("parsian-hotel-address-price")}</span>
                                                    <span className={styles.perNightSimilarHotels}>{t("parsian-hotel-address-price-night")}</span>
                                                </div>
                                                <div className={styles.btnSimilarHotels}>
                                                    <Button type="primary" danger>{t("please-reserve")}</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className={styles.moreSimilarHotels}>
                        <Button>{t("other-similar-hotels")}</Button>
                    </div>
                </div>
            </div>
        )
    }
}

SimilarHotels.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
SimilarHotels.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(SimilarHotels)
