import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Link, i18n, withTranslation,Router } from '../../../../i18n'
import { useRouter } from 'next/router';
import moment from 'moment-jalaali';
import { Form,Button, notification ,Skeleton,Row,Col} from 'antd';
import {CloseOutlined} from '@ant-design/icons';

import styles from '../../../styles/Cip.module.css'
import CipName from './CipName'
import AirportCip from './AirportCip'
import CompanionCip from './CompanionCip'
import TaxiCip from './TaxiCip'
import PriceCip from './PriceCip'
import AboutCip from './AboutCip'
import ExtraServices from './ExtraService'
import SelectServiceType from './SelectServiceType';
import Reserver from './Reserver';
import Passengers from './Passengers';
import FacilitiesCip from './FacilitiesCip'
import { GetCipAirPortDetailsByUrl, CipPreReserve } from '../../../actions'
import {CipBookingValidate, AvailabilityByIataCode, validateDiscountCode, registerDiscountCode} from '../../../actions'
import GalleryCipTravelo from './GalleryCipTravelo'
import { ArrowRightOutlined } from '@ant-design/icons'
import AnchorNavigation from './AnchorNavigation';
import DetailCipSteps from './DetailCipSteps';
import FaqCip from './FaqCip';
import DiscountCode from './DiscountCode';
import SubmitDetailCip from './SubmitDetailCip';
import SelectServiceTypeItem from './SelectServiceTypeItem';
import { property, set } from 'lodash';
import TermsCip from './TermsCip';

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

const DetailCip = props => {
    
    const router = useRouter();
    
    const [cipAirPortDetail, setCipAirPortDetail] = useState();
    const cipIataCode = cipAirPortDetail ? cipAirPortDetail.code : undefined;
    const [availability, setAvailability] = useState();
    const [mapInfo,setMapInfo]=useState();
    const [selectedAvailability,setSelectedAvailability] = useState();
    const [flightDate, setFlightDate] = useState(null);
    const [flightDateValidation, setFlightDateValidation] = useState(true);
    const [validateResponse,setValidateResponse] = useState();
    const [reserverPassenger,setReserverPassenger] = useState(true);
    const [selectedServicesArray,setSelectedServicesArray] = useState();
    const [discount,setDiscount] = useState();

    const [passengers,setPassengers] = useState([
      {
        id:1,
        gender:props.auth?.isAuthenticated ? props.auth?.user?.gender : true,
        type:"Adult",
        services:[]
      }
    ]);

    const increasePassengers = () => {
      if (passengers.length < 10){
        setPassengers(prevPassengers => [
          ...prevPassengers,
          {
            id: Date.now(),
            gender:true,
            type:"Adult",
            services:[]
          }
        ]);
      }
    }
    const decreasePassengers = () => {
      if (passengers.length > 1) {
        setPassengers(prevPassengers => {
          const updatedPassengers = [...prevPassengers];
          updatedPassengers.splice(-1);
          return (updatedPassengers);
        });
      }
    }
    const removePassenger = (id) => {
      if (passengers.length > 1) {
          const updatedPassengers = passengers.filter(item=> item.id !== id);
          setPassengers(updatedPassengers);
      }
    };
    const UpdatePassenger = (id,property,value) => {
      setPassengers(prevPassengers => {
        const updatingPassenger = prevPassengers.find(item => item.id === id);
        const otherPassengers = prevPassengers.filter(item => item.id !== id);
        const updatedPassenger = {...updatingPassenger,[property]:value};
        return ([...otherPassengers,updatedPassenger]);
      });
    }

    const [accompanying, setAccompanying] = useState([]);
    const addAccompanying = () => {
      if (accompanying.length < 10) {
        setAccompanying(prevAccompanying => [
          ...prevAccompanying,
          {
            id: Date.now(),
            services: []
          }
        ]);
      }
    };
    const removeAccompanying = () => {
      if (accompanying.length > 0) {
        setAccompanying(prevAccompanying => {
          const updatedAccompanying = [...prevAccompanying];
          updatedAccompanying.splice(-1);
          return (updatedAccompanying);
        });
      }
    };
    const removeAccompanyingItem = (id) => {
      if (accompanying.length > 0) {
        setAccompanying(accompanying.filter((item) => item.id !== id));
      }
    };
    const UpdateAccompanying = (id,property,value) => {
      setAccompanying(prevAccompanying => {
        const updatingAccompanying = prevAccompanying.find(item => item.id === id);
        const otherAccompanying = prevAccompanying.filter(item => item.id !== id);
        const updatedAccompanying = {...updatingAccompanying,[property]:value};
        return ([...otherAccompanying,updatedAccompanying]);
      });
    }
  
    const onChangeFlightDate = e =>{
      setFlightDate(e);
      setFlightDateValidation(true);
    }

    useEffect(()=>{
      if (selectedAvailability){
        const validate = async () => {

          const url = router.asPath;
          let flightNumber = undefined;
          let airline = undefined;
          let flight_date = undefined;
          if (url.includes("flightNumber")){
            flightNumber = url.split("/flightNumber-")[1].split("/")[0].split("?")[0].split("#")[0];
          }
          if (url.includes("airlineName")){
            airline = url.split("/airlineName-")[1].split("/")[0].split("?")[0].split("#")[0];
          }
          if (url.includes("flightdate")){
            flight_date = url.split("/flightdate-")[1].split("/")[0].split("?")[0].split("#")[0];
          }
          let params =  {
            "iataCode": cipIataCode,
            "adults": 1,
            "children": 0,
            "accompanying": 0,
            "flightNumber": flightNumber?.toEnglishDigit(),
            "originName": "",
            "destinationName": "",
            "airline": airline,
            "rateId": selectedAvailability?.id,
            "services": undefined,
          };
          if (flight_date) {
            params =  {
              "iataCode": cipIataCode,
              "adults": 1,
              "children": 0,
              "accompanying": 0,
              "flightNumber": flightNumber?.toEnglishDigit(),
              "originName": "",
              "destinationName": "",
              "airline": airline,
              "flightTime": flight_date,
              "rateId": selectedAvailability?.id,
              "services": undefined,
            }; 
          }
          
          const respone = await CipBookingValidate(params);
          if (respone){
            setValidateResponse(respone.data.result);
            const updatedOptionalServices = respone.data.result.optionalServices.map(item=>{
              if (item.type === "Pet" ){
                return({...item,count:1})
              }else{
                return item;
              }
            }) 
            setSelectedServicesArray(updatedOptionalServices);
          }
        }
        validate();

        if (selectedAvailability.transport?.length)
        setSelectedTransport(selectedAvailability.transport.map(item => ({...item,count:0})));

      }
    },[selectedAvailability]);


    const updateSelectedServices = (id,property,fn) => {
      setSelectedServicesArray(prevState => {
        const updatingService = {...prevState.find(item =>  item.id === id)};
        const otherServices = prevState.filter(item =>  item.id !== id);
        if (updatingService[property]){
          if(fn === "inc"){
            updatingService[property]++;
          }else{
            updatingService[property]--;
          }
        }else{
          if(fn === "inc"){
            updatingService[property] = 1;
          }
        }
        return(
          [...otherServices,updatingService]
        );
      })
    }

    const [addedExtraService,setAddedExtraService] = useState([]);
    
    const updateAddedExtraService = id => {
      setAddedExtraService(prevArr => ([
          ...prevArr,id
      ]))
    }

    const [selectedTransport,setSelectedTransport]= useState([]);
    const updateTransport = (id,fn) => {
      setSelectedTransport(prevState => {
        const updatingTransport = {...prevState.find(item =>  item.id === id)};
        const otherTransport = prevState.filter(item =>  item.id !== id);

        if(fn === "inc"){
          updatingTransport.count++;
        }else{
          if (updatingTransport.count > 0){
            updatingTransport.count--;
          }
        }
        return(
          [...otherTransport,updatingTransport]
        );
      })
    }


    //%%%%%
    let passengerServicesArray;
    if (selectedAvailability){
      passengerServicesArray = selectedAvailability.passengerTypeServices;
    }

    const addDiscountCode = async (discountCode) => {
      let key = validateResponse.preReserveKey;
      let type = "Cip";
      setDiscount({
        status:"loading"
      });
      const res = await validateDiscountCode(key, type, discountCode);
      if (res.status == 200) {
        setDiscount({
          status:"success",
          amount: res.data.result?.discountPrice,
          discountCode: discountCode
        });
      } else {
        setDiscount({
          status:"error",
          errorCode: res.data.error?.code
        });
      }
    }

    const clearDiscountError = () => {
      setDiscount(undefined);
    }


    const [submitLoading,setSubmitLoading]=useState(false);

    
    const [emptyCip, setEmptyCip] = useState(false);
    
  
    useEffect(()=>{
      const url = router.asPath;

      if (url.includes("flightdate")){
        const urlFlightDate = url.split("/flightdate-")[1].split("/flightNumber")[0].split("?")[0];
        const shamsiFlightDate =moment(urlFlightDate, "YYYY-MM-DD").format("jYYYY/jM/jD");
        const initialDate = {
            day: Number(shamsiFlightDate.split("/")[2]),
            month: Number(shamsiFlightDate.split("/")[1]),
            year: Number(shamsiFlightDate.split("/")[0])
        };
        setFlightDate(initialDate);
      }

      const fetchData = async () => {
        const url1 = url.split("fa/cip")[1].split("/flightdate-")[0].split("?")[0].split("#")[0];
        const response = await GetCipAirPortDetailsByUrl("fa/cip" + url1);          
        if (response.data) {
          
          setCipAirPortDetail(response.data.result);

          const availabilityResponse = await AvailabilityByIataCode({
            "iataCode": response.data.result.code,
            "adults": 1,
            "children": 0,
            "accompanying": 0,
          });

          if (availabilityResponse.data) {
            if (availabilityResponse.data.result){

              setAvailability(availabilityResponse.data.result.availability);

              const lat = +availabilityResponse.data.result.latitude.replace("/", ".");
              const long = +availabilityResponse.data.result.longitude.replace("/", ".");
              setMapInfo({
                lat:lat,
                lang:long,
                zoom:14
              });

              if (availabilityResponse.data.result?.availability?.length === 1){
                setSelectedAvailability(availabilityResponse.data.result.availability[0]);
              }
              if (availabilityResponse.data.result?.availability?.length === 0){
                setEmptyCip(true);
              }
            } else{
              setEmptyCip(true);
            }
          }
        }
      };
      fetchData();
    },[]);
    
  
    useEffect(()=>{
      if (props.auth?.isAuthenticated){
        setPassengers([{
          id:1,
          gender:props.auth.user.gender,
          type:"Adult",
          services:[]
        }]);
        form.setFields([
          {
              name: ['passengers', 0, "gender"],
              value: props.auth.user.gender,
          },
          {
              name: ['passengers', 0, "firstName"],
              value: props.auth.user.firstName,
          },
          {
              name: ['passengers', 0, "lastName"],
              value: props.auth.user.lastName,
          },
          {
              name: ['reserver', "gender"],
              value: props.auth.user.gender,
          },
          {
              name: ['reserver', "firstName"],
              value: props.auth.user.firstName,
          },
          {
              name: ['reserver', "lastName"],
              value: props.auth.user.lastName,
          },
        ]);
        
      }
    },[props.auth]);
  
    const { t } = props;
    
    const onFailedSubmit = (e) => {
      if (!flightDate){
        setFlightDateValidation(false);
      }
    }
  
    String.prototype.toEnglishDigit = function () {
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
    
    const onFinish = async(value) => {
      if (!flightDate) {
        setFlightDateValidation(false);
        return;
      } else {
        const dateSelected = moment(flightDate.year + "-" + flightDate.month + "-" + flightDate.day, "jYYYY-jM-jD").format().split("T")[0];
        const timeSelected = moment(value.flightTime).format('HH:mm:ss');
        const dateTimeSelected = dateSelected + "T" + timeSelected;

        const transportsArray = selectedTransport?.filter(item => item.count > 0)?.map(item => ({
          count: item.count,
          address: value.Address,
          id: item.id
        })) || [];

        let servicesArray =[];
        if (selectedServicesArray && addedExtraService ){
          servicesArray = selectedServicesArray?.filter(item => addedExtraService.includes(item.id)).map(serviceItem => ({
            count: serviceItem.count || 1,
            extraCount: serviceItem.extraCount,
            hourCount: serviceItem.hourCount,
            id: serviceItem.id
          }));
        }
        const accompanyingArray  = value.accompanying || [];
        const params = {
          passengers:[...value.passengers,...accompanyingArray],
          reserver:value.reserver,
          airline: value.airline,
          flightNumber: value.flightNumber,
          originName: value.originName,
          destinationName: value.destinationName,
          flightTime:dateTimeSelected,
          preReserveKey: validateResponse?.preReserveKey,
          transports:transportsArray,
          services:servicesArray
        }

        setSubmitLoading(true);

        const response = await CipPreReserve(params);

        if (response.data && response.data.result) {
          const reserveId = response.data.result.id;
          const username = response.data.result.username;
          if (discount?.status==="success"){
            const code = discount.discountCode;
            await registerDiscountCode(`${reserveId}`, username, code);
            Router.push(`/payment?reserveId=${reserveId}&username=${username}`);
          }else{
            Router.push(`/payment?reserveId=${reserveId}&username=${username}`);
          }

        }else{
          openNotification("error", 'bottomRight', response.response.data.error.message)
        }
      }
    };

  const [form] = Form.useForm();

    return (
      <div className={`${styles.detailCip} ${process.env.THEME_NAME === "TRAVELO" && styles.detailCipTravelo} padding-bottom-1`}>
        <div className={styles.container}>
          <div className={styles.cipNameBackLink}>
            <div className={styles.content}>
                <>
                    <Link as="/cip-home" href="/cip-home">
                        <a> 
                            <ArrowRightOutlined />
                            <span>مشاهده فرودگاه های دیگر</span>
                        </a>
                    </Link>
                    <div className={styles.callPhoneNumber}>
                        <span>شماره تلفن رزرو : </span>
                        <a href="tel:+982126150051">02126150051</a>
                    </div>
                </>
            </div>
        </div>
        </div>
        {emptyCip || <GalleryCipTravelo cipAirPortDetail={cipAirPortDetail} />}
        <div className={styles.container}>
          {!!selectedAvailability && <AnchorNavigation />}
          <CipName cipAirPortDetail={cipAirPortDetail} mapInfo={mapInfo} />          
            <Form
                scrollToFirstError={true}
                name="cipBooking"
                onFinishFailed={onFailedSubmit}
                onFinish={onFinish}
                form={form}
            >
            {emptyCip ?
              <div style={{ color: '#f44336', background: '#ffefef', padding: '1.5rem', fontSize: '17px', border: '1px solid', marginBottom: '25px', fontWeight: 600, borderRadius: '3px' }}>
                <CloseOutlined />
                <span style={{ margin: '0 15px' }}>
                  برای این فرودگاه در حال حاضر خدمات تشریفات فرودگاهی فعال نمی باشد.
                </span>
              </div>
              : !availability ?
                
                [1,2,3].map(item =><div key={item} className='card-style card-rounded margin-bottom-15'>
                <Skeleton.Input active size="medium" />
                <Row justify='space-between' align='middle' className='margin-top-10'>
                  <Col>
                    <Skeleton.Input active size="small" className="margin-end-10" />
                    <Skeleton.Input active size="small" className="margin-end-10" />
                  </Col>
                  <Col>
                    <Skeleton.Input active size="small" className="margin-end-10 margin-top-10" />
                    <Skeleton.Button active size="large" />
                  </Col>
                </Row>
              </div>)

              :
              
              <>
                  {availability.length > 1 && !selectedAvailability &&
                    <SelectServiceType
                      availability={availability}
                      setSelectedAvailability={setSelectedAvailability}
                    />
                  }

                {!!selectedAvailability && <>

                  <DetailCipSteps />

                  {availability.length > 1 && <div>
                    <Button
                      className="button gray-btn inline-btn margin-bottom-15"
                      htmlType="button"
                      onClick={() => { setSelectedAvailability(); }}
                    >
                      <ArrowRightOutlined />  برگشت به نتایج
                    </Button>
                    <div className='margin-bottom-35'>
                      <SelectServiceTypeItem item={selectedAvailability} isSelected />
                    </div>
                  </div>}

                  <AirportCip
                    onChangeFlightDate={onChangeFlightDate}
                    flightDate={flightDate}
                    flightDateValidation={flightDateValidation}
                  />

                  {props.auth.loadingGetUser || <Reserver
                    userInfo={props.auth?.isAuthenticated ? props.auth.user : undefined}
                    form={form}
                    reserverPassenger={reserverPassenger}
                    setFirstPassengerGender={ value => {UpdatePassenger(1,"gender",value)}}
                  />}

                  <Passengers
                    passengers={passengers}
                    increasePassengers={increasePassengers}
                    decreasePassengers={decreasePassengers}
                    removePassenger={removePassenger}
                    reserverPassenger={reserverPassenger}
                    setReserverPassenger={setReserverPassenger}
                    UpdatePassenger={UpdatePassenger}
                    passengerServicesArray={passengerServicesArray}
                    form={form}
                    userInfo={props.auth?.isAuthenticated ? props.auth.user : undefined}
                  />

                  <CompanionCip
                    addAccompanying={addAccompanying}
                    removeAccompanying={removeAccompanying}
                    removeAccompanyingItem={removeAccompanyingItem}
                    accompanying={accompanying}
                    passengerServicesArray={passengerServicesArray}
                    UpdateAccompanying={UpdateAccompanying}
                    form={form}
                  />

                  <ExtraServices
                    selectedServicesArray={selectedServicesArray}
                    updateSelectedServices={updateSelectedServices}
                    addedExtraService={addedExtraService}
                    updateAddedExtraService={updateAddedExtraService}
                  />

                  <TaxiCip
                    selectedTransport={selectedTransport}
                    updateTransport={updateTransport}
                  />

                  <DiscountCode
                    addDiscountCode={addDiscountCode}
                    discount={discount}
                    clearDiscountError={clearDiscountError}
                  />

                  <PriceCip
                    passengers={passengers}
                    accompanying={accompanying}
                    selectedServicesArray={selectedServicesArray}
                    addedExtraService={addedExtraService}
                    selectedTransport={selectedTransport}
                    passengerServicesArray={passengerServicesArray}
                    validateResponse={validateResponse}
                    discount={discount}
                  />

                  <SubmitDetailCip
                    cipAirPortDetail={cipAirPortDetail}
                    submitLoading={submitLoading}
                  />
                  <AboutCip cipAirPortDetail={cipAirPortDetail} />
                  
                  <TermsCip/>

                  <FacilitiesCip cipAirPortDetail={cipAirPortDetail} />

                  <FaqCip />
                </>}

              </>}

            </Form>
        </div>
      </div>
    )
}

DetailCip.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})

DetailCip.propTypes = {
t: PropTypes.func.isRequired,
}
  
const mapStateToProp = (state) => {
  return {
    auth: state.auth
  };
};

export default withTranslation('common')(connect(mapStateToProp)(DetailCip))
