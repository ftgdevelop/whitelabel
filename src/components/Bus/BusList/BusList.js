import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { i18n, withTranslation } from '../../../../i18n'
import { useRouter } from 'next/router'
import { Row, Col, Skeleton, Drawer, Button } from 'antd'
import moment from 'moment-jalaali'
import { Line } from 'rc-progress'

import _ from 'lodash'
import styles from '../../../styles/Bus.module.css'
import BusListFilter from './BusListFilter/BusListFilter'
import FlightListForeignContent from './BusListContent/BusListContent'
import DatePersion from '../../UI/DatePersion/DatePersion'
import { ArrowRightIcon, ArrowLeftIcon } from '../../UI/Icons'
import FlightNoAvailable from './BusListContent/BusNoAvailable'
import SearchBus from '../SearchBus/SearchBus'
import Modal from '../../UI/modal'

import {
  FetchKeyBuses,
  FetchBuses,
  ChangeSort,
  FetchBusesPath,
  reset
} from '../../../actions/bus/bus'

const BusList = (props) => {
  let timeOut = null
  const { t } = props
  const router = useRouter()
  const urlParameters = { ...router.query }
  const [percentLoading, setPercentLoading] = useState(5)
  const [isShowing, setIsShowing] = useState(false)

  const openModalHandler = () => {
    setIsShowing(true)
  }

  const closeModalHandler = () => {
    setIsShowing(false)
  }

  const getKey = async () => {
    clearTimeout(timeOut)
    setIsShowing(false)
    setPercentLoading(5)
    const params = await getParams()
    setPercentLoading(20)
    props.FetchKeyBuses(params)
  }

  const getParams = () => {
    let params = {
      originCode: urlParameters.origin,
      destinationCode: urlParameters.destination,
      departureTime: urlParameters.departing,
    }

    return params
  }

  useEffect(() => {
    return () => {
      clearTimeout(timeOut)
      props.reset()
    }
  }, [])

  useEffect(() => {
    props.FetchBusesPath(urlParameters.origin, urlParameters.destination)
    getKey()
  }, [router.query])

  useEffect(() => {
    if (props.keyAvailability) {
      if (percentLoading < 80) setPercentLoading(percentLoading + 10)
      props.FetchBuses(props.keyAvailability)
    }
  }, [props.keyAvailability])

  useEffect(() => {
    if (!props.loadingFetchData) {
      setPercentLoading(100)
    }
  }, [props.loadingFetchData])

  useEffect(() => {
    if (props.reFetch) {
      timeOut = setTimeout(() => props.FetchBuses(props.keyAvailability), 3000)
    }
  }, [props.reFetch])

  const nextDay = (item) => {
    clearTimeout(timeOut)
    let date = {}
    if (item == 'next') {
      date = moment(urlParameters.departing).add(1, 'day').format('YYYY-MM-DD')
    } else {
      date = moment(urlParameters.departing)
        .subtract(1, 'day')
        .format('YYYY-MM-DD')
    }
    router.replace({
      pathname: router.pathname,
      query: {
        origin: urlParameters.origin,
        destination: urlParameters.destination,
        departing: date,
      },
    })
  }

  return (
    <div className={styles.flightList}>
      <Modal className="modal" show={isShowing} close={closeModalHandler}>
        <SearchBus />
      </Modal>
      <div className={styles.container}>
        <Row>
          <Col xs={24} sm={24} md={24} lg={6} xl={6}>
            <BusListFilter />
          </Col>

          <Col xs={24} sm={24} md={24} lg={18} xl={18}>
            <div className={styles.showMySearch}>
              <div className={styles.mySearchOD}>
                <div className={styles.mySearchOrigin}>
                  <div className={styles.labelOrigin}>
                    {!props.loadingPath && props.paths.length
                      ? props.paths[0].city.name || props.paths[0].name
                      : 'Loading...'}
                  </div>
                  {/* <div className={styles.citytOrigin}>تهران</div> */}
                </div>
                <div className={styles.middleIcon}>
                  <ArrowLeftIcon />
                </div>
                <div className={styles.mySearchDestination}>
                  <div className={styles.labelDestination}>
                    {!props.loadingPath && props.paths.length
                      ? props.paths[1].city.name || props.paths[1].name
                      : 'Loading...'}
                  </div>
                  {/* <div className={styles.cityDestination}>اصفهان</div> */}
                </div>
              </div>

              <div className={styles.mySearchDR}>
                <div className={styles.mySearchDeparting}>
                  <div className={styles.labelDeparting}>
                    {t('departure-time')}
                  </div>
                  <div className={styles.dateDeparting}>
                    <DatePersion date={urlParameters.departing} />
                  </div>
                </div>
              </div>

              <div className={styles.mySearchBtn}>
                <button onClick={openModalHandler}>{t('change-search')}</button>
              </div>
            </div>

            <div className={styles.filterSortFlightList}>
              <div className={styles.sortAndDay}>
                <div className={styles.nextBackDay}>
                  <div
                    className={styles.backDay}
                    onClick={() => nextDay('prev')}
                  >
                    <ArrowRightIcon />
                    {t('previous-day')}
                  </div>
                  <div className={styles.nowDay}>
                    <DatePersion date={urlParameters.departing} />
                  </div>
                  <div
                    className={styles.nextDay}
                    onClick={() => nextDay('next')}
                  >
                    {t('next-day')}
                    <ArrowRightIcon />
                  </div>
                </div>
              </div>
            </div>
            {percentLoading !== 100 && (
              <div className={styles.loadingFlightSearch}>
                <span>دریافت بهترین پیشنهادات</span>
                <Line
                  percent={percentLoading}
                  // strokeWidth="1"
                  strokeColor="#71ce6c"
                />
              </div>
            )}
            <FlightListForeignContent
              busList={props.busList}
              changeSort={props.ChangeSort}
              sortby={props.sortby}
            />

            {!props.busList.length && !props.loadingFetchData ? (
              <FlightNoAvailable
                subjectText="در تاریخ انتخاب شده هیچ اتوبوسی در دسترس نیست"
                helpText="برای مشاهده اتوبوس ها، تاریخ دیگری را انتخاب کنید"
                btnText={t('change-search')}
                handler={openModalHandler}
              />
            ) : (
              ''
            )}
          </Col>
        </Row>
      </div>
    </div>
  )
}

BusList.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

BusList.propTypes = {
  t: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    keyValidate: state.bus.keyValidate,
    keyAvailability: state.bus.keyAvailability,
    busList: state.bus.buses,
    reFetch: state.bus.reFetch,
    loadingFetchData: state.bus.loadingFetchData,
    paths: state.bus.paths,
    loadingPath: state.bus.loadingPath,
    sortby: state.bus.sortby,
    // fetchingKey: state.flightForeign.fetchingKey,
    // fetchingFlights: state.flightForeign.fetchingFlights,
    // isCompleted: state.flightForeign.isCompleted,
    // error: state.flightForeign.error,
    // sortby: state.flightForeign.sortby,
    // loadingPostValidate: state.flightForeign.loadingPostValidate,
    // flightTotal: state.flightForeign.flightTotal,
    // loadingFetchFlight: state.flightForeign.loadingFetchFlight,
  }
}

const mapDispatchToProp = (dispatch) => ({
  FetchKeyBuses: (d) => dispatch(FetchKeyBuses(d)),
  FetchBuses: (d) => dispatch(FetchBuses(d)),
  ChangeSort: (d) => dispatch(ChangeSort(d)),
  reset: () => dispatch(reset()),
  FetchBusesPath: (origin, destination) =>
    dispatch(FetchBusesPath(origin, destination)),
})

export default withTranslation('common')(
  connect(mapStateToProps, mapDispatchToProp)(BusList),
)
