import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Row, Col, Tag, notification } from "antd";
import maxBy from "lodash/maxBy";
import { Link, i18n, withTranslation, Router } from "../../../../i18n";
import moment from "moment-jalaali";
import AsyncSelect from "react-select/async";
import { components } from "react-select";
import { SearchOutlined } from "@ant-design/icons";
import { MinusSquareFilled, CloseOutlined } from "@ant-design/icons";
import {
  SwapVertIcon,
  FlightIcon,
  LocationIcon,
  PlusIcon,
} from "../../UI/Icons";
import FromCalender from "./FromCalender";
import ToCalender from "./ToCalender";
import TypeSelect from "./TypeSelect";
import PaxSelect from "./PaxSelect";
import styles from "../../../styles/Home.module.css";

import { GetAirports } from "../../../actions/flight/Flight";
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
let today, initialTimeFrom, initialTimeTo, multiPathDate;
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

multiPathDate = today;
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
          {data.values.type === 1 ? <LocationIcon /> : <FlightIcon />}
        </Col>
        <Col flex="auto">
          <div>{data.values.name}</div>
          <div>
            {data.values.type === 1 ? "همه فرودگاه ها" : data.values.parentName}
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
class SearchFlightForeign extends React.Component {
  state = {
    locale: "fa",
    loadingData: true,
    showing: false,
    loading: false,
    way: "oneWay",
    optionsFrom: [],
    optionsTo: [],
    options: [
      {
        value: "THR",
        label: "فرودگاه امام خمینی",
        values: {
          name: "فرودگاه امام خمینی",
          city: {
            name: "تهران",
            code: "THR",
          },
          country: {
            name: "ایران",
            code: "IR",
          },
          code: "IKA",
          latitude: "35.416099548",
          longitude: "51.152198790",
          airportType: "Subsidiary",
        },
      },
      {
        value: "IST",
        label: "استانبول",
        values: {
          name: "استانبول",
          city: {
            name: null,
            code: null,
          },
          country: {
            name: "ترکیه",
            code: "TR",
          },
          code: "IST",
          latitude: "40.898601532000001",
          longitude: "29.309200286900001",
          airportType: "City",
        },
      },
      {
        value: "DWC",
        label: "دبی",
        values: {
          name: "دبي",
          city: {
            name: null,
            code: null,
          },
          country: {
            name: "امارات متحدهٔ عربی",
            code: "AE",
          },
          code: "DXB",
          latitude: "24.896356000000001",
          longitude: "55.161389",
          airportType: "City",
        },
      },
      {
        value: "TBS",
        label: "فرودگاه تفلیس",
        values: {
          name: "فرودگاه تفلیس",
          city: {
            name: "تفليس",
            code: "TBS",
          },
          country: {
            name: "گرجستان",
            code: "GE",
          },
          code: "TBS",
          latitude: "41.6692008972",
          longitude: "44.954700469999999",
          airportType: "Main",
        },
      },
      {
        value: "KUL",
        label: "کوالالامپور",
        values: {
          name: "کوالالامپور",
          city: {
            name: null,
            code: null,
          },
          country: {
            name: "مالزی",
            code: "MY",
          },
          code: "KUL",
          latitude: "3.1305799484252899",
          longitude: "101.54900360107401",
          airportType: "City",
        },
      },
      {
        value: "BKK",
        label: "تایلند",
        values: {
          name: "بانکوک",
          city: {
            name: null,
            code: null,
          },
          country: {
            name: "تایلند",
            code: "TH",
          },
          code: "BKK",
          latitude: "13.912599563600001",
          longitude: "100.60700225799999",
          airportType: "City",
        },
      },
      {
        value: "PAR",
        label: "پاريس",
        values: {
          name: "پاريس",
          city: {
            name: null,
            code: null,
          },
          country: {
            name: "فرانسه",
            code: "FR",
          },
          code: "PAR",
          latitude: "49.012798309300003",
          longitude: "2.5499999523199999",
          airportType: "City",
        },
      },
      {
        value: "FRA",
        label: "فرودگاه فرانکفورت",
        values: {
          name: "فرودگاه فرانکفورت",
          city: {
            name: "فرانکفورت",
            code: "FRA",
          },
          country: {
            name: "آلمان",
            code: "DE",
          },
          code: "FRA",
          latitude: "50.033333300000002",
          longitude: "8.5705556000000005",
          airportType: "Main",
        },
      },
    ],
    multiPath: [
      {
        origin: "",
        destination: "",
        departureTime: null,
      },
      {
        origin: "",
        destination: "",
        departureTime: null,
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
    let values = localStorage.getItem("searchFlightForeignValues");
    if (values) {
      if (location.search) this.setState({ loadingData: true });
      values = JSON.parse(values);
      // if(!values.locale){
      values.locale = values.departureTime.year > 2020 ? "en" : "fa";
      // }
      this.setState({ optionFrom: values.optionsFrom });
      this.setState({ optionTo: values.optionsTo });
      this.setState({ origin: values.origin });
      this.setState({ destination: values.destination });
      this.setState({ persons: values.persons });
      this.setState({ way: values.way });
      this.setState({ allowFocus: false });
      this.setState({ locale: values.locale });

      const formatDate =
        values.locale === "fa" ? "jYYYY-jMM-jDD" : "YYYY-MM-DD";

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

      if (values.locale === "en") {
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
        multiPathDate = values.departureTime;
      }
    }
    this.setState({ loadingData: false });
  };

  componentDidUpdate(prevProps) {
    if (this.props.t !== prevProps.t) {
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
      this.setState({
        departureTime: initialTimeFrom,
        returningTime: initialTimeTo,
      });
    }
  }

  addFlight = () => {
    this.state.multiPath.push({
      origin: "",
      destination: "",
      departureTime: null,
    });
  };

  handleInputChange = async (input, field, index) => {
    // this.resetErrors();
    if (input && input.length >= 3) {
      const res = await GetAirports(input, i18n.language);
      if (res.status == 200 && res.data.result.length) {
        let data = res.data.result.map((item) => {
          return {
            value: item.code,
            values: item,
            label: item.name,
          };
        });

        // data = _.sortBy(data, (item) => item.values.airportType);
        if (field === "multi_from") {
          this.state.multiPath[index].origin = data;
        } else if (field === "multi_to") {
          this.state.multiPath[index].destination = data;
        } else if (field === "from") {
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
  setValueMultiPath = (val, label, index) => {
    this.state.multiPath[index][label] = val;
  };

  setTomorrowDepartureTime = (departureTime) => {
    const { returningTime } = this.state;
    const formatDate =
      this.state.locale === "fa" ? "jYYYY-jMM-jDD" : "YYYY-MM-DD";

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

      const initialTomorrowDate =
        this.state.locale === "fa"
          ? {
              day: Number(tomorrowDate.format("jDD")),
              month: Number(tomorrowDate.format("jMM")),
              year: Number(tomorrowDate.format("jYYYY")),
            }
          : {
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
      locale,
    } = this.state;
    let time = [];

    if (!origin) {
      openNotification("error", "bottomRight", "لطفا مبدا را انتخاب کنید");
      return;
    } else if (!destination) {
      openNotification("error", "bottomRight", "لطفا مقصد را انتخاب کنید");
      return;
    }
    if (locale === "fa") {
      if (departureTime) {
        const date = `${departureTime.year}-${departureTime.month}-${departureTime.day}`;
        time.push(moment(date, "jYYYY-jMM-jDD").format("YYYY-MM-DD"));
      }
      if (returningTime) {
        const date = `${returningTime.year}-${returningTime.month}-${returningTime.day}`;
        time.push(moment(date, "jYYYY-jMM-jDD").format("YYYY-MM-DD"));
      }
    } else {
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
    let path = "";
    let dates = "";
    if (this.state.way === "severalRoutes") {
      const paths = this.state.multiPath;

      for (let i = 0; i < paths.length; i++) {
        if (paths[i].origin && paths[i].origin && paths[i].departureTime) {
          if (path) path += "-";
          path += `${paths[i].origin.value}-${paths[i].destination.value}`;
          if (locale === "fa") {
            const date = `${paths[i].departureTime.year}-${paths[i].departureTime.month}-${paths[i].departureTime.day}`;
            dates = `${dates}&departing=${moment(date, "jYYYY-jMM-jDD").format(
              "YYYY-MM-DD"
            )}`;
          } else {
            const date = `${paths[i].departureTime.year}-${paths[i].departureTime.month}-${paths[i].departureTime.day}`;
            dates = `${dates}&departing=${moment(date, "YYYY-MM-DD").format(
              "YYYY-MM-DD"
            )}`;
          }
        }
      }
    }
    let url = "";
    if (this.state.way === "severalRoutes") {
      url = `/flights-foreign/${path}?adult=${persons.adult}&child=${persons.child}&infant=${persons.infant}&step=results${dates}`;
    } else {
      url = `/flights-foreign/${origin.value}-${destination.value}${path}?adult=${persons.adult}&child=${persons.child}&infant=${persons.infant}&step=results&departing=${time[0]}${dates}`;
    }
    if (way === "roundTrip" && time[1]) {
      url = url + `&returning=${time[1]}`;
    }
    if (flightType) {
      url = url + `&flightType=${flightType}`;
    }
    this.setState({ loading: true });
    Router.push(url).then();
  };

  removePath = (index) => {
    // this.setState({ loadingPath: true });
    const result = [...this.state.multiPath];
    result.splice(index, 1);
    this.setState({ multiPath: [...result] });
    // setTimeout(() => {
    // this.setState({ loadingPath: false });
    // }, 100);
  };

  setStorage = () => {
    localStorage.setItem(
      "searchFlightForeignValues",
      JSON.stringify(this.state)
    );
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
        {process.env.THEME_NAME === "TAJAWAL" && showing ? (
          <div
            className={styles.bgShadowFixed}
            onClick={() => this.setState({ showing: false })}
          ></div>
        ) : null}

        {!this.state.loadingData ? (
          <div
            className={`${styles.flightSearch} ${
              process.env.THEME_NAME === "TRAVELO" && styles.flightSearchTravelo
            }`}
            onClick={() => this.setState({ showing: true })}
          >
            {process.env.THEME_NAME === "TRAVELO" && (
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
                      <div
                        className={`${styles.roundTripButton} ${
                          this.state.way === "severalRoutes"
                            ? styles.active
                            : ""
                        }`}
                        onClick={() => this.setValue("severalRoutes", "way")}
                      >
                        {t("several-routes")}
                      </div>
                    </div>
                  </Col>
                  <Col xs={16} sm={10} md={8} lg={5} xl={5}>
                    <div
                      className={`${styles.selectTypePax} ${
                        process.env.THEME_NAME === "TRAVELO" &&
                        "select-type-pax-travelo"
                      }`}
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
                {this.state.way != "severalRoutes" ? (
                  <Row gutter={[10, 10]}>
                    <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                      <div
                        className={`${styles.inputSearchFlight} ${
                          process.env.THEME_NAME === "TRAVELO" &&
                          "input-search-flight-travelo"
                        }`}
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
                                loadOptions={(e) =>
                                  this.handleInputChange(e, "from")
                                }
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
                                loadOptions={(e) =>
                                  this.handleInputChange(e, "to")
                                }
                                onChange={(e) =>
                                  this.setValue(e, "destination")
                                }
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
                      <Row gutter={[10, 0]}>
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
                            name="returningTime"
                            // locale={i18n.language === 'fa' ? 'fa' : 'en'}
                            ChangeLocale={this.ChangeLocale}
                            locale={this.state.locale}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                ) : null}
              </>
            )}

            {process.env.THEME_NAME === "TAJAWAL" && (
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
                    <div
                      className={`${styles.roundTripButton} ${
                        this.state.way === "severalRoutes" ? styles.active : ""
                      }`}
                      onClick={() => this.setValue("severalRoutes", "way")}
                    >
                      {t("several-routes")}
                    </div>
                  </div>
                </Row>
                <Row>
                  <Col xs={24} sm={24} md={24} lg={20} xl={20}>
                    <Row>
                      <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                        <div
                          className={`${styles.inputSearchFlight} ${
                            process.env.THEME_NAME === "TRAVELO" &&
                            "input-search-flight-foregin-travelo"
                          }`}
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
                              loadOptions={(e) =>
                                this.handleInputChange(e, "from")
                              }
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
                              loadOptions={(e) =>
                                this.handleInputChange(e, "to")
                              }
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
                          name="returningTime"
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
                          className={`${styles.selectTypePax} ${
                            process.env.THEME_NAME === "TRAVELO" &&
                            styles.selectTypePaxTravelo
                          }`}
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
                          className={`btnFlightSearch ${
                            process.env.THEME_NAME === "TRAVELO" &&
                            "btnFlightSearch-foreign-travelo"
                          }`}
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
              </>
            )}

            {this.state.way === "severalRoutes" ? (
              <>
                {!this.state.loadingPath &&
                  this.state.multiPath.map((path, index) => (
                    <div key={index}>
                      <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                          <div className={styles.headFlightMultiWay}>
                            <span>
                              <FlightIcon /> پرواز {index + 1}
                            </span>
                            {index > 1 ? (
                              <Button
                                type="link"
                                className={styles.removePath}
                                onClick={() => this.removePath(index)}
                              >
                                Remove
                              </Button>
                            ) : null}
                          </div>
                        </Col>
                      </Row>
                      <Row gutter={[10, 10]}>
                        <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                          <div
                            className={`${styles.inputSearchFlight} ${
                              process.env.THEME_NAME === "TRAVELO" &&
                              "input-search-flight-travelo"
                            }`}
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
                                    name="multi_from"
                                    defaultOptions={
                                      this.state.optionsFrom.length
                                        ? this.state.optionsFrom
                                        : this.state.options
                                    }
                                    placeholder={t("flight-departure")}
                                    loadOptions={(e) =>
                                      this.handleInputChange(
                                        e,
                                        "multi_from",
                                        index
                                      )
                                    }
                                    onChange={(e) =>
                                      this.setValueMultiPath(e, `origin`, index)
                                    }
                                    value={path.origin}
                                    components={{
                                      Option: CustomOption,
                                    }}
                                    noOptionsMessage={() => null}
                                    id={`origin${index}`}
                                  />
                                </div>
                              </Col>
                              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <div className={styles.ConttentToFlight}>
                                  <AsyncSelect
                                    isClearable
                                    isSearchable
                                    styles={SelectToStyles}
                                    name={`to${index}`}
                                    defaultOptions={
                                      this.state.optionsTo.length
                                        ? this.state.optionsTo
                                        : this.state.options
                                    }
                                    placeholder={t("flight-arrival")}
                                    loadOptions={(e) =>
                                      this.handleInputChange(
                                        e,
                                        "multi_to",
                                        index
                                      )
                                    }
                                    onChange={(e) =>
                                      this.setValueMultiPath(
                                        e,
                                        `destination`,
                                        index
                                      )
                                    }
                                    value={path.destination}
                                    id={`destination${index}`}
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
                          <Row gutter={[10, 0]}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                              {!this.state.loadingPath && (
                                <FromCalender
                                  setValue={this.setValueMultiPath}
                                  defaultValue={
                                    this.state.multiPath[index].departureTime
                                  }
                                  label="departureTime"
                                  today={
                                    index === 0
                                      ? this.state.departureTime
                                      : this.state.multiPath[index]
                                          .departureTime ||
                                        this.state.departureTime
                                  }
                                  locale={this.state.locale}
                                  ChangeLocale={this.ChangeLocale}
                                  index={index}
                                />
                              )}
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  ))}
                {this.state.multiPath.length < 5 ? (
                  <Row>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      <div
                        className={styles.addFlightMultiWay}
                        onClick={() => this.addFlight()}
                      >
                        <PlusIcon />
                        <span>اضافه کردن پرواز</span>
                      </div>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}
              </>
            ) : null}

            {process.env.THEME_NAME === "TRAVELO" && (
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <div
                  className={`btnFlightSearch ${
                    process.env.THEME_NAME === "TRAVELO" &&
                    "btnFlightSearch-travelo"
                  }`}
                >
                  <Button
                    size="large"
                    type="myPrimary"
                    htmlType="submit"
                    onClick={this.onSubmit}
                  >
                    {this.state.loading ? (
                      <>{t("searching")}</>
                    ) : (
                      <>{t("search")}</>
                    )}
                  </Button>
                </div>
              </Col>
            )}
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

SearchFlightForeign.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

SearchFlightForeign.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProp = (state) => {
  return {
    minMaxPrices: state.minMaxPrices,
  };
};

export default withTranslation("common")(
  connect(mapStateToProp, null)(SearchFlightForeign)
);
