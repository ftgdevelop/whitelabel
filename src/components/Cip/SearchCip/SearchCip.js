import React,{useEffect,useState} from 'react';
import PropTypes from "prop-types";
import { Button, Row, Col, AutoComplete, notification, Input } from "antd";
import { Link, i18n, withTranslation, Router } from "../../../../i18n";
import { SearchOutlined } from "@ant-design/icons";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import moment from 'moment-jalaali';
import AsyncSelect from "react-select/async";

import { GetCipAirPortList,GetCipAirPortListPrice } from '../../../actions';
import styles from "../../../styles/Home.module.css";
import PaxSelect from "./PaxSelect";

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

const SearchCip = props => {
    const { t } = props;
    const today = { year: +moment().format("jYYYY"), month: +moment().format("jM"), day: +moment().format("jD") };
    // const maximunDate = { year: +moment().format("jYYYY")+1, month: +moment().format("jM"), day: +moment().format("jD") };

    // console.log("maximunDate", maximunDate)

    const [cipInfo,setCipInfo] = useState();
    const [cipAirPortList,setCipAirPortList] = useState();
    const [flightDate, setFlightDate] = useState(null);
    const [flightDateValidation, setFlightDateValidation] = useState(true);
    const [selectUrl, setSelectUrl] = useState([]);
    const [loading,setLoading] = useState(false);
    const [flightNumber,setFlightNumber] = useState();
    const [airlineName,setAirlineName] = useState();
    const [persons,setPersons] = useState({adult: 1,children: 0,accompanying: 0,});
    const [value, setValue] = useState('');
    
    const AirPortList = [
      {
        "url": "fa/cip/فرودگاه-بین-المللی-امام-خمینی-Cip-خدمات",
        "address": "تهران، بزرگراه خلیج فارس، کیلومتر ۳۰، فرودگاه بین المللی امام خمینی(ره)",
        "name": "فرودگاه بین المللی امام خمینی",
        "nameLong": "فرودگاه بین المللی امام خمینی تهران ، تهران ، ایران",
        "city": {
          "name": "تهران",
          "code": "THR"
        },
        "code": "IKA",        
        "id": 9131
      },
      {
        "url": "fa/cip/فرودگاه-مهرآباد-Cip-خدمات",
        "address": " تهران، میدان آزادی، خیابان معراج، فرودگاه بین المللی مهراباد تهران",
        "name": "فرودگاه مهرآباد",
        "nameLong": "فرودگاه مهرآباد ، تهران،ایران",
        "city": {
          "name": "تهران",
          "code": "THR"
        },
        "code": "THR",
        "id": 9116
      },
      {
        "url": "fa/cip/فرودگاه-کیش-Cip-خدمات",
        "address": "استان هرمزگان، كيش، بلوار فرودگاه",
        "name": "فرودگاه بین المللی کیش",
        "nameLong": "فرودگاه بین المللی کیش ، جزیره کیش ، ایران",
        "city": {
          "name": "کیش",
          "code": "KIH"
        },
        "code": "KIH",
        "id": 9117
      },
      {
        "url": "fa/cip/فرودگاه-شهید-هاشمی-نژاد-مشهد-Cip-خدمات",
        "address": " بلوار فرودگاه – فرودگاه شهید هاشمی نژاد",
        "name": "فرودگاه بین المللی شهید هاشمی نژاد مشهد",
        "nameLong": "فرودگاه شهید هاشمی نژاد، مشهد،ایران",
        "city": {
          "name": "مشهد",
          "code": "MHD"
        },
        "code": "MHD",
        "id": 9121
      },
      {
        "url": "fa/cip/فرودگاه-شهید-اشرفی-اصفهانی-کرمانشاه-Cip-خدمات",
        "address": "شهر کرمانشاه، فرودگاه شهید اشرفی اصفهانی کرمانشاه",
        "name": "فرودگاه شهید اشرفی کرمانشاه",
        "nameLong": "فرودگاه شهید اشرفی ، کرمانشاه ، ایران\r\n",
        "city": {
          "name": "کرمانشاه",
          "code": "KSH"
        },
        "code": "KSH",
        "id": 9137
      },
      {
        "url": "fa/cip/فرودگاه-اهواز-Cip-خدمات",
        "address": "اهواز، بلوار پاسداران فرودگاه بین المللی اهواز٫",
        "name": "فرودگاه سپهبد شهید قاسم سلیمانی اهواز",
        "nameLong": "فرودگاه سپهبد شهید قاسم سلیمانی ، اهواز ، ایران",
        "city": {
          "name": "اهواز",
          "code": "AWH"
        },
        "code": "AWH",
        "id": 9146
      },
      {
        "url": "fa/cip/فرودگاه-شهید-مدنی-تبریز-Cip-خدمات",
        "address": "تبریز، فرودگاه بین المللی شهید مدنی تبریز",
        "name": "فرودگاه بین المللی شهید مدنی تبریز",
        "nameLong": "فرودگاه بین المللی شهید مدنی ،تبریز ، ایران",
        "city": {
          "name": "تبریز",
          "code": "TBZ"
        },
        "code": "TBZ",
        "id": 9152
      },
      {
        "url": "fa/cip/فرودگاه-بین-المللی-سردار-جنگل-رشت-Cip-خدمات",
        "address": "استان گیلان ، رشت ، بلوار ولی‌عصر",
        "name": "فرودگاه بین المللی سردار جنگل رشت",
        "nameLong": "فرودگاه بین المللی سردار جنگل ، رشت ، ایران",
        "city": {
          "name": "رشت",
          "code": "RAS"
        },
        "code": "RAS",
        "id": 9155
    }];

    const AirLineList = [
        {"name": "آتا", "id": 1},
        {"name": "پویا", "id": 2},
        {"name": "سپهران", "id": 3},
        {"name": "ساها", "id": 4},
        {"name": "اترک", "id": 5},
        {"name": "کیش ایر", "id": 6},
        {"name": "معراج", "id": 7},
        {"name": "کارون", "id": 8},
        {"name": "ماهان", "id": 9},
        {"name": "کاسپین", "id": 10},
        {"name": "زاگرس", "id": 11},
        {"name": "تابان", "id": 12},
        {"name": "ایر تور", "id": 13},
        {"name": "ایران ایر", "id": 14},
        {"name": "آسمان", "id": 15},
        {"name": "قشم ایر", "id": 16},
        {"name": "وارش", "id": 17},
        {"name": "فلای پرشیا", "id": 18},
        {"name": "پارس ایر", "id": 19},
    ]

    const onChangeFlightDate = e =>{
        setFlightDate(e);
        setFlightDateValidation(true);
    }

    const onFailedSubmit = (e) => {
        if (!flightDate){
          setFlightDateValidation(false);
        }
    }
    
    useEffect(()=>{
        const fetchData = async () => {
            const response = await GetCipAirPortList();
            if (response.data) {
                setCipAirPortList(response.data.result.items);
                const priceResponse = await GetCipAirPortListPrice();
                if(priceResponse.data){
                    setCipInfo(priceResponse.data);
                    let items = [...response.data.result.items];
                    let updatedItems =[];
                    for (let i=0 ; i< items.length ; i++){
                        let newItem = items[i];
                        let itemWithPrice = priceResponse.data.AirPorts.filter(item => item.AirportId === items[i].id)[0];
                        if(itemWithPrice && itemWithPrice.Price){
                            newItem.updatedPrice = itemWithPrice.Price;
                            updatedItems.push(newItem);
                        }
                    }
                    setCipAirPortList(updatedItems);
                }
            }
          };
          fetchData();
    },[]);

    if (AirPortList) {
        var options = AirPortList.map(
            item => ({ value: item.name, url : item.url, id : item.id })
        )
    }

    if (AirLineList) {
        var optionsAirline = AirLineList.map(
            item => ({ value: item.name, id : item.id })
        )
    }

    String.prototype.toEnglishDigit = function() {
        var find = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        var replace = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        var replaceString = this;
        var regex;
        for (var i = 0; i < find.length; i++) {
            regex = new RegExp(find[i], "g");
            replaceString = replaceString.replace(regex, replace[i]);
        }
        return replaceString;
    }

    const onSubmit = () => {     
        if (selectUrl.length === 0) {
            openNotification("error", "bottomRight", "لطفا فرودگاه را انتخاب کنید");
            return;
        } else if (!flightDate) {
            openNotification("error", "bottomRight", "لطفا تاریخ پرواز را انتخاب کنید");
            return;
        }

        let url = "";
        if(selectUrl) {
            let fligtDateSelect = moment(flightDate.year+"/"+flightDate.month+"/"+flightDate.day, "jYYYY/jM/jD").format("YYYY-MM-DD");
            let queryFlightNumber = `${flightNumber ? "/flightNumber-" + flightNumber.toEnglishDigit() : ""}`;
            let queryAirlineName = `${airlineName ? "/airlineName-" + airlineName : ""}`;

            url = `/${selectUrl}/flightdate-${fligtDateSelect}${queryAirlineName}${queryFlightNumber}/adult-${persons.adult}-children-${persons.children}-accompanying-${persons.accompanying}`;

            // url = `/${selectUrl}`;
            // localStorage.setItem("searchCipValues", fligtDateSelect);
            setLoading(true)
            Router.push(url).then();
        }
    }

    const onSelect = (value) => {
        let res = [];

        if(value) {
            res = options.find(v => v.value === value);
            setSelectUrl(res.url);
        }
    }

    const onSelectAirline = (value) => {
        let res = [];

        if(value) {
            res = optionsAirline.find(v => v.value === value);
            setAirlineName(res.value);
        }
    }
    
    const onChangeAirlineName = (e) => {
        setAirlineName(e.target.value);
    }

    const onChangeflightNumber = (e) => {
        setFlightNumber(e.target.value);
    }

    const handleValue = e => {
        setValue(e);
        setPersons(e);
    };

    return (
        <div className={styles.cipSearch}>
            <Row gutter={process.env.THEME_NAME === "TRAVELO" ? [15,10] : [5,10]}>
                <Col xs={24} sm={24} md={24}
                    lg={process.env.THEME_NAME === "TRAVELO" ? 11 : 7}
                    xl={process.env.THEME_NAME === "TRAVELO" ? 11 : 7}
                    >
                    <AutoComplete
                        style={{ width: "100%" }}
                        options={options}
                        placeholder="جستجوی نام فرودگاه یا شهر"
                        // filterOption={(inputValue, option) =>
                        //     option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        // }
                        allowClear
                        notFoundContent="موردی پیدا نشد"
                        onSelect={onSelect}
                        className={`cip-search-selector ${process.env.THEME_NAME === "TRAVELO" && "cip-search-selector-travelo"}`}
                    />
                </Col>
                <Col xs={24} sm={24} md={24} lg={4} xl={4}
                    className={`${styles.flightNummberCipSearch} ${process.env.THEME_NAME === "TRAVELO" && styles.flightNummberCipSearchTravelo}`}
                >
                    {/* <AutoComplete
                        style={{ width: "100%" }}
                        options={optionsAirline}
                        placeholder="نام ایرلاین"
                        // allowClear
                        notFoundContent="موردی پیدا نشد"
                        onSelect={onSelectAirline}
                        
                        className={`cip-search-airline-selector ${process.env.THEME_NAME === "TRAVELO" && "cip-search-airline-selector-travelo"}`}
                    /> */}

                    <Input type="text" placeholder="نام ایرلاین" onChange={onChangeAirlineName} />
                </Col>
                <Col xs={24} sm={24} md={24} lg={4} xl={4}                    
                    className={`${styles.flightNummberCipSearch} ${process.env.THEME_NAME === "TRAVELO" && styles.flightNummberCipSearchTravelo}`}
                    >
                    <Input type="text" placeholder="شماره پرواز" onChange={onChangeflightNumber} />
                </Col>
                <Col xs={24} sm={24} md={24}
                    lg={process.env.THEME_NAME === "TRAVELO" ? 5 : 3}
                    xl={process.env.THEME_NAME === "TRAVELO" ? 5 : 3}
                    className={`${styles.datePickerCipSearch} ${process.env.THEME_NAME === "TRAVELO" && styles.datePickerCipSearchTravelo} datepickerCip`}
                    >
                    <DatePicker
                        inputClassName={styles.datePicker}
                        inputPlaceholder="تاریخ پرواز"
                        shouldHighlightWeekends
                        locale="fa"
                        value={flightDate}
                        onChange={onChangeFlightDate}
                        minimumDate={today}
                        // maximumDate={maximunDate}
                        />

                    {flightDateValidation || <div className="ant-form-item-explain ant-form-item-explain-error"><div role="alert">لطفا تاریخ پرواز را وارد کنید.</div></div>}
                </Col>

                {/* <Col xs={24} sm={24} md={24}
                    lg={process.env.THEME_NAME === "TRAVELO" ? 5 : 4}
                    xl={process.env.THEME_NAME === "TRAVELO" ? 5 : 4}
                    >
                    <PaxSelect
                        defaultValue={persons}
                        setValue={handleValue}
                        label="persons"
                        />
                </Col> */}

                <Col xs={24} sm={24} md={24}
                    lg={process.env.THEME_NAME === "TRAVELO" ? 24 : 4}
                    xl={process.env.THEME_NAME === "TRAVELO" ? 24 : 4}
                    >
                    <div
                        className={`${styles.btnCipSearch} ${process.env.THEME_NAME === "TRAVELO" && styles.btnCipSearchTravelo}`}
                        >
                        <Button
                            size="large"
                            type="myPrimary"
                            htmlType="submit"
                            onClick={onSubmit}
                        >
                            {loading ? (
                            <>
                                <SearchOutlined />
                                جستجوی فرودگاه
                            </>
                            ) : (
                            <>
                                {process.env.THEME_NAME === "TRAVELO" ? null : <SearchOutlined />}
                                {t("search")}
                            </>
                            )}
                        </Button>
                    </div>
                </Col>
                
            </Row>
        </div>
    )
}

SearchCip.getInitialProps = async () => ({
    namespacesRequired: ["common"],
});

SearchCip.propTypes = {
    t: PropTypes.func.isRequired,
};

export default withTranslation("common")(SearchCip);