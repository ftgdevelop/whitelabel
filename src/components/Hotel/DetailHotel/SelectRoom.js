import React, { useState } from "react";
import { Row, Col, Card, Skeleton } from "antd";
import { ClockCircleOutlined} from '@ant-design/icons'
import { Link, i18n, withTranslation,Router } from "../../../../i18n";
import DomesticHotelRoomRateItem from "./DomesticHotelRoomRateItem";
import defaultRoomImage from "../../../assets/defaultRoom.svg";
import styles from "../../../styles/Hotel.module.css";
import { DomesticHotelV4Validate } from "../../../actions";
import RoomFacilities from "./RoomFacilities";

const DomesticHotelDetailsRooms = (props) => {

  const { t } = props;
  const [selectedRoomToken, setSelectedRoomToken] = useState();

  const selectRoomHandle = async (token, count) => {
    setSelectedRoomToken(token);
    const preReserveResponse = await DomesticHotelV4Validate ({
      bookingToken: token,
      checkin: props.checkin,
      checkout: props.checkout,
      count: count,
      MetaSearchName: props && props.utmData ? props.utmData.utmSource : null,
      MetaSearchKey: props && props.utmData ? props.utmData.utmKey : null
    });
    
    if(preReserveResponse.data){
      const key = preReserveResponse.data.result.preReserveKey;
      Router.push(`/hotel/checkout/key=${key}`);
    }
  };

  if (!props.availability) {
    return (
      <div className="container room-card-loading">
        {[1, 2].map((loadingItem) => (
          <Card
            key={loadingItem}
            className="roomCard margin-bottom-10"
            // title={
            //   <Skeleton.Button
            //     active
            //     size="small"
            //     className={styles.roomChoicesFacilitiesSkeleton}
            //   />
            // }
          >
            <Row gutter={[15, 15]}>
              <Col xs={24} md={6} xl={6}>
                <div className="RoomImageHolder RoomDefaultImageHolder">
                  <img src={defaultRoomImage.src} alt={"room"} />
                </div>
              </Col>
              <Col xs={24} md={18} xl={18}>
                <div className="table-holder">
                  <table className="HotelRoomTable">
                    <thead>
                      <tr>
                        <th>
                          <Skeleton.Button active size="medium" className="full-width" />
                        </th>
                        <th>
                          {/* <Skeleton.Button active size="small" /> */}
                        </th>
                        <th>
                          {/* <Skeleton.Button active size="small" /> */}
                        </th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="domestic-hotel-rate">
                        <td>
                          <Skeleton
                            active
                            size="small"
                            className="room-card-skeleton-details"
                            paragraph={{ rows: 2 }}
                          />
                        </td>
                        <td className="vertical-align-middle">
                          {/* <div className={styles.bedRoomSubject}>
                            <Skeleton.Button
                              active
                              size="small"
                              className={styles.roomChoicesSubjectSmallSkeleton}
                            />
                          </div> */}
                        </td>
                        <td>
                          {/* <Skeleton.Button
                            active
                            size="small"
                            className="full-width"
                          /> */}
                        </td>
                        <td>
                          <Skeleton.Button active className="full-width room-card-skeleton-button" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Col>
            </Row>
          </Card>
        ))}
      </div>
    );
  }

  if (props.availability.availabilities?.length===0){
    return(
      <div className={styles.container}  id="anchorroomchoices" >
        <div className={styles.noRoomsAvailableCard}>
            <div className={styles.noRoomsAvailableInner}>
                <Row >
                    <Col flex="25px"><ClockCircleOutlined className="red" /></Col>
                    <Col flex="auto">
                        <h4 className={`red ${styles.noRoomsAvailableTitle}`}>{t('no-room')}</h4>
                        <p>
                        {t('no-room-change-date')}
                        </p>
                    </Col>
                </Row>
            </div>
        </div>
    </div>
    )
  }

  return (
    <div className="container margin-bottom-35" id="anchorroomchoices">
      {props.hotelAccommodation && props.hotelAccommodation.alertNote &&
        <div className="roomCardAlertNoteTravelo">
          <p>{props.hotelAccommodation.alertNote}</p>
      </div>}
      <h4 className="font-24 margin-bottom-30 hotel-select-room-subject">انتخاب اتاق</h4>
      {props.availability.availabilities.map((availabilityItem, key) => (
        <Card
          className={`roomCard ${process.env.THEME_NAME === "TRAVELO" ? "roomCardTravelo" : null} margin-bottom-10`}
          title={process.env.THEME_NAME === "TAJAWAL" && availabilityItem.rooms[0].name}
          key={key}
        >
          <Row gutter={[15, 15]}>
            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <div className={`RoomImageHolder 
                ${availabilityItem.rooms[0].image == null ? "RoomDefaultImageHolder" : null}
                ${process.env.THEME_NAME === "TRAVELO" ? "RoomImageHolderTravelo" : null}
              `}>
                <img
                  src={availabilityItem.rooms[0].image || defaultRoomImage.src}
                  alt={"room"}
                />
              </div>
              {availabilityItem.rooms[0].facilities?.length && <RoomFacilities availabilityItem={availabilityItem} />}
            </Col>
            <Col xs={24} sm={24} md={25} lg={18} xl={18} className="RoomDefaultCard">
              <div className="table-holder">
                {availabilityItem.rates.map((rate) => (
                  <DomesticHotelRoomRateItem
                    key={rate.bookingToken}
                    rate={rate}
                    roomInfo={availabilityItem.rooms[0]}
                    selectedRoomToken={selectedRoomToken}
                    onSelectRoom={selectRoomHandle}
                  />
                ))}
              </div>
            </Col>
          </Row>
        </Card>
      ))}
    </div>
  );
};
DomesticHotelDetailsRooms.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

export default withTranslation("common")(DomesticHotelDetailsRooms);
