import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Router, i18n, withTranslation } from '../../../../i18n'
import { Row, Col, Button, Tag } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import AsyncSelect from 'react-select/async'
import moment from 'moment-jalaali'

import styles from '../../../styles/Bus.module.css'
import DepartureDate from './DepartureDate'
import { FetchSearchTerminal } from '../../../actions/bus/bus'
import { setDefaultLocale } from 'react-datepicker'
import { SwapVertIcon, BusIcon, LocationIcon } from '../../UI/Icons'
moment.loadPersian({ dialect: 'persian-modern' })

const Time = moment()
const Time1 = moment().add(0, 'day')
const Time2 = moment().add(1, 'day')
let today, initialTimeFrom, initialTimeTo, multiPathDate
// if(i18n.language === 'fa'){
today = {
  day: Number(Time.format('jDD')),
  month: Number(Time.format('jMM')),
  year: Number(Time.format('jYYYY')),
}
initialTimeFrom = {
  day: Number(Time1.format('jDD')),
  month: Number(Time1.format('jMM')),
  year: Number(Time1.format('jYYYY')),
}

const SearchBus = (props) => {
  const { t } = props
  const [optionsFrom, setOptionsFrom] = useState([])
  const [optionsTo, setOptionsTo] = useState([])
  const [locale, setLocale] = useState('fa')
  const [loadingData, setLoadingData] = useState(false)
  const [loading, setLoading] = useState(false)
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [departureTime, setDepartureTime] = useState(
    JSON.parse(JSON.stringify(initialTimeFrom)),
  )
  const options = [
    {
      value: 34,
      label: 'تهران',
      values: {
        name: 'تهران',
        city: {
          name: 'تهران',
          code: 'THR',
        },
        country: {
          name: 'ایران',
          code: 'IR',
        },
        code: 34,
      },
    },
    {
      value: 827,
      label: 'اصفهان',
      values: {
        name: 'اصفهان',
        city: {
          name: null,
          code: null,
        },
        country: {
          name: 'ایران',
          code: 'IR',
        },
        code: 827,
      },
    },
    {
      value: 3587,
      label: 'رشت',
      values: {
        name: 'رشت',
        city: {
          name: null,
          code: null,
        },
        country: {
          name: 'ایران',
          code: 'IR',
        },
        code: 3587,
      },
    },
    {
      value: 1167,
      label: 'تبریز',
      values: {
        name: 'تبریز',
        city: {
          name: null,
          code: null,
        },
        country: {
          name: 'ایران',
          code: 'IR',
        },
        code: 1167,
      },
    },
    {
      value: 28,
      label: 'ایروان',
      values: {
        name: 'ایروان',
        city: {
          name: null,
          code: null,
        },
        country: {
          name: 'ارمنستان',
        },
        code: 28,
      },
    },
    {
      value: 10,
      label: 'استانبول',
      values: {
        name: 'استانبول',
        city: {
          name: null,
          code: null,
        },
        country: {
          name: 'ترکیه',
        },
        code: 10,
      },
    },
    {
      value: 6218,
      label: 'یزد',
      values: {
        name: 'یزد',
        city: {
          name: null,
          code: null,
        },
        country: {
          name: 'ایران',
        },
        code: 6218,
      },
    },
    {
      value: 2288,
      label: 'اهواز',
      values: {
        name: 'اهواز',
        city: {
          name: null,
          code: null,
        },
        country: {
          name: 'ایران',
        },
        code: 2288,
      },
    },
    {
      value: 1494,
      label: 'پایانه امام رضا',
      values: {
        name: 'پایانه امام رضا',
        city: {
          name: 'مشهد',
          code: null,
        },
        country: {
          name: 'ایران',
        },
        code: 1494,
      },
    },
  ]

  const SelectStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: 8,
      borderColor: '#848f99',
      padding: 5,
      marginBottom: 1,
      marginLeft: 5,
      paddingRight: 10,
    }),
  }

  useEffect(() => {
    let values = localStorage.getItem('searchBusValues')
    if (values) {
      setLoadingData(true)
      values = JSON.parse(values)
      values.locale = values.departureTime.year > 2020 ? 'en' : 'fa'
      setOrigin(values.origin)
      setDestination(values.destination)
      setDefaultLocale(values.locale)

      const formatDate = values.locale === 'fa' ? 'jYYYY-jMM-jDD' : 'YYYY-MM-DD'

      const departureTime = new Date(
        moment(
          `${values.departureTime.year}-${values.departureTime.month}-${values.departureTime.day}`,
          formatDate,
        ),
      ).getTime()
      const todayTime = new Date(
        moment(
          `${initialTimeFrom.year}-${initialTimeFrom.month}-${initialTimeFrom.day}`,
          'jYYYY-jMM-jDD',
        ),
      ).getTime()

      if (values.locale === 'en') {
        today = {
          day: Number(Time.format('DD')),
          month: Number(Time.format('MM')),
          year: Number(Time.format('YYYY')),
        }
      }

      if (departureTime >= todayTime) {
        setDepartureTime(values.departureTime)
      }
    }
    setLoadingData(false)
  }, [])

  const handleInputChange = async (input, field, index) => {
    // this.resetErrors();
    if (input && input.length >= 3) {
      const res = await FetchSearchTerminal(input, i18n.language)
      if (res.status == 200 && res.data.result.length) {
        let data = res.data.result.map((item) => {
          return {
            value: item.id,
            values: item,
            label: item.name,
          }
        })

        // data = _.sortBy(data, (item) => item.value);
        if (field === 'from') {
          setOptionsFrom(data)
        } else {
          setOptionsTo(data)
        }
        return data
      }
      return []
    } else if (!input) {
      return options
    }
  }

  const ChangeLocale = () => {
    const local = locale == 'en' ? 'fa' : 'en'
    setLocale(local)

    if (local === 'en') {
      today = convertToMiladi(today)
      setDepartureTime(convertToMiladi(departureTime))
    } else {
      today = convertToJalali(today)
      setDepartureTime(convertToJalali(departureTime))
    }
  }

  const convertToMiladi = (date) => {
    const newDate = moment(
      `${date.year}-${date.month}-${date.day}`,
      'jYYYY-jMM-jDD',
    )
    return {
      day: Number(newDate.format('DD')),
      month: Number(newDate.format('MM')),
      year: Number(newDate.format('YYYY')),
    }
  }

  const convertToJalali = (date) => {
    const newDate = moment(
      `${date.year}-${date.month}-${date.day}`,
      'YYYY-MM-DD',
    )
    return {
      day: Number(newDate.format('jDD')),
      month: Number(newDate.format('jMM')),
      year: Number(newDate.format('jYYYY')),
    }
  }

  const setValueTime = (value) => {
    setDepartureTime(value)
  }

  const setStorage = () => {
    localStorage.setItem(
      'searchBusValues',
      JSON.stringify({ origin, destination, locale, departureTime }),
    )
  }

  const onSubmit = () => {
    let time = []

    if (!origin) {
      openNotification('error', 'bottomRight', 'لطفا مبدا را انتخاب کنید')
      return
    } else if (!destination) {
      openNotification('error', 'bottomRight', 'لطفا مقصد را انتخاب کنید')
      return
    }
    setLoading(true)
    if (locale === 'fa') {
      if (departureTime) {
        const date = `${departureTime.year}-${departureTime.month}-${departureTime.day}`
        time.push(moment(date, 'jYYYY-jMM-jDD').format('YYYY-MM-DD'))
      }
    } else {
      if (departureTime) {
        const date = `${departureTime.year}-${departureTime.month}-${departureTime.day}`
        time.push(moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD'))
      }
    }

    setStorage()
    let url = `/buses?origin=${origin.value}&destination=${destination.value}&departing=${time[0]}`

    setLoadingData(true)
    Router.push(url).then(() => setLoading(false))
  }

  const switchAirport = () => {
    const obj1 = JSON.parse(JSON.stringify(origin))
    const obj2 = JSON.parse(JSON.stringify(destination))
    setOrigin(obj2)
    setDestination(obj1)
  }

  const CustomOption = ({
    children,
    data,
    onSelect,
    innerRef,
    innerProps,
    selectProps,
    ...props
  }) => {
    return (
      <div className={styles.searchBoxCity} ref={innerRef} {...innerProps}>
        <Row
          className={styles.content}
          onClick={() => selectProps.onChange(data.values.code, selectProps.id)}
        >
          <Col flex="50px" align="center" className={styles.icon}>
            {data.values.type === 1 ? <LocationIcon /> : <BusIcon />}
          </Col>
          <Col flex="auto">
            <div>
              {data.values.city.name ? (
                <>
                  {data.values.city.name} - {data.values.name}
                </>
              ) : (
                data.values.name
              )}
            </div>
            <small>
              {data.values.province?.name ||
                data.values.providerName ||
                data.values.name}
            </small>
          </Col>
        </Row>
      </div>
    )
  }

  return (
    <div
      className={`${styles.searchBus} ${
        process.env.THEME_NAME === 'TRAVELO' && styles.searchBusTravelo
      }`}
    >
      <Row gutter={process.env.THEME_NAME === 'TRAVELO' ? [15, 10] : [5, 20]}>
        <Col xs={24} sm={24} md={24} lg={18} xl={18}>
          <Row
            gutter={process.env.THEME_NAME === 'TRAVELO' ? [15, 10] : [5, 20]}
          >
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <div
                className={`${styles.searchBusOrigin} ${
                  process.env.THEME_NAME === 'TRAVELO' &&
                  styles.searchBusOriginTravelo
                }`}
              >
                {/* <input placeholder="جستجوی شهر یا پایانه مبدا" /> */}
                <AsyncSelect
                  isClearable
                  isSearchable
                  name="from"
                  placeholder="مبدا (شهر، پایانه)"
                  styles={SelectStyles}
                  defaultOptions={optionsFrom.length ? optionsFrom : options}
                  loadOptions={(e) => handleInputChange(e, 'from')}
                  onChange={(e) => setOrigin(e)}
                  value={origin}
                  noOptionsMessage={() => null}
                  id="origin"
                  components={{
                    Option: CustomOption,
                  }}
                />
              </div>
            </Col>
            <div
              className="switchAirportsButton switchAirportsButtonBus"
              onClick={() => switchAirport()}
            >
              <SwapVertIcon />
            </div>
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <div
                className={`${styles.searchBusDestination} ${
                  process.env.THEME_NAME === 'TRAVELO' &&
                  styles.searchBusDestinationTravelo
                }`}
              >
                {/* <input placeholder="جستجوی شهر یا پایانه مقصد" /> */}
                <AsyncSelect
                  isClearable
                  isSearchable
                  name="to"
                  placeholder="مقصد (شهر، پایانه)"
                  styles={SelectStyles}
                  defaultOptions={optionsFrom.length ? optionsTo : options}
                  loadOptions={(e) => handleInputChange(e, 'to')}
                  onChange={(e) => setDestination(e)}
                  value={destination}
                  noOptionsMessage={() => null}
                  id="destination"
                  components={{
                    Option: CustomOption,
                  }}
                />
              </div>
            </Col>
          </Row>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={process.env.THEME_NAME === 'TRAVELO' ? 6 : 4}
          xl={process.env.THEME_NAME === 'TRAVELO' ? 6 : 4}
        >
          <div
            className={`${styles.searchBusDepartureDate} ${
              process.env.THEME_NAME === 'TRAVELO' &&
              styles.searchBusDepartureDateTravelo
            }`}
          >
            <DepartureDate
              defaultValue={departureTime}
              setValue={setValueTime}
              label="departureTime"
              today={today}
              // locale={i18n.language === 'fa' ? 'fa' : 'en'}
              locale={locale}
              ChangeLocale={ChangeLocale}
            />
          </div>
        </Col>
        <Col
          lg={process.env.THEME_NAME === 'TRAVELO' ? 24 : 4}
          xl={process.env.THEME_NAME === 'TRAVELO' ? 24 : 4}
          xs={24}
          sm={24}
          md={24}
        >
          <div
            className={`${styles.searchBusBtn} ${
              process.env.THEME_NAME === 'TRAVELO' && styles.searchBusBtnTravelo
            }`}
          >
            <Button
              size="large"
              type="myPrimary"
              htmlType="submit"
              onClick={() => onSubmit()}
            >
              {loading ? (
                <>
                  <SearchOutlined />
                  جستجوی اتوبوس...
                </>
              ) : (
                <>
                  <SearchOutlined />
                  {t('search')}
                </>
              )}
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}

SearchBus.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

SearchBus.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(SearchBus)
