import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation, Router } from '../../../../i18n'
import { useRouter } from 'next/router'

import styles from '../../../styles/Home.module.css'
import { Row, Col, notification } from 'antd'
import BookingSteps from './BookingSteps'
import AsideBooking from './AsideBooking'
import ContentBooking from './ContentBooking'

// import { GetReserveBus } from "../..";
import { GetReserveBus, GetConfirm } from '../../../actions/bus/bus'

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
const Booking = (props) => {
  const { t } = props
  const [loading, setLoading] = useState(true)
  const [bus, setBus] = useState('')
  const [confirmBus, setConfirmBus] = useState('')
  const route = useRouter()
  const reserveId = route.query.reserveId
  const username = route.query.username

  useEffect(() => {
    const getData = async () => {
      const response = await GetReserveBus(reserveId, username)
      if (response.data) {
        setBus(response.data.result)
        // props.getPrice(response.data.result.totalPrice);
      }
    }
    getData()

    const param = {
      reserveId: parseInt(reserveId),
      username: `+${username.trim()}`,
    }

    const getConfirm = async () => {
      const res = await GetConfirm(param)
      if (res.status == 200) {
        setConfirmBus(res.data.result.reserve)
        if (!res.data.result.isCompleted) {
          setTimeout(() => getConfirm(), 3000)
        } else {
          setLoading(false)
        }
      } else {
        openNotification('error', 'bottomRight', res.data.error.message)
      }
    }
    getConfirm()
  }, [])

  return (
    <div
      className={`${styles.booking} ${
        process.env.THEME_NAME === 'TRAVELO' && styles.bookingTravelo
      }`}
    >
      <div className={styles.container}>
        <BookingSteps />

        <Row gutter={[20]}>
          <Col xs={24} sm={24} md={16} lg={16} xl={16}>
            {confirmBus && (
              <ContentBooking
                progress={loading}
                confirmBus={confirmBus}
                reserveId={reserveId}
                username={username}
              />
            )}
          </Col>

          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            {bus && <AsideBooking bus={bus} />}
          </Col>
        </Row>
      </div>
    </div>
  )
}

Booking.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

Booking.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(Booking)
