import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Row, Col, Tag, notification } from "antd";
import _ from "lodash";
import { Link, i18n, withTranslation, Router } from "../../../../i18n";
import moment from "moment-jalaali";
import AsyncSelect from "react-select/async";
import { components } from "react-select";
import { SearchOutlined } from "@ant-design/icons";
import { MinusSquareFilled } from "@ant-design/icons";
import { SwapVertIcon, FlightIcon, LocationIcon } from "../../UI/Icons";

import FromCalender from "./FromCalender";
import ToCalender from "./ToCalender";
import TypeSelect from "./TypeSelect";
import PaxSelect from "./PaxSelect";
import styles from "../../../styles/Home.module.css";

import { setFlightsSearchForm } from "./../../../actions";
moment.loadPersian({ dialect: "persian-modern" });

const openNotification = (type, placement, msg) => {
  notification[type]({
    message: msg,
    description: "",
    placement,
    style: {
      color: "#fff",
      background: "rgba(0,0,0,0.8)",
    },
  });
};

const SelectFromStyles = {
  control: (provided, state) => ({
    ...provided,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: 5,
    marginBottom: 1,
    marginLeft: 5,
    paddingRight: 10,
  }),
};

const SelectToStyles = {
  control: (provided, state) => ({
    ...provided,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    padding: 5,
    marginLeft: 5,
    paddingRight: 10,
  }),
};

const Time = moment();
const Time1 = moment().add(0, "day");
const Time2 = moment().add(1, "day");
let today,initialTimeFrom,initialTimeTo;
// if(i18n.language === 'fa'){
today = {
  day: Number(Time.format("jDD")),
  month: Number(Time.format("jMM")),
  year: Number(Time.format("jYYYY")),
};
initialTimeFrom = {
  day: Number(Time1.format("jDD")),
  month: Number(Time1.format("jMM")),
  year: Number(Time1.format("jYYYY")),
};
initialTimeTo = {
  day: Number(Time2.format("jDD")),
  month: Number(Time2.format("jMM")),
  year: Number(Time2.format("jYYYY")),
};
// }else{
//   today = {
//     day: Number(Time.format("DD")),
//     month: Number(Time.format("MM")),
//     year: Number(Time.format("YYYY")),
//   };
//   initialTimeFrom = {
//     day: Number(Time1.format("DD")),
//     month: Number(Time1.format("MM")),
//     year: Number(Time1.format("YYYY")),
//   };
//   initialTimeTo = {
//     day: Number(Time2.format("DD")),
//     month: Number(Time2.format("MM")),
//     year: Number(Time2.format("YYYY")),
//   };
// }

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
          {data.values.airportType === "City" ? (
            <LocationIcon />
          ) : (
            <FlightIcon />
          )}
        </Col>
        <Col flex="auto">
          <div>
            {data.values.city.name ? data.values.city.name : data.values.name}
          </div>
          <div>
            {data.values.airportType === "City"
              ? "همه فرودگاه ها"
              : data.values.name}
          </div>
        </Col>
        <Col flex="50px" className={styles.tagBox}>
          <Tag className={styles.tag}>{data.values.code}</Tag>
        </Col>
        {/* <components.Control {...props} /> */}
      </Row>
    </div>
  );
};
// const location = window.location.search;
class SearchFlight extends React.Component {
  state = {
    locale: 'fa',
    loadingData: true,
    showing: false,
    loading: false,
    way: "oneWay",
    optionsFrom: [],
    optionsTo: [],
    options: [
      {
        value: "THR",
        label: "تهران",
        values: {
          name: "تهران",
          city: {
            name: null,
            code: null,
          },
          country: {
            name: "ایران",
            code: "IR",
          },
          code: "THR",
          airportType: "City",
        },
      },
      {
        value: "AWZ",
        label: "اهواز",
        values: {
          name: "فرودگاه اهواز",
          city: {
            name: "اهواز",
            code: "AWZ",
          },
          country: {
            name: "ایران",
            code: "IR",
          },
          code: "AWZ",
          airportType: "Main",
        },
      },
      {
        value: "SYZ",
        label: "شیراز",
        values: {
          name: "فرودگاه شهید دستغیب شیراز",
          city: {
            name: "شيراز",
            code: "SYZ",
          },
          country: {
            name: "ایران",
            code: "IR",
          },
          code: "SYZ",
          airportType: "Main",
        },
      },
      {
        value: "MHD",
        label: "مشهد",
        values: {
          name: "فرودگاه شهید هاشمی نژاد مشهد",
          city: {
            name: "مشهد",
            code: "MHD",
          },
          country: {
            name: "ایران",
            code: "IR",
          },
          code: "MHD",
          airportType: "Main",
        },
      },
      {
        value: "BND",
        label: "بندرعباس",
        values: {
          name: "فرودگاه بندرعباس",
          city: {
            name: "بندرعباس",
            code: "BND",
          },
          country: {
            name: "ایران",
            code: "IR",
          },
          code: "BND",
          airportType: "Main",
        },
      },
      {
        value: "IFN",
        label: "اصفهان",
        values: {
          name: "فرودگاه شهید بهشتی اصفهان",
          city: {
            name: "اصفهان",
            code: "IFN",
          },
          country: {
            name: "ایران",
            code: "IR",
          },
          code: "IFN",
          airportType: "Main",
        },
      },
      {
        value: "TBZ",
        label: "تبریز",
        values: {
          name: "فرودگاه شهید مدنی تبریز",
          city: {
            name: "تبريز",
            code: "TBZ",
          },
          country: {
            name: "ایران",
            code: "IR",
          },
          code: "TBZ",
          latitude: "38.133899688720703",
          longitude: "46.235000610351499",
          airportType: "Main",
        },
      },
      {
        value: "KIH",
        label: "کیش",
        values: {
          name: "فرودگاه خلیج فارس کیش",
          city: {
            name: "کيش",
            code: "KIH",
          },
          country: {
            name: "ایران",
            code: "IR",
          },
          code: "KIH",
          airportType: "Main",
        },
      },
    ],
    origin: "",
    destination: "",
    departureTime: JSON.parse(JSON.stringify(initialTimeFrom)),
    returningTime: JSON.parse(JSON.stringify(initialTimeTo)),
    tomorrowDepartureTime: JSON.parse(JSON.stringify(initialTimeTo)),
    flightType: "",
    persons: {
      adult: 1,
      child: 0,
      infant: 0,
    },
    destinationError: "",
    originError: "",
    allowFocus: true,
  };

  componentDidMount = () => {
    let values = localStorage.getItem("searchFlightValues");
    if (values) {
      if (location.search) this.setState({ loadingData: true });
      values = JSON.parse(values);
      // if(!values.locale){
        values.locale= values.departureTime.year > 2020 ? 'en': 'fa';
      // }
      this.setState({ optionFrom: values.optionsFrom });
      this.setState({ optionTo: values.optionsTo });
      this.setState({ origin: values.origin });
      this.setState({ destination: values.destination });
      this.setState({ persons: values.persons });
      this.setState({ way: values.way });
      this.setState({ allowFocus: false });
      this.setState({locale: values.locale});
     
      const formatDate = values.locale === "fa" ? "jYYYY-jMM-jDD" : "YYYY-MM-DD"

      const departureTime = new Date(
        moment(
          `${values.departureTime.year}-${values.departureTime.month}-${values.departureTime.day}`,
          formatDate
        )
      ).getTime();
      const todayTime = new Date(
        moment(
          `${initialTimeFrom.year}-${initialTimeFrom.month}-${initialTimeFrom.day}`,
          "jYYYY-jMM-jDD"
        )
      ).getTime();

      if(values.locale === 'en'){
        today = {
          day: Number(Time.format("DD")),
          month: Number(Time.format("MM")),
          year: Number(Time.format("YYYY")),
        };
      }


      if (departureTime >= todayTime) {
        this.setState({ departureTime: values.departureTime });
        this.setState({ returningTime: values.returningTime });
        this.setState({ tomorrowDepartureTime: values.tomorrowDepartureTime });
      }
    }
    this.setState({ loadingData: false });
  };

  componentDidUpdate(prevProps) {
    if (this.props.t !== prevProps.t) {
      // if(i18n.language === 'fa'){
      today = {
        day: Number(Time.format("jDD")),
        month: Number(Time.format("jMM")),
        year: Number(Time.format("jYYYY")),
      };
      initialTimeFrom = {
        day: Number(Time1.format("jDD")),
        month: Number(Time1.format("jMM")),
        year: Number(Time1.format("jYYYY")),
      };
      initialTimeTo = {
        day: Number(Time2.format("jDD")),
        month: Number(Time2.format("jMM")),
        year: Number(Time2.format("jYYYY")),
      };
      // }else{
      //   today = {
      //     day: Number(Time.format("DD")),
      //     month: Number(Time.format("MM")),
      //     year: Number(Time.format("YYYY")),
      //   };
      //   initialTimeFrom = {
      //     day: Number(Time1.format("DD")),
      //     month: Number(Time1.format("MM")),
      //     year: Number(Time1.format("YYYY")),
      //   };
      //   initialTimeTo = {
      //     day: Number(Time2.format("DD")),
      //     month: Number(Time2.format("MM")),
      //     year: Number(Time2.format("YYYY")),
      //   };
      // }
      this.setState({
        departureTime: initialTimeFrom,
        returningTime: initialTimeTo,
      });
    }
  }

  handleInputChange = async (input, field) => {
    // this.resetErrors();
    if (input && input.length >= 3) {
      const res = await setFlightsSearchForm(input, i18n.language);
      if (res.status == 200 && res.data.result.length) {
        let data = res.data.result.map((item) => {
          return {
            value: item.city.code,
            values: item,
            label: `${item.city.name ? item.city.name + " - " : ""}${
              item.name
            }`,
          };
        });
        data = _.sortBy(data, (item) => item.values.airportType);
        if (field === "from") {
          this.setState({ optionsFrom: data });
        } else {
          this.setState({ optionsTo: data });
        }
        return data;
      }
      return [];
    } else if (!input) {
      return this.state.options;
    }
  };

  setValue = (val, label) => {
    this.state[label] = val;
    if (label == "departureTime") {
      this.setTomorrowDepartureTime(val);
    }
  };

  setTomorrowDepartureTime = (departureTime) => {
    const { returningTime } = this.state;
    const formatDate = this.state.locale === "fa" ? "jYYYY-jMM-jDD" : "YYYY-MM-DD"


    this.setState({ tomorrowDepartureTime: this.state.departureTime });
    const departureTime_getTime = new Date(
      moment(
        `${departureTime.year}-${departureTime.month}-${departureTime.day}`,
        formatDate
      )
    ).getTime();
    const returningTime_getTime = new Date(
      moment(
        `${returningTime.year}-${returningTime.month}-${returningTime.day}`,
        formatDate
      )
    ).getTime();

    if (departureTime_getTime > returningTime_getTime) {
      const tomorrowDate = moment(
        `${departureTime.year}-${departureTime.month}-${departureTime.day}`,
        formatDate
      ).add(1, "day");

      const initialTomorrowDate =this.state.locale === 'fa' ? 
      {
          day: Number(tomorrowDate.format("jDD")),
          month: Number(tomorrowDate.format("jMM")),
          year: Number(tomorrowDate.format("jYYYY")),
      }:
      {
          day: Number(tomorrowDate.format("DD")),
          month: Number(tomorrowDate.format("MM")),
          year: Number(tomorrowDate.format("YYYY")),
      };
     
      this.setState({ returningTime: initialTomorrowDate });
    }
    if (this.state.way === "roundTrip") {
      const el = document.getElementById("toCalender");
      if (el && this.state.allowFocus) {
        // not allow focus after get value from localstorage
        el.focus();
      } else {
        this.setState({ allowFocus: true });
      }
    }
  };

  ChangeLocale = () => {
    const locale = this.state.locale == "en" ? "fa" : "en";
    this.setState({ locale: locale });

    if (locale === "en") {
      today = this.convertToMiladi(today);
      this.setState({
        departureTime: this.convertToMiladi(this.state.departureTime),
      });
      this.setState({
        returningTime: this.convertToMiladi(this.state.returningTime),
      });
      this.setState({
        tomorrowDepartureTime: this.convertToMiladi(
          this.state.tomorrowDepartureTime
        ),
      });
    } else {
      today = this.convertToJalali(today);
      this.setState({
        departureTime: this.convertToJalali(this.state.departureTime),
      });
      this.setState({
        returningTime: this.convertToJalali(this.state.returningTime),
      });
      this.setState({
        tomorrowDepartureTime: this.convertToJalali(
          this.state.tomorrowDepartureTime
        ),
      });
    }
  };

  convertToMiladi = (date) => {
    const newDate = moment(
      `${date.year}-${date.month}-${date.day}`,
      "jYYYY-jMM-jDD"
    );
    return {
      day: Number(newDate.format("DD")),
      month: Number(newDate.format("MM")),
      year: Number(newDate.format("YYYY")),
    };
  };

  convertToJalali = (date) => {
    const newDate = moment(
      `${date.year}-${date.month}-${date.day}`,
      "YYYY-MM-DD"
    );
    return {
      day: Number(newDate.format("jDD")),
      month: Number(newDate.format("jMM")),
      year: Number(newDate.format("jYYYY")),
    };
  };

  onSubmit = () => {
    const {
      destination,
      origin,
      persons,
      departureTime,
      returningTime,
      way,
      flightType,
      locale
    } = this.state;
    let time = [];

    if (!origin) {
      openNotification("error", "bottomRight", "لطفا مبدا را انتخاب کنید");
      return;
    } else if (!destination) {
      openNotification("error", "bottomRight", "لطفا مقصد را انتخاب کنید");
      return;
    }
    if(locale === 'fa'){
      if (departureTime) {
        const date = `${departureTime.year}-${departureTime.month}-${departureTime.day}`;
        time.push(moment(date, "jYYYY-jMM-jDD").format("YYYY-MM-DD"));
      }
      if (returningTime) {
        const date = `${returningTime.year}-${returningTime.month}-${returningTime.day}`;
        time.push(moment(date, "jYYYY-jMM-jDD").format("YYYY-MM-DD"));
      }
    }else{
          if (departureTime) {
            const date = `${departureTime.year}-${departureTime.month}-${departureTime.day}`;
            time.push(moment(date, "YYYY-MM-DD").format("YYYY-MM-DD"));
          }
          if (returningTime) {
            const date = `${returningTime.year}-${returningTime.month}-${returningTime.day}`;
            time.push(moment(date, "YYYY-MM-DD").format("YYYY-MM-DD"));
          }
    }

    this.setStorage();
    let url = `/flights/${origin.value}-${destination.value}?adult=${persons.adult}&child=${persons.child}&infant=${persons.infant}&step=results&departing=${time[0]}`;
    if (way === "roundTrip" && time[1]) {
      url = url + `&returning=${time[1]}`;
    }
    if (flightType) {
      url = url + `&flightType=${flightType}`;
    }
    this.setState({ loading: true });
    Router.push(url).then();
  };

  setStorage = () => {
    localStorage.setItem("searchFlightValues", JSON.stringify(this.state));
  };

  switchAirport = () => {
    const obj1 = JSON.parse(JSON.stringify(this.state.origin));
    const obj2 = JSON.parse(JSON.stringify(this.state.destination));
    this.setState({ origin: obj2 });
    this.setState({ destination: obj1 });
  };

  render() {
    const { t } = this.props;
    const { showing } = this.state;
    return (
      <>
        {process.env.THEME_NAME === "TAJAWAL" &&
          showing ? <div
              className={styles.bgShadowFixed}
              onClick={() => this.setState({showing: false})}
          />
          : null}

        {!this.state.loadingData ? (
          <div
            className={`${styles.flightSearch} ${process.env.THEME_NAME === "TRAVELO" && styles.flightSearchTravelo} flight-search-travel `}
            onClick={() => this.setState({ showing: true })}
          >
            {process.env.THEME_NAME === "TRAVELO" &&
              <>
                <Row>
                  <Col xs={24} sm={14} md={16} lg={19} xl={19}>
                    <div className={styles.tabFlightSearch}>
                      <div
                        className={`${styles.oneWayButton} ${
                          this.state.way === "oneWay" ? styles.active : ""
                        }`}
                        onClick={() => this.setValue("oneWay", "way")}
                      >
                        {t("one-way")}
                      </div>
                      <div
                        className={`${styles.roundTripButton} ${
                          this.state.way === "roundTrip" ? styles.active : ""
                        }`}
                        onClick={() => this.setValue("roundTrip", "way")}
                      >
                        {t("round-trip")}
                      </div>
                    </div>
                  </Col>
                  <Col xs={16} sm={10} md={8} lg={5} xl={5}>
                    <div
                      className={`${styles.selectTypePax} ${process.env.THEME_NAME === "TRAVELO" && "select-type-pax-travelo" }`}
                      >
                      <PaxSelect
                        defaultValue={this.state.persons}
                        setValue={this.setValue}
                        label="persons"
                      />
                      <TypeSelect
                        defaultValue={this.state.flightType}
                        setValue={this.setValue}
                        label="flightType"
                      />
                    </div>
                  </Col>
                </Row>
                <Row gutter={[10,10]}>
                  <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                    <div 
                      className={`${styles.inputSearchFlight} ${process.env.THEME_NAME === "TRAVELO" && "input-search-flight-travelo" }`}
                      >
                        <div
                          className="switchAirportsButton"
                          onClick={() => this.switchAirport()}
                        >
                          <SwapVertIcon />
                        </div>
                      <Row>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                          <div className={styles.ContentFromFlight}>
                            <AsyncSelect
                              isClearable
                              isSearchable
                              styles={SelectFromStyles}
                              name="from"
                              defaultOptions={
                                this.state.optionsFrom.length
                                  ? this.state.optionsFrom
                                  : this.state.options
                              }
                              placeholder={t("flight-departure")}
                              loadOptions={(e) => this.handleInputChange(e, "from")}
                              onChange={(e) => this.setValue(e, "origin")}
                              value={this.state.origin}
                              components={{
                                Option: CustomOption,
                              }}
                              noOptionsMessage={() => null}
                              id="origin"
                            />
                          </div>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                          <div className={styles.ConttentToFlight}>
                            <AsyncSelect
                              isClearable
                              isSearchable
                              styles={SelectToStyles}
                              name="to"
                              defaultOptions={
                                this.state.optionsTo.length
                                  ? this.state.optionsTo
                                  : this.state.options
                              }
                              placeholder={t("flight-arrival")}
                              loadOptions={(e) => this.handleInputChange(e, "to")}
                              onChange={(e) => this.setValue(e, "destination")}
                              value={this.state.destination}
                              id="destination"
                              components={{
                                Option: CustomOption,
                              }}
                              noOptionsMessage={() => null}
                            />
                          </div>
                        </Col>
                      </Row>  
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                    <Row gutter={[10,0]}>
                      <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        <FromCalender
                          defaultValue={this.state.departureTime}
                            setValue={this.setValue}
                            label="departureTime"
                            today={today}
                            // locale={i18n.language === 'fa' ? 'fa' : 'en'}
                            locale={this.state.locale}
                            ChangeLocale={this.ChangeLocale}
                          />
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        <ToCalender
                          defaultValue={this.state.returningTime}
                          setValue={this.setValue}
                          label="returningTime"
                          isActive={this.state.way === "roundTrip"}
                          today={this.state.tomorrowDepartureTime}
                          name='returningTime'
                          // locale={i18n.language === 'fa' ? 'fa' : 'en'}
                          ChangeLocale={this.ChangeLocale}
                          locale={this.state.locale}
                        />
                      </Col>
                    </Row>

                    
                    {this.state.way === "roundTrip" ? (
                      <div
                        className={`removeReturnButton ${process.env.THEME_NAME === "TRAVELO" && "removeReturnButtonTravelo"}`}
                        >
                        <MinusSquareFilled
                          onClick={(e) => this.setValue("oneWay", "way")}
                        />
                      </div>
                    ) : (
                      ""
                        )}
                  </Col>

                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div
                      className={`btnFlightSearch ${process.env.THEME_NAME === "TRAVELO" && "btnFlightSearch-travelo" }`}
                      >
                      <Button
                        size="large"
                        type="myPrimary"
                        htmlType="submit"
                        onClick={this.onSubmit}
                      >
                        {this.state.loading ? (
                          <>
                            {t("searching")}
                          </>
                        ) : (
                          <>
                            {t("search")}
                          </>
                        )}
                      </Button>
                    </div>
                  </Col>

                </Row>
              </>}

            {process.env.THEME_NAME === "TAJAWAL" &&
              <>
                <Row>
                  <div className={styles.tabFlightSearch}>
                    <div
                      className={`${styles.oneWayButton} ${
                        this.state.way === "oneWay" ? styles.active : ""
                      }`}
                      onClick={() => this.setValue("oneWay", "way")}
                    >
                      {t("one-way")}
                    </div>
                    <div
                      className={`${styles.roundTripButton} ${
                        this.state.way === "roundTrip" ? styles.active : ""
                      }`}
                      onClick={() => this.setValue("roundTrip", "way")}
                    >
                      {t("round-trip")}
                    </div>
                  </div>
                </Row>
                <Row>
                  <Col xs={24} sm={24} md={24} lg={20} xl={20}>
                    <Row>
                      <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                        <div 
                          className={`${styles.inputSearchFlight} ${process.env.THEME_NAME === "TRAVELO" && "input-search-flight-travelo" }`}
                          >
                          <div
                            className="switchAirportsButton"
                            onClick={() => this.switchAirport()}
                          >
                            <SwapVertIcon />
                          </div>
                          <div className={styles.ContentFromFlight}>
                            <AsyncSelect
                              isClearable
                              isSearchable
                              styles={SelectFromStyles}
                              name="from"
                              defaultOptions={
                                this.state.optionsFrom.length
                                  ? this.state.optionsFrom
                                  : this.state.options
                              }
                              placeholder={t("flight-departure")}
                              loadOptions={(e) => this.handleInputChange(e, "from")}
                              onChange={(e) => this.setValue(e, "origin")}
                              value={this.state.origin}
                              components={{
                                Option: CustomOption,
                              }}
                              noOptionsMessage={() => null}
                              id="origin"
                            />
                          </div>
                          <div className={styles.ConttentToFlight}>
                            <AsyncSelect
                              isClearable
                              isSearchable
                              styles={SelectToStyles}
                              name="to"
                              defaultOptions={
                                this.state.optionsTo.length
                                  ? this.state.optionsTo
                                  : this.state.options
                              }
                              placeholder={t("flight-arrival")}
                              loadOptions={(e) => this.handleInputChange(e, "to")}
                              onChange={(e) => this.setValue(e, "destination")}
                              value={this.state.destination}
                              id="destination"
                              components={{
                                Option: CustomOption,
                              }}
                              noOptionsMessage={() => null}
                            />
                          </div>
                        </div>
                      </Col>
                      <Col xs={24} sm={10} md={6} lg={6} xl={6}>
                        <FromCalender
                          defaultValue={this.state.departureTime}
                          setValue={this.setValue}
                          label="departureTime"
                          today={today}
                          // locale={i18n.language === 'fa' ? 'fa' : 'en'}
                          locale={this.state.locale}
                          ChangeLocale={this.ChangeLocale}
                        />
                        <ToCalender
                          defaultValue={this.state.returningTime}
                          setValue={this.setValue}
                          label="returningTime"
                          isActive={this.state.way === "roundTrip"}
                          today={this.state.tomorrowDepartureTime}
                          name='returningTime'
                          // locale={i18n.language === 'fa' ? 'fa' : 'en'}
                          ChangeLocale={this.ChangeLocale}
                          locale={this.state.locale}
                        />
                        {this.state.way === "roundTrip" ? (
                          <div className="removeReturnButton">
                            <MinusSquareFilled
                              onClick={(e) => this.setValue("oneWay", "way")}
                            />
                          </div>
                        ) : (
                          ""
                        )}
                        {/* <div className={styles.addToCalender}>
                                            <CalendarOutlined />
                                            <span>اضافه کردن تاریخ برگشت</span>
                                        </div> */}
                      </Col>
                      <Col xs={24} sm={14} md={8} lg={8} xl={8}>
                        <div
                          className={`${styles.selectTypePax} ${process.env.THEME_NAME === "TRAVELO" && "select-type-pax-travelo" }`}
                          >
                          <TypeSelect
                            defaultValue={this.state.flightType}
                            setValue={this.setValue}
                            label="flightType"
                          />
                          <PaxSelect
                            defaultValue={this.state.persons}
                            setValue={this.setValue}
                            label="persons"
                          />
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                    <Row>
                      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        {/* <Link as="/flights/THR-AWZ?adult=1&child=1&infant=0&step=results&departing=2020-10-20" href="/flights/THR-AWZ?adult=1&child=1&infant=0&step=results&departing=2020-10-20"> */}
                        {/* <a> */}
                        <div
                          className={`btnFlightSearch ${process.env.THEME_NAME === "TRAVELO" && "btnFlightSearch-travelo" }`}
                          >
                          <Button
                            size="large"
                            type="myPrimary"
                            htmlType="submit"
                            onClick={this.onSubmit}
                          >
                            {this.state.loading ? (
                              <>
                                <SearchOutlined />
                                {t("searching")}
                              </>
                            ) : (
                              <>
                                <SearchOutlined />
                                {t("search")}
                              </>
                            )}
                          </Button>
                        </div>
                        {/* </a> */}
                        {/* </Link> */}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </>}
          </div>
        ) : (
          ""
        )}
        {this.state.originError ? (
          <Alert
            message="Error"
            description={`${this.state.originError} را وارد کنید`}
            type="error"
            showIcon
          />
        ) : (
          ""
        )}
      </>
    );
  }
}

SearchFlight.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

SearchFlight.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProp = (state) => {
  return {
    minMaxPrices: state.minMaxPrices,
  };
};

export default withTranslation("common")(
  connect(mapStateToProp, null)(SearchFlight)
);
