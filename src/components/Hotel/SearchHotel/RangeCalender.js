import React from "react";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import moment from "moment-jalaali";

import styles from "../../../styles/Home.module.css";
import ToFarsiDigits from "../../../../helpers/ToFarsiDigits";

class RangeCalender extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      today: this.props.today,
      selectedDate: {
        from: props.fromDate,
        to: props.toDate,
      },
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.fromDate !== this.props.fromDate) {
      const initialTomorrowDate = this.setTomorrowFromDate(nextProps.fromDate);
      this.setState({ today: initialTomorrowDate });
      if (
        nextProps.toDate &&
        (initialTomorrowDate.month > nextProps.toDate.month ||
          (initialTomorrowDate.day > nextProps.toDate.day &&
            initialTomorrowDate.month >= nextProps.toDate.month))
      ) {
        const date = { from: nextProps.fromDate, to: null };
        this.props.onChangeDate(date);
      }
    }
    if (nextProps.fromDate || nextProps.toDate)
      this.setState({
        selectedDate: {
          from: nextProps.fromDate,
          to: nextProps.toDate,
        },
      });
  };

  setTomorrowFromDate = (fromDate) => {
    const tomorrowDate = moment(
      `${fromDate.year}-${fromDate.month}-${fromDate.day}`,
      "jYYYY-jMM-jDD"
    ).add(1, "day");
    const initialTomorrowDate = {
      day: Number(tomorrowDate.format("jDD")),
      month: Number(tomorrowDate.format("jMM")),
      year: Number(tomorrowDate.format("jYYYY")),
    };
    return initialTomorrowDate;
  };

  onChange = (date) => {
    let { selectedDate } = this.state;
    if (!this.props.fromDate || !date.from) {
      selectedDate = date;
    } else {
      selectedDate.to = date.to ? date.to : date.from;
    }
    this.setState({ selectedDate: selectedDate });

    if (this.props.onChangeDate) this.props.onChangeDate(selectedDate);
  };

  render() {
    const { selectedDate, today } = this.state;
    const { wrapperClassname, inputPlaceholder } = this.props;

    return (
      <DatePicker
        inputClassName={`${styles.datePicker} range-date-picker`}
        wrapperClassName={wrapperClassname}
        value={selectedDate}
        onChange={this.onChange}
        inputPlaceholder={inputPlaceholder}
        shouldHighlightWeekends
        locale="fa"
        minimumDate={today}
        inputName="range-date-picker"
        formatInputText={() => {
          if (selectedDate.to)
            return `${selectedDate.to.year
              .toString()
              .toFarsiDigits()}/${selectedDate.to.month
              .toString()
              .toFarsiDigits()}/${selectedDate.to.day
              .toString()
              .toFarsiDigits()}`;
          else return null;
        }}
      />
    );
  }
}

export default RangeCalender;
