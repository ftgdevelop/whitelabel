import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation, Router } from '../../../../i18n'
import { useRouter } from 'next/router'

import styles from '../../../styles/Bus.module.css'
import CheckoutSteps from './CheckoutSteps'
import { LoadingOutlined } from '@ant-design/icons'
import { Row, Col, Form } from 'antd'
import AsideCheckout from './AsideCheckout'
import ContentCheckout from './ContentCheckout'
import useFetch from '../../../hooks/useFetch'

const Checkout = (props) => {
  const { t } = props
  const router = useRouter()
  const [form] = Form.useForm()
  const [passengers, setPassengers] = useState([])
  const { data, error, loading } = useFetch(
    `https://busdomestic.safaraneh.com/api/services/app/BookingBus/GetValidate?preReserveKey=${router.query.key}`,
  )
  const { data: dateSeat, error: errorSeat, loading: loadingSeat } = useFetch(
    `https://busdomestic.safaraneh.com/api/services/app/BookingBus/GetBusSeatByValidateKey?preReserveKey=${encodeURIComponent(
      router.query.key,
    )}`,
  )

  const handelSeats = useCallback((arraySeats) => {
    setPassengers(arraySeats)
  }, [])
  // useEffect(() => {
  //   setInfoReserve(data)
  // }, [data])

  return (
    <div
      className={`${styles.flightCheckout} ${
        process.env.THEME_NAME === 'TRAVELO' && styles.flightCheckoutTravelo
      }`}
    >
      <div className={styles.container}>
        <CheckoutSteps />
        
          <Row gutter={[20, 0]}>
            <Col xs={24} sm={24} md={16}>
              <ContentCheckout
                dataReserve={data && data.departureBus}
                data={dateSeat}
                handelSeats={handelSeats}
                passengers={passengers}
                form={form}
              />
            </Col>
            <Col xs={24} sm={24} md={8}>
              {data && (
                <AsideCheckout
                  data={data.departureBus}
                  passengers={passengers}
                />
              )}
            </Col>
          </Row>
        {/* <Col className={styles.loadingCheckout}>
                <LoadingOutlined spin className={styles.icon} />
                {t("getting-informaion")}
            </Col> */}
      </div>
    </div>
  )
}

Checkout.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

Checkout.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(Checkout)
