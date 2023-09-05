import { Button, Tooltip, Typography, Row, Col } from "antd";
import { InfoCircleOutlined, CheckOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { i18n, withTranslation, Link } from "../../../../i18n";
import Image from 'next/image'

import Quantity from "../../UI/Quantity/Quantity";
import PriceFormat from "../../UI/PriceFormat/PriceFormat";
import bedSvg from '../../../assets/bed.svg';
import personSvg from '../../../assets/person.svg';
import restaurantSvg from '../../../assets/restaurant.svg';

const DomesticHotelRoomRateItem = (props) => {
  const [count, setCount] = useState(1);
  const { t } = props;

  // const discountBadgeComponent = (salePrice: number, boardPrice: number) => {
  //     const discount = Math.floor(((boardPrice - salePrice) * 100) / boardPrice);
  //     return (
  //         discount &&
  //         discount > 0 && (
  //             <Tooltip title={<FormattedCurrency number={boardPrice! - salePrice!} currencyDisplay="name" tooltip={{ show: false }} />}>
  //                 <span className="ui-badge red-badge en-font" dir="ltr">
  //                     {discount}% <span className="small">OFF</span>
  //                 </span>
  //             </Tooltip>
  //         )
  //     );
  // };

  const { rate, selectedRoomToken } = props;
  const prices = {
    roomPrice: rate.pricing.find(
      (item) => item.type === "Room" && item.ageCategoryType === "ADL"
    )?.amount,
    boardPrice: rate.pricing.find(
      (item) => item.type === "RoomBoard" && item.ageCategoryType === "ADL"
    )?.amount,
    extraBedPrice: rate.pricing.find(
      (item) => item.type === "ExtraBed" && item.ageCategoryType === "ADL"
    )?.amount,
    childPrice: rate.pricing.find(
      (item) => item.type === "Room" && item.ageCategoryType === "CHD"
    )?.amount,
  };
  
  const nightly = [];
  if (rate.nightly.items){
    for (const [key, value] of Object.entries(rate.nightly.items)) {
      nightly.push({
        date: key,
        amount: count * value.amount,
        board: count * value.board,
      });
    }
  }
  
  let cancellation = null;
  if(rate.cancellationPolicy?.status){
    switch (rate.cancellationPolicy.status) {
      case "NonRefundable":
        cancellation = (
          <div className="margin-bottom-5 text-red">{t("non-refundable")}</div>
        );
        break;
      case "Refundable":
        cancellation = (
          <div className="text-green margin-bottom-5">
            <CheckOutlined className="margin-end-5" /> {t("refundable")}
          </div>
        );
        break;
      // case "CallSupport":
      //   cancellation = (
      //     <div className="text-green margin-bottom-5">
      //       <CheckOutlined className="margin-end-5" /> {t("call-support-cancellation")}
      //     </div>
      //   );
      //   break;
      default:
        <div className="margin-bottom-5">{rate.cancellationPolicy.status}</div>;
    }
  }

  const board = code => {
      switch (code) {
          case "BB":
            return "به همراه صبحانه";
          case "HB":
            return "صبحانه + ناهار یا شام";
          case "FB":
            return "تمام وعده های غذایی شامل می شود";
          case "RO":
            return "بدون صبحانه";
          case "Hour6":
            return "اقامت به مدت ۶ ساعت";
          case "Hour10":
            return "اقامت به مدت ۱۰ ساعت";
        
          default:
              return code ;
      }
  }

  const calulateDiscount = (sale,board) => {
      let discountPercentage,fixedDiscountPercentage;
      discountPercentage = ((board-sale)*100/board);
      if (discountPercentage > 0 && discountPercentage < 1){
          fixedDiscountPercentage = 1;
      } else {
          fixedDiscountPercentage = discountPercentage.toFixed(0);
      }
      return (fixedDiscountPercentage);
  }
  
  const { Text } = Typography;
  
  return (
    <>
      <Row className="domestic-hotel-rate-content">
        <Col xs={24} sm={24} md={14} lg={14} xl={14}>
          {process.env.THEME_NAME === "TRAVELO" && <h4 className="roomCardName">
            { props.roomInfo?.name }
          </h4>}
          <div className="domestic-hotel-rate-detail">
            {props.rate.view &&
              <div className="margin-bottom-5">
                <span>{props.rate.view.name}</span>
              </div>}
            <div className="margin-bottom-5">
              <Tooltip
                title={`${rate.board.code}${
                  rate.board.code && ` (${board(rate.board.code)})`
                }`}
              >
                <b className="domestic-hotel-restaurant">
                  <Image
                    width={20}
                    height={20}
                    src={restaurantSvg.src}
                    alt={board(rate.board.code)}
                    title={board(rate.board.code)}
                  />{" "}
                  {/* <img src={restaurantSvg.src} alt={board(rate.board.code)} className="inline-icon" />{" "} */}
                  <span>{board(rate.board.code)}</span>
                </b>
              </Tooltip>
            </div>
            {props.roomInfo?.capacity?.count && (
              <div className="margin-bottom-5 domestic-hotel-restaurant">
                <Image
                    width={20}
                    height={20}
                    src={personSvg.src}
                    alt={props.roomInfo.capacity.count}
                    title={props.roomInfo.capacity.count}
                  />{" "}
                {/* <img src={personSvg.src} alt="" className="inline-icon" />{" "} */}
                {props.roomInfo.capacity.count} نفر
              </div>
            )}

            {cancellation}
            {props.roomInfo?.capacity?.extraBed ? (
              <div>
                {/* <CheckOutlined className="margin-end-5" /> */}
                <div className="domestic-hotel-restaurant">
                  <Image
                      width={20}
                      height={20}
                      src={bedSvg.src}
                      alt={t('extra-bed')}
                      title={t('extra-bed')}
                    />{" "}
                  {/* <img src={bedSvg.src} alt="" className="inline-icon" />{" "} */}
                    {t('extra-bed')}
                </div>
              </div>
            ) : (
              <div className="old-price font-14">{t('extra-bed')} </div>
            )}

            {rate.description && <Text type="warning" className="domestic-hotel-rate-alert">
              <InfoCircleOutlined /> {rate.description}
            </Text>}
          </div>
        </Col>
        <Col xs={12} sm={12} md={5} lg={5} xl={5}>
          {rate.availablityType === "Completion" || <div className="domestic-hotel-rate-counter">
            <label className="counter-label" for="counter">تعداد</label>
            <Quantity min={1} max={rate.available} onChange={setCount} />
          </div>}
        </Col>
        <Col xs={12} sm={12} md={5} lg={5} xl={5}>
          <div className="domestic-hotel-rate-button-price">
              {rate.availablityType === "Completion"?
                null
              :prices?.roomPrice && prices.roomPrice > 1000 ? (
                <>
                  {(prices.boardPrice && (prices.boardPrice !== prices.roomPrice)) && <div>
                      <span className="red-tag margin-bottom-small green-tag-travelo">{calulateDiscount(prices.roomPrice,prices.boardPrice)}% {t('discount')}</span>
                  </div>}
                  {prices.roomPrice && (
                    <>
                      {prices.boardPrice && prices.roomPrice < prices.boardPrice && (
                        <span className="old-price rate-old-price">
                          <PriceFormat price={prices.boardPrice * count} /> {t("rial")}
                        </span>
                      )}
                      
                      <Tooltip
                        placement="topLeft"
                        title={ <>
                          <div>
                            <PriceFormat price={prices.roomPrice * count} /> {t("rial")}
                          </div>
                          <small> {t("Avg-per-night")} </small>
                        </>}
                      >
                        <span className="new-price">
                          {/* <InfoCircleOutlined className="align-middle" />{" "} */}
                          <PriceFormat price={prices.roomPrice * count} /> {t("rial")}
                        </span>
                      </Tooltip> 
                    </>
                  )}
                </>
              ):
              (
                <div className="red price-request">قیمت نیازمند استعلام است</div>
              )}
              {rate.availablityType === "Completion" ?
                <div className="red price-request"> ظرفیت تکمیل است  </div> 
              :<Button
                type="primary" 
                className={`min-width-150 antd-btn-loading-end ${process.env.THEME_NAME === "TRAVELO" && "antd-btn-select-room-travelo"}`}
                  htmlType="button"
                  disabled={
                    (selectedRoomToken && selectedRoomToken !== rate.bookingToken) ||
                    false
                  }
                  loading={
                    (selectedRoomToken && selectedRoomToken === rate.bookingToken) ||
                    false
                  }
                  onClick={() => {
                    props.onSelectRoom(rate.bookingToken, count);
                  }}
                >
              {prices?.roomPrice && prices.roomPrice < 1000 ? 
                  "درخواست رزرو" 
                : rate.availablityType === "Online" ? 
                  t("online-reserve") 
                : 
                  t("room-reserve")}
              </Button>}
          </div>
        </Col>
      </Row>
    </>
  );
};

DomesticHotelRoomRateItem.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

export default withTranslation("common")(DomesticHotelRoomRateItem);
