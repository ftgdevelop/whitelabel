import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, i18n, withTranslation } from '../../../../i18n'
import AnimatedShowMore from 'react-animated-show-more'
import styles from '../../../styles/Home.module.css'
import {
  HotelDomesticReserveDetail,
  getReserve,
  foreignHotelGetReserveById,
  CipGetInformation,
} from '../../../actions'
import {
  GetReserveBus
} from '../../../actions/bus/bus'
import { GetReserve, GetVoucherPdf } from '../../../actions/flight/Flight'
import moment from 'moment-jalaali'

import {
  HotelIcon,
  FlightIcon,
  CipIcon,
  CheckCircleIcon,
  WarningIcon,
  CancelCircleIcon,
  WaitingIcon,
  BusIcon,
  CreditIcon
} from '../../UI/Icons'

import Time from '../../UI/Time/Time'

import DatePersion from '../../UI/DatePersion/DatePersion'
import { UpOutlined, DownOutlined, LoadingOutlined } from '@ant-design/icons'
import { getReserveV4Domestic } from '../../../actions/hotel/HotelActions'

const BookingItem = (props) => {
  const [detailHotel, setDetailHotel] = useState()
  const [detailFlight, setDetailFlight] = useState()
  const [detailFlightForeign, setDetailFlightForeign] = useState()
  const [detailHotelForeign, setDetailHotelForeign] = useState()
  const [detailCip, setDetailCip] = useState()
  const [detailBus, setDetailBus] = useState()
  const [clickStatus, setClickStatus] = useState('pending')

  const { t } = props

  const numberWithCommas = (x) => {
    if (x) {
      return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : x
    }
    return 0
  }

  // if(props.order) {

  //     useEffect(() => {
  //         getHotelDomestic();
  //         getDataFlight();
  //         getHotelForeign();
  //     }, []);
  // }

  const handleClick = async (reserveType) => {
    setClickStatus('loading')

    // let params = {
    //   reserveId: props.order.id,
    //   Username: props.order.username,
    //   LanguageId: 1,
    // }
    
    if (reserveType === "HotelDomestic") {
      const reserveId = props.order.id;
      const username = props.order.username;
      const response = await getReserveV4Domestic(reserveId, username)
      if (response.status === 200) {
        setClickStatus('success')
        const data = response.data.result
        setDetailHotel(data)
      } else {
        console.log('error')
      }
    }

    // const res = await HotelDomesticReserveDetail(params)
    // if (res.status === 200) {
    //   setClickStatus('success')
    //   setDetailHotel(res.data)
    // } else {
    //   console.log('error')
    // }

    if (reserveType === "FlightDomestic") {
      const res2 = await getReserve(props.order.id, props.order.username)
      if (res2.status == 200) {
        setClickStatus('success')
        const data = res2.data.result
        setDetailFlight(data)
      } else {
        console.log('error')
      }
    }

    if (reserveType === "Hotel") {
      const res3 = await foreignHotelGetReserveById(
        props.order.id,
        props.order.username,
      )
      if (res3.status == 200) {
        setClickStatus('success')
        const data = res3.data.result
        setDetailHotelForeign(data)
      } else {
        console.log('error')
      }
    }

    if (reserveType === "Cip") {
      const res4 = await CipGetInformation(props.order.id, props.order.username)
      if (res4.status == 200) {
        setClickStatus('success')
        const data = res4.data
        setDetailCip(data)
      } else {
        console.log('error')
      }
    }

    if (reserveType === "Flight") {
      const res5 = await GetReserve(props.order.id, props.order.username)
      if (res5.status == 200) {
        setClickStatus('success')
        const data = res5.data.result
        setDetailFlightForeign(data)
      } else {
        console.log('error')
      }
    }

    if (reserveType === "Bus") {
      const resBus = await GetReserveBus(props.order.id, props.order.username);
      if (resBus.status == 200) {
        setClickStatus('success')
        const data = resBus.data.result;
        setDetailBus(data)
      } else {
        console.log('error')
      }
    }


    setClickStatus('pending')
  }

  return (
    <div className={styles.coverMyBook}>
      <AnimatedShowMore
        height={70}
        toggle={({ isOpen }) =>
          isOpen ? (
            <>
              <span>بستن</span>
              <UpOutlined />
            </>
          ) : (
            <div onClick={() => handleClick(props.order.type)}>
              <span>جزئیات</span>
              <DownOutlined />
            </div>
          )
        }
        speed={0}
        shadowColor="transparent"
      >
        <div className={styles.itemMybook}>
          <div className={styles.item}>
            {props.order.status === 'Pending' && (
              <div className={`${styles.mobileItem} ${styles.itemWaiting}`}>
                <WarningIcon />
              </div>
            )}
            {props.order.status === 'Issued' && (
              <div className={`${styles.mobileItem} ${styles.itemSuccess}`}>
                <CheckCircleIcon />
              </div>
            )}
            {props.order.status === 'Canceled' && (
              <div className={`${styles.mobileItem} ${styles.itemCancel}`}>
                <CancelCircleIcon />
              </div>
            )}
            {props.order.status === 'Registered' && (
              <div className={`${styles.mobileItem} ${styles.itemWaiting}`}>
                <WaitingIcon />
              </div>
            )}
            {props.order.status === 'Unavailable' && (
              <div className={`${styles.mobileItem} ${styles.itemUnavailable}`}>
                <WarningIcon />
              </div>
            )}
            {props.order.status === 'ContactProvider' && (
              <div className={`${styles.mobileItem} ${styles.itemWaiting}`}>
                <WarningIcon />
              </div>
            )}
            {(props.order.status === 'PaymentSuccessful' ||
              props.order.status === 'WebServiceUnsuccessful') && (
              <div className={`${styles.mobileItem} ${styles.itemCancel}`}>
                <CancelCircleIcon />
              </div>
            )}
            <span>{props.order.id}</span>
          </div>
          <div className={styles.item}>
            {props.order.type === 'HotelDomestic' && (
              <>
                <HotelIcon />
                <span>هتل داخلی</span>
              </>
            )}
            {props.order.type === 'Hotel' && (
              <>
                <HotelIcon />
                <span>هتل خارجی</span>
              </>
            )}
            {props.order.type === 'FlightDomestic' && (
              <>
                <FlightIcon />
                <span>پرواز داخلی</span>
              </>
            )}
            {props.order.type === 'Flight' && (
              <>
                <FlightIcon />
                <span>پرواز خارجی</span>
              </>
            )}
            {props.order.type === 'Cip' && (
              <>
                <CipIcon />
                <span>cip</span>
              </>
            )}
            {props.order.type === 'Bus' && (
              <>
                <BusIcon />
                <span>اتوبوس</span>
              </>
            )}
          </div>
          <div className={styles.item}>
            <span>
              <DatePersion date={props.order.creationTime} />
            </span>
          </div>
          <div className={styles.item}>
            <span>{numberWithCommas(props.order.salePrice)}</span>
          </div>
          {props.order.status === 'Pending' && (
            <div className={`${styles.item} ${styles.itemWaiting}`}>
              <WarningIcon />
              <span>آماده پرداخت</span>
            </div>
          )}
          {props.order.status === 'Issued' && (
            <div className={`${styles.item} ${styles.itemSuccess}`}>
              <CheckCircleIcon />
              <span>نهایی شده</span>
            </div>
          )}
          {props.order.status === 'Canceled' && (
            <div className={`${styles.item} ${styles.itemCancel}`}>
              <CancelCircleIcon />
              <span>کنسل</span>
            </div>
          )}
          {props.order.status === 'Registered' && (
            <div className={`${styles.item} ${styles.itemWaiting}`}>
              <WaitingIcon />
              <span>در حال بررسی</span>
            </div>
          )}
          {props.order.status === 'Unavailable' && (
            <div className={`${styles.item} ${styles.itemUnavailable}`}>
              <WarningIcon />
              <span>جا نمی دهد</span>
            </div>
          )}
          {props.order.status === 'ContactProvider' && (
            <div className={`${styles.item} ${styles.itemUnavailable}`}>
              <WarningIcon />
              <span>تماس با پشتیبانی</span>
            </div>
          )}
          {(props.order.status === 'PaymentSuccessful' ||
            props.order.status === 'WebServiceUnsuccessful') && (
            <div className={`${styles.item} ${styles.itemCancel}`}>
              <CancelCircleIcon />
              <span>خطا در صدور بلیط</span>
            </div>
          )}
          {props.order.status === 'InProgress' && (
            <div className={`${styles.item} ${styles.itemWaiting}`}>
              <WaitingIcon />
              <span>در حال صدور</span>
            </div>
          )}
          {props.order.status === 'OnCredit' && (
            <div className={`${styles.item} ${styles.itemWaiting}`}>
              <CreditIcon />
              <span>علی الحساب</span>
            </div>
          )}
        </div>
        <div className={styles.moreItemMybook}>
          <div className={styles.headMyBook}>
            <div className={styles.headItem}>
              {props.order.type === 'FlightDomestic' && (<span>اطلاعات پرواز</span>)}
              {props.order.type === 'Cip' && <span>نام فرودگاه</span>}
              {props.order.type === 'Bus' && <span>مبدا</span>}
            </div>
            <div className={styles.headItem}>
              {props.order.type === 'Hotel' && <span>نام هتل</span>}
              {props.order.type === 'HotelDomestic' && <span>نام هتل</span>}
              {props.order.type === 'FlightDomestic' && <span>مسیر</span>}
              {props.order.type === 'Bus' && <span>مقصد</span>}
            </div>
            <div className={styles.headItem}>
              {props.order.type === 'HotelDomestic' && <span>تاریخ ورود</span>}
              {props.order.type === 'Hotel' && <span>تاریخ ورود</span>}
              {props.order.type === 'FlightDomestic' && <span>زمان حرکت</span>}
              {props.order.type === 'Cip' && <span>تاریخ پرواز</span>}
              {props.order.type === 'Bus' && <span>تاریخ حرکت</span>}
            </div>
            <div className={styles.headItem}>
              {/* <span>مبلغ کل (ریال)</span> */}
              {props.order.type === 'Bus' && <span>ساعت حرکت</span>}
            </div>
          </div>
          
          {clickStatus === 'pending' ? (
            <div className={styles.contentMyBook}>
              <div className={styles.item}>
                {props.order.type === 'HotelDomestic' && (
                  <>
                    {props.order && detailHotel ? (
                      <>
                        <img src={detailHotel.accommodation.filePath} />
                      </>
                    ) : null}
                  </>
                )}
                {props.order.type === 'Flight' && (
                  <>
                    {props.order && detailFlightForeign ? (
                      <img
                        src={
                          detailFlightForeign.segment.airItinerary
                            .originDestinationOptions[0].flightSegments[0]
                            .marketingAirline.photoUrl
                        }
                        alt={
                          detailFlightForeign.segment.airItinerary
                            .originDestinationOptions[0].flightSegments[0]
                            .marketingAirline.name
                        }
                        style={{ width: '45px', 'margin-left': '10px' }}
                      />
                    ) : null}
                    {props.order && detailFlightForeign ? (
                      <span>
                        {
                          detailFlightForeign.segment.airItinerary
                            .originDestinationOptions[0].flightSegments[0]
                            .departureAirport.cityName
                        }
                      </span>
                    ) : null}
                  </>
                )}
                {props.order.type === 'FlightDomestic' && (
                  <>
                    {props.order && detailFlight ? (
                      <img
                        src={detailFlight.departureFlight.airline.picture.path}
                        style={{ width: '45px', 'margin-left': '10px' }}
                      />
                    ) : null}
                    {props.order && detailFlight ? (
                      <span>{detailFlight.departureFlight.airline.name}</span>
                    ) : null}
                  </>
                )}
                {props.order.type === 'Hotel' && (
                  <>
                    {props.order && detailHotelForeign ? (
                      <img src={detailHotelForeign.accommodation.mainPhoto} />
                    ) : null}
                  </>
                )}
                {props.order.type === 'Cip' && (
                  <>
                    {props.order && detailCip ? (
                      <span>{detailCip.FlightDetail.AirportName}</span>
                    ) : null}
                  </>
                )}
                {props.order.type === 'Bus' && (
                  <>
                    {props.order && detailCip ? ( <>
                      <span>{detailBus.source.city.name} ({detailBus.source.name})</span>
                    </>) : null}
                  </>
                )}
              </div>
              <div className={styles.item}>
                {props.order.type === 'HotelDomestic' && (
                  <>
                    {props.order && detailHotel ? (
                      <span>هتل {detailHotel.accommodation.displayName}</span>
                    ) : null}
                  </>
                )}
                {props.order.type === 'Flight' && (
                  <>
                    {props.order && detailFlightForeign ? (
                      <span>
                        {
                          detailFlightForeign.segment.airItinerary
                            .originDestinationOptions[0].flightSegments[0]
                            .departureAirport.cityName
                        }{' '}
                        به{' '}
                        {
                          detailFlightForeign.segment.airItinerary
                            .originDestinationOptions[0].flightSegments[0]
                            .arrivalAirport.cityName
                        }
                      </span>
                    ) : null}
                  </>
                )}
                {props.order.type === 'FlightDomestic' && (
                  <>
                    {props.order && detailFlight ? (
                      <span>
                        {
                          detailFlight.departureFlight.departureAirport.city
                            .name
                        }{' '}
                        -{' '}
                        {detailFlight.departureFlight.arrivalAirport.city.name}
                      </span>
                    ) : null}
                  </>
                )}
                {props.order.type === 'Hotel' && (
                  <>
                    {props.order && detailHotelForeign ? (
                      <span>{detailHotelForeign.accommodation.name}</span>
                    ) : null}
                  </>
                )}
                {props.order.type === 'Bus' && (
                  <>
                    {props.order && detailCip ? ( <>
                      <span>{detailBus.destination.city.name} ({detailBus.destination.name})</span>
                    </>) : null}
                  </>
                )}
              </div>
              <div className={styles.item}>
                {props.order.type === 'HotelDomestic' && (
                  <span>
                    <DatePersion
                      date={
                        props.order && detailHotel
                          ? detailHotel.checkin
                          : null
                      }
                    />
                  </span>
                )}
                {props.order.type === 'Flight' && (
                  <span>
                    {props.order && detailFlight
                      ? moment(detailFlightForeign.departureTime[0]).format(
                          'jD jMMMM  jYYYY ',
                        )
                      : null}
                  </span>
                )}
                {props.order.type === 'FlightDomestic' && (
                  <span>
                    {props.order && detailFlight
                      ? moment(detailFlight.departureTime).format(
                          'jDD jMMMM jYYYY HH:mm',
                        )
                      : null}
                  </span>
                )}
                {props.order.type === 'Hotel' && (
                  <span>
                    <DatePersion
                      date={
                        props.order && detailHotelForeign
                          ? detailHotelForeign.date.checkIn
                          : null
                      }
                    />
                  </span>
                )}
                {props.order.type === 'Cip' && (
                  <span>
                    <DatePersion
                      date={
                        props.order && detailCip
                          ? detailCip.FlightDetail.FlightDate
                          : null
                      }
                    />
                  </span>
                )}
                {props.order.type === 'Bus' && (
                  <>
                    {props.order && detailCip ? ( <>
                      <DatePersion date={detailBus.departureDateTime} />
                    </>) : null}
                  </>
                )}
              </div>
              <div className={styles.item}>
                {/* <span>{numberWithCommas( props.order.salePrice)}</span> */}
                {props.order.type === 'Bus' && (
                  <>
                    {props.order && detailCip ? ( <>
                      <Time date={detailBus.departureDateTime} />
                    </>) : null}
                  </>
                )}
              </div>
              <div className={styles.item}>
                {props.order.type === 'HotelDomestic' &&
                  props.order.status !== 'Canceled' &&
                  props.order.status !== 'Issued' &&
                  props.order.status !== 'Registered' &&
                  props.order.status !== 'Unavailable' &&
                  props.order.status !== 'PaymentSuccessful' &&
                  props.order.status !== 'WebServiceUnsuccessful' && (
                    <>
                      <Link
                        // as={`/payment/reserveId-${props.order.id}/referenceId-${props.order.reference}`}
                        as={`/payment?username=${props.order.username}&reserveId=${props.order.id}`}
                        href={`/payment?username=${props.order.username}&reserveId=${props.order.id}`}
                      >
                        <a className={styles.payBtn}>
                          <span>پرداخت کنید</span>
                        </a>
                      </Link>
                    </>
                  )}
                {props.order &&
                  props.order.type === 'HotelDomestic' &&
                  props.order.status === 'Issued' &&
                  detailHotel && (
                    <>
                      <a
                        href={`http://voucher.safaraneh.com/fa/safaraneh/Reserve/hotel/voucher?reserveId=${detailHotel.id}&username=${detailHotel.reserver?.userName}`}
                        target="_blank"
                        className={styles.voucherBtn}
                      >
                        <span>دریافت واچر</span>
                      </a>
                    </>
                  )}
                {props.order.type === 'Hotel' &&
                  props.order.status !== 'Canceled' &&
                  props.order.status !== 'Issued' &&
                  props.order.status !== 'Registered' &&
                  props.order.status !== 'Unavailable' &&
                  props.order.status !== 'PaymentSuccessful' &&
                  props.order.status !== 'WebServiceUnsuccessful' && (
                    <>
                      <Link
                        as={`/payment?username=${props.order.username}&reserveId=${props.order.id}`}
                        href={`/payment?username=${props.order.username}&reserveId=${props.order.id}`}
                      >
                        <a className={styles.payBtn}>
                          <span>پرداخت کنید</span>
                        </a>
                      </Link>
                    </>
                  )}
                {props.order.type === 'Flight' &&
                  props.order.type === 'FlightDomestic' &&
                  props.order.status !== 'Canceled' &&
                  props.order.status !== 'Issued' &&
                  props.order.status !== 'Registered' &&
                  props.order.status !== 'Unavailable' &&
                  props.order.status !== 'PaymentSuccessful' &&
                  props.order.status !== 'WebServiceUnsuccessful' && (
                    <>
                      <Link
                        as={`/payment?username=${props.order.username}&reserveId=${props.order.id}`}
                        href={`/payment?username=${props.order.username}&reserveId=${props.order.id}`}
                      >
                        <a className={styles.payBtn}>
                          <span>پرداخت کنید</span>
                        </a>
                      </Link>
                    </>
                  )}

                {props.order.type === 'Cip' &&
                  props.order.status !== 'Canceled' &&
                  props.order.status !== 'Issued' &&
                  props.order.status !== 'Registered' &&
                  props.order.status !== 'Unavailable' &&
                  props.order.status !== 'PaymentSuccessful' &&
                  props.order.status !== 'WebServiceUnsuccessful' && (
                    <>
                      <Link
                        as={`/payment?username=${props.order.username}&reserveId=${props.order.id}`}
                        href={`/payment?username=${props.order.username}&reserveId=${props.order.id}`}
                      >
                        <a className={styles.payBtn}>
                          <span>پرداخت کنید</span>
                        </a>
                      </Link>
                    </>
                  )}
                
                {props.order.type === 'Bus' &&
                  props.order.status !== 'Canceled' &&
                  props.order.status !== 'Issued' &&
                  props.order.status !== 'Registered' &&
                  props.order.status !== 'Unavailable' &&
                  props.order.status !== 'PaymentSuccessful' &&
                  props.order.status !== 'WebServiceUnsuccessful' && (
                    <>
                      <Link
                        as={`/payment?username=${props.order.username}&reserveId=${props.order.id}`}
                        href={`/payment?username=${props.order.username}&reserveId=${props.order.id}`}
                      >
                        <a className={styles.payBtn}>
                          <span>پرداخت کنید</span>
                        </a>
                      </Link>
                    </>
                  )}

                {props.order.type === 'HotelDomestic' && (
                  <>
                    <Link
                      as={`/myaccount/booking/hotel?username=${props.order.username}&reserveId=${props.order.id}`}
                      href={`/myaccount/booking/hotel?username=${props.order.username}&reserveId=${props.order.id}`}
                    >
                      <a className={styles.moreBtn}>
                        <span>اطلاعات بیشتر</span>
                      </a>
                    </Link>
                  </>
                )}
                {props.order.type === 'Hotel' && (
                  <>
                    <Link
                      as={`/myaccount/booking/hotelforeign?username=${props.order.username}&reserveId=${props.order.id}`}
                      href={`/myaccount/booking/hotelforeign?username=${props.order.username}&reserveId=${props.order.id}`}
                    >
                      <a className={styles.moreBtn}>
                        <span>اطلاعات بیشتر</span>
                      </a>
                    </Link>
                  </>
                )}

                {props.order.type === 'FlightDomestic' && (
                  <>
                    <Link
                      as={`/myaccount/booking/flight?username=${props.order.username}&reserveId=${props.order.id}`}
                      href={`/myaccount/booking/flight?username=${props.order.username}&reserveId=${props.order.id}`}
                    >
                      <a className={styles.moreBtn}>
                        <span>اطلاعات بیشتر</span>
                      </a>
                    </Link>
                  </>
                )}
                {props.order.type === 'Flight' && (
                  <>
                    <Link
                      as={`/myaccount/booking/flightforeign?username=${props.order.username}&reserveId=${props.order.id}`}
                      href={`/myaccount/booking/flightforeign?username=${props.order.username}&reserveId=${props.order.id}`}
                    >
                      <a className={styles.moreBtn}>
                        <span>اطلاعات بیشتر</span>
                      </a>
                    </Link>
                  </>
                )}

                {props.order.type === 'Cip' && (
                  <>
                    <Link
                      as={`/myaccount/booking/cip?username=${props.order.username}&reserveId=${props.order.id}`}
                      href={`/myaccount/booking/cip?username=${props.order.username}&reserveId=${props.order.id}`}
                    >
                      <a className={styles.moreBtn}>
                        <span>اطلاعات بیشتر</span>
                      </a>
                    </Link>
                  </>
                )}

                {props.order &&
                  props.order.type === 'Cip' &&
                  props.order.status === 'Issued' &&
                  detailCip && (
                    <>
                      <a
                        href={`http://voucher.safaraneh.com/fa/safaraneh/Reserve/cip/voucher?reserveId=${props.order.id}&username=${props.order.username}`}
                        target="_blank"
                        className={styles.voucherBtn}
                      >
                        <span>دریافت واچر</span>
                      </a>
                    </>
                  )}

                {props.order.type === 'Bus' && (
                  <>
                    <Link
                      as={`/myaccount/booking/bus?username=${props.order.username}&reserveId=${props.order.id}`}
                      href={`/myaccount/booking/bus?username=${props.order.username}&reserveId=${props.order.id}`}
                    >
                      <a className={styles.moreBtn}>
                        <span>اطلاعات بیشتر</span>
                      </a>
                    </Link>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className={styles.loadingItem}>
              {' '}
              <LoadingOutlined spin /> در حال بارگذاری{' '}
            </div>
          )}
        </div>
      </AnimatedShowMore>
    </div>
  )
}

BookingItem.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

BookingItem.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(BookingItem)
