import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { i18n, withTranslation } from "../../../../i18n";
import { Col, Row, Form, notification } from "antd";
import { useRouter } from 'next/router'

import styles from "../../../styles/Flight.module.css";
import { FlightDepartureIcon, FlightReturnIcon } from "../../UI/Icons";
import BookingSteps from "./BookingSteps";
import ContentBooking from "./ContentBooking";
import AsidePaymentFlight from "../../Payment/AsidePaymentFlight";
import { getReserve, getConfirmFlight, getOrder, GetVoucherPdf } from "../../../actions";

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
const Booking = (props) => {
  const [price, setPrice] = useState(0);
  const [data, setData] = useState("");
  const [flights, setFlights] = useState("");
  const [loading, setLoading] = useState(true);
  const route = useRouter();
  const reserveId = route.query.reserveId;
  const username = route.query.username;

  useEffect(() => {
    let hostName = window.location.hostname.split('.');
    hostName = hostName[1]

    const getData = async () => {
        const res = await getReserve(reserveId, username);
        if(res.status == 200){
            const data = res.data.result;
            setFlights(res.data.result);
            setPrice(data.adultTotalPrice + data.childTotalPrice + data.infantTotalPrice);
        }else{
            openNotification("error",'bottomRight',res.data.error.message)
        }
    }
    getData();
     
    const getConfirm = async () => {
      const res = await getConfirmFlight(reserveId, username);
      if (res.status == 200) {
        if (res.data.result.isCompleted) {
          const data = res.data.result.reserve;
          setData(data);
          setLoading(false)
        } else {
          getConfirm();
        }
      } else {
        openNotification("error", "bottomRight", res.data.error.message);
      }
    };
    getConfirm();

  }, []);


  const { t } = props;
  return (
    <div className={styles.flightCheckout}>
      <div className={styles.container}>
        <BookingSteps />
        <Form layout="vertical" name="nest-messages">
          <Row gutter={[20, 20]}>
            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
              <ContentBooking 
                progress={loading}
                price={price}
                data={data}
                flights={flights}
                
                reserveId={reserveId}
                username={username}
                />
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              {flights ? <AsidePaymentFlight price={price} flights={flights} hiddenOffPrice={true}/> : ""}
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

Booking.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

Booking.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(Booking);