import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Router, i18n, withTranslation } from '../../../../../../i18n'
import { Collapse, Button, Row, Col, notification } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import styles from '../../../../../styles/Bus.module.css'
import BusDetail from './BusDetail/BusDetail'
import PricingDetail from './BusDetail/PricingDetail'
import Time from '../../../../UI/Time/Time'
import DatePersion from '../../../../UI/DatePersion/DatePersion'
import { ArrowRightIcon } from '../../../../UI/Icons'
import {
  FetchBusesSeat,
  FetchBusesValidate,
} from '../../../../../actions/bus/bus'
const { Panel } = Collapse

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

const BusListCard = (props) => {
  const {
    t,
    bus,
    seatInfoLoading,
    seatInfoData,
    loadingValidate,
    token,
  } = props

  const [active, setActive] = useState(false)

  const toggle = () => {
    setActive(!active)
  }

  function numberWithCommas(x) {
    return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : x
  }

  const selectBus = () => {
    if (!loadingValidate) props.FetchBusesValidate(bus.token)
  }

  useEffect(() => {
    if (props.preReserveKey) {
      Router.push(`/buses/checkout?key=${props.preReserveKey}`)
    }
  }, [props.preReserveKey])

  useEffect(() => {
    if (active) {
      if (!props.seatInfo || !props.seatInfo.data)
        props.FetchBusesSeat(bus.token)
    }
  }, [active])

  return (
    <>
      <div className={styles.flightCard}>
        <Row>
          <Col xs={16} sm={19} md={19} lg={19} xl={19}>
            <div className={styles.rightCard} onClick={() => toggle()}>
              <div className={styles.contentRightCard}>
                <div className={styles.searchResultLegCard}>
                  <Row className={styles.rowWitdh}>
                    <Col xs={24} sm={6} md={6} lg={6} xl={5}>
                      <div className={styles.companyLogo}>
                        {bus.office.picture ? (
                          <img
                            src={bus.office.picture.path}
                            alt={bus.office.altAttribute}
                          />
                        ) : (
                          <img
                            src="https://cdn.alibaba.ir/static/img/bus/HMSFR.jpg"
                            alt="همسفر"
                          />
                        )}
                        <div className={styles.companyName}>
                          <div className={styles.airlineLabel}>
                            {bus.office.name}
                          </div>
                          <div className={styles.carrierLabel}>
                            {bus.carrier.name}
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col xs={10} sm={6} md={4} lg={4} xl={5}>
                      <div className={styles.departureTime}>
                        <div className={styles.departureAirportLabel}>
                          {bus.source.city.name || '-'}
                        </div>
                        <div className={styles.textDepartureTime}>
                          {bus.source.name || '-'}
                        </div>
                      </div>
                    </Col>
                    <Col xs={4} sm={6} md={10} lg={10} xl={9}>
                      <div className={styles.airlineItinerary}>
                        <div className={styles.textAirlineItinerary}>
                          <DatePersion date={bus.departureDateTime} />
                        </div>
                        <img
                          className={styles.lineBusIcon}
                          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDM1MC40NTEgMzUwLjQ1MSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgY2xhc3M9IiI+PGc+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+Cgk8Zz4KCQk8cGF0aCBkPSJNNzcuNjk1LDIwOC41OTNjLTE3Ljk4NSwwLTMyLjU2MiwxNC41NzEtMzIuNTYyLDMyLjU1OWMwLDE3Ljk4OCwxNC41NzYsMzIuNTU5LDMyLjU2MiwzMi41NTkgICAgYzE3Ljk5MiwwLDMyLjU2NC0xNC41NywzMi41NjQtMzIuNTU5QzExMC4yNTksMjIzLjE2Myw5NS42ODcsMjA4LjU5Myw3Ny42OTUsMjA4LjU5M3ogTTc3LjY5NSwyNTUuMzA2ICAgIGMtNy44MTgsMC0xNC4xNTMtNi4zMzQtMTQuMTUzLTE0LjE1NGMwLTcuODIyLDYuMzM1LTE0LjE1NCwxNC4xNTMtMTQuMTU0YzcuODE5LDAsMTQuMTU5LDYuMzMyLDE0LjE1OSwxNC4xNTQgICAgQzkxLjg1NCwyNDguOTcyLDg1LjUxNCwyNTUuMzA2LDc3LjY5NSwyNTUuMzA2eiIgZmlsbD0iI2RmZGZkZiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPgoJCTxwYXRoIGQ9Ik0yNjguODU0LDIwOC41OTNjLTE3Ljk4NiwwLTMyLjU2MSwxNC41NzEtMzIuNTYxLDMyLjU1OWMwLDE3Ljk4OCwxNC41NzQsMzIuNTU5LDMyLjU2MSwzMi41NTkgICAgYzE3Ljk5MiwwLDMyLjU2NC0xNC41NywzMi41NjQtMzIuNTU5UzI4Ni44NDYsMjA4LjU5MywyNjguODU0LDIwOC41OTN6IE0yNjguODU0LDI1NS4zMDZjLTcuODE4LDAtMTQuMTU0LTYuMzM0LTE0LjE1NC0xNC4xNTQgICAgYzAtNy44MjIsNi4zMzYtMTQuMTU0LDE0LjE1NC0xNC4xNTRjNy44MiwwLDE0LjE2LDYuMzMyLDE0LjE2LDE0LjE1NEMyODMuMDE0LDI0OC45NzIsMjc2LjY3NCwyNTUuMzA2LDI2OC44NTQsMjU1LjMwNnoiIGZpbGw9IiNkZmRmZGYiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD4KCQk8cGF0aCBkPSJNMzMwLjk5OCw3Ni43NDFIMzguOTE1Yy0xMC43MDEsMC0yMS4yMDcsOC41NzktMjMuMzQ4LDE5LjA2NEwzLjg5MiwxMzguNDIzQzEuNzUxLDE0OC45MDgsMCwxNjYuMjQyLDAsMTc2Ljk0NHY0NC43NTEgICAgYzAsMTAuNyw4Ljc1NiwxOS40NTYsMTkuNDU3LDE5LjQ1NmgxOS44MzljMC0yMS4xNywxNy4yMjYtMzguMzk1LDM4LjM5OC0zOC4zOTVjMjEuMTc0LDAsMzguNDAxLDE3LjIyMywzOC40MDEsMzguMzk1aDExNC4zNTggICAgYzAtMjEuMTcsMTcuMjI3LTM4LjM5NSwzOC4zOTgtMzguMzk1YzIxLjE3NiwwLDM4LjQwMiwxNy4yMjMsMzguNDAyLDM4LjM5NWgyMy43NGMxMC43MDMsMCwxOS40NTctOC43NTQsMTkuNDU3LTE5LjQ1NlY5Ni4xOTcgICAgQzM1MC40NTUsODUuNDk2LDM0MS42OTksNzYuNzQxLDMzMC45OTgsNzYuNzQxeiBNODAuODU2LDE1OC44MzZIMzUuNTEybDcuMTg2LTE3LjAxOWMxLjI1NC0yLjk3LTAuMTM3LTYuMzk0LTMuMTA2LTcuNjQ4ICAgIGMtMi45NzItMS4yNTQtNi4zOTUsMC4xMzgtNy42NDcsMy4xMDdsLTguOTEsMjEuMTAzYy02LjAxNS0xLjU4MS05LjY3Ni03LjIxNC04LjQzNy0xMy44OWwxMC40Ni00MS43NCAgICBjMS40NjUtNy44OTEsOS4yMy0xNC4zNDgsMTcuMjU2LTE0LjM0OGgzOC41NDNMODAuODU2LDE1OC44MzZMODAuODU2LDE1OC44MzZ6IE0xNjcuNDM5LDE1OC44MzZIOTIuNTNWODguNDAxaDc0LjkwOVYxNTguODM2eiAgICAgTTI1NC4wMjEsMTU4LjgzNmgtNzQuOTA4Vjg4LjQwMWg3NC45MDhWMTU4LjgzNnogTTMzOC41MjMsMTQ0LjI0NGMwLDguMDI2LTYuNTY2LDE0LjU5My0xNC41OTQsMTQuNTkzaC01OC4yMzRWODguNDAyaDU4LjIzNCAgICBjOC4wMjcsMCwxNC41OTQsNi41NjcsMTQuNTk0LDE0LjU5M1YxNDQuMjQ0eiIgZmlsbD0iI2RmZGZkZiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPgoJPC9nPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjwvZz48L3N2Zz4="
                        />
                        <div className={styles.lineAirlineItinerary}></div>
                        <div className={styles.airlineItineraryLabel}>
                          <span>
                            ساعت حرکت <Time date={bus.departureDateTime} />
                          </span>
                        </div>
                      </div>
                    </Col>
                    <Col xs={10} sm={6} md={4} lg={4} xl={5}>
                      <div className={styles.arrivalTime}>
                        <div className={styles.arrivalAirportLabel}>
                          {bus.destination.name || '-'}
                        </div>
                        <div className={styles.arrivalTimeLabel}>
                          {bus.finalDestination.name != bus.destination.name ? "مقصد نهایی : " + bus.finalDestination.name : ''}
                        </div>
                      </div>
                    </Col>
                    <Col
                      xs={24}
                      className={
                        !active ? styles.activeDetail : styles.hiddenDetail
                      }
                    >
                      <div className={styles.detailFlightBtn}>
                        <a>
                          اطلاعات بیشتر
                          <ArrowRightIcon />
                        </a>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
            <div className={active ? styles.activeDetail : styles.hiddenDetail}>
              <div className={styles.detailFlight}>
                {active && (
                  <BusDetail
                    loading={seatInfoLoading}
                    data={seatInfoData}
                    selectBus={selectBus}
                    loadingValidate={loadingValidate}
                    token={token} />
                )}
                <div
                  className={active ? styles.activeDetail : styles.hiddenDetail}
                  onClick={() => toggle()}
                >
                  <div className={styles.detailFlightBtnClose}>
                    <a>
                      بستن اطاعات بیشتر
                      <ArrowRightIcon />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={8} sm={5} md={5} lg={5} xl={5}>
            <div className={styles.leftCard}>
              <div className={styles.priceFlight}>
                <Row>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={24}
                    xl={24}
                    className={styles.textPriceFlight}
                  >
                    <span>{t('rial')}</span>
                    <h6>{numberWithCommas(bus.salePrice)}</h6>
                    {/* <span className={styles.isAvailability}>
                        {t("capacity-full")}
                      </span> */}
                  </Col>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={24}
                    xl={24}
                    className={styles.flightCardButton}
                  >
                    <Button onClick={() => selectBus()}>
                      {loadingValidate === token ? (
                        <LoadingOutlined spin />
                      ) : (
                        <>
                          انتخاب صندلی
                          <ArrowRightIcon />
                        </>
                      )}
                    </Button>

                    {/* <LoadingOutlined spin className={styles.loadingFlight} /> */}

                    <div className={styles.remainingSeats}>
                      {bus.capacity} {t('remaining-chair')}
                    </div>
                  </Col>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={24}
                    xl={24}
                    className={styles.pricingDetail}
                  >
                    <div
                      className={
                        active ? styles.activeDetail : styles.hiddenDetail
                      }
                    >
                      <PricingDetail bus={bus} />
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

BusListCard.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

BusListCard.propTypes = {
  t: PropTypes.func.isRequired,
}

const mapStateToProp = (state, ownProps) => {
  const token = encodeURIComponent(ownProps.bus.token)
  const filterSeats = state.bus.seatInfo.filter(
    (info) => info.departureKey === token,
  )

  return {
    seatInfoLoading: filterSeats.length ? filterSeats[0].loading : null,
    seatInfoData: filterSeats.length ? filterSeats[0].data : null,
    preReserveKey: state.bus.preReserveKey,
    loadingValidate: state.bus.loadingValidate,
    token,
  }
}

const mapDispatchToProp = (dispatch) => ({
  FetchBusesSeat: (key) => dispatch(FetchBusesSeat(key)),
  FetchBusesValidate: (key) => dispatch(FetchBusesValidate(key)),
})

export default withTranslation('common')(
  React.memo(connect(mapStateToProp, mapDispatchToProp)(BusListCard)),
)
