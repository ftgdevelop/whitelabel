import React from 'react'
import { connect } from 'react-redux'
import { Link, i18n, withTranslation, Router } from '../../../../i18n'
import { getIpLocation, loginUser } from '../../../actions/user/authActions'
import { changeStatusRegisterMessage } from '../../../actions'
import { withRouter } from 'next/router'
import 'react-intl-tel-input/dist/main.css'
import { Form, Input } from 'antd'

import PhoneInput from '../../UI/PhoneInput/PhoneInput'
import IsEmailAddressValid from '../../../../helpers/validations/IsEmailAddressValid'
import DotsLoading from '../../DotsLoading'
import styles from '../../../styles/Home.module.css'
import style from './signin-content-form.module.scss'

import 'react-phone-number-input/style.css'
import ModalLogin from '../ModalLogin'

let phoneNumberElement = ''
class SignInPasswordContentForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 0,
      phoneNumber: '',
      mobile: undefined,
      isLoginLoading: false,
      phoneNumberValue: '',
      phoneNumberCountry: '',
    }
  }

  phoneInputChangeHandle = (value, country) => {
    this.setState({
      phoneNumberValue: value,
      phoneNumberCountry: country,
    })
  }

  onEmailLogin = async (e) => {
    e.preventDefault()
    this.resetErrors()
    if (this.isEmailFormValid()) {
      this.setState({ isEmailLoginLoading: true })
      const response = await this.props.login({
        emailOrPhoneNumber: this.state.email,
        password: this.state.emailPassword,
      })
      if (response.status == 200) return this.onSuccessLogin()
      else
        this.onFailureEmailLogin(
          response && response.data ? response.data.error.message : null,
        )
    }
  }

  isEmailFormValid = () => {
    if (this.state.email && this.state.emailPassword) {
      if (!IsEmailAddressValid(this.state.email)) {
        this.setState({ emailErrorMessage: t('email-invalid') })
        return false
      }
      if (this.state.emailPassword.length < 6) {
        this.setState({
          emailErrorMessage: t('atleast-6-char'),
        })
        return false
      }
      return true
    } else {
      this.setState({ emailErrorMessage: t('all-field') })
      return false
    }
  }

  onSuccessLogin = () => {
    this.setState({
      isLoginLoading: false,
    })
    const { route } = this.props.router

    if (route === '/register' || route === '/signin' || route === '/forget') {
      Router.push('/myaccount/profile')
    } //else is page myaccount/booking
  }

  onFailureLogin = (message = t('error-in-operation')) => {
    this.setState({
      errorMessage: message,
      isLoginLoading: false,
    })
  }

  onFailureMobileLogin = (message = t('error-in-operation')) => {
    this.setState({
      mobileErrorMessage: message,
      isMobileLoginLoading: false,
    })
  }

  resetErrors = () =>
    this.setState({
      emailErrorMessage: '',
      mobileErrorMessage: '',
    })

  onMobileLogin = async (e) => {
    e.preventDefault()
    this.resetErrors()
    if (this.isMobileFormValid()) {
      this.setState({ isMobileLoginLoading: true })
      const response = await this.props.login({
        emailOrPhoneNumber: this.state.mobile,
        password: this.state.mobilePassword,
      })
      if (response.status == 200) return this.onSuccessLogin()
      else
        this.onFailureMobileLogin(
          response && response.data ? response.data.error.message : null,
        )
    }
  }

  getNumber = () => {
    // if(phoneNumberElement && phoneNumberElement.current && phoneNumberElement.current.state){
    const countryCode = phoneNumberElement.current.state.title.split(': ')[1]
    const phoneNumberInput = phoneNumberElement.current.state.value
    const fullNumber = countryCode.concat(phoneNumberInput)
    if (phoneNumberInput) {
      this.setState({
        mobile: fullNumber,
      })
    } else {
      console.log('mobile number is empty')
    }
    return true
  }

  onFinish = async (values) => {
    this.setState({ errorMessage: '' })
    const username =
      this.state.activeTab === 0
        ? values.email_user
        : values.userMobile
            .replace(/ +/g, '')
            .replace(/[{()}]/g, '')
            .replace(/-/g, '')
    const password = values.password_user
    this.setState({ isLoginLoading: true })

    const response = await this.props.login({
      emailOrPhoneNumber: username,
      password: password,
    })
    if (response.status == 200) return this.onSuccessLogin()
    else
      this.onFailureLogin(
        response && response.data
          ? response.data.error.message
          : response.problem
          ? response.problem
          : null,
      )
  }

  render() {
    const {
      activeTab,
      errorMessage,
      isLoginLoading,
      phoneNumberValue,
      phoneNumberCountry,
    } = this.state

    const { t } = this.props

    phoneNumberElement = React.createRef()

    return (
      <div className={styles.modalContentSignIn}>
        <div className={style.signin}>
          <div className={style.signin__tab}>
            <button
              className={`${style.signin__tab_item}  ${
                activeTab === 0 ? style.isActive : ''
              }`}
              onClick={() => {
                this.setState({ activeTab: 0 })
              }}
            >
              <span>{t('email-address')}</span>
            </button>
            <button
              className={`${style.signin__tab_item}  ${
                activeTab === 1 ? style.isActive : ''
              }`}
              onClick={() => {
                this.setState({ activeTab: 1 })
              }}
            >
              <span>{t('tel-number')}</span>
            </button>
          </div>
          <div className="signin__tab-content">
            {activeTab === 0 ? (
              <Form name="email-signup" onFinish={this.onFinish}>
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
                    className={`${styles.formItem} ${
                      process.env.THEME_NAME === 'TRAVELO' &&
                      styles.formItemTravelo
                    } ant-form-item-default`}
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
                    className={`${styles.formItem} ${
                      process.env.THEME_NAME === 'TRAVELO' &&
                      'form-item-travelo'
                    } ant-form-item-default`}
                    rules={[
                      { required: true, message: t('enter-your-password') },
                      { message: t('atleast-6-char'), min: 6 },
                    ]}
                  >
                    <Input.Password size="large" />
                  </Form.Item>
                </div>
                <p className="signin__error">{errorMessage}</p>
                <button
                  className={`${styles.buttonStyle} signin__submit ${
                    process.env.THEME_NAME === 'TRAVELO' &&
                    styles.buttonStyleTravelo
                  }`}
                  type="submit"
                >
                  {isLoginLoading ? <DotsLoading /> : t('sign-in')}
                </button>
              </Form>
            ) : (
              <Form name="mobile-signup" onFinish={this.onFinish}>
                <div>
                  <Form.Item
                    name="userMobile"
                    label={t('tel-number')}
                    className="ant-form-item-default"
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
                              new Error('شماره تلفن وارد شده معتبر نیست!'),
                            )
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
                        process.env.THEME_NAME === 'TRAVELO' &&
                        'form-item-travelo'
                      }`}
                    >
                      <PhoneInput
                        country="ir"
                        onChange={this.phoneInputChangeHandle}
                      />
                    </div>
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    label={t('password')}
                    name="password_user"
                    className={`${styles.formItem} ${
                      process.env.THEME_NAME === 'TRAVELO' &&
                      'form-item-travelo'
                    } ant-form-item-default`}
                    rules={[
                      { required: true, message: t('enter-your-password') },
                      { message: t('atleast-6-char'), min: 6 },
                    ]}
                  >
                    <Input.Password size="large" />
                  </Form.Item>
                </div>

                <p className="signin__error">{errorMessage}</p>
                <button
                  className={`${styles.buttonStyle} signin__submit ${
                    process.env.THEME_NAME === 'TRAVELO' &&
                    styles.buttonStyleTravelo
                  }`}
                  type="submit"
                >
                  {isLoginLoading ? <DotsLoading /> : t('sign-in')}
                </button>
              </Form>
            )}
          </div>
          <div className={styles.linkPage}>
            <Link as="/forget" href="/forget">
              <a>{t('forget-password')}</a>
            </Link>
          </div>
          <div className={styles.linkPage} onClick={this.props.changeStatus}>
            <ModalLogin />
              {/* <Link as="/signin" href="/signin">
                <a>ورود با رمز یکبار مصرف</a>
              </Link> */}
          </div>
        </div>
      </div>
    )
  }
}

SignInPasswordContentForm.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

const mapDispatchToProps = (dispatch) => ({
  getIpLocation: () => dispatch(getIpLocation()),
  login: (params) => dispatch(loginUser(params, i18n.language)),
  changeStatusRegisterMessage: (val) =>
    dispatch(changeStatusRegisterMessage(val)),
})

export default withRouter(
  withTranslation('common')(connect(null, mapDispatchToProps)(SignInPasswordContentForm)),
)
