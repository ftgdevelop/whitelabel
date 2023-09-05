
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { i18n, withTranslation } from '../../../i18n';

import styles from "../../styles/Home.module.css";

const CardToCard = (props) => {
    const { t, loadingSubmit } = props;
    return (
        <>
            {
                loadingSubmit ? null :
                <div className={`${styles.cardToCard} ${process.env.THEME_NAME === "TRAVELO" && styles.cardToCardTravelo}`}>
                    <div className={styles.title}>کارت به کارت</div>
                    {/* <div className={styles.cardItem}>
                        <div className={styles.mellatBank}>
                            <div className={styles.haedCard}>
                                <img src="/images/mellat-logo.png" alt="بانک ملت" title="بانک ملت" />
                                <span>بانک ملت</span>
                            </div>
                            <div className={styles.contantCard}>
                                <div className={styles.numberCard}>
                                    <div className={styles.number}>6104</div>
                                    <div className={styles.number}>3378</div>
                                    <div className={styles.number}>1136</div>
                                    <div className={styles.number}>4080</div>
                                </div>
                                <div className={styles.nameCard}>
                                    سفرانه مشرق زمین
                                </div>
                            </div>
                            <svg id="bigHalfCircle" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="17" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0 100 C40 0 60 0 100 100 Z"></path></svg>
                        </div>
                    </div> */}
                    <div className={styles.cardItem}>
                        <div className={styles.sinaBank}>
                            <div className={styles.haedCard}>
                                <img src="/images/sina-logo.png" alt="بانک سینا" title="بانک سینا" />
                                {/* <span>بانک سینا</span> */}
                            </div>
                            <div className={styles.contantCard}>
                                <div className={styles.numberCard}>
                                    <div className={styles.number}>6393</div>
                                    <div className={styles.number}>4670</div>
                                    <div className={styles.number}>0005</div>
                                    <div className={styles.number}>2517</div>
                                </div>
                                <div className={styles.nameCard}>
                                    سفرانه مشرق زمین
                                </div>
                            </div>
                            {/* <svg id="bigHalfCircle" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="17" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0 100 C40 0 60 0 100 100 Z"></path></svg> */}
                        </div>
                    </div>
                    <div className={styles.cardNote}>
                        <span>توجه :</span>
                        <ol>
                            <li>لطفا پس از واریز فیش را به شماره موبایل ۰۹۱۲۹۵۹۰۵۴۲ از طریق واتس آپ ارسال و یا با بخش پشتیبانی به شماره ٠٢١٧٩۵١۵ تماس حاصل فرمایید.</li>
                            <li>این شرکت در صورت عدم اعلام شما مسئولیتی بابت رزرو شما نخواهد داشت.</li>
                        </ol>
                    </div>
                </div>
            }
        </>
    )
}

CardToCard.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
CardToCard.propTypes = {
    t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(CardToCard)