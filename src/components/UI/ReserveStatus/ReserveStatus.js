import React from "react";
import { Tag } from "antd";

const ReserveStatus = (props) => {
  let status;
  switch (props.status) {
    case "Registered":
      status = <Tag color="processing">ثبت شده</Tag>;
      break;
    case "Pending":
      status = <Tag color="success">آماده پرداخت</Tag>;
      break;
    case "Issued":
      status = <Tag color="success">صادر شده</Tag>;
      break;
    case "Canceled":
    case "Voided":
      status = <Tag color="default">منقضی شده</Tag>;
      break;
    case "WebServiceCancel":
    case "PaymentSuccessful":
    case "WebServiceUnsuccessful":
    case "PriceChange":
    case "Unavailable ":
      status = <Tag color="error">خطا در هنگام صدور </Tag>;
      break;
    case "Refunded":
      status = <Tag color="default">استرداد شده</Tag>;
      break;
    case "InProgress ":
      status = <Tag color="processing">در حال صدور </Tag>;
      break;
    case "ContactProvider":
      status = <Tag color="processing">تماس با پشتیبانی </Tag>;
      break;

    default:
      status = <Tag color="default">{props.status}</Tag>;
  }

  return status;
};
export default ReserveStatus;
