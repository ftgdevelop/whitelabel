import React from 'react'
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";

import styles from '../../../styles/Home.module.css'

import style from './style.module.css'

class SearchBoxDatePicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedDate: props.selectedDate,
      locale: this.props.locale,
      time: '0.4s',
      id: Math.floor(Math.random() * 100) + '_input',
      defaultValue1: {
        year: 2019,
        month: 10,
        day: 5,
      },
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.selectedDate)
      this.setState({
        selectedDate: nextProps.selectedDate,
      })
  }

  onChange = (date) => {
    this.setState({ selectedDate: date })

    if (this.props.onChangeDate) this.props.onChangeDate(date, this.props.field)
  }

  ChangeLocale = () => {
    setTimeout(() => {
      this.props.ChangeLocale()
      const locale = this.state.locale == 'en' ? 'fa' : 'en'
      this.setState({ locale: locale })
      this.reloadItem()
    }, 500)
  }

  reloadItem = () => {
    let el = document.getElementsByClassName(`${this.state.id}`)
    if (el) {
      el = el[0]
      el.blur()
      setTimeout(() => {
        el.focus()
      }, 0.1)
    }
  }

  render() {
    const { selectedDate, id } = this.state
    const { wrapperClassname, inputPlaceholder, name, field } = this.props

    return (
      <div
        className={`relative has-icon ${
          process.env.THEME_NAME === 'TRAVELO'
            ? 'input-holder-with-inner-label'
            : ''
        }`}
      >
        {process.env.THEME_NAME === 'TRAVELO' && (
          <label className="inner-label">{inputPlaceholder}</label>
        )}
        <DatePicker
          inputName={field}
          slideAnimationDuration={this.state.time}
          inputClassName={`${styles.datePicker}`}
          wrapperClassName={wrapperClassname}
          calendarSelectedDayClassName={style.searchBoxDatePickerSelectedDay}
          value={selectedDate}
          onChange={this.onChange}
          inputPlaceholder={inputPlaceholder}
          shouldHighlightWeekends
          locale={this.props.locale}
          minimumDate={this.props.minimumDate}
          inputName={name ? name : ''}
          calendarPopperPosition="bottom"
          renderFooter={() => (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0px 35px 15px 35px',
                direction: 'rtl',
              }}
            >
              {this.props.ChangeLocale ? (
                <button
                  type="button"
                  onClick={() => {
                    this.ChangeLocale()
                  }}
                  style={{
                    border: '0px',
                    background: 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  {this.state.locale == 'en' ? 'شمسی' : 'میلادی'}
                </button>
              ) : null}
              {/* <button
                          type="button"
                          onClick={(e) => {
                            this.goToday(e)
                          }}
                          style={{
                              border:'0px',
                              background: 'transparent'
                          }}
                        >
                          برو به امروز
                        </button> */}
            </div>
          )}
        />
      </div>
    )
  }
}

export default SearchBoxDatePicker
