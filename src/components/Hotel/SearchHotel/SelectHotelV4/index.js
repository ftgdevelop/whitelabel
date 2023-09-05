import React from 'react'
import { Skeleton } from 'antd'
import PropTypes from 'prop-types'
import {
  RemoveIcon,
  LocationOutlineIcon,
  HotelOutlineIcon,
  ProvinceOutlineIcon,
} from '../../../UI/Icons'
import { withTranslation, Link, i18n } from '../../../../../i18n'
import dynamic from 'next/dynamic'

import style from './style.module.scss'

const Loading = dynamic(() => import('../../../Loading'))

class SelectHotelV4 extends React.Component {
  constructor(props) {
    super(props)

    this.setWrapperRef = this.setWrapperRef.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)

    this.state = {
      tooltipMessage: props.tooltipMessage,
      displayList: false,
      selectedTab: this.props.isForeign ? 1 : 0,
      isDataLoading: props.enableLoading || false,
      data: props.data || [],
      selectedItem: null,
      input: this.props.defaultValue,
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
    this.setState({
      myurl: this.props.pathname,
    })
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  setWrapperRef(node) {
    this.wrapperRef = node
  }

  componentWillReceiveProps = (nextProps) => {
    if (JSON.stringify(nextProps.data) !== JSON.stringify(this.state.data)) {
      this.setState({ data: nextProps.data })
      if (this.props.selectedValueId) {
        this.setSelectedItem(nextProps.data)
      }
    }
    if (nextProps.tooltipMessage !== this.state.tooltipMessage)
      this.setState({ tooltipMessage: nextProps.tooltipMessage })
    if (nextProps.enableLoading !== this.state.isDataLoading)
      this.setState({ isDataLoading: nextProps.enableLoading })
    if (nextProps.defaultValue !== this.props.defaultValue)
      this.setState({ input: nextProps.defaultValue })
  }
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ displayList: false })
    }
  }
  setSelectedItem = (data) => {
    const selectedItem = data && data.result.find(
      (item) => item.id == this.props.selectedValueId
    )
    this.setState({ selectedItem })
  }

  onInputFocus = () => {
    this.resetErrors()
    this.setState({ displayList: true })
    if (this.props.onInputFocusCallback) this.props.onInputFocusCallback()
  }

  onChangeInput = (input) => {
    this.setState({
      input: input,
      selectedItem: null,
    })
    this.input.value = input
    if (this.props.onChangeInputCallback)
      this.props.onChangeInputCallback(input)
  }

  onClearInput = () => {
    this.onChangeInput('')
    if (this.props.onClearInputCallback) this.props.onClearInputCallback()
  }

  onChangeTab = (tabIndex) => {
    this.setState({ selectedTab: tabIndex })
    if (this.props.onChangeTabCallback) this.props.onChangeTabCallback(tabIndex)
  }

  onSelectHotel = (item) => {
    this.setState({
      selectedItem: item,
      input: item ? item.displayName : '',
      displayList: false,
    })
    if (this.props.onSelectITemCallback) this.props.onSelectITemCallback(item)
  }

  resetErrors = () => this.setState({ tooltipMessage: null })

  render() {
    const {
      tooltipMessage,
      selectedTab,
      isDataLoading,
      displayList,
      data,
      selectedItem,
      input,
    } = this.state
    const { t } = this.props

    const TABS = [
      {
        ID: 0,
        LABEL: t('domestic-hotels'),
      },
      {
        ID: 1,
        LABEL: t('foreign-hotels'),
      },
    ]
    return (
      <div ref={this.setWrapperRef} className={style.selectHotel}>
        <div
          className={`${
            process.env.THEME_NAME === 'TRAVELO'
              ? 'input-holder-with-inner-label has-icon'
              : 'has-icon'
          }`}
        >
          {process.env.THEME_NAME === 'TRAVELO' && (
            <label className="inner-label">{t('searchHotelDestination')}</label>
          )}
          <input
            type="text"
            placeholder={t('search-hotel-or-city')}
            className={`full-width form-input hotel-autocomplete-input ${
              process.env.THEME_NAME === 'TRAVELO' &&
              style.selectHotelTraveloInput
            }`}
            onClick={this.onInputFocus}
            onChange={(e) => this.onChangeInput(e.target.value)}
            //value={selectedItem ? selectedItem.SearchValue : input}
            value={
              this.state.myurl === '/hotels-foreign/[...foreignHotelList]'
                ? this.state.input.replace('%20', ' ').replace('%C3%A1', 'á')
                : this.state.input
            }
            ref={(ref) => (this.input = ref)}
          />
          {selectedItem || input ? (
            <button className="clear-input" onClick={this.onClearInput} title="پاک کردن">
              {isDataLoading ? <Loading /> : <RemoveIcon />}
            </button>
          ) : null}
          {tooltipMessage ? (
            <p className={style.selectHotel__tooltipMessage}>
              {tooltipMessage}
            </p>
          ) : null}
        </div>
        {displayList && data && data.result?.length > 0 ? (
          <div className={style.selectHotel__listContainer}>
            {/* <div className={style.selectHotel__tabsContainer}>
                                {
                                    TABS.map(item => (
                                        <button
                                            key={item.ID}
                                            className={`${style.selectHotel__tab} ${selectedTab === item.ID ? " active" : ""}`}
                                            onClick={() => this.onChangeTab(item.ID)}
                                        >
                                            <span>{item.LABEL}</span>
                                        </button>
                                    ))
                                }
                            </div> */}

            <div className={style.selectHotel__tabContent}>
              {isDataLoading ? (
                <div className={style.selectHotel__loading}>
                  {[0, 1, 2, 3, 4, 5].map((item) => (
                    <div
                      key={item}
                      className={style.selectHotel__loading_skeleton}
                    >
                      <Skeleton.Avatar
                        className="margin-end-10"
                        style={{ width: 24, height: 24 }}
                      />
                      <Skeleton.Input style={{ width: 200, height: 24 }} />
                    </div>
                  ))}
                </div>
              ) : (
                <ul className={style.selectHotel__list}>
                  {data && data.result?.length > 0 &&
                    data.result.map((item, index) => (
                      <li
                        key={index}
                        className={style.selectHotel__list_item}
                        onClick={() => this.onSelectHotel(item)}
                      >
                        <div className="hotel-autocomplete-list-item-icon margin-end-5">
                          {item.type === "Hotel" && <HotelOutlineIcon />}
                          {item.type === "City" && <LocationOutlineIcon />}
                          {item.type === "Province" && <ProvinceOutlineIcon />}
                        </div>
                        <div>
                          {/* <di>{ item.EntityTypeId }</di> */}
                          <div className={style.selectHotel__list_item_name}>
                            {item.name}
                          </div>
                          <div className={style.selectHotel__list_item_small}>
                            {item.displayName}
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

SelectHotelV4.defaultProps = {}

SelectHotelV4.propTypes = {
  selectedValueId: PropTypes.string,
  t: PropTypes.func.isRequired,
}

SelectHotelV4.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

// const TABS = [
//     {
//         ID: 0,
//         LABEL: "هتل داخلی"
//     },
//     {
//         ID: 1,
//         LABEL: "هتل خارجی"
//     }
// ];

export default withTranslation('common')(SelectHotelV4)
