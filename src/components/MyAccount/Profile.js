import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link, i18n, withTranslation } from '../../../i18n'
import {
  Form,
  Input,
  Select,
  Skeleton,
  Button,
  Switch,
  Row,
  Col,
  Radio,
  notification,
} from 'antd'
import PhoneInput from '../UI/PhoneInput/PhoneInput'
import { RightOutlined } from '@ant-design/icons'
import moment from 'moment-jalaali'
import { LoadingOutlined } from '@ant-design/icons'
import VerifyNumber from './VerifyNumber'

import {
  updateProfile,
  updateProfileMobile,
  updateProfileEmail,
  userProfile,
  sendEmailActivation,
  UpdateNewsletterUserProfile,
  sendVerificationCode,
} from '../../actions/user/authActions'

import styles from '../../styles/Home.module.css'
import { ProfileIcon, InfoIcon } from '../../components/UI/Icons'
import AsideMyAccount from './AsideMyAccount'
import RegisterMessage from '../UI/Message/RegisterMessage'
import { changeStatusRegisterMessage } from '../../actions'

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

const Profile = (props) => {
  const [form] = Form.useForm()
  const [statusRegister, setStatusRegister] = useState(
    props.statusRegister === true ? true : false,
  )
  const [loadingSendMobile, setLoadingSendMobile] = useState(false)
  const [loadingSendEmail, setLoadingSendEmail] = useState(false)
  const [loadingSend, setLoadingSend] = useState(false)
  const [modalRegistterMobile, setModalRegistterMobile] = useState(false)

  const [email, setEmail] = useState('')
  const [loadingActiveEmail, setLoadingActiveEmail] = useState(false)
  const [loadingNewsLater, setLoadingNewsLater] = useState(false)

  const [phoneNumberValue, setPhoneNumberValue] = useState('')
  const [phoneNumberCountry, setPhoneNumberCountry] = useState('')

  const { t } = props

  const [birthDate, setBirthDate] = useState({
    day: '',
    month: '',
    year: '',
  })

  const phoneInputChangeHandle = (value, country) => {
    setPhoneNumberCountry(country)
    setPhoneNumberValue(value)
  }

  useEffect(() => {
    const fillFileds = async () => {
      checkRegisterWithMobile()
      const birthdate = await handelBirthDay()

      form.setFieldsValue({
        gender: props.auth.user.gender,
        firstname: props.auth.user.firstName,
        lastname: props.auth.user.lastName,
        nationalId: props.auth.user.nationalityId,
        isNewsLater: props.auth.user.isNewsLater,
        birthDate_day: birthdate.day,
        birthDate_month: birthdate.month,
        birthDate_year: birthdate.year,
      })
    }
    fillFileds()
  }, [])

  useEffect(() => {
    handelBirthDay()
  }, [props.auth.user.birthDay])

  const handelBirthDay = () => {
    if (!modalRegistterMobile) {
      checkRegisterWithMobile()
    }
    if (props.auth.user.birthDay) {
      const date = {
        day: moment(props.auth.user.birthDay).format('jD'),
        month: moment(props.auth.user.birthDay).format('jM'),
        year: moment(props.auth.user.birthDay).format('jYYYY'),
      }
      setBirthDate(date)
      return date
    }
  }

  const hiddenMsg = () => {
    props.changeStatusRegisterMessage(false)
    setStatusRegister(false)
  }

  const onFinish = async (values) => {
    if (!loadingSend) {
      const params = handelParams(values)
      setLoadingSend(true)
      const response = await updateProfile(params, i18n.language)
      setLoadingSend(false)

      if (response) {
        if (response.status == 200) {
          props.userProfile()
        }
        handelResponseMsg(response, 'اطلاعات با موفقیت ارسال شد')
      }
    }
  }

  const handelResponseMsg = (response, msg) => {
    if (response) {
      if (response.status == 200) {
        showMessage(response.data?.error?.message ?? msg, 'success')
      } else
        showMessage(
          response && response.data
            ? response.data.error.message
            : response.problem
            ? response.problem
            : null,
          'error',
        )
    } else {
      showMessage(t('sending-info-unsuccessful'), 'error')
    }
  }

  const handelParams = (values) => {
    const params = { gender: values.gender }
    if (params.gender !== false) params.gender = true

    if (birthDate.year && birthDate.month && birthDate.day) {
      params.birthDay = `${birthDate.year}-${birthDate.month}-${birthDate.day}`
      params.birthDay = moment(params.birthDay, 'jYYYY-jMM-jDD').format(
        'YYYY-MM-DD',
      )
    } else {
      params.birthDay = null
    }

    params.isNewsLater = params.isNewsLater ? true : false
    params.firstname = values.firstname
    params.lastname = values.lastname
    params.nationalId = values.nationalId
    return params
  }

  const ModalRegistterMobile = (value) => {
    setModalRegistterMobile(value)
    if (!value) {
      hiddenMsg()
    } else {
      onSendVerificationCode()
    }
  }

  const onSendVerificationCode = async () => {
    const response = await props.sendVerificationCode({
      phoneNumber: props.auth.user.phoneNumber,
    })

    if (response.status !== 200) {
      showMessage(response.data.error.message, 'error')
    }
  }

  const showMessage = (msg, status) => {
    openNotification(status, 'bottomRight', msg)
  }

  const handleChangeDates = (value, field) => {
    const date = JSON.parse(JSON.stringify(birthDate))
    date[field] = value
    setBirthDate(date)
  }

  const sendMobile = async (values) => {
    if (!loadingSendMobile) {
      setLoadingSendMobile(true)

      const response = await updateProfileMobile({
        phonenumber: values.userMobile
          .replace(/ +/g, '')
          .replace(/[{()}]/g, '')
          .replace(/-/g, ''),
      })

      setLoadingSendMobile(false)

      if (response) {
        if (response.status == 200) {
          props.userProfile()
          ModalRegistterMobile(true)
        }
        handelResponseMsg(response, 'اطلاعات با موفقیت ارسال شد')
      } else {
        showMessage(t('sending-info-unsuccessful'), 'error')
      }
    }
  }

  const sendEmail = async (values) => {
    if (!loadingSendEmail) {
      setLoadingSendEmail(true)
      const response = await updateProfileEmail(values, i18n.language)
      setLoadingSendEmail(false)
      if (response) {
        if (response.status == 200) {
          props.userProfile()
        }
        handelResponseMsg(response, 'ایمیل تایید برای شما ارسال شد')
      } else {
        // showMessage( t("sending-info-unsuccessful"), "error");
      }
    }
  }

  const checkRegisterWithMobile = () => {
    if (statusRegister && props.auth.user.phoneNumber) {
      setModalRegistterMobile(true)
    }
  }

  const changeEmail = (e) => {
    setEmail(e.currentTarget.value)
  }

  const sendActiveEmail = async () => {
    if (!loadingActiveEmail) {
      setLoadingActiveEmail(true)
      const response = await sendEmailActivation(props.auth.user.emailAddress)
      setLoadingActiveEmail(false)
      if (response) {
        if (response.status == 200) {
          props.userProfile()
        }
        handelResponseMsg(response, 'ایمیل تایید برای شما ارسال شد')
      } else {
        showMessage(t('sending-info-unsuccessful'), 'error')
      }
    }
  }

  const updateNewsLater = async (value) => {
    setLoadingNewsLater(true)
    const response = await UpdateNewsletterUserProfile({ isNewsletter: value })
    setLoadingNewsLater(false)
    if (response) {
      handelResponseMsg(response, 'اطلاعات با موفقیت ارسال شد')
    }
  }

  const phoneNumberElement = React.createRef()

  return (
    <>
      <Row>
        {props.statusRegister ? (
          <Col xs={24} className={styles.registerMessage}>
            <div
              className="signup__success-message"
              onClick={() => hiddenMsg()}
            >
              <RegisterMessage />
            </div>
          </Col>
        ) : null}
        <Col xs={24} sm={24} md={24} lg={7} xl={8}>
          <div className={styles.asideMobile}>
            <AsideMyAccount />
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={17} xl={16}>
          <div className={styles.backHomeProfile}>
            <Link as="/myaccount" href="/myaccount">
              <a>
                <RightOutlined />
                {t('return')}
              </a>
            </Link>
          </div>
          <div className={styles.profilePage}>
            <div className={styles.headProfilePage}>
              <ProfileIcon />
              <div className={styles.headProfilePageText}>
                <h2>{t('profile')}</h2>
                <span>{t('view-edit-informaion')}</span>
              </div>
            </div>
            {props.auth.isAuthenticated ? (
              <div className={styles.contentProfilePage}>
                <div className={styles.accountInformation}>
                  <h3>{t('profile-information')}</h3>

                  <Form
                    name="complex-form"
                    layout="vertical"
                    onFinish={onFinish}
                    form={form}
                  >
                    <Row>
                      <Col span={24}>
                        <Form.Item
                          name="gender"
                          label={t('gender')}
                          initialValue={
                            props.auth.user.gender === undefined
                              ? true
                              : props.auth.user.gender
                          }
                        >
                          <Radio.Group style={{ display: 'flow-root' }}>
                            <Radio value={true}>{t('male')}</Radio>
                            <Radio value={false}>{t('female')}</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={[20, 20]}>
                      <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Form.Item
                          label={t('name')}
                          name="firstname"
                          rules={[
                            { required: true, message: t('please-enter-name') },
                            {
                              pattern: new RegExp(
                                /^[a-zA-Zآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ ]*$/,
                              ),
                              message: t(
                                'just-english-persian-letter-and-space',
                              ),
                            },
                          ]}
                          initialValue={props.auth.user.firstName}
                          className={`${
                            process.env.THEME_NAME === 'TRAVELO' &&
                            styles.formItemTravelo
                          }`}
                        >
                          <Input size="large" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Form.Item
                          label={t('family')}
                          name="lastname"
                          rules={[
                            {
                              required: true,
                              message: t('please-enter-family'),
                            },
                            {
                              pattern: new RegExp(
                                /^[a-zA-Zآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ ]*$/,
                              ),
                              message: t(
                                'just-english-persian-letter-and-space',
                              ),
                            },
                          ]}
                          initialValue={props.auth.user.lastName}
                          className={`${
                            process.env.THEME_NAME === 'TRAVELO' &&
                            styles.formItemTravelo
                          }`}
                        >
                          <Input
                            size="large"
                            defaultValue={props.auth.user.lastName}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={[20, 20]}>
                      <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Form.Item
                          label={t('national-code')}
                          name="nationalId"
                          initialValue={props.auth.user.nationalId}
                          className={`${
                            process.env.THEME_NAME === 'TRAVELO' &&
                            styles.formItemTravelo
                          }`}
                        >
                          <Input size="large" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Form.Item label={t('birthdate')}>
                          <Input.Group>
                            <Form.Item
                              name={[`birthDate_day`]}
                              noStyle
                              hasFeedback
                              className={styles.input95}
                            >
                              <Select
                                defaultValue={birthDate.day || t('day')}
                                style={{ width: '25%', marginTop: '2px' }}
                                id={`birthDate_day`}
                                showSearch
                                onChange={(e) => handleChangeDates(e, 'day')}
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
                              name={[`birthDate_month`]}
                              noStyle
                              hasFeedback
                              className={styles.input95}
                            >
                              <Select
                                id={`birthDate_month`}
                                showSearch
                                defaultValue={birthDate.month || t('month')}
                                style={{
                                  width: '42%',
                                  paddingRight: '5px',
                                }}
                                onChange={(e) => handleChangeDates(e, 'month')}
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
                              name={[`birthDate_year`]}
                              noStyle
                              hasFeedback
                              className={styles.input95}
                            >
                              <Select
                                id={`birthDate_year`}
                                defaultValue={birthDate.year || t('year')}
                                showSearch
                                style={{
                                  width: '28%',
                                  paddingRight: '5px',
                                }}
                                onChange={(e) => handleChangeDates(e, 'year')}
                                className={`${
                                  process.env.THEME_NAME === 'TRAVELO' &&
                                  'form-item-travelo'
                                }`}
                              >
                                {props.dateInfo.years['ADT'].jalali.map(
                                  (value, index) => (
                                    <Option value={value} key={index}>
                                      {value}
                                    </Option>
                                  ),
                                )}
                              </Select>
                            </Form.Item>
                          </Input.Group>
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item label={t('subscribe')} name="isNewsLater">
                      <Switch
                        onChange={(e) => updateNewsLater(e)}
                        defaultChecked={props.auth.user.isNewsletter}
                      />
                      {loadingNewsLater && (
                        <LoadingOutlined style={{ marginRight: '10px' }} />
                      )}
                    </Form.Item>

                    <Button type="primary" size="large" htmlType="submit">
                      <span>{t('save')}</span>
                      {loadingSend ? (
                        <LoadingOutlined
                          spin
                          className={styles.icon}
                          style={{ marginRight: '10px' }}
                        />
                      ) : (
                        ''
                      )}
                    </Button>
                  </Form>
                </div>
                <div className={styles.accountInformationContact}>
                  <h3>{t('contact-info')}</h3>
                  <Form name="emailForm" layout="vertical" onFinish={sendEmail}>
                    <Row>
                      <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Form.Item
                          label={t('email')}
                          name="emailAddress"
                          rules={[
                            {
                              required: true,
                              message: t('enter-your-email-address'),
                            },
                            { type: 'email', message: t('email-invalid') },
                          ]}
                          initialValue={props.auth.user.emailAddress}
                          className={`${
                            process.env.THEME_NAME === 'TRAVELO' &&
                            styles.formItemTravelo
                          }`}
                        >
                          <div>
                            <Input
                              size="large"
                              className={styles.input95}
                              defaultValue={props.auth.user.emailAddress}
                              onChange={(e) => changeEmail(e)}
                              disabled={
                                props.auth.user.emailAddress &&
                                props.auth.user.isEmailConfirmed
                                  ? true
                                  : false
                              }
                            />
                            {props.auth.user.emailAddress ? (
                              props.auth.user.isEmailConfirmed ? null : (
                                <div className={styles.messageUnavailable}>
                                  <span className={styles.dot}></span>
                                  <span>{t('not-confirmed')}</span>
                                </div>
                              )
                            ) : null}
                          </div>
                        </Form.Item>
                      </Col>
                      {props.auth.user.emailAddress !== email &&
                      email &&
                      !props.auth.user.isEmailConfirmed ? (
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                          <Button
                            type="primary"
                            size="large"
                            htmlType="submit"
                            style={{ marginTop: '30px' }}
                          >
                            <span>{t('save')}</span>
                            {loadingSendEmail ? (
                              <LoadingOutlined
                                spin
                                className={styles.icon}
                                style={{ marginRight: '10px' }}
                              />
                            ) : (
                              ''
                            )}
                          </Button>
                        </Col>
                      ) : (
                        ''
                      )}
                    </Row>
                  </Form>

                  {props.auth.user.emailAddress ? (
                    props.auth.user.isEmailConfirmed ? null : (
                      <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                          <div className={styles.warningResendEmail}>
                            <div className={styles.contantWarningResendEmail}>
                              <InfoIcon />
                              <span>{t('confirm-email')}</span>
                              <button onClick={sendActiveEmail}>
                                {t('send-again')}
                                {loadingActiveEmail ? (
                                  <LoadingOutlined
                                    spin
                                    className={styles.icon}
                                    style={{ marginRight: '10px' }}
                                  />
                                ) : (
                                  ''
                                )}
                              </button>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    )
                  ) : null}

                  <Form
                    name="mobileForm"
                    layout="vertical"
                    onFinish={sendMobile}
                  >
                    <Row>
                      <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Form.Item
                          name="userMobile"
                          className={`${
                            process.env.THEME_NAME === 'TRAVELO' &&
                            styles.formItemTravelo
                          }`}
                          label={t('cellphone')}
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
                                      new Error(t('enter-mobile')),
                                    )

                                  return Promise.reject(
                                    new Error(
                                      'شماره تلفن وارد شده معتبر نیست!',
                                    ),
                                  )
                                } else {
                                  return Promise.reject(
                                    new Error(t('enter-mobile')),
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
                              onChange={phoneInputChangeHandle}
                              disabled={
                                props.auth.user.phoneNumber &&
                                props.auth.user.isPhoneNumberConfirmed
                                  ? true
                                  : false
                              }
                              defaultValue={
                                props.auth.user.phoneNumber
                                  ? props.auth.user.phoneNumber
                                  : ''
                              }
                            />
                            {props.auth.user.phoneNumber ? (
                              props.auth.user.isPhoneNumberConfirmed ? null : (
                                <div className={styles.messageUnavailable}>
                                  <span className={styles.dot}></span>
                                  <span>{t('not-confirmed')}</span>
                                </div>
                              )
                            ) : null}
                          </div>
                        </Form.Item>
                      </Col>

                      {props.auth.user.phoneNumber !== phoneNumberValue &&
                      phoneNumberValue &&
                      !props.auth.user.isPhoneNumberConfirmed ? (
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                          <Button
                            type="primary"
                            size="large"
                            htmlType="submit"
                            style={{ marginTop: '30px', marginRight: '15px' }}
                          >
                            <span>{t('save')}</span>
                            {loadingSendMobile ? (
                              <LoadingOutlined
                                spin
                                className={styles.icon}
                                style={{ marginRight: '10px' }}
                              />
                            ) : (
                              ''
                            )}
                          </Button>
                        </Col>
                      ) : (
                        ''
                      )}
                    </Row>
                  </Form>

                  {props.auth.user.phoneNumber ? (
                    props.auth.user.isPhoneNumberConfirmed ? null : (
                      <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                          <div className={styles.warningResendEmail}>
                            <div className={styles.contantWarningResendEmail}>
                              <InfoIcon />
                              <span>{t('confirm-mobile')}</span>
                              <button
                                onClick={() => ModalRegistterMobile(true)}
                              >
                                {t('send-code')}
                              </button>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    )
                  ) : null}

                  {modalRegistterMobile && (
                    <VerifyNumber
                      showModal={modalRegistterMobile}
                      changeStatus={ModalRegistterMobile}
                    />
                  )}
                </div>
              </div>
            ) : (
              <div className={styles.contentProfilePage}>
                <Skeleton active />
              </div>
            )}
          </div>
        </Col>
      </Row>
    </>
  )
}

Profile.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

Profile.propTypes = {
  t: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    statusRegister: state.statusRegister,
    dateInfo: state.dateInfo,
    portalInfo: state.portal.portalData,
  }
}

const mapDispatchToProps = (dispatch) => ({
  userProfile: (params) => dispatch(userProfile()),
  changeStatusRegisterMessage: (params) =>
    dispatch(changeStatusRegisterMessage(params)),
  sendVerificationCode: (params) =>
    dispatch(sendVerificationCode(params, i18n.language)),
})

export default withTranslation('common')(
  connect(mapStateToProps, mapDispatchToProps)(Profile),
)
