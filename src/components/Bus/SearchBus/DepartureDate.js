import React, { useState, useEffect } from "react";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import moment, { locales } from "moment-jalaali";
import { DateFromIcon } from "../../UI/Icons";

const DepartureDate = (props) => {
  const [selectedDay, setSelectedDay] = useState(props.defaultValue);
  const [id, setId] = useState(Math.floor(Math.random() * 100) + "_input");
  const [locale, setLocale] = useState(props.locale);

  const onChange = (date) => {
    setSelectedDay(date);
    props.setValue(date, props.label, props.index);
  };

  useEffect(() => {
    setSelectedDay(props.defaultValue);
  }, [props.defaultValue]);

  // render regular HTML input element
  const renderCustomInput = ({ ref }) => {
    const time = selectedDay
      ? `${selectedDay.year}-${selectedDay.month}-${selectedDay.day}`
      : null;
    return (
      <div className={`flightDate ${process.env.THEME_NAME === "TRAVELO" && "flightDate-travelo" }`}>
        <DateFromIcon />
        {selectedDay ? (
          <>
            {props.locale === "fa" ? (
              <>
                {process.env.THEME_NAME === "TRAVELO" &&
                  <>
                    <label>تاریخ حرکت</label>
                    <div className="dateFlightTravelo">
                      <span className="dateDayTravelo">{selectedDay.day}</span>
                      <span className="dateMonthTravelo">
                        {moment(time, "jYYYY-jM-jD").locale(props.locale).format("jMMMM")}
                      </span>
                    </div>
                  </>
                }
                {process.env.THEME_NAME === "TAJAWAL" &&
                  <>
                    <span className="dateMonth">
                      {moment(time, "jYYYY-jM-jD")
                        .locale(props.locale)
                        .format("jMMMM")}
                    </span>
                    <span className="dateDay">
                      {selectedDay ? selectedDay.day : ""}
                    </span>
                    <span className="dateDayWeek">
                      {moment(time, "jYYYY-jM-jD")
                        .locale(props.locale)
                        .format("ddd")}
                    </span>
                  </>
                }
              </>
            ) : (
                <>
                  {process.env.THEME_NAME === "TRAVELO" &&
                    <>
                    <label>تاریخ رفت</label>
                    <div className="dateFlightTravelo">
                      <span className="dateDayTravelo">{selectedDay.day}</span>
                      <span className="dateMonthTravelo">
                        {moment(time, "YYYY-M-D").locale(props.locale).format("MMMM")}
                      </span>
                    </div>
                    </>
                  }
                  {process.env.THEME_NAME === "TAJAWAL" &&
                    <>
                    <span className="dateMonth">
                      {moment(time, "YYYY-M-D").locale(props.locale).format("MMMM")}
                    </span>
                    <span className="dateDay">
                      {selectedDay ? selectedDay.day : ""}
                    </span>
                    <span className="dateDayWeek">
                      {moment(time, "YYYY-M-D").locale(props.locale).format("dddd")}
                    </span>
                    </>}
              </>
            )}
          </>
        ) : (
          ""
        )}

        <input
          readOnly
          ref={ref} // necessary
          // placeholder="تاریخ حرکت"
          // value={selectedDay ? `${selectedDay.day}` : ''}
          style={{}}
          className={`my-custom-input-class ${id}`} // a styling class
          name={id}
        />
      </div>
    );
  };

  const ChangeLocale = () => {
    setTimeout(() => {
      props.ChangeLocale();
      const val = locale == "en" ? "fa" : "en";

      setLocale(val);
      reloadItem();
    }, 500);
  };

  const reloadItem = () => {
    let el = document.getElementsByClassName(`${id}`);

    if (el) {
      el = el[0];
      el.blur();
      setTimeout(() => {
        el.focus();
      }, 0.1);
    }
  };

  return (
    <DatePicker
      // inputName={id}
      value={selectedDay}
      onChange={onChange}
      renderInput={renderCustomInput} // render a custom input
      shouldHighlightWeekends
      inputPlaceholder="انتخاب تاریخ پرواز"
      locale={props.locale}
      style={{ color: "000000" }}
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
              cursor: "pointer",
            }}
          >
            {locale == "en" ? "شمسی" : "میلادی"}
          </button>
        </div>
      )}
    />
  );
};

export default DepartureDate;
