import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation, Link, i18n } from '../../../../i18n'
import dynamic from 'next/dynamic'

import { StarFilled } from '@ant-design/icons';
import styles from '../../../styles/Home.module.css'
import { BedBookIcon, ServiceRoomIcon, UserIcon, UsersIcon } from '../../UI/Icons'
import { EnvironmentOutlined, MailOutlined, GlobalOutlined } from '@ant-design/icons';

const Logo = dynamic(() => import('../../Layout/Logo'))

class HotelForeignVoucher extends React.Component {
    render() {
        const { t } = this.props;
        return (
            <div className={styles.hotelForeignVoucher}>
                <div className={styles.container}>
                    <div className={styles.headVoucher}>
                        <Logo/>
                        <div className={styles.subjectVoucher}>
                            <h4>{t('voucher-hotel')}</h4>
                            <span>{t("confirm-voucher")}</span>
                        </div>
                    </div>
                    <div className={styles.mainVoucher}>
                        <div className={styles.refrence}>
                            <span>{t("tracking-code")}</span>
                            <b>14719</b>
                        </div>
                        <div className={styles.detail}>
                            <div className={styles.hotelName}>
                                <h3>{t("ireland-ben-ford-hotel")}</h3>
                                <StarFilled />
                                <StarFilled />
                                <StarFilled />
                            </div>
                            <div className={styles.hotelDetail}>
                                <div>
                                    <b>{t("name-family")}</b>
                                    <span>رامین درخشان</span>
                                </div>
                                <div>
                                    <b>{t("phone-number")} : </b>
                                    <span>+۹۱۲۳۴۵۶۷۸۹</span>
                                </div>
                                <div>
                                    <b>{t("email")} : </b>
                                    <span>email@domain.com</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>{t("enter-date")}</th>
                                <th>{t("exit-date")}</th>
                                <th>{t("night-number")}</th>
                                <th>{t("reserve-date")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>۱۳۹۹/۰۷/۱۵</td>
                                <td>۱۳۹۹/۰۷/۱۵</td>
                                <td>۱</td>
                                <td>۱۳۹۹/۰۶/۰۴</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className={styles.service}>
                        <div>
                            <div className={styles.icon}>
                                <BedBookIcon/>
                            </div>
                            <div>
                                <span>{t("room-type")}</span>
                                <b>{t("standard-toeen")}</b>
                            </div>
                        </div>
                        <div>
                            <div className={styles.icon}>
                                <UserIcon/>
                            </div>
                            <div>
                                <span>{t("reserver-name")}</span>
                                <b>رامین درخشان</b>
                            </div>
                        </div>
                        <div>
                            <div className={styles.icon}>
                                <UsersIcon/>
                            </div>
                            <div>
                                <span>{t("number-passengers")}</span>
                                <b>۲ {t("adult")}</b>
                            </div>
                        </div>
                        <div>
                            <div className={styles.icon}>
                                <ServiceRoomIcon/>
                            </div>
                            <div>
                                <span>{t("amenties")}</span>
                                <b>{t("just-room")}</b>
                            </div>
                        </div>
                    </div>
                    <div className={styles.hotelLocation}>
                        <div className={styles.hotelName}>
                            <h3>{t("ireland-ben-ford-hotel")}</h3>
                            <StarFilled />
                            <StarFilled />
                            <StarFilled />
                        </div>
                        <div className={styles.address}>
                            <b>{t("address")} : </b>
                            <span>{t("address-hotel")}</span>
                        </div>
                        <div className={styles.gms}>
                            <b>GMS : </b>
                            <span>52.506933000 - 13.468991000</span>
                        </div>
                    </div>
                    <div className={styles.rulesVoucher}>
                        <div>
                            <img src="https://voucher.imt.as/img/voucher-hotel/problem.png" />
                            <h6>{t("cancelation-policy")}</h6>
                            <b>{t("refundable")}</b>
                        </div>
                        <span>{t("refund-desc")}</span>
                    </div>
                    <div className={styles.remark}>
                        <div>
                            <img src="https://voucher.imt.as/img/voucher-hotel/info.png" />
                            <h6>{t("desc")}</h6>
                        </div>
                        <span>{t("desc-text")}</span>
                    </div>
                    <div className={styles.footerVocher}>
                        <p>
                            {t("pay-via")}
                            <b> HOTELBEDS SWITZERLAND AG </b>
                            {t("pay-via-desc")}
                            {t("tax")} :
                            <b> CHE425060629 </b>
                            {t("ref")} :
                            <b> 202-3501342 </b>
                        </p>
                        <div className={styles.support}>
                            <div>
                                <h3>{t("contact-us")}</h3>
                                <div className={styles.contact}>
                                    <div>
                                        <EnvironmentOutlined />
                                        <span>{t("contact-us-address")}</span>
                                    </div>
                                    <div>
                                        <MailOutlined />
                                        <span>email@mysite.com</span>
                                    </div>
                                    <div>
                                        <GlobalOutlined />
                                        <span>mysite.com</span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.smallLogo}>
                                <span>{t("voucher-date")}</span>
                                <Logo/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

HotelForeignVoucher.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
HotelForeignVoucher.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(HotelForeignVoucher)
