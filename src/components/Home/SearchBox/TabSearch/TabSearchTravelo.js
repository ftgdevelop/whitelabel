import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from '../../../../../i18n'
import { Tabs, Spin } from 'antd'
import dynamic from 'next/dynamic'
import { LoadingOutlined } from '@ant-design/icons'

import styles from '../../../../styles/Home.module.css'
import { HotelFillIcon, FlightIcon, CipIcon, BusIcon } from '../../../UI/Icons'

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 32, color: '#0a438b' }} spin />
)

const SearchHotel = dynamic(
  () => import('../../../Hotel/SearchHotel/SearchHotel'),
  {
    loading: () => (
      <div style={{ textAlign: 'center' }}>
        <Spin indicator={loadingIcon} />
      </div>
    ),
  },
)
const DomesticSearchHotel = dynamic(
  () => import('../../../Hotel/SearchHotel/DomesticSearchHotel'),
  {
    loading: () => (
      <div style={{ textAlign: 'center' }}>
        <Spin indicator={loadingIcon} />
      </div>
    ),
  },
)
const SearchFlight = dynamic(
  () => import('../../../Flight/SearchFlight/SearchFlight'),
  {
    loading: () => (
      <div style={{ textAlign: 'center' }}>
        <Spin indicator={loadingIcon} />
      </div>
    ),
  },
)
const SearchCip = dynamic(() => import('../../../Cip/SearchCip/SearchCip'), {
  loading: () => (
    <div style={{ textAlign: 'center' }}>
      <Spin indicator={loadingIcon} />
    </div>
  ),
})
const SearchFlightForeign = dynamic(
  () => import('../../../Flight/SearchFlightForeign/SearchFlightForeign'),
  {
    loading: () => (
      <div style={{ textAlign: 'center' }}>
        <Spin indicator={loadingIcon} />
      </div>
    ),
  },
)
const SearchBus = dynamic(() => import('../../../Bus/SearchBus/SearchBus'), {
  loading: () => (
    <div style={{ textAlign: 'center' }}>
      <Spin indicator={loadingIcon} />
    </div>
  ),
})

const { TabPane } = Tabs

class TabSearch extends React.Component {
  state = { size: 'small' }

  onChange = (e) => {
    this.setState({ size: e.target.value })
  }

  render() {
    const { t } = this.props
    const { size } = this.state
    let items = []
    if (process.env.MODULES.includes('domesticHotel'))
      items.push({
        label: (
          <span>
            <HotelFillIcon />
            {t('domestic-hotels')}
          </span>
        ),
        key: '1',
        children: (
          <div
            className={`${styles.wrapSearchHotel} ${
              process.env.THEME_NAME === 'TRAVELO' &&
              styles.wrapSearchHotelTravelo
            }`}
          >
            {process.env.DomesticHotelV4 ? (
              <DomesticSearchHotel />
            ) : (
              <SearchHotel />
            )}
          </div>
        ),
      })

    if (process.env.MODULES.includes('domesticFlight'))
      items.push({
        key: 2,
        label: (
          <span>
            <FlightIcon />
            {t('domestic-flight')}
          </span>
        ),
        children: <SearchFlight />,
      })
/*
    if (process.env.MODULES.includes('foreignHotel'))
      items.push({
        key: 3,
        label: (
          <span>
            <HotelFillIcon />
            {t('foreign-hotels')}
          </span>
        ),
        children: (
          <div
            className={`${styles.wrapSearchHotel} ${
              process.env.THEME_NAME === 'TRAVELO' &&
              styles.wrapSearchHotelTravelo
            }`}
          >
            <SearchHotel isForeign />
          </div>
        ),
      })
*/
	  /*
    if (process.env.MODULES.includes('foreignFlight'))
      items.push({
        key: 4,
        label: (
          <span>
            <FlightIcon />
            {t('foreign-flight')}
          </span>
        ),
        children: <SearchFlightForeign />,
      })
      */
/*
    if (process.env.MODULES.includes('cip'))
      items.push({
        key: 5,
        label: (
          <span className="cip-icon-travelo">
            <CipIcon />
            {t('cip')}
          </span>
        ),
        children: (
          <div
            className={`${styles.wrapSearchCip} ${
              process.env.THEME_NAME === 'TRAVELO' &&
              styles.wrapSearchCipTravelo
            }`}
          >
            <SearchCip />
          </div>
        ),
      })
*/
    if (process.env.MODULES.includes('bus'))
      items.push({
        key: 6,
        label: (
          <span>
            <BusIcon />
            {t('bus')}
          </span>
        ),
        children: (
          <div className={styles.wrapSearchBusTravelo}>
            <SearchBus />
          </div>
        ),
      })

    return (
      <div className={styles.container}>
        <div className="tabSearchTravelo">
          <Tabs defaultActiveKey="1" size={size} items={items}></Tabs>
        </div>
      </div>
    )
  }
}

TabSearch.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

TabSearch.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(TabSearch)
