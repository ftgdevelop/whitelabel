import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Form, Radio, Input, notification } from 'antd'
import { withTranslation, Router } from '../../../i18n'
import { useRouter } from 'next/router'
import PhoneInput from '../UI/PhoneInput/PhoneInput'
import { LoadingOutlined } from '@ant-design/icons'
import styles from '../../styles/Home.module.css'
import { getOrder, getOrderHotel } from '../../actions'

const openNotification = (type, placement, msg) => {
  notification[type]({
    message: msg,
    description: '',
    placement,
    style: {
      color: '#fff',
      background: 'rgba(0,0,0,0.8)',
    },
  })
}
const RetrieveMyBooking = (props) => {
  const router = useRouter()
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [value, setValue] = useState('mobile')

  const [phoneNumberValue, setPhoneNumberValue] = useState('')
  const [phoneNumberCountry, setPhoneNumberCountry] = useState('')

  const phoneInputChangeHandle = (value, country) => {
    setPhoneNumberCountry(country)
    setPhoneNumberValue(value)
  }

  const showModal = () => {
    setVisible(true)
  }

  const handleOk = (e) => {
    setVisible(false)
  }

  const handleCancel = (e) => {
    setVisible(false)
  }

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const onFinish = async (val) => {
    if (!loading) {
      setLoading(true)
      const username = val.mobile
        ? val.mobile
            .replace(/ +/g, '')
            .replace(/[{()}]/g, '')
            .replace(/-/g, '')
        : val.email

      const res = await getOrder(val.orderId, username)
      if (res.status == 200) {
        if (res.data.result) {
          const typeOrder = res.data.result.type
          const user = res.data.result.username
          const orderId = res.data.result.id
          goNextPage(typeOrder, user, orderId)
        } else {
          const res = await getOrderHotel(val.orderId, username)

          if (res.data && res.data.ReserveId) {
            goNextPage('HotelDomestic', username, val.orderId)
          } else {
            setLoading(false)
            setShowMessage(true)
            setTimeout(() => {
              setShowMessage(false)
            }, 10000)
          }
        }
      } else {
        setLoading(false)
        openNotification('error', 'bottomRight', 'خطا در انجام عملیات')
      }
    }
  }

  const goNextPage = (typeOrder, user, orderId) => {
    if (typeOrder === 'Flight') {
      if (router.pathname === '/myaccount/booking/flightforeign')
        window.location.reload(false)
      else
        Router.push(
          `/myaccount/booking/flightforeign?username=${user}&reserveId=${orderId}`,
        )
    } else if (typeOrder === 'FlightDomestic') {
      if (router.pathname === '/myaccount/booking/flight')
        window.location.reload(false)
      else
        Router.push(
          `/myaccount/booking/flight?username=${user}&reserveId=${orderId}`,
        )
    } else if (typeOrder === 'HotelDomestic') {
      if (router.pathname === '/myaccount/booking/hotel')
        window.location.reload(false)
      else
        Router.push(
          `/myaccount/booking/hotel?username=${user}&reserveId=${orderId}`,
        )
    } else if (typeOrder === 'Cip') {
      if (router.pathname === '/myaccount/booking/cip')
        window.location.reload(false)
      else
        Router.push(
          `/myaccount/booking/cip?username=${user}&reserveId=${orderId}`,
        )
    } else if (typeOrder === 'Hotel') {
      if (router.pathname === '/myaccount/booking/hotelforeign')
        window.location.reload(false)
      else
        Router.push(
          `/myaccount/booking/hotelforeign?username=${user}&reserveId=${orderId}`,
        )
    } else if (typeOrder === 'Bus') {
      //bus reserve info
      if (router.pathname === '/myaccount/booking/bus')
        window.location.reload(false)
      else
        Router.push(
          `/myaccount/booking/bus?username=${user}&reserveId=${orderId}`,
        )
    }
  }

  const { t } = props
  const [form] = Form.useForm()
  return (
    <>
      <Button
        type="text"
        className={`${styles.retrieveMyBooking} ${
          process.env.THEME_NAME === 'TRAVELO' &&
          styles.retrieveMyBookingTravelo
        }`}
        onClick={showModal}
      >
        {t('retrieve-my-booking')}
      </Button>
      <Modal
        title={t('retrieve-my-booking')}
        open={visible}
        onOk={() => handleOk()}
        onCancel={() => handleCancel()}
        footer={null}
        className={`${
          process.env.THEME_NAME === 'TRAVELO' && 'ant-modal-travelo'
        }`}
      >
        <div
          className={`${styles.contantRetrieveMyBooking} ${
            process.env.THEME_NAME === 'TRAVELO' &&
            styles.contantRetrieveMyBookingTravelo
          }`}
        >
          {showMessage ? (
            <div className={styles.alert}>{t('cannot-find-reservation')}</div>
          ) : (
            ''
          )}
          <Form name="order" form={form} layout="vertical" onFinish={onFinish}>
            <Radio.Group
              onChange={onChange}
              value={value}
              className={styles.radio}
            >
              <Radio value={'mobile'}>{t('mobile')}</Radio>
              <Radio value={'meil'}>{t('email')}</Radio>
            </Radio.Group>

            {value === 'mobile' ? (
              <Form.Item
                name="mobile"
                className={`${
                  process.env.THEME_NAME === 'TRAVELO' && styles.formItemTravelo
                }`}
                label={t('mobile')}
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (phoneNumberValue && phoneNumberCountry) {
                        const requiredLength = phoneNumberCountry.format
                          .replace(/ +/g, '')
                          .replace(/[{(+)}]/g, '')
                          .replace(/-/g, '').length
                        const valueLength = phoneNumberValue.length
                        if (requiredLength === valueLength)
                          return Promise.resolve()
                        if (!phoneNumberValue)
                          return Promise.reject(
                            new Error(t('enter-your-mobile')),
                          )

                        return Promise.reject(
                          new Error('شماره تلفن وارد شده معتبر نیست!'),
                        )
                      } else {
                        return Promise.reject(new Error(t('enter-your-mobile')))
                      }
                    },
                  }),
                ]}
              >
                <div
                  style={{ direction: 'ltr' }}
                  className={`${styles.reserverMobile} ${
                    process.env.THEME_NAME === 'TRAVELO' && 'form-item-travelo'
                  }`}
                >
                  <PhoneInput country="ir" onChange={phoneInputChangeHandle} />
                </div>
              </Form.Item>
            ) : (
              <Form.Item
                label={t('email')}
                name="email"
                rules={[
                  {
                    required: true,
                    message: t('enter-your-email'),
                  },
                  { type: 'email', message: t('email-invalid') },
                ]}
                className={`${
                  process.env.THEME_NAME === 'TRAVELO' && styles.formItemTravelo
                }`}
              >
                <Input size="large" />
              </Form.Item>
            )}

            <Form.Item
              label={t('tracking-code')}
              name="orderId"
              rules={[
                {
                  pattern: /^[0123456789]*$/,
                  message: t('tracking-code-invalid'),
                },
                { required: true, message: t('enter-tracking-code') },
              ]}
              className={`${
                process.env.THEME_NAME === 'TRAVELO' && styles.formItemTravelo
              }`}
            >
              <Input size="large" />
            </Form.Item>
            {/* <Form.Item> */}
            <button size="large" block>
              <span style={{ margin: 'auto 15px' }}>{t('continue')}</span>
              {loading ? <LoadingOutlined /> : ''}
            </button>
            {/* </Form.Item> */}
          </Form>
        </div>
      </Modal>
    </>
  )
}

RetrieveMyBooking.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

RetrieveMyBooking.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(RetrieveMyBooking)
