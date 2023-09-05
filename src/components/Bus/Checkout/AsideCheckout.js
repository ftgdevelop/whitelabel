import React from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation } from '../../../../i18n'
import { Col, Row, Button } from 'antd'
import { BusIcon } from '../../UI/Icons'
import Time from '../../UI/Time/Time'
import DatePersion from '../../UI/DatePersion/DatePersion'
import styles from '../../../styles/Bus.module.css'

function numberWithCommas(x) {
  return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : x
}

const AsideCheckout = React.memo((props) => {
  const { t, data, passengers } = props

  return (
    <div
      className={`${styles.asideCheckout} ${styles.asideCheckoutFlightForeign}`}
    >
      <div className={styles.topAside}>
        <div className={styles.subject}>جزئیات اتوبوس</div>

        <div className={styles.flightSelected}>
          <div className={styles.date}>
            <BusIcon />
            <span>{`حرکت از ${data.source.city.name || ''} (${
              data.source.name
            }) به ${data.destination.city.name || ''} (${
              data.destination.name
            })`}</span>
          </div>
          {data.carrier.name &&
            <div className={styles.carrierName}>
              {data.carrier.name}
            </div>}
          <div className={styles.contentFlightSelected}>
            <Row>
              <Col xs={24} sm={4} md={4} lg={4} xl={4}>
                <div className={styles.airLine}>
                  {data.office.picture.path && (
                    <img
                      src={data.office.picture.path}
                      alt={data.office.picture.altAttribute}
                    />
                  )}
                </div>
              </Col>
              <Col xs={9} sm={4} md={4} lg={4} xl={4}>
                <div className={styles.origin}>
                  <div className={styles.textOrigin}>
                    {data.source.city.name || '-'}
                  </div>
                  <div className={styles.timeOrigin}>
                    {data.source.name || '-'}
                  </div>
                </div>
              </Col>
              <Col xs={6} sm={12} md={12} lg={12} xl={12}>
                <div className={styles.symbolFlight}>
                  <div className={styles.airlineType}>
                    <DatePersion date={data.departureDateTime} />
                  </div>
                  <img
                    className={styles.lineBusIcon}
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDM1MC40NTEgMzUwLjQ1MSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgY2xhc3M9IiI+PGc+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+Cgk8Zz4KCQk8cGF0aCBkPSJNNzcuNjk1LDIwOC41OTNjLTE3Ljk4NSwwLTMyLjU2MiwxNC41NzEtMzIuNTYyLDMyLjU1OWMwLDE3Ljk4OCwxNC41NzYsMzIuNTU5LDMyLjU2MiwzMi41NTkgICAgYzE3Ljk5MiwwLDMyLjU2NC0xNC41NywzMi41NjQtMzIuNTU5QzExMC4yNTksMjIzLjE2Myw5NS42ODcsMjA4LjU5Myw3Ny42OTUsMjA4LjU5M3ogTTc3LjY5NSwyNTUuMzA2ICAgIGMtNy44MTgsMC0xNC4xNTMtNi4zMzQtMTQuMTUzLTE0LjE1NGMwLTcuODIyLDYuMzM1LTE0LjE1NCwxNC4xNTMtMTQuMTU0YzcuODE5LDAsMTQuMTU5LDYuMzMyLDE0LjE1OSwxNC4xNTQgICAgQzkxLjg1NCwyNDguOTcyLDg1LjUxNCwyNTUuMzA2LDc3LjY5NSwyNTUuMzA2eiIgZmlsbD0iI2RmZGZkZiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPgoJCTxwYXRoIGQ9Ik0yNjguODU0LDIwOC41OTNjLTE3Ljk4NiwwLTMyLjU2MSwxNC41NzEtMzIuNTYxLDMyLjU1OWMwLDE3Ljk4OCwxNC41NzQsMzIuNTU5LDMyLjU2MSwzMi41NTkgICAgYzE3Ljk5MiwwLDMyLjU2NC0xNC41NywzMi41NjQtMzIuNTU5UzI4Ni44NDYsMjA4LjU5MywyNjguODU0LDIwOC41OTN6IE0yNjguODU0LDI1NS4zMDZjLTcuODE4LDAtMTQuMTU0LTYuMzM0LTE0LjE1NC0xNC4xNTQgICAgYzAtNy44MjIsNi4zMzYtMTQuMTU0LDE0LjE1NC0xNC4xNTRjNy44MiwwLDE0LjE2LDYuMzMyLDE0LjE2LDE0LjE1NEMyODMuMDE0LDI0OC45NzIsMjc2LjY3NCwyNTUuMzA2LDI2OC44NTQsMjU1LjMwNnoiIGZpbGw9IiNkZmRmZGYiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD4KCQk8cGF0aCBkPSJNMzMwLjk5OCw3Ni43NDFIMzguOTE1Yy0xMC43MDEsMC0yMS4yMDcsOC41NzktMjMuMzQ4LDE5LjA2NEwzLjg5MiwxMzguNDIzQzEuNzUxLDE0OC45MDgsMCwxNjYuMjQyLDAsMTc2Ljk0NHY0NC43NTEgICAgYzAsMTAuNyw4Ljc1NiwxOS40NTYsMTkuNDU3LDE5LjQ1NmgxOS44MzljMC0yMS4xNywxNy4yMjYtMzguMzk1LDM4LjM5OC0zOC4zOTVjMjEuMTc0LDAsMzguNDAxLDE3LjIyMywzOC40MDEsMzguMzk1aDExNC4zNTggICAgYzAtMjEuMTcsMTcuMjI3LTM4LjM5NSwzOC4zOTgtMzguMzk1YzIxLjE3NiwwLDM4LjQwMiwxNy4yMjMsMzguNDAyLDM4LjM5NWgyMy43NGMxMC43MDMsMCwxOS40NTctOC43NTQsMTkuNDU3LTE5LjQ1NlY5Ni4xOTcgICAgQzM1MC40NTUsODUuNDk2LDM0MS42OTksNzYuNzQxLDMzMC45OTgsNzYuNzQxeiBNODAuODU2LDE1OC44MzZIMzUuNTEybDcuMTg2LTE3LjAxOWMxLjI1NC0yLjk3LTAuMTM3LTYuMzk0LTMuMTA2LTcuNjQ4ICAgIGMtMi45NzItMS4yNTQtNi4zOTUsMC4xMzgtNy42NDcsMy4xMDdsLTguOTEsMjEuMTAzYy02LjAxNS0xLjU4MS05LjY3Ni03LjIxNC04LjQzNy0xMy44OWwxMC40Ni00MS43NCAgICBjMS40NjUtNy44OTEsOS4yMy0xNC4zNDgsMTcuMjU2LTE0LjM0OGgzOC41NDNMODAuODU2LDE1OC44MzZMODAuODU2LDE1OC44MzZ6IE0xNjcuNDM5LDE1OC44MzZIOTIuNTNWODguNDAxaDc0LjkwOVYxNTguODM2eiAgICAgTTI1NC4wMjEsMTU4LjgzNmgtNzQuOTA4Vjg4LjQwMWg3NC45MDhWMTU4LjgzNnogTTMzOC41MjMsMTQ0LjI0NGMwLDguMDI2LTYuNTY2LDE0LjU5My0xNC41OTQsMTQuNTkzaC01OC4yMzRWODguNDAyaDU4LjIzNCAgICBjOC4wMjcsMCwxNC41OTQsNi41NjcsMTQuNTk0LDE0LjU5M1YxNDQuMjQ0eiIgZmlsbD0iI2RmZGZkZiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPgoJPC9nPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjwvZz48L3N2Zz4="
                  />
                  <div className={styles.dashedFlight}></div>
                  <div className={styles.typeFlight}>
                    <span>
                      ساعت حرکت
                      <Time date={data.departureDateTime} />
                    </span>
                  </div>
                </div>
              </Col>
              <Col xs={9} sm={4} md={4} lg={4} xl={4}>
                <div className={styles.destination}>
                  <div className={styles.textDestination}>
                    {data.destination.name || '-'}
                  </div>
                  <div className={styles.timeDestination}>
                    {data.finalDestination.name != data.destination.name ? "مقصد نهایی : " + data.finalDestination.name : ''}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <div className={styles.detailsAside}>
        <div className={styles.detailsAside}>
          <div className={styles.subject}>
            <span>جزئیات مبلغ</span>
          </div>
          <div className={styles.contentDetailsAside}>
            <div className={styles.passengerDetails}>
                <span>هر صندلی {passengers.length !== 0 && `(${passengers.length})`}</span>
              <b>{numberWithCommas(data.salePrice)} ریال</b>
            </div>
            <div class={styles.pricePay}>
              <span>مجموع</span>
              <b>{numberWithCommas(data.salePrice * passengers.length || data.salePrice)} ریال</b>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
})

AsideCheckout.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

AsideCheckout.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(AsideCheckout)
