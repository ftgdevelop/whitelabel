import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment-jalaali'
import { i18n, withTranslation, Router } from '../../../../i18n'
import { useRouter } from 'next/router'
import { Form, Input, Radio, Row, Col, Select, notification } from 'antd'
import PhoneInput from '../../UI/PhoneInput/PhoneInput'
import _ from 'lodash'
import {
  ArrowRightIcon,
  SeatIcon,
  PlusOutlineIcon,
  RemoveSimpleIcon,
} from '../../UI/Icons'
import { sendPassenger, getAllCountries } from '../../../actions/index'
import { LoadingOutlined } from '@ant-design/icons'
import styles from '../../../styles/Flight.module.css'

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

const setObject = (item, index, t) => {
  return {
    infoBox: 'meli',
    type: item,
    number: index,
    validDate: {
      birthDateMiladi: true,
      birthDateJalali: true,
      expireDate: true,
    },
    value:
      item === 'ADT' ? t('adult') : item === 'CHD' ? t('child') : t('infant'),
    birthDate: {
      jalali: {
        day: '',
        month: '',
        year: '',
      },
      miladi: {
        day: '',
        month: '',
        year: '',
      },
    },
    passportExpireDate: {
      miladi: {
        day: '',
        month: '',
        year: '',
      },
    },
  }
}

const ContentCheckout = (props) => {
  const { t, userInfo } = props
  const router = useRouter()
  const passengers = []
  ;['ADT', 'CHD', 'INF'].map((item) => {
    for (let i = 0; i < props.passengers[item]; i++)
      passengers.push(setObject(item, i + 1, t))
  })

  const [form] = Form.useForm()
  const [persons, setPersons] = useState(passengers)
  const [loadingSubmit, setloadingSubmit] = useState(false)
  const [countries, setCountries] = useState([])

  const [phoneNumberValue, setPhoneNumberValue] = useState('')
  const [phoneNumberCountry, setPhoneNumberCountry] = useState('')

  useEffect(() => {
    const getCountries = async () => {
      const res = await getAllCountries()
      if (res.status == 200) {
        const country = _.sortBy(res.data.result.items, [
          function (country) {
            return country.name
          },
        ])
        setCountries(country)
      }
    }
    getCountries()

    if (props.userInfo?.phoneNumber) {
      setPhoneNumberValue(props.userInfo.phoneNumber)
    }
  }, [])

  const phoneInputChangeHandle = (value, country) => {
    setPhoneNumberCountry(country)
    setPhoneNumberValue(value)
  }

  const addPassenger = (action, passenger, index, t) => {
    if (action === 'minus' || persons.length < props.capacity) {
      changeItem(action, passenger, index, t)
    } else {
      openNotification('info', 'bottomRight', t('capacity-full'))
    }
  }

  const updatePassengers = (newPassenger) => {
    props.updatePassengers(newPassenger)
  }

  const changeItem = (action, label, index, t) => {
    let item = { ...props.passengers }
    const countChild = (item['CHD'] + item['INF'] + 1) / item['ADT']
    if (
      (label === 'CHD' || label === 'INF') &&
      action === 'plus' &&
      countChild > 3
    ) {
      openNotification(
        'info',
        'bottomRight',
        t('for-an-adult-two-child-or-three-infant'),
      )
      return
    } else if (label === 'ADT' && action === 'minus' && item[label] === 1) {
      openNotification(
        'info',
        'bottomRight',
        t('number-of-adult-cant-lower-than-one'),
      )
      return
    } else if (label === 'CHD' && action === 'plus' && countChild > 3) {
      openNotification(
        'info',
        'bottomRight',
        t('for-an-adult-two-child-or-three-infant'),
      )
      return
    } else if (
      label === 'INF' &&
      action === 'plus' &&
      item['INF'] + 1 > item['ADT']
    ) {
      openNotification(
        'info',
        'bottomRight',
        t('number-of-child-cant-higher-than-adults'),
      )
      return
    }

    if (action === 'plus') {
      if (persons.length < 9) {
        item[label] = item[label] + 1
        const count = persons.filter((item) => item.type === label).length
        const newPassenger = JSON.parse(JSON.stringify(persons))
        newPassenger.push(setObject(label, count + 1, t))
        setPersons(newPassenger)
        updatePassengers(item)
      } else {
        openNotification(
          'info',
          'bottomRight',
          'حداکثر تعداد مسافران 9 نفر است',
        )
        return
      }
    } else if (action === 'minus') {
      if (item[label]) {
        item[label] = item[label] - 1
        const newPassenger = JSON.parse(JSON.stringify(persons))
        newPassenger.splice(index, 1)
        setPersons(newPassenger)
        updatePassengers(item)
      }
    }
  }

  const onChange = (e, index) => {
    const newPersons = JSON.parse(JSON.stringify(persons))
    newPersons[index].infoBox = e.target.value
    setPersons(newPersons)
  }

  const onFinish = async (values) => {
    try {
      setloadingSubmit(true)
      const countPerson = persons.length
      const params_passengers = []
      for (let i = 0; i < countPerson; i++) {
        const id = `${persons[i].type}_${persons[i].number}_${persons[i].infoBox}`
        const nationality =
          persons[i].infoBox === 'pasport'
            ? _.split(values[`nationality_${id}`], '_')[1]
            : null

        const birth_date = `${values[`birthDate_year_${id}`]}-${
          values[`birthDate_month_${id}`]
        }-${values[`birthDate_day_${id}`]}`
        const passportExpireDate =
          persons[i].infoBox === 'pasport'
            ? `${values[`passportExpireDate_year_${id}`]}-${
                values[`passportExpireDate_month_${id}`]
              }-${values[`passportExpireDate_day_${id}`]}`
            : null
        const birthDate =
          persons[i].infoBox === 'meli'
            ? moment(birth_date, 'jYYYY/jM/jD').format('YYYY-MM-DD')
            : birth_date
        params_passengers.push({
          gender: values[`gender_${id}`],
          firstName: values[`firstName_${id}`],
          lastName: values[`lastName_${id}`],
          persianFirstName: values[`persianFirstName_${id}`],
          persianLastName: values[`persianLastName_${id}`],
          nationalId: values[`nationalId_${id}`]
            ? values[`nationalId_${id}`]
            : null,
          passportNumber: values[`passportNumber_${id}`]
            ? values[`passportNumber_${id}`]
            : null,
          passportExpireDate: passportExpireDate,
          birthDate: birthDate,
          passengerType: persons[i].type ? persons[i].type : null,
          nationality: nationality,
        })
      }

      const params = {
        passengers: params_passengers,
        reserver: {
          firstName: values.firstName,
          lastName: values.lastName,
          phoneNumber: values.registrationMobile
            .replace(/ +/g, '')
            .replace(/[{()}]/g, '')
            .replace(/-/g, ''),
          email: values.email,
          userName: '',
          gender: values.gender,
        },
        preReserveKey: router.query.key,
        captchaCode: captchaCode.value
      }

      const res = await sendPassenger(params)

      if (res.status == 200) {
        Router.push(
          `/payment?username=${res.data.result.reserver.userName}&reserveId=${res.data.result.id}`,
        )
      } else {
        openNotification('error', 'bottomRight', res.data.error.message)
        setloadingSubmit(false)
      }
    } catch {
      setloadingSubmit(false)
    }
  }

  const onFinishFailed = (errorInfo) => {
    const elmnt = document.getElementById(errorInfo.errorFields[0].name[0])
    if (elmnt) {
      const bodyRect = document.body.getBoundingClientRect()
      const elemRect = elmnt.getBoundingClientRect()
      const offset = elemRect.top - bodyRect.top - 200
      window.scrollTo({
        top: offset,
        behavior: 'smooth',
      })
    }
  }

  //field1 = birthDate | passportExpireDate
  //field2 = jalali " miladi"
  //field3 = day | month | year
  //typeDate = birthDateJalali | birthDateMiladi | expireDate
  const handleChangeDates = (
    value,
    index,
    field1,
    field2,
    field3,
    typeDate,
  ) => {
    const newPersons = JSON.parse(JSON.stringify(persons))
    newPersons[index][field1][field2][field3] = value
    if (
      newPersons[index][field1][field2].day &&
      newPersons[index][field1][field2].month &&
      newPersons[index][field1][field2].year
    ) {
      let datePerson = ''
      if (field2 === 'jalali') {
        datePerson = moment(
          `${newPersons[index][field1][field2].year}-${newPersons[index][field1][field2].month}-${newPersons[index][field1][field2].day}`,
          'jYYYY-jM-jD',
        )
      } else {
        datePerson = moment(
          `${newPersons[index][field1][field2].year}-${newPersons[index][field1][field2].month}-${newPersons[index][field1][field2].day}`,
        )
      }
      const infantDate = moment(datePerson).unix()
      const name = `${newPersons[index].type}_${newPersons[index].number}_${typeDate}`
      const type =
        typeDate === 'expireDate' ? 'passportExpire' : newPersons[index].type

      if (
        props.dateInfo.rangDate[type][0].unix() <= infantDate &&
        props.dateInfo.rangDate[type][1].unix() > infantDate
      ) {
        form.setFieldsValue({
          [name]: 'true',
        })
        newPersons[index].validDate[typeDate] = true
      } else {
        form.setFieldsValue({
          [name]: undefined,
        })
        newPersons[index].validDate[typeDate] = false
      }
    } else {
      form.setFieldsValue({
        [name]: 'true',
      })
      newPersons[index].validDate[typeDate] = true
    }

    setPersons(newPersons)
  }

  // const onValuesChange = (changedValues, values) => {
  //   // if(changedValues.firstName) {
  //     persianFirstName_ADT_1_meli.value = values.firstName;
  //   // }
  //   // if(changedValues.lastName) {
  //     persianLastName_ADT_1_meli.value = values.lastName;
  //   // }
  // }

  return (
    <Form
      name="basic"
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      // onValuesChange={onValuesChange}
    >
      <div className={styles.contentCheckout}>
        <div
          className={`${styles.guestDetails} ${
            process.env.THEME_NAME === 'TRAVELO' && styles.guestDetailsTravelo
          }`}
        >
          <div className={styles.cardTitle}>{t('reserver-information')}</div>
          <div className={styles.cardBody}>
            <Row gutter={[10, 0]}>
              <Col
                xs={24}
                sm={12}
                md={6}
                lg={6}
                xl={6}
                className="ant-form-item-flight"
              >
                <Form.Item
                  name="gender"
                  label={t('gender')}
                  rules={[
                    { required: true, message: t('please-choose-gender') },
                  ]}
                  initialValue={userInfo ? userInfo.gender : true}
                >
                  <Radio.Group style={{ display: 'flow-root' }}>
                    <Radio value={true}>{t('male')}</Radio>
                    <Radio value={false}>{t('female')}</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col
                xs={24}
                sm={12}
                md={9}
                lg={9}
                xl={9}
                className="ant-form-item-flight"
              >
                {/* <Form.Item label="نام" > */}
                {/* <Input.Group compact> */}
                {/* <Form.Item name="gender" noStyle>
                      <Select defaultValue="men" style={{ width: "30%", marginTop: "3px" }}>
                        <Option value="men">مرد</Option>
                        <Option value="women">زن</Option>
                      </Select>
                    </Form.Item> */}
                <Form.Item
                  initialValue={userInfo?.firstName || undefined}
                  name="firstName"
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
                {/* </Input.Group> */}
                {/* </Form.Item> */}
              </Col>
              <Col
                xs={24}
                sm={12}
                md={9}
                lg={9}
                xl={9}
                className="ant-form-item-flight"
              >
                <Form.Item
                  initialValue={userInfo?.lastName || undefined}
                  name="lastName"
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
              <Col
                xs={24}
                sm={12}
                md={9}
                lg={9}
                xl={9}
                className="ant-form-item-flight"
              >
                <Form.Item
                  initialValue={userInfo?.emailAddress || undefined}
                  name="email"
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
              <Col
                xs={24}
                sm={12}
                md={9}
                lg={9}
                xl={9}
                id="phoneNumber"
                className="ant-form-item-flight"
              >
                <Form.Item
                  initialValue={userInfo?.phoneNumber || ''}
                  name="registrationMobile"
                  className={`${
                    process.env.THEME_NAME === 'TRAVELO' &&
                    styles.formItemTravelo
                  }`}
                  label={t('phone-number')}
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
                      value={userInfo?.phoneNumber || undefined}
                      country="ir"
                      onChange={phoneInputChangeHandle}
                    />
                  </div>
                </Form.Item>
              </Col>
              {/* <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                <Form.Item
                  name="phoneNumber"
                  label="موبایل"
                  type="number"
                  rules={[
                    {
                      required: true,
                      message: "لطفا موبایل را وارد نمایید!",
                      len: 11,
                    },
                  ]}
                >
                  <Input
                    id="phoneNumber"
                    size="large"
                    onKeyPress={(e) => validateNumber(e)}
                  />
                </Form.Item>
              </Col>
             */}
            </Row>
          </div>
        </div>

        <div className={styles.passengerTitle}>
          <div>
            <div className={styles.subjectPassengerTitle}>
              <SeatIcon />
              <span>{t('enter-passenger-information')}</span>
            </div>
          </div>
          {/* <div>
            <div className={styles.numberPassengerTitle}>
              <div className={styles.passengerCount}>
                <b> {props.passengers["ADT"]} </b>
                <span>بزرگسال</span>
                <div
                  className={styles.plusCount}
                  onClick={() => addPassenger("plus", "ADT")}
                >
                  <PlusOutlineIcon />
                </div>
              </div>
              <div className={styles.passengerCount}>
                <b> {props.passengers["CHD"]} </b>
                <span>کودک</span>
                <div
                  className={styles.plusCount}
                  onClick={() => addPassenger("plus", "CHD")}
                >
                  <PlusOutlineIcon />
                </div>
              </div>
              <div
                className={styles.passengerCount}
                onClick={() => addPassenger("plus", "INF")}
              >
                <b> {props.passengers["INF"]} </b>
                <span>نوزاد</span>
                <div className={styles.plusCount}>
                  <PlusOutlineIcon />
                </div>
              </div>
            </div>
          </div> */}
        </div>

        {persons.map((person, index) => (
          <div
            className={styles.passngerDetails}
            key={`${person.type}${index + 1}`}
          >
            <div className={styles.cardBody}>
              <div className={styles.adultPassenger}>
                <div
                  className={` ${styles.headerAdultPassneger} ${
                    person.type === 'CHD'
                      ? styles.headerBabyPassneger
                      : person.type === 'INF'
                      ? styles.headerInfantPassneger
                      : ''
                  }`}
                >
                  <div className={styles.subjectAdultPassneger}>
                    <h4>{person.value}</h4>
                  </div>
                  {/* <div
                    className={styles.removePassneger}
                    onClick={() => addPassenger("minus", person.type, index,t)}
                  >
                    <RemoveSimpleIcon />
                  </div> */}
                </div>
                <div className={styles.contentAdultPassneger} layout="vertical">
                  <Row gutter={[10, 0]}>
                    <Col
                      xs={24}
                      sm={24}
                      md={24}
                      lg={24}
                      xl={24}
                      className="ant-form-item-flight"
                    >
                      <Form.Item className={styles.radioSelect}>
                        <Radio.Group
                          onChange={(e) => onChange(e, index)}
                          value={person.infoBox}
                        >
                          <Radio value="meli">
                            {t('buy-with-national-no')}
                          </Radio>
                          <Radio value="pasport">
                            {t('buy-with-passport-no')}
                          </Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={[10, 0]}>
                    <Col
                      xs={24}
                      sm={12}
                      md={8}
                      lg={8}
                      xl={8}
                      className="ant-form-item-flight"
                    >
                      <Form.Item
                        name={`gender_${person.type}_${person.number}_${person.infoBox}`}
                        label={t('gender')}
                        rules={[
                          {
                            required: true,
                            message: t('please-choose-gender'),
                          },
                        ]}
                        initialValue={true}
                      >
                        <Radio.Group style={{ display: 'flow-root' }}>
                          <Radio value={true}>{t('male')}</Radio>
                          <Radio value={false}>{t('female')}</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                    {person.infoBox === 'meli' ? (
                      <>
                        <Col
                          xs={24}
                          sm={12}
                          md={8}
                          lg={8}
                          xl={8}
                          className="ant-form-item-flight"
                        >
                          <Form.Item
                            name={`persianFirstName_${person.type}_${person.number}_${person.infoBox}`}
                            label={t('persian-name')}
                            rules={[
                              {
                                required: true,
                                message: t('please-enter-persian-name'),
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
                              id={`persianFirstName_${person.type}_${person.number}_${person.infoBox}`}
                              size="large"
                              className={`${styles.input95} ${
                                process.env.THEME_NAME === 'TRAVELO' &&
                                'input-travelo'
                              }`}
                            />
                          </Form.Item>
                        </Col>
                        <Col
                          xs={24}
                          sm={12}
                          md={8}
                          lg={8}
                          xl={8}
                          className="ant-form-item-flight"
                        >
                          <Form.Item
                            name={`persianLastName_${person.type}_${person.number}_${person.infoBox}`}
                            label={t('persian-family')}
                            rules={[
                              {
                                required: true,
                                message: t('please-enter-persian-family'),
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
                              id={`persianLastName_${person.type}_${person.number}_${person.infoBox}`}
                              size="large"
                              className={`${styles.input95} ${
                                process.env.THEME_NAME === 'TRAVELO' &&
                                'input-travelo'
                              }`}
                            />
                          </Form.Item>
                        </Col>
                      </>
                    ) : (
                      ''
                    )}
                    <Col
                      xs={24}
                      sm={12}
                      md={8}
                      lg={8}
                      xl={8}
                      className="ant-form-item-flight"
                    >
                      <Form.Item
                        name={`firstName_${person.type}_${person.number}_${person.infoBox}`}
                        label={t('english-name')}
                        rules={[
                          {
                            required: true,
                            message: t('please-enter-english-name'),
                          },
                          {
                            pattern: /^[a-zA-Z ]*$/,
                            message: t('just-english-letter-and-space'),
                          },
                        ]}
                      >
                        <Input
                          id={`firstName_${person.type}_${person.number}_${person.infoBox}`}
                          size="large"
                          className={`${styles.input95Tablet} ${
                            process.env.THEME_NAME === 'TRAVELO' &&
                            'input-travelo'
                          }`}
                        />
                      </Form.Item>
                    </Col>
                    <Col
                      xs={24}
                      sm={12}
                      md={8}
                      lg={8}
                      xl={8}
                      className="ant-form-item-flight"
                    >
                      <Form.Item
                        name={`lastName_${person.type}_${person.number}_${person.infoBox}`}
                        label={t('english-family')}
                        rules={[
                          {
                            required: true,
                            message: t('please-enter-english-family'),
                          },
                          {
                            pattern: /^[a-zA-Z ]*$/,
                            message: t('just-english-letter-and-space'),
                          },
                        ]}
                      >
                        <Input
                          id={`lastName_${person.type}_${person.number}_${person.infoBox}`}
                          size="large"
                          className={`${styles.input95} ${
                            process.env.THEME_NAME === 'TRAVELO' &&
                            'input-travelo'
                          }`}
                        />
                      </Form.Item>
                    </Col>
                    {person.infoBox === 'meli' ? (
                      <>
                        <Col
                          xs={24}
                          sm={12}
                          md={8}
                          lg={8}
                          xl={8}
                          className="ant-form-item-flight"
                        >
                          <Form.Item
                            name={`nationalId_${person.type}_${person.number}_${person.infoBox}`}
                            label={t('national-code')}
                            rules={[
                              {
                                required: true,
                                message: t('please-enter-national-code'),
                                len: 10,
                              },
                              {
                                pattern: /^[0123456789]*$/,
                                message: t('invalid-national-code'),
                              },
                            ]}
                          >
                            <Input
                              id={`nationalId_${person.type}_${person.number}_${person.infoBox}`}
                              size="large"
                              className={`${styles.input95Tablet} ${
                                process.env.THEME_NAME === 'TRAVELO' &&
                                'input-travelo'
                              }`}
                            />
                          </Form.Item>
                        </Col>

                        <Col
                          xs={24}
                          sm={12}
                          md={8}
                          lg={8}
                          xl={8}
                          className="ant-form-item-flight"
                        >
                          <Form.Item label={t('birthdate')}>
                            <Input.Group>
                              <Form.Item
                                name={[
                                  `birthDate_day_${person.type}_${person.number}_${person.infoBox}`,
                                ]}
                                noStyle
                                hasFeedback
                                className={styles.input95}
                                rules={[
                                  {
                                    required: !person.birthDate.jalali.day,
                                    message: t('please-enter-birthdate'),
                                  },
                                ]}
                              >
                                <Select
                                  defaultValue={t('day')}
                                  style={{ width: '25%', marginTop: '2px' }}
                                  id={`birthDate_day_${person.type}_${person.number}`}
                                  showSearch
                                  onChange={(e) =>
                                    handleChangeDates(
                                      e,
                                      index,
                                      'birthDate',
                                      'jalali',
                                      'day',
                                      'birthDateJalali',
                                    )
                                  }
                                  className={`${
                                    process.env.THEME_NAME === 'TRAVELO' &&
                                    'form-item-travelo'
                                  }`}
                                >
                                  <Option value="1">1</Option>
                                  <Option value="2">2</Option>
                                  <Option value="3">3</Option>
                                  <Option value="4">4</Option>
                                  <Option value="5">5</Option>
                                  <Option value="6">6</Option>
                                  <Option value="7">7</Option>
                                  <Option value="8">8</Option>
                                  <Option value="9">9</Option>
                                  <Option value="10">10</Option>
                                  <Option value="11">11</Option>
                                  <Option value="12">12</Option>
                                  <Option value="13">13</Option>
                                  <Option value="14">14</Option>
                                  <Option value="15">15</Option>
                                  <Option value="16">16</Option>
                                  <Option value="17">17</Option>
                                  <Option value="18">18</Option>
                                  <Option value="19">19</Option>
                                  <Option value="20">20</Option>
                                  <Option value="21">21</Option>
                                  <Option value="22">22</Option>
                                  <Option value="23">23</Option>
                                  <Option value="24">24</Option>
                                  <Option value="25">25</Option>
                                  <Option value="26">26</Option>
                                  <Option value="27">27</Option>
                                  <Option value="28">28</Option>
                                  <Option value="29">29</Option>
                                  <Option value="30">30</Option>
                                  <Option value="31">31</Option>
                                </Select>
                              </Form.Item>
                              <Form.Item
                                name={[
                                  `birthDate_month_${person.type}_${person.number}_${person.infoBox}`,
                                ]}
                                noStyle
                                hasFeedback
                                className={styles.input95}
                                rules={[
                                  {
                                    required:
                                      person.birthDate.jalali.day &&
                                      !person.birthDate.jalali.month,
                                    message: t('please-enter-birthdate'),
                                  },
                                ]}
                              >
                                <Select
                                  id={`birthDate_month_${person.type}_${person.number}`}
                                  showSearch
                                  defaultValue={t('month')}
                                  style={{
                                    width: '42%',
                                    paddingRight: '5px',
                                  }}
                                  onChange={(e) =>
                                    handleChangeDates(
                                      e,
                                      index,
                                      'birthDate',
                                      'jalali',
                                      'month',
                                      'birthDateJalali',
                                    )
                                  }
                                  className={`${
                                    process.env.THEME_NAME === 'TRAVELO' &&
                                    'form-item-travelo'
                                  }`}
                                >
                                  {props.dateInfo.years.monthJalali.map(
                                    (val, index) => (
                                      <Option value={index + 1} key={index}>
                                        {index + 1 > 9
                                          ? index + 1
                                          : 0 + (index + 1)}{' '}
                                        - {val}
                                      </Option>
                                    ),
                                  )}
                                </Select>
                              </Form.Item>
                              <Form.Item
                                name={[
                                  `birthDate_year_${person.type}_${person.number}_${person.infoBox}`,
                                ]}
                                noStyle
                                hasFeedback
                                className={styles.input95}
                                rules={[
                                  {
                                    required:
                                      person.birthDate.jalali.day &&
                                      person.birthDate.jalali.month &&
                                      !person.birthDate.jalali.year,
                                    message: t('please-enter-birthdate'),
                                  },
                                ]}
                              >
                                <Select
                                  id={`birthDate_year_${person.type}_${person.number}_${person.infoBox}`}
                                  defaultValue={t('year')}
                                  showSearch
                                  style={{
                                    width: '28%',
                                    paddingRight: '5px',
                                  }}
                                  onChange={(e) =>
                                    handleChangeDates(
                                      e,
                                      index,
                                      'birthDate',
                                      'jalali',
                                      'year',
                                      'birthDateJalali',
                                    )
                                  }
                                  className={`${
                                    process.env.THEME_NAME === 'TRAVELO' &&
                                    'form-item-travelo'
                                  }`}
                                >
                                  {props.dateInfo.years[person.type].jalali.map(
                                    (value, index) => (
                                      <Option value={value} key={index}>
                                        {value}
                                      </Option>
                                    ),
                                  )}
                                </Select>
                              </Form.Item>
                              <Form.Item
                                noStyle
                                name={`${person.type}_${person.number}_birthDateJalali`}
                                rules={[
                                  {
                                    required: true,
                                    message: person.validDate.birthDateJalali
                                      ? ' '
                                      : person.type === 'INF'
                                      ? t('infant-age-between')
                                      : person.type === 'CHD'
                                      ? t('child-age-between')
                                      : t('adult-age-between'),
                                  },
                                ]}
                              >
                                <Input
                                  hidden
                                  id={`${person.type}_${person.number}_birthDateJalali`}
                                  defaultValue="true"
                                  value="true"
                                />
                              </Form.Item>
                            </Input.Group>
                          </Form.Item>
                        </Col>
                      </>
                    ) : (
                      ''
                    )}
                    {person.infoBox === 'pasport' ? (
                      <>
                        <Col
                          xs={24}
                          sm={12}
                          md={8}
                          lg={8}
                          xl={8}
                          className="ant-form-item-flight"
                        >
                          <Form.Item
                            name={`nationality_${person.type}_${person.number}_${person.infoBox}`}
                            label={t('born-country')}
                            className={styles.input95Tablet}
                            rules={[
                              {
                                required: true,
                                message: t('please-enter-born-country'),
                              },
                            ]}
                          >
                            <Select
                              showSearch
                              defaultValue={t('choose')}
                              id={`nationality_${person.type}_${person.number}_${person.infoBox}`}
                              className={`${
                                process.env.THEME_NAME === 'TRAVELO' &&
                                'form-item-travelo'
                              }`}
                            >
                              {countries.map((country, index) => (
                                <Option
                                  value={`${country.name}_${country.code}`}
                                  key={index}
                                >
                                  {country.name}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>

                        <Col
                          xs={24}
                          sm={12}
                          md={8}
                          lg={8}
                          xl={8}
                          className="ant-form-item-flight"
                        >
                          <Form.Item label={t('gregorian-birthdate')}>
                            <Input.Group comact>
                              <Form.Item
                                name={[
                                  `birthDate_day_${person.type}_${person.number}_${person.infoBox}`,
                                ]}
                                noStyle
                                rules={[
                                  {
                                    required: !person.birthDate.miladi.day,
                                    message: t('please-enter-birthdate'),
                                  },
                                ]}
                              >
                                <Select
                                  defaultValue={t('day')}
                                  style={{ width: '23%', marginTop: '2px' }}
                                  showSearch
                                  id={`birthDate_day_${person.type}_${person.number}`}
                                  onChange={(e) =>
                                    handleChangeDates(
                                      e,
                                      index,
                                      'birthDate',
                                      'miladi',
                                      'day',
                                      'birthDateMiladi',
                                    )
                                  }
                                  className={`${
                                    process.env.THEME_NAME === 'TRAVELO' &&
                                    'form-item-travelo'
                                  }`}
                                >
                                  <Option value="1">1</Option>
                                  <Option value="2">2</Option>
                                  <Option value="3">3</Option>
                                  <Option value="4">4</Option>
                                  <Option value="5">5</Option>
                                  <Option value="6">6</Option>
                                  <Option value="7">7</Option>
                                  <Option value="8">8</Option>
                                  <Option value="9">9</Option>
                                  <Option value="10">10</Option>
                                  <Option value="11">11</Option>
                                  <Option value="12">12</Option>
                                  <Option value="13">13</Option>
                                  <Option value="14">14</Option>
                                  <Option value="15">15</Option>
                                  <Option value="16">16</Option>
                                  <Option value="17">17</Option>
                                  <Option value="18">18</Option>
                                  <Option value="19">19</Option>
                                  <Option value="20">20</Option>
                                  <Option value="21">21</Option>
                                  <Option value="22">22</Option>
                                  <Option value="23">23</Option>
                                  <Option value="24">24</Option>
                                  <Option value="25">25</Option>
                                  <Option value="26">26</Option>
                                  <Option value="27">27</Option>
                                  <Option value="28">28</Option>
                                  <Option value="29">29</Option>
                                  <Option value="30">30</Option>
                                  <Option value="31">31</Option>
                                </Select>
                              </Form.Item>
                              <Form.Item
                                name={[
                                  `birthDate_month_${person.type}_${person.number}_${person.infoBox}`,
                                ]}
                                noStyle
                                rules={[
                                  {
                                    required:
                                      person.birthDate.miladi.day &&
                                      !person.birthDate.miladi.month,
                                    message: t('please-enter-birthdate'),
                                  },
                                ]}
                              >
                                <Select
                                  id={`birthDate_month_${person.type}_${person.number}`}
                                  defaultValue={t('month')}
                                  showSearch
                                  onChange={(e) =>
                                    handleChangeDates(
                                      e,
                                      index,
                                      'birthDate',
                                      'miladi',
                                      'month',
                                      'birthDateMiladi',
                                    )
                                  }
                                  style={{
                                    width: '42%',
                                    paddingRight: '5px',
                                  }}
                                  className={`${
                                    process.env.THEME_NAME === 'TRAVELO' &&
                                    'form-item-travelo'
                                  }`}
                                >
                                  {props.dateInfo.years.monthMiladi.map(
                                    (val, index) => (
                                      <Option value={index + 1} key={index}>
                                        {index + 1 > 9 ? index + 1 : index + 1}{' '}
                                        - {val}
                                      </Option>
                                    ),
                                  )}
                                </Select>
                              </Form.Item>
                              <Form.Item
                                name={[
                                  `birthDate_year_${person.type}_${person.number}_${person.infoBox}`,
                                ]}
                                noStyle
                                rules={[
                                  {
                                    required:
                                      person.birthDate.miladi.day &&
                                      person.birthDate.miladi.month &&
                                      !person.birthDate.miladi.year,
                                    message: t('please-enter-birthdate'),
                                  },
                                ]}
                              >
                                <Select
                                  id={`birthDate_year_${person.type}_${person.number}_${person.infoBox}`}
                                  defaultValue={t('year')}
                                  showSearch
                                  onChange={(e) =>
                                    handleChangeDates(
                                      e,
                                      index,
                                      'birthDate',
                                      'miladi',
                                      'year',
                                      'birthDateMiladi',
                                    )
                                  }
                                  style={{
                                    width: '35%',
                                    paddingRight: '5px',
                                  }}
                                  className={`${
                                    process.env.THEME_NAME === 'TRAVELO' &&
                                    'form-item-travelo'
                                  }`}
                                >
                                  {props.dateInfo.years[person.type].miladi.map(
                                    (value, index) => (
                                      <Option value={value} key={index}>
                                        {value}
                                      </Option>
                                    ),
                                  )}
                                </Select>
                              </Form.Item>
                              <Form.Item
                                noStyle
                                name={`${person.type}_${person.number}_birthDateMiladi`}
                                rules={[
                                  {
                                    required: true,
                                    message: person.validDate.birthDateMiladi
                                      ? ' '
                                      : person.type === 'INF'
                                      ? t('infant-age-between')
                                      : person.type === 'CHD'
                                      ? t('child-age-between')
                                      : t('adult-age-between'),
                                  },
                                ]}
                              >
                                <Input
                                  hidden
                                  id={`${person.type}_${person.number}_birthDateMiladi`}
                                  defaultValue="true"
                                  value="true"
                                />
                              </Form.Item>
                            </Input.Group>
                          </Form.Item>
                        </Col>

                        <Col
                          xs={24}
                          sm={12}
                          md={8}
                          lg={8}
                          xl={8}
                          className="ant-form-item-flight"
                        >
                          <Form.Item
                            name={`passportNumber_${person.type}_${person.number}_${person.infoBox}`}
                            label="شماره پاسپورت"
                            rules={[
                              {
                                required: true,
                                message: t('please-enter-passport-no'),
                              },
                            ]}
                          >
                            <Input
                              id={`passportNumber_${person.type}_${person.number}_${person.infoBox}`}
                              size="large"
                              className={`${styles.input95Tablet} ${
                                process.env.THEME_NAME === 'TRAVELO' &&
                                'input-travelo'
                              }`}
                            />
                          </Form.Item>
                        </Col>
                        <Col
                          xs={24}
                          sm={12}
                          md={8}
                          lg={8}
                          xl={8}
                          className="ant-form-item-flight"
                        >
                          <Form.Item
                            name={`passportCountry_${person.type}_${person.number}_${person.infoBox}`}
                            label={t('passport-country')}
                            className={styles.input95}
                            rules={[
                              {
                                required: true,
                                message: t('please-enter-passport-country'),
                              },
                            ]}
                          >
                            <Select
                              showSearch
                              defaultValue={t('choose')}
                              id={`passportCountry_${person.type}_${person.number}_${person.infoBox}`}
                              className={`${
                                process.env.THEME_NAME === 'TRAVELO' &&
                                'form-item-travelo'
                              }`}
                            >
                              {countries.map((country, index) => (
                                <Option
                                  value={`${country.name}_${country.code}`}
                                  key={index}
                                >
                                  {country.name}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col
                          xs={24}
                          sm={12}
                          md={8}
                          lg={8}
                          xl={8}
                          className="ant-form-item-flight"
                        >
                          <Form.Item label={t('passport-expire-date')}>
                            <Input.Group>
                              <Form.Item
                                name={[
                                  `passportExpireDate_day_${person.type}_${person.number}_${person.infoBox}`,
                                ]}
                                noStyle
                                rules={[
                                  {
                                    required: !person.passportExpireDate.day,
                                    message: t(
                                      'please-enter-passport-expire-date',
                                    ),
                                  },
                                ]}
                              >
                                <Select
                                  id={`passportExpireDate_day_${person.type}_${person.number}`}
                                  defaultValue="روز"
                                  showSearch
                                  onChange={(e) =>
                                    handleChangeDates(
                                      e,
                                      index,
                                      'passportExpireDate',
                                      'miladi',
                                      'day',
                                      'expireDate',
                                    )
                                  }
                                  style={{ width: '21%', marginTop: '2px' }}
                                  className={`${
                                    process.env.THEME_NAME === 'TRAVELO' &&
                                    'form-item-travelo'
                                  }`}
                                >
                                  <Option value="1">1</Option>
                                  <Option value="2">2</Option>
                                  <Option value="3">3</Option>
                                  <Option value="4">4</Option>
                                  <Option value="5">5</Option>
                                  <Option value="6">6</Option>
                                  <Option value="7">7</Option>
                                  <Option value="8">8</Option>
                                  <Option value="9">9</Option>
                                  <Option value="10">10</Option>
                                  <Option value="11">11</Option>
                                  <Option value="12">12</Option>
                                  <Option value="13">13</Option>
                                  <Option value="14">14</Option>
                                  <Option value="15">15</Option>
                                  <Option value="16">16</Option>
                                  <Option value="17">17</Option>
                                  <Option value="18">18</Option>
                                  <Option value="19">19</Option>
                                  <Option value="20">20</Option>
                                  <Option value="21">21</Option>
                                  <Option value="22">22</Option>
                                  <Option value="23">23</Option>
                                  <Option value="24">24</Option>
                                  <Option value="25">25</Option>
                                  <Option value="26">26</Option>
                                  <Option value="27">27</Option>
                                  <Option value="28">28</Option>
                                  <Option value="29">29</Option>
                                  <Option value="30">30</Option>
                                  <Option value="31">31</Option>
                                </Select>
                              </Form.Item>
                              <Form.Item
                                name={[
                                  `passportExpireDate_month_${person.type}_${person.number}_${person.infoBox}`,
                                ]}
                                noStyle
                                rules={[
                                  {
                                    required:
                                      person.passportExpireDate.day &&
                                      !person.passportExpireDate.month,
                                    message: t(
                                      'please-enter-passport-expire-date',
                                    ),
                                  },
                                ]}
                              >
                                <Select
                                  id={`passportExpireDate_month_${person.type}_${person.number}`}
                                  defaultValue={t('month')}
                                  showSearch
                                  onChange={(e) =>
                                    handleChangeDates(
                                      e,
                                      index,
                                      'passportExpireDate',
                                      'miladi',
                                      'month',
                                      'expireDate',
                                    )
                                  }
                                  style={{
                                    width: '42%',
                                    paddingRight: '5px',
                                  }}
                                  className={`${
                                    process.env.THEME_NAME === 'TRAVELO' &&
                                    'form-item-travelo'
                                  }`}
                                >
                                  {props.dateInfo.years.monthMiladi.map(
                                    (value, index) => (
                                      <Option value={index + 1}>
                                        {index + 1 > 9 ? index + 1 : index + 1}{' '}
                                        - {value}
                                      </Option>
                                    ),
                                  )}
                                </Select>
                              </Form.Item>
                              <Form.Item
                                name={[
                                  `passportExpireDate_year_${person.type}_${person.number}_${person.infoBox}`,
                                ]}
                                noStyle
                                rules={[
                                  {
                                    required:
                                      person.passportExpireDate.day &&
                                      person.passportExpireDate.month &&
                                      !person.passportExpireDate.year,
                                    message: t(
                                      'please-enter-passport-expire-date',
                                    ),
                                  },
                                ]}
                              >
                                <Select
                                  id={`passportExpireDate_year_${person.type}_${person.number}_${person.infoBox}`}
                                  defaultValue={t('year')}
                                  showSearch
                                  onChange={(e) =>
                                    handleChangeDates(
                                      e,
                                      index,
                                      'passportExpireDate',
                                      'miladi',
                                      'year',
                                      'expireDate',
                                    )
                                  }
                                  style={{
                                    width: '31%',
                                    paddingRight: '5px',
                                  }}
                                  className={`${
                                    process.env.THEME_NAME === 'TRAVELO' &&
                                    'form-item-travelo'
                                  }`}
                                >
                                  {props.dateInfo.years.passportExpire.map(
                                    (value, index) => (
                                      <Option value={value} key={index}>
                                        {value}
                                      </Option>
                                    ),
                                  )}
                                </Select>
                              </Form.Item>
                              <Form.Item
                                noStyle
                                name={`${person.type}_${person.number}_expireDate`}
                                rules={[
                                  {
                                    required: true,
                                    message: person.validDate.expireDate
                                      ? ' '
                                      : t('invalid-passport-expire-date'),
                                  },
                                ]}
                              >
                                <Input
                                  hidden
                                  id={`${person.type}_${person.number}_expireDate`}
                                  defaultValue="true"
                                  value="true"
                                />
                              </Form.Item>
                            </Input.Group>
                          </Form.Item>
                        </Col>
                      </>
                    ) : (
                      ''
                    )}
                  </Row>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className={styles.btnContent}>
          <div>
            {props.captchaLink == 0 ? null : (
              <div className="captcha-link">
                <Form.Item name="captchaCode" label="کد تصویر را وارد نمایید">
                  <img src={props.captchaLink} />
                  <Input
                    id="captchaCode"
                    size="large"
                    className={`${
                      process.env.THEME_NAME === 'TRAVELO' && 'input-travelo'
                    }`}
                  />
                </Form.Item>
              </div>
            )}
            {!loadingSubmit ? (
              <button>
                <span className={styles.btnText}>{t('continue-buying')}</span>
                <ArrowRightIcon />
              </button>
            ) : (
              <button className={styles.loadingFlight}>
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

const mapStateToProp = (state) => {
  return {
    dateInfo: state.dateInfo,
  }
}

export default withTranslation('common')(
  connect(mapStateToProp, null)(ContentCheckout),
)
