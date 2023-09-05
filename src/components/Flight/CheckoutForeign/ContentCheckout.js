import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment-jalaali";
import { i18n, withTranslation, Router } from "../../../../i18n";
import { useRouter } from "next/router";
import { Form, Input, Radio, Row, Col, Select, notification } from "antd";
import PhoneInput from "../../UI/PhoneInput/PhoneInput";
import _ from "lodash";
import {
  ArrowRightIcon,
  SeatIcon,
  PlusOutlineIcon,
  RemoveSimpleIcon,
} from "../../UI/Icons";
import { FetchCountries } from "../../../actions/flight/Flight";
import { LoadingOutlined } from "@ant-design/icons";
import styles from "../../../styles/Flight.module.css";

const { Option } = Select;

const ContentCheckout = (props) => {
  const passengerList = [];

  const { t, flight, dateInfo, countries, form ,userInfo} = props;
  const [passangers, setPassengers] = useState([]);
  const [phoneNumberValue, setPhoneNumberValue] = useState("");
  const [phoneNumberCountry, setPhoneNumberCountry] = useState("");
  const router = useRouter();

  const setPassengersArray = (type, count) => {
    if (count) {
      const passengersArray = [
        ...Array(count).fill({
          type,
          birthDate: {},
          validDate: { birthDate: true, passportExpireDate: true },
          passportExpireDate: {},
        }),
      ];
      setPassengers((prev) => [...prev, ...passengersArray]);
    }
  };

  useEffect(() => {
    if (flight) {
      setPassengersArray("ADT", flight.adultCount);
      setPassengersArray("CHD", flight.childCount);
      setPassengersArray("INF", flight.infantCount);
      props.FetchCountries();
    }
  }, [props.flight]);

  useEffect(()=>{
    if (props.userInfo?.phoneNumber){
      setPhoneNumberValue(props.userInfo.phoneNumber);
    }
  },[]);

  const handleChangeDates = (name, value, index, dateName, field) => {
    const newPersons = JSON.parse(JSON.stringify(passangers));
    newPersons[index][dateName][field] = value;
    const date = `${newPersons[index][dateName].year}-${newPersons[index][dateName].month}-${newPersons[index][dateName].day}`;

    if (
      newPersons[index][dateName].day &&
      newPersons[index][dateName].month &&
      newPersons[index][dateName].year
    ) {
      let datePerson = "";

      datePerson = moment(
        `${newPersons[index][dateName].year}-${newPersons[index][dateName].month}-${newPersons[index][dateName].day}`
      );

      const unixDate = moment(datePerson).unix();
      const type =
        dateName === "passportExpireDate"
          ? "passportExpire"
          : newPersons[index].type;

      if (
        props.dateInfo.rangDate[type][0].unix() <= unixDate &&
        props.dateInfo.rangDate[type][1].unix() > unixDate
      ) {
        newPersons[index].validDate[dateName] = true;
        updateValuesForm(index, dateName, date);
      } else {
        updateValuesForm(index, dateName, undefined);
        newPersons[index].validDate[dateName] = false;
      }
    } else {
      newPersons[index].validDate[dateName] = false;
      updateValuesForm(index, dateName, undefined);
      newPersons[index].validDate[dateName] = true;
    }

    setPassengers(newPersons);
  };

  const updateValuesForm = (index, dateName, value) => {
    const fields = form.getFieldsValue();
    const { passengers } = fields;
    Object.assign(passengers[index], { [dateName]: value });
    form.setFieldsValue({ passengers });
  };


  const phoneInputChangeHandle = (value,country)=>{
    setPhoneNumberCountry(country);
    setPhoneNumberValue(value);
  }
  let reserverFirstName = "";
  let reserverLastName = "";
  if(userInfo?.firstName){
    reserverFirstName = userInfo.firstName;
  }
  if(userInfo?.lastName){
    reserverLastName = userInfo.lastName;
  }
  return (
    <div className={styles.contentCheckout}>
      <div
        className={`${styles.guestDetails} ${
          process.env.THEME_NAME === "TRAVELO" && styles.guestDetailsTravelo
        }`}
      >
        <div className={styles.cardTitle}>{t("reserver-information")}</div>
        <div className={styles.cardBody}>
          <Row gutter={[10, 0]}>
            <Col xs={24} sm={12} md={6} lg={6} xl={6}>
              <Form.Item
                name={["reserver", "gender"]}
                label={t("gender")}
                rules={[{ required: true, message: t("please-choose-gender") }]}
                initialValue={userInfo ? userInfo.gender : true}
              >
                <Radio.Group style={{ display: "flow-root" }}>
                  <Radio value={true}>{t("male")}</Radio>
                  <Radio value={false}>{t("female")}</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={9} lg={9} xl={9}>
              <Form.Item
                initialValue={reserverFirstName }
                name={["reserver", "firstName"]}
                // noStyle
                label="نام"
                rules={[
                  { required: true, message: t("please-enter-name") },
                  {
                    pattern: new RegExp(
                      /^[a-zA-Zآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ ]*$/
                    ),
                    message: t("just-english-persian-letter-and-space"),
                  },
                ]}
              >
                <Input
                  id="firstName"
                  size="large"
                  // className={`${styles.input65} ${styles.firstnameInput}`}
                  className={`${
                    process.env.THEME_NAME === "TRAVELO" && "input-travelo"
                  }`}
                />
              </Form.Item>
              {/* </Input.Group> */}
              {/* </Form.Item> */}
            </Col>
            <Col xs={24} sm={12} md={9} lg={9} xl={9}>
              <Form.Item
                initialValue={reserverLastName }
                name={["reserver", "lastName"]}
                label={t("family")}
                rules={[
                  {
                    required: true,
                    message: t("please-enter-family"),
                  },
                  {
                    pattern: new RegExp(
                      /^[a-zA-Zآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ ]*$/
                    ),
                    message: t("just-english-persian-letter-and-space"),
                  },
                ]}
              >
                <Input
                  id="lastName"
                  size="large"
                  className={`${
                    process.env.THEME_NAME === "TRAVELO" && "input-travelo"
                  }`}
                />
              </Form.Item>
            </Col>
            <Col xs={0} sm={0} md={6} lg={6} xl={6}></Col>
            <Col xs={24} sm={12} md={9} lg={9} xl={9}>
              <Form.Item
                initialValue={userInfo?.emailAddress || undefined }
                name={["reserver", "email"]}
                label={t("email")}
                rules={[
                  {
                    required: true,
                    message: t("please-enter-email"),
                  },
                  { type: "email", message: t("invalid-email") },
                ]}
              >
                <Input
                  id="email"
                  size="large"
                  className={`${
                    process.env.THEME_NAME === "TRAVELO" && "input-travelo"
                  }`}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={9} lg={9} xl={9} id="phoneNumber">
              <Form.Item
                  initialValue={userInfo?.phoneNumber || ""}
                  name="registrationMobile"
                  className={`${process.env.THEME_NAME === "TRAVELO" && styles.formItemTravelo}`}
                  label={t("phone-number")}
                  rules={
                      [
                          ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (phoneNumberValue){
                                  if (phoneNumberCountry){
                                      const requiredLength = phoneNumberCountry.format.replace(/ +/g, "").replace(/[{(+)}]/g, '').replace(/-/g , "").length;
                                      const valueLength = phoneNumberValue.length;
                                      if (requiredLength === valueLength)
                                          return Promise.resolve();
                                      if (!phoneNumberValue)
                                          return Promise.reject(new Error(t('please-enter-phone-number')));

                                          return Promise.reject(new Error('شماره تلفن وارد شده معتبر نیست!'));
                                  }else{
                                      return Promise.resolve();
                                  }
                              }else{
                                  return Promise.reject(new Error(t('please-enter-phone-number')));
                              }
                              },
                          })
                      ]
                  }
              >
                <div
                    style={{direction:"ltr"}}
                    className={`${styles.reserverMobile} ${process.env.THEME_NAME === "TRAVELO" && "form-item-travelo"}`}
                    >

                    <PhoneInput 
                        value={userInfo?.phoneNumber || undefined}                        
                        country="ir"
                        onChange={phoneInputChangeHandle}
                    />
                </div>
              </Form.Item>
            </Col>
          </Row>
        </div>
      </div>
      <div className={styles.passengerTitle}>
        <div>
          <div className={styles.subjectPassengerTitle}>
            <SeatIcon />
            <span>{t("enter-passenger-information")}</span>
          </div>
        </div>
        {/* <div>
            <div className={styles.numberPassengerTitle}>
              <div className={styles.passengerCount}>
                <b> {props.passengers["ADT"]} </b>
                <span>بزرگسال</span>
                <div
                  className={styles.plusCount}
                  onClick={() => addPassenger("plus", "ADT")}
                >
                  <PlusOutlineIcon />
                </div>
              </div>
              <div className={styles.passengerCount}>
                <b> {props.passengers["CHD"]} </b>
                <span>کودک</span>
                <div
                  className={styles.plusCount}
                  onClick={() => addPassenger("plus", "CHD")}
                >
                  <PlusOutlineIcon />
                </div>
              </div>
              <div
                className={styles.passengerCount}
                onClick={() => addPassenger("plus", "INF")}
              >
                <b> {props.passengers["INF"]} </b>
                <span>نوزاد</span>
                <div className={styles.plusCount}>
                  <PlusOutlineIcon />
                </div>
              </div>
            </div>
          </div> */}
      </div>
      {passangers.map((person, index) => (
        <div className={styles.passngerDetails} key={index}>
          <div className={styles.cardBody}>
            <div className={styles.adultPassenger}>
              <div
                className={` ${styles.headerAdultPassneger} ${
                  person.type === "CHD"
                    ? styles.headerBabyPassneger
                    : person.type === "INF"
                    ? styles.headerInfantPassneger
                    : ""
                }`}
              >
                <div className={styles.subjectAdultPassneger}>
                  <h4>
                    مسافر {index + 1} (
                    {person.type === "ADT" ? "بزرگسال" : null}
                    {person.type === "CHD" ? "کودک" : null}
                    {person.type === "INF" ? "نوزاد" : null})
                  </h4>
                </div>
                {/* <div
                  className={styles.removePassneger}
                  onClick={() => addPassenger("minus", person.type, index,t)}
                >
                  <RemoveSimpleIcon />
                </div> */}
              </div>
              <div className={styles.contentAdultPassneger} layout="vertical">
                <Row gutter={[10, 0]}>
                  <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                    <Form.Item
                      name={["passengers", index, "gender"]}
                      label={t("gender")}
                      rules={[
                        {
                          required: true,
                          message: t("please-choose-gender"),
                        },
                      ]}
                      initialValue={true}
                    >
                      <Radio.Group style={{ display: "flow-root" }}>
                        <Radio value={true}>{t("male")}</Radio>
                        <Radio value={false}>{t("female")}</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                    <Form.Item
                      name={["passengers", index, "firstName"]}
                      label={t("english-name")}
                      rules={[
                        {
                          required: true,
                          message: t("please-enter-english-name"),
                        },
                        {
                          pattern: /^[a-zA-Z ]*$/,
                          message: t("just-english-letter-and-space"),
                        },
                      ]}
                    >
                      <Input
                        // id={`firstName_${person.type}_${person.number}_${person.infoBox}`}
                        size="large"
                        className={`${
                          process.env.THEME_NAME === "TRAVELO" &&
                          "input-travelo"
                        }`}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                    <Form.Item
                      name={["passengers", index, "lastName"]}
                      label={t("english-family")}
                      rules={[
                        {
                          required: true,
                          message: t("please-enter-english-family"),
                        },
                        {
                          pattern: /^[a-zA-Z ]*$/,
                          message: t("just-english-letter-and-space"),
                        },
                      ]}
                    >
                      <Input
                        // id={`lastName_${person.type}_${person.number}_${person.infoBox}`}
                        size="large"
                        className={` ${
                          process.env.THEME_NAME === "TRAVELO" &&
                          "input-travelo"
                        }`}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                    <Form.Item label={t("gregorian-birthdate")}>
                      <Input.Group>
                        <Form.Item
                          name={["birthDate", index, "day"]}
                          noStyle
                          rules={[
                            {
                              required: !person.birthDate.day,
                              message: t("please-enter-birthdate"),
                            },
                          ]}
                        >
                          <Select
                            defaultValue={t("day")}
                            style={{ width: "23%", marginTop: "2px" }}
                            showSearch
                            // id={`birthDate_day_${person.type}_${person.number}`}

                            className={`${
                              process.env.THEME_NAME === "TRAVELO" &&
                              "form-item-travelo"
                            }`}
                            onChange={(e) =>
                              handleChangeDates(
                                ["birthDate", index, "day"],
                                e,
                                index,
                                "birthDate",
                                "day"
                              )
                            }
                          >
                            <Option value="1">1</Option>
                            <Option value="2">2</Option>
                            <Option value="3">3</Option>
                            <Option value="4">4</Option>
                            <Option value="5">5</Option>
                            <Option value="6">6</Option>
                            <Option value="7">7</Option>
                            <Option value="8">8</Option>
                            <Option value="9">9</Option>
                            <Option value="10">10</Option>
                            <Option value="11">11</Option>
                            <Option value="12">12</Option>
                            <Option value="13">13</Option>
                            <Option value="14">14</Option>
                            <Option value="15">15</Option>
                            <Option value="16">16</Option>
                            <Option value="17">17</Option>
                            <Option value="18">18</Option>
                            <Option value="19">19</Option>
                            <Option value="20">20</Option>
                            <Option value="21">21</Option>
                            <Option value="22">22</Option>
                            <Option value="23">23</Option>
                            <Option value="24">24</Option>
                            <Option value="25">25</Option>
                            <Option value="26">26</Option>
                            <Option value="27">27</Option>
                            <Option value="28">28</Option>
                            <Option value="29">29</Option>
                            <Option value="30">30</Option>
                            <Option value="31">31</Option>
                          </Select>
                        </Form.Item>
                        <Form.Item
                          name={["birthDate", index, "month"]}
                          noStyle
                          rules={[
                            {
                              required:
                                person.birthDate.day && !person.birthDate.month,
                              message: t("please-enter-birthdate"),
                            },
                          ]}
                        >
                          <Select
                            // id={`birthDate_month_${person.type}_${person.number}`}
                            defaultValue={t("month")}
                            showSearch
                            style={{
                              width: "42%",
                              "paddingRight": "5px",
                            }}
                            className={`${
                              process.env.THEME_NAME === "TRAVELO" &&
                              "form-item-travelo"
                            }`}
                            onChange={(e) =>
                              handleChangeDates(
                                ["birthDate", index, "month"],
                                e,
                                index,
                                "birthDate",
                                "month"
                              )
                            }
                          >
                            {props.dateInfo.years.monthMiladi.map(
                              (val, index) => (
                                <Option value={index + 1}>
                                  {index + 1 > 9 ? index + 1 : index + 1} -{" "}
                                  {val}
                                </Option>
                              )
                            )}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          name={["birthDate", index, "year"]}
                          noStyle
                          rules={[
                            {
                              required:
                                person.birthDate.day &&
                                person.birthDate.month &&
                                !person.birthDate.year,
                              message: t("please-enter-birthdate"),
                            },
                          ]}
                        >
                          <Select
                            // id={`birthDate_year_${person.type}_${person.number}_${person.infoBox}`}
                            defaultValue={t("year")}
                            showSearch
                            style={{
                              width: "35%",
                              "paddingRight": "5px",
                            }}
                            className={`${
                              process.env.THEME_NAME === "TRAVELO" &&
                              "form-item-travelo"
                            }`}
                            onChange={(e) =>
                              handleChangeDates(
                                ["birthDate", index, "year"],
                                e,
                                index,
                                "birthDate",
                                "year"
                              )
                            }
                          >
                            {dateInfo.years[person.type].miladi.map((value) => (
                              <Option value={value}>{value}</Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          noStyle
                          name={["passengers", index, "birthDate"]}
                          rules={[
                            {
                              required: true,
                              message: person.validDate.birthDate
                                ? " "
                                : person.type === "INF"
                                ? t("infant-age-between")
                                : person.type === "CHD"
                                ? t("child-age-between")
                                : t("adult-age-between"),
                            },
                          ]}
                        >
                          <Input
                            hidden
                            // id={`${person.type}_${person.number}_birthDateMiladi`}
                            defaultValue="true"
                            value="true"
                          />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                    <Form.Item
                      name={["passengers", index, "nationality"]}
                      label={t("passport-country")}
                      rules={[
                        {
                          required: true,
                          message: t("please-enter-passport-country"),
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        defaultValue={t("choose")}
                        // id={`passportCountry_${person.type}_${person.number}_${person.infoBox}`}
                        className={`${
                          process.env.THEME_NAME === "TRAVELO" &&
                          "form-item-travelo"
                        }`}
                      >
                        {countries.map((country, index) => (
                          <Option value={country.code} key={index}>
                            {country.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                    <Form.Item
                      name={["passengers", index, "nationalId"]}
                      label={t("national-code")}
                      rules={[
                        {
                          required: true,
                          message: t("please-enter-national-code"),
                        },
                        {
                          pattern: /^\d{10}$/,
                          message: t("invalid-national-code"),
                        },
                      ]}
                    >
                      <Input
                        // id={`nationalId_${person.type}_${person.number}_${person.infoBox}`}
                        size="large"
                        className={`${
                          process.env.THEME_NAME === "TRAVELO" &&
                          "input-travelo"
                        }`}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                    <Form.Item
                      name={["passengers", index, "passportNumber"]}
                      label="شماره پاسپورت"
                      rules={[
                        {
                          required: true,
                          message: t("please-enter-passport-no"),
                        },
                      ]}
                    >
                      <Input
                        // id={`passportNumber_${person.type}_${person.number}_${person.infoBox}`}
                        size="large"
                        className={`${
                          process.env.THEME_NAME === "TRAVELO" &&
                          "input-travelo"
                        }`}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                    <Form.Item label={t("passport-expire-date")}>
                      <Input.Group comact>
                        <Form.Item
                          name={["passportExpireDate", index, "day"]}
                          noStyle
                          rules={[
                            {
                              required: !person.passportExpireDate.day,
                              message: t("please-enter-passport-expire-date"),
                            },
                          ]}
                        >
                          <Select
                            defaultValue={t("day")}
                            style={{ width: "23%", marginTop: "2px" }}
                            showSearch
                            // id={`birthDate_day_${person.type}_${person.number}`}
                            onChange={(e) =>
                              handleChangeDates(
                                ["passportExpireDate", index, "day"],
                                e,
                                index,
                                "passportExpireDate",
                                "day"
                              )
                            }
                            className={`${
                              process.env.THEME_NAME === "TRAVELO" &&
                              "form-item-travelo"
                            }`}
                          >
                            <Option value="1">1</Option>
                            <Option value="2">2</Option>
                            <Option value="3">3</Option>
                            <Option value="4">4</Option>
                            <Option value="5">5</Option>
                            <Option value="6">6</Option>
                            <Option value="7">7</Option>
                            <Option value="8">8</Option>
                            <Option value="9">9</Option>
                            <Option value="10">10</Option>
                            <Option value="11">11</Option>
                            <Option value="12">12</Option>
                            <Option value="13">13</Option>
                            <Option value="14">14</Option>
                            <Option value="15">15</Option>
                            <Option value="16">16</Option>
                            <Option value="17">17</Option>
                            <Option value="18">18</Option>
                            <Option value="19">19</Option>
                            <Option value="20">20</Option>
                            <Option value="21">21</Option>
                            <Option value="22">22</Option>
                            <Option value="23">23</Option>
                            <Option value="24">24</Option>
                            <Option value="25">25</Option>
                            <Option value="26">26</Option>
                            <Option value="27">27</Option>
                            <Option value="28">28</Option>
                            <Option value="29">29</Option>
                            <Option value="30">30</Option>
                            <Option value="31">31</Option>
                          </Select>
                        </Form.Item>
                        <Form.Item
                          name={["passportExpireDate", index, "month"]}
                          noStyle
                          rules={[
                            {
                              required:
                                person.passportExpireDate.day &&
                                !person.passportExpireDate.month,
                              message: t("please-enter-passport-expire-date"),
                            },
                          ]}
                        >
                          <Select
                            // id={`birthDate_month_${person.type}_${person.number}`}
                            defaultValue={t("month")}
                            showSearch
                            onChange={(e) =>
                              handleChangeDates(
                                ["passportExpireDate", index, "month"],
                                e,
                                index,
                                "passportExpireDate",
                                "month"
                              )
                            }
                            style={{
                              width: "42%",
                              "paddingRight": "5px",
                            }}
                            className={`${
                              process.env.THEME_NAME === "TRAVELO" &&
                              "form-item-travelo"
                            }`}
                          >
                            {props.dateInfo.years.monthMiladi.map(
                              (val, index) => (
                                <Option value={index + 1}>
                                  {index + 1 > 9 ? index + 1 : index + 1} -{" "}
                                  {val}
                                </Option>
                              )
                            )}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          name={["passportExpireDate", index, "year"]}
                          noStyle
                          rules={[
                            {
                              required:
                                person.passportExpireDate.day &&
                                person.passportExpireDate.month &&
                                !person.passportExpireDate.year,
                              message: t("please-enter-passport-expire-date"),
                            },
                          ]}
                        >
                          <Select
                            // id={`birthDate_year_${person.type}_${person.number}_${person.infoBox}`}
                            defaultValue={t("year")}
                            showSearch
                            onChange={(e) =>
                              handleChangeDates(
                                ["passportExpireDate", index, "year"],
                                e,
                                index,
                                "passportExpireDate",
                                "year"
                              )
                            }
                            style={{
                              width: "35%",
                              "paddingRight": "5px",
                            }}
                            className={`${
                              process.env.THEME_NAME === "TRAVELO" &&
                              "form-item-travelo"
                            }`}
                          >
                            {dateInfo.years.passportExpire.map((value) => (
                              <Option value={value}>{value}</Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          noStyle
                          name={["passengers", index, "passportExpireDate"]}
                          rules={[
                            {
                              required: true,
                              message: person.validDate.passportExpireDate
                                ? " "
                                : t("invalid-passport-expire-date"),
                            },
                          ]}
                        >
                          <Input
                            hidden
                            // id={`${person.type}_${person.number}_birthDateMiladi`}
                            defaultValue="true"
                            value="true"
                          />
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                    <Form.Item
                      name={["passengers", index, "passengerType"]}
                      initialValue={person.type}
                    >
                      <Input hidden defaultValue={person.type} />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      ))}{" "}
    </div>
  );
};

ContentCheckout.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

ContentCheckout.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProp = (state) => {
  return {
    dateInfo: state.dateInfo,
    countries: state.flightForeign.countries,
  };
};

const mapDispatchToProp = (dispatch) => ({
  FetchCountries: () => dispatch(FetchCountries()),
});

export default withTranslation("common")(
  connect(mapStateToProp, mapDispatchToProp)(ContentCheckout)
);
