import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-jalaali'
import { Link, i18n, withTranslation } from '../../../i18n'
import { Row, Col, Button, Radio } from 'antd'
import { LoadingOutlined, InfoCircleFilled } from '@ant-design/icons'
import { connect } from 'react-redux'

import styles from '../../styles/Home.module.css'
import { LockIcon, ErrorIcon } from '../UI/Icons'
// import Wallet from "./Wallet";

const ContentPayment = (props) => {
  const [gatewayId, setGatewayId] = useState('')
  const [remaindSeconds, setRemaindSeconds] = useState()

  function numberWithCommas(x) {
    return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : x
  }

  const submit = () => {
    if (!sumbitBtnIsDisabled && !props.loadingSubmit) {
      props.submitData(gatewayId)
    }
  }

  const setGatewaySelected = (e) => {
    setGatewayId(e.target.value)
  }

  const remaindTimeElement = (second) => {
    const days = Math.floor(second / (24 * 60 * 60))
    const daysRemained = second % (24 * 60 * 60)
    const hours = Math.floor(daysRemained / (60 * 60))
    const hoursRemained = daysRemained % (60 * 60)
    const minutes = Math.floor(hoursRemained / 60)
    const seconds = hoursRemained % 60

    if (second > 0) {
      return (
        <div className={styles.alertSuccess}>
          <h6> درخواست رزرو تایید شد </h6>
          <span> خواهشمند است حداکثر ظرف مدت </span>
          {days ? <b>{days} روز </b> : null}
          {hours ? <b>{hours} ساعت </b> : null}
          {minutes ? <b>{minutes} دقیقه </b> : null}
          {seconds ? <b>{seconds} ثانیه </b> : null}
          <span>
            {' '}
            نسبت به پرداخت صورتحساب اقدام فرمایید. بدیهی است پس از منقضی شدن
            زمان مذکور درخواست شما لغو می گردد.{' '}
          </span>
        </div>
      )
    }
    return null
  }

  let countDownTimer
  useEffect(() => {
    if (props.expireDate) {
      const remainedsec = moment(expireDate).diff(moment(), 'seconds')
      if (remainedsec > 1) {
        setRemaindSeconds(remainedsec)
        countDownTimer = setInterval(() => {
          setRemaindSeconds((prevState) => {
            if (prevState > 1) {
              return prevState - 1
            } else {
              clearInterval(countDownTimer)
              return 0
            }
          })
        }, 1000)
      } else {
        setRemaindSeconds(0)
      }
    } else {
      setRemaindSeconds(0)
    }
    return () => {
      clearInterval(countDownTimer)
    }
  }, [props.expireDate])

  const {
    t,
    bankGatewayList,
    price,
    loadingSubmit,
    isError,
    expireDate,
    type,
    coordinatorPrice
  } = props
 
  let sumbitBtnIsDisabled = false
  if (
    type === 'Hotel' ||
    type === 'Flight' ||
    (type === 'HotelDomestic' && remaindSeconds < 1)
  ) {
    sumbitBtnIsDisabled = true
  }
  return (
    <div
      className={`${styles.contentBooking} ${styles.contentPayment} ${
        process.env.THEME_NAME === 'TRAVELO' && styles.contentPaymentTravelo
      }`}
    >
      {type === 'HotelDomestic' && remaindSeconds < 1 && (
        <div className={styles.alertWarning}>
          <h6> اخطار! </h6>
          <span>
            {' '}
            درخواست رزرو تایید شد ولی به علت عدم پرداخت در مهلت تعیین شده لغو
            گردید.{' '}
          </span>
        </div>
      )}

      {isError === '0' || isError === 0 ? (
        <div className={styles.errorPayment}>
          <div className={styles.subject}>
            <ErrorIcon />
            {t('error-in-pay')}
          </div>
          <span>{t('please-pay-again')}</span>
        </div>
      ) : (
        ''
      )}
      <div className={styles.pouyaAlert}>
        <InfoCircleFilled />
        <span>{t('second-password')}</span>
        <Link as="/other/pouya-password" href="/other/pouya-password">
          <a target="_blank">{t('second-password-desc')}</a>
        </Link>
      </div>

      {bankGatewayList && bankGatewayList.gateways ? (
        <div className={styles.howPay}>
          <div className={styles.cardTitle}>{t('please-choose-pay-panel')}</div>
          <div
            className={`${styles.cardBody} ${
              type === 'HotelDomestic' && remaindSeconds < 1
                ? 'card-body-disable'
                : ''
            }`}
          >
            <div className={styles.note}>
              <img
                src={bankGatewayList.image.path}
                alt={bankGatewayList.image.altAttribute}
              />
              <span>{bankGatewayList.description}</span>
            </div>

            <Radio.Group
              className="bankGateWaysRadio"
              defaultValue={bankGatewayList.gateways[0].id}
              onChange={(e) => setGatewaySelected(e)}
            >
              {bankGatewayList.gateways.map((bank, index) => (
                <Radio.Button value={bank.id} key={index}>
                  <img
                    className="gatewaysRadioIcon"
                    src={bank.image.path}
                    alt={bank.image.altAttribute}
                  />
                  {bank.displayName || bank.name}
                </Radio.Button>
              ))}

              {/* <Radio.Button value="unknown">
                    <img className="gatewaysRadioIcon" src="/images/unknown-bank.png" />
                    ناشناخته
                </Radio.Button> */}
            </Radio.Group>

            <Row>
              <Col span={24}>
                <div className={styles.pricePayment}>
                  {t('total-price')} :  
                  { process.env.DomesticHotelV4 ? (
                    numberWithCommas(coordinatorPrice)
                  ) : (
                    numberWithCommas(price) 
                  )} {t('rial')}
                </div>

                <Button
                  className={styles.btnPayment}
                  onClick={submit}
                  disabled={sumbitBtnIsDisabled}
                >
                  {loadingSubmit ? (
                    <LoadingOutlined
                      spin
                      className={styles.loadingFlight}
                    ></LoadingOutlined>
                  ) : (
                    <LockIcon />
                  )}
                  {t('pay')}
                </Button>
              </Col>
            </Row>

            <div className={styles.textAgreePayment}>
              <span>{t('accept-privacy')}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.howPay}>
          <div className={styles.cardTitle}>{t('please-choose-pay-panel')}</div>
          <div className={styles.cardBody}>
            <div className={styles.loading}>
              <LoadingOutlined spin></LoadingOutlined>
              <span>در حال بارگذاری</span>
            </div>
          </div>
        </div>
      )}

      {type === 'HotelDomestic' && remaindTimeElement(remaindSeconds)}

      {/* {props.isAuthenticated ? <Wallet pricePayment={price} />: ''} */}
    </div>
  )
}

ContentPayment.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

ContentPayment.propTypes = {
  t: PropTypes.func.isRequired,
}

const mapStateToProp = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  }
}

export default withTranslation('common')(
  connect(mapStateToProp, null)(ContentPayment),
)
