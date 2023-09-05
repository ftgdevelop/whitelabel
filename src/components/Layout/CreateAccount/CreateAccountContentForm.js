import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form, Input } from 'antd'
import { Link, i18n, withTranslation, Router } from '../../../../i18n'
import { withRouter } from 'next/router'
import dynamic from 'next/dynamic'

import PhoneInput from '../../UI/PhoneInput/PhoneInput'
import 'react-intl-tel-input/dist/main.css'
import styles from '../../../styles/Home.module.css'
import style from './signup-style.module.scss'
import {
  getIpLocation,
  registerUser,
  loginUser,
} from '../../../actions/user/authActions'
import { changeStatusRegisterMessage } from '../../../actions'

const DotsLoading = dynamic(() => import('../../DotsLoading'))

const CreateAccountContentForm = (props) => {
  const [activeTab, setActiveTab] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')
  const [isSignupLoading, setIsSignupLoading] = useState(false)

  const [phoneNumberValue, setPhoneNumberValue] = useState('')
  const [phoneNumberCountry, setPhoneNumberCountry] = useState('')

  const phoneInputChangeHandle = (value, country) => {
    setPhoneNumberCountry(country)
    setPhoneNumberValue(value)
  }

  let username = ''
  let password = ''

  useEffect(() => {
    getUserIpLocation().then()
  }, [])

  const getUserIpLocation = async () => {
    await props.getIpLocation()
  }

  const onSuccessRegister = () => {
    const { route } = props.router
    if (route === '/register' || route === '/signin') {
      props.changeStatusRegisterMessage(true)
    } else {
      // props.changeStatusRegisterMessage(activeTab ? 'mobile' : 'email') //if is mobile show modal verifyNumber
      props.changeStatusRegisterMessage('mobile')
    }

    login()
  }

  const getPortalValue = (dataArray, keyword) => {
    const itemIndex = dataArray.findIndex((item) => item.Keyword === keyword)
    if (itemIndex !== -1 && dataArray[itemIndex]) {
      return dataArray[itemIndex]
    } else {
      return null
    }
  }
  let portalName
  if (props.portalInfo) {
    portalName = getPortalValue(props.portalInfo.Phrases, 'Name')['Value']
  }

  const login = async () => {
    const response = await props.login({
      emailOrPhoneNumber: username,
      password: password,
    })
    if (response.status == 200) return onSuccessLogin()
    else
      onFailureRegister(
        response && response.data
          ? response.data.error.message
          : 'عملیات با خطا مواجه شد',
      )
  }

  const onSuccessLogin = () => {
    const { route } = props.router
    if (route === '/register' || route === '/signin' || route === '/forget') {
      Router.push('/myaccount/profile')
    }
  }

  const onFailureRegister = (message = 'عملیات با خطا مواجه شد') => {
    setErrorMessage(message)
    setIsSignupLoading(false)
  }

  const onFinish = async (values) => {
    setErrorMessage('')
    username = values.mobile_user
      .replace(/ +/g, '')
      .replace(/[{()}]/g, '')
      .replace(/-/g, '')
      // activeTab === 0
      //   ? values.email_user
      //   : values.mobile_user
      //       .replace(/ +/g, '')
      //       .replace(/[{()}]/g, '')
      //       .replace(/-/g, '')
    password = values.password_user
    setIsSignupLoading(true)
    const response = await props.registerUser({
      emailOrPhoneNumber: username,
      password: password,
    })
    if (response.status == 200 && activeTab === 1) {
      // props.sendVerificationCode({ phoneNumber: mobile });
      onSuccessRegister(username, password)
    } else if (response.status == 200 && activeTab === 0)
      onSuccessRegister(username, password)
    else
      onFailureRegister(
        response && response.data
          ? response.data.error.message
          : response.problem
          ? response.problem
          : null,
      )
  }

  const [form] = Form.useForm()
  const { t } = props
  return (
    <div className={`${styles.modalContentCreateAccount} ${style.signup}`}>
      {/* <div className={style.signup__tab}>
        <button
          className={`${style.signup__tab_item} ${
            activeTab === 0 ? style.isActive : ''
          }`}
          onClick={() => setActiveTab(0)}
        >
          <span>{t('email-address')}</span>
        </button>
        <button
          className={`${style.signup__tab_item} ${
            activeTab === 1 ? style.isActive : ''
          }`}
          onClick={() => setActiveTab(1)}
        >
          <span>{t('tel-number')}</span>
        </button>
      </div> */}
      <div className={style.signup_content}>
        {/* {activeTab === 0 ? (
          <Form name="email-signup" form={form} onFinish={onFinish}>
            <div>
              <Form.Item
                name="email_user"
                label={t('email')}
                rules={[
                  {
                    required: true,
                    message: t('enter-your-email-address'),
                  },
                  { type: 'email', message: t('email-invalid') },
                ]}
                className={`${styles.formItem} ${process.env.THEME_NAME === "TRAVELO" && styles.formItemTravelo} ant-form-item-default`}
              >
                <Input
                  id="email_user"
                  size="large"
                  className={styles.input95Tablet}
                />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label={t('password')}
                name="password_user"
                className={`${styles.formItem} ${process.env.THEME_NAME === "TRAVELO" && "form-item-travelo"} ant-form-item-default`}
                rules={[{ required: true, message: t("enter-your-password") },
                { message: t("atleast-6-char"), min:6 }]}
              >
                <Input.Password size="large" />
              </Form.Item>
            </div>
            <p className={style.signup__error}>{errorMessage}</p>
            <button
              className={`${styles.buttonStyle} ${style.signup__submit} ${
                process.env.THEME_NAME === 'TRAVELO' &&
                styles.buttonStyleTravelo
              }`}
              type="submit"
            >
              {isSignupLoading ? <DotsLoading /> : t('create-account')}
            </button>
          </Form>
        ) : ( */}
          <Form name="mobile-signup" form={form} onFinish={onFinish}>
            <div>
              <Form.Item
                name="mobile_user"
                className={`${process.env.THEME_NAME === "TRAVELO" && styles.formItemTravelo} ant-form-item-default`}
                label={t("tel-number")}
                rules={
                    [
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (phoneNumberValue && phoneNumberCountry){
                                    const requiredLength = phoneNumberCountry.format.replace(/ +/g, "").replace(/[{(+)}]/g, '').replace(/-/g , "").length;
                                    const valueLength = phoneNumberValue.length;
                                    if (requiredLength === valueLength)
                                        return Promise.resolve();
                                    if (!phoneNumberValue)
                                        return Promise.reject(new Error(t('enter-mobile')));

                        return Promise.reject(new Error(t('mobile-invalid')))
                      } else {
                        return Promise.reject(new Error(t('enter-mobile')))
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
            </div>
            <div>
              <Form.Item
                label={t('password')}
                name="password_user"
                className={`${styles.formItem} ${process.env.THEME_NAME === "TRAVELO" && "form-item-travelo"} ant-form-item-default`}
                rules={[{ required: true, message: t("enter-your-password") },
                { message: t('atleast-6-char'), min:6 }]}
              >
                <Input.Password size="large" />
              </Form.Item>
            </div>

            <p className={style.signup__error}>{errorMessage}</p>
            <button
              className={`${styles.buttonStyle} ${style.signup__submit} ${
                process.env.THEME_NAME === 'TRAVELO' &&
                styles.buttonStyleTravelo
              }`}
              type="submit"
            >
              {isSignupLoading ? <DotsLoading /> : t('create-account')}
            </button>
          </Form>
        {/* )} */}
      </div>
      <div className={styles.linkPage}>
        <span>{t('dont-have-account')}</span>
        {!props.changeTab ? (
          <Link as="/signin" href="/signin">
            <a>ورود</a>
          </Link>
        ) : (
          <a onClick={props.changeStatus}>{t('sign-in')}</a>
        )}
      </div>
      <div className={styles.footRegister}>
        <span>{t('accept-term')}</span>
      </div>

      {/* <Button type="text" onClick={() => setModalRegistterMobile(true)}>
        ثبت نام موبایل
      </Button> */}

      {/* <Button type="text" onClick={() => setModalRegistterMobile(true)}>
        ثبت نام موبایل
      </Button> */}
    </div>
  )
}

CreateAccountContentForm.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

CreateAccountContentForm.propTypes = {
  t: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  getIpLocation: () => dispatch(getIpLocation()),
  registerUser: (params) => dispatch(registerUser(params, i18n.language)),
  login: (params) => dispatch(loginUser(params, i18n.language)),
  changeStatusRegisterMessage: (params) =>
    dispatch(changeStatusRegisterMessage(params)),
})

const mapStateToProp = (state) => {
  return {
    portalInfo: state.portal.portalData,
  }
}

export default withTranslation('common')(
  connect(
    mapStateToProp,
    mapDispatchToProps,
  )(withRouter(CreateAccountContentForm)),
)
