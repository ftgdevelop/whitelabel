import React from 'react'
import { connect } from 'react-redux'
import { Modal, Form, Input } from 'antd'
import { i18n, withTranslation } from '../../../../i18n'
import PhoneInput from '../../UI/PhoneInput/PhoneInput'
import styles from '../../../styles/Home.module.css'
import ForgotPasswordVerification from '../../MyAccount/ForgotPasswordVerification'
import {
  forgetPasswordByPhoneNumber,
  forgetPasswordByEmail,
  getIpLocation,
} from '../../../actions/user/authActions'
import dynamic from 'next/dynamic'

import style from './forget-form-style.module.scss'

const DotsLoading = dynamic(() => import('../../DotsLoading'))

let username = ''

class ForgetForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 0,
      isSubmitLoading: false,
      modalResetEmail: false,
      modalRegistterMobile: false,
      displayVerifyMobileModal: false,
      userId: '',
      phoneNumberValue: '',
      phoneNumberCountry: '',
    }
  }

  componentDidMount = async () => {
    this.getUserIpLocation().then()
  }

  getUserIpLocation = async () => {
    const response = await this.props.getIpLocation()
    if (response.status == 200) {
      this.setState({ ipCountryCode: response.data.result.alpha2 })
    }
  }

  onSuccessSubmit = () => {
    // this.setState({
    //   isSubmitEmailLoading: false,
    //   isSubmitMobileLoading: false,
    // });
    if (this.state.activeTab === 1) {
      this.setDisplayVerifyMobileModal(true)
    } else if (this.state.activeTab === 0) {
      this.setState({ modalResetEmail: true })
    }
  }

  onFailureSubmit = (message = t('error-in-operation')) => {
    this.setState({
      errorMessage: message,
      isSubmitEmailLoading: false,
      isSubmitMobileLoading: false,
    })
  }

  setDisplayVerifyMobileModal = (val) => {
    this.setState({ displayVerifyMobileModal: val })
  }

  // closeVerifyMobileModal = () =>
  //   this.setState({ displayVerifyMobileModal: false });

  onFailureSubmitMobile = (message = t('error-in-operation')) => {
    this.setState({
      errorMessage: message,
    })
  }

  resetErrors = () =>
    this.setState({
      errorMessage: '',
    })

  onFinish = async (values) => {
    if (!this.state.isSubmitLoading) {
      username =
        this.state.activeTab === 0
          ? values.email_user
          : values.userMobile
              .replace(/ +/g, '')
              .replace(/[{()}]/g, '')
              .replace(/-/g, '')
      this.setState({ isSubmitLoading: true, errorMessage: '' })
      let response
      if (this.state.activeTab === 1) {
        response = await this.props.submitForgetPasswordByPhoneNumber({
          phoneNumber: username,
        })
      } else {
        response = await this.props.submitForgetPasswordByEmail({
          emailAddress: username,
        })
      }
      this.setState({ isSubmitLoading: false })
      if (response.status === 200) {
        if (this.state.activeTab === 1) {
          this.setState({ userId: response.data.result.userId })
        }
        return this.onSuccessSubmit()
      } else
        this.onFailureSubmit(
          response && response.data ? response.data.error.message : null,
        )
    }
  }
  phoneInputChangeHandle = (value, country) => {
    this.setState({
      phoneNumberValue: value,
      phoneNumberCountry: country,
    })
  }
  render() {
    const {
      activeTab,
      isSubmitLoading,
      errorMessage,
      displayVerifyMobileModal,
      userId,
      phoneNumberValue,
      phoneNumberCountry,
    } = this.state

    const { t } = this.props

    return (
      <div className={style.forgetForm}>
        {/* <div className={style.forgetForm__tab}>
          <button
            className={`${style.forgetForm__tabItem} ${
              activeTab === 0 ? style.isActive : ''
            }`}
            onClick={() => {
              this.setState({ activeTab: 0 })
              this.resetErrors()
            }}
          >
            <span>{t('email-address')}</span>
          </button>
          <button
            className={`${style.forgetForm__tabItem} ${
              activeTab === 1 ? style.isActive : ''
            }`}
            onClick={() => {
              this.setState({ activeTab: 1 })
              this.resetErrors()
            }}
          >
            <span>{t('tel-number')}</span>
          </button>
        </div> */}
        <div className={style.forgetForm__tabContent}>
          {/* {activeTab === 0 ? (
            <Form name="mobile-signup" onFinish={this.onFinish}>
              <div className={styles.inputStyle}>
              <Form.Item
                name="email_user"
                label={t("email")}
                rules={[
                  {
                    required: true,
                    message: t("enter-your-email-address"),
                  },
                  { type: "email", message: t("email-invalid") },
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
              <p className="forget-form__error">{errorMessage}</p>
              <button
                className={`${styles.buttonStyle} forget-form__submit ${
                  process.env.THEME_NAME === 'TRAVELO' &&
                  styles.buttonStyleTravelo
                }`}
                type="submit"
              >
                {isSubmitLoading ? <DotsLoading /> : t('continue')}
              </button>
            </Form>
          ) : ( */}
            <Form name="mobile-signup" onFinish={this.onFinish}>
              <div className={styles.inputStyle}>
                <Form.Item
                  name="userMobile"
                  label={t("tel-number")}
                  className="ant-form-item-default"
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
              <p className="forget-form__error">{errorMessage}</p>
              <button
                className={`${styles.buttonStyle} forget-form__submit ${
                  process.env.THEME_NAME === 'TRAVELO' &&
                  styles.buttonStyleTravelo
                }`}
                type="submit"
              >
                {isSubmitLoading ? <DotsLoading /> : t('continue')}
              </button>
            </Form>
          {/* )} */}
        </div>

        {displayVerifyMobileModal ? (
          <ForgotPasswordVerification
            showModal={true}
            changeStatus={this.setDisplayVerifyMobileModal}
            userId={userId}
          />
        ) : (
          ''
        )}

        {/* <Button
                    type="text"
                    onClick={() => this.setModalResetEmail(true)}
                >مودال ارسال لینک ایمیل</Button> */}

        <Modal
          className={styles.modalResetEmail}
          open={this.state.modalResetEmail}
          onOk={() => this.setState({ modalResetEmail: false })}
          onCancel={() => this.setState({ modalResetEmail: false })}
          footer={null}
        >
          <div className={styles.contentModalResetEmail}>
            <img src="data:image/png;base64,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" />
            <h4>{t('forget-password')}</h4>
            <span>{t('email-with-link')}</span>
            <span>
              {t('email-with-link-sent')}
              <b>{username}</b>
            </span>
            <div className={styles.footModal}>{t('spam')}</div>
          </div>
        </Modal>

        {/* <Modal
          className={styles.modalRegistterMobile}
          open={displayVerifyMobileModal}
          onOk={() => this.closeVerifyMobileModal(false)}
          onCancel={() => this.closeVerifyMobileModal(false)}
          footer={null}
          style={{ height: "100vh" }}
        >
          <div className={styles.contentModalRegisterMobile}>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMMAAADDCAMAAAAIoVWYAAABhlBMVEUAAAAxYqf////////////////////1+Ps8Z6v///////////82Zaj///////9rjb45Z6ywwt+wwt42Zanc6PL////////////////////////6+/3///////+xxOL////w8/n////////5+/7////6/P3v8fj///////////+ww9////+6yuSwxeGvwt////+wwt/5+/2ww9////+wwd6vwt/l6/T////q7/Y2Zazy9fnnQSp9m8m0xeBNd7VFcbLr7/bw8/ivwd74+vxVfbnk6vTb4/CFocysv9xmisDK1unj6fN1lcbC0OW8y+NukMP9/f709/o5aK1AbLBghr36+/3t8fekutqbs9aWr9SRq9H1+PvoRC24yOKAnsrxh3nU3u396eZ5mMhagLvsZVL/9/bF0+f1qqDwgXHqUTzN2Or60ctqjcJRerf/+/q/zuT84Nz72NT0pJnubVvrWEPd5fH2s6rylYj4xr/4w7vznpLveWnrXEnpSjT+7uzP2uv3u7LxjoFGHo61AAAAN3RSTlMAGpIhF+Tbsgn5qu8UoGMEDcCFEA7QWOsrXbeLgz40JgjzfTHYdRXBr5ttaUglzEmxqZpQ6N10XWv6ZwAAB8BJREFUeNrs0l9PknEUwPEzyLanRq6GIpmBmJWV1Vrt62Hx37lEW/x7kGQwJxsXrI2rrnvr7aHyrvW74DDM3+cVnO85R1wkYwF2VtJiL/OEyMFkUJiv6UWTSCIrxrbuAs3eSA20vkwBniXFVDwFDEqq7c7lx/k6jfbSOQGei6XsGnCu2hmHzF/lrKTtOpATQ7tAT1ufMNI81fYRBHExk0xBXfUzke2V+QqIDLXYh4SYuQeNkfaigJcZmbPszh4QdrQHwVOx8hCmWqzBWtx1sGRkVdy8CWCi7RqkxUg2gKGeQbAhTvZfV39551iRA0Y6hjtiJAMU9TvExM0sYeaFOFlNwVc9hzUxsgUN1dD50tnqlbfu3zrQS0iJkXXoagnYETcfrhoeiJtNqOs3QIysQ3nWsCFuXr3/nXA/KW4eRQ3Hy9Qgq49n9kWub8Mfy9XQOgS2blmJwaRk3BCG2Otj2bA4YiTNX12bhhwwPLQ3MGyIQVcX4Ni2oaztI2NV+4YSxuq+wbWhn7fSWFhD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" />
            <span>
              {t("confirm-code")}
              <b>{mobile}</b>
            </span>
            <form name="verify-mobile" className="forget-form__verify-mobile">
              <div className="forget-form__verify-mobile__otp">
                <OtpInput
                  onChange={this.onChangeOtp}
                  numInputs={6}
                  containerStyle={`forget-form__verify-mobile__otp-input${
                    otpHasError ? " error" : ""
                  }`}
                  value={otp}
                  shouldAutoFocus
                  isInputNum
                />
              </div>
            </form>
            <p className="forget-form__error">{verifyPhoneErrorMessage}</p>
          </div>
        </Modal>
      */}
      </div>
    )
  }
}

ForgetForm.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

const mapDispatchToProps = (dispatch) => ({
  getIpLocation: () => dispatch(getIpLocation()),
  submitForgetPasswordByPhoneNumber: (params) =>
    dispatch(forgetPasswordByPhoneNumber(params, i18n.language)),
  submitForgetPasswordByEmail: (params) =>
    dispatch(forgetPasswordByEmail(params, i18n.language)),
})

export default withTranslation('common')(
  connect(null, mapDispatchToProps)(ForgetForm),
)
