import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment-jalaali'
import { i18n, withTranslation } from '../../../../i18n'
import { useRouter } from 'next/router'
import { Row, Col, Skeleton, Drawer, Button } from 'antd'
import { Line } from 'rc-progress'
import { FilterFilled } from '@ant-design/icons'
import _ from 'lodash'
import parse from 'html-react-parser'

import styles from '../../../styles/Flight.module.css'
import FlightListFilter from './FlightListFilter/FlightListFilter'
import FlightListContent from './FlightListContent/FlightListContent'
import SuggestionFilterFlight from './SuggestionFilterFlight/SuggestionFilterFlight'
import DatePersion from '../../UI/DatePersion/DatePersion'
import SearchFlight from '../SearchFlight/SearchFlight'

import {
  GetKeyFlights,
  FlightSearchList,
  setFlightListSearch,
  setAirlines,
  setFilterFlight,
  flightsFilter,
  getPathFlight,
  setFlightSelected,
  clearFilter,
  setMinMaxPrice,
} from '../../../actions'
import FlightRound from './FlightRound/FlightRound'
import FlightNoAvailable from './FlightListContent/FlightNoAvailable'
import { ArrowRightIcon, ArrowLeftIcon } from '../../UI/Icons'
import Modal from '../../UI/modal'

moment.loadPersian({ dialect: 'persian-modern' })

const FlightList = (props) => {
  const { t, flightContent } = props
  const router = useRouter()
  const urlParameters = { ...router.query }

  const [loadingFlightList, setLoadingFlightList] = useState(true)
  const [allFlightList, setAllFlightList] = useState({
    departure: [],
    return: [],
  })
  const [isCompleted, setIsCompleted] = useState(false)
  const [filterMinPrice, setFilterMinPrice] = useState(0)
  const [filterMaxPrice, setFilterMaxPrice] = useState(10000000000)
  const [sortFactor, setSortFactor] = useState('LowPrice')
  const [percentLoading, setPercentLoading] = useState(5)
  const [path, setPath] = useState(['', ''])
  const [flightSection, setFlightSection] = useState('departure')
  const [newDate, setNewDate] = useState({
    departureTime: urlParameters.departing,
    retrunTime: urlParameters.returning,
  })
  const [isShowing, setIsShowing] = useState(false)
  const [visible, setVisible] = useState(false)

  //get query url

  const pathFlight = urlParameters.index.split('-')
  const today = moment(new Date()).format('YYYY-MM-DD')
  let parameters = {
    departureCode: pathFlight[0],
    returnCode: pathFlight[1],
    departureTime: urlParameters.departing || today,
    adult: Number(urlParameters.adult) || 1,
    child: Number(urlParameters.child) || 0,
    infant: Number(urlParameters.infant) || 0,
  }

  if (urlParameters.returning) parameters.retrunTime = urlParameters.returning

  useEffect(() => {
    let key = ''
    let flightResponse = {
      departure: [],
      return: [],
    }

    const getKey = async () => {
      flightResponse = {
        departure: [],
        return: [],
      }

      setTimeout(() => {
        setPercentLoading(20)
      }, 800)

      getPathFlight(parameters).then((res) => {
        if (res.data && res.data.result && res.data.result.items) {
          const departureCity = res.data.result.items.filter(
            (item) => item.code === parameters.departureCode && item.city.name,
          )
          const returnCity = res.data.result.items.filter(
            (item) => item.code === parameters.returnCode && item.city.name,
          )
          setPath([departureCity[0].city.name, returnCity[0].city.name])
        } else {
          setPath(['', ''])
        }
      })
      setTimeout(() => {
        setPercentLoading(40)
      }, 800)

      if (newDate.departureTime)
        parameters.departureTime = newDate.departureTime
      key = await GetKeyFlights(parameters)

      if (key && key.data && key.data.result) {
        key = key.data.result
        setTimeout(() => {
          setPercentLoading(60)
        }, 800)
        fetchData()
      } else {
        setTimeout(() => {
          setPercentLoading(100)
          setLoadingFlightList(false)
        }, 800)
      }
    }

    const fetchData = async () => {
      setIsCompleted(false)
      const resFlights = await FlightSearchList(key)
      setTimeout(() => {
        setPercentLoading(80)
      }, 800)
      if (resFlights.data && resFlights.data.result) {
        flightResponse.departure.push(
          ...resFlights.data.result.departureFlights,
        )
        flightResponse.return.push(...resFlights.data.result.returnFlights)
        setAllFlightList(flightResponse)

        // await props.saveSearchResults({'data':sortByPrices, 'LowPrice'});

        if (!resFlights.data.result.isCompleted) {
          setFlightSection('departure')
          setTimeout(fetchData, 4000)
        } else {
          setFlightSection('departure')
          setIsCompleted(true)
          setTimeout(() => {
            setPercentLoading(99)
          }, 800)
          setTimeout(() => {
            setLoadingFlightList(false)
            setPercentLoading(100)
          }, 1000)
        }
      } else {
        setTimeout(() => {
          setPercentLoading(100)
          setLoadingFlightList(false)
        }, 800)
      }
    }

    if (loadingFlightList) {
      getKey()
    }
  }, [loadingFlightList])

  useEffect(() => {
    const sortData = async () => {
      if (flightSection && allFlightList[flightSection]) {
        props.setAirlines(allFlightList[flightSection])
        let sortByPrices = await allFlightList[flightSection].sort((a, b) => {
          return a.adultPrice - b.adultPrice
        })
        setSortFactor(sortFactor)
        props.saveSearchResults({ data: sortByPrices, sortFactor: 'LowPrice' })
        if (sortByPrices && sortByPrices.length) {
          await props.setMinMaxPrice(sortByPrices)
          setFilterMinPrice(sortByPrices[0].adultPrice)
          setFilterMaxPrice(sortByPrices[sortByPrices.length - 1].adultPrice)
          if (urlParameters.flightType) {
            props.setFilterFlight({
              type: 'filterFlightCabin',
              value: [_.startCase(urlParameters.flightType)],
            })
          }
          props.setFilterFlight({ type: 'filterPriceValue', value: [] })
        }
      }
    }
    if (isCompleted) {
      sortData()
    }
  }, [flightSection, isCompleted])

  useEffect(() => {
    props.setFilterFlight({ type: 'filterPriceValue', value: [] })
  }, [props.minMaxPrices])

  useEffect(() => {
    if (
      props.flightSelected &&
      props.flightSelected.departure &&
      parameters.retrunTime
    ) {
      setFlightSection('return')
      // props.saveSearchResults()
    } else {
      setFlightSection('departure')
    }
  }, [props.flightSelected])

  const nextDay = (item) => {
    let date = {}
    if (item == 'next') {
      date = {
        departureTime: moment(newDate.departureTime)
          .add(1, 'day')
          .format('YYYY-MM-DD'),
        retrunTime: newDate.retrunTime,
      }
    } else {
      date = {
        departureTime: moment(newDate.departureTime)
          .subtract(1, 'day')
          .format('YYYY-MM-DD'),
        retrunTime: newDate.retrunTime,
      }
    }
    setNewDate(date)
    clearSelectedFlight()
    props.clearFilter([])
    // props.setFilterFlight({type:"filterPriceValue",value:[filterMinPrice, filterMaxPrice]})
    sortHandler('lowPrice', [])
    setAllFlightList([])
    setLoadingFlightList(true)
    setPercentLoading(5)
  }

  const sortHandler = (sortFactor, flights = props.flightsSearch) => {
    setSortFactor(sortFactor)
    props.saveSearchResults({ data: flights, sortFactor })
  }

  const clearSelectedFlight = () => {
    props.setFlightSelected({})
    setFlightSection('departure')
  }

  const openModalHandler = () => {
    setIsShowing(true)
  }

  const closeModalHandler = () => {
    setIsShowing(false)
  }

  const showDrawer = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }

  return (
    <div
      className={`${styles.flightList} ${
        process.env.THEME_NAME === 'TRAVELO' && styles.flightListTravelo
      }`}
    >
      <Modal className="modal" show={isShowing} close={closeModalHandler}>
        <SearchFlight />
      </Modal>
      {isShowing && (
        <div onClick={closeModalHandler} className={styles.back_drop}></div>
      )}
      <div className={styles.container}>
        {props.flightSelected &&
        props.flightSelected.departure &&
        !props.flightSelected.return &&
        parameters.retrunTime ? (
          <FlightRound
            flightSelected={props.flightSelected}
            flightSection="departure"
            clearSelectedFlight={clearSelectedFlight}
          />
        ) : (
          ''
        )}
        <Row>
          {/* <FlightLoading visible={loadingFlightList} /> */}

          <Button
            type="text"
            onClick={showDrawer}
            className={styles.btnListFilterOpenSidebar}
          >
            <FilterFilled />
            {t('filter')}
          </Button>
          <Drawer
            placement="right"
            closable={false}
            onClose={onClose}
            open={visible}
          >
            <div className={styles.sidebarListFilter}>
              <FlightListFilter
                allFlightList={allFlightList[flightSection]}
                filterFlightsTotal={props.flightsSearch.length}
                airlines={props.airlineList}
                filters={props.filters}
                loading={loadingFlightList}
                minPrice={props.minMaxPrices[0]}
                maxPrice={props.minMaxPrices[1]}
                sortFactor={sortFactor}
                setFilterFlight={props.setFilterFlight}
                flightsFilter={props.flightsFilter}
              />
            </div>
          </Drawer>

          <Col xs={24} sm={24} md={24} lg={6} xl={6}>
            <FlightListFilter
              allFlightList={allFlightList[flightSection]}
              filterFlightsTotal={props.flightsSearch.length}
              airlines={props.airlineList}
              filters={props.filters}
              loading={loadingFlightList}
              minPrice={props.minMaxPrices[0]}
              maxPrice={props.minMaxPrices[1]}
              sortFactor={sortFactor}
              setFilterFlight={props.setFilterFlight}
              flightsFilter={props.flightsFilter}
            />
          </Col>

          <Col xs={24} sm={24} md={24} lg={18} xl={18}>
            <div className={styles.showMySearch} onClick={openModalHandler}>
              <div className={styles.mySearchOD}>
                <div className={styles.mySearchOrigin}>
                  <div className={styles.labelOrigin}>
                    {parameters.departureCode}
                  </div>
                  <div className={styles.citytOrigin}>{path[0]}</div>
                </div>
                <div className={styles.middleIcon}>
                  <ArrowLeftIcon />
                </div>
                <div className={styles.mySearchDestination}>
                  <div className={styles.labelDestination}>
                    {parameters.returnCode}
                  </div>
                  <div className={styles.cityDestination}>{path[1]}</div>
                </div>
              </div>

              <div className={styles.mySearchDR}>
                <div className={styles.mySearchDeparting}>
                  <div className={styles.labelDeparting}>
                    {t('departure-time')}
                  </div>
                  <div className={styles.dateDeparting}>
                    <DatePersion date={newDate.departureTime} />
                  </div>
                </div>
                {parameters.retrunTime ? (
                  <div className={styles.mySearchReturning}>
                    <div className={styles.labelReturning}>
                      {t('تاریخ برگشت')}
                    </div>
                    <div className={styles.dateReturning}>
                      <DatePersion date={newDate.retrunTime} />
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>

              <div className={styles.mySearchPC}>
                <div className={styles.mySearchPassenger}>
                  <div className={styles.labelPassenger}>{t('مسافران')}</div>
                  <div className={styles.countPassenger}>
                    {parameters.adult + parameters.child + parameters.infant}
                  </div>
                </div>
                <div className={styles.mySearchCabin}>
                  <div className={styles.labelCabin}>{t('cabin')}</div>
                  <div className={styles.typeCabin}>{t('economy')}</div>
                </div>
              </div>

              <div className={styles.mySearchBtn}>
                <button>{t('change-search')}</button>
              </div>
            </div>

            {!loadingFlightList ? (
              <div className={styles.filterSortFlightList}>
                {allFlightList[flightSection] &&
                allFlightList[flightSection].length ? (
                  <SuggestionFilterFlight
                    filters={props.filters}
                    filterMinPrice={filterMinPrice}
                    filterMaxPrice={filterMaxPrice}
                    setFilterFlight={props.setFilterFlight}
                    flightsFilter={props.flightsFilter}
                    airlineList={props.airlineList}
                    allFlightList={allFlightList[flightSection]}
                    loadingFlightList={loadingFlightList}
                    sortFactor={sortFactor}
                  />
                ) : (
                  ''
                )}
                {!parameters.retrunTime && (
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
                        {moment(newDate.departureTime).format(
                          'jD jMMMM  jYYYY ',
                        )}
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
                )}
              </div>
            ) : (
              ''
            )}
            {percentLoading !== 100 && (
              <div className={styles.loadingFlightSearch}>
                <span>{t('getting-best-suggestion')}</span>
                <Line
                  percent={percentLoading}
                  // strokeWidth="1"
                  strokeColor="#71ce6c"
                />
              </div>
            )}

            {loadingFlightList && (
              <div>
                {/* <br/> */}
                {/* <Spin style={{marginLeft: '10px'}}/> */}
                {!allFlightList.length
                  ? t('searching-flights')
                  : // : `تاکنون ${allFlightList[flightSection].length}پرواز یافت شد`}
                    t('flight-found-up-to-now', {
                      length: allFlightList[flightSection].length,
                    })}

                <div
                  className={`${styles.flightListContent} ${
                    process.env.THEME_NAME === 'TRAVELO' &&
                    styles.flightListContentTravelo
                  }`}
                >
                  <div className={styles.flightResultList}>
                    <div className={styles.flightCard}>
                      <Row>
                        <Col xs={16} sm={19} md={19} lg={19} xl={19}>
                          <div className={styles.rightCard}>
                            <div className={styles.contentRightCard}>
                              <div className={styles.searchResultLegCard}>
                                <Row className={styles.rowWitdh}>
                                  <Col xs={24} sm={6} md={6} lg={6} xl={5}>
                                    <Skeleton.Button
                                      active
                                      size="small"
                                      className={styles.airlineSkeleton}
                                    />
                                  </Col>
                                  <Col xs={10} sm={6} md={4} lg={4} xl={5}>
                                    <Skeleton.Input
                                      active
                                      size="large"
                                      className={styles.citySkeleton}
                                    />
                                  </Col>
                                  <Col xs={4} sm={6} md={10} lg={10} xl={9}>
                                    <div
                                      className={
                                        styles.airlineItinerarySkeleton
                                      }
                                    >
                                      <div className={styles.airlineItinerary}>
                                        <svg
                                          focusable="false"
                                          color="inherit"
                                          fill="currentcolor"
                                          aria-hidden="true"
                                          role="presentation"
                                          viewBox="0 0 16 16"
                                          preserveAspectRatio="xMidYMid meet"
                                          width="24px"
                                          height="24px"
                                          className="sc-hBbWxd bAtVEv sc-kGXeez gxECw"
                                        >
                                          <g fill="none" fillRule="evenodd">
                                            <path d="M0 0h16v16H0z"></path>
                                            <path
                                              fill="currentcolor"
                                              d="M8.002 13.429h.42c.557 0 1.009-.44 1.009-.572v.572c0-.316-.44-.572-1.003-.572h-.14l1.714-1.714h.14c.554 0 1.003-.439 1.003-.572v.572c0-.316-.449-.572-.857-.572l1.143-1.428c0-.286.857-.288.857-.288s1.43.028 2.287.002C15.432 8.883 16 8.286 16 8c.003-.286-.568-.857-1.425-.857h-2.287s-.857 0-.857-.286L10.288 5.43c.012 0 0 0 0 0 .473 0 .857-.44.857-.572v.572c0-.316-.438-.572-1.003-.572h-.14L8.287 3.143h.14c.555 0 1.004-.439 1.004-.572v.572c0-.316-.444-.572-.992-.572h-.46L6.253.534S5.895 0 5.39 0l-.441.029s.482.828 1.625 3.4C7.716 6 7.716 6 7.716 6.857l-.572.286H4.572c0 .055-.285 0-1.428.286L1.453 5.547S.857 4.857 0 4.857l1.429 2.857L0 8l1.429.286L0 11.143c.857 0 1.363-.44 1.363-.44l1.78-2.132c1.144.286 1.43.286 1.43.286h2.571l.572.286c0 .857 0 .857-1.143 3.428C5.43 15.143 4.977 16 4.977 16h.412s.516-.108.863-.506l1.75-2.065z"
                                            ></path>
                                          </g>
                                        </svg>
                                        <div
                                          className={
                                            styles.lineAirlineItinerary
                                          }
                                        ></div>
                                      </div>
                                    </div>
                                  </Col>
                                  <Col xs={10} sm={6} md={4} lg={4} xl={5}>
                                    <Skeleton.Input
                                      active
                                      size="large"
                                      className={styles.citySkeleton}
                                    />
                                  </Col>
                                </Row>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col xs={8} sm={5} md={5} lg={5} xl={5}>
                          <div className={styles.buttonSkeleton}>
                            <Skeleton.Button
                              active
                              size="small"
                              className={styles.skeletonButtonFlightCard}
                            />
                            <Skeleton.Input
                              active
                              size="large"
                              className={styles.skeletonInputFlightCard}
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className={styles.flightCard}>
                      <Row>
                        <Col xs={16} sm={19} md={19} lg={19} xl={19}>
                          <div className={styles.rightCard}>
                            <div className={styles.contentRightCard}>
                              <div className={styles.searchResultLegCard}>
                                <Row className={styles.rowWitdh}>
                                  <Col xs={24} sm={6} md={6} lg={6} xl={5}>
                                    <Skeleton.Button
                                      active
                                      size="small"
                                      className={styles.airlineSkeleton}
                                    />
                                  </Col>
                                  <Col xs={10} sm={6} md={4} lg={4} xl={5}>
                                    <Skeleton.Input
                                      active
                                      size="large"
                                      className={styles.citySkeleton}
                                    />
                                  </Col>
                                  <Col xs={4} sm={6} md={10} lg={10} xl={9}>
                                    <div
                                      className={
                                        styles.airlineItinerarySkeleton
                                      }
                                    >
                                      <div className={styles.airlineItinerary}>
                                        <svg
                                          focusable="false"
                                          color="inherit"
                                          fill="currentcolor"
                                          aria-hidden="true"
                                          role="presentation"
                                          viewBox="0 0 16 16"
                                          preserveAspectRatio="xMidYMid meet"
                                          width="24px"
                                          height="24px"
                                          className="sc-hBbWxd bAtVEv sc-kGXeez gxECw"
                                        >
                                          <g fill="none" fillRule="evenodd">
                                            <path d="M0 0h16v16H0z"></path>
                                            <path
                                              fill="currentcolor"
                                              d="M8.002 13.429h.42c.557 0 1.009-.44 1.009-.572v.572c0-.316-.44-.572-1.003-.572h-.14l1.714-1.714h.14c.554 0 1.003-.439 1.003-.572v.572c0-.316-.449-.572-.857-.572l1.143-1.428c0-.286.857-.288.857-.288s1.43.028 2.287.002C15.432 8.883 16 8.286 16 8c.003-.286-.568-.857-1.425-.857h-2.287s-.857 0-.857-.286L10.288 5.43c.012 0 0 0 0 0 .473 0 .857-.44.857-.572v.572c0-.316-.438-.572-1.003-.572h-.14L8.287 3.143h.14c.555 0 1.004-.439 1.004-.572v.572c0-.316-.444-.572-.992-.572h-.46L6.253.534S5.895 0 5.39 0l-.441.029s.482.828 1.625 3.4C7.716 6 7.716 6 7.716 6.857l-.572.286H4.572c0 .055-.285 0-1.428.286L1.453 5.547S.857 4.857 0 4.857l1.429 2.857L0 8l1.429.286L0 11.143c.857 0 1.363-.44 1.363-.44l1.78-2.132c1.144.286 1.43.286 1.43.286h2.571l.572.286c0 .857 0 .857-1.143 3.428C5.43 15.143 4.977 16 4.977 16h.412s.516-.108.863-.506l1.75-2.065z"
                                            ></path>
                                          </g>
                                        </svg>
                                        <div
                                          className={
                                            styles.lineAirlineItinerary
                                          }
                                        ></div>
                                      </div>
                                    </div>
                                  </Col>
                                  <Col xs={10} sm={6} md={4} lg={4} xl={5}>
                                    <Skeleton.Input
                                      active
                                      size="large"
                                      className={styles.citySkeleton}
                                    />
                                  </Col>
                                </Row>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col xs={8} sm={5} md={5} lg={5} xl={5}>
                          <div className={styles.buttonSkeleton}>
                            <Skeleton.Button
                              active
                              size="small"
                              className={styles.skeletonButtonFlightCard}
                            />
                            <Skeleton.Input
                              active
                              size="large"
                              className={styles.skeletonInputFlightCard}
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className={styles.flightCard}>
                      <Row>
                        <Col xs={16} sm={19} md={19} lg={19} xl={19}>
                          <div className={styles.rightCard}>
                            <div className={styles.contentRightCard}>
                              <div className={styles.searchResultLegCard}>
                                <Row className={styles.rowWitdh}>
                                  <Col xs={24} sm={6} md={6} lg={6} xl={5}>
                                    <Skeleton.Button
                                      active
                                      size="small"
                                      className={styles.airlineSkeleton}
                                    />
                                  </Col>
                                  <Col xs={10} sm={6} md={4} lg={4} xl={5}>
                                    <Skeleton.Input
                                      active
                                      size="large"
                                      className={styles.citySkeleton}
                                    />
                                  </Col>
                                  <Col xs={4} sm={6} md={10} lg={10} xl={9}>
                                    <div
                                      className={
                                        styles.airlineItinerarySkeleton
                                      }
                                    >
                                      <div className={styles.airlineItinerary}>
                                        <svg
                                          focusable="false"
                                          color="inherit"
                                          fill="currentcolor"
                                          aria-hidden="true"
                                          role="presentation"
                                          viewBox="0 0 16 16"
                                          preserveAspectRatio="xMidYMid meet"
                                          width="24px"
                                          height="24px"
                                          className="sc-hBbWxd bAtVEv sc-kGXeez gxECw"
                                        >
                                          <g fill="none" fillRule="evenodd">
                                            <path d="M0 0h16v16H0z"></path>
                                            <path
                                              fill="currentcolor"
                                              d="M8.002 13.429h.42c.557 0 1.009-.44 1.009-.572v.572c0-.316-.44-.572-1.003-.572h-.14l1.714-1.714h.14c.554 0 1.003-.439 1.003-.572v.572c0-.316-.449-.572-.857-.572l1.143-1.428c0-.286.857-.288.857-.288s1.43.028 2.287.002C15.432 8.883 16 8.286 16 8c.003-.286-.568-.857-1.425-.857h-2.287s-.857 0-.857-.286L10.288 5.43c.012 0 0 0 0 0 .473 0 .857-.44.857-.572v.572c0-.316-.438-.572-1.003-.572h-.14L8.287 3.143h.14c.555 0 1.004-.439 1.004-.572v.572c0-.316-.444-.572-.992-.572h-.46L6.253.534S5.895 0 5.39 0l-.441.029s.482.828 1.625 3.4C7.716 6 7.716 6 7.716 6.857l-.572.286H4.572c0 .055-.285 0-1.428.286L1.453 5.547S.857 4.857 0 4.857l1.429 2.857L0 8l1.429.286L0 11.143c.857 0 1.363-.44 1.363-.44l1.78-2.132c1.144.286 1.43.286 1.43.286h2.571l.572.286c0 .857 0 .857-1.143 3.428C5.43 15.143 4.977 16 4.977 16h.412s.516-.108.863-.506l1.75-2.065z"
                                            ></path>
                                          </g>
                                        </svg>
                                        <div
                                          className={
                                            styles.lineAirlineItinerary
                                          }
                                        ></div>
                                      </div>
                                    </div>
                                  </Col>
                                  <Col xs={10} sm={6} md={4} lg={4} xl={5}>
                                    <Skeleton.Input
                                      active
                                      size="large"
                                      className={styles.citySkeleton}
                                    />
                                  </Col>
                                </Row>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col xs={8} sm={5} md={5} lg={5} xl={5}>
                          <div className={styles.buttonSkeleton}>
                            <Skeleton.Button
                              active
                              size="small"
                              className={styles.skeletonButtonFlightCard}
                            />
                            <Skeleton.Input
                              active
                              size="large"
                              className={styles.skeletonInputFlightCard}
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className={styles.flightCard}>
                      <Row>
                        <Col xs={16} sm={19} md={19} lg={19} xl={19}>
                          <div className={styles.rightCard}>
                            <div className={styles.contentRightCard}>
                              <div className={styles.searchResultLegCard}>
                                <Row className={styles.rowWitdh}>
                                  <Col xs={24} sm={6} md={6} lg={6} xl={5}>
                                    <Skeleton.Button
                                      active
                                      size="small"
                                      className={styles.airlineSkeleton}
                                    />
                                  </Col>
                                  <Col xs={10} sm={6} md={4} lg={4} xl={5}>
                                    <Skeleton.Input
                                      active
                                      size="large"
                                      className={styles.citySkeleton}
                                    />
                                  </Col>
                                  <Col xs={4} sm={6} md={10} lg={10} xl={9}>
                                    <div
                                      className={
                                        styles.airlineItinerarySkeleton
                                      }
                                    >
                                      <div className={styles.airlineItinerary}>
                                        <svg
                                          focusable="false"
                                          color="inherit"
                                          fill="currentcolor"
                                          aria-hidden="true"
                                          role="presentation"
                                          viewBox="0 0 16 16"
                                          preserveAspectRatio="xMidYMid meet"
                                          width="24px"
                                          height="24px"
                                          className="sc-hBbWxd bAtVEv sc-kGXeez gxECw"
                                        >
                                          <g fill="none" fillRule="evenodd">
                                            <path d="M0 0h16v16H0z"></path>
                                            <path
                                              fill="currentcolor"
                                              d="M8.002 13.429h.42c.557 0 1.009-.44 1.009-.572v.572c0-.316-.44-.572-1.003-.572h-.14l1.714-1.714h.14c.554 0 1.003-.439 1.003-.572v.572c0-.316-.449-.572-.857-.572l1.143-1.428c0-.286.857-.288.857-.288s1.43.028 2.287.002C15.432 8.883 16 8.286 16 8c.003-.286-.568-.857-1.425-.857h-2.287s-.857 0-.857-.286L10.288 5.43c.012 0 0 0 0 0 .473 0 .857-.44.857-.572v.572c0-.316-.438-.572-1.003-.572h-.14L8.287 3.143h.14c.555 0 1.004-.439 1.004-.572v.572c0-.316-.444-.572-.992-.572h-.46L6.253.534S5.895 0 5.39 0l-.441.029s.482.828 1.625 3.4C7.716 6 7.716 6 7.716 6.857l-.572.286H4.572c0 .055-.285 0-1.428.286L1.453 5.547S.857 4.857 0 4.857l1.429 2.857L0 8l1.429.286L0 11.143c.857 0 1.363-.44 1.363-.44l1.78-2.132c1.144.286 1.43.286 1.43.286h2.571l.572.286c0 .857 0 .857-1.143 3.428C5.43 15.143 4.977 16 4.977 16h.412s.516-.108.863-.506l1.75-2.065z"
                                            ></path>
                                          </g>
                                        </svg>
                                        <div
                                          className={
                                            styles.lineAirlineItinerary
                                          }
                                        ></div>
                                      </div>
                                    </div>
                                  </Col>
                                  <Col xs={10} sm={6} md={4} lg={4} xl={5}>
                                    <Skeleton.Input
                                      active
                                      size="large"
                                      className={styles.citySkeleton}
                                    />
                                  </Col>
                                </Row>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col xs={8} sm={5} md={5} lg={5} xl={5}>
                          <div className={styles.buttonSkeleton}>
                            <Skeleton.Button
                              active
                              size="small"
                              className={styles.skeletonButtonFlightCard}
                            />
                            <Skeleton.Input
                              active
                              size="large"
                              className={styles.skeletonInputFlightCard}
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className={styles.flightCard}>
                      <Row>
                        <Col xs={16} sm={19} md={19} lg={19} xl={19}>
                          <div className={styles.rightCard}>
                            <div className={styles.contentRightCard}>
                              <div className={styles.searchResultLegCard}>
                                <Row className={styles.rowWitdh}>
                                  <Col xs={24} sm={6} md={6} lg={6} xl={5}>
                                    <Skeleton.Button
                                      active
                                      size="small"
                                      className={styles.airlineSkeleton}
                                    />
                                  </Col>
                                  <Col xs={10} sm={6} md={4} lg={4} xl={5}>
                                    <Skeleton.Input
                                      active
                                      size="large"
                                      className={styles.citySkeleton}
                                    />
                                  </Col>
                                  <Col xs={4} sm={6} md={10} lg={10} xl={9}>
                                    <div
                                      className={
                                        styles.airlineItinerarySkeleton
                                      }
                                    >
                                      <div className={styles.airlineItinerary}>
                                        <svg
                                          focusable="false"
                                          color="inherit"
                                          fill="currentcolor"
                                          aria-hidden="true"
                                          role="presentation"
                                          viewBox="0 0 16 16"
                                          preserveAspectRatio="xMidYMid meet"
                                          width="24px"
                                          height="24px"
                                          className="sc-hBbWxd bAtVEv sc-kGXeez gxECw"
                                        >
                                          <g fill="none" fillRule="evenodd">
                                            <path d="M0 0h16v16H0z"></path>
                                            <path
                                              fill="currentcolor"
                                              d="M8.002 13.429h.42c.557 0 1.009-.44 1.009-.572v.572c0-.316-.44-.572-1.003-.572h-.14l1.714-1.714h.14c.554 0 1.003-.439 1.003-.572v.572c0-.316-.449-.572-.857-.572l1.143-1.428c0-.286.857-.288.857-.288s1.43.028 2.287.002C15.432 8.883 16 8.286 16 8c.003-.286-.568-.857-1.425-.857h-2.287s-.857 0-.857-.286L10.288 5.43c.012 0 0 0 0 0 .473 0 .857-.44.857-.572v.572c0-.316-.438-.572-1.003-.572h-.14L8.287 3.143h.14c.555 0 1.004-.439 1.004-.572v.572c0-.316-.444-.572-.992-.572h-.46L6.253.534S5.895 0 5.39 0l-.441.029s.482.828 1.625 3.4C7.716 6 7.716 6 7.716 6.857l-.572.286H4.572c0 .055-.285 0-1.428.286L1.453 5.547S.857 4.857 0 4.857l1.429 2.857L0 8l1.429.286L0 11.143c.857 0 1.363-.44 1.363-.44l1.78-2.132c1.144.286 1.43.286 1.43.286h2.571l.572.286c0 .857 0 .857-1.143 3.428C5.43 15.143 4.977 16 4.977 16h.412s.516-.108.863-.506l1.75-2.065z"
                                            ></path>
                                          </g>
                                        </svg>
                                        <div
                                          className={
                                            styles.lineAirlineItinerary
                                          }
                                        ></div>
                                      </div>
                                    </div>
                                  </Col>
                                  <Col xs={10} sm={6} md={4} lg={4} xl={5}>
                                    <Skeleton.Input
                                      active
                                      size="large"
                                      className={styles.citySkeleton}
                                    />
                                  </Col>
                                </Row>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col xs={8} sm={5} md={5} lg={5} xl={5}>
                          <div className={styles.buttonSkeleton}>
                            <Skeleton.Button
                              active
                              size="small"
                              className={styles.skeletonButtonFlightCard}
                            />
                            <Skeleton.Input
                              active
                              size="large"
                              className={styles.skeletonInputFlightCard}
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className={styles.flightCard}>
                      <Row>
                        <Col xs={16} sm={19} md={19} lg={19} xl={19}>
                          <div className={styles.rightCard}>
                            <div className={styles.contentRightCard}>
                              <div className={styles.searchResultLegCard}>
                                <Row className={styles.rowWitdh}>
                                  <Col xs={24} sm={6} md={6} lg={6} xl={5}>
                                    <Skeleton.Button
                                      active
                                      size="small"
                                      className={styles.airlineSkeleton}
                                    />
                                  </Col>
                                  <Col xs={10} sm={6} md={4} lg={4} xl={5}>
                                    <Skeleton.Input
                                      active
                                      size="large"
                                      className={styles.citySkeleton}
                                    />
                                  </Col>
                                  <Col xs={4} sm={6} md={10} lg={10} xl={9}>
                                    <div
                                      className={
                                        styles.airlineItinerarySkeleton
                                      }
                                    >
                                      <div className={styles.airlineItinerary}>
                                        <svg
                                          focusable="false"
                                          color="inherit"
                                          fill="currentcolor"
                                          aria-hidden="true"
                                          role="presentation"
                                          viewBox="0 0 16 16"
                                          preserveAspectRatio="xMidYMid meet"
                                          width="24px"
                                          height="24px"
                                          className="sc-hBbWxd bAtVEv sc-kGXeez gxECw"
                                        >
                                          <g fill="none" fillRule="evenodd">
                                            <path d="M0 0h16v16H0z"></path>
                                            <path
                                              fill="currentcolor"
                                              d="M8.002 13.429h.42c.557 0 1.009-.44 1.009-.572v.572c0-.316-.44-.572-1.003-.572h-.14l1.714-1.714h.14c.554 0 1.003-.439 1.003-.572v.572c0-.316-.449-.572-.857-.572l1.143-1.428c0-.286.857-.288.857-.288s1.43.028 2.287.002C15.432 8.883 16 8.286 16 8c.003-.286-.568-.857-1.425-.857h-2.287s-.857 0-.857-.286L10.288 5.43c.012 0 0 0 0 0 .473 0 .857-.44.857-.572v.572c0-.316-.438-.572-1.003-.572h-.14L8.287 3.143h.14c.555 0 1.004-.439 1.004-.572v.572c0-.316-.444-.572-.992-.572h-.46L6.253.534S5.895 0 5.39 0l-.441.029s.482.828 1.625 3.4C7.716 6 7.716 6 7.716 6.857l-.572.286H4.572c0 .055-.285 0-1.428.286L1.453 5.547S.857 4.857 0 4.857l1.429 2.857L0 8l1.429.286L0 11.143c.857 0 1.363-.44 1.363-.44l1.78-2.132c1.144.286 1.43.286 1.43.286h2.571l.572.286c0 .857 0 .857-1.143 3.428C5.43 15.143 4.977 16 4.977 16h.412s.516-.108.863-.506l1.75-2.065z"
                                            ></path>
                                          </g>
                                        </svg>
                                        <div
                                          className={
                                            styles.lineAirlineItinerary
                                          }
                                        ></div>
                                      </div>
                                    </div>
                                  </Col>
                                  <Col xs={10} sm={6} md={4} lg={4} xl={5}>
                                    <Skeleton.Input
                                      active
                                      size="large"
                                      className={styles.citySkeleton}
                                    />
                                  </Col>
                                </Row>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col xs={8} sm={5} md={5} lg={5} xl={5}>
                          <div className={styles.buttonSkeleton}>
                            <Skeleton.Button
                              active
                              size="small"
                              className={styles.skeletonButtonFlightCard}
                            />
                            <Skeleton.Input
                              active
                              size="large"
                              className={styles.skeletonInputFlightCard}
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className={styles.flightCard}>
                      <Row>
                        <Col xs={16} sm={19} md={19} lg={19} xl={19}>
                          <div className={styles.rightCard}>
                            <div className={styles.contentRightCard}>
                              <div className={styles.searchResultLegCard}>
                                <Row className={styles.rowWitdh}>
                                  <Col xs={24} sm={6} md={6} lg={6} xl={5}>
                                    <Skeleton.Button
                                      active
                                      size="small"
                                      className={styles.airlineSkeleton}
                                    />
                                  </Col>
                                  <Col xs={10} sm={6} md={4} lg={4} xl={5}>
                                    <Skeleton.Input
                                      active
                                      size="large"
                                      className={styles.citySkeleton}
                                    />
                                  </Col>
                                  <Col xs={4} sm={6} md={10} lg={10} xl={9}>
                                    <div
                                      className={
                                        styles.airlineItinerarySkeleton
                                      }
                                    >
                                      <div className={styles.airlineItinerary}>
                                        <svg
                                          focusable="false"
                                          color="inherit"
                                          fill="currentcolor"
                                          aria-hidden="true"
                                          role="presentation"
                                          viewBox="0 0 16 16"
                                          preserveAspectRatio="xMidYMid meet"
                                          width="24px"
                                          height="24px"
                                          className="sc-hBbWxd bAtVEv sc-kGXeez gxECw"
                                        >
                                          <g fill="none" fillRule="evenodd">
                                            <path d="M0 0h16v16H0z"></path>
                                            <path
                                              fill="currentcolor"
                                              d="M8.002 13.429h.42c.557 0 1.009-.44 1.009-.572v.572c0-.316-.44-.572-1.003-.572h-.14l1.714-1.714h.14c.554 0 1.003-.439 1.003-.572v.572c0-.316-.449-.572-.857-.572l1.143-1.428c0-.286.857-.288.857-.288s1.43.028 2.287.002C15.432 8.883 16 8.286 16 8c.003-.286-.568-.857-1.425-.857h-2.287s-.857 0-.857-.286L10.288 5.43c.012 0 0 0 0 0 .473 0 .857-.44.857-.572v.572c0-.316-.438-.572-1.003-.572h-.14L8.287 3.143h.14c.555 0 1.004-.439 1.004-.572v.572c0-.316-.444-.572-.992-.572h-.46L6.253.534S5.895 0 5.39 0l-.441.029s.482.828 1.625 3.4C7.716 6 7.716 6 7.716 6.857l-.572.286H4.572c0 .055-.285 0-1.428.286L1.453 5.547S.857 4.857 0 4.857l1.429 2.857L0 8l1.429.286L0 11.143c.857 0 1.363-.44 1.363-.44l1.78-2.132c1.144.286 1.43.286 1.43.286h2.571l.572.286c0 .857 0 .857-1.143 3.428C5.43 15.143 4.977 16 4.977 16h.412s.516-.108.863-.506l1.75-2.065z"
                                            ></path>
                                          </g>
                                        </svg>
                                        <div
                                          className={
                                            styles.lineAirlineItinerary
                                          }
                                        ></div>
                                      </div>
                                    </div>
                                  </Col>
                                  <Col xs={10} sm={6} md={4} lg={4} xl={5}>
                                    <Skeleton.Input
                                      active
                                      size="large"
                                      className={styles.citySkeleton}
                                    />
                                  </Col>
                                </Row>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col xs={8} sm={5} md={5} lg={5} xl={5}>
                          <div className={styles.buttonSkeleton}>
                            <Skeleton.Button
                              active
                              size="small"
                              className={styles.skeletonButtonFlightCard}
                            />
                            <Skeleton.Input
                              active
                              size="large"
                              className={styles.skeletonInputFlightCard}
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className={styles.flightCard}>
                      <Row>
                        <Col xs={16} sm={19} md={19} lg={19} xl={19}>
                          <div className={styles.rightCard}>
                            <div className={styles.contentRightCard}>
                              <div className={styles.searchResultLegCard}>
                                <Row className={styles.rowWitdh}>
                                  <Col xs={24} sm={6} md={6} lg={6} xl={5}>
                                    <Skeleton.Button
                                      active
                                      size="small"
                                      className={styles.airlineSkeleton}
                                    />
                                  </Col>
                                  <Col xs={10} sm={6} md={4} lg={4} xl={5}>
                                    <Skeleton.Input
                                      active
                                      size="large"
                                      className={styles.citySkeleton}
                                    />
                                  </Col>
                                  <Col xs={4} sm={6} md={10} lg={10} xl={9}>
                                    <div
                                      className={
                                        styles.airlineItinerarySkeleton
                                      }
                                    >
                                      <div className={styles.airlineItinerary}>
                                        <svg
                                          focusable="false"
                                          color="inherit"
                                          fill="currentcolor"
                                          aria-hidden="true"
                                          role="presentation"
                                          viewBox="0 0 16 16"
                                          preserveAspectRatio="xMidYMid meet"
                                          width="24px"
                                          height="24px"
                                          className="sc-hBbWxd bAtVEv sc-kGXeez gxECw"
                                        >
                                          <g fill="none" fillRule="evenodd">
                                            <path d="M0 0h16v16H0z"></path>
                                            <path
                                              fill="currentcolor"
                                              d="M8.002 13.429h.42c.557 0 1.009-.44 1.009-.572v.572c0-.316-.44-.572-1.003-.572h-.14l1.714-1.714h.14c.554 0 1.003-.439 1.003-.572v.572c0-.316-.449-.572-.857-.572l1.143-1.428c0-.286.857-.288.857-.288s1.43.028 2.287.002C15.432 8.883 16 8.286 16 8c.003-.286-.568-.857-1.425-.857h-2.287s-.857 0-.857-.286L10.288 5.43c.012 0 0 0 0 0 .473 0 .857-.44.857-.572v.572c0-.316-.438-.572-1.003-.572h-.14L8.287 3.143h.14c.555 0 1.004-.439 1.004-.572v.572c0-.316-.444-.572-.992-.572h-.46L6.253.534S5.895 0 5.39 0l-.441.029s.482.828 1.625 3.4C7.716 6 7.716 6 7.716 6.857l-.572.286H4.572c0 .055-.285 0-1.428.286L1.453 5.547S.857 4.857 0 4.857l1.429 2.857L0 8l1.429.286L0 11.143c.857 0 1.363-.44 1.363-.44l1.78-2.132c1.144.286 1.43.286 1.43.286h2.571l.572.286c0 .857 0 .857-1.143 3.428C5.43 15.143 4.977 16 4.977 16h.412s.516-.108.863-.506l1.75-2.065z"
                                            ></path>
                                          </g>
                                        </svg>
                                        <div
                                          className={
                                            styles.lineAirlineItinerary
                                          }
                                        ></div>
                                      </div>
                                    </div>
                                  </Col>
                                  <Col xs={10} sm={6} md={4} lg={4} xl={5}>
                                    <Skeleton.Input
                                      active
                                      size="large"
                                      className={styles.citySkeleton}
                                    />
                                  </Col>
                                </Row>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col xs={8} sm={5} md={5} lg={5} xl={5}>
                          <div className={styles.buttonSkeleton}>
                            <Skeleton.Button
                              active
                              size="small"
                              className={styles.skeletonButtonFlightCard}
                            />
                            <Skeleton.Input
                              active
                              size="large"
                              className={styles.skeletonInputFlightCard}
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className={styles.flightCard}>
                      <Row>
                        <Col xs={16} sm={19} md={19} lg={19} xl={19}>
                          <div className={styles.rightCard}>
                            <div className={styles.contentRightCard}>
                              <div className={styles.searchResultLegCard}>
                                <Row className={styles.rowWitdh}>
                                  <Col xs={24} sm={6} md={6} lg={6} xl={5}>
                                    <Skeleton.Button
                                      active
                                      size="small"
                                      className={styles.airlineSkeleton}
                                    />
                                  </Col>
                                  <Col xs={10} sm={6} md={4} lg={4} xl={5}>
                                    <Skeleton.Input
                                      active
                                      size="large"
                                      className={styles.citySkeleton}
                                    />
                                  </Col>
                                  <Col xs={4} sm={6} md={10} lg={10} xl={9}>
                                    <div
                                      className={
                                        styles.airlineItinerarySkeleton
                                      }
                                    >
                                      <div className={styles.airlineItinerary}>
                                        <svg
                                          focusable="false"
                                          color="inherit"
                                          fill="currentcolor"
                                          aria-hidden="true"
                                          role="presentation"
                                          viewBox="0 0 16 16"
                                          preserveAspectRatio="xMidYMid meet"
                                          width="24px"
                                          height="24px"
                                          className="sc-hBbWxd bAtVEv sc-kGXeez gxECw"
                                        >
                                          <g fill="none" fillRule="evenodd">
                                            <path d="M0 0h16v16H0z"></path>
                                            <path
                                              fill="currentcolor"
                                              d="M8.002 13.429h.42c.557 0 1.009-.44 1.009-.572v.572c0-.316-.44-.572-1.003-.572h-.14l1.714-1.714h.14c.554 0 1.003-.439 1.003-.572v.572c0-.316-.449-.572-.857-.572l1.143-1.428c0-.286.857-.288.857-.288s1.43.028 2.287.002C15.432 8.883 16 8.286 16 8c.003-.286-.568-.857-1.425-.857h-2.287s-.857 0-.857-.286L10.288 5.43c.012 0 0 0 0 0 .473 0 .857-.44.857-.572v.572c0-.316-.438-.572-1.003-.572h-.14L8.287 3.143h.14c.555 0 1.004-.439 1.004-.572v.572c0-.316-.444-.572-.992-.572h-.46L6.253.534S5.895 0 5.39 0l-.441.029s.482.828 1.625 3.4C7.716 6 7.716 6 7.716 6.857l-.572.286H4.572c0 .055-.285 0-1.428.286L1.453 5.547S.857 4.857 0 4.857l1.429 2.857L0 8l1.429.286L0 11.143c.857 0 1.363-.44 1.363-.44l1.78-2.132c1.144.286 1.43.286 1.43.286h2.571l.572.286c0 .857 0 .857-1.143 3.428C5.43 15.143 4.977 16 4.977 16h.412s.516-.108.863-.506l1.75-2.065z"
                                            ></path>
                                          </g>
                                        </svg>
                                        <div
                                          className={
                                            styles.lineAirlineItinerary
                                          }
                                        ></div>
                                      </div>
                                    </div>
                                  </Col>
                                  <Col xs={10} sm={6} md={4} lg={4} xl={5}>
                                    <Skeleton.Input
                                      active
                                      size="large"
                                      className={styles.citySkeleton}
                                    />
                                  </Col>
                                </Row>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col xs={8} sm={5} md={5} lg={5} xl={5}>
                          <div className={styles.buttonSkeleton}>
                            <Skeleton.Button
                              active
                              size="small"
                              className={styles.skeletonButtonFlightCard}
                            />
                            <Skeleton.Input
                              active
                              size="large"
                              className={styles.skeletonInputFlightCard}
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className={styles.flightCard}>
                      <Row>
                        <Col xs={16} sm={19} md={19} lg={19} xl={19}>
                          <div className={styles.rightCard}>
                            <div className={styles.contentRightCard}>
                              <div className={styles.searchResultLegCard}>
                                <Row className={styles.rowWitdh}>
                                  <Col xs={24} sm={6} md={6} lg={6} xl={5}>
                                    <Skeleton.Button
                                      active
                                      size="small"
                                      className={styles.airlineSkeleton}
                                    />
                                  </Col>
                                  <Col xs={10} sm={6} md={4} lg={4} xl={5}>
                                    <Skeleton.Input
                                      active
                                      size="large"
                                      className={styles.citySkeleton}
                                    />
                                  </Col>
                                  <Col xs={4} sm={6} md={10} lg={10} xl={9}>
                                    <div
                                      className={
                                        styles.airlineItinerarySkeleton
                                      }
                                    >
                                      <div className={styles.airlineItinerary}>
                                        <svg
                                          focusable="false"
                                          color="inherit"
                                          fill="currentcolor"
                                          aria-hidden="true"
                                          role="presentation"
                                          viewBox="0 0 16 16"
                                          preserveAspectRatio="xMidYMid meet"
                                          width="24px"
                                          height="24px"
                                          className="sc-hBbWxd bAtVEv sc-kGXeez gxECw"
                                        >
                                          <g fill="none" fillRule="evenodd">
                                            <path d="M0 0h16v16H0z"></path>
                                            <path
                                              fill="currentcolor"
                                              d="M8.002 13.429h.42c.557 0 1.009-.44 1.009-.572v.572c0-.316-.44-.572-1.003-.572h-.14l1.714-1.714h.14c.554 0 1.003-.439 1.003-.572v.572c0-.316-.449-.572-.857-.572l1.143-1.428c0-.286.857-.288.857-.288s1.43.028 2.287.002C15.432 8.883 16 8.286 16 8c.003-.286-.568-.857-1.425-.857h-2.287s-.857 0-.857-.286L10.288 5.43c.012 0 0 0 0 0 .473 0 .857-.44.857-.572v.572c0-.316-.438-.572-1.003-.572h-.14L8.287 3.143h.14c.555 0 1.004-.439 1.004-.572v.572c0-.316-.444-.572-.992-.572h-.46L6.253.534S5.895 0 5.39 0l-.441.029s.482.828 1.625 3.4C7.716 6 7.716 6 7.716 6.857l-.572.286H4.572c0 .055-.285 0-1.428.286L1.453 5.547S.857 4.857 0 4.857l1.429 2.857L0 8l1.429.286L0 11.143c.857 0 1.363-.44 1.363-.44l1.78-2.132c1.144.286 1.43.286 1.43.286h2.571l.572.286c0 .857 0 .857-1.143 3.428C5.43 15.143 4.977 16 4.977 16h.412s.516-.108.863-.506l1.75-2.065z"
                                            ></path>
                                          </g>
                                        </svg>
                                        <div
                                          className={
                                            styles.lineAirlineItinerary
                                          }
                                        ></div>
                                      </div>
                                    </div>
                                  </Col>
                                  <Col xs={10} sm={6} md={4} lg={4} xl={5}>
                                    <Skeleton.Input
                                      active
                                      size="large"
                                      className={styles.citySkeleton}
                                    />
                                  </Col>
                                </Row>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col xs={8} sm={5} md={5} lg={5} xl={5}>
                          <div className={styles.buttonSkeleton}>
                            <Skeleton.Button
                              active
                              size="small"
                              className={styles.skeletonButtonFlightCard}
                            />
                            <Skeleton.Input
                              active
                              size="large"
                              className={styles.skeletonInputFlightCard}
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <FlightListContent
              flightList={props.flightsSearch}
              loading={loadingFlightList}
              sortHandler={sortHandler}
              flightSection={flightSection}
              flightSectionMsg={parameters.retrunTime}
            />

            {(!allFlightList[flightSection] ||
              !allFlightList[flightSection].length) &&
            !loadingFlightList ? (
              <FlightNoAvailable
                subjectText={t('no-flight-available')}
                helpText={t('see-other-date')}
                btnText={t('change-search')}
                handler={openModalHandler}
              />
            ) : (
              ''
            )}

            {(!props.flightsSearch || !props.flightsSearch.length) &&
            !loadingFlightList &&
            allFlightList[flightSection] &&
            allFlightList[flightSection].length ? (
              <FlightNoAvailable
                subjectText={t('no-flight-available-filter')}
                helpText={t('change-filter')}
                btnText={t('clear-filters')}
                handler={() => {
                  props.clearFilter()
                  props.saveSearchResults({
                    data: allFlightList[flightSection],
                    sortFactor: sortFactor,
                  })
                }}
              />
            ) : (
              ''
            )}

            {flightContent && (
              <div className="text-justify">{parse(flightContent)}</div>
            )}
          </Col>
        </Row>
      </div>

      {/* <div className={styles.showInMobile}>
                <Sidebar
                    sidebar={
                        <div className={styles.sidebarListFilter}>
                            <FlightListFilter 
                                flights={allFlightList}
                                loading={loadingFlightList}
                            />
                        </div>
                    }
                    pullRight={true}
                    open={sidebarOpen}
                    onSetOpen={onSetSidebarOpen}
                    styles={{ sidebar: { background: "white" } }}
                >
                    <button onClick={() => setSidebarOpen(true)} className={styles.btnListFilterOpenSidebar}>
                        <FilterFilled />
                        فیلترها
                    </button>
                </Sidebar>
            </div> */}
    </div>
  )
}

FlightList.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

FlightList.propTypes = {
  t: PropTypes.func.isRequired,
}

const getFlights = (flights) => Object.keys(flights).map((id) => flights[id])

const mapStateToProp = (state) => {
  return {
    flightsSearch: getFlights(state.flightListSearch),
    airlineList: state.airlineList,
    filters: state.filterFlights,
    flightSelected: state.flightSelected,
    minMaxPrices: state.minMaxPrices,
  }
}

const mapDispatchToProp = (dispatch) => ({
  saveSearchResults: (d) => dispatch(setFlightListSearch(d)),
  setAirlines: (d) => dispatch(setAirlines(d)),
  setFilterFlight: (d) => dispatch(setFilterFlight(d)),
  flightsFilter: (d) => dispatch(flightsFilter(d)),
  setFlightSelected: (d) => dispatch(setFlightSelected(d)),
  clearFilter: () => dispatch(clearFilter()),
  setMinMaxPrice: (d) => dispatch(setMinMaxPrice(d)),
})

export default withTranslation('common')(
  connect(mapStateToProp, mapDispatchToProp)(FlightList),
)
