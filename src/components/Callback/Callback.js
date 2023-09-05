import React, { useEffect, useState } from "react";
import { Router } from "../../../i18n";
import { Spin } from "antd";
import { useRouter } from "next/router";
import { getOrder } from "../../actions";
const Callback = () => {
  const router = useRouter();
  useEffect(() => {
    const reserveId = router.query.reserveId;
    const path = router.asPath;
    const username = path.split("username=")[1]?.split("&")[0].split("#")[0];

    const getOrderTypeAndPush = async () => {
      const res = await getOrder(reserveId, username);
      if (res.status == 200) {
        const params = router.query;
        if (
          params.status === "0" ||
          params.status === 0 ||
          params.status === false ||
          params.status === "false"
        ) {
          Router.push(
            `/payment?username=${username}&reserveId=${reserveId}& status=0`
          );
        } else if (
          params.status === "1" ||
          params.status === 1 ||
          params.status === true ||
          params.status === "true"
        ) {
          if (res.data.result.type === "Hotel") {
            Router.push(
              `/hotel-foreign/booking?username=${username}&reserveId=${reserveId}`
            );
          } else if (res.data.result.type === "Cip") {
            Router.push(
              `/cip/booking?username=${username}&reserveId=${reserveId}`
            );
          } else if (res.data.result.type === "FlightDomestic") {
            Router.push(
              `/flights/booking?username=${username}&reserveId=${reserveId}`
            );
          } else if (res.data.result.type === "HotelDomestic") {
            Router.push(
              `/hotel/booking?username=${username}&reserveId=${reserveId}`
            );
          } else if (res.data.result.type === "Flight") {
            Router.push(
              `/flights-foreign/booking?username=${username}&reserveId=${reserveId}`
            );
          }
        }
      }
    };

    getOrderTypeAndPush();
  }, []);

  return (
    <div className="text-center">
      <br />
      <br />
      <br />
      <br />
      <br />
      <Spin />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Callback;
