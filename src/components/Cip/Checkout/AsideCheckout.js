import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types'
import { i18n, withTranslation } from '../../../../i18n'
import {useRouter} from 'next/router';
import { Row, Col, Button, Spin, Empty } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment-jalaali';

import { ArrowRightIcon, UserOutlineIcon, BabyOutlineIcon, AccompanyingOutlineIcon } from '../../UI/Icons'
import styles from '../../../styles/Home.module.css'


const AsideCheckout = props => {
    const {
        t,
        reserveInfo,
        adultList,
        childList,
        accompanyingList,
        flightTime,
        flightDate,
        addressTransports,
        transortList,
        loading
    } = props;

    function numberWithCommas(x) {
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
                                        <div>نام ایرلاین</div>
                                        <div>
                                            {reserveInfo.originName === 'undefined' || reserveInfo.originName === '' ?
                                            <>از قسمت جزئیات پرواز وارد نمایید</> :
                                            reserveInfo.originName}
                                        </div>
                                    </li>
                                    <li>
                                        <div>شماره پرواز</div>
                                        <div>
                                            {reserveInfo.flightNumber === null ?
                                            <>از قسمت جزئیات پرواز وارد نمایید</>:
                                            reserveInfo.flightNumber.toEnglishDigit()}
                                        </div>
                                    </li>
                                    <li>
                                        <div>تاریخ پرواز</div>
                                        <div>{flightDate && flightDate.year+"/"+flightDate.month+"/"+flightDate.day}</div>
                                    </li>
                                    <li>
                                        <div>ساعت پرواز</div>
                                        <div>{flightTime ? moment(flightTime).format('HH:mm') : <>از قسمت جزئیات پرواز انتخاب نمایید</>}
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={styles.passengerBookingSummary}>
                        <div className={styles.passengerSummaryCip}>
                            <div>
                                <UserOutlineIcon />
                                <span>{adultList.length} بزرگسال</span>
                            </div>
                            <div>
                                {reserveInfo.rate.passengers.map((item, index) => <React.Fragment key={index}>
                                    {item.passengerType == "Adult" &&
                                        <span >
                                            {numberWithCommas(item.salePrice * adultList.length)} ریال
                                        </span>}
                                </React.Fragment>)}
                            </div>
                        </div>

                        <div className={styles.passengerSummaryCip}>
                            <div>
                                <BabyOutlineIcon />
                                <span>{childList.length} کودک</span>
                            </div>
                            <div>
                                {reserveInfo.rate.passengers.map((item, index) => <React.Fragment key={index}>
                                    {item.passengerType == "Child" &&
                                        <span >
                                            {numberWithCommas(item.salePrice * childList.length)} ریال
                                        </span>}
                                </React.Fragment>)}
                            </div>
                        </div>

                        <div className={styles.passengerSummaryCip}>
                            <div>
                                <AccompanyingOutlineIcon />
                                <span>{accompanyingList.length} همراه</span>
                            </div>
                            <div>
                                {reserveInfo.rate.passengers.map((item, index) => <React.Fragment key={index}>
                                    {item.passengerType == "Accompanying" &&
                                        <span >
                                            {numberWithCommas(item.salePrice * accompanyingList.length)} ریال
                                        </span>}
                                </React.Fragment>)}
                            </div>
                        </div>
                    </div>
                    
                    <div className={styles.additionalService}>
                        <div className={styles.subject}>سرویس های اضافه انتخاب شده</div>
                        <div className={styles.content}>
                            {reserveInfo.services.map((item, index) =>
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
                                            <span className={styles.salePrice}>{numberWithCommas(item.salePrice * item.count)} ریال</span>
                                        </div>
                                    </div>
                                </div>)}
                        </div>
                    </div>
                    {transortList.length >= 1 &&
                        <div className={styles.additionalService}>
                            <div className={styles.subject}>ترانسفر فرودگاهی</div>
                            <div className={styles.content}>
                            {transortList.map((item, index) =>
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
                                            <span className={styles.salePrice}>{numberWithCommas(item.salePrice * item.count)} ریال</span>
                                        </div>
                                    </div>
                                </div>)}
                            </div>
                            {addressTransports ? <div> آدرس : {addressTransports}</div> : null}
                        </div>}

                    {/* <div className={styles.vatSummary}>
                        <Row align="middle" justify="space-between">
                            <Col>
                                <div className={styles.subjectVatSummaryResult}>
                                    <span>مبلغ قابل پرداخت</span>
                                </div>
                            </Col>
                            <Col>
                                <div className={styles.contentVatSummaryResult}>
                                    <span>10.000.000 ریال</span>
                                </div>
                            </Col>
                        </Row>
                    </div> */}
                    <div className={styles.btnCheckoutFixed}>
                        <Button
                            className={styles.btnCipCheckout}
                            onClick={() => props.onFinish()}
                            disabled={loading ? true : false}
                        >
                            {loading ? (<>در حال بارگذاری</>) : (<>تایید رزرو و انتخاب درگاه</>)}
                        </Button>
                    </div>
                </div> : <Spin />}
        </div>
    )
}

AsideCheckout.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})

AsideCheckout.propTypes = {
    t: PropTypes.func.isRequired,
}

export default withTranslation('common')(AsideCheckout)