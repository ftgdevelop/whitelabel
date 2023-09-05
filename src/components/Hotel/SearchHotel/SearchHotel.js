import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import moment from 'moment-jalaali'
import dynamic from 'next/dynamic'

import { i18n, withTranslation, Router } from '../../../../i18n'
import { withRouter } from 'next/router'
import { Button, Row, Col } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import styles from '../../../styles/Home.module.css'
import {
  getExteriorHotels,
  getHotelDetails,
  getInteriorHotels,
} from '../../../actions/hotel/HotelActions'
import { GetEntityNameByLocation } from '../../../actions'
import SearchBoxDatePicker from '../../UI/SearchBoxDatePicker/index'

const ReservationSelect = dynamic(() => import('./ReservationSelect'))
const MultiRoom = dynamic(() => import('./MultiRoom'))
const SelectHotel = dynamic(() => import('./SelectHotel'))

moment.loadPersian({ dialect: 'persian-modern' })

class SearchHotel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      locale: process.env.CALENDAR_LOCALES.includes('fa') ? 'fa' : 'en',
      selectedHotel:
        props.defaultSearchValue && props.cityId
          ? {
              id: props.cityId,
              selectedHotelId: props.selectedHotelId,
              name: props.defaultSearchValue,
              typeId: props.typeId,
            }
          : null,
      selectedGroup: this.props.isForeign ? 'هتل خارجی' : 'هتل داخلی',
      selectedHotelGroup: this.props.isForeign ? 1 : 0,
      selectedEntity: null,
      interiorHotels: props.interiorHotels || [],
      defaultInteriorHotels: props.interiorHotels || [],
      foreignHotels: props.foreignHotels || [],
      defaultForeignHotels: props.foreignHotels || [],
      showing: false,
      displayMultiRooms: true,
      selectedRoom: '',
      hotelNameError: '',
      checkinDate: undefined,
      checkoutDate: undefined,
      loading: false,
    }
  }

  componentWillMount() {
    if (this.props.checkinDate) {
      this.setState({ checkinDate: this.props.checkinDate })
    } else {
      this.setState({ checkinDate: moment().format('YYYY-MM-DD') })
    }
    if (this.props.checkoutDate) {
      this.setState({ checkoutDate: this.props.checkoutDate })
    } else {
      this.setState({
        checkoutDate: moment().add(1, 'day').format('YYYY-MM-DD'),
      })
    }
  }

  async componentDidMount() {
    // await this.getHotelsList("", "ist");
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.t !== this.props.t) {
      if (i18n.language === 'fa') {
        this.getFilteredInteriorHotelsList('')
      } else if (i18n.language === 'ar') {
        this.getFilteredInteriorHotelsList('')
      }
    }
    if (
      this.props.checkinDate &&
      prevProps.checkinDate !== this.props.checkinDate
    ) {
      this.setState({ checkinDate: this.props.checkinDate })
    }
    if (
      this.props.checkoutDate &&
      prevProps.checkoutDate !== this.props.checkoutDate
    ) {
      this.setState({ checkoutDate: this.props.checkoutDate })
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.cityId && nextProps.defaultSearchValue) {
      const newHotelItem = { ...this.state.selectedHotel }
      newHotelItem['name'] = nextProps.defaultSearchValue
      newHotelItem['id'] = nextProps.cityId
      newHotelItem['typeId'] = nextProps.typeId
      newHotelItem['selectedHotelId'] = nextProps.selectedHotelId
      this.setState({ selectedHotel: newHotelItem })
    }
  }

  deserializeDate = (date) => {
    let transformedDate = moment(date).format('YYYY-MM-DD')
    if (this.state.locale === 'fa') {
      transformedDate = moment(date).format('jYYYY-jMM-jDD')
    }
    const formattedDate = transformedDate.split('-')
    return {
      year: parseInt(formattedDate[0]),
      month: parseInt(formattedDate[1]),
      day: parseInt(formattedDate[2]),
    }
  }

  getHotelsList = async (interiorSearchValue, exteriorSearchValue) => {
    this.setState({ isDataLoading: true })
    await Promise.all([
      this.getFilteredInteriorHotelsList(interiorSearchValue, (data) =>
        this.setState({ defaultInteriorHotels: data }),
      ),
      await this.getFilteredExteriorHotelsList(exteriorSearchValue, (data) =>
        this.setState({ defaultForeignHotels: data }),
      ),
    ])
    this.setState({ isDataLoading: false })
  }

  updateHotelsList = async (interiorSearchValue, exteriorSearchValue) => {
    this.setState({ isDataLoading: true })
    await Promise.all([
      this.getFilteredInteriorHotelsList(interiorSearchValue),
      this.getFilteredExteriorHotelsList(exteriorSearchValue),
    ])
    this.setState({ isDataLoading: false })
  }

  handleChange = (item) => {
    this.resetErrors()
    if (this.props.isForeign)
      this.setState({
        selectedHotel: {
          id: item.id,
          selectedHotelId: item.EntityId,
          name: item.name,
          typeId: item.typeId,
        },
      })
    else
      this.setState({
        selectedHotel: {
          id: item.EntityId,
          selectedHotelId: item.EntityId,
          name: item.EntityName,
          typeId: item.EntityTypeId,
        },
      })
    return item.EntityTypeId
      ? this.setState({
          selectedEntity: {
            EntityTypeId: item.EntityTypeId,
            Value: item.Value,
            EntityId: item.EntityId,
            EntityName: item.EntityName,
          },
        })
      : null
  }

  onSearch = async (input) => {
    this.resetErrors()
    this.setState({ query: input })
    if (input && input.length >= 2) {
      await this.updateHotelsList(input, input)
    } else if (!input) {
      this.setState({
        interiorHotels: this.state.defaultInteriorHotels,
        foreignHotels: this.state.defaultForeignHotels,
      })
    }
  }

  isInteriorActive = () => this.state.selectedHotelGroup === 0

  getFilteredInteriorHotelsList = async (query, onSuccessCallback) => {
    let requestParams
    if (i18n.language === 'fa') {
      requestParams = {
        Value: query.trim(),
        LanguageIds: [1, 2],
        EntityTypeIds: [2, 3, 4],
      }
    } else if (i18n.language === 'ar') {
      requestParams = {
        Value: query.trim(),
        LanguageIds: [3, 2],
        EntityTypeIds: [2, 3, 4],
      }
    }
    const response = await this.props.getInteriorHotelsList(
      requestParams,
      i18n.language,
    )
    if (response && response.ok)
      this.setState({ interiorHotels: response.data })

    if (onSuccessCallback) return onSuccessCallback(response.data)
  }

  getFilteredExteriorHotelsList = async (query, onSuccessCallback) => {
    const requestParams = {
      value: query,
    }
    const response = await this.props.getExteriorHotelsList(requestParams)
    if (response && response.ok && response.data)
      this.setState({ foreignHotels: response.data.result || [] })

    if (onSuccessCallback)
      return onSuccessCallback(response.data ? response.data.result || [] : [])
  }

  onChangeRoomType = (roomType) => {
    this.setState({
      displayMultiRooms: roomType === 'more',
      selectedRoom: roomType === 'more' ? 'more' : roomType,
    })
  }

  ChangeLocale = () => {
    if (!process.env.CALENDAR_LOCALES.includes('fa')) return

    this.setState((prevState) => {
      return { locale: prevState.locale === 'en' ? 'fa' : 'en' }
    })
  }

  onChangeDate = (val, label) => {
    const date = val.year + '-' + val.month + '-' + val.day
    let transformedDate
    if (this.state.locale === 'en') {
      transformedDate = moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD')
    } else {
      transformedDate = moment(date, 'jYYYY-jMM-jDD').format('YYYY-MM-DD')
    }
    if (label === 'checkinDate') {
      if (moment(this.state.checkoutDate).isAfter(transformedDate, 'day')) {
        this.setState({ checkinDate: transformedDate })
      } else {
        const oneDayAfterCheckin = moment(transformedDate)
          .add(1, 'day')
          .format('YYYY-MM-DD')
        this.setState({
          checkinDate: transformedDate,
          checkoutDate: oneDayAfterCheckin,
        })
      }
    } else if (label === 'checkoutDate') {
      this.setState({ checkoutDate: transformedDate })
    }
  }

  setTomorrowCheckinTime = (checkinDate) => {
    const { checkoutDate } = this.state
    const formatDate =
      this.state.locale === 'fa' ? 'jYYYY-jMM-jDD' : 'YYYY-MM-DD'

    const tomorrowDate = moment(
      `${checkinDate.year}-${checkinDate.month}-${checkinDate.day}`,
      formatDate,
    ).add(1, 'day')

    const initialTomorrowDate =
      this.state.locale === 'fa'
        ? {
            day: Number(tomorrowDate.format('jDD')),
            month: Number(tomorrowDate.format('jMM')),
            year: Number(tomorrowDate.format('jYYYY')),
          }
        : {
            day: Number(tomorrowDate.format('DD')),
            month: Number(tomorrowDate.format('MM')),
            year: Number(tomorrowDate.format('YYYY')),
          }

    //this.setState({ tomorrowCheckinTime: initialTomorrowDate });

    const checkinDate_getTime = new Date(
      moment(
        `${checkinDate.year}-${checkinDate.month}-${checkinDate.day}`,
        formatDate,
      ),
    ).getTime()
    const checkoutDate_getTime = new Date(
      moment(
        `${checkoutDate.year}-${checkoutDate.month}-${checkoutDate.day}`,
        formatDate,
      ),
    ).getTime()

    if (checkinDate_getTime > checkoutDate_getTime) {
      this.setState({ checkoutDate: initialTomorrowDate })
    }
    document.getElementsByName('checkoutDate')[0].focus()
  }

  onChangeExtraRooms = ({ extraRooms }) => {
    this.setState({ extraRooms: extraRooms })
  }

  onSubmit = async () => {
    this.resetErrors()
    const {
      selectedHotel,
      checkinDate,
      checkoutDate,
      selectedRoom,
      extraRooms,
    } = this.state

    let searchValueName = this.state.selectedHotel.name
    if (!this.props.isForeign) {
      const response = await GetEntityNameByLocation(
        selectedHotel.selectedHotelId,
        i18n.language,
      )
      if (response && response.data) {
        searchValueName = response.data.EntityName
      }
    }
    if (!selectedHotel || Object.keys(selectedHotel).length < 1) {
      return this.setState({ hotelNameError: 'مقصد نباید خالی باشد' })
    }

    this.setState({ loading: true })
    const siteLanguage = i18n.language

    let url = ''
    if (selectedHotel && checkinDate && checkoutDate) {
      this.setState({ disableSubmit: true })
      if (selectedHotel.typeId === 4) {
        const hotelDetails = await this.props.GetHotelDetails(
          { hotelId: selectedHotel.selectedHotelId },
          i18n.language,
        )
        if (hotelDetails && hotelDetails.ok) {
          url = hotelDetails.data.Url
        }
      } else {
        if (this.props.isForeign) {
          url = `/hotels-foreign/${searchValueName}`
        } else {
          if (selectedHotel.typeId === 3) {
            if (siteLanguage === 'fa') {
              url = `/hotels/هتل-های-${searchValueName}`
            } else if (siteLanguage === 'ar') {
              url = `/hotels/فنادق-${searchValueName}`
            } else {
              url = `/hotels/${searchValueName}`
            }
          } else if (selectedHotel.typeId === 2) {
            if (siteLanguage === 'fa') {
              url = `/hotels/هتل-های-استان-${searchValueName}`
            } else if (siteLanguage === 'ar') {
              url = `/hotels/فنادق-محافظة-${searchValueName}`
            } else {
              url = `/hotels/${searchValueName}`
            }
          }
        }
      }
      let room = ''
      if (selectedRoom === 'more') {
        const passengers = extraRooms.map((item) => {
          let children = []
          if (item.children.length > 0)
            children = item.children.map((c) => `/child-${c}`)
          return `/adult-${item.adultCount}${children.join('')}`
        })
        room = `${passengers.join('')}`
      } else {
        if (selectedRoom === 'one') room = `/adult-1`
        else if (selectedRoom === 'two') room = `/adult-2`
      }

      url += `/location-${selectedHotel.id}/checkin-${checkinDate}/checkout-${checkoutDate}${room}`
      // if (this.props.hotelUrl){
      //     url = `${this.props.hotelUrl}/checkin-${georgianCheckinDate}/checkout-${georgianCheckoutDate}${room}`;
      // }

      this.setState({ disableSubmit: false })

      Router.push(url).then()
    }
  }

  resetErrors = () => this.setState({ hotelNameError: '' })

  render() {
    const {
      interiorHotels,
      foreignHotels,
      showing,
      displayMultiRooms,
      hotelNameError,
      isDataLoading,
      checkoutDate,
      checkinDate,
      disableSubmit,
    } = this.state

    const { selectedHotelId, defaultSearchValue, t } = this.props

    return (
      <>
        {process.env.THEME_NAME === 'TAJAWAL' && showing ? (
          <div
            className={styles.bgShadowFixed}
            onClick={() => this.setState({ showing: false })}
          />
        ) : null}

        <div
          className={`${styles.searchHotel} ${styles.searchHotelRoot} ${
            process.env.THEME_NAME === 'TRAVELO' && styles.searchHotelTravelo
          }`}
          onClick={() => this.setState({ showing: true })}
        >
          <Row gutter={[8, 0]}>
            <Col
              xs={24}
              sm={24}
              md={
                this.props.router.pathname === '/' &&
                process.env.THEME_NAME === 'TRAVELO'
                  ? 24
                  : 9
              }
              lg={
                this.props.router.pathname === '/' &&
                process.env.THEME_NAME === 'TRAVELO'
                  ? 11
                  : 9
              }
              xl={
                this.props.router.pathname === '/' &&
                process.env.THEME_NAME === 'TRAVELO'
                  ? 11
                  : 9
              }
              className={styles.basicSingleHotel}
            >
              <SelectHotel
                isForeign={this.props.isForeign}
                data={this.props.isForeign ? foreignHotels : interiorHotels}
                defaultValue={defaultSearchValue}
                tooltipMessage={hotelNameError}
                enableLoading={isDataLoading}
                selectedValueId={selectedHotelId}
                onInputFocusCallback={this.resetErrors}
                onChangeInputCallback={this.onSearch}
                onChangeTabCallback={(id) =>
                  this.setState({ selectedHotelGroup: id })
                }
                onSelectITemCallback={this.handleChange}
                onClearInputCallback={() => {
                  this.setState({ selectedHotel: null })
                }}
              />
            </Col>
            <Col
              xs={24}
              sm={12}
              md={
                this.props.router.pathname === '/' &&
                process.env.THEME_NAME === 'TRAVELO'
                  ? 12
                  : 7
              }
              lg={
                this.props.router.pathname === '/' &&
                process.env.THEME_NAME === 'TRAVELO'
                  ? 7
                  : 6
              }
              xl={
                this.props.router.pathname === '/' &&
                process.env.THEME_NAME === 'TRAVELO'
                  ? 7
                  : 6
              }
            >
              <Row
                gutter={process.env.THEME_NAME === 'TRAVELO' ? [8, 0] : [0, 0]}
              >
                <Col span={12}>
                  <SearchBoxDatePicker
                    inputPlaceholder={t('checkin-date')}
                    onChangeDate={this.onChangeDate}
                    selectedDate={this.deserializeDate(checkinDate)}
                    wrapperClassname="search-hotel-datepicker checkin"
                    minimumDate={this.deserializeDate(
                      moment().format('YYYY-MM-DD'),
                    )}
                    field="checkinDate"
                    ChangeLocale={
                      process.env.CALENDAR_LOCALES.includes('fa')
                        ? this.ChangeLocale
                        : undefined
                    }
                    locale={
                      process.env.CALENDAR_LOCALES.includes('fa')
                        ? this.state.locale
                        : 'en'
                    }
                  />
                </Col>
                <Col span={12}>
                  <SearchBoxDatePicker
                    inputPlaceholder={t('checkout-date')}
                    onChangeDate={this.onChangeDate}
                    selectedDate={this.deserializeDate(checkoutDate)}
                    wrapperClassname="search-hotel-datepicker checkout"
                    minimumDate={this.deserializeDate(
                      moment(checkinDate).add(1, 'day').format('YYYY-MM-DD'),
                    )}
                    name="checkoutDate"
                    field="checkoutDate"
                    ChangeLocale={
                      process.env.CALENDAR_LOCALES.includes('fa')
                        ? this.ChangeLocale
                        : undefined
                    }
                    locale={
                      process.env.CALENDAR_LOCALES.includes('fa')
                        ? this.state.locale
                        : 'en'
                    }
                  />
                </Col>
              </Row>
            </Col>
            <Col
              xs={24}
              sm={12}
              md={
                this.props.router.pathname === '/' &&
                process.env.THEME_NAME === 'TRAVELO'
                  ? 12
                  : 6
              }
              lg={
                this.props.router.pathname === '/' &&
                process.env.THEME_NAME === 'TRAVELO'
                  ? 6
                  : 5
              }
              xl={
                this.props.router.pathname === '/' &&
                process.env.THEME_NAME === 'TRAVELO'
                  ? 6
                  : 5
              }
            >
              <ReservationSelect
                onChangeCallback={this.onChangeRoomType}
                defaultRooms={this.props.defaultRooms}
              />
            </Col>

            {process.env.THEME_NAME === 'TRAVELO' && displayMultiRooms ? (
              <Row style={{ width: '100%', marginBottom: 15 }}>
                <Col span={24}>
                  <MultiRoom
                    defaultRooms={this.props.defaultRooms}
                    roomsLimit={4}
                    onChangeRoomsCallback={this.onChangeExtraRooms}
                  />
                </Col>
              </Row>
            ) : null}

            {process.env.THEME_NAME === 'TAJAWAL' && (
              <Col xs={24} sm={24} md={24} lg={4}>
                <div className={`${styles.btnhotelSearch}`}>
                  <Button
                    className="button red-btn full-width"
                    loading={this.state.loading}
                    size="large"
                    type="myPrimary"
                    htmlType="submit"
                    onClick={!disableSubmit ? this.onSubmit : null}
                  >
                    <SearchOutlined />
                    {t('search')}
                  </Button>
                </div>
              </Col>
            )}

            {process.env.THEME_NAME === 'TRAVELO' && (
              <Col
                xs={24}
                sm={24}
                md={this.props.router.pathname === '/' ? 24 : 4}
                lg={this.props.router.pathname === '/' ? 24 : 4}
                xl={this.props.router.pathname === '/' ? 24 : 4}
              >
                <div
                  className={`${styles.btnhotelSearch} ${
                    styles.btnhoteSearchTravelo
                  } ${
                    this.props.router.pathname === '/' &&
                    styles.btnhoteSearchIndexTravelo
                  }`}
                >
                  <Button
                    className="button blue-btn full-width"
                    loading={this.state.loading}
                    size="large"
                    type="myPrimary"
                    htmlType="submit"
                    onClick={!disableSubmit ? this.onSubmit : null}
                  >
                    {t('search')}
                  </Button>
                </div>
              </Col>
            )}
          </Row>

          {process.env.THEME_NAME === 'TAJAWAL' && displayMultiRooms ? (
            <Row>
              <Col xs={24} md={20}>
                <MultiRoom
                  defaultRooms={this.props.defaultRooms}
                  roomsLimit={this.props.isForeign ? 4 : 1}
                  onChangeRoomsCallback={this.onChangeExtraRooms}
                />
              </Col>
            </Row>
          ) : null}
        </div>
      </>
    )
  }
}

SearchHotel.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

const mapDispatchToProps = (dispatch) => ({
  getInteriorHotelsList: (params, currentlang) =>
    dispatch(getInteriorHotels(params, currentlang)),
  getExteriorHotelsList: (params) => dispatch(getExteriorHotels(params)),
  GetHotelDetails: (params, currentlang) =>
    dispatch(getHotelDetails(params, currentlang)),
})

SearchHotel.propTypes = {
  t: PropTypes.func.isRequired,
}

const withConnect = connect(null, mapDispatchToProps)

export default compose(withConnect)(
  withTranslation('common')(withRouter(SearchHotel)),
)
