import React,{useEffect,useState} from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation } from '../../../../i18n'
import styles from '../../../styles/Home.module.css'
import { Row, Col, Spin, Typography, Skeleton,Card, Divider} from 'antd';
import moment from 'moment-jalaali';

import { UserOutlineIcon, BabyOutlineIcon, AccompanyingOutlineIcon } from '../../UI/Icons'

const AsideBooking = props => {

    const numberWithCommas = (x) =>{
        if (x){
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }else{
            return "0";
        }
    }

    String.prototype.toEnglishDigit = function() {
        var find = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        var replace = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        var replaceString = this;
        var regex;
        for (var i = 0; i < find.length; i++) {
            regex = new RegExp(find[i], "g");
            replaceString = replaceString.replace(regex, replace[i]);
        }
        return replaceString;
    }

    const { t, reserveInfo } = props;
    
    moment.loadPersian();
    return (
        <div className={`${styles.asideCheckout} ${styles.cipAsideCheckout}`}>
            {reserveInfo ? <div className={`${styles.bookingSummary}`}>
                <h4 className={styles.subjectBookingSummary}>جزئیات رزرو</h4>
                <div className={styles.hotelBookingSummary}>
                    <div className={styles.contentHotelBookingSummary}>
                        <div className={styles.imageSummaryCip} onContextMenu={(e)=> e.preventDefault()}>
                            <img
                                src={reserveInfo.airport.picture.path}
                                alt={reserveInfo.airport.picture.altAttribute}
                                title={reserveInfo.airport.picture.titleAttribute}
                            />
                        </div>
                        <div className={styles.nameSummary}>
                            <h4>{reserveInfo.airport.name} {reserveInfo.airport.city.name}</h4>
                        </div>
                        <div className={styles.detailReserveCip}>
                            <ul>
                                <li>
                                    <div>شماره پرواز</div>
                                    <div>
                                        {reserveInfo.flightNumber.toEnglishDigit()}
                                    </div>
                                </li>
                                <li>
                                    <div>نام ایرلاین</div>
                                    <div>
                                        {reserveInfo.airline}
                                    </div>
                                </li>
                                <li>
                                    <div>تاریخ پرواز</div>
                                    <div>{moment(reserveInfo.flightTime.split("T")[0], "YYYY-MM-DD").format("jYYYY/jM/jD")}</div>
                                </li>
                                <li>
                                    <div>ساعت پرواز</div>
                                    <div>{moment(reserveInfo.flightTime.split("Z")[0]).format('HH:mm:ss')}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.passengerBookingSummary}>
                    {reserveInfo.passengers.map((item, index) =><div className={styles.passengerSummaryCip} key={index}>
                            {item.passengerType === "Adult" && <div>
                                <UserOutlineIcon />
                                <span>{item.firstName} {item.lastName}</span>
                            </div>}
                            {item.passengerType === "Child" && <div>
                                <BabyOutlineIcon />
                                <span>{item.firstName} {item.lastName}</span>
                            </div>}
                            {item.passengerType === "Accompanying" && <div>
                                <AccompanyingOutlineIcon />
                                <span>{item.firstName} {item.lastName}</span>
                            </div>}
                        <div>
                            <span>

                            </span>
                        </div>
                    </div>)}
                </div>
                {reserveInfo.service.items.find(i => i.count > 0) ?
                    <div className={styles.additionalService}>
                        <div className={styles.subject}>سرویس های اضافه انتخاب شده</div>
                        <div className={styles.content}>
                            {reserveInfo.service.items.map((item, index) =>
                                <div className={styles.addedService} key={index}>
                                    <div className={styles.addedServiceImage}>
                                        <img
                                            src={item.picture.path}
                                            alt={item.picture.altAttribute}
                                            title={item.picture.titleAttribute}
                                        />
                                    </div>
                                    <div>
                                        <b>{item.name}</b>
                                        {item.type == "Pet" && <small>{item.count} عدد</small>}
                                        {item.type == "MeetingRoom" && <small>{item.count} عدد</small>}
                                        {item.type == "Conference" && <small>{item.count} عدد</small>}
                                        <div className={styles.priceService}>
                                            <span className={styles.boardPrice}>{numberWithCommas(item.boardPrice)} ریال</span>
                                            <span className={styles.salePrice}>{numberWithCommas(item.salePrice * item.count)} ریال</span>
                                        </div>
                                    </div>
                                </div>)}
                        </div>
                    </div> : null
                }

                {reserveInfo.transport.items.find(i => i.count > 0) ? 
                    <div className={styles.additionalService}>
                        <div className={styles.subject}>ترانسفر فرودگاهی</div>
                        <div className={styles.content}>
                        {reserveInfo.transport.items.map((item, index) =>
                            <div className={styles.addedService} key={index}>
                                <div className={styles.addedServiceImage}>
                                    {item.picture.path === null ?
                                        <img src="https://cdn2.safaraneh.com/images/cip/services/default.jpg" alt="" title="" /> 
                                    :
                                        <img src={item.picture.path} alt={item.picture.altAttribute} title={item.picture.titleAttribute} />}
                                </div>
                                <div>
                                    <b>{item.name}</b>
                                    <small>{item.count} عدد</small>
                                    <div className={styles.priceService}>
                                        <span className={styles.boardPrice}>{numberWithCommas(item.boardPrice * item.count)} ریال</span>
                                        <span className={styles.salePrice}>{numberWithCommas(item.salePrice * item.count)} ریال</span>
                                    </div>
                                </div>
                            </div>)}
                        </div>
                        {reserveInfo.transport.items.map((item, index) => <div className={styles.content} key={index}>آدرس : {item.address}</div>)[0]}
                    </div>
                    : null}
                
            </div>: <Spin />}
    </div>
    )
}
AsideBooking.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
AsideBooking.propTypes = {
    t: PropTypes.func.isRequired,
}
export default withTranslation('common')(AsideBooking)