import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation, Router } from '../../../../i18n'
import { useRouter } from 'next/router'
import { Form, Input, Radio, Row, Col, Select, notification } from 'antd'
import PhoneInput from '../../UI/PhoneInput/PhoneInput'
import InfoBus from '../BusList/BusListContent/BusListCard/BusDetail/InfoBus'
import _ from 'lodash'
import { ArrowRightIcon, SeatIcon, InfoIcon } from '../../UI/Icons'
import styles from '../../../styles/Bus.module.css'
import { FetchPreReserve } from '../../../actions/bus/bus'
import { LoadingOutlined } from '@ant-design/icons'

const { Option } = Select
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

const ContentCheckout = (props) => {
  const { t, passengers, form, data, dataReserve } = props
  const router = useRouter()
  const [phoneNumber, setPhoneNumber] = useState({ code: '', value: '' })
  const [phoneNumberHeadMan, setPhoneNumberHeadMan] = useState({
    code: '',
    value: '',
  })
  const [loadingSubmit, setloadingSubmit] = useState(false)

  const onFinishFailed = (e) => {}

  const onFinish = async (values) => {
    try {
      setloadingSubmit(true)

      const updatePassenger = passengers.map((item, index) => ({
        seat: parseInt(item),
        ...values.passengers[index],
      }))

      const param = {
        ...values.headman,
        phoneNumber: values.headman.phoneNumber.replace(/\s/g, ''),
        passengers: updatePassenger,
        reserver: {
          ...values.reserver,
          phoneNumber: '+' + values.reserver.phoneNumber,
          userName: '+' + values.reserver.phoneNumber || values.reserver.email,
        },
        preReserveKey: router.query.key,
      }
      const res = await FetchPreReserve(param)
      if (res.status == 200) {
        Router.push(
          `/payment?username=${res.data.result.username}&reserveId=${res.data.result.id}`,
        )
      } else {
        openNotification('error', 'bottomRight', res.data.error.message)
        setloadingSubmit(false)
      }
    } catch {
      setloadingSubmit(false)
    }
  }

  const phoneNumberChange = (value, type) => {
    setPhoneNumber({ value, code: type })
    const fields = form.getFieldsValue()
    const { reserver } = fields
    Object.assign(reserver, { ['phoneNumber']: value })
    form.setFieldsValue({ reserver })
  }

  const phoneNumberHeadManChange = (value, type) => {
    setPhoneNumberHeadMan({ value, code: type })
    const fields = form.getFieldsValue()
    const { headman } = fields
    Object.assign(headman, { ['phoneNumber']: value })
    form.setFieldsValue({ headman })
  }
  const isPersian = (str) => {
    var p = /^[\u0600-\u06FF\s]+$/

    if (!p.test(str)) {
      return false
    }
    return true
  }

  const fillPassengerDefaultInfo = (e, name) => {
    const fields = form.getFieldsValue()
    if (isPersian(e.target.value)) {
      fields.headman[name] = e.target.value
    }
    form.setFieldsValue({
      ...fields,
    })
  }

  return (
    <Form
      name="basic"
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
    >
      <div className={styles.contentCheckout}>

        {dataReserve && dataReserve.finalDestination.name != dataReserve.destination.name &&
          <div className={styles.warningfinalDestination}>
            <InfoIcon />
            <div>
              مقصد نهایی سرویسی که انتخاب کرده‌اید
              <b> {dataReserve.finalDestination.name} </b>
              است. لطفا هنگام رسیدن به مقصد موردنظر خود، برای پیاده‌شدن راننده را مطلع نمایید.
            </div>
          </div>}
          
        <div
          className={`${styles.guestDetails} ${
            process.env.THEME_NAME === 'TRAVELO' && styles.guestDetailsTravelo
          }`}
        >
          <div className={styles.cardTitle}>{t('reserver-information')}</div>
          <div className={styles.cardBody}>
            <Row gutter={[10, 0]}>
              <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                <Form.Item
                  name={['reserver', 'gender']}
                  label={t('gender')}
                  rules={[
                    { required: true, message: t('please-choose-gender') },
                  ]}
                  initialValue={true}
                >
                  <Radio.Group style={{ display: 'flow-root' }}>
                    <Radio value={true}>{t('male')}</Radio>
                    <Radio value={false}>{t('female')}</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={9} lg={9} xl={9} className="ant-form-item-bus">
                {/* <Form.Item label="نام" > */}
                {/* <Input.Group compact> */}
                {/* <Form.Item name="gender" noStyle>
                            <Select defaultValue="men" style={{ width: "30%", marginTop: "3px" }}>
                                <Option value="men">مرد</Option>
                                <Option value="women">زن</Option>
                            </Select>
                            </Form.Item> */}
                <Form.Item
                  name={['reserver', 'firstName']}
                  // noStyle
                  label={t('name')}
                  rules={[
                    { required: true, message: t('please-enter-name') },
                    {
                      pattern: new RegExp(
                        /^[a-zA-Zآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ ]*$/,
                      ),
                      message: t('just-english-persian-letter-and-space'),
                    },
                  ]}
                  onChange={(e) => fillPassengerDefaultInfo(e, 'firstName')}
                >
                  <Input
                    id="firstName"
                    size="large"
                    // className={`${styles.input65} ${styles.firstnameInput}`}
                    className={`${styles.input95} ${
                      process.env.THEME_NAME === 'TRAVELO' && 'input-travelo'
                    }`}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={9} lg={9} xl={9} className="ant-form-item-bus">
                <Form.Item
                  name={['reserver', 'lastName']}
                  label={t('family')}
                  rules={[
                    {
                      required: true,
                      message: t('please-enter-family'),
                    },
                    {
                      pattern: new RegExp(
                        /^[a-zA-Zآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ ]*$/,
                      ),
                      message: t('just-english-persian-letter-and-space'),
                    },
                  ]}
                  onChange={(e) => fillPassengerDefaultInfo(e, 'lastName')}
                >
                  <Input
                    id="lastName"
                    size="large"
                    className={`${styles.input95} ${
                      process.env.THEME_NAME === 'TRAVELO' && 'input-travelo'
                    }`}
                  />
                </Form.Item>
              </Col>
              <Col xs={0} sm={0} md={6} lg={6} xl={6}></Col>
              <Col xs={24} sm={12} md={9} lg={9} xl={9} className="ant-form-item-bus">
                <Form.Item
                  name={['reserver', 'email']}
                  label={t('email')}
                  rules={[
                    {
                      required: true,
                      message: t('please-enter-email'),
                    },
                    { type: 'email', message: t('invalid-email') },
                  ]}
                >
                  <Input
                    id="email"
                    size="large"
                    className={`${styles.input95Tablet} ${
                      process.env.THEME_NAME === 'TRAVELO' && 'input-travelo'
                    }`}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={9} lg={9} xl={9} id="phoneNumber" className='ant-form-item-bus'>
                <Form.Item
                  name={['reserver', 'phoneNumber']}
                  className={`${
                    process.env.THEME_NAME === 'TRAVELO' &&
                    styles.formItemTravelo
                  }`}
                  label={t('phone-number')}
                  onChange={(e) => fillPassengerDefaultInfo(e, 'phoneNumber')}
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (phoneNumber.value && phoneNumber.code) {
                          const requiredLength = phoneNumber.code.format
                            .replace(/ +/g, '')
                            .replace(/[{(+)}]/g, '')
                            .replace(/-/g, '').length
                          const valueLength = phoneNumber.value.length
                          if (requiredLength === valueLength)
                            return Promise.resolve()
                          if (!phoneNumber.value)
                            return Promise.reject(
                              new Error(t('please-enter-phone-number')),
                            )

                          return Promise.reject(
                            new Error('شماره تلفن وارد شده معتبر نیست!'),
                          )
                        } else {
                          return Promise.reject(
                            new Error(t('please-enter-phone-number')),
                          )
                        }
                      },
                    }),
                  ]}
                >
                  <div
                    id="phoneNumber"
                    style={{ direction: 'ltr' }}
                    className={`${styles.reserverMobile} ${
                      process.env.THEME_NAME === 'TRAVELO' &&
                      'form-item-travelo'
                    }`}
                  >
                    <PhoneInput country="ir" onChange={phoneNumberChange} />
                  </div>
                </Form.Item>
              </Col>
            </Row>
          </div>
        </div>

        <div
          className={`${styles.guestDetails} ${
            process.env.THEME_NAME === 'TRAVELO' && styles.guestDetailsTravelo
          }`}
        >
          <div className={styles.cardTitleContent}>
            <div className={styles.cardTitle}>
              انتخاب صندلی
              <span> {dataReserve && dataReserve.source.city.name} </span>(
              {dataReserve && dataReserve.source.name}) به
              <span> {dataReserve && dataReserve.destination.name} </span>
              {/* (کاوه) */}
            </div>
            <div className={styles.cardCount}>
              {passengers.length === 0 ? (
                <div className={styles.cardEmptyCount}>صندلی انتخاب نشده</div>
              ) : (
                <div className={styles.cardSelectCount}>
                  {passengers.length} صندلی انتخاب شده
                </div>
              )}
            </div>
          </div>
          <div className={styles.cardBody}>
            <InfoBus {...props} />
          </div>
        </div>
        {passengers.length !== 0 && (
          <>
            <div
              className={`${styles.passngerDetails} ${
                process.env.THEME_NAME === 'TRAVELO' &&
                styles.passngerDetailsTravelo
              }`}
            >
              <div className={styles.subjectPassengerTitle}>
                <SeatIcon />
                <span>کد ملی مسافران را وارد کنید</span>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.adultPassenger}>
                  <div
                    className={styles.contentAdultPassneger}
                    layout="vertical"
                  >
                    <Row gutter={[10, 0]}>
                      {passengers.map((passenger, index) => (
                        <Col
                          xs={24}
                          sm={12}
                          md={8}
                          lg={8}
                          xl={8}
                          key={passenger}
                        >
                          <Form.Item
                            name={['passengers', index, 'nationalId']}
                            label={`کد ملی مسافر ${index + 1}`}
                            rules={[
                              {
                                required: true,
                                message: t('please-enter-national-code'),
                                len: 10,
                              },
                              {
                                pattern: /^[0123456789۰۱۲۳۴۵۶۷۸۹]*$/,
                                message: t('invalid-national-code'),
                              },
                              ({ getFieldValue }) => ({
                                validator(rule, value) {
                                  const items = form.getFieldsValue().passengers
                                  const arr = items.filter(
                                    (item) => item.nationalId === value,
                                  )
                                  if (arr.length > 1) {
                                    return Promise.reject(
                                      t('duplicate-national-code'),
                                    )
                                  }
                                  return Promise.resolve()
                                },
                              }),
                            ]}
                          >
                            <Input
                              size="large"
                              className={`${styles.input95Tablet} ${
                                process.env.THEME_NAME === 'TRAVELO' &&
                                'input-travelo'
                              }`}
                            />
                          </Form.Item>
                        </Col>
                      ))}{' '}
                    </Row>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <div
          className={`${styles.guestDetails} ${
            process.env.THEME_NAME === 'TRAVELO' && styles.guestDetailsTravelo
          }`}
        >
          <div className={styles.cardTitle}>مشخصات سرپرست</div>
          <div className={styles.cardBody}>
            <Row gutter={[10, 0]}>
              <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                <Form.Item
                  name={['headman', 'gender']}
                  label={t('gender')}
                  rules={[
                    { required: true, message: t('please-choose-gender') },
                  ]}
                  initialValue={true}
                >
                  <Radio.Group style={{ display: 'flow-root' }}>
                    <Radio value={true}>{t('male')}</Radio>
                    <Radio value={false}>{t('female')}</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={9} lg={9} xl={9} className="ant-form-item-bus">
                <Form.Item
                  name={['headman', 'firstName']}
                  // noStyle
                  label={t('name')}
                  rules={[
                    { required: true, message: t('please-enter-name') },
                    {
                      pattern: new RegExp(
                        /^[آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ ]*$/,
                      ),
                      message: t('just-persian-letter-and-space'),
                    },
                  ]}
                >
                  <Input
                    id="firstName"
                    size="large"
                    // className={`${styles.input65} ${styles.firstnameInput}`}
                    className={`${styles.input95} ${
                      process.env.THEME_NAME === 'TRAVELO' && 'input-travelo'
                    }`}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={9} lg={9} xl={9} className="ant-form-item-bus">
                <Form.Item
                  name={['headman', 'lastName']}
                  label={t('family')}
                  rules={[
                    {
                      required: true,
                      message: t('please-enter-family'),
                    },
                    {
                      pattern: new RegExp(
                        /^[آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ ]*$/,
                      ),
                      message: t('just-persian-letter-and-space'),
                    },
                  ]}
                >
                  <Input
                    id="lastName"
                    size="large"
                    className={`${styles.input95} ${
                      process.env.THEME_NAME === 'TRAVELO' && 'input-travelo'
                    }`}
                  />
                </Form.Item>
              </Col>
              <Col xs={0} sm={0} md={6} lg={6} xl={6}></Col>
              <Col xs={24} sm={12} md={9} lg={9} xl={9} id="phoneNumber" className='ant-form-item-bus'>
                <Form.Item
                  name={['headman', 'phoneNumber']}
                  className={`${
                    process.env.THEME_NAME === 'TRAVELO' &&
                    styles.formItemTravelo
                  }`}
                  label={t('phone-number')}
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (
                          phoneNumberHeadMan.value &&
                          phoneNumberHeadMan.code
                        ) {
                          const requiredLength = phoneNumberHeadMan.code.format
                            .replace(/ +/g, '')
                            .replace(/[{(+)}]/g, '')
                            .replace(/-/g, '').length
                          const valueLength = phoneNumberHeadMan.value.length
                          if (requiredLength === valueLength)
                            return Promise.resolve()
                          if (!phoneNumberHeadMan.value)
                            return Promise.reject(
                              new Error(t('please-enter-phone-number')),
                            )

                          return Promise.reject(
                            new Error('شماره تلفن وارد شده معتبر نیست!'),
                          )
                        } else {
                          return Promise.reject(
                            new Error(t('please-enter-phone-number')),
                          )
                        }
                      },
                    }),
                  ]}
                >
                  <div
                    style={{ direction: 'ltr' }}
                    className={`${styles.reserverMobile} ${
                      process.env.THEME_NAME === 'TRAVELO' &&
                      'form-item-travelo'
                    }`}
                  >
                    <PhoneInput
                      country="ir"
                      onChange={phoneNumberHeadManChange}
                    />
                  </div>
                </Form.Item>
              </Col>
            </Row>
          </div>
        </div>

        <div className={styles.btnContent}>
          <div>
            {!loadingSubmit ? (
              <button>
                <span className={styles.btnText}>{t('continue-buying')}</span>
                <ArrowRightIcon />
              </button>
            ) : (
              <button
                style={{ display: 'flex', justifyContent: 'center' }}
                disabled
              >
                <LoadingOutlined spin></LoadingOutlined>
              </button>
            )}
          </div>
        </div>
      </div>
    </Form>
  )
}

ContentCheckout.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

ContentCheckout.propTypes = {
  t: PropTypes.func.isRequired,
}

export default memo(withTranslation('common')(ContentCheckout))
