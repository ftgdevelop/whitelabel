import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types'
import { i18n, withTranslation, Router } from '../../../../i18n'
import {useRouter} from 'next/router';
import styles from '../../../styles/Home.module.css'
import { Row, Col, notification } from 'antd';
import moment from 'moment-jalaali';

import {CipGetValidate,CipPreReserve} from '../../../actions'
import CheckoutSteps from './CheckoutSteps';
import AsideCheckout from './AsideCheckout';
import ContentCheckout from './ContentCheckout/ContentCheckout';
import { CloseOutlined } from '@ant-design/icons';

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

const Checkout = props => {
    const { t } = props;
    const router = useRouter();
    const [reserveInfo,setReserveInfo]=useState();

    let airlineOriginName = reserveInfo && reserveInfo.originName !== 'undefined' ? reserveInfo.originName : null;
    let airlineFlightNumber = reserveInfo && reserveInfo.flightNumber;
    let reserveKey = reserveInfo && reserveInfo.preReserveKey;
    let airlineAirportName = reserveInfo && reserveInfo.airport.city.name;
    let transortList = reserveInfo && reserveInfo.transport.filter(i => i.count >= 1);
    const [airlineName,setAirlineName] = useState(airlineOriginName);
    const [flightNumber,setFlightNumber] = useState(airlineFlightNumber);
    const [preReserveKey,setPreReserveKey] = useState(reserveKey);
    const [originName,setOriginName] = useState(airlineAirportName);
    const [flightDate, setFlightDate] = useState(null);
    const [flightTime, setFlightTime] = useState(null);
    const [submitLoading,setSubmitLoading]=useState(false);
    const [value,setValue] = useState(transortList);

    useEffect(() => {
        const fetchData = async () => {
            const url = router.asPath;
            let defaultKey;
            if (url.includes("key")){
                defaultKey = url.split("/key=")[1].split("/")[0];
            }
            const res = await CipGetValidate(defaultKey);
            if(res.data.result) {
                setReserveInfo(res.data.result)
                if (res.data.result.flightTime){
                    const time = res.data.result.flightTime;                    
                    const FlightDate = time.split("T")[0];
                    const shamsiFlightDate = moment(FlightDate, "YYYY-MM-DD").format("jYYYY/jM/jD");
                    const initialDate = {
                        day: Number(shamsiFlightDate.split("/")[2]),
                        month: Number(shamsiFlightDate.split("/")[1]),
                        year: Number(shamsiFlightDate.split("/")[0])
                    };
                    setFlightDate(initialDate);
                }
            }
        };
        fetchData();
    }, []);

    const [countAdults,setCountAdults] = useState();
    const [countChildren,setCountChildren] = useState();
    const [countAccompanying,setCountAccompanying] = useState();
    
    const [reserverGender,setReserverGender] = useState(true);
    const [reserverFirstName,setReserverFirstName] = useState();
    const [reserverLastName,setReserverLastName] = useState();
    const [countryCode,setCountryCode] = useState(98);
    const [phoneNumber,setPhoneNumber] = useState();
    const [reserverEmail,setReserverEmail] = useState();

    const [countTransports, setCountTransports] = useState(0);
    const [addressTransports, setAddressTransports] = useState(0);

    const [loading,setLoading] = useState(false);

    // const addTransports = (id) => {
    //     let serviceList = reserveInfo.transport.filter(item => item.id == id)[0];
    //     const count = serviceList.count++;
    //     setCountTransports(count)
    // }

    const addAdult = (id) => {
        reserveInfo.rate.adults++;
        setCountAdults(reserveInfo.rate.adults);
    }
    const removeAdult = () => {
        if(reserveInfo.rate.adults >= 2) {
            reserveInfo.rate.adults--;
            setCountAdults(reserveInfo.rate.adults);
        }
    }

    const addChildren = () => {
        reserveInfo.rate.children++;
        setCountChildren(reserveInfo.rate.children);
    }
    const removeChildren = () => {
        if(reserveInfo.rate.children >= 1) {
            reserveInfo.rate.children--;
            setCountChildren(reserveInfo.rate.children);
        }
    }

    const addAccompanying = () => {
        reserveInfo.rate.accompanying++;
        setCountAccompanying(reserveInfo.rate.accompanying);
    }
    const removeAccompanying = () => {
        if(reserveInfo.rate.accompanying >= 1) {
            reserveInfo.rate.accompanying--;
            setCountAccompanying(reserveInfo.rate.accompanying);
        }
    }

    useEffect(() => {
        setAirlineName(airlineOriginName);
        setFlightNumber(airlineFlightNumber);
        setPreReserveKey(reserveKey);
        setOriginName(airlineAirportName);
        setValue(transortList);
    }, [airlineOriginName, airlineFlightNumber, reserveKey, airlineAirportName]);

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

    if (AirLineList) {
        var optionsAirline = AirLineList.map(
            item => ({ value: item.name, id : item.id })
        )
    }
    
    const onSelectAirline = (e) => {
        // let res = [];
        // if(value) {
        //     res = optionsAirline.find(v => v.value === value);
        //     setAirlineName(res.value);
        //     reserveInfo.originName = res.value;
        // }
        setAirlineName(e.target.value);
        reserveInfo.originName = e.target.value;
    }

    const onChangeflightNumber = (e) => {
        setFlightNumber(e.target.value);
        reserveInfo.flightNumber = e.target.value;
    }

    const onChangeFlightDate = e =>{
        setFlightDate(e);
    }

    const onChangeFlightTime = e =>{
        setFlightTime(e);
    }

    const [adultList,setAdultList] = useState([{
        gender: true,
        firstName: "",
        lastName: "",
        passengerType: "Adult"
    }]);
    const [childList,setChildList] = useState([]);
    const [accompanyingList,setAccompanyingList] = useState([]);

    const adultInputChange = (e, index, type) => {
        let list = [...adultList];
        if(type) {
            let services = [];
            for(let i=0; i< e.length; i++) {
                services.push(e[i]);
            }
            list[index]["services"] = services;
        } else {
            const { name, value } = e.target;
            list[index][name] = value;
        }
        setAdultList(list);
    };
    const childInputChange = (e, index, type) => {
        let list = [...childList];
        if(type) {
            let services = [];
            for(let i=0; i< e.length; i++) {
                services.push(e[i]);
            }
            list[index]["services"] = services;
        } else {
            const { name, value } = e.target;
            list[index][name] = value;
        }
        setChildList(list);
    };
    const accompanyingInputChange = (e, index, type) => {
        let list = [...accompanyingList];
        if(type) {
            let services = [];
            for(let i=0; i< e.length; i++) {
                services.push(e[i]);
            }
            list[index]["services"] = services;
        } else {
            const { name, value } = e.target;
            list[index][name] = value;
        }
        setAccompanyingList(list);
    };

    const adultRemoveClick = index => {
        const list = [...adultList];
        list.splice(index, 1);
        setAdultList(list);
    };
    const childRemoveClick = index => {
        const list = [...childList];
        list.splice(index, 1);
        setChildList(list);
    };
    const accompanyingRemoveClick = index => {
        const list = [...accompanyingList];
        list.splice(index, 1);
        setAccompanyingList(list);
    };

    const adultAddClick = () => {
        setAdultList([...adultList, {
            gender: true,
            firstName: "",
            lastName: "",
            passengerType: "Adult",
        }]);
    };
    const childAddClick = () => {
        setChildList([...childList, {
            gender: true,
            firstName: "",
            lastName: "",
            passengerType: "Child",
        }]);
    };
    const accompanyingAddClick = () => {
        setAccompanyingList([...accompanyingList, {
            gender: true,
            firstName: "",
            lastName: "",
            passengerType: "Accompanying",
        }]);
    };

    const adultRemoveEndClick = () => {
        setAdultList(adultList.slice(0, -1));
    };
    const childRemoveEndClick = () => {
        setChildList(childList.slice(0, -1));
    };
    const accompanyingRemoveEndClick = () => {
        setAccompanyingList(accompanyingList.slice(0, -1));
    };

    const onFinish = async() => {

        let selected = reserveInfo.transport.filter(item => item.count >= 1);
        let selectedTransport = selected.map(item => ({"id" : item.id, "count": item.count, "address": addressTransports}));

        var pattern = new RegExp(/^[0-9\b]+$/);
        if (!airlineName) {
            openNotification("error", "bottomRight", "لطفا نام ایرلاین را وارد نمایید");
            return;
        } else if (!flightNumber) {
            openNotification("error", "bottomRight", "لطفا شماره پرواز را وارد نمایید");
            return;
        } else if (!flightTime) {
            openNotification("error", "bottomRight", "لطفا ساعت پرواز را انتخاب کنید");
            return;
        } else if (!reserverFirstName || !reserverLastName || !phoneNumber || !reserverEmail) {
            openNotification("error", "bottomRight", "لطفا مشخصات رزرو گیرنده را کامل وارد نمایید");
            return;
        } else if (phoneNumber.length != 10) {
            openNotification("error", "bottomRight", "لطفا تعداد رقم موبایل رزرو گیرنده را صحیح وارد نمایید");
            return;
        } else if (!pattern.test(phoneNumber)) {
            openNotification("error", "bottomRight", "لطفا موبایل رزرو گیرنده را صحیح وارد نمایید");
            return;
        } else if (selectedTransport.length >= 1 && !addressTransports) {
            openNotification("error", "bottomRight", "لطفا آدرس ترانسفر را وارد نمایید");
            return;
        }

        let time = moment(flightTime).format('HH:mm:ss');
        let date = moment(flightDate.year+"/"+flightDate.month+"/"+flightDate.day, "jYYYY/jM/jD").format("YYYY-MM-DD");

        const param = {
            "passengers": [...adultList, ...childList, ...accompanyingList],
            "reserver": {
                "firstName": reserverFirstName,
                "lastName": reserverLastName,
                "phoneNumber": "+" + countryCode + phoneNumber,
                "email": reserverEmail,
                "userName": phoneNumber ? "+" + countryCode + phoneNumber : reserverEmail,
                "gender": reserverGender
            },
            "airline": airlineName,
            "flightNumber": flightNumber,
            "originName": originName,
            "transports": selectedTransport,
            "flightTime": date + "T" + time + "Z",
            "preReserveKey": preReserveKey
        };

        const response = await CipPreReserve(param);

        if(response.data) {
            let url = `/payment?username=${response.data.result.username}&reserveId=${response.data.result.id}`;
            setLoading(true)
            Router.push(url).then();
        }

    };

    return (
        <div
            className={`${styles.checkout} ${process.env.THEME_NAME === "TRAVELO" && styles.checkoutTravelo}`}
            >
            <div className={styles.container}>
                <CheckoutSteps/>
                <Row gutter={[20,0]}>
                    <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                        <ContentCheckout
                            reserveInfo={reserveInfo}
                            setReserverGender={setReserverGender}
                            setReserverFirstName={setReserverFirstName}
                            setReserverLastName={setReserverLastName}
                            setCountryCode={setCountryCode}
                            setPhoneNumber={setPhoneNumber}
                            setReserverEmail={setReserverEmail}

                            adultList={adultList}
                            adultInputChange={adultInputChange}
                            adultRemoveClick={adultRemoveClick}
                            adultAddClick={adultAddClick}
                            adultRemoveEndClick={adultRemoveEndClick}

                            childList={childList}
                            childInputChange={childInputChange}
                            childRemoveClick={childRemoveClick}
                            childAddClick={childAddClick}
                            childRemoveEndClick={childRemoveEndClick}

                            accompanyingList={accompanyingList}
                            accompanyingInputChange={accompanyingInputChange}
                            accompanyingRemoveClick={accompanyingRemoveClick}
                            accompanyingAddClick={accompanyingAddClick}
                            accompanyingRemoveEndClick={accompanyingRemoveEndClick}

                            addAdult={addAdult}
                            removeAdult={removeAdult}
                            addChildren={addChildren}
                            removeChildren={removeChildren}
                            addAccompanying={addAccompanying}
                            removeAccompanying={removeAccompanying}
                            
                            optionsAirline={optionsAirline}
                            airlineName={airlineName}
                            flightNumber={flightNumber}
                            onSelectAirline={onSelectAirline}
                            onChangeflightNumber={onChangeflightNumber}
                            onChangeFlightDate={onChangeFlightDate}
                            onChangeFlightTime={onChangeFlightTime}
                            flightTime={flightTime}
                            flightDate={flightDate}

                            setCountTransports={setCountTransports}
                            setAddressTransports={setAddressTransports}
                        />
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <AsideCheckout
                            reserveInfo={reserveInfo}
                            onFinish={onFinish}
                            adultList={adultList && adultList}
                            childList={childList && childList}
                            accompanyingList={accompanyingList && accompanyingList}
                            flightDate={flightDate && flightDate}
                            flightTime={flightTime && flightTime}
                            addressTransports={addressTransports}
                            transortList={transortList}
                            loading={loading}
                        />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

Checkout.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})

Checkout.propTypes = {
    t: PropTypes.func.isRequired,
}

export default withTranslation('common')(Checkout)