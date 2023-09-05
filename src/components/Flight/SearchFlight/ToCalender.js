import React, { useEffect, useState } from 'react'
import DatePicker, { utils } from "@hassanmojab/react-modern-calendar-datepicker"
import moment from 'moment-jalaali';
import { DateToIcon } from '../../UI/Icons'
import styles from '../../../styles/Home.module.css'
import {i18n,withTranslation} from '../../../../i18n';


const ToCalender = (props) => {
  const [selectedDay, setSelectedDay] = useState(props.defaultValue);
  const [isActive, setIsActive] = useState(props.isActive);
  const [locale, setLocale]= useState(props.locale);

  // render regular HTML input element
  const renderCustomInput = ({ ref }) => {
    const time = selectedDay ?`${selectedDay.year}-${selectedDay.month}-${selectedDay.day}`: null;

    useEffect(()=>{
      setIsActive(props.isActive)
    },[props.isActive])

    useEffect(()=>{
      props.setValue(selectedDay, props.label)
    },[selectedDay])

    useEffect(()=>{
      setSelectedDay(props.defaultValue)
    },[props.defaultValue])

      
    return (
      
      <div
        className={`flightDate flightDateTo ${process.env.THEME_NAME === "TRAVELO" && "flightDateTo-travelo" }`}
        >

        <DateToIcon />
        {(props.locale === 'fa') 
        ? 
          <>
            {process.env.THEME_NAME === "TRAVELO" &&
              <>
                <label>تاریخ برگشت</label>
                <div className="dateFlightTravelo">
                  <span className="dateDayTravelo">{selectedDay.day}</span>
                  <span className="dateMonthTravelo">
                    {moment(time, "jYYYY-jM-jD").locale(props.locale).format("jMMMM")}
                  </span>
                </div>
              </>}
            {process.env.THEME_NAME === "TAJAWAL" &&
              <>
                <span className="dateMonth">
                  {moment(time, "jYYYY-jM-jD").locale(props.locale).format("jMMMM")}
                </span>
                <span className="dateDay">{selectedDay.day}</span>
                <span className="dateDayWeek">
                  {moment(time, "jYYYY-jM-jD").locale(props.locale).format("ddd")}
                </span>
              </>}
          </>
        :
          <>
            {process.env.THEME_NAME === "TRAVELO" &&
              <>
                <label>تاریخ برگشت</label>
                <div className="dateFlightTravelo">
                  <span className="dateDayTravelo">{selectedDay.day}</span>
                  <span className="dateMonthTravelo">
                    {moment(time, "YYYY-M-D").locale(props.locale).format("MMMM")}
                  </span>
                </div>
              </>}
            {process.env.THEME_NAME === "TAJAWAL" &&
              <>
                <span className="dateMonth">
                  {moment(time, "YYYY-M-D").locale(props.locale).format("MMMM")}
                </span>
                <span className="dateDay">{selectedDay.day}</span>
                <span className="dateDayWeek">
                  {moment(time, "YYYY-M-D").locale(props.locale).format("dddd")}
                </span>
              </>}
          </>
        }
     
       <input
          readOnly
          ref={ref} // necessary
          // placeholder="تاریخ حرکت"
          // value={selectedDay ? `${selectedDay.day}` : ''}
          style={{}}
          id="toCalender"
          className={`my-custom-input-class ${props.name}`} // a styling class
          name={props.name}
        />
      </div>
    )
  }

  const ChangeLocale = () => {
    setTimeout(() => {
      props.ChangeLocale();
      const val = locale == "en" ? "fa" : "en";

      setLocale(val);
      reloadItem();

    }, 500);
  };

  const reloadItem = () => {
    let el = document.getElementsByClassName(`${props.name}`);

    if (el) {
      el = el[0];
      el.blur();
      setTimeout(() => {
        el.focus();
      }, 0.1);
    }
  };


  const {t} = props;
  return (
    <>
      { props.isActive ?
          <DatePicker
            value={selectedDay}
            onChange={setSelectedDay}
            renderInput={renderCustomInput} // render a custom input
            shouldHighlightWeekends
            inputPlaceholder="انتخاب تاریخ پرواز"
            locale={props.locale}
            style={{ color: '000000' }}
            minimumDate={props.today}
            renderFooter={() => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0px 35px 15px 35px",
                  direction: "rtl",
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    ChangeLocale();
                  }}
                  style={{
                    border: "0px",
                    background: "transparent",
                    cursor: 'pointer'
                  }}
                >
                  {locale == "en" ? "شمسی" : "میلادی"}
                </button>
              </div>
            )}
          />          
        : 
        <div
          className="DatePicker"
          onClick={()=>props.setValue('roundTrip','way')}
          >
          <div
            className={`flightDate flightDateTo ${process.env.THEME_NAME === "TRAVELO" && "flightDateTo-travelo" }`}
            >
            <div className="flightDateToIcon" >
              <DateToIcon />
              <span className="flightDateToText">{t('arrival-date')}</span>
            </div>
          </div>
        </div>
      }
    </>
    );
  };

  ToCalender.getInitialProps = async () => ({
    namespacesRequired: ['common'],
  })

  export default withTranslation('common')(ToCalender);