import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { i18n, withTranslation } from "../../../i18n";
import moment from "moment-jalaali";
import { useRouter } from "next/router";
import { Col, Row, Form, notification, Spin, Tabs } from "antd";
import { connect } from "react-redux";

import styles from "../../styles/Flight.module.css";
import CheckoutSteps from "./CheckoutSteps";
import AsidePaymentFlight from "./AsidePaymentFlight";
import AsidePaymentHotel from "./AsidePaymentHotel";
import AsidePaymentCip from "./AsidePaymentCip";
import AsidePaymentHotelDomestic from "./AsidePaymentHotelDomestic";
import AsidePaymentFlightForeign from "./AsidePaymentFlightForeign";
import ContentPayment from "./ContentPayment";
import { getReserveBankGateway, makeToken, getOrder, HotelDomesticGetReserve,HotelV4DomesticGetReserve,GetHotelById } from "../../actions";
import CardToCard from "./CardToCard";
import { CheckCircleIcon } from '../UI/Icons'
import Wallet from "./Wallet";
import AsidePaymentBus from "./AsidePaymentBus";
import AsideV4 from "../Hotel/Shared/AsideV4";

const { TabPane } = Tabs;

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

const Payment = (props) => {
  const { t } = props;
  const router = useRouter();

  const path = router.asPath;
  const reserveId =router.query.reserveId;
  const username = path.split("username=")[1].split("&")[0].split("#")[0];
  const isError = router.query[" status"];
  const [bankGatewayList, setBankGatewayList] = useState([]);
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [coordinatorPrice, setCoordinatorPrice] = useState("");

  const [expireDate, setExpireDate] = useState(0);
  const [expired, setExpired] = useState(false);

  const [domesticHotelReserveInfo,setDomesticHotelReserveInfo]=useState();
  const [domesticHotelInfo,setDomesticHotelInfo]=useState(); 
  
  const submitData = async (gatewayId) => {
    setLoadingSubmit(true);
    const callbackUrl =
      window.location.origin +
      (i18n.language === "fa" ? "/fa" : "/ar") +
      "/callback";
    const params = {
      gatewayId: gatewayId ? gatewayId : bankGatewayList.gateways[0].id,
      callBackUrl: callbackUrl,
      reserveId: reserveId,
    };
    const res = await makeToken(params);
    if (res.status == 200) {
      window.location.replace(
        `https://payline.safaraneh.com/fa/Reserves/Payment/PaymentRequest?tokenId=${res.data.result.tokenId}`
      );
    } else {
      openNotification("error", "bottomRight", res.data.error.message);
      setLoadingSubmit(false);
    }
  };

  const getPrice = (price) => {
    setPrice(price);
  };

  useEffect(() => {

    if (type === "HotelDomestic"){
      
      if(process.env.DomesticHotelV4) {

        const fetchData = async () => {
          const response = await HotelV4DomesticGetReserve(reserveId,username);
          if (response.data) {
            setDomesticHotelReserveInfo(response.data.result);
            setPrice(response.data.result.totalPrice);
            setExpireDate(response.data.result.expirTime);
            const HotelId = response.data.result.accommodationId;
            const HotelInfoResponse = await GetHotelById(HotelId,i18n.language);
            if (HotelInfoResponse.data){
              setDomesticHotelInfo(HotelInfoResponse.data);
            }

              // if (!this.state.reserveInfo){
              //     this.setState({reserveInfo:response.data.result});
              // }else{
              //     if (response.data.result.reserveStatus !== this.state.reserveInfo.reserveStatus ){
              //         this.setState({reserveInfo:response.data.result});
              //     }
              // }
              // if (response.data.result.status === "Pending"){
              //     Router.push(`/payment?reserveId=${reserveId}&username=${username}`);
              // }
          }
        };

        fetchData();

      } else {
        const getReserveHotelDomestic = async () => {
          const res = await HotelDomesticGetReserve(reserveId, username);
          if (res?.status == 200) {
            setExpireDate(res.data.result.expireDaTe);
          }
        }
        getReserveHotelDomestic();      
      }

    }
    
  }, [type]);

  useEffect(()=>{
    const getOrderType = async () => {
      const res = await getOrder(reserveId, username);
      if (res?.status == 200) {
        setType(res.data.result?.type);
        setCoordinatorPrice(res.data.result.salePrice);
      }
    };

    const getBankGatewayList = async () => {
      const res = await getReserveBankGateway(reserveId);
      if (res?.status == 200 && res.data.result) {
        setBankGatewayList(res.data.result[0]);
      } else {
        openNotification("error", "bottomRight", res.data.error.message);
      }
    };

    getOrderType();
    getBankGatewayList();

  },[]);


  useEffect(()=>{
    if (expireDate){
      const isExpired = moment().isAfter(moment(expireDate));
      setExpired(isExpired);
    }
  },[expireDate]);

  // const addDiscountCode = async () => {
  //   let params = {
  //     reserveId: reserveId,
  //     username: username,
  //     promoCode: discountPromoCode
  //   };
  //   const res = await registerDiscountCode(params);
  //   console.log("res", res);
  //   if (res) {
  //     console.log("ok");
  //   }
  // }
 
  let DomesticHotelV4Information,DomesticHotelV4ReserveInformation;
  if (domesticHotelInfo){
    DomesticHotelV4Information = {  
          image : {
              url : domesticHotelInfo.ImageUrl,
              alt:domesticHotelInfo.ImageAlt,
              title:domesticHotelInfo.ImageTitle
          },
          name : `${domesticHotelInfo.HotelCategoryName} ${domesticHotelInfo.HotelName} ${domesticHotelInfo.CityName}`,
          rating: domesticHotelInfo.HotelRating,
          address : domesticHotelInfo.Address,
          TopSelling:domesticHotelInfo.TopSelling,
          Url:domesticHotelInfo.Url,
          CityId:domesticHotelInfo.CityId
      }
  }
  if (domesticHotelReserveInfo) {

    DomesticHotelV4ReserveInformation = {
      reserveId: domesticHotelReserveInfo.id,
      checkin: domesticHotelReserveInfo.checkin,
      checkout: domesticHotelReserveInfo.checkout,
      duration: moment(domesticHotelReserveInfo.checkout).diff(moment(domesticHotelReserveInfo.checkin), 'days'),
      rooms: domesticHotelReserveInfo.rooms.map(roomItem => ({
        name: roomItem.name,
        board: roomItem.boardCode,
        cancellationPolicyStatus: roomItem.cancellationPolicyStatus,
        bed: roomItem.bed
      })),
      // salePrice:domesticHotelReserveInfo.totalPrice,
      salePrice__: coordinatorPrice,
      salePrice: domesticHotelReserveInfo.rooms.reduce((totalPrice, roomItem) => {
        const roomItemPrice = roomItem.pricing.find(
          item => item.type === "Room" && item.ageCategoryType === "ADL"
        )?.amount;
        if (roomItemPrice) {
          return totalPrice + +roomItemPrice
        } else {
          return null;
        }
      }, 0),
      selectedExtraBedCount: domesticHotelReserveInfo.rooms.reduce((totalSelectedExtraBeds, roomItem) => {
        const thisRoomHasExtraBed = roomItem.pricing.find(item => item.type === "ExtraBed" && item.ageCategoryType === "ADL" && item.isSelected);
        if (thisRoomHasExtraBed) {
          return totalSelectedExtraBeds + 1
        } else {
          return null;
        }
      }, 0), 
      selectedExtraBedPrice: domesticHotelReserveInfo.rooms.reduce((totalPrice, roomItem) => {
        const roomItemPrice = roomItem.pricing.find(
          item => item.type === "ExtraBed" && item.ageCategoryType === "ADL" && item.isSelected
        )?.amount;
        if (roomItemPrice) {
          return totalPrice + +roomItemPrice
        } else {
          return null;
        }
      }, 0),
      boardPrice___: domesticHotelReserveInfo.totalBoardPrice || 0,
      boardPrice: domesticHotelReserveInfo.rooms.reduce((totalPrice, roomItem) => {
        const roomItemPrice = roomItem.pricing.find(
          item => item.type === "RoomBoard" && item.ageCategoryType === "ADL"
        )?.amount;
        if (roomItemPrice) {
          return totalPrice + +roomItemPrice
        } else {
          return null;
        }
      }, 0),
      promoCodePrice: domesticHotelReserveInfo.rooms.reduce((totalPrice, roomItem) => {
        const itemPrice = roomItem.pricing.find(
          item => item.type === "PromoCode" && item.ageCategoryType === "ADL"
        )?.amount;
        if (itemPrice) {
          return totalPrice - +itemPrice
        } else {
          return null;
        }
      }, 0)
    }
  }

  return (
    <div
      className={`${styles.flightCheckout} ${
        process.env.THEME_NAME === "TRAVELO" && styles.flightCheckoutTravelo
      }`}
    >
      <div className={styles.container}>
        <CheckoutSteps />
        <Form layout="vertical" name="nest-messages">
          <Row gutter={[20]}>
            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
              <div className="payment-tabs">
                <h2>چگونه می خواهید پرداخت کنید؟</h2>
                <Tabs type="card" defaultActiveKey="1">
                  <TabPane tab={<>
                      <span>آنلاین</span>
                      <div className="icon-active-tabs">
                        <CheckCircleIcon/>
                      </div>
                    </>}
                    key="1">
                    <ContentPayment
                      isError={isError}
                      loadingSubmit={loadingSubmit}
                      bankGatewayList={bankGatewayList}
                      price={price}
                      submitData={submitData}
                      expireDate={expireDate}
                      type={type}
                      coordinatorPrice={coordinatorPrice}
                    />
                  </TabPane>
                  {(type !== "HotelDomestic" || !expired) && (
                    <>
                      <TabPane
                        tab={<>
                            <span>کارت به کارت</span>
                            <div className="icon-active-tabs">
                              <CheckCircleIcon/>
                            </div>
                          </>}
                        key="2">
                        <CardToCard loadingSubmit={loadingSubmit} />
                      </TabPane>
                      <TabPane
                        tab={<>
                          <span>اعتباری</span>
                          <div className="icon-active-tabs">
                            <CheckCircleIcon/>
                          </div>
                        </>}
                        key="3">
                      {props.isAuthenticated ? <Wallet pricePayment={price} />: ''}
                      </TabPane>
                    </>
                  )}
                </Tabs>
              </div>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              {type === "FlightDomestic" ? (
                <AsidePaymentFlight getPrice={getPrice} />
              ) : type === "Hotel" ? (
                <AsidePaymentHotel getPrice={getPrice} />
              ) : type === "HotelDomestic" ? (
                
                process.env.DomesticHotelV4 ? (
                  <AsideV4 
                    hotelInformation={DomesticHotelV4Information}
                    reserveInformation={DomesticHotelV4ReserveInformation}                  
                  />
                ) : (
                  <AsidePaymentHotelDomestic getPrice={getPrice} />
                )

              ) : type === "Cip" ? (
                <AsidePaymentCip getPrice={getPrice} />
              ) : type === "Flight" ? (
                <AsidePaymentFlightForeign getPrice={getPrice} />
              ) : type === "Bus" ? (
                <AsidePaymentBus getPrice={getPrice} />
              ) : (
                <Spin />
              )}
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

Payment.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

const mapStateToProp = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

Payment.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(connect(mapStateToProp, null)(Payment));