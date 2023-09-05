import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link, i18n, withTranslation } from '../../../i18n'
import { Modal } from 'antd'
import OtpInput from 'react-otp-input'
import { LoadingOutlined } from '@ant-design/icons'
import { withRouter } from 'next/router'

import {
  sendVerificationCode,
  registerOrLoginOtp,
  userProfile,
} from '../../actions/user/authActions'
import { changeStatusRegisterMessage } from '../../actions'

import styles from '../../styles/Home.module.css'
import ModalLoginPassword from './ModalLoginPassword'
import openNotification from '../UI/Notification/Notification'

const ModalVerifyNumber = (props) => {
  const [statusRegister, setStatusRegister] = useState(props.showModal)

  const [otp, setOtp] = useState('')
  const [otpHasError, setOtpHasError] = useState(false)
  const [isResendingCode, setIsResendingCode] = useState(false)
  const [verifyPhoneErrorMessage, setVerifyPhoneErrorMessage] = useState('')
  const [loadingVerify, setLoadingVerify] = useState(false)
  const [time, setTime] = useState('0')

  useEffect(() => {
    checkRegisterWithMobile()
  })
  useEffect(() => {
    setOtp('')
  }, [props.showModal])

  useEffect(() => {
    let sec = 90
    const interval = setInterval(() => {
      if (sec) {
        let min = Math.floor(sec / 60)
        let s = Math.floor(sec % 60)
        setTime(`${min}:${s}`)
        sec -= 1
      } else {
        setTime('')
        clearInterval(interval)
      }
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const onChangeOtp = async (otpVal) => {
    setVerifyPhoneErrorMessage('')
    setOtp(otpVal)
    if (otpVal.length > 5) await registerOrLogin(otpVal)
  }

  const onSuccessLogin = () => {
    const { route } = props.router
    if (route === '/register' || route === '/signin' || route === '/forget') {
      Router.push('/myaccount/profile')
    }
  }

  const onFailureRegister = (message = 'عملیات با خطا مواجه شد') => {
    openNotification('error', 'bottomRight', message)
  }

  const registerOrLogin = async (otpVal = otp) => {
    if (!loadingVerify) {
      try {
        if (otpVal.length > 5) {
          setLoadingVerify(true)
          const res = await props.registerOrLoginOtp({
            code: otpVal,
            emailOrPhoneNumber: props.phoneNumber
              ? props.phoneNumber
              : props.auth.user.phoneNumber,
          })
          setLoadingVerify(false)
          if (res.status == 200) {
            onSuccessLogin()
            props.handelModal(false)
          } else
            onFailureRegister(
              res && res.data
                ? res.data.error.message
                : 'عملیات با خطا مواجه شد',
            )
        } else {
          openNotification('error', 'bottomRight', 'کد صحیح را وارد کنید')
        }
      } catch (error) {
        setLoadingVerify(false)
      }
    }
  }

  const ModalRegistterMobile = (value) => {
    props.handelModal(value)
    if (props.changeStatus) {
      setTimeout(() => props.changeStatus(value), 1000)
    }
  }

  const getPortalValue = (dataArray, keyword) => {
    const itemIndex = dataArray.findIndex((item) => item.Keyword === keyword)
    if (itemIndex !== -1 && dataArray[itemIndex]) {
      return dataArray[itemIndex]
    } else {
      return null
    }
  }

  const checkRegisterWithMobile = () => {
    if (statusRegister && props.auth.user.phoneNumber) {
      props.handelModal(true)
    }
  }

  const ChangePhoneNumber = () => {
    props.handelModal(false)
    if (props.changeStatus) {
      setTimeout(() => props.changeStatus(true), 500)
    }
  }

  const { t } = props
  let portalName
  if (props.portalInfo) {
    portalName = getPortalValue(props.portalInfo.Phrases, 'Name')['Value']
  }

  return (
    <>
      <Modal
        className={styles.modalRegistterMobile}
        open={props.showModal}
        onOk={() => ModalRegistterMobile(false)}
        onCancel={() => ModalRegistterMobile(false)}
        footer={null}
        style={{ height: '100vh' }}
      >
        <div className={styles.contentModalRegisterMobile}>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMMAAADDCAMAAAAIoVWYAAABhlBMVEUAAAAxYqf////////////////////1+Ps8Z6v///////////82Zaj///////9rjb45Z6ywwt+wwt42Zanc6PL////////////////////////6+/3///////+xxOL////w8/n////////5+/7////6/P3v8fj///////////+ww9////+6yuSwxeGvwt////+wwt/5+/2ww9////+wwd6vwt/l6/T////q7/Y2Zazy9fnnQSp9m8m0xeBNd7VFcbLr7/bw8/ivwd74+vxVfbnk6vTb4/CFocysv9xmisDK1unj6fN1lcbC0OW8y+NukMP9/f709/o5aK1AbLBghr36+/3t8fekutqbs9aWr9SRq9H1+PvoRC24yOKAnsrxh3nU3u396eZ5mMhagLvsZVL/9/bF0+f1qqDwgXHqUTzN2Or60ctqjcJRerf/+/q/zuT84Nz72NT0pJnubVvrWEPd5fH2s6rylYj4xr/4w7vznpLveWnrXEnpSjT+7uzP2uv3u7LxjoFGHo61AAAAN3RSTlMAGpIhF+Tbsgn5qu8UoGMEDcCFEA7QWOsrXbeLgz40JgjzfTHYdRXBr5ttaUglzEmxqZpQ6N10XWv6ZwAAB8BJREFUeNrs0l9PknEUwPEzyLanRq6GIpmBmJWV1Vrt62Hx37lEW/x7kGQwJxsXrI2rrnvr7aHyrvW74DDM3+cVnO85R1wkYwF2VtJiL/OEyMFkUJiv6UWTSCIrxrbuAs3eSA20vkwBniXFVDwFDEqq7c7lx/k6jfbSOQGei6XsGnCu2hmHzF/lrKTtOpATQ7tAT1ufMNI81fYRBHExk0xBXfUzke2V+QqIDLXYh4SYuQeNkfaigJcZmbPszh4QdrQHwVOx8hCmWqzBWtx1sGRkVdy8CWCi7RqkxUg2gKGeQbAhTvZfV39551iRA0Y6hjtiJAMU9TvExM0sYeaFOFlNwVc9hzUxsgUN1dD50tnqlbfu3zrQS0iJkXXoagnYETcfrhoeiJtNqOs3QIysQ3nWsCFuXr3/nXA/KW4eRQ3Hy9Qgq49n9kWub8Mfy9XQOgS2blmJwaRk3BCG2Otj2bA4YiTNX12bhhwwPLQ3MGyIQVcX4Ni2oaztI2NV+4YSxuq+wbWhn7fSWFhD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" />
          <h4>{t('enter-verification-code')}</h4>
          <span>
            {t('code-number-6-digit')} {props.phoneNumber.value} {t('sent')}
          </span>

          <div class="modal-mobile-otp-link">
            <a class="link-style-btn" onClick={ChangePhoneNumber}>
              {t('modify-phone-number')}
            </a>
          </div>

          {props.showModal && (
            <form name="verify-mobile" className="signup__verify-mobile">
              <div className="modal-mobile-otp">
                <OtpInput
                  onChange={onChangeOtp}
                  numInputs={6}
                  containerStyle={`modal-mobile-otp-content${
                    otpHasError ? ' error' : ''
                  }`}
                  value={otp}
                  shouldAutoFocus
                  isInputNum
                />
              </div>
            </form>
          )}
          <p className="signup__error">{verifyPhoneErrorMessage}</p>
          <span className="signup__verify-mobile__resend-code ">
            {time ? (
              `${time} تا درخواست مجدد کد`
            ) : (
              <span
                onClick={props.resendCodeVerify}
                style={{ cursor: 'pointer' }}
              >
                {t('send-code-again')}
              </span>
            )}
            {/* {isResendingCode ? (
              <LoadingOutlined />
            ) : (
              ''
            )} */}
          </span>
          <div>
            <button
              className="signup__verify-mobile__resend-code verify-mobile-modal-button"
              onClick={() => registerOrLogin(otp)}
            >
              {loadingVerify ? (
                <LoadingOutlined spin />
              ) : (
                <span>{t('confirm-and-continue')}</span>
              )}
            </button>
          </div>
          <div
            class="modal-mobile-otp-footer-link"
            onClick={() => ModalRegistterMobile(false)}
          >
            <ModalLoginPassword />
          </div>
        </div>
      </Modal>
    </>
  )
}

ModalVerifyNumber.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

ModalVerifyNumber.propTypes = {
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
  sendVerificationCode: (params) =>
    dispatch(sendVerificationCode(params, i18n.language)),
  registerOrLoginOtp: (params) =>
    dispatch(registerOrLoginOtp(params, i18n.language)),
  userProfile: (params) => dispatch(userProfile()),
  changeStatusRegisterMessage: (params) =>
    dispatch(changeStatusRegisterMessage(params)),
})

export default withTranslation('common')(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(ModalVerifyNumber)),
)
