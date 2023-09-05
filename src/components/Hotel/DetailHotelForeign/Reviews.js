import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation, Link, i18n } from '../../../../i18n'
import { MessageFilled, CheckOutlined, EnvironmentOutlined } from '@ant-design/icons';

import styles from '../../../styles/Hotel.module.css'

class Reviews extends React.Component {
    render() {
        const { t } = this.props;
        return (
            <div
                className={`${styles.reviews} ${process.env.THEME_NAME === "TRAVELO" && styles.reviewsTravelo}`}
                id="anchorreviews"
                >
                <div className={styles.container}>
                    <div className={styles.subjectReviews}>
                        {t("suggestion")}
                    </div>
                    <div className={styles.contentReviews}>
                        <div className={styles.hotelReviews}>
                            <div className={styles.hotelGuestReviews}>
                                <div className={styles.hotelPointText}>
                                    {t("excellent")}
                                    <br/>
                                    <span>{t("suggest-122")}</span>
                                </div>
                                <div className={styles.hotelPointIcon}>
                                    <MessageFilled />
                                    <span className={styles.hotelPointResult}>8.8</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.mainReviews}>
                            <div className={styles.topReview}>
                                <div className={styles.subjectTopReview}>
                                    {t("best-suggestion")}
                                </div>
                                <div className={styles.contentTopReview}>
                                    {t("suggest1")}
                                </div>
                            </div>
                            <div className={styles.goodToKnow}>
                                <div className={styles.subjectGoodToKnow}>
                                   {t("good-to-know")}
                                </div>
                                <div className={styles.contentGoodToKnow}>
                                    <ul>
                                        <li>
                                            <CheckOutlined />
                                            <span>{t("best-market")}</span>
                                        </li>
                                        <li>
                                            <CheckOutlined />
                                            <span>{t("best-service")}</span>
                                        </li>
                                        <li>
                                            <CheckOutlined />
                                            <span>{t("clean-room")}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <h4 className={styles.subjectGuestReviews}>{t("user-suggestions")}</h4>
                        <div className={styles.listGuestReviews}>
                            <div className={styles.cardGuestReviews}>
                                <div className={styles.detailCardGuestReviews}>
                                    <div className={styles.nameGuest}>
                                        زهرامحمدی رز
                                    </div>
                                    <div className={styles.locationGuest}>
                                        <EnvironmentOutlined />
                                        تهران
                                    </div>
                                    <div className={styles.pointGuest}>
                                        امتیاز ۹ از ۱۰
                                    </div>
                                </div>
                                <div className={styles.textCardGuestReviews}>
                                {t("suggest2")}
                                </div>
                            </div>
                            <div className={styles.cardGuestReviews}>
                                <div className={styles.detailCardGuestReviews}>
                                    <div className={styles.nameGuest}>
                                        زهرامحمدی رز
                                    </div>
                                    <div className={styles.locationGuest}>
                                        <EnvironmentOutlined />
                                        تهران
                                    </div>
                                    <div className={styles.pointGuest}>
                                        امتیاز ۹ از ۱۰
                                    </div>
                                </div>
                                <div className={styles.textCardGuestReviews}>
                                    {t("suggest2")}
                                </div>
                            </div>
                            <div className={styles.cardGuestReviews}>
                                <div className={styles.detailCardGuestReviews}>
                                    <div className={styles.nameGuest}>
                                        زهرامحمدی رز
                                    </div>
                                    <div className={styles.locationGuest}>
                                        <EnvironmentOutlined />
                                        تهران
                                    </div>
                                    <div className={styles.pointGuest}>
                                        امتیاز ۹ از ۱۰
                                    </div>
                                </div>
                                <div className={styles.textCardGuestReviews}>
                                {t("suggest2")}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Reviews.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
Reviews.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(Reviews)
