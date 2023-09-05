import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation, Link, i18n } from '../../../../i18n'
import dynamic from 'next/dynamic'

import styles from '../../../styles/Home.module.css'
import { HotelIcon, UserOutlineIcon, DateOutlineIcon } from '../../UI/Icons'

const Logo = dynamic(() => import('../../Layout/Logo'))

class HotelVoucher extends React.Component {
    render() {
        const { t } = this.props;
        return (
            <div className={styles.hotelVoucher}>
                <div className={styles.container}>
                    <div className={styles.contantHotelVoucher}>
                        <div className={styles.headHotelVoucher}>
                            <div className={styles.topHead}>
                                <Logo/>
                                <div className={styles.detailTopHead}>
                                    <span>
                                        {t("reserve-number")}  :
                                        <b> ۲۵۴۳۹ </b>
                                    </span>
                                    <span>
                                        {t("reserve-date-time")}
                                    </span>
                                </div>
                            </div>
                            <div className={styles.bottomHead}>
                                <div>
                                    <span>{t("reserver-name")} : </span>
                                    <b> رامین درخشان </b>
                                </div>
                                <div>
                                    <span>{t("national-code")} : </span>
                                    <b> 1234567890 </b>
                                </div>
                                <div>
                                    <span>{t("phone-number")}</span>
                                    <b> 09123456789 </b>
                                </div>
                                <div>
                                    <span>{t("email")}</span>
                                    <b> ramin.derakhshan@gmail.com </b>
                                </div>
                            </div>
                        </div>
                        <div className={styles.mainHotelVoucher}>
                            <div className={styles.passengerInfo}>
                                <h4>{t("passengers-name")}</h4>
                                <span>رامین درخشان <b>({t("headman")})</b></span>
                                <span>صادق درخشان</span>
                                <span>امین درخشان</span>
                            </div>
                            <div className={styles.hotelInfo}>
                                <div className={styles.contantHotelInfo}>
                                    <div>
                                        <h2>
                                            {t("parsian-hotel-enghelab")}
                                            <b>5 {t("star")}</b>
                                        </h2>
                                        <div className={styles.address}>{t("parsian-hotel-enghelab-address")}</div>
                                        <div className={styles.passengerCount}>
                                            <div className={styles.icon}>
                                                <UserOutlineIcon/>
                                            </div>
                                            <span>۲ {t('adult')} {t('and')} ۱ {t('child')}</span>
                                        </div>
                                        <div className={styles.date}>
                                            <div className={styles.icon}>
                                                <DateOutlineIcon/>
                                            </div>
                                            <span>{t("voucher-date1")}</span>
                                        </div>
                                        <div className={styles.room}>
                                            <div className={styles.icon}>
                                                <HotelIcon/>
                                            </div>
                                            <span>{t("vip-2-bed")}</span>
                                        </div>
                                    </div>
                                    <div className={styles.imageHotel}>
                                        <img src="https://cdn.safaraneh.com/Images/Accommodations/fa/tehran-parsian-enghelab-hotel-facade.jpg" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.footerHotelVoucher}>
                            <div className={styles.content}>
                                <div className={styles.support}>
                                    <span>{t("backup")} : 02179515000</span>
                                    <span> {t("website")} : safaraneh.com</span>
                                    <span>{t('email')} : support@safaraneh.com</span>
                                </div>
                                <div className={styles.prices}>
                                    <div>
                                        <span>{t("sum")}</span>
                                        <b>9,777,300 {t('rial')}</b>
                                    </div>
                                    <div>
                                        <span>{t("room-discount")}</span>
                                        <b>2,377,300 {t('rial')}</b>
                                    </div>
                                    <div>
                                        <span>{t("total-price")}</span>
                                        <b>7,400,000 {t('rial')}</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

HotelVoucher.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
HotelVoucher.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(HotelVoucher)
