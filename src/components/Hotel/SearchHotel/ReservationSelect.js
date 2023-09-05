import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation, Link, i18n } from '../../../../i18n'
import { Select } from 'antd'

import styles from '../../../styles/Home.module.css'

const { Option } = Select

class ReservationSelect extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedValue: 'one',
    }
  }

  componentDidMount = () => {
    if (this.props.onChangeCallback) {
      if (this.props.defaultRooms) {
        if (
          this.props.defaultRooms.length > 1 ||
          this.props.defaultRooms[0].childrenAges.length > 0 ||
          this.props.defaultRooms[0].adultNo > 2
        ) {
          this.setState({ selectedValue: 'more' })
          return this.props.onChangeCallback('more')
        } else if (this.props.defaultRooms[0].adultNo === 1) {
          this.setState({ selectedValue: 'one' })
          return this.props.onChangeCallback('one')
        } else if (this.props.defaultRooms[0].adultNo === 2) {
          this.setState({ selectedValue: 'two' })
          return this.props.onChangeCallback('two')
        }
      } else {
        this.setState({ selectedValue: 'one' })
        return this.props.onChangeCallback('one')
      }
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.defaultRooms !== this.props.defaultRooms) {
      if (this.props.defaultRooms) {
        if (
          this.props.defaultRooms.length > 1 ||
          this.props.defaultRooms[0].childrenAges.length > 0 ||
          this.props.defaultRooms[0].adultNo > 2
        ) {
          this.setState({ selectedValue: 'more' })
          return this.props.onChangeCallback('more')
        } else if (this.props.defaultRooms[0].adultNo === 1) {
          this.setState({ selectedValue: 'one' })
          return this.props.onChangeCallback('one')
        } else if (this.props.defaultRooms[0].adultNo === 2) {
          this.setState({ selectedValue: 'two' })
          return this.props.onChangeCallback('two')
        }
      } else {
        this.setState({ selectedValue: 'one' })
        return this.props.onChangeCallback('one')
      }
    }
  }

  onChange = item =>{
      this.setState({selectedValue:item});
      if(this.props.onChangeCallback)
          return this.props.onChangeCallback(item);
  };

  render() {
    const { t } = this.props
    return (
      <div
        className={`${
          process.env.THEME_NAME === 'TRAVELO'
            ? 'select-holder-with-inner-label relative margin-top-10-mobile'
            : 'margin-top-10-mobile'
        }`}
      >
        {process.env.THEME_NAME === 'TRAVELO' && (
          <label className="inner-label">{t('GuestsAndRooms')}</label>
        )}
        <Select
          popupClassName={i18n.language === 'us' ? 'ltr' : 'rtl'}
          defaultValue="one"
          style={{ width: '100%', height: '46px', 'border-radius': '4px' }}
          className={`${styles.reservationSelect} ${
            process.env.THEME_NAME === 'TRAVELO' && 'reservation-select-travelo'
          }`}
          size="large"
          onChange={this.onChange}
          value={this.state.selectedValue}
        >
          <Option value="one">{t('1room-1adult')}</Option>
          <Option value="two">{t('1room-2adult')}</Option>
          <Option value="more">{t('more-options')}</Option>
        </Select>
      </div>
    )
  }
}

ReservationSelect.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

ReservationSelect.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(ReservationSelect)
