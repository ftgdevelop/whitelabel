import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, i18n, withTranslation, Router } from '../../../../i18n'
import { sendOtp } from '../../../actions/user/authActions'
import { changeStatusRegisterMessage } from '../../../actions'
import { withRouter } from 'next/router'
import 'react-intl-tel-input/dist/main.css'
import { Form, Input } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import PhoneInput from '../../UI/PhoneInput/PhoneInput'
import styles from '../../../styles/Home.module.css'
import style from './signin-content-form.module.scss'

import 'react-phone-number-input/style.css'
import ModalLoginPassword from '../ModalLoginPassword'
import ModalVerifyNumber from '../ModalVerifyNumber'
import openNotification from '../../UI/Notification/Notification'

let phoneNumberElement = ''
const SignInOtpContentForm = (props) => {
  console.log(props)
  // phoneNumberCountry:"",
  //       phoneNumberValue:"",
  const [loading, setLoading] = useState(false)
  const [showModalVerify, setShowModalVerify] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState({ value: '', code: '' })

  const onFinish = async () => {
    if (!loading) {
      setLoading(true)
      try {
        const res = await sendOtp(
          {
            emailOrPhoneNumber: `+${phoneNumber.value}`,
          },
          i18n.language,
        )
        props.changeStatus()
        setLoading(false)

        if (res.status == 200) setTimeout(() => setShowModalVerify(true), 1000)
        if (res.status == 500)
          openNotification('error', 'bottomRight', res.data.error.message)
      } catch (error) {
        setLoading(false)
        openNotification('error', 'bottomRight', 'خطا')
      }
    }
  }

  const phoneInputChangeHandle = (value, country) => {
    setPhoneNumber({ code: country, value: value })
  }

  const { t } = props

  phoneNumberElement = React.createRef()

  return (
    <>
      <div className={styles.modalContentSignIn}>
        <div className={style.signin}>
          <div className="signin__tab-content">
            <Form name="mobile-signup" onFinish={onFinish}>
              <div>
                <Form.Item
                  name="userMobile"
                  label={t('tel-number')}
                  className="ant-form-item-default"
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
                              new Error(
                                'لطفا شماره تلفن همراه خود را وارد کنید.',
                              ),
                            )

                          return Promise.reject(
                            new Error('شماره تلفن همراه وارد شده معتبر نیست!'),
                          )
                        } else {
                          return Promise.reject(
                            new Error(
                              'لطفا شماره تلفن همراه خود را وارد کنید.',
                            ),
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
                    />
                  </div>
                </Form.Item>
              </div>

              {/* <p className="signin__error">{errorMessage}</p> */}

              <button
                className={`${styles.buttonStyle} signin__submit ${
                  process.env.THEME_NAME === 'TRAVELO' &&
                  styles.buttonStyleTravelo
                }`}
                type="submit"
              >
                {loading ? <LoadingOutlined spin /> : t('confirm-and-get-code')}
              </button>
            </Form>
            {/* <Link as="/signin-password" href="/signin-password">
              <a>{t('sign-in-with-password')}</a>
            </Link> */}
            <div
              className={styles.linkPage}
              onClick={() => props.changeStatus? props.changeStatus(false) :  null}
            >
              <ModalLoginPassword />
            </div>
          </div>
        </div>
      </div>

      {/* {showModalVerify && ( */}
      <ModalVerifyNumber
        showModal={showModalVerify}
        handelModal={setShowModalVerify}
        phoneNumber={`+${phoneNumber.value}`}
        changeStatus={props.changeStatus}
        resendCodeVerify={onFinish}
      />
      {/* )} */}
    </>
  )
}

SignInOtpContentForm.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

const mapDispatchToProps = (dispatch) => ({
  changeStatusRegisterMessage: (val) =>
    dispatch(changeStatusRegisterMessage(val)),
})

export default withRouter(
  withTranslation('common')(
    connect(null, mapDispatchToProps)(SignInOtpContentForm),
  ),
)
